# 视觉质量自检清单

> Step 3.5.A 使用。让"合规但平庸"升级到"合规且有质量"。
> 每条 PASS / FAIL，任一 FAIL 回 Step 3 改完再走。

---

## 1. Squint Test（眯眼测试）

眯起眼看页面——**3 秒内能否分辨主次**？

- 页面有一个明确的视觉焦点（主标题 / 主操作 / 核心数据）
- 次要内容明显降权（更小字号 / 更浅颜色 / 更少视觉重量）
- 如果眯眼看全是"一片灰"——层级不够，需要加强主信息的对比

**FAIL 修法**：提升主元素字号（用页面标题/标题排版组件）+ 降低次要信息颜色（`var(--color-text-secondary)` / `var(--color-text-muted)`）

---

## 2. 多维度视觉层级

至少用 **2–3 个维度**建立层级，不只靠一个：

| 维度 | 工具 |
|------|------|
| 字号 | 排版组件：display(36) → page-title(28) → heading(22) → subheading(18) → body(15) → small(13) → caption(12) |
| 字重 | `var(--weight-bold)`(600) → `var(--weight-medium)`(500) → `var(--weight-regular)`(400) |
| 颜色 | `var(--color-text-primary)` → `var(--color-text-secondary)` → `var(--color-text-muted)` |
| 间距 | 不同区域用不同间距档位区分重要性 |
| Elevation | `<AgCard>` 变体（default → ring → whisper → selected） |

**FAIL 修法**：如果只靠字号区分层级，补上颜色或字重维度

---

## 3. 60-30-10 视觉重量

| 比例 | 角色 | AG 映射 |
|------|------|---------|
| 60% | 主色（中性底） | `var(--color-bg)` / `var(--color-surface)` / 白色 |
| 30% | 辅助色（中性文字/边框） | `var(--color-text-primary)` / `var(--color-text-secondary)` / `var(--color-border-subtle)` |
| 10% | 强调色 | **品牌蓝/绿仅在三处**：链接 hover、agent 状态点、代码高亮。其余强调用中性黑 `var(--color-primary-bg)` |

**FAIL 修法**：如果品牌蓝/绿面积过大（出现在按钮填充、卡片选中、导航高亮），回退到中性色方案

---

## 4. 垂直节奏一致

- 同一页面内，相同级别的模块间距一致
- 卡片内 padding 统一（同一类卡片不出现有的 `var(--space-3)` 有的 `var(--space-6)`）
- 标题与内容的间距固定（推荐 `var(--space-3)` = 12px）
- 卡片间 gap 统一（推荐 `var(--space-4)` = 16px 或 `var(--space-6)` = 24px）

**FAIL 修法**：统一同级元素间距到一个档位

---

## 5. 用 `gap` 不用 `margin`

- Flex/Grid 容器的子元素间距用 `gap`
- 避免 margin 导致的外边距合并问题
- 间距值走 `var(--space-*)`

```css
/* ✅ */
.container { display: flex; flex-direction: column; gap: var(--space-4); }

/* ❌ */
.item { margin-bottom: 16px; }
.item:last-child { margin-bottom: 0; }
```

**FAIL 修法**：把 margin 方案改为 gap 方案

---

## 6. Focus 用 `:focus-visible`

- 不用 `:focus`（鼠标点击也会触发）
- 用 `:focus-visible`（只在键盘导航时显示焦点环）
- 焦点环颜色用 `var(--color-focus-ring)`（中性色），**不用品牌蓝**
- shadcn/AG 组件已内置正确的 focus 行为，手写组件必须自行实现

```css
/* ✅ */
.custom-control:focus-visible {
  outline: var(--ring-width-focus) solid var(--color-focus-ring);
  outline-offset: var(--ring-offset-focus);
}
```

**FAIL 修法**：替换 `:focus` 为 `:focus-visible`，焦点色改为中性色

---

## 7. 光学对齐

- 标题文本左侧与下方内容的左侧对齐（视觉对齐，不是像素对齐）
- 图标方向一致（如果一组图标都是 line 风格，不混入 fill 风格）
- MingCute 图标与文本垂直居中对齐（用 `vertical-align: middle` 或 flex `align-items: center`）
- 大标题（≥22px）带负字距（排版组件已内置 `letter-spacing: -0.01em`）

**FAIL 修法**：检查对齐，调整 flex 布局或 padding
