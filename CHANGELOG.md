# Changelog · 更新记录

Every release of the Roster desktop app, newest first. Installed apps update themselves; downloads are on the [README](README.md).
Roster 数字员工桌面客户端的历次更新，最新的在最上面。已安装的客户端会自动更新；下载见 [README](README.md)。

## 0.1.36 · 2026-10-30

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.36)

### 新功能
- **本机权限改为系统沙箱（macOS）**：员工执行本机命令不再逐条放行。每次处理消息时，按是谁交代的划定能读写的范围，范围内直接执行，越界由系统拦下；同事发起的对话连不到内网和本机服务；登录凭据不再交给模型的运行环境。员工「设置 → 主管」新增「主管可以使用这台电脑上的文件与本机登录」，开启时主管交代的工作可以读取这台电脑上的文件、使用已登录的命令行工具，写入仍只限工作目录。
- **接入私有化部署的 MemoryLake**：连接记忆服务时，除中国站与国际站外可选「私有化部署」，填写服务地址与 API key 即可。
- **视觉模型可选「Codex（本机）」**：大脑是 Codex 时，视觉模型可以直接选「Codex（本机）」来看图，不必另外配置。

### 改进
- **权限页更清楚地提示风险**：「包括所有人」成为「全部放行」的下一级，标有「高风险」并写明后果，打开前需要输入确认短语，开启后页面顶部常驻提示、可一键收回。被系统拦下的操作也会出现在被拒记录里，并分开说明是连网络被拦还是访问了允许范围外的目录。

### 修复
- **Claude 命令行登录失效时说不出原因**：以前员工只回一句通用的「暂时无法处理」；现在会直接告诉提问的人是 Claude 命令行登录已失效、该怎么重新登录，大脑页和安装检查也会标黄提示。

### 升级须知
- 「主管可以使用这台电脑上的文件与本机登录」默认开启，升级后已有员工同样生效。如果是替别人部署（主管不是这台电脑的主人），请到员工的「设置 → 主管」关闭。

---

### New
- **Local permissions now use the system sandbox (macOS)**: commands no longer need to be allowed one by one. Each time the employee handles a message, it gets a scope based on who asked; anything inside runs directly and anything outside is blocked by the system. Conversations started by colleagues cannot reach the local network or services on this computer, and sign-in credentials are no longer handed to the model's environment. A new setting under the employee's Settings → Manager, "The manager may use this computer's files and local sign-ins", lets work the manager asks for read files on this computer and use command-line tools already signed in here; writes stay limited to the working directory.
- **Private-deployment MemoryLake**: when connecting the memory service, you can now choose "Private deployment" in addition to the China and international sites, and enter the service address and API key.
- **"Codex (local)" as the vision model**: when the brain is Codex, you can pick "Codex (local)" as the vision model to read images, with no extra setup.

### Improvements
- **Clearer risk on the permissions page**: "Include everyone" is now a sub-option of "Allow everything", marked "High risk" with its consequences spelled out; turning it on requires typing a confirmation phrase, and while it is on a banner stays at the top of the page with a one-click "Turn off". Actions blocked by the system now appear in the denied list too, explaining whether a network connection was blocked or a directory outside the allowed scope was accessed.

### Fixes
- **No explanation when the Claude command line was signed out**: the employee used to reply only with a generic "unable to process"; it now tells the person asking that the Claude command-line sign-in has expired and how to sign in again, and the brain page and setup check flag it in yellow.

### Before you update
- "The manager may use this computer's files and local sign-ins" is on by default and applies to existing employees after the update. If you deploy for someone else (the manager is not the owner of this computer), turn it off under the employee's Settings → Manager.

## 0.1.35 · 2026-10-29

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.35)

### 新功能
- **Telegram 接入**：「IM 接入」与新建向导新增 Telegram。在 Telegram 的 @BotFather 建好机器人，粘贴令牌并扫码绑定主管即可使用；私聊只接主管和主管允许的人，别人拉进的群需要主管在 Telegram 里批准。支持论坛话题、停止按钮与快捷回复按钮，机器人详情页可管理可以使用的人和已加入的群。

### 改进
- **Slack 任务结束后撤掉「取消执行」**：派活任务完成后，Slack 消息上的「取消执行」按钮会被撤掉，不再出现点了却无事可取消的情况。
- **员工知道自己在哪个群、哪个话题**：在群聊和话题中，员工能看到所在的群名与话题名，更准确地理解「这个话题」指的是什么。

### 修复
- **排队中的请求取消不了**：还在排队或刚开始准备的请求现在也能取消，取消后不再收到「暂时无法处理」；群里只能取消自己发起的请求（主管除外）。
- **部分命令在 IM 里无法放行**：一些普通命令在 IM 里点「放行」「同意」都不生效，现在可以正常放行；放行单只显示点了能成功的按钮。
- **照抄名字确认对不上**：删除确认时，名字里的全角 / 半角括号、空格和大小写不再导致对不上；名字可以一键复制。

