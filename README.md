# AG Design Skills

> AI 驱动的全链路设计系统工具链 —— 为 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 打造的 6 个协作 Skills，覆盖**需求分析 → 视觉创意 → 代码生成 → 合规审计**完整设计工作流。

## 这是什么？

AG Design Skills 是一套专为 B 端产品设计的 AI 辅助设计系统。它不是一个组件库，而是 **6 个 Claude Code Skills 组成的智能工作流**，每个 Skill 负责设计流程中的一个环节，通过 8 个标准化接口协作，将模糊的产品需求转化为符合设计规范的生产代码。

### 核心价值

- **全链路覆盖**：从需求文档到可交付代码，不需要在工具间切换
- **设计系统即规则**：Token 体系 + 6 条铁律 + 合规审计，确保产出一致性
- **创意与规范并存**：TIER 分级机制允许 Landing page 等场景突破标准约束，同时保证合规
- **Recipe-first**：先锁定组件配方（Recipe），再写代码，避免"边写边改"

### 6 个 Skills 一览

| Skill | 职责 | 一句话描述 |
|-------|------|-----------|
| **ag-design-compass** | 需求分析 | 将产品文档拆解为结构化的 UI 模块规格表 |
| **ag-design-vision** | 视觉创意 | 为需要审美创新的页面生成 Vision Spec |
| **ag-design-craft** | 代码生成 | 按 Recipe 生成符合设计系统的组件代码 |
| **ag-design-arbiter** | 设计仲裁 | 在多个设计方案间做出有依据的裁决 |
| **ag-design-audit** | 合规审计 | 独立冷启动审计，检查代码是否符合设计规范 |
| **ag-design-system** | 设计基座 | Token 体系 + 组件规范 + 达标清单 |

---

## 协作链路

```
用户需求
  │
  ├─── 功能性页面 ──────────────────────────────────────────────┐
  │                                                              │
  ├─── 需要审美创新？ ─── YES ──┐                                │
  │                              │                                │
  ▼                              ▼                                ▼
┌──────────────┐         ┌──────────────┐         ┌───────────────┐
│  compass     │         │  vision      │         │  craft        │
│  需求拆解     │         │  视觉创意     │         │  UI 代码生成   │
│              │ 规格表   │              │ Vision  │               │
│  Step 1-6   │────────▶│  Step 0-5    │─Spec──▶│  Step 1-6     │
│              │ +视觉创新│              │         │               │
└──────────────┘ 标记    └──────────────┘         │  接收两种输入：│
       ▲                   ▲    │                  │  A) 标准 recipe│
       │ 策略冲突            │    │ 合规查询          │  B) Vision Spec│
       │                   │    ▼                  │               │
┌──────────────┐         合规裁决                   │  Step 4 ──────┼──▶ audit
│  arbiter     │ ◀─── 接口 8 ──────────            │    ▼          │    合规审计
│  设计决策仲裁 │                                   │  Step 5-6     │
│              │ ◀─── craft 设计决策问题             └───────────────┘
│              │ ──── 裁决结论 → recipe ──────────────────▶
│              │ ◀─── audit → arbiter 标注
└──────────────┘
       ▲
       │ → arbiter 标注
┌──────────────┐
│  audit       │
│  合规审计     │
└──────────────┘
```

### 8 个协作接口

| 接口 | 方向 | 传递内容 | 触发条件 |
|------|------|---------|---------|
| 接口 1 | compass → craft | UI 模块规格表 | compass 完成需求分析 |
| 接口 2 | craft → audit | 生成代码 + Locked Recipe | craft 代码生成完毕 |
| 接口 3 | audit → arbiter | 违规升级（设计决策问题） | audit 发现非实现层问题 |
| 接口 4 | arbiter → craft | 裁决结论注入 Recipe | craft 遇到多选一槽位 |
| 接口 5 | compass ↔ arbiter | 策略冲突仲裁 | compass 策略相互矛盾 |
| 接口 6 | compass → vision | Creative Brief | 模块标注"视觉创新: 是" |
| 接口 7 | vision → craft | Vision Spec (7 章节) | vision 完成视觉方案 |
| 接口 8 | vision ↔ arbiter | 创意合规查询/裁决 | vision 发现红线张力 |

---

## 各 Skill 详细介绍

### ag-design-compass — 需求分析

**职责**：将产品需求文档、用户调研、会议记录等原始输入，拆解为结构化的 UI 模块规格表，供 craft 直接消费。

