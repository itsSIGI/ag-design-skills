# Anti-Examples — 翻车案例库

> 每次 `ag-design-audit` 返回 FAIL 后，把"错误代码 + 修正方向"沉淀到这里。
> 新案例追加到末尾，编号递增。

---

## #1 — 品牌蓝焦点环

**症状**：输入框 focus 使用蓝色边框 + 淡蓝背景

```css
/* ❌ 错误 */
.custom-input:focus {
  border-color: #123AFF;
  background-color: rgba(18, 58, 255, 0.05);
  outline: 2px solid #123AFF;
}
```

**修正**：焦点环用中性色 `var(--color-focus-ring)`

```css
/* ✅ 正确 */
.custom-input:focus-visible {
  border-color: var(--color-border-strong);
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
```

**根因**：AI 训练数据中大量 UI 库使用蓝色焦点环，这是默认行为。AG 设计系统**整个焦点态用中性色**，品牌蓝只在链接 hover / agent 状态 / 代码高亮三处出现。

**规则引用**：6 条铁律 #6、Design Signatures `CRITICAL: 中性色焦点环`

---

## #2 — font-weight: 700

**症状**：标题使用 `font-weight: 700` 或 `font-weight: bold`

```tsx
/* ❌ 错误 */
<h2 style={{ fontWeight: 700, fontSize: '22px' }}>Dashboard</h2>
```

**修正**：字重上限 600，需要更强对比改字号或加负字距

```tsx
/* ✅ 正确 */
<h2 className="text-[22px] font-semibold tracking-tight">Dashboard</h2>
// 使用排版样式：font-weight: 600 + letter-spacing: -0.01em
```

**根因**：大多数 CSS 框架和浏览器默认标题 `font-weight: bold` = 700。AG 设计系统严格限制 600 上限。

**规则引用**：6 条铁律 #5、Anti-Patterns #14

---

## #3 — 自造卡片样式

**症状**：不使用 `<AgCard>`，手写 div + shadow + radius

```tsx
/* ❌ 错误 */
<div style={{
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  borderRadius: '12px',
  padding: '24px',
  backgroundColor: '#F7F8FA'
}}>
  {content}
</div>
```

**修正**：使用 `<AgCard>` 及其 elevation 变体

```tsx
/* ✅ 正确 */
<AgCard variant="whisper">
  {content}
</AgCard>
```

**根因**：AI 习惯性用 inline style 写卡片。AG 设计系统有完整的 5 级 elevation 卡片组件（`default` / `ring` / `whisper` / `selected` / `inset`），不需要手写。

**规则引用**：Design Signatures `CRITICAL: 卡片用 <AgCard>`、替代映射表 §7

---

## #4 — 裸 hex 色值在业务代码

**症状**：业务组件中直接写 hex 色值

```tsx
/* ❌ 错误 */
<span style={{ color: '#667085' }}>Secondary text</span>
<div style={{ borderColor: '#E7ECF3' }}>...</div>
```

**修正**：使用语义 token 变量

```tsx
/* ✅ 正确 */
<span style={{ color: 'var(--color-text-secondary)' }}>Secondary text</span>
<div style={{ borderColor: 'var(--color-border-subtle)' }}>...</div>
```

**根因**：AI 从 tokens.md 查到色值后直接把 hex 写进代码。正确做法是引用变量名，hex 值只是给人核对的。ECharts option 内部是唯一例外。

**规则引用**：6 条铁律 #3、Anti-Patterns #1 + #3

---

## #5 — 手写交互态覆盖组件内置态

**症状**：给 `<Button>` 手写 hover/focus 样式

```css
/* ❌ 错误 */
.custom-btn:hover {
  background-color: #E5E7EB;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.custom-btn:focus {
  outline: 2px solid #123AFF;
}
```

**修正**：`<Button>` 的 hover/focus 已内置在组件中，不需要手写

```tsx
/* ✅ 正确 — 直接用组件，不覆盖交互态 */
<Button variant="default">Submit</Button>
// hover/focus/disabled 全部由组件内部处理
```

**根因**：AG 设计系统的 6 条红线之首——"禁止手写视觉值"。shadcn/AG 组件已内置所有交互态，手写 `:focus`（尤其蓝色 focus）= 直接违规。

**规则引用**：ag-design-system 红线 #0、6 条铁律 #1

---

## #6 — 混用图标库

**症状**：项目中同时出现 MingCute + Lucide + FontAwesome 图标

```tsx
/* ❌ 错误 */
import { Calendar } from 'lucide-react';
import { FaUser } from 'react-icons/fa';

<Calendar size={16} />
<FaUser size={16} />
```

**修正**：统一使用 MingCute 图标

```tsx
/* ✅ 正确 */
// 使用 MingCute 图标（line 默认 / fill 选中态）
<i className="mgc_calendar_line" style={{ fontSize: 'var(--size-icon-md)' }} aria-label="日历" />
<i className="mgc_user_3_line" style={{ fontSize: 'var(--size-icon-md)' }} aria-label="用户" />
```

**根因**：AG 设计系统明确规定 MingCute 为唯一图标库。混用会导致视觉风格不一致（线条粗细、圆角风格、填充规则各异）。

**规则引用**：Design Signatures `HIGH: MingCute 图标`

---

> **追加新案例时**：
> 1. 编号递增
> 2. 包含：症状（错误代码）→ 修正（正确代码）→ 根因 → 规则引用
> 3. 每次 audit FAIL 后检查是否属于已知 anti-example；如果是新类型则追加