---

### New
- **Telegram**: Telegram is now available under IM accounts and in the new-employee wizard. Create a bot with @BotFather in Telegram, paste its token and scan a code to bind the manager. Only the manager and people the manager allows can message the employee privately, and groups added by others need the manager's approval in Telegram. Forum topics, a stop button and quick-reply buttons are supported; the bot's details page lets you manage who can use it and which groups it has joined.

### Improvements
- **"Cancel" removed when a Slack task ends**: when a delegated task finishes, its "Cancel" button is removed from the Slack message instead of lingering with nothing to cancel.
- **Employees know which group and topic they are in**: in group chats and topics, employees now see the group and topic names, so "this topic" is understood correctly.

### Fixes
- **Queued requests could not be cancelled**: requests that are still queued or being prepared can now be cancelled, and no "unable to process" reply follows; in groups, people can cancel only their own requests (the manager can cancel any).
- **Some commands could not be allowed from IM**: certain ordinary commands could not be allowed with "Allow" or "Approve" in IM; they now can, and permission requests only show buttons that will work.
- **Copy-the-name confirmation did not match**: delete confirmations no longer fail on full-width vs. half-width brackets, spaces or letter case, and the name can be copied with one click.

## 0.1.34 · 2026-10-28

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.34)

### 新功能
- **Slack 接入**：「IM 接入」与新建向导新增 Slack。起名后在 Slack 里发送一条命令、确认授权，再填回验证码，即可自动建好并安装应用（也可手动填写应用凭据）；员工在频道中被 @ 或私聊时回复，审批、放行和提问选项在 Slack 里显示为按钮，缺权限时可一键「更新 Slack 应用」。
- **回收站「彻底删除」**：「系统 → 回收站」中的员工可以彻底删除，删除其员工目录与默认工作目录，并吊销其独立的 MemoryLake 专属 key；你添加的工作目录、IM 平台中的应用和已记录的记忆不受影响。「···」菜单中不可用的操作会在下方写明原因。
- **MemoryLake 生图模型**：员工设置的「生图模型」新增 6 个 MemoryLake 模型服务的模型，使用员工自己的 MemoryLake 账号（国际站 / 中国站）出图；员工尚未开通时会提示。
- **全部放行「包括所有人」**：权限页的「全部放行」新增「包括所有人」，同事发起的对话、群里任何人触发的自动任务也直接执行（需二次确认）。任何人都能触发的自动任务被拦下时，权限页会说明原因并给出可行的处理方式。
- **钉钉数字员工：权限提示与交给主管**：本机钉钉账号没有新建数字员工的权限时，入口页直接说明并提供「已开通，重新检查」；主管是其他人时，可选择「新建并交给主管」，由主管在自己电脑上的 Roster 中接入。
- **查看更新内容**：新版本提示卡片和「系统」页的自动更新一行可直接打开对应版本的更新说明。

### 改进
- **群规则的默认规则固定在末尾**：每个群的规则表最后一条固定为「默认」规则，不可修改、删除或拖动；如需改变处理方式，在上方添加规则。已有设置自动转换，处理结果不变。
- **新建自动任务只保留「创建」**：确认页去掉「创建并试运行」；「立即运行一次」只对按时间或手动运行的任务显示。
- **权限配置异常时控制台提示**：员工的权限配置生成超时会自动重试；仍未成功时，员工状态中「权限配置」标红并写明原因，提供「重启」按钮并发送通知，不再让自动任务无声失败。

### 修复
- **飞书按群名查找群聊失败**：飞书员工按群名查找群聊时提示不可用的问题已修复。
- **国际站员工无法回忆记忆**：使用 MemoryLake 国际站的员工回忆记忆失败的问题已修复；回忆结果也不再夹带模型的思考过程。
- **OpenCode 免费用量用尽时长时间无回复**：现在会立即告知「OpenCode 免费模型的用量已达上限」，不再等待数分钟后回复通用提示；一条消息里同时带文字和附件时也不再额外等待说明，并且不再为非员工发起的会话推送通知。
- **Codex 生图误报「未登录」**：Codex 登录信息保存在系统钥匙串中时，生图模型不再显示未登录。
- **自动任务找不到工作目录**：未设置默认目录时，自动任务中的员工不再说「工作目录是空的」，可以使用全部已添加的目录。
- **Pi 大脑无法生图**：使用 Pi 大脑的员工现在可以正常生成图片，且不会因超时重复出图。
- **弹窗超出窗口**：窗口较矮时，弹窗高度不再超出屏幕，内容可单独滚动。

---

