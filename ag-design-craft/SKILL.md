---
name: ag-design-craft
version: 1.0.0
description: >
  Agentic Genius B 端 UI 代码生成执行层。当用户要生成符合 Agentic Genius 设计系统的
  UI 页面、组件、Dashboard、数据可视化时使用——从文字描述、user story、Figma URL 或
  截图出发。核心机制：Recipe-first + Token-gate——先锁定组件配方（page archetype +
  shadcn/ui + AG 扩展组件 + token 映射），再填数据生成代码。所有视觉值走 var(--*) 语义
  token，业务层零硬编码。触发词："帮我设计一下"、"设计一个页面/弹窗/卡片"、"做个页面"、
  "生成看板"、"做 dashboard"、"生成 UI"、"把设计稿做成代码"、"design-craft"、
  包含 figma.com/design URL 的代码生成请求、或描述 Agentic Genius 功能的 user story。
  不用于：非 AG 项目、纯后端任务、单 token 查询。
---

# ag-design-craft

Agentic Genius 设计系统的 UI 生成执行层。**核心心智**：有完整的设计 token 体系（`tokens.css`）和双层组件库（shadcn/ui 标准组件 + AG 扩展组件）。先锁定 **Recipe**（页面原型 + shadcn/AG 组件 + token 映射），再往里填数据。shadcn/ui 组件用 Tailwind utility + token 定制，AG 扩展组件封装业务模式，开发者只需关注"组件之间的缝隙"和"组合层规则"。

---

## Step -1：预览与校验环境

> 本 skill **只含知识 + 规则**，不往项目里注入运行时代码。预览靠项目本身的 dev server。

**预览 = 本地跑项目 dev server + 正常登录**：

1. 起项目 dev server（如 `pnpm dev`）
2. 浏览器正常登录 —— 本地 = 本地前端 + 真实后端
3. 导航到你的页面 → 带真实鉴权 + 真实数据的真实样子

design-craft 生成的页面是**真实路由上的真实代码**，不挂免鉴权预览路由。

---

## 加载即执行（Skill 启动协议）

**激活本 skill 后的第一件事**——在跟用户聊业务之前——必须按顺序完成：

1. 读 `ag-design-system` skill 的 `references/components-v2.md`，把当前 shadcn/ui + AG 扩展组件清单载入上下文
2. 读 `ag-design-system` skill 的 `references/tokens.md`，载入 token 体系
3. 读 [`references/patterns/pattern-index.json`](references/patterns/pattern-index.json)，知道当前有哪些可复用页面 pattern
4. 之后才开始处理用户输入

跳过加载协议直接开工 = 高概率在中后段翻车。**先吃组件清单、token 体系和 pattern 库，再说做什么页面**。

> ### 省 token：渐进披露，命中即止
>
> **别预读整个 references 库**。按需读：
> - 先查 decision-tables §10 业务表 / pattern-index（都很小）
> - **命中 pattern → 只读那个 pattern 的代码 + recipe，直接抄填，跳过规则库通读**
> - 命中原型 → 读那个原型 + 它指向的真实文件；未命中才按需读规则文件

---

**两种输入模式**：
- **文字描述** → 从 Step 1 开始
- **Figma URL**（含 `figma.com`）或**截图** → 先执行 **Step 0**，再从 Step 1 继续

**权威来源**：

