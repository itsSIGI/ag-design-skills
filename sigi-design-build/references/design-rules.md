# Design Rules

> Agentic Genius 设计系统推理规则层。本文件不含设计值——设计值见 `ag-design-system/references/tokens.md`。

---

## 1. Fallback Chain

当场景在 tokens.md / components-v2.md 中没有明确定义时，按序过以下层级。找到答案即停止。

| 优先级 | 层级 | 问题 | 行动 |
|--------|------|------|------|
| 1 | **Spec** | 是否有已定义的 token、shadcn/ui 组件或 AG 扩展组件？ | 精确使用，不近似 |
| 2 | **Rule** | 是否有 Anti-Pattern 或 Design Signature 规则？ | 遵循规则，规则覆盖模式 |
| 3 | **Pattern** | 是否有类似组件模式可以适配？ | 复用其结构和状态机 |
| 4 | **Principle** | 设计主题（中性色主导、冷峻精确、开发者优先）暗示什么？ | 推断并说明推断，请用户确认 |

**不得臆造。** 若无层级能提供答案，说明正在推断并请用户补充。

---

## 2. Anti-Patterns

违反以下任何一条均为**严重失败**：

1. **严格颜色合规** — 不得在业务代码中输出 tokens.md 中未定义的 hex/RGB/RGBA 值。不允许自创色阶或透明度。例外：ECharts `option` 对象内部可直接使用 tokens.md 中定义的 hex 值。
2. **不跳过状态** — 每个交互元素必须有 `hover`、`:focus-visible`、`disabled` 状态。shadcn/ui 组件已内置这些状态，手写组件必须补齐。
3. **不硬编码通用值** — 间距和字体必须使用 `var(--space-*)` / `var(--font-size-*)` token，不使用裸 px、Tailwind 默认数字类。
4. **不混用间距** — 只用 4px 基准比例（`var(--space-*)` 系列），不引入任意值。
5. **不留无障碍缺口** — 普通文本最低 4.5:1 对比度（WCAG 2.x），大文本 3:1。图标必须有 `aria-label`。
6. **不截断数据** — 不缩写指标名称，不为适应布局省略数据点。数据完整性优先于美观。
7. **不隐藏核心数据** — 核心指标不得隐藏在 hover tooltip 后。可见性优先于交互。
8. **不使用占位 UI** — 不输出 `[Chart: 94%]` 等文字占位。必须使用真实功能代码。
9. **不 UI 臆造** — 不添加用户未明确要求的组件、按钮或 UI 元素。
10. **不嵌套容器边框** — 不双重包裹边框（卡片内套卡片）。容器内兄弟元素用分隔线或留白。
11. **不用留白表达层级** — 不使用大量空白暗示高级感。用对齐、节奏和对比度代替。
12. **不使视觉编码不一致** — 同一语义在整个页面必须使用相同颜色、图标和文字位置。
13. **不用品牌色做焦点/按钮** — 品牌蓝（`#123AFF`）和绿（`#00BF74`）只出现在链接 hover、agent 状态点、代码高亮三处。焦点环、按钮填充、导航全部中性色。
14. **不超 font-weight 600** — 需要更强对比改字号或加负字距（`letter-spacing: -0.01em`），不加粗到 700。

---

## 3. Strict Design Signatures

这些规则覆盖任何冲突的默认值，无例外。

| 优先级 | 规则 | 违反条件 |
|--------|------|----------|
| **CRITICAL** | **中性色焦点环** — Focus ring 用 `var(--color-focus-ring)`（`#0F1729` light / `#FFFFFF` dark），不用品牌蓝 | 焦点环/选中态使用蓝色 |
| **CRITICAL** | **品牌色三处限定** — 蓝/绿只出现在：(1)链接 hover (2)agent 状态点 (3)代码高亮 | 按钮、导航、卡片选中等用了蓝/绿 |
| **CRITICAL** | **字重上限 600** — 最大 `var(--weight-bold)` = 600 | 出现 `font-weight: 700` 或更高 |
| **CRITICAL** | **卡片用 `<AgCard>`** — 不自拼 div + shadow 做卡片 | 自造卡片样式而不用 `<AgCard>` |
| **CRITICAL** | **阴影只从 token 取** — `var(--shadow-card)` / `var(--shadow-whisper)` / `var(--shadow-modal)` | 自定义 box-shadow 值 |
| **CRITICAL** | **圆角只从 token 取** — `var(--radius-none)` 到 `var(--radius-full)` | 自定义 border-radius 值 |
| **CRITICAL** | **筛选器紧邻** — 全局筛选器必须紧靠页面标题右侧 | 筛选器放在右上角 |
| **HIGH** | **表格对齐** — 文字/信息字段左对齐，数值字段右对齐 | 列对齐错误 |
| **HIGH** | **Hover 仅改背景色** — 不做 shadow、border 变化、transform/translate | Hover 加了位移或阴影 |
| **HIGH** | **密度优先于留白** — 紧凑 padding（`var(--space-3)` ~ `var(--space-4)`），B 端不搞消费端大留白 | 大量留白 |
| **HIGH** | **图表类型选择** — Gauge 对应汇总/聚合率；Donut 对应占比/构成；Bar/Column 对应时序 | 错误的图表类型 |
| **HIGH** | **Bar 图全宽** — Bar/Column 图必须独占全宽行 | Bar 图放在分列网格内 |
| **HIGH** | **图表固定高度** — 每个图表必须声明固定像素高度 | 图表高度由浏览器默认 |
| **HIGH** | **长列表内部滚动** — 含长列表的模块设 `max-height` 内部滚动 | 行高度由列表内容驱动 |
| **HIGH** | **单一边框层** — 每个嵌套层级最多一个 border 语义 | 带边框的卡片内含带边框的子卡片 |
| **HIGH** | **响应式关键信息** — 小视口下可换行，但关键字段必须可见 | 小屏隐藏关键指标 |
| **HIGH** | **Agent 状态色固定** — 绿=running（带 pulse）、蓝=idle、红=error、灰=paused、绿=completed | 状态色交换使用 |
| **HIGH** | **系统字体** — 使用 `var(--font-sans)` / `var(--font-mono)`，零 Web Font 引入 | 引入了外部字体 |
| **HIGH** | **白名单图标库** — 用 MingCute（icon font）或 Lucide（React 组件），**单项目单库**保持统一；shadcn 自带 Lucide 微图标豁免 | 手写 SVG / 杂牌库 / 同项目混多个主库 / emoji |