### New
- **Slack**: Slack is now available under IM accounts and in the new-employee wizard. Pick a name, send one command in Slack, approve, and enter the verification code — the app is created and installed for you (you can also enter app credentials manually). Employees reply when @-mentioned in a channel or in direct messages; approvals, permission requests and question options appear as buttons, and "Update Slack app" fixes missing permissions in one step.
- **Permanently delete from the Recycle Bin**: employees in System → Recycle Bin can now be permanently deleted, removing their employee folder and default working folder and revoking their dedicated MemoryLake key. Folders you added, apps on IM platforms and recorded memories are kept. Unavailable items in the "···" menu now show why.
- **MemoryLake image models**: the "Image model" setting adds 6 models from the MemoryLake model service, using the employee's own MemoryLake account (international or China site); you are told if the employee has not set it up yet.
- **"Include everyone" for Allow all**: the permissions page adds "Include everyone" under Allow all, so conversations started by colleagues and scheduled tasks anyone in a group can trigger also run without approval (requires confirmation). When such a task is blocked, the permissions page explains why and offers options that actually work.
- **DingTalk digital employees: permission notice and hand-off**: if the DingTalk accounts on this computer cannot create digital employees, the start page says so up front with "Enabled — check again"; when the supervisor is someone else, you can choose "Create and hand to supervisor" so they connect it in Roster on their own computer.
- **View what's new**: the update card and the auto-update row on the System page link directly to the release notes of that version.

### Improvements
- **Default group rule pinned to the end**: each group's rule list now ends with a fixed "Default" rule that cannot be edited, deleted or moved; add rules above it to change handling. Existing settings convert automatically with the same results.
- **New scheduled tasks: "Create" only**: the confirmation page no longer offers "Create and test run"; "Run once now" appears only for time-based or manual tasks.
- **Permission setup problems are shown in the console**: if generating an employee's permission settings times out it is retried; if it still fails, the "Permission settings" row turns red with the reason, a Restart button and a notification, instead of scheduled tasks failing silently.

### Fixes
- **Finding Feishu groups by name failed**: Feishu employees can look up group chats by name again.
- **Memory recall failed on the international site**: employees using the MemoryLake international site can recall memories again, and recall answers no longer include the model's reasoning.
- **Long silence when OpenCode free usage ran out**: the employee now says right away that the OpenCode free model usage limit has been reached instead of replying generically minutes later; messages that carry text and an attachment together no longer wait for a description, and conversations not started by the employee no longer trigger notifications.
- **Codex image generation reported "not signed in"**: no longer happens when Codex credentials are stored in the system keychain.
- **Scheduled tasks saw an empty working folder**: without a default folder, employees in scheduled tasks no longer say the working folder is empty and can use all added folders.
- **Pi brain could not generate images**: employees using the Pi brain can generate images again, without duplicate images after timeouts.
- **Dialogs taller than the window**: dialogs now stay within the window and their content scrolls.

## 0.1.33 · 2026-10-27

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.33)

### 新功能
- **新建 / 接入钉钉数字员工**：在「IM 接入 → 添加钉钉账号」里可以直接新建钉钉数字员工（几秒完成，不需要管理员后台，可指定主管），或接入企业里由你创建或负责的数字员工；账号卡片标出「钉钉数字员工 / 真人账号」，可在控制台删除数字员工、在钉钉中打开它，用它建员工时自动带出钉钉里的主管。
- **生图模型**：员工设置「视觉模型」下面新增「生图模型」，可选自动、Codex 自带生图、阿里云 MaaS 或不开；员工被要求画图、做海报时会出图并发给你，约一分钟一张，不开时会直接说明做不到。

### 改进
- **首字头像带平台品牌色**：没有头像照片的数字员工，首字头像改为所在 IM 平台的品牌渐变。
- **删除与退出登录即时反馈**：IM 接入页删除账号、退出登录时条目上显示进度，成功后立刻消失，不再等列表刷新；页面说明文字的排版也更松快。

### 修复
- **钉钉员工偶发长时间收不到消息**：同一台电脑上有多名钉钉员工时，偶尔会停在「接收端未运行」长达半小时；现在会很快自动恢复，长时间接不上时提醒并提供「重启」按钮。
- **自动更新被旧的下载挡住**：下载过某个版本但还没安装、期间又发布了新版时，现在会直接提示最新版。
- **新建钉钉多维表账本失败**：刚建好的表格偶尔读不到字段导致账本建不成，现在会稍等后自动重试。
- **记忆回忆失败被当成答案**：回忆服务出错时，员工不会再把错误信息当作事实记下。

---

