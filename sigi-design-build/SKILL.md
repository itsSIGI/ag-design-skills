---
name: sigi-design-build
description: >
  Use when generating UI code for the Agentic Genius design system — pages,
  components, dashboards, data viz — from text descriptions, user stories,
  Figma URLs, or screenshots. Runs after sigi-design-scope or sigi-design-vision
  when either has produced a spec.
  触发：帮我设计一下 / 设计一个页面 / 做个页面 / 生成看板 / 做 dashboard /
  生成 UI / 把设计稿做成代码 / 含 figma.com/design URL 的代码生成请求。
  不用于：纯后端任务、单 token 查询、非 AG 项目。
---

# sigi-design-build

Agentic Genius 设计系统的 UI 生成执行层。**核心心智**：有完整的设计 token 体系（`tokens.css`）和双层组件库（shadcn/ui 标准组件 + AG 扩展组件）。先锁定 **Recipe**（页面原型 + shadcn/AG 组件 + token 映射），再往里填数据。shadcn/ui 组件用 Tailwind utility + token 定制，AG 扩展组件封装业务模式，开发者只需关注"组件之间的缝隙"和"组合层规则"。

---

## 加载即执行（启动协议）

激活后**第一件事**，在跟用户聊业务之前按顺序完成：

1. 读 `sigi-design-system/references/components-v2.md` — 载入组件清单
2. 读 `sigi-design-system/references/tokens.md` — 载入 token 体系
3. 读 [`references/patterns/pattern-index.json`](references/patterns/pattern-index.json) — 载入可复用 pattern

跳过加载直接开工 = 高概率中后段翻车。

**完整权威来源索引 + 渐进披露策略** → [`references/skill-startup.md`](references/skill-startup.md)

**预览方式**：本 skill 只含知识 + 规则，不注入运行时代码。预览靠项目自己的 dev server（`pnpm dev` + 正常登录）。生成的是真实路由上的真实代码，不挂免鉴权预览路由。

---

## Step 0：读取 Figma 设计稿 / 截图（可选）

用户给 `figma.com/design/...` URL 或截图时先走本步 → 完整流程见 [`references/pipeline-details.md`](references/pipeline-details.md)。

产出 `Figma 节点 / 截图区域 → shadcn/AG 组件候选` 映射，**这份映射就是 Step 1 recipe 的输入**。

