# ag-design-audit Checklist

> 7 类审计项。逐条过，每条违规要**具体到行号 + 违反的规则名**。

---

## 1. Recipe 一致性（最关键）

- [ ] 代码中所有"组件原型"元素（Modal / Card / Table / Tabs / Accordion / 开源组件）都来自 Step 1 Locked Recipe——无自拼 div 模拟组件
- [ ] 所有组件在 `components-v2.md` 中有记录，无臆造组件
- [ ] 开源组件在 recipe 中标注了来源（`开源-<库名>`）
- [ ] 代码中未出现 recipe 没有的 UI 元素（无用户未要求的导出按钮、刷新按钮、加载态等）
- [ ] recipe 中标注为"复合块"的元素，代码实现与 recipe notes 描述一致

---

## 2. Token 合规

- [ ] 业务代码中**无裸 hex / RGB / HSL 色值**（ECharts option 对象内部除外）
- [ ] 业务代码中**无裸 px 间距**（布局 width/height 除外），间距全走 `var(--space-*)`
- [ ] 业务代码中**无裸 border-radius**，全走 `var(--radius-*)`
- [ ] 业务代码中**无裸 box-shadow**，全走 `var(--shadow-*)`
- [ ] 所有 `var(--*)` 引用在 `tokens.md` / `tokens.css` 中存在，**无臆造 token 变量名**
- [ ] 所有组件在 `components-v2.md` 中存在，**无臆造组件**
- [ ] shadcn/AG 组件的交互态（hover/focus/disabled）**未被手写 CSS 覆盖**——交互态已内置

---

## 3. 品牌色规则

- [ ] 品牌蓝（`#123AFF` / `var(--signal-blue)` / `var(--color-link-hover)`）**仅出现在**：链接 hover、代码高亮
- [ ] 品牌绿（`#00BF74` / `var(--signal-green)` / `var(--color-agent-running)` 等）**仅出现在**：agent 状态点、代码高亮
- [ ] 焦点环颜色使用 `var(--color-focus-ring)`（中性色 `#0F1729` / `#FFFFFF`），**不用品牌蓝**
- [ ] 按钮填充使用 `var(--color-primary-bg)`（中性色 `#0F1729` / `#FFFFFF`），**不用品牌蓝**
- [ ] 选中态使用 `var(--color-selected)`（中性色），**不用品牌蓝**

---

## 4. 排版规则

- [ ] **无 `font-weight: 700`** 或更高——最大值 `var(--weight-bold)` = 600
- [ ] 字体使用 `var(--font-sans)` / `var(--font-mono)`，**零 Web Font 引入**
- [ ] 图标来自 **MingCute**（line 默认 / fill 选中态），**不混用**其他图标库或 emoji
- [ ] 大标题（≥22px）有负字距（排版组件已内置）
- [ ] 字号使用排版组件或 `var(--font-size-*)`，不用裸 px

---

## 5. 布局与容器

- [ ] 卡片容器使用 `<AgCard>` 及其变体（`whisper` / `ring` / `selected` / `inset`），**不自造卡片样式**
- [ ] **无嵌套容器边框**——`<AgCard>` 内不嵌套 `<AgCard>`（兄弟元素用 separator 或留白区分）
- [ ] 嵌套元素 radius ≤ 父元素 radius
- [ ] 全局筛选器紧靠页面标题右侧（不在右上角）
- [ ] Bar/Column 图独占全宽行（不在分列网格内）
- [ ] 长列表模块设 `max-height` 内部滚动
- [ ] 每个图表声明固定像素高度
- [ ] 间距统一走 `var(--space-*)`（4px 基准），优先用 `gap` 不用 `margin`

---

## 6. 开源组件包装

- [ ] 开源组件有 token 化包装（模式 A 外层容器 / 模式 B 变量注入 / 模式 C 最小化覆盖）
- [ ] 开源组件的 focus 态使用 `var(--color-focus-ring)`（中性色），**不用默认蓝色**
- [ ] 开源组件在 recipe 中有显式登记，标注了来源
- [ ] 未全量覆盖开源组件内部 CSS（避免版本升级崩溃）
- [ ] ECharts 配色从 `tokens.md` 原始色阶取值，不自创色值