### New
- **Create or connect DingTalk digital employees**: under IM accounts → Add DingTalk account you can now create a DingTalk digital employee directly (takes seconds, no admin console needed, supervisor selectable) or connect one in your organization that you created or are responsible for. Account cards show "DingTalk digital employee" or "Personal account"; digital employees can be deleted from the console and opened in DingTalk, and new employees created from them pick up their DingTalk supervisor automatically.
- **Image model**: a new "Image model" setting below "Vision model" in employee settings — Automatic, Codex built-in, Alibaba Cloud MaaS, or Off. When asked for a picture or poster, the employee generates the image and sends it to you (about a minute per image); when off, it says it cannot.

### Improvements
- **Platform-colored initial avatars**: employees without a photo now show their initial on the brand gradient of their IM platform.
- **Instant feedback when deleting or signing out**: on the IM accounts page, deleting an account or signing out shows progress on the item and removes it as soon as it succeeds, without waiting for the list to refresh; the page description is also better spaced.

### Fixes
- **DingTalk employees occasionally stopped receiving messages**: with several DingTalk employees on one computer, the receiver could stay "not running" for up to half an hour; it now recovers quickly, and shows a notice with a Restart button if it cannot reconnect.
- **Auto-update blocked by an older download**: if a version was downloaded but not installed and a newer one was released meanwhile, the newest version is now offered directly.
- **Creating a DingTalk AI table ledger failed**: a newly created table sometimes could not be read yet, so the ledger was not created; it now waits and retries.
- **Failed memory recall treated as an answer**: when the recall service fails, the employee no longer records the error text as a fact.

## 0.1.32 · 2026-10-23

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.32)

### 新功能
- macOS 版现在经过 Apple 签名与公证：首次打开不再被系统拦截，之后也能自动更新。
- 群聊可以按群设置：每个群一张消息规则表，按「谁发的、是否 @ 员工、关键词」决定回复、运行自动任务还是不处理；在员工设置「IM 账号 → 群聊」里编辑，支持拖动排序。
- 自动任务（原「定时任务」）可以在「收到消息时」运行（钉钉），条件与群聊规则共用一张表；汇报对象可以多选，除了主管还能发到指定的群。
- 钉钉员工可以实时收到所设群里的全部消息，自动任务也能定期读群消息并汇总。
- 员工权限页新增「全部放行」开关：打开后，主管发起的对话和按主管安排运行的任务不再逐条请求授权。
- 记忆空间可选、可切换：新建员工时可以用独立空间、本机共用空间或团队已有空间，之后也能在记忆页切换；同一空间里可以授权读取其他员工的项目。

### 改进
- 企业微信授权即将过期时，员工状态里会提示并可直接去续期。
- 记忆首页的员工卡片会标出与谁共享空间。
- 界面用词统一：「记忆」改为「记忆与上下文」，「工作区」统一为「空间」。

### 修复
- 自动任务运行时被拦下的操作，选择「以后放行」后对之后的自动任务也生效。
- 按路径运行的脚本按原样路径放行，不再放行范围过宽；读取群消息的权限收紧。

---

### New
- The macOS app is now signed and notarized by Apple: it opens without a Gatekeeper warning and can update itself.
- Per-group chat settings: each group has an ordered rule table — who sent it, whether the employee is @-mentioned, keywords — deciding whether to reply, run an automation, or ignore. Edit it under employee settings → IM accounts → Group chats, with drag-to-reorder.
- Automations (formerly "Scheduled tasks") can run when a message arrives (DingTalk), using the same rule table; reports can go to several recipients, including specific groups.
- DingTalk employees can receive every message in selected groups in real time, and automations can periodically read and summarize group messages.
- A new "Allow everything" switch on the employee permissions page: conversations you start, and tasks run on your behalf, no longer ask for each permission.
- Memory spaces are selectable and switchable: a new employee can use its own space, a space shared on this computer, or an existing team space, and can switch later from the memory page; employees in the same space can be granted read access to each other's projects.

### Improvements
- When WeCom authorization is about to expire, the employee status shows a notice with a link to renew.
- Employee cards on the memory home page show who they share a space with.
- Consistent wording: "Memory" is now "Memory & context", and "workspace" is now "space" throughout.

### Fixes
- Permissions granted with "Always allow" after an automation was blocked now apply to later automation runs.
- Scripts run by path are allowed by their exact path, no longer matching too broadly; reading group messages is more restricted.

## 0.1.31 · 2026-10-22

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.31)

### 新功能
- 定时任务可以设置「最长运行」时长：创建和编辑时都能改（也可选「不限」），修改后从下一次运行起生效；任务详情里会显示当前设置。

### 改进
- 定时任务一次运行的时长上限与聊天分开，默认放宽到 6 小时；需要长时间工作的任务不会再在约 30 分钟时被中途停止。
- 定时任务跑满时长被停止时记为超时，不再被误报为员工出错；长时间运行的任务完成后也不会再被记成失败。

---

### New
- Scheduled tasks now have a "Max run time" setting, editable when creating or editing a task (including "No limit"); changes apply from the next run, and the task details show the current value.

