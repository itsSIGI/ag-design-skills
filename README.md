# Sigi Design Skills

> AI 驱动的全链路设计系统工具链 —— 5 个协作 Skills + 1 个入口路由，覆盖**需求分析 → 视觉创意 → 代码生成 → 合规审计**完整设计工作流。适用于 Claude Code、Cursor、Codex 等主流 AI Coding 工具。

## 这是什么？

Sigi Design Skills 是一套专为 B 端产品设计的 AI 辅助设计系统。它不是一个组件库，而是 **6 个 AI Skills 组成的智能工作流**（5 个业务 skill + 1 个入口路由），每个 Skill 负责设计流程中的一个环节，把模糊的产品需求转化为符合设计规范的生产代码。可配合 Claude Code、Cursor、Windsurf、Codex 等任意支持自定义指令的 AI Coding 工具使用。

### 核心价值

- **全链路覆盖**：从需求文档到可交付代码，不需要在工具间切换
- **设计系统即规则**：Token 体系 + 铁律约束 + 合规审计，确保产出一致性
- **创意与规范并存**：TIER 分级机制允许 Landing page 等场景突破标准约束，同时保证合规
- **Recipe-first**：先锁定组件配方（Recipe），再写代码，避免"边写边改"

### Skills 一览

| Skill | 职责 | 一句话描述 |
|-------|------|-----------|
| **sigi-design** | 入口路由 | 不确定该用哪个时先进这里 |
| **sigi-design-scope** | 需求分析 | 把产品文档拆成结构化的 UI 模块规格表 |
| **sigi-design-vision** | 视觉创意 | 为需要审美创新的页面生成 Vision Spec |
| **sigi-design-build** | 代码生成 | 按 Recipe 生成符合设计系统的组件代码 |
| **sigi-design-audit** | 审计与仲裁 | 独立冷启动审计 + 多方案设计裁决 |
| **sigi-design-system** | 设计基座 | Token 体系 + 组件规范 + 达标清单 |

---

## 协作链路

```
需求文档 → scope → 规格表 ─┬─────────────→ build → 代码 → audit
                          │                 ↑
              标「视觉创新」└→ vision → Spec ┘
```

三条接口，各自靠**产物文件**传递，不靠会话上下文：

| 接口 | 产物 | 下游 |
|------|------|------|
| scope → build | `docs/sigi-design/specs/<date>-<topic>.md` | build 读规格表 |
| vision → build | `docs/sigi-design/vision/<date>-<topic>.md` | build 读 Vision Spec |
| build → audit | 项目代码 + Locked Recipe | audit 冷启动审计 |

每份产物**头部自带下游指令**，换会话、换人打开文件链路都不断。

`sigi-design-system` 不在链路上——它是被动查询的数据源，其余 skill 随时读它。

---

## 快速开始

### 前置要求

- 任意支持自定义指令 / System Prompt 的 AI Coding 工具
- GitHub 账号（用于 clone）

### 安装步骤