> ### 铁律：识别 ≠ 实现
>
> 识别出"这里是个 Modal"后 **绝不要** 直接自己拼。Step 1 必须先从 `components-v2.md` 确认组件存在及用法。

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
> 写组件前必须先从 `components-v2.md` 查到用法，不凭记忆。详见文末[铁律汇总](#6-条铁律汇总)。

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
5. 产出 **recipe** 结构化清单，字段：`slot`（业务语义）· `component_type` · `source`（`shadcn` / `ag-ext` / `开源-<库名>`）· `component` · `token_refs` · `notes`。字段含义详见 [`references/pipeline-details.md`](references/pipeline-details.md)。

### 1.4.5 组件缺失处理协议 — [`references/component-missing-protocol.md`](references/component-missing-protocol.md)

某槽位找不到合适 shadcn/AG 组件时按四种情况处理：**A** 重查全文（别假装确认了）· **B** 用现有组件拼并在 recipe 显式登记复合块 · **C** 查 [`references/open-source-guide.md`](references/open-source-guide.md) 标注包装方案 · **D** 真缺则停下问用户，确认前不进 Step 2。

**关键不变量**：绝不允许 Step 3 用 `<div>` 沉默拼一个看起来像组件的东西。recipe 不限制创新，限制"沉默的偏离"——所有偏离必须留痕。

### 1.5 Recipe Gate（写代码前的强制门禁）

> ### 铁律：Locked Recipe 必须公开输出 + 等用户确认

完整格式与 stop-and-ask 场景见 [`references/recipe-gate.md`](references/recipe-gate.md)。

**不可协商的三条**：
1. Locked Recipe 表必须出现在**对用户可见**的输出中，不能只在 thinking 里
2. 每行"验证来源"列必须填 `shadcn/[x] ✓` / `ag/[x] ✓` / `tokens.md ✓` 之一，不许空着、不许写"凭印象"
3. 收到用户 "recipe 通过" / "选 X" 前，禁止进 Step 2

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

**需要确定的 7 件事**（单一职责 / 容器 elevation 层级 / 图表类型选择 / Bar 图独占全宽 / 筛选器紧靠标题右侧 / 白底铁律 / 替代映射查表）详见 [`references/pipeline-details.md`](references/pipeline-details.md) 与 [`references/decision-tables.md §7`](references/decision-tables.md)。

**冲突显式化**：若用户原始请求与布局规则冲突，**不静默改写**。在输出里列出：

- 用户原意：[原话/原始布局]
- 规则：[引用对应行]
- 当前规划：[按规则的版本]
- 替代方案 ≥1

规则胜出，但用户必须知情且能否决。

**输出**：页面结构描述 + 显式冲突清单（可为空）

---

## Step 2.5：出静态预览稿（出方案默认执行）

落地真实代码前先出一张稿，让用户不起 dev server、不登录就能看效果。完整步骤见 [`references/pipeline-details.md`](references/pipeline-details.md)。

按 [`../sigi-design-vision/references/html-mockup-protocol.md`](../sigi-design-vision/references/html-mockup-protocol.md) 问用户选 HTML（默认推荐）或 Pencil，用锁定的 recipe + 真实 token 出静态版，确认后再进 Step 3。

**跳过**：Patch Mode 局部修改，或用户明确说"直接写代码 / 不用预览"。vision 已出稿则直接复用。

---

## Step 3：生成代码（数据填充）

**输入**：Step 1 的 recipe + Step 2 的页面结构

**操作**：逐槽位渲染 recipe（严格匹配登记的组件名和 token）→ 填 mock 数据 → 页面级 wrapper 走 `var(--space-*)` / `var(--radius-*)` → 同步做审美精修。**完整 8 条操作明细见 [`references/pipeline-details.md`](references/pipeline-details.md)**，含图标白名单、图表固定高度、React/Vue 框架分叉、精修要点。

生成时同步读 [`references/visual-polish-guide.md`](references/visual-polish-guide.md) + [`references/aesthetic-recipes.md`](references/aesthetic-recipes.md)。

**关键不变量**：

- shadcn/AG 组件通过 props 和 Tailwind utility 定制，**不通过额外内联样式覆盖内部结构**。如必须调整外层 margin/padding，只用 `var(--space-*)` token
- 任何"组件原型"元素都从 recipe 来。代码里出现自拼 div 模拟 Modal/Table → 回到 Step 1 补 recipe
- **业务层零硬编码**：颜色 / 间距 / 圆角 / 阴影 / 字重全走 `var(--*)` 或 shadcn/AG 组件。唯一可手写的是**布局**（flex/grid/gap/width，间距优先 `var(--space-*)`）

> ### 铁律：Recipe 是契约
>
> 代码不得偏离 Step 1 锁定的 recipe，新增组件必须回 Step 1 补行，不在 Step 3 偷加。详见文末[铁律汇总](#6-条铁律汇总)。

**输出**：完整的组件代码

---

## Step 3.5：质量自检 + Polish + Harden（进 Step 4 前的软关）

**输入**：Step 3 出的代码。在交给 `sigi-design-audit` 之前，主流程**自己**走三份清单——不是合规校验，是让"合规但平庸"升级到"合规且精致"。

| 清单 | 文件 | 内容 |
|------|------|------|
| 3.5.A 视觉质量自检 | [`references/quality-self-check.md`](references/quality-self-check.md) | 7 项：Squint Test / 多维层级 / 60-30-10 / 垂直节奏 / gap / focus-visible / 光学对齐 |
| 3.5.B Polish Pass | [`references/visual-polish-guide.md`](references/visual-polish-guide.md) §7 | 10 项精修：焦点、层级维度、间距节奏、hover 微浮、tabular-nums… |
| 3.5.C Harden | [`references/harden-checklist.md`](references/harden-checklist.md) | 10 项非正常路径：空态 / loading / error / 长文本 / 极端数据 / 权限 / 小视口 / 键盘 / 时区 |

**任一 FAIL → 回 Step 3 改完再走**，不带已知问题进 Step 4。Harden 每条标 ✅ 已覆盖 / ❌ 缺失 / ➖ 业务无关（须注明理由）。

---

## Step 3.6：Token 校验（机器门禁）

> ### 铁律：把页面交给用户看 / 提交之前，必须做 token 合规检查且全过

6 项检查（硬编码 / token 臆造 / 组件存在性 / 品牌色 / 字重 / 焦点环）的完整判定标准见 [`references/pipeline-details.md`](references/pipeline-details.md)。

全过**才**交付 / 进 Step 4。❌ 不允许"我看了应该没问题"跳过；任一失败 → 修完再检。

---

## Step 4：合规校验（独立 sub-skill）

把 Step 3 的代码 + Step 1 的 recipe 传给 `sigi-design-audit` sub-skill 执行最终审计。

> ### 铁律：Step 4 必须由 sub-skill 执行
>
> **不要**在主流程里"自己跑一遍 checklist"——长上下文末段，主流程会跳步、合理化违规。sub-skill 是冷启动、单一职责、不被污染的。把审计权完全让渡给它。

**结果处理**：✅ PASS → 输出最终代码；❌ FAIL → 按违规项逐条修正后重跑 sub-skill；**最多 2 轮自动修复**，2 轮仍 FAIL 则停止并向用户说明冲突请求人工确认。

**绝不允许**：看到 FAIL 不修直接输出 · 自己重跑 checklist 宣称 PASS（绕过 sub-skill）· 修一半留注释让用户改。

---

## Step 5 / Step 6：诊断输出 — [`references/diagnostic-protocol.md`](references/diagnostic-protocol.md)

- **Step 5 Decision Summary（每次产出末尾必须执行）**：PASS 后在最终代码块之后追加 ~200 tokens 摘要（页面类型 / 核心组件 / 开源依赖 / Token 覆盖率 / 品牌色使用 / 已知限制 / 框架）。固定格式见引用文件。
- **Step 6 Decision Trace（按需触发，⚠️ 不要默认输出）**：仅在用户说 "decision trace" / "决策链路" / "你为什么这么做" / "完整 trace" / "详细决策" 时输出标准化 trace 表格 + 反向定位。

---

## 6 条铁律汇总

1. **ALWAYS Reference BEFORE Implement** — 写组件前必须先从 sigi-design-system 查到 shadcn/AG 组件，不凭记忆
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

收到 `sigi-design-vision` 的 Vision Spec 时激活 → 读 [`references/vision-spec-mode.md`](references/vision-spec-mode.md)。

**要点**：不替代标准流程，只改 Step 1 的 recipe 输入来源。TIER_3 区域按 Spec 自建并登记 TOKEN_ESCAPE，TIER_1/2 走标准组件。Recipe Gate 不免除。