**核心能力**：
- 文档摄入与结构化提取（支持飞书链接、截图、文本）
- 角色识别与操作动线绘制
- 需求目标 → 设计目标的方法论推导（JTBD / FOGG / AIDA 等框架）
- 设计策略拆解（机制级，非 UI 级）
- UI 模块规格表输出（craft 的直接入参）

**关键文件**：
- `SKILL.md` — 完整工作流（Step 1-6）
- `references/design-goal-strategy-framework.md` — 目标推导方法论
- `references/role-question-bank.md` — 角色追问题库
- `references/examples/` — 已有案例参考

**触发方式**：当用户提供需求文档、调研报告、或需要分析"做什么"时激活。

---

### ag-design-vision — 视觉创意

**职责**：为需要审美创新的页面（Landing page、品牌页、或用户明确要求视觉冲击力的任意页面类型）生成结构化的 Vision Spec。

**核心能力**：
- AI 主动搜索设计灵感（Dribbble / Behance / Awwwards）
- 内置审美参考库（30+ 高质量设计参考，按 6 大视觉特质分类）
- 风格方向探索（3 选 1 机制，用户确认后深化）
- Vision Spec 生成（7 章节：视觉方向 / 配色 / 排版 / 布局 / 动效 / 插画 / AG 合规桥接）
- TIER 分级 + TOKEN_ESCAPE 预算管理

**关键文件**：
- `SKILL.md` — 完整工作流（Step 0-5）
- `references/style-vocabulary.md` — 11+ 风格原型词汇表
- `references/color-theory.md` — 配色理论与调色板配方
- `references/motion-libraries.md` — 30+ 动效开源库推荐
- `references/aesthetic-library/` — 内置审美参考库（原型参数 / 行业配色 / Section 范式 / 页面组合 / 精选灵感）

**触发词**：`Landing page` / `营销页` / `品牌页` / `视觉创新` / `高级感` / `品牌调性` / `视觉冲击力` / `有设计感` 等。

---

### ag-design-craft — 代码生成

**职责**：按 Recipe 生成符合 AG 设计系统规范的 UI 组件代码。是整个工具链的**执行层**。

**核心能力**：
- Recipe-first 工作流（先锁定组件配方，再写代码）
- Pattern 匹配快速路径（命中已有模式则直接复用）
- 12 种页面原型（Dashboard / List-Table / Entity-Detail / AI-Chat 等）
- Vision Spec 模式（接收 vision 的 TIER_3 创意方案）
- 多层质量关卡（Step 3.5 视觉自检 → Step 3.6 Token 校验 → Step 4 独立审计）
- Patch Mode 局部修改快速路径

**关键文件**：
- `SKILL.md` — 完整工作流（Step 0-6）+ 6 条铁律
- `references/decision-tables.md` — 业务场景→组件类型决策表
- `references/page-archetypes/` — 12 种页面原型
- `references/visual-polish-guide.md` — 视觉精修指南
- `references/cross-skill-protocol.md` — 8 个跨 Skill 协作接口定义
- `references/open-source-guide.md` — 开源组件集成指南

**触发方式**：用户要求生成 UI 页面、组件时激活。

---

### ag-design-arbiter — 设计仲裁

**职责**：当存在多个设计方案需要取舍时，提供有理有据的裁决。不做设计，只做仲裁。

**核心能力**：
- 多方案对比评估（Trust > Task > Accessibility 维度排序）
- 设计宪法执行（红线扫描、合规判定）
- Token 选择指导（何时用标准 token、何时允许 TOKEN_ESCAPE）
- 审美配方库（排版 / 配色 / 间距的经过验证的组合方案）

**关键文件**：
- `SKILL.md` — 仲裁流程与输出格式
- `references/design-constitution.md` — 设计宪法（红线 + 原则）
- `references/token-selection.md` — Token 选择规则
- `references/aesthetic-recipes.md` — 审美配方库

**触发方式**：被其他 Skill 通过接口调用，或用户直接要求比较方案时激活。

---

### ag-design-audit — 合规审计

**职责**：对 craft 产出的代码进行独立的合规审计。**冷启动、单一职责**，不被主流程上下文污染。