### Improvements
- A scheduled run's time limit is now separate from chat and defaults to 6 hours, so long-running tasks are no longer cut off after about 30 minutes.
- When a scheduled run hits its time limit it is recorded as a timeout instead of an employee error, and long runs that finish are no longer marked as failed.

## 0.1.30 · 2026-10-21

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.30)

### 新功能
- 员工页新增「技能与服务」页签：集中查看和增减这名员工的技能与外部服务，页头显示技能 / 外部服务个数，点击直达对应一组。
- 技能装好、外部服务接好后，可以直接选择交给哪些员工；详情里的「使用情况」改为每名员工一个开关。
- 还没有数字员工时，首页改为「待入职」空工牌和五步引导，一键开始招募第一位数字员工。

### 改进
- 员工设置页改版：统一为分组列表，IM 账号和主管以头像 + 名字显示，不再暴露配置键和账号标识；大脑与模型改为弹出菜单选择；去掉「能力」与「高级」两组。
- 文本、图片、文件、语音、审批等基本能力始终开启，不再提供可能误关的开关。
- 语音消息：本机转写默认关闭，关闭时会明确回复「暂不支持识别语音消息，请改用文字发送」，不再无声无息。
- 主管审批等待时长会自动保持在合理范围内，超时按未批准处理。
- 「技能与服务」页外部服务排在前面并默认展开。
- 工作目录的限制放宽：不再拦截程序所在目录的上级与下级（员工目录、系统目录等照旧受保护）。

### 修复
- 修复从旧版应用（改名前的安装包）升级后，已有员工仍在运行旧代码、或因旧包删除而无法启动的问题。
- 重新登录授权成功后，消息接收会立即恢复，不再需要手动重启员工。
- 文件没能发出去时，员工会在回复里如实说明；飞书中 SVG 等图片接口不支持的格式改为按文件发送。
- 修复部分外部服务工具被误拒、以及「以后放行」写出无效规则的问题。
- 创建目标账本等操作失败时，页面会显示真正的失败原因。

---

### New
- A new Skills & Services tab on each employee page shows and edits that employee's skills and external services; the header shows how many of each, and clicking jumps to that group.
- After installing a skill or connecting a service you can hand it straight to employees; the "Usage" section in details is now a per-employee toggle.
- With no digital employees yet, the overview shows an "Open position" badge and a five-step guide to recruit your first one.

### Improvements
- Redesigned employee settings: grouped lists, IM accounts and supervisors shown by avatar and name with no config keys or account IDs exposed, brain and model chosen from pop-up menus, and the "Capabilities" and "Advanced" groups removed.
- Core capabilities (text, images, files, voice, approvals) are always on, with no toggle that could break them.
- Voice messages: local transcription is off by default; when off, the employee replies that voice isn't supported and asks for text instead of staying silent.
- The supervisor approval wait is kept within a safe range automatically; no reply in time counts as not approved.
- External services are listed before skills on the Skills & Services page and open by default.
- Working-directory rules are relaxed: the app's own folder, its parents and children are no longer blocked (employee folders and system folders stay protected).

### Fixes
- Fixed existing employees still running old code after upgrading from a pre-rename install, or failing to start once the old app was deleted.
- After signing in again, message receiving resumes immediately without restarting the employee.
- When a file fails to send, the employee now says so in the reply; on Feishu, SVG and other formats the image API rejects are sent as files.
- Fixed some external-service tools being wrongly denied and "Always allow" writing rules that never match.
- When creating a goal ledger or similar fails, the page now shows the real reason.

## 0.1.29 · 2026-10-21

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.29)

### 新功能
- 新增「技能与服务」页（侧栏「资源」）：在一处管理已安装的技能和已接入的外部服务，并浏览推荐。
- 技能库：可从本机上传技能（文件夹、zip 或单个 SKILL.md），审核全部文件与所申请的权限后才入库；入库后被改动的技能会标为「内容已变更，待确认」，确认前不生效。
- 推荐技能扩到 37 个、随安装包提供，点开与安装不再需要联网，几乎即时完成。
- 外部服务（MCP）：推荐目录扩到 34 个，含多款常用国内服务；支持 OAuth 登录授权，GitHub 可用设备码登录；也可添加自定义服务（HTTP 地址或本机命令）。
- 每个外部服务的工具可分档：只读、可写、每次写入前确认、不启用；定时任务只能使用只读工具。
- 员工设置页新增技能与外部服务两组，增减即时写入，下一轮对话即生效。
- 可选：主管单聊交代的工作可以按这台电脑上的完整大脑配置运行（默认关闭；群聊与同事的请求仍隔离）。