| 类别 | 文件 | 何时读 |
|------|------|--------|
| Token 体系 | `ag-design-system/references/tokens.md` | 取色值/间距/圆角 |
| 组件用法 | `ag-design-system/references/components-v2.md` | 做具体组件 |
| 组件示例 | `ag-design-system/references/components-v2.md` | 复制组件用法 |
| React 用法 | `ag-design-system/references/react.md` | React 项目 |
| Vue 用法 | `ag-design-system/references/vue.md` | Vue 项目 |
| 达标自检 | `ag-design-system/references/checklist.md` | 产出后核对 |
| 业务→组件决策 | [`references/decision-tables.md`](references/decision-tables.md) | 选组件类型 |
| 组合层规则 | [`references/design-rules.md`](references/design-rules.md) | anti-pattern / 布局 |
| 开源组件指南 | [`references/open-source-guide.md`](references/open-source-guide.md) | 用第三方库时 |
| 视觉质量自检 | [`references/quality-self-check.md`](references/quality-self-check.md) | Step 3.5 |
| 视觉精修指南 | [`references/visual-polish-guide.md`](references/visual-polish-guide.md) | Step 3 生成 + Step 3.5 Polish Pass |
| 审美配方 | [`../ag-design-arbiter/references/aesthetic-recipes.md`](../ag-design-arbiter/references/aesthetic-recipes.md) | Step 3 排版/配色/间距配方 |
| 非正常路径 | [`references/harden-checklist.md`](references/harden-checklist.md) | Step 3.5 |
| 翻车案例 | [`references/anti-examples.md`](references/anti-examples.md) | FAIL 后参考 |
| 组件缺失协议 | [`references/component-missing-protocol.md`](references/component-missing-protocol.md) | Step 1.4.5 缺失处理 |
| 诊断协议 | [`references/diagnostic-protocol.md`](references/diagnostic-protocol.md) | Step 5-6 决策追踪 |
| 翻车排查 | [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) | 产出问题排查 |
| 局部修改协议 | [`references/patch-mode.md`](references/patch-mode.md) | 用户要"改一下"时 |
| 多页面流程 | [`references/multi-page-flow.md`](references/multi-page-flow.md) | 向导/onboarding/多步表单 |
| 响应式 + 交接 | [`references/responsive-and-handoff.md`](references/responsive-and-handoff.md) | 断点/Dev Handoff/演化协议 |
| 跨 Skill 协作 | [`references/cross-skill-protocol.md`](references/cross-skill-protocol.md) | skill 间数据传递/回环/上下文共享 |
| 页面原型 | [`references/page-archetypes/README.md`](references/page-archetypes/README.md) | 新页面选骨架 |
| AI 聊天运行时 | [`references/assistant-ui-guide.md`](references/assistant-ui-guide.md) | AI 对话需要 streaming/持久化/分支时 |

---

## Step 0：读取 Figma 设计稿 / 截图（可选）

用户提供 `https://figma.com/design/:fileKey/...?node-id=...` 或截图时执行：

### Figma URL 模式

1. 调用 `get_figma_data` 获取节点数据
2. 调用 `download_figma_images` 获取截图
3. 看截图理解模块划分和数据类型
4. **从截图和节点数据中识别每一个组件型元素**（弹窗 / 表格 / 表单 / 按钮 / Tabs / Card / ...），列出 `Figma 节点 → shadcn/AG 组件候选` 的初步映射。**这份映射就是 Step 1 recipe 的输入**

### 截图模式

1. 读截图，理解模块划分
2. 识别组件型元素，列出 `截图区域 → shadcn/AG 组件候选` 映射

> ### 铁律：识别 ≠ 实现
>
> 识别出"这里是个 Modal"后 **绝不要** 直接自己拼。Step 1 必须先从 `components-v2.md` 确认 shadcn/AG 组件存在及用法，才能进入 Step 3。

**失败回退**：
- MCP/截图不可用 → 请用户提供截图或文字描述节点结构，降级走文字模式
- URL 无效 / 文件私有 → **暂停**，请用户核对；不允许悄悄回退到无设计稿模式

---

## Step 1：锁定组件配方（Recipe）

**这是整个流程最关键的一步**——所有组件决策在这里一次性敲定。后续 Step 仅做组合和数据填充。

**输入**：用户需求描述（+ Step 0 的组件映射，如有）

### Step 1 执行顺序速记

```
1.0 Pattern 查询          ──命中──→ 跳到 1.5（pattern recipe 直接用）
       │
       ↓ 未命中
1.1–1.3 标准 recipe 构建
   1.1 读 components-v2.md + tokens.md（启动协议已完成则跳过）
   1.2 拆 slot（语义区域）
   1.3 查 decision-tables 选组件类型（不许凭品味）
   1.4 对每个 slot 从 components-v2.md 确认 shadcn/AG 组件存在 + 用法
       │
       ↓ 任何 slot 找不到合适组件
1.4.5 缺失处理协议
   A 重查 → 命中则回 1.4
   B 用 shadcn/AG 组合块 → 在 recipe 显式登记
   C 需开源组件 → 查 open-source-guide，标注包装方案
   D 真缺 → 停下问用户选路径
       │
       ↓ 全部确定
1.5 Recipe Gate（强制门禁）
   A 公开输出 Locked Recipe 表，每行必须填"验证来源"
   B 任一 slot 不确定 → 停下问用户给具体选项
   ─ 用户确认前禁止进 Step 2 ─
       │
       ↓ 用户回 "recipe 通过"/"选 X"
进 Step 2
```