**核心能力**：
- Token 合规检查（硬编码检测、token 臆造检测、类名验证）
- Recipe 一致性检查（代码是否匹配 Locked Recipe）
- Vision Spec 模式下的 TOKEN_ESCAPE 声明完整性验证
- PASS / FAIL 二元结论（FAIL 时列出具体违规项 + 修复建议）

**关键文件**：
- `SKILL.md` — 审计流程与检查清单
- `references/checklist.md` — 完整审计检查项

**触发方式**：craft Step 4 自动调用。也可独立使用审计任意代码。

---

### ag-design-system — 设计基座

**职责**：提供 Token 体系、组件规范、达标清单。不直接参与工作流，而是作为其他 Skill 的**权威数据源**。

**核心内容**：
- `tokens.css` — 完整的 CSS 自定义属性（颜色 / 间距 / 圆角 / 阴影 / 字体）
- `tokens.md` — Token 速查参考（语义色、原始色阶、字体栈、间距、圆角）
- `components-v2.md` — shadcn/ui 26 标准组件 + AG 7 扩展组件的 API / 变体 / 约束
- `react.md` / `vue.md` — 框架专属用法
- `checklist.md` — 达标自检清单

**技术栈**：
- **组件层**：[shadcn/ui](https://ui.shadcn.com/) 为基础，AG 扩展层 7 个专属组件
- **Token 层**：CSS 自定义属性，三层架构 `tokens.css → token-bridge.css → 组件`
- **AI 聊天**：[assistant-ui](https://www.assistant-ui.com/) 提供运行时能力

---

## 快速开始

### 前置要求

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) 已安装
- GitHub 账号（用于 clone）

### 安装步骤

#### 1. 克隆仓库

```bash
git clone https://github.com/itsCissy/ag-design-skills.git
```

#### 2. 复制到 Claude Code Skills 目录

```bash
# 创建 skills 目录（如不存在）
mkdir -p ~/.claude/skills

# 复制所有 skill
cp -r ag-design-skills/ag-design-system ~/.claude/skills/
cp -r ag-design-skills/ag-design-compass ~/.claude/skills/
cp -r ag-design-skills/ag-design-vision ~/.claude/skills/
cp -r ag-design-skills/ag-design-craft ~/.claude/skills/
cp -r ag-design-skills/ag-design-arbiter ~/.claude/skills/
cp -r ag-design-skills/ag-design-audit ~/.claude/skills/
```

#### 3. 在 Claude Code 中配置 Skills

在你的 Claude Code 设置中（`~/.claude/settings.json` 或项目级 `.claude/settings.json`），添加 skill 路径：

```json
{
  "skills": {
    "ag-design-system": "~/.claude/skills/ag-design-system",
    "ag-design-compass": "~/.claude/skills/ag-design-compass",
    "ag-design-vision": "~/.claude/skills/ag-design-vision",
    "ag-design-craft": "~/.claude/skills/ag-design-craft",
    "ag-design-arbiter": "~/.claude/skills/ag-design-arbiter",
    "ag-design-audit": "~/.claude/skills/ag-design-audit"
  }
}
```

#### 4. 验证安装

在 Claude Code 中输入以下内容，检查 skill 是否被识别：

```
帮我生成一个 Dashboard 页面
```

如果 craft skill 正确激活，你会看到它首先加载组件清单和 token 体系，然后开始 Recipe 流程。

### 首次使用示例

**示例 1：标准页面生成**
```
帮我做一个数据概览 Dashboard，包含 4 个 KPI 卡片和一个折线图
```
→ 激活 `craft`，走 Recipe-first 流程

**示例 2：需求分析 → 代码生成**
```
这是我们的产品需求文档 [粘贴文档内容]，帮我分析并生成对应页面
```
→ 激活 `compass`（需求分析）→ 输出规格表 → 交给 `craft`（代码生成）

**示例 3：视觉创新页面**
```
帮我做一个有科技感的产品 Landing page
```
→ 激活 `vision`（搜索灵感、生成 3 个方向供选择）→ 选定方向后生成 Vision Spec → 交给 `craft`（按 Spec 生成代码）

**示例 4：设计方案对比**
```
这两个方案哪个更好？[贴出方案 A 和方案 B]
```
→ 激活 `arbiter`，从 Trust / Task / Accessibility 维度评估

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

craft 的核心机制——**先锁定组件配方（Recipe），再写代码**：

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

### 6 条铁律

1. **ALWAYS Reference BEFORE Implement** — 写组件前必须先查到组件类/用法
2. **Recipe 是契约** — 代码不得偏离 Recipe
3. **业务层零硬编码** — 颜色/间距/圆角/阴影/字重全走 `var(--)` 或组件类
4. **品牌蓝/绿只在三处** — 链接 hover、agent 状态点、代码高亮
5. **字重上限 600** — 需要更强对比改字号或加负字距
6. **焦点环用中性色** — focus ring 使用 `var(--color-focus-ring)`

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
├── ag-design-system/          # 设计基座：Token + 组件规范
│   ├── SKILL.md
│   ├── assets/
│   │   └── tokens.css         # 完整 CSS Token 文件
│   └── references/
│       ├── tokens.md           # Token 速查
│       ├── components-v2.md    # 组件 API（shadcn + AG 扩展）
│       ├── react.md            # React 用法
│       ├── vue.md              # Vue 用法
│       └── checklist.md        # 达标自检
│
├── ag-design-compass/         # 需求分析
│   ├── SKILL.md
│   └── references/
│       ├── design-goal-strategy-framework.md
│       ├── role-question-bank.md
│       ├── output-template.md
│       ├── domain-context.md
│       └── examples/           # 案例参考
│
├── ag-design-vision/          # 视觉创意
│   ├── SKILL.md
│   └── references/
│       ├── style-vocabulary.md         # 风格原型词汇表
│       ├── color-theory.md             # 配色理论
│       ├── typography-rhythm.md        # 排版韵律
│       ├── motion-choreography.md      # 动效编排
│       ├── motion-libraries.md         # 动效开源库
│       ├── illustration-guide.md       # 插画指导
│       ├── mood-board-method.md        # 情绪板方法
│       ├── visual-narrative.md         # 视觉叙事
│       ├── aesthetic-library/          # 内置审美参考库
│       │   ├── archetypes/             # 风格原型参数
│       │   ├── palettes/               # 行业配色方案
│       │   ├── patterns/               # Section 视觉范式
│       │   ├── compositions/           # 页面组合参考
│       │   └── inspirations/           # 精选设计灵感
│       └── examples/                   # Vision Spec 示例
│
├── ag-design-craft/           # 代码生成
│   ├── SKILL.md
│   ├── TROUBLESHOOTING.md
│   └── references/
│       ├── decision-tables.md          # 业务→组件决策表
│       ├── design-rules.md             # 组合层规则
│       ├── open-source-guide.md        # 开源组件指南
│       ├── visual-polish-guide.md      # 视觉精修
│       ├── quality-self-check.md       # 质量自检
│       ├── harden-checklist.md         # 非正常路径清单
│       ├── cross-skill-protocol.md     # 跨 Skill 协作协议
│       ├── assistant-ui-guide.md       # assistant-ui 集成指南
│       ├── patch-mode.md               # 局部修改协议
│       ├── multi-page-flow.md          # 多页面流程
│       ├── responsive-and-handoff.md   # 响应式 + 交接
│       ├── component-missing-protocol.md
│       ├── diagnostic-protocol.md
│       ├── anti-examples.md            # 翻车案例
│       ├── page-archetypes/            # 12 种页面原型
│       └── patterns/                   # 可复用模式
│
├── ag-design-arbiter/         # 设计仲裁
│   ├── SKILL.md
│   └── references/
│       ├── design-constitution.md      # 设计宪法
│       ├── token-selection.md          # Token 选择规则
│       └── aesthetic-recipes.md        # 审美配方
│
└── ag-design-audit/           # 合规审计
    ├── SKILL.md
    └── references/
        └── checklist.md                # 审计清单
```

---

## 自演化机制

AG Design Skills 具备自我进化能力：

| 机制 | 触发条件 | 产出 |
|------|---------|------|
| Pattern 沉淀 | 某模式成功 3 次 | 新代码模板 → `craft/patterns/` |
| 翻车案例积累 | audit FAIL | 案例 → `craft/anti-examples.md` |
| 风格原型扩展 | 新视觉风格成功交付 | 新原型 → `vision/style-vocabulary.md` |
| 配色配方积累 | 配色方案获用户认可 | 新配方 → `vision/color-theory.md` |
| 决策表补行 | 决策表未覆盖场景 | 新行 → `craft/decision-tables.md` |
| 灵感库沉淀 | 成功使用新设计参考 | 新条目 → `vision/aesthetic-library/` |

---

## 许可证

[MIT](LICENSE)