### 改进
- 凭据不再进入员工大脑的运行环境：带凭据的操作统一经员工的本地网关代为执行，只注入所声明的键。
- 网络一律跟随这台电脑的系统代理。
- 大脑自检会直接显示模型服务返回的真实错误，便于排查。
- 技能 / 服务详情改为右侧抽屉，可按权限档筛选和搜索工具，并查看使用情况。
- 移除四个旧版内置岗位技能（日程协调、代码仓库与 CI、体验走查与回归、表格处理），由新的技能库与推荐技能替代。

### 修复
- 一批安全修复：主管身份按发送者严格识别；授权回调只接受 https 且核对来源；控制台只接受本机地址访问；定时任务推送不再带出凭据；凭据相关报错不再包含原文。
- 修复 Windows 上只读命令中的反斜杠路径被误判、改动过的技能未被识别、本机服务空闲后未及时回收的问题。
- 「改动待生效」提示不再误报。
- 修复若干控制台问题：粘贴 Windows 路径被拆坏、读取失败不重试、修改连接设置需多次保存。

---

### New
- A new Skills & Services page (under Resources in the sidebar) to manage installed skills and connected external services in one place, with recommendations.
- Skill library: upload skills from this computer (a folder, a zip, or a single SKILL.md). Every file and requested permission is reviewed before a skill is added; a skill changed afterwards is marked "Content changed, needs confirmation" and stays inactive until confirmed.
- 37 recommended skills now ship with the app, so opening and installing them needs no network and is near-instant.
- External services (MCP): the catalog grows to 34 services, including popular services in China; OAuth sign-in is supported, GitHub can sign in with a device code, and you can add custom services (an HTTP endpoint or a local command).
- Each service's tools can be set to read-only, write, confirm before every write, or off; scheduled tasks only get read-only tools.
- Employee settings now list skills and external services; adding or removing one is saved immediately and applies from the next turn.
- Optional: work the supervisor assigns in a direct chat can run with this computer's full brain configuration (off by default; group chats and teammates stay isolated).

### Improvements
- Credentials no longer enter an employee brain's environment: credentialed actions go through the employee's local gateway, which injects only the declared keys.
- Networking always follows this computer's system proxy.
- The brain self-check now shows the model service's actual error.
- Skill and service details open in a side drawer where you can filter tools by permission level, search them, and see usage.
- Four legacy built-in role skills (scheduling, code repository & CI, walkthrough & regression testing, spreadsheet handling) are removed in favor of the new skill library and recommended skills.

### Fixes
- Security fixes: the supervisor is identified strictly by sender; sign-in callbacks accept https only and verify their origin; the console accepts local addresses only; scheduled pushes no longer carry credentials; credential errors no longer include the raw value.
- On Windows, fixed backslash paths in read-only commands being misjudged, edited skills not being detected, and idle local services not being shut down promptly.
- "Changes pending" no longer shows up when nothing changed.
- Console fixes: pasted Windows paths no longer break, failed reads retry, and connection settings save in one go.

## 0.1.28 · 2026-10-20

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.28)

### 新功能
- 员工设置里可以选择大脑的思考程度，可选档位跟随所选模型；留空即使用模型默认。

### 改进
- 自动更新改从下载加速节点获取，国内外都更快更稳；加速节点不通时自动退回 GitHub。
- 识别不出你的系统语言时，界面一律显示英文；个别文案缺少译文时也先显示英文。

### 修复
- 修复部分员工新建后自检失败、收到消息却答不上的问题。
- 对带目录参数的 git 命令、带集群或命名空间参数的命令，权限页里的「放行」现在能真正生效，不再放行后照样被拒、反复请求。
- 被拦下的循环命令会按其中真正执行的命令记录，便于放行。

---

### New
- Choose how hard an employee's brain thinks in its settings; the available levels follow the selected model, and leaving it empty uses the model's default.

### Improvements
- Auto-updates now come from a download mirror that is faster and more reliable worldwide, falling back to GitHub when the mirror is unreachable.
- When your system language can't be detected, the interface now shows English; missing translations also fall back to English first.

### Fixes
- Fixed newly created employees sometimes failing their self-check and not replying to messages.
- Approving a command in Permissions now actually takes effect for git commands with a directory option and for commands with cluster or namespace options, instead of being denied again and asked for repeatedly.
- Commands blocked inside a loop are now recorded as the command actually being run, so they can be approved.

## 0.1.27 · 2026-10-20

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.27)

### 改进
- 员工重启后不再自动往聊天里发启动报告；需要的员工可以在「能力」里打开。
- 「保存并重启」时，如果后台守护还在跑旧版本，会连同守护一起换成新版本，客户端升级后的修复对长时间运行的员工也能立即生效。

### 修复
- 员工重启约半小时后，大脑状态不再错误地掉回「未验证」。
- 后台守护刚启动时收到重启请求，不再整个退出、导致员工下线。