> **推荐用一键脚本安装**（适用于 Claude Code）：脚本会把仓库克隆到 `~/.ag-design-skills`，再把 6 个 skill **软链**到 `~/.claude/skills/`。软链的好处是 —— 之后只要 `git pull` 仓库，skills 立即就是最新版,无需重新拷贝。这是实现[自动更新](#自动更新)的基础。

> **从 ag-design-* 旧版升级**：直接跑 `bash scripts/install.sh` 即可，
> 脚本会自动清理旧的 `ag-design-*` 悬空软链，无需手动删除。

#### 1. 克隆仓库

```bash
git clone https://github.com/itsSIGI/ag-design-skills.git
cd ag-design-skills
```

#### 2. 接入你的 AI Coding 工具

根据你使用的工具，选择对应的接入方式：

---

**Claude Code（推荐：一键脚本）**

```bash
bash scripts/install.sh
```

脚本会自动完成：克隆/更新仓库到 `~/.ag-design-skills` → 软链 6 个 skill 到 `~/.claude/skills/` → 打印自动更新的接入引导。脚本**幂等**，可重复运行。

> 之前用 `cp -r` 拷贝装过的人:直接跑一次 `bash scripts/install.sh` 即可，脚本会自动把旧拷贝目录替换为软链，无需手动清理。

如果你想手动接入(不想用脚本)，把 6 个目录软链过去即可：

```bash
mkdir -p ~/.claude/skills
for s in sigi-design sigi-design-system sigi-design-scope \
         sigi-design-vision sigi-design-build sigi-design-audit; do
  ln -sfn "$(pwd)/$s" ~/.claude/skills/$s
done
```

---

**Cursor**

> 建议把仓库克隆到统一位置 `~/.ag-design-skills`（与 Claude Code 共用，方便用 `update.sh` 一处更新）；也可克隆到项目目录。下方 rules 里的路径按你的实际克隆位置替换即可。

将仓库克隆后，在 Cursor Settings → Rules 中添加项目级规则文件 `.cursorrules`：

```
请阅读 ag-design-skills/ 目录下的 SKILL.md 文件作为设计系统指令：
- 生成 UI 代码时，遵循 sigi-design-build/SKILL.md 的 Recipe-first 流程
- Token 值参考 sigi-design-system/references/tokens.md
- 组件用法参考 sigi-design-system/references/components-v2.md
- 页面原型参考 sigi-design-build/references/page-archetypes/
```

或者在 Cursor 的 Project Rules（`.cursor/rules/`）中创建规则文件，将各 SKILL.md 的关键内容作为上下文注入。

---

**Windsurf**

在项目根目录创建 `.windsurfrules` 文件，引用 skill 目录中的指令：

```
请将 ag-design-skills/ 目录下各 SKILL.md 作为设计系统规范。
生成 UI 时遵循 sigi-design-build/SKILL.md 的流程，Token 和组件规范见 sigi-design-system/。
```

---

**Codex (OpenAI)**

在项目根目录创建 `AGENTS.md`，将关键 skill 指令写入：

```markdown
# Design System Instructions

生成 UI 代码时遵循以下规范：
- 工作流：sigi-design-build/SKILL.md（Recipe-first 流程）
- Token 体系：sigi-design-system/references/tokens.md
- 组件库：sigi-design-system/references/components-v2.md
- 决策表：sigi-design-build/references/decision-tables.md
- 页面原型：sigi-design-build/references/page-archetypes/
```

---

**其他工具（Copilot / Cline / Aider 等）**

核心思路相同——将各 SKILL.md 的内容作为 System Prompt 或自定义指令注入。每个 SKILL.md 都是自包含的指令文档，AI 读取后即可按流程执行。推荐优先注入：

1. `sigi-design-build/SKILL.md` — 代码生成主流程（必选）
2. `sigi-design-system/references/tokens.md` + `components-v2.md` — Token 和组件参考（必选）
3. 其余 skill 按需注入

#### 3. 验证安装

在你的 AI 工具中输入以下内容，检查是否按 Recipe 流程工作：

```
帮我生成一个 Dashboard 页面
```

如果正确激活，你会看到 AI 首先加载组件清单和 token 体系，然后输出 Locked Recipe 表请你确认，确认后再生成代码。

---

## 自动更新

这套 skills 会持续优化迭代。为了让你始终用到最新版本，按你的工具选择对应方式：

### Claude Code —— 完全自动（推荐）

启动时静默拉取最新版，**装一次，之后永久自动**，仅在真正更新时提示一行。

只要你用 `bash scripts/install.sh` 安装，**自动更新已经帮你配好了** —— 脚本会把更新 hook 自动合并进 `~/.claude/settings.json`（保留你已有的所有配置，并先备份原文件）。重启 Claude Code 即可生效，无需手动改 JSON。

之后每次启动 Claude Code：
- 有新版本 → 自动拉取并打印 `✓ Sigi Design Skills 已更新到 <版本>: <说明>`
- 无更新 / 无网络 → 完全静默，绝不阻塞启动

> **想手动配置 / 重新配置？** 单独运行：
> ```bash
> bash ~/.ag-design-skills/scripts/configure-hook.sh
> ```
> 它是幂等的（已配置则跳过），优先用 `jq`，没装则降级用系统自带的 `python3` 安全合并。两者都没有时会打印手动配置片段。

### Cursor / Windsurf / Codex / 其他工具 —— 手动更新

这些工具没有 hook 机制，无法在启动时自动拉取。需要时跑一下更新命令即可：

```bash
bash ~/.ag-design-skills/scripts/update.sh
```

它会拉取最新版并显示版本变化。由于 skills 是软链到 `~/.ag-design-skills`，`git pull` 后即时生效，无需重新配置。

> **想准自动？** 可以用系统定时任务在后台定期拉取，例如 macOS / Linux 的 cron 每天更新一次：
> ```bash
> # crontab -e 加入一行（每天 10:00 静默更新）
> 0 10 * * * bash ~/.ag-design-skills/scripts/update.sh > /dev/null 2>&1
> ```

### 检查当前版本

```bash
git -C ~/.ag-design-skills log -1 --pretty='%h %s (%cr)'
```

---

### 首次使用示例

**示例 1：标准页面生成**
```
帮我做一个数据概览 Dashboard，包含 4 个 KPI 卡片和一个折线图
```
→ 激活 `sigi-design-build`，走 Recipe-first 流程

**示例 2：需求分析 → 代码生成**
```
这是我们的产品需求文档 [粘贴文档内容]，帮我分析并生成对应页面
```
→ 激活 `sigi-design-scope`（需求分析）→ 输出规格表 → 交给 `sigi-design-build`（代码生成）

**示例 3：视觉创新页面**
```
帮我做一个有科技感的产品 Landing page
```
→ 激活 `sigi-design-vision`（搜索灵感、生成 3 个方向供选择）→ 选定方向后生成 Vision Spec → 交给 `sigi-design-build`（按 Spec 生成代码）

**示例 4：设计方案对比**
```
这两个方案哪个更好？[贴出方案 A 和方案 B]
```
→ 激活 `sigi-design-audit` 的设计决策仲裁模式，从 Trust / Task / Accessibility 维度评估

**示例 5：不确定该用哪个**
```
我想优化一下我们产品的界面，但不知道从哪开始
```
→ 激活 `sigi-design`（入口路由），按索引表判断该进哪个 skill

---

## 各 Skill 详细介绍

### sigi-design — 入口路由

**职责**：5 个业务 skill 的路由层。**本 skill 不做业务**，只负责把需求送进正确的 skill。

**核心能力**：
- 需求 → skill 的索引表（什么需求进哪个、产出是什么）
- 优先级规则（过程 skill 先于实现 skill；audit 是 gate 不是可选项）
- Red Flags 清单（识别"这个页面很简单不用走流程"这类跳步的自我说服）

**关键文件**：
- `SKILL.md` — 索引表 + 标准链路 + 优先级规则 + Red Flags（全部内容，无 references）

**触发方式**：设计 / UI / 页面 / 组件 / 视觉 / 需求分析相关请求，且不确定该进哪个 skill 时。用户已明确点名某个 skill 时不必经本层。

---

### sigi-design-scope — 需求分析

**职责**：将产品需求文档、用户调研、会议记录等原始输入，拆解为结构化的 UI 模块规格表，供 build 直接消费。

**核心能力**：
- 文档摄入与结构化提取（支持飞书链接、截图、文本）
- 竞品与行业参照分析、定量数据分析（可选步骤）
- 角色识别与操作动线绘制
- 需求目标 → 设计目标的方法论推导（JTBD / FOGG / AIDA 等框架）
- 设计策略拆解（机制级，非 UI 级）
- UI 模块规格表输出（build 的直接入参）

**关键文件**：
- `SKILL.md` — 完整工作流（Step 1-6）
- `references/design-goal-strategy-framework.md` — 目标推导方法论
- `references/role-question-bank.md` — 角色追问题库
- `references/output-template.md` — 规格表输出模板（含下游指令头）
- `references/domain-context.md` — 领域背景知识
- `references/examples/` — 已有案例参考

**产物**：`docs/sigi-design/specs/<date>-<topic>.md`

**触发方式**：当用户提供需求文档、调研报告、或需要分析"做什么"时激活。

---

### sigi-design-vision — 视觉创意

**职责**：为需要审美创新的页面（Landing page、品牌页、或用户明确要求视觉冲击力的任意页面类型）生成结构化的 Vision Spec。

**核心能力**：
- AI 主动搜索设计灵感（Dribbble / Behance / Awwwards）
- 内置审美参考库（30+ 高质量设计参考，按 6 大视觉特质分类）
- 风格方向探索（3 选 1 机制，用户确认后深化）
- **可视化设计稿**：方向探索出 3 选 1 并排稿、Vision Spec 交付前出完整视觉稿，工具由用户选（独立 HTML / Pencil），直接看效果再决策
- Vision Spec 生成（视觉方向 / 配色 / 排版 / 布局 / 动效 / 插画 / 合规桥接）
- TIER 分级 + TOKEN_ESCAPE 预算管理

**关键文件**：
- `SKILL.md` — 完整工作流（Step 0-5）
- `references/vision-spec-template.md` — Vision Spec 输出模板（含下游指令头）
- `references/direction-exploration.md` — 3 选 1 方向探索流程
- `references/style-vocabulary.md` — 风格原型词汇表
- `references/color-theory.md` — 配色理论与调色板配方
- `references/typography-rhythm.md` / `references/motion-choreography.md` — 排版韵律 / 动效编排
- `references/motion-libraries.md` — 动效开源库推荐
- `references/html-mockup-protocol.md` — 可视化设计稿协议（vision/build 共享，出稿工具由用户选 HTML/Pencil，挂真实 token）
- `references/aesthetic-library/index.md` — 内置审美参考库索引（原型参数 / 行业配色 / Section 范式 / 页面组合 / 精选灵感）
- `references/guardrails.md` / `references/aesthetic-self-check.md` — 防过度设计护栏 / 审美自检
- `references/build-handoff-guide.md` — 交付 build 的交接指南

**产物**：`docs/sigi-design/vision/<date>-<topic>.md`

**触发词**：`Landing page` / `营销页` / `品牌页` / `视觉创新` / `高级感` / `品牌调性` / `视觉冲击力` / `有设计感` 等。

---

### sigi-design-build — 代码生成

**职责**：按 Recipe 生成符合设计系统规范的 UI 组件代码。是整个工具链的**执行层**。

**核心能力**：
- Recipe-first 工作流（先锁定组件配方，再写代码）
- Pattern 匹配快速路径（命中已有模式则直接复用）
- 12 种页面原型（Dashboard / List-Table / Entity-Detail / AI-Chat 等）
- Vision Spec 模式（接收 vision 的 TIER_3 创意方案）
- **静态预览稿**：落地真实代码前先出稿（HTML / Pencil 由用户选），不起 dev server、不登录就能看方案效果，确认后再落地
- 多层质量关卡（Step 3.5 视觉自检 → Step 3.6 Token 校验 → Step 4 独立审计）
- Patch Mode 局部修改快速路径

**关键文件**：
- `SKILL.md` — 完整工作流（Step 0-6）+ 6 条铁律汇总
- `references/recipe-template.md` — Locked Recipe 输出模板
- `references/recipe-gate.md` — Recipe 门禁规则
- `references/skill-startup.md` — 启动加载顺序与渐进披露策略
- `references/pipeline-details.md` — Figma / 截图读取等流程细节
- `references/decision-tables.md` — 业务场景→组件类型决策表
- `references/design-rules.md` — 组合层规则
- `references/aesthetic-recipes.md` — 审美配方：视觉选择的安全下限决策树
- `references/vision-spec-mode.md` — Vision Spec 模式详解
- `references/page-archetypes/` — 12 种页面原型
- `references/patterns/` — 可复用代码模式（`pattern-index.json` + `blocks/`）
- `references/visual-polish-guide.md` — 视觉精修指南
- `references/open-source-guide.md` — 开源组件集成指南
- `TROUBLESHOOTING.md` — 常见问题排查

**触发方式**：用户要求生成 UI 页面、组件时激活。

---

### sigi-design-audit — 审计与仲裁

**职责**：对 build 产出的代码进行独立的合规审计。**冷启动、单一职责**，不被主流程上下文污染。此外承担**设计决策仲裁**——当存在多个设计方案需要取舍时，提供有理有据的裁决。

**核心能力**：
- Token 合规检查（硬编码检测、token 臆造检测、类名验证）
- Recipe 一致性检查（代码是否匹配 Locked Recipe）
- Vision Spec 模式下的 TOKEN_ESCAPE 声明完整性验证
- PASS / FAIL 二元结论（FAIL 时列出具体违规项 + 修复建议）
- 反向定位模式（模式 2）：从现象倒推是哪一步出的错
- **设计决策仲裁（模式 3）**：多方案对比评估（Trust > Task > Accessibility 维度排序）、设计宪法执行（红线扫描、合规判定）

**关键文件**：
- `SKILL.md` — 审计流程与检查清单（含模式 3 设计决策仲裁）
- `references/checklist.md` — 完整审计检查项（7 类）
- `references/audit-report-template.md` — 审计报告输出模板
- `references/arbitration-flow.md` — 设计决策仲裁流程（Step 0-5）
- `references/design-constitution.md` — 设计宪法：核心公理 + 红线 + 优先级

**触发方式**：build Step 4 自动调用。也可独立使用审计任意代码，或在需要方案取舍时进入设计决策仲裁模式。

**这里是终点**——audit 不产出代码、不启动新流程。PASS 交还用户；FAIL 回 build 修复后重审；2 轮仍 FAIL 则把冲突呈现给用户决策。

---

### sigi-design-system — 设计基座

**职责**：提供 Token 体系、组件规范、达标清单。不直接参与工作流，而是作为其他 Skill 的**权威数据源**。

**核心内容**：
- `assets/tokens.css` — 完整的 CSS 自定义属性（颜色 / 间距 / 圆角 / 阴影 / 字体，含 light/dark 双模式）
- `references/tokens.md` — Token 速查参考（语义色、原始色阶、字体栈、间距、圆角）
- `references/token-selection.md` — Token 选型规则：把设计判断落到工程表达
- `references/components-v2.md` — shadcn/ui 26 标准组件 + AG 7 扩展组件的 API / 变体 / 约束
- `references/react.md` / `references/vue.md` — 框架专属用法
- `references/checklist.md` — 达标自检清单

**技术栈**：
- **组件层**：[shadcn/ui](https://ui.shadcn.com/) 为基础，AG 扩展层 7 个专属组件
- **Token 层**：CSS 自定义属性，三层架构 `tokens.css → token-bridge.css → 组件`
- **AI 聊天**：[assistant-ui](https://www.assistant-ui.com/) 提供运行时能力

---

## 核心概念

### Token 体系

AG 使用 CSS 自定义属性（CSS Custom Properties）构建三层 token 体系：

```
tokens.css（原始值）
  ↓
token-bridge.css（语义映射）
  ↓
组件层（shadcn/ui + AG 扩展）
```

所有视觉值（颜色、间距、圆角、阴影、字重）必须通过 `var(--*)` 引用，禁止硬编码。

### Recipe-first 工作流

build 的核心机制——**先锁定组件配方（Recipe），再写代码**：

1. 拆分 UI 为语义槽位（slot）
2. 查决策表选组件类型
3. 从组件库确认 `.ag-*` 类 / shadcn 组件
4. 输出 **Locked Recipe 表**（用户确认后才生成代码）

Recipe 是契约：代码不得偏离 Recipe，新增必须回 Step 1 补行。

### TIER 分级

页面不同区域的设计自由度分三级：

| TIER | 区域 | 规则 |
|------|------|------|
| TIER_1 | 导航 / 系统 UI / 页脚 | 标准 AG token，零 TOKEN_ESCAPE |
| TIER_2 | 普通内容区 | AG token + 装饰色板扩展 |
| TIER_3 | 创意区（Hero 等） | 自由创意，每个偏离值需 TOKEN_ESCAPE 声明 |

### TOKEN_ESCAPE

当 TIER_3 区域需要突破标准 token 限制时，使用 TOKEN_ESCAPE 声明：

```markdown
| Role | Value | AG Token Mapping | Scope |
|------|-------|------------------|-------|
| Hero 背景 | #0C0F1A | TOKEN_ESCAPE: hero-bg | Hero section only |
```

每份 Vision Spec 最多 **15 个 TOKEN_ESCAPE**（TIER_1 = 0，TIER_2 ≤ 5，TIER_3 ≤ 10）。

### 3 条核心原则

1. **ALWAYS Reference BEFORE Implement** — 写组件前必须先从组件库查到用法，不凭记忆
2. **Recipe 是契约** — 代码不得偏离 Recipe，新增组件必须回 Step 1 补行
3. **业务层零硬编码** — 颜色/间距/圆角/阴影/字重全走 `var(--)` 或组件类，唯一可手写的是布局

---

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 组件基础 | [shadcn/ui](https://ui.shadcn.com/) | 26 个标准组件 |
| AG 扩展 | 7 个专属组件 | StatusDot / CodeBlock / ChatBubble 等 |
| AI 聊天运行时 | [assistant-ui](https://www.assistant-ui.com/) | streaming / 分支对话 / 工具调用 |
| Token | CSS Custom Properties | `tokens.css` 一键换肤 |
| 框架支持 | React / Vue / Vanilla HTML | 按项目技术栈选择 |

---

## 项目结构

```
ag-design-skills/
├── sigi-design/                  # 入口路由：把需求送进正确的 skill
│   └── SKILL.md                  # 索引表 + 优先级规则 + Red Flags（无 references）
│
├── sigi-design-system/           # 设计基座：Token + 组件规范
│   ├── SKILL.md
│   ├── assets/
│   │   └── tokens.css            # 完整 CSS Token 文件（含 light/dark）
│   └── references/
│       ├── tokens.md             # Token 速查
│       ├── token-selection.md    # Token 选型规则
│       ├── components-v2.md      # 组件 API（shadcn + AG 扩展）
│       ├── react.md              # React 用法
│       ├── vue.md                # Vue 用法
│       └── checklist.md          # 达标自检
│
├── sigi-design-scope/            # 需求分析
│   ├── SKILL.md
│   └── references/
│       ├── design-goal-strategy-framework.md
│       ├── role-question-bank.md
│       ├── output-template.md    # 规格表模板（含下游指令头）
│       ├── domain-context.md
│       └── examples/             # 案例参考
│
├── sigi-design-vision/           # 视觉创意
│   ├── SKILL.md
│   └── references/
│       ├── vision-spec-template.md     # Vision Spec 模板（含下游指令头）
│       ├── direction-exploration.md    # 3 选 1 方向探索
│       ├── style-vocabulary.md         # 风格原型词汇表
│       ├── color-theory.md             # 配色理论
│       ├── typography-rhythm.md        # 排版韵律
│       ├── motion-choreography.md      # 动效编排
│       ├── motion-libraries.md         # 动效开源库
│       ├── illustration-guide.md       # 插画指导
│       ├── mood-board-method.md        # 情绪板方法
│       ├── visual-narrative.md         # 视觉叙事
│       ├── html-mockup-protocol.md     # 可视化设计稿协议
│       ├── guardrails.md               # 防过度设计护栏
│       ├── aesthetic-self-check.md     # 审美自检
│       ├── build-handoff-guide.md      # 交付 build 指南
│       └── aesthetic-library/          # 内置审美参考库
│           ├── index.md                # 库索引（入口）
│           ├── archetypes/             # 风格原型参数
│           ├── palettes/               # 行业配色方案
│           ├── patterns/               # Section 视觉范式
│           ├── compositions/           # 页面组合参考
│           └── inspirations/           # 精选设计灵感
│
├── sigi-design-build/            # 代码生成
│   ├── SKILL.md
│   ├── TROUBLESHOOTING.md
│   └── references/
│       ├── recipe-template.md          # Locked Recipe 模板
│       ├── recipe-gate.md              # Recipe 门禁规则
│       ├── skill-startup.md            # 启动加载 + 渐进披露
│       ├── pipeline-details.md         # Figma/截图读取流程细节
│       ├── decision-tables.md          # 业务→组件决策表
│       ├── design-rules.md             # 组合层规则
│       ├── aesthetic-recipes.md        # 审美配方决策树
│       ├── vision-spec-mode.md         # Vision Spec 模式
│       ├── open-source-guide.md        # 开源组件指南
│       ├── visual-polish-guide.md      # 视觉精修
│       ├── quality-self-check.md       # 质量自检
│       ├── harden-checklist.md         # 非正常路径清单
│       ├── assistant-ui-guide.md       # assistant-ui 集成指南
│       ├── patch-mode.md               # 局部修改协议
│       ├── multi-page-flow.md          # 多页面流程
│       ├── responsive-and-handoff.md   # 响应式 + 交接
│       ├── component-missing-protocol.md
│       ├── diagnostic-protocol.md
│       ├── anti-examples.md            # 翻车案例
│       ├── page-archetypes/            # 12 种页面原型
│       └── patterns/                   # 可复用模式（pattern-index.json + blocks/）
│
├── sigi-design-audit/            # 合规审计 + 设计仲裁
│   ├── SKILL.md
│   └── references/
│       ├── checklist.md                # 审计清单（7 类）
│       ├── audit-report-template.md    # 审计报告模板
│       ├── arbitration-flow.md         # 设计决策仲裁流程
│       └── design-constitution.md      # 设计宪法：公理 + 红线
│
├── scripts/                      # 安装 / 更新 / 验收
│   ├── install.sh                # 一键安装（含旧版软链清理）
│   ├── update.sh                 # 手动更新
│   ├── auto-update.sh            # Claude Code 启动 hook
│   ├── configure-hook.sh         # 自动更新 hook 配置
│   └── verify-skills.sh          # 结构验收断言
│
└── tests/
    └── skill-triggering/         # 触发测试用例
        ├── cases.md
        └── README.md
```

---

## 许可证

[MIT](LICENSE)