**关键**：Pattern 命中走快速路径但仍要在 1.4 验证组件存在；任何查不到的走缺失处理协议，**永远不允许凭记忆假装拿到组件信息**。

> ### 铁律：ALWAYS Reference BEFORE Implement
>
> - **ALWAYS** 从 `components-v2.md` 确认 shadcn/AG 组件存在且了解用法后再写代码
> - **NEVER** 凭训练记忆写 shadcn/AG 组件名或 token 变量名
> - **NO EXCEPTIONS** — 即便是 `Button`、`Input` 这种"显然知道"的组件
> - 训练数据里的 AG 设计系统信息一定过期或不完整。**记忆 = 翻车的最大单一来源**
>
> 跳过确认直接写代码 = 违反 skill 协议，**必须重做**。

**操作**：

### 1.0 Pattern 查询（命中即抄，跳过 1.1–1.3）

1. 读 [`references/patterns/pattern-index.json`](references/patterns/pattern-index.json)
2. 按用户需求描述匹配 `intent_keywords`
3. **命中** → 直接以该 pattern 的 `recipe_template` 作为本次任务起点，读对应代码文件；进入 Step 2
4. **未命中** → 走 1.1–1.4 标准流程；任务完成后建议用户沉淀为新 pattern

### 1.1–1.4 标准 recipe 构建（未命中 pattern 时执行）

1. **1.1** 确认已读 `components-v2.md` + `tokens.md`（启动协议已完成则跳过）
2. **1.2** 把 UI 拆成"组件槽位"（slot）。每个槽位是一个语义元素：弹出确认框、数据列表、KPI 卡、筛选器、提交按钮、空状态…
3. **1.3** 每个槽位先查 [`references/decision-tables.md`](references/decision-tables.md)——按业务场景查表选组件类型，不许凭品味选。
   - **业务语言输入** → 先查 §10「业务语言直查表」：命中 pattern 直接抄代码，命中原型抄布局骨架
   - 通用 UI 场景 → 查 §1–§7；表中标注"待确认"的必须告知用户
4. **1.4** 对每个槽位从 `components-v2.md` 确认 shadcn/AG 组件名、用法、变体
5. 产出 **recipe**——结构化清单：

   | 字段 | 含义 |
   |------|------|
   | `slot` | 业务语义（"删除确认弹窗"、"分子数据列表"） |
   | `component_type` | 组件类型（Modal、Table、Button、Card…） |
   | `source` | 来源：`shadcn`（shadcn/ui 标准组件）、`ag-ext`（AG 扩展组件）或 `开源-<库名>` |
   | `component` | 组件名（如 `Dialog`、`AgMetricCard`、`Button variant="primary"`）或开源组件名 |
   | `token_refs` | 引用的关键 token（`var(--color-surface)`、`var(--space-4)`） |
   | `notes` | 特殊说明（开源组件需 token 化包装等） |

### 1.4.5 组件缺失处理协议 — [`references/component-missing-protocol.md`](references/component-missing-protocol.md)

某槽位**找不到合适 shadcn/AG 组件**时，按四种情况显式处理（完整流程见引用文件）：

- **情况 A**（库里有你没找到）：重读 `components-v2.md` 全文搜索，别假装确认了
- **情况 B**（可用组件组合）：用现有 shadcn/AG 组件拼（如 `Card` + `CardContent` + `Badge`），recipe **显式登记复合块** + notes 说明
- **情况 C**（需开源组件）：查 [`references/open-source-guide.md`](references/open-source-guide.md) 获取推荐库 + token 化包装标准，recipe 中标注来源和包装方案
- **情况 D**（真缺）：**停下来**给用户"缺失声明 + 路径选择"，确认前不进 Step 2

#### 关键不变量（必守）

- **绝不允许**：Step 3 用 `<div>` 沉默拼一个看起来像组件的东西
- 复合块在 recipe **显式登记**（B）；开源组件**显式标注包装方案**（C）；真缺组件**显式停下问用户**（D）
- **核心**：recipe 不限制创新，限制"沉默的偏离"——所有偏离必须留痕