---

### Improvements
- Employees no longer post a startup report to chat every time they restart; turn it back on per employee under Capabilities if you want it.
- Save and restart now also replaces the background supervisor when it is still running an older version, so fixes from an app update take effect right away for long-running employees.

### Fixes
- An employee's brain status no longer drops back to "Unverified" about half an hour after a restart.
- A restart request arriving just as the background supervisor starts no longer makes it exit and take the employees offline.

## 0.1.26 · 2026-10-19

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.26)

### 新功能
- 定时任务：控制台侧边栏新增「定时任务」页，员工页也有对应页签。用整页向导新建（选员工 → 写要做的事 → 确认），频率可选不重复、按间隔、每天、每周、每月或自定义规则，支持每 N 天/周、月末、第 N 个星期几、一天多个时刻、限定时段和结束条件；任务按主管的交代运行，结果汇报给主管，可以指定工作目录。
- 工作目录：员工可以在你添加的本机目录里干活。员工页头显示已添加的工作目录数量，设置页每个目录都能「打开目录」「设为默认」「移除」；主管提到还没添加的目录时，员工会直接提示去客户端添加，而不是去试。
- 有新版本时，侧边栏和托盘会提醒；点「下载更新」后按钮原地变成进度条（百分比、大小、速度），下完点「重启并更新」，失败可重试。发现新版本和下载完成时各发一次系统通知。
- 桌面客户端与控制台统一改名为 Roster；已有数据原样沿用，不需要迁移。

### 改进
- 整页加载换成骨架屏。
- 员工好几天没收到消息不再标黄：没人找员工不是故障，照常显示绿灯并写出最近一条消息的时间。
- 配置里只写了主管的情况下，也能正确显示主管名字，不再显示「未设置主管」。
- 员工回复里提到你的工作目录或主目录下的普通文件路径时，原样保留（工作目录里的路径显示为「目录名 + 相对路径」），不再被抹成「内部路径已省略」。
- 内置工具链按实际内容判断是否需要更新，升级客户端后会可靠地换上新版工具。
- 记忆页边距与其他列表页一致，「按用途的消耗」名字列加宽、数值列对齐。
- 侧边栏左上角的 Roster 品牌标识放大。

### 修复
- 定时任务：最短间隔调整为 10 分钟；表单校验的提示显示在对应字段下；连点「立即运行」不再叠加出多份；列表显示每个任务累计运行次数；修复界面卡死、未接到任务时的提示、头像与列宽等问题。
- 部分大脑在主管对话中会读取尚未添加的目录，现在一律拦下并提示去客户端添加。
- macOS 上后台服务指向的程序已不存在时，会改为直接在本机拉起服务，不再出现「重启后台服务」后员工全部停止。
- Windows：正确识别带盘符的路径。

---

### New
- Scheduled tasks: a new Scheduled tasks page in the console sidebar, plus a matching tab on each employee. Create tasks with a full-page wizard (pick the employee → describe the task → confirm). Frequency can be one-off, every N minutes/hours, daily, weekly, monthly or a custom rule, with support for every N days/weeks, month end, the Nth weekday, several times a day, time windows and end conditions. Tasks run on the supervisor's instructions, report back to the supervisor, and can be given a working directory.
- Working directories: employees can work inside local folders you add. The employee header shows how many working directories are added, and each one in settings can be opened, set as default or removed. If the supervisor mentions a folder that has not been added, the employee says to add it in the app instead of trying.
- When an update is available, the sidebar and tray let you know. Download Update turns into an in-place progress bar (percent, size, speed), then Restart to Update; failures offer Retry. You get one system notification when a new version is found and one when it has downloaded.
- The desktop app and console are now named Roster everywhere. Existing data is kept as-is; nothing to migrate.

### Improvements
- Full-page loading now shows skeleton screens.
- An employee that has not received messages for days is no longer flagged yellow: no one messaging it is not a fault, so it stays green and shows the time of the last message.
- The supervisor's name now shows correctly when only the supervisor's ID is configured, instead of "No supervisor set".
- File paths in replies that point into your working directories or ordinary folders in your home directory are kept (working-directory paths are shown as folder name + relative path) instead of being replaced with "internal path omitted".
- The bundled toolchain is now checked by its actual contents, so upgrading the app reliably brings the new tools with it.
- Memory pages use the same margins as other list pages; the usage-by-purpose table has a wider name column and aligned numbers.
- The Roster logo at the top of the sidebar is larger.

### Fixes
- Scheduled tasks: the minimum interval is now 10 minutes; validation messages show under the relevant field; clicking Run now repeatedly no longer queues duplicate runs; the list shows each task's total run count; fixed a UI freeze, the hint shown when an employee has not picked up a task, avatars and column widths.
- Some brains could read folders that had not been added during supervisor conversations; those reads are now blocked with a hint to add the folder in the app.
- On macOS, if the background service points at a program that no longer exists, the service is now started locally instead, so Restart background service no longer leaves all employees stopped.
- Windows: paths with drive letters are recognized correctly.

