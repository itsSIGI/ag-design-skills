# Tokens 速查表

> 取色值/字号/间距时查本表。**生成代码时引用「语义变量名」，不要直接写右侧的 Hex/px**——
> 那是给人核对的，写进代码的应是 `var(--color-...)`。完整定义见 `assets/tokens.css`。

## 目录
- [语义颜色（组件唯一可用的颜色层）](#语义颜色)
- [原始色阶（仅装饰/特殊场景）](#原始色阶)
- [字体与字重](#字体与字重)
- [间距 Scale](#间距-scale)
- [圆角 Scale](#圆角-scale)
- [阴影 / Elevation](#阴影--elevation)

## 语义颜色

组件 CSS **只能用**这一层。light/dark 由 `tokens.css` 自动切换，引用变量即两套都对。

| 语义变量 | 角色 | Light | Dark |
|---|---|---|---|
| `--color-bg` | 页面底 | `#FFFFFF` | `#0F1729` |
| `--color-surface` | 卡片/输入底 | `#F7F8FA` | `#252B39` |
| `--color-surface-elevated` | 浮层/弹窗 | `#FFFFFF` | `#344052` |
| `--color-surface-hover` | hover 底 | `#F0F3F7` | `#344052` |
| `--color-border-subtle` | 卡片边/分割线 | `#E7ECF3` | `#344052` |
| `--color-border-strong` | 输入框/悬停边 | `#CDD4DF` | `#475569` |
| `--color-text-primary` | 主文本 | `#0F1729` | `#FFFFFF` |
| `--color-text-secondary` | 副文本 | `#667085` | `#B7BDCA` |
| `--color-text-muted` | 占位/禁用 | `#949CAC` | `#949CAC` |
| `--color-primary-bg` | 主按钮底 | `#0F1729` | `#FFFFFF` |
| `--color-primary-text` | 主按钮字 | `#FFFFFF` | `#0F1729` |
| `--color-primary-bg-hover` | 主按钮 hover | `#252B39` | `#F0F3F7` |
| `--color-focus-ring` | **焦点环（中性，非品牌蓝）** | `#0F1729` | `#FFFFFF` |
| `--color-selected` | **选中（中性，非品牌蓝）** | `#0F1729` | `#FFFFFF` |
| `--color-link-hover` | 链接 hover（唯一品牌蓝控件用途） | `#123AFF` | `#4161FF` |
| `--color-danger-bg` | 危险操作底 | `#F24E3F` | `#F24E3F` |

**Agent 状态点（固定语义，不可交换）**：
`--color-agent-idle`（蓝=待响应）· `--color-agent-running`（绿=运行中，带 pulse）· `--color-agent-completed`（绿）· `--color-agent-error`（红）· `--color-agent-paused`（灰）

**代码高亮（固定）**：keyword 蓝 `--color-code-keyword` / string 绿 `--color-code-string` / comment 灰 `--color-code-comment` / number 橙 `--color-code-number` / fn `--color-code-fn`

**Tag 语义槽（状态↔色严格绑定）**：default(N) / info(B) / success(G) / warning(Y) / error(R)，变量 `--color-status-{slot}-{bg|text}`

## 原始色阶

仅用于**装饰图形/插画/分类标签**，不参与高频组件。

- 中性 N：`--n50 … --n1000`（`#F7F8FA → #0F1729`）
- 信号：`--signal-blue` `#123AFF` / `--signal-green` `#00BF74`（+ light 变体）
- 装饰：`--t100/--t800`(Teal) `--p-purple-100/800` `--p-pink-100/800` `--o100/--o500/--o800`(Orange) `--s100/--s500/--s800`(Sky)
- 完整 11×9 装饰色板见 `agentic-genius-DESIGN.md` 第 2.6 节（如需新分类色相从那里取，按 `<color>100` bg + `<color>800` text 模式）。

## 字体与字重

- `--font-sans`：系统 sans（SF Pro Text / PingFang SC），**零 Web Font**
- `--font-mono`：系统等宽（SF Mono）
- 字重：`--weight-regular`(400) / `--weight-medium`(500，按钮/导航/链接) / `--weight-bold`(600，标题，**上限**)
- **❗禁止 700**；需要更强对比改字号或加负字距，不加粗
- 大标题（≥22px）带 `letter-spacing: -0.01em ~ -0.02em`（已写进 `.ag-heading` 等工具类）

字号层级对应工具类：`.ag-display`(36) `.ag-page-title`(28) `.ag-heading`(22) `.ag-subheading`(18) `.ag-body-lg`(16) `.ag-body`(15) `.ag-small`(13) `.ag-caption`(12) `.ag-micro`(11)

## 间距 Scale

base 4px。**所有 padding/margin/gap 从此取值**，禁止裸数字。

`--space-1`(4) `--space-2`(8) `--space-3`(12) `--space-4`(16，默认padding) `--space-5`(20) `--space-6`(24) `--space-8`(32) `--space-10`(40) `--space-12`(48) `--space-16`(64) `--space-20`(80) `--space-24`(96) `--space-32`(128)。
icon+text 专用：`--space-icon-text`(6)。

## 控件尺寸 Scale

基础库内部的固定尺寸必须先沉淀到这里；业务 UI 不直接写 `14px` / `32px` / `2px` 这类视觉值。

- 字号：`--font-size-micro`(11) `--font-size-caption`(12) `--font-size-small`(13) `--font-size-control`(14) `--font-size-body`(15) `--font-size-body-lg`(16) `--font-size-subheading`(18) `--font-size-heading`(22) `--font-size-page-title`(28) `--font-size-display`(36)
- 边框/焦点：`--border-width-default`(1) `--border-width-strong`(2) `--ring-width-focus`(2) `--ring-offset-focus`(2) `--ring-width-halo`(3)
- 控件：`--size-icon-sm`(14) `--size-icon-md`(16) `--size-control-sm`(18) `--size-control-md`(32) `--size-switch-w`(32) `--size-switch-h`(18) `--size-switch-thumb`(14)

## 圆角 Scale

**只从此取值，禁止自定义新 radius**。嵌套元素 radius ≤ 父元素。

`--radius-none`(0，agent气泡) `--radius-xs`(4，tag) `--radius-sm`(6，**默认**：按钮/输入/code) `--radius-md`(8，卡片) `--radius-lg`(12，modal/用户气泡) `--radius-xl`(16，大feature卡) `--radius-full`(9999，圆点/头像/pill)。

## 阴影 / Elevation

**只从此取值，禁止自定义新阴影**。

- `--shadow-card`：默认卡片阴影（浅色）
- `--shadow-whisper`：浮起 feature 卡（**暗色自动降级为 1px 边框**）
- `--shadow-modal`：弹窗/popover
- `--ring-contained` / `--ring-selected`：Ring 卡片普通态/选中态
- `--shadow-inset`：按下/disabled 容器
- Focus ring 不在阴影系统：用 `outline: 2px solid var(--color-focus-ring)` + offset 2px