### 1.5 Recipe Gate（写代码前的强制门禁）

> ### 铁律：Locked Recipe 必须公开输出 + 等用户确认
>
> Step 1.4 完成 recipe 后，**禁止直接进入 Step 2/3**，必须先做完下面 A+B 两件事。

#### A. 公开输出 Locked Recipe 表

主流程**必须**用以下固定格式输出：

```markdown
## Locked Recipe

| Slot | 组件类型 | 来源 | 组件 | Token 引用 | 验证来源 | 备注 |
|------|---------|------|-----|-----------|---------|------|
| ...  | ...     | shadcn | `Dialog` | var(--color-primary-bg) | shadcn/dialog ✓ | ... |

## Spacing 决策（每段间距的真实 token）

| 区域 | Token 变量 | 像素值 |
|------|-----------|--------|
| ...  | var(--space-4) | 16 |
```

**"验证来源"列**只能是以下三种之一，**不许空着**：

| 验证类型 | 何时用 | 例子 |
|---------|------|------|
| `shadcn/[component]` ✓ | 从 components-v2.md 确认 shadcn/ui 组件存在 | `Dialog` 在 components-v2.md shadcn 标准组件章节 |
| `ag/[component]` ✓ | 从 components-v2.md 确认 AG 扩展组件存在 | `AgMetricCard` 在 components-v2.md AG 扩展组件章节 |
| `tokens.md` ✓ | 确认 token 变量存在 | `var(--color-surface)` 在 tokens.md 语义颜色表 |

**不允许的"验证"**：
- "凭印象" / "我记得" / "应该有"
- "Tailwind 默认有这个 class"（AG 设计系统有自己的 token 和组件变体）
- "其他项目这样用"（不能证明设计系统支持）

#### B. 触发 stop-and-ask 的场景

recipe 中任一行属于以下情况，**必须停下问用户**：

1. **类名存在性验证后仍不确定**
2. **多选一**：业务场景可对应 ≥2 个合规方案
3. **风格不在 token 体系内**：想用某颜色/圆角/字号但 tokens.md 没有对应变量
4. **开源组件选择**：有多个候选库，需用户决定
5. **"我不确定"的任何瞬间**

输出格式（必须给用户具体选项）：

```markdown
⚠️ Slot [X] 待用户决策

候选路径：
1. 方案 A —— [来源/做法]，优：... 缺：...
2. 方案 B —— ...
3. 方案 C —— ...

我建议 [N]，理由 [...]。请回 "选 A" / "选 B" / "选 C" 后继续。
```

收到用户明确选择前，**禁止进 Step 2**。

#### 关键不变量

- ❌ "边写代码边查组件"——所有组件决策必须 Step 1 一次性锁定
- ❌ 跳过 recipe 表直接写 JSX / Vue template
- ❌ recipe 表只在内部 thinking 里出现而不输出给用户
- ✅ recipe 表必须出现在主流程**对用户可见**的输出中
- ✅ 用户回复 "recipe 通过" / "选 X" 等明确许可后才进 Step 2

---

## Step 2：组合布局

**输入**：Step 1 的 recipe（+ Step 0 的截图/设计稿，如有）

**操作**：把 recipe 里的槽位**排进页面结构**。这一步只决定"谁放在哪"，不决定样式（样式由 shadcn/AG 组件自带 + Tailwind utility + 极少量页面级 wrapper 决定）。

> ### 容器规则
>
> AG 设计系统有 `Card` 组件（5 种 elevation 变体）。容器层级——每层最多一个 border 语义，不嵌套卡片边框。

需要确定的事：

1. 模块的单一职责（先信息架构，后视觉；不混入无关数据）
2. 容器层级——遵循 `Card` 组件的 5 级 elevation 规则（`default` / `ring` / `whisper` / `selected` / `inset`），不自造阴影
3. 图表类型：汇总/聚合率 → **Gauge**；占比/构成 → **Donut**；时序 → **Bar/Column**
4. **Bar/Column 图独占全宽行**，不放进分列网格
5. 全局筛选器位置：**紧靠页面标题右侧**
6. **白底铁律**：`Card` 组件默认白底（`var(--color-bg)`），不自行加灰底。卡片区分靠 elevation 和间距，不靠底色差异
7. 替代映射查表——任何"用 div 自拼组件"的冲动，先查 [`references/decision-tables.md §7`](references/decision-tables.md)