## 0.1.25 · 2026-10-16

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.25)

### 新功能
- 各个大脑（OpenCode、Claude Code、Codex、DeepSeek Harness、Hermes、Pi）都可以选「MemoryLake 模型服务」作为模型提供方：按量从 MemoryLake 余额扣费，每名员工使用开通记忆时发放的专属 key，不用另填。
- 大脑页与员工设置页新增「供应商」选择，选 MemoryLake 时模型从 MemoryLake 的模型清单中挑选。
- 选了 MemoryLake 模型服务但还没连接 MemoryLake 或员工还没开通记忆时，会就地提示并给出「连接 MemoryLake」「开通记忆」按钮；新建员工向导里选了这类大脑时，也会提示需要同时开通记忆并可一键打开。

### 改进
- 内置的 MemoryLake 命令行工具升级到最新版。

### 修复
- Pi 的徽标换成官方单色样式，并跟随应用的深浅主题切换。

---

### New
- Every brain (OpenCode, Claude Code, Codex, DeepSeek Harness, Hermes, Pi) can now use the MemoryLake model service as its model provider: usage is billed to your MemoryLake balance, and each employee uses the personal key issued when their memory is enabled, so there is nothing extra to enter.
- The Brains page and employee settings have a new Provider choice; with MemoryLake selected, models are picked from MemoryLake's model list.
- If MemoryLake is not connected yet, or the employee has no memory enabled, the app explains this in place and offers Connect MemoryLake / Enable memory buttons; the new-employee wizard also flags this for such brains and lets you turn memory on in one click.

### Improvements
- The bundled MemoryLake command-line tool is updated to the latest version.

### Fixes
- The Pi badge now uses the official single-color design and follows the app's light/dark theme.

## 0.1.24 · 2026-10-15

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.24)

### 新功能
- 大脑页为每个大脑显示响应速度：一行五格条加「通常多久」，优先用本机实测，样本不够时给出参考值，细节在悬浮提示里。
- Pi / Hermes 的模型改成下拉选择，选项来自 MemoryLake 实际可用的模型清单。
- 员工页头的平台、模型、主管标签可以点击，直接跳到设置页对应分组。
- 总览页右下角新增 Roster 形象：眼睛跟着指针转，闲置久了会打瞌睡，点一下就醒。

### 改进
- 权限页里已经设置过的被拒项会显示当前状态；放行范围较宽时改为确认后照常写入，不再直接拒绝。
- 添加 IM 渠道时钉钉数字员工排到最后，并提示需要企业先开通钉钉数字员工功能。

### 修复
- 放行目录中带通配符时，自动退到通配符之前的目录，不再报「path 要写成绝对目录」。
- 放行成功提示与「范围太宽」确认框现在按界面语言显示。
- 切换大脑后不再把上一个大脑用过的模型当成默认模型显示；没设模型且大脑还没运行过时显示「默认模型」。
- 大脑卡片上的响应速度统一贴底对齐。

---

### New
- The Brains page now shows response speed for each brain: a five-segment bar plus typical latency, based on local measurements when available and a reference value otherwise, with details on hover.
- Pi / Hermes models are now chosen from a dropdown listing the models actually available in MemoryLake.
- The platform, model and supervisor tags in an employee's header are clickable and jump to the matching settings section.
- A Roster character now sits at the bottom right of the Overview: its eyes follow your pointer, it dozes off when idle, and wakes up when clicked.

### Improvements
- On the Permissions tab, denied groups you have already configured show their current state; overly broad grants now ask for confirmation and are then saved instead of being rejected.
- When adding an IM channel, DingTalk digital employees are listed last, with a note that your organization must enable the feature first.

### Fixes
- Allowing a directory pattern that contains wildcards now falls back to the directory before the wildcard instead of failing with an "absolute directory" error.
- The success toast and the "too broad" confirmation now follow the interface language.
- After switching brains, the previous brain's model is no longer shown as the default; "Default model" is shown when no model is set and the brain has not run yet.
- Response speed on brain cards is consistently aligned to the bottom.

## 0.1.23 · 2026-10-14

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.23)

No release notes were written for this version. · 本版未写更新说明。

## 0.1.22 · 2026-10-14

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.22)

No release notes were written for this version. · 本版未写更新说明。

## 0.1.21 · 2026-10-14

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.21)

No release notes were written for this version. · 本版未写更新说明。

## 0.1.20 · 2026-10-14

[Release](https://github.com/memorylake-ai/roster-releases/releases/tag/v0.1.20)

No release notes were written for this version. · 本版未写更新说明。