---

## 4. General Layout Rules

### 信息架构
- 先定义每个模块的单一职责，再应用视觉样式
- 一个模块承载一种核心信息，不混入无关数据

### 容器层级
- 使用 `<AgCard>` 的 elevation 变体区分层级，不自造容器
- 每个嵌套层级最多一个 border 语义，兄弟元素用分隔线或留白
- 嵌套元素 radius ≤ 父元素 radius

### 模块高度与滚动
- 模块不要求等高
- 内容量不同时，内容较多的模块内部滚动（设定 `max-height`），不拉伸整行
- 对齐目标是视觉均衡，不是像素等高

### 图表尺寸
- 每个图表必须声明固定像素高度
- 高密度或宽幅图表独占全宽行，不放入窄分列网格
- 图表标签和图例不重叠、不重复

### 间距系统
- 所有 padding/margin/gap 从 `var(--space-*)` 取值（4px 基准）
- 优先用 `gap` 不用 `margin`
- icon + text 间距用 `var(--space-icon-text)` (6px)

### 响应式行为
- 小视口下布局可重排（换行），但关键业务信息不得隐藏
- 关键输入控件在所有支持的视口下不被截断
- Hover 反馈轻量（仅背景色）

### 暗色模式
- 所有视觉值走语义 token（`var(--color-*)` / `var(--shadow-*)`），light/dark 由 `tokens.css` 自动切换
- 在 `<html>` 上设 `data-theme="dark"` 或 `data-theme="light"`
- 暗色下 `<AgCard>` whisper 变体的阴影自动降级为 1px 边框（AG 扩展组件已处理）

---

## 5. Composition Checklist

recipe-first 流程下，shadcn/ui 和 AG 扩展组件内部样式已封装。本 checklist 仅检查"组件之间"和"组合层"。

### Recipe 一致性

- [ ] 代码中所有"组件原型"元素都来自 Step 1 recipe——无自拼 div 模拟组件
- [ ] 所有组件使用经 components-v2.md 验证，无臆造组件名

### 页面级 wrapper / 自定义样式

- [ ] 业务代码中无裸 hex / RGB / HSL（ECharts option 除外）
- [ ] 业务代码中无裸 `font-size` / `border-radius` / `box-shadow`——必须用 token 变量
- [ ] 业务代码中无 `font-weight: 700` 或更高
- [ ] 间距全走 `var(--space-*)`，无裸 px

### 品牌色合规

- [ ] 品牌蓝（`#123AFF` / `var(--signal-blue)`）仅出现在：链接 hover、代码高亮
- [ ] 品牌绿（`#00BF74` / `var(--signal-green)`）仅出现在：agent 状态点、代码高亮
- [ ] 焦点环使用 `var(--color-focus-ring)`（中性色），不用蓝色
- [ ] 按钮填充使用 `var(--color-primary-bg)`（中性色），不用蓝色

### 组合 / 布局

- [ ] 全局筛选器紧靠页面标题右侧
- [ ] Bar/Column 图独占全宽行
- [ ] 无嵌套容器边框
- [ ] 长列表模块设 `max-height` 内部滚动
- [ ] 小屏下关键字段可见

### 交互

- [ ] Hover 仅改背景色——无 `transform`、`translate`、`shadow`
- [ ] 所有交互元素有 default / hover / :focus-visible / disabled 状态
- [ ] 焦点环使用 `var(--color-focus-ring)` + `outline: 2px solid` + offset 2px

### 数据 / 图表

- [ ] 图表类型正确：Gauge（汇总）· Donut（占比）· Bar（时序）
- [ ] 每个图表声明固定像素高度
- [ ] 核心指标默认可见——不隐藏在 tooltip 后
- [ ] 表格指标列右对齐
- [ ] 表格行：5–10 条真实 mock 数据

### 图标与字体

- [ ] 图标来自白名单库（MingCute / Lucide），单项目单库（shadcn 自带 Lucide 豁免）
- [ ] 字体使用 `var(--font-sans)` / `var(--font-mono)`，零 Web Font
- [ ] 图标有 `aria-label`

### 合规

- [ ] 无用户未明确要求的 UI 元素
- [ ] 无障碍：4.5:1 对比度
- [ ] 同一语义在全页面使用相同视觉编码
- [ ] 暗色模式：所有视觉值走语义 token，切换 data-theme 无需改代码