---

## 7. 暗色模式 + 无障碍

- [ ] 所有视觉值走语义 token（`var(--color-*)` / `var(--shadow-*)`），切换 `data-theme` 无需改代码
- [ ] 不出现仅在 light 主题下可读但 dark 主题下对比度不足的硬编码色值
- [ ] 文本对比度 ≥ 4.5:1（WCAG 2.x），大文本 ≥ 3:1
- [ ] 图标有 `aria-label`
- [ ] 交互元素使用语义 HTML（`<button>` / `<a>` / `<input>`），不用 `<div onClick>`
- [ ] Modal/浮层有 focus trap（焦点不逃逸到背后）
- [ ] Agent 状态色语义固定：绿=running/completed、蓝=idle、红=error、灰=paused（不可交换）

---

## 8. Vision Spec 合规（仅 Vision Spec 模式启用）

> 当 craft 以 Vision Spec 模式生成代码时启用本类审计。标准模式下跳过。

### 8.1 TOKEN_ESCAPE 声明完整性

- [ ] TOKEN_ESCAPE 总数 ≤ 15 个（品牌延伸模式 ≤ 8 个）
- [ ] **TIER_1 区域（导航/页脚/系统 UI）TOKEN_ESCAPE = 0**——无任何自定义色值/间距/圆角
- [ ] 每个 TOKEN_ESCAPE 有明确 `scope`（作用域限定到具体 section/组件）
- [ ] 每个 TOKEN_ESCAPE 有 `justification`（为什么需要偏离 AG token）
- [ ] Recipe 表中所有 TOKEN_ESCAPE 条目的 `source` 列标注为 `vision-spec`

### 8.2 TOKEN_ESCAPE 与代码一致性

- [ ] 代码中实际使用的自定义色值（裸 hex/RGB/HSL）**全部**在 TOKEN_ESCAPE 声明中有对应条目——无未声明的偏离
- [ ] TOKEN_ESCAPE 声明的色值与代码中实际色值一致（允许 ±5% 亮度微调）
- [ ] TOKEN_ESCAPE 的 `scope` 限定被严格执行——声明为 `hero-section-only` 的自定义值不出现在其他 section

### 8.3 TIER 区域隔离

- [ ] TIER_1 区域（导航、页脚、侧边栏等系统 UI）100% 使用 AG 标准 token，无自定义样式
- [ ] TIER_2 区域（Body sections）仅使用 AG token + 业务语义变量，不使用 Vision Spec 创意值
- [ ] TIER_3 区域（Hero/品牌区）的创意样式不泄漏到 TIER_1/TIER_2 区域（检查 CSS 作用域）
- [ ] 过渡接缝（TIER_3 → TIER_2）存在渐变/间距缓冲，不是硬切换

### 8.4 Vision Spec 动效合规

- [ ] 所有动画仅使用 `transform` + `opacity`（无 layout/paint 触发属性动画）
- [ ] 每个动画有 `@media (prefers-reduced-motion: reduce)` 回退
- [ ] 首屏内容在 1s 内全部可见（不被动画延迟阻挡）
- [ ] 同时 `will-change` 的元素 ≤ 10
- [ ] TIER_1/TIER_2 区域的 AG 功能性动效未被修改（按钮 hover 150ms、卡片 hover 200ms 等）

### 8.5 Vision Spec 配色对比度

- [ ] TIER_3 区域的自定义配色满足 WCAG AA（正文 ≥ 4.5:1，大文本 ≥ 3:1）
- [ ] 暗色背景上的浅色文字对比度 ≥ 4.5:1（常见陷阱：灰色文字在深色底上不达标）
- [ ] 渐变背景上的文字在渐变**所有区域**都满足对比度（检查渐变亮部）
