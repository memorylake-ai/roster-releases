#!/usr/bin/env node
/**
 * 把一个已发布的 Release 镜像到 CDN 源站 S3（经 CloudFront 对外：download.memorylake.ai；.github/workflows/mirror.yml 在 Release 转正时调用）。
 * GitHub 仍是正本：tag、说明、安装包都在 Release 上；CDN 只是下载加速，坏了可以随时从 Release 重新镜像。
 *
 *   TAG=v0.1.27 node scripts/mirror.mjs             # 镜像这一版（是 latest 才更新 latest/）
 *   TAG=v0.1.27 DRY_RUN=1 node scripts/mirror.mjs   # 只下载、核对、打印要做的事
 *
 * 源站目录（PREFIX 默认 roster）：
 *   <PREFIX>/v0.1.27/*   这一版全部文件，永不覆盖（immutable）
 *   <PREFIX>/latest/     官网下载用的三个安装包 + 客户端自动更新读的 latest.yml / latest-mac.yml
 *                        清单里的文件地址改写成 ../v0.1.27/<文件>：客户端从版本目录下载，
 *                        差分更新按版本号替换路径找旧版 blockmap（electron-updater Provider.getBlockMapFiles）
 * 顺序：先传版本目录 → 再放 latest/ 的安装包 → 最后放清单。客户端拿到新清单时，它指的文件都已经在了。
 *
 * 配置：S3_BUCKET S3_REGION S3_PUBLIC_BASE [CF_DISTRIBUTION_ID]；凭证用环境里的 AWS 凭证（workflow 走 OIDC）。没配 S3_BUCKET 就只核对。
 * 依赖：gh、aws（CLI v2）。
 */
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const env = process.env;
const REPO = env.GITHUB_REPOSITORY || "memorylake-ai/roster-releases";
const TAG = env.TAG;
const PREFIX = (env.MIRROR_PREFIX || "roster").replace(/^\/|\/$/g, "");
const KEEP = Number(env.MIRROR_KEEP || 5);
const DRY = env.DRY_RUN === "1";
const die = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };
if (!/^v\d+\.\d+\.\d+$/.test(TAG || "")) die(`TAG 要形如 v0.1.27，拿到的是 ${TAG}`);
const version = TAG.slice(1);