**冲突显式化**：若用户原始请求与布局规则冲突，**不静默改写**。在输出里列出：

- 用户原意：[原话/原始布局]
- 规则：[引用对应行]
- 当前规划：[按规则的版本]
- 替代方案 ≥1

规则胜出，但用户必须知情且能否决。

**输出**：页面结构描述 + 显式冲突清单（可为空）

---

## Step 3：生成代码（数据填充）

**输入**：Step 1 的 recipe + Step 2 的页面结构

**操作**：

1. **逐槽位渲染 recipe**——每个槽位使用对应的 shadcn/AG 组件或开源组件，严格匹配 recipe 中登记的组件名和 token
2. 数据填充：把 mock 数据、文案、回调函数填进组件
3. **页面级 wrapper**（外层 layout、卡片间 gap、grid 列宽等少量自定义层）使用 `var(--space-*)` / `var(--radius-*)` 等 token 变量
4. 图标使用 [MingCute](https://www.mingcute.com/)（line 默认 / fill 选中态），不混用其他图标库
5. 每个图表（ECharts 等）声明**固定像素高度**；图表内部配色可直接用 hex（从 tokens.md 原始色阶取）
6. **不添加**用户未明确要求的 UI 元素
7. **框架分叉**：
   - React 项目 → 读 `ag-design-system/references/react.md` 获取 className 型 + 交互态 hooks 写法
   - Vue 项目 → 读 `ag-design-system/references/vue.md` 获取 class 型 + 交互态写法
   - 其他 → 从 `components-v2.md` 复制组件结构
8. **审美精修**（生成代码时同步执行，不是事后补）：
   - 读 [`references/visual-polish-guide.md`](references/visual-polish-guide.md) 应用精修技巧
   - 参考 [`aesthetic-recipes.md`](../ag-design-arbiter/references/aesthetic-recipes.md) 选择字号组合 / 间距节奏 / 配色方案
   - 可点击卡片必须有 `transition` + hover 微浮声明
   - 大数字（KPI 值）加 `font-variant-numeric: tabular-nums` + 负字距
   - 背景使用 `bg → surface → surface-secondary` 三级层次
   - 边框优先 `--color-border-subtle`，只在强分隔处用 `--color-border-strong`
   - 每个页面确认一个视觉焦点，其余元素降权

**关键不变量**：

- shadcn/AG 组件通过 props 和 Tailwind utility 定制，**不通过额外内联样式覆盖内部结构**。如必须调整外层 margin/padding，只用 `var(--space-*)` token
- 任何"组件原型"元素都从 recipe 来。代码里出现自拼 div 模拟 Modal/Table → 回到 Step 1 补 recipe
- **业务层零硬编码**：颜色 / 间距 / 圆角 / 阴影 / 字重全走 `var(--*)` 或 shadcn/AG 组件。唯一可手写的是**布局**（flex/grid/gap/width，间距优先 `var(--space-*)`）

> ### 铁律：Recipe 是契约
>
> Step 1 锁定的组件配方 = 生成代码的契约。
> 代码里如果出现 recipe 没有的组件 / 自拼 div / 自造 class —— **回到 Step 1 补行**，不允许在 Step 3 偷加。
> "顺手"加一个用户没要求的导出按钮、刷新按钮、加载态——同样违规。

**输出**：完整的组件代码

---

## Step 3.5：质量自检 + Polish + Harden（进 Step 4 前的软关）

**输入**：Step 3 出的代码

**操作**：在交给 `ag-design-audit` 之前，主流程**自己**走三份清单。这不是合规校验（合规由 sub-skill 干），是**让"合规但平庸"升级到"合规且精致"** 的补强。

### 3.5.A 视觉质量自检 — [`references/quality-self-check.md`](references/quality-self-check.md)

逐条过 7 项：
1. Squint Test（眯眼能否分主次）
2. 多维度视觉层级（至少 2–3 维）
3. 60-30-10 视觉重量（品牌色 ≤ 10%，仅链接 hover / agent 状态 / 代码高亮）
4. 垂直节奏一致
5. 用 `gap` 不用 `margin`（间距统一走 `var(--space-*)`）
6. Focus 用 `:focus-visible`（焦点环用中性色 `var(--color-focus-ring)`）
7. 光学对齐（标题 / 图标方向）

任一 FAIL → **回 Step 3 改完再走**，不带已知问题进 Step 4。

### 3.5.B Polish Pass — [`references/visual-polish-guide.md`](references/visual-polish-guide.md) §7

逐条过 10 项精修检查：
1. 页面有一个明确的视觉焦点
2. 文本层级用了 ≥2 个维度（字号+字重+颜色）
3. 同一卡片内 primary 色文本 ≤ 2 个
4. 间距有"紧-松"的节奏变化（标题粘内容，内容块断开）
5. 可点击卡片有 hover 微浮效果（shadow + translateY transition）
6. 大数字有 tabular-nums + 负字距
7. 背景用了 bg/surface/surface-secondary 层次
8. 边框优先用 subtle 而非 strong
9. 页面最多 1-2 处彩色元素（避免色彩竞争）
10. 可交互元素都有 transition 声明（0.15-0.2s ease）

任一未达 → **回 Step 3 改完再走**。Polish Pass 是从 70 分到 90 分的关键。

### 3.5.C Harden 清单 — [`references/harden-checklist.md`](references/harden-checklist.md)

逐条过 10 项非正常路径：空态 / loading / error / 长文本 / 极端数据 / 0-1-N 状态 / 权限缺失 / 小视口 / 键盘可达 / 时区时间。

每条：✅ 已覆盖 / ❌ 缺失（回 Step 3 补）/ ➖ 业务无关（标注理由）。

---

## Step 3.6：Token 校验（机器门禁）

> ### 铁律：把页面交给用户看 / 提交之前，必须做 token 合规检查且全过

**检查项**：

1. **硬编码检测**——代码中不得出现裸 hex/rgb/hsl 色值（ECharts option 内除外）、裸 px 间距（布局 width/height 除外）、裸 border-radius、裸 box-shadow
2. **token 臆造检测**——所有 `var(--*)` 引用必须在 `tokens.css` / `tokens.md` 中存在
3. **组件存在性检测**——所有使用的 shadcn/AG 组件必须在 `components/ui/` 或 `components/ag/` 目录中存在，且在 `components-v2.md` 中有记录
4. **品牌色使用检查**——`#123AFF`（蓝）和 `#00BF74`（绿）及对应 token 只出现在三处：链接 hover、agent 状态点、代码高亮
5. **字重检查**——不出现 `font-weight: 700` 或 `--weight-bold` 以上的值
6. **焦点环检查**——focus 相关样式使用 `var(--color-focus-ring)`（中性色），不用品牌蓝

**约束**：
- 全过**才**交付 / 进 Step 4；❌ 不允许"我看了应该没问题"跳过
- 任一失败 → 修完再检，不带已知违规进 Step 4

---

## Step 4：合规校验（独立 sub-skill）

**输入**：Step 3 生成的代码 + Step 1 recipe

**操作**：调用 `ag-design-audit` sub-skill 执行最终审计。

> ### 铁律：Step 4 必须由 sub-skill 执行
>
> **不要**在主流程里"自己跑一遍 checklist"——长上下文末段，主流程模型已经有压力，会跳步、合理化违规。
> sub-skill 是冷启动、单一职责、不被主流程污染。把审计权完全让渡给它。

调用方式：把 Step 3 的代码 + Step 1 的 recipe 传给 `ag-design-audit` sub-skill。

---

## 输出处理

sub-skill 返回结果后：

| sub-skill 结论 | 主流程动作 |
|----------------|-----------|
| ✅ PASS | 输出最终代码给用户 |
| ❌ FAIL | 按 sub-skill 列出的违规项**逐条修正**代码，重新跑 sub-skill |
| 2 轮仍 FAIL | 停止自动修复，向用户说明具体冲突并请求人工确认 |

**最多 2 轮自动修复**。第 3 轮起必须升级到用户。

**绝不允许**：
- ❌ 看到 FAIL 后不修，直接输出代码
- ❌ 自己重新跑一遍 checklist 后宣称 PASS（绕过 sub-skill）
- ❌ 修了一半就停，剩下的留个注释让用户改

---

## Step 5：决策摘要输出（每次产出末尾必须执行）

PASS 后，在最终代码块**之后**必须追加 Decision Summary（~200 tokens）：

```markdown
## Decision Summary

- **页面类型**：[原型名 或 "自由布局"]
- **核心组件**：[shadcn/AG 组件清单 / 开源组件清单]
- **开源依赖**：[第三方库名 + 版本，无则写"无"]
- **Token 覆盖率**：[所有视觉值中 token 引用的比例]
- **品牌色使用**：[蓝/绿出现位置，或"未使用"]
- **已知限制**：[Harden 中标 ➖ 的项 + 原因]
- **框架**：[React / Vue / Vanilla]
```

---

## Step 6：决策链路表（按需触发）

> ⚠️ **不要默认输出**——只在用户**明确要求**时才执行。

触发词："decision trace" / "决策链路" / "你为什么这么做" / "完整 trace" / "详细决策"

输出标准化 trace 表格：

```markdown
| 节点 ID | 决策点 | 候选项 | 选择 | 理由 | 依据文件 |
|---------|--------|--------|------|------|---------|
| R-01 | 页面原型 | dashboard / list-table | dashboard | 用户要求 KPI 概览 | page-archetypes/ |
| R-02 | KPI 容器 | Card / 开源 Card | Card variant="ring" | AG 设计系统原生 | components-v2.md |
| ... | ... | ... | ... | ... | ... |
```

---

## 6 条铁律汇总

1. **ALWAYS Reference BEFORE Implement** — 写组件前必须先从 ag-design-system 查到 shadcn/AG 组件，不凭记忆
2. **Recipe 是契约** — 代码不得偏离 recipe，新增必须回 Step 1 补行
3. **业务层零硬编码** — 颜色/间距/圆角/阴影/字重全走 `var(--)` 或 shadcn/AG 组件
4. **品牌蓝/绿只在三处** — 链接 hover、agent 状态点、代码高亮
5. **字重上限 600** — 禁止 700；需要更强对比改字号或加负字距
6. **焦点环用中性色** — focus ring / 选中态使用 `var(--color-focus-ring)` / `var(--color-selected)`，不用品牌蓝

---

## Patch Mode：局部修改（迭代修改快速路径）

> 完整协议见 [`references/patch-mode.md`](references/patch-mode.md)

用户对**本轮会话中已产出的代码**说"改一下 X"、"颜色换成 Y"、"间距太大"等局部修改请求时，不需要重走完整 recipe 流程。

**判定**：修改范围是否涉及组件替换？
- **否**（改颜色/间距/variant/列宽/增减字段）→ 进入 Patch Mode，按 P1-P3 级别走简化流程
- **是**（表格换卡片、Donut 换 Bar 等）→ 回标准流程 Step 1 更新 recipe

**铁律**：Patch Mode 下 Token 校验（Step 3.6）仍不可跳过。

---

## Multi-Page Flow：多页面流程

> 完整协议见 [`references/multi-page-flow.md`](references/multi-page-flow.md)

用户需求涉及 ≥2 个有导航顺序/共享状态/视觉连贯性的页面时激活。

**关键步骤**：
1. 在 Step 1 之前先输出 **Flow Map**（页面列表 + 原型 + 共享数据 + 入口条件）
2. 拆分 Flow-level Recipe（共享层）和 Page-level Recipe（页面层）
3. 逐页生成后跑跨页面一致性检查

---

## 响应式设计 + 开发交接

> 完整指导见 [`references/responsive-and-handoff.md`](references/responsive-and-handoff.md)

- **响应式**：4 断点体系（sm/md/lg/xl），KPI 网格、侧栏、表格的退化规则
- **Dev Handoff**：触发词 `dev handoff` / `开发交接`，输出依赖清单 + token 映射 + 状态变体 + 注意事项
- **设计系统演化**：pattern/archetype/decision-table/token 的提议→确认→执行协议

---

## Vision Spec Mode（视觉创新页面）

> 当 craft 收到来自 `ag-design-vision` 的 Vision Spec 时激活。适用于 Landing page、营销页、品牌页等需要审美创新的场景。

### 触发条件

- 用户说"按照 Vision Spec 生成"
- vision skill 交付了完整 Vision Spec（7 章节结构化方案）
- compass 模块规格表标注 `视觉创新: 是`，且 vision 已产出 Spec

### 与标准流程的关系

Vision Spec Mode **不替代**标准 Step 1-6 流程，而是**修改 Step 1 的 recipe 输入来源**：

```
标准模式：  用户描述 → Step 1 recipe → Step 2-6
Vision 模式：Vision Spec + 用户描述 → Step 1 recipe（含 TOKEN_ESCAPE）→ Step 2-6
```

### Step 1 的变化：读 Vision Spec 构建 Recipe

1. **读 TIER mapping**（Vision Spec §7）确定每个 section 的 TIER 分类：
   - **TIER_1 区域**：走标准 recipe 流程，使用 shadcn/AG 组件 + 标准 token
   - **TIER_2 区域**：走标准 recipe，可使用 shadcn/AG 组件变体（暗色变体等）
   - **TIER_3 区域**：按 Vision Spec 自建结构，每个自定义值登记为 TOKEN_ESCAPE

2. **TIER_3 区域的 recipe 登记**：

   | Slot | 组件类型 | 来源 | 组件 / 自建 | Token 引用 | 验证来源 | 备注 |
   |------|---------|------|----------------|-----------|---------|------|
   | Hero 标题 | Display Text | vision-spec | 自建 | TOKEN_ESCAPE: hero-title-size | Vision Spec §3 | clamp(40px, 5vw+12px, 64px) |
   | Hero 背景 | Section | vision-spec | 自建 | TOKEN_ESCAPE: hero-section-bg | Vision Spec §2 | #0C0F1A |

   - `来源` 列标注 `vision-spec`
   - `验证来源` 列标注 Vision Spec 对应章节号
   - 每个 TOKEN_ESCAPE 必须在 recipe 中显式登记

3. **过渡接缝（Transition Seam）**：
   - 读 Vision Spec §7 的过渡描述
   - 在 recipe 中为过渡带分配独立 slot（如"Hero→Body 渐变过渡"）
   - 过渡带的视觉值走 TOKEN_ESCAPE 或标准 token 渐变

### Step 3 的变化：按 Spec 生成代码

- **TIER_3 区域**：按 Vision Spec §2-§6 的具体参数值生成（配色、排版、布局、动效、插画）
- **TIER_1/2 区域**：仍走标准 shadcn/AG 组件 + token，与普通页面无异
- **动效**：按 Vision Spec §5 的 motion plan 实现，包括 easing、duration、trigger、stagger
- **prefers-reduced-motion**：必须按 Spec §5 的回退方案实现

### Step 3.6 Token 校验的变化

- TOKEN_ESCAPE 声明的值**不算硬编码违规**（已在 recipe 中显式登记）
- 但 TOKEN_ESCAPE 总数必须 ≤ 15，TIER_1 区域必须 = 0
- 未在 recipe 登记的硬编码仍然违规

### Step 4 audit 的变化

传给 `ag-design-audit` 时额外附上：
- Vision Spec 的 §7 TIER mapping
- Recipe 中所有 TOKEN_ESCAPE 条目
- audit 会检查 TOKEN_ESCAPE 声明完整性（每个自定义值都有对应声明）

### 关键不变量

- ✅ TIER_1 区域零 TOKEN_ESCAPE——导航、Footer 等必须用标准 AG 组件
- ✅ Recipe Gate（Step 1.5）仍然强制执行——Vision Spec 不免除 recipe 门禁
- ✅ 6 条铁律在 Vision Spec Mode 下同样有效
- ❌ 不允许"整个页面都是 TIER_3"——至少导航和 Footer 是 TIER_1

---

## 自演化机制

| 机制 | 触发条件 | 产出 |
|------|---------|------|
| Anti-examples 积累 | audit FAIL | 翻车案例 → anti-examples.md |
| Pattern 沉淀 | 某模式成功 3 次 | 代码模板 → patterns/ |
| Archetype 扩展 | 遇到新页面类型 | 布局骨架 → page-archetypes/ |
| Decision-tables 补行 | 决策表未覆盖场景 | 新行 → decision-tables.md |
| 开源组件指南更新 | 团队切换/新增库 | open-source-guide.md |