function run(cmd, argv, { capture = false, allowFail = false } = {}) {
  const r = spawnSync(cmd, argv, { encoding: "utf8", stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit" });
  if (r.error) die(`找不到 ${cmd}：${r.error.message}`);
  if (r.status !== 0 && !allowFail) die(`${cmd} ${argv.slice(0, 3).join(" ")} 失败${capture ? `：${(r.stderr || "").trim()}` : ""}`);
  return r;
}

// ── 1. Release 必须已转正、两个平台的清单都在 ──
const rel = JSON.parse(run("gh", ["release", "view", TAG, "-R", REPO, "--json", "isDraft,assets"], { capture: true }).stdout);
if (rel.isDraft) die(`${TAG} 还是草稿：转正后再镜像（草稿是半成品，另一个平台可能还没传）`);
const names = rel.assets.map((a) => a.name);
for (const m of ["latest.yml", "latest-mac.yml"]) if (!names.includes(m)) die(`${TAG} 缺 ${m}`);
const latestTag = run("gh", ["api", `repos/${REPO}/releases/latest`, "--jq", ".tag_name"], { capture: true }).stdout.trim();
const isLatest = latestTag === TAG;
console.log(`${REPO} ${TAG}${isLatest ? "（latest）" : `（不是 latest，latest 是 ${latestTag}：只补版本目录，不动 latest/）`}`);

// ── 2. 下载并核对：清单版本号、清单里每个文件的 sha512 ──
const dir = fs.mkdtempSync(path.join(os.tmpdir(), `roster-${version}-`));
run("gh", ["release", "download", TAG, "-R", REPO, "-D", dir]);
const sha512 = (f) => createHash("sha512").update(fs.readFileSync(path.join(dir, f))).digest("base64");
for (const m of ["latest.yml", "latest-mac.yml"]) {
  const body = fs.readFileSync(path.join(dir, m), "utf8");
  const v = body.match(/^version:\s*(\S+)/m)?.[1];
  if (v !== version) die(`${m} 写的是 ${v}，tag 是 ${TAG}`);
  for (const [, url, hash] of body.matchAll(/^\s*-\s*url:\s*(\S+)\s*\n\s*sha512:\s*(\S+)/gm)) {
    if (!names.includes(url)) die(`${m} 引用的 ${url} 不在 Release 里`);
    if (sha512(url) !== hash) die(`${url} 与 ${m} 的 sha512 不一致`);
  }
}
const INSTALLERS = ["Roster-mac-arm64.dmg", "Roster-mac-x64.dmg", "Roster-win-x64.exe"];
for (const f of INSTALLERS) if (!names.includes(f)) die(`${TAG} 缺 ${f}`);
console.log(`✓ 核对通过：${names.length} 个文件`);

// latest/ 里的清单：文件地址指向版本目录
const rewrite = (body) => body.replace(/^(\s*(?:-\s*)?(?:url|path):\s*)(?!https?:|\.\.\/)(\S+)\s*$/gm, `$1../${TAG}/$2`);

const TYPES = { ".dmg": "application/x-apple-diskimage", ".exe": "application/vnd.microsoft.portable-executable", ".zip": "application/zip", ".yml": "text/yaml; charset=utf-8", ".blockmap": "application/octet-stream" };
const typeOf = (f) => TYPES[path.extname(f)] || "application/octet-stream";
const IMMUTABLE = "public, max-age=31536000, immutable";
const CC_INSTALLER = "public, max-age=300";
const CC_MANIFEST = "public, max-age=60";

// ── 3. 上传 ──
const BUCKET = env.S3_BUCKET;
const BASE = env.S3_PUBLIC_BASE;
if (!BUCKET) { console.log("没有配置 S3_BUCKET，到此为止"); process.exit(0); }

const semver = (s) => s.slice(1).split(".").map(Number);
const cmpDesc = (a, b) => { const x = semver(a), y = semver(b); return y[0] - x[0] || y[1] - x[1] || y[2] - x[2]; };

async function waitFor(desc, check, timeoutMs = 10 * 60_000) {
  const until = Date.now() + timeoutMs;
  for (;;) {
    const r = await check().catch((e) => e.message);
    if (r === true) { console.log(`  ✓ ${desc}`); return; }
    if (Date.now() > until) die(`${desc}：${r}`);
    await new Promise((res) => setTimeout(res, 15_000));
  }
}

const s3 = (argv, opts = {}) => run("aws", ["s3", ...argv, "--region", env.S3_REGION || "us-east-1", ...(argv[0] === "ls" ? [] : ["--only-show-errors"])], opts);
const url = (key) => `s3://${BUCKET}/${PREFIX}/${key}`;
console.log(`\n== s3://${BUCKET}/${PREFIX}${DRY ? "（dry-run）" : ""}`);
if (DRY) {
  console.log(`  ↑ ${PREFIX}/${TAG}/  ${names.length} 个文件`);
  if (isLatest) console.log(`  ↑ ${PREFIX}/latest/  ${INSTALLERS.join(" ")} + 改写后的清单`);
  process.exit(0);
}

// 版本目录：全部文件
for (const f of names) {
  s3(["cp", path.join(dir, f), url(`${TAG}/${f}`), "--cache-control", IMMUTABLE, "--content-type", typeOf(f)]);
  console.log(`  ↑ ${PREFIX}/${TAG}/${f}`);
}

if (isLatest) {
  // latest/：先安装包（服务端拷贝，不重新上传），后清单
  for (const f of INSTALLERS) {
    s3(["cp", url(`${TAG}/${f}`), url(`latest/${f}`), "--cache-control", CC_INSTALLER, "--content-type", typeOf(f), "--metadata-directive", "REPLACE"]);
    console.log(`  ↑ ${PREFIX}/latest/${f}`);
  }
  for (const m of ["latest.yml", "latest-mac.yml"]) {
    const out = path.join(dir, `rewritten-${m}`);
    fs.writeFileSync(out, rewrite(fs.readFileSync(path.join(dir, m), "utf8")));
    s3(["cp", out, url(`latest/${m}`), "--cache-control", CC_MANIFEST, "--content-type", typeOf(m)]);
    console.log(`  ↑ ${PREFIX}/latest/${m}`);
  }

  // 刷 CDN 缓存
  if (env.CF_DISTRIBUTION_ID) {
    const id = run("aws", ["cloudfront", "create-invalidation", "--distribution-id", env.CF_DISTRIBUTION_ID, "--paths", `/${PREFIX}/latest/*`, "--query", "Invalidation.Id", "--output", "text"], { capture: true }).stdout.trim();
    console.log(`  CloudFront 失效 ${id}`);
  }
  // 公网核对：清单版本号、安装包大小与 Release 一致
  if (BASE) {
    for (const m of ["latest.yml", "latest-mac.yml"]) {
      await waitFor(`${BASE}/${PREFIX}/latest/${m} 是 ${version}`, async () => {
        const r = await fetch(`${BASE}/${PREFIX}/latest/${m}`);
        const v = (await r.text()).match(/^version:\s*(\S+)/m)?.[1];
        return r.status === 200 && v === version ? true : `HTTP ${r.status}，version=${v}`;
      });
    }
    // 取 1 个字节、看 Content-Range 里的总大小：不下载整个包，也不依赖各家 CDN 对 HEAD 的处理
    const sizeOf = async (u) => {
      const r = await fetch(u, { headers: { Range: "bytes=0-0" } });
      await r.arrayBuffer();
      return { status: r.status, size: r.headers.get("content-range")?.split("/")[1] };
    };
    const checks = [
      ...INSTALLERS.map((f) => [`latest/${f}`, f]),
      ...["Roster-mac-arm64.zip", "Roster-mac-x64.zip", "Roster-win-x64.exe"].map((f) => [`${TAG}/${f}`, f]),
    ];
    for (const [key, f] of checks) {
      const want = String(fs.statSync(path.join(dir, f)).size);
      await waitFor(`${BASE}/${PREFIX}/${key} 大小 ${want}`, async () => {
        const { status, size } = await sizeOf(`${BASE}/${PREFIX}/${key}`);
        return status === 206 && size === want ? true : `HTTP ${status}，大小 ${size}`;
      });
    }
  } else {
    console.warn(`  ! 没配 S3_PUBLIC_BASE，跳过公网核对`);
  }
}

// 只留最近 KEEP 个版本目录（当前这版永远留着）
const ls = s3(["ls", `s3://${BUCKET}/${PREFIX}/`], { capture: true }).stdout;
const versions = [...ls.matchAll(/PRE (v\d+\.\d+\.\d+)\//g)].map((m) => m[1]).sort(cmpDesc);
for (const old of versions.slice(KEEP).filter((v) => v !== TAG)) {
  s3(["rm", url(`${old}/`), "--recursive"]);
  console.log(`  ✗ 清理 ${PREFIX}/${old}/`);
}
console.log(`\n✓ ${TAG} 已镜像到 s3://${BUCKET}/${PREFIX}`);
