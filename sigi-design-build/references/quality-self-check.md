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
- 图标与文本垂直居中对齐（用 `vertical-align: middle` 或 flex `align-items: center`）
- 大标题（≥22px）带负字距（排版组件已内置 `letter-spacing: -0.01em`）

**FAIL 修法**：检查对齐，调整 flex 布局或 padding

---

# Step 3.5 三份清单速查（从 SKILL.md 下沉）

> 主流程在进 Step 4 之前自己走这三份清单。这不是合规校验（合规由 sub-skill 干），
> 是**让"合规但平庸"升级到"合规且精致"** 的补强。任一 FAIL → 回 Step 3 改完再走。

## 3.5.A 视觉质量自检 — 本文件上方 7 节

逐条过 7 项：
1. Squint Test（眯眼能否分主次）
2. 多维度视觉层级（至少 2–3 维）
3. 60-30-10 视觉重量（品牌色 ≤ 10%，仅链接 hover / agent 状态 / 代码高亮）
4. 垂直节奏一致
5. 用 `gap` 不用 `margin`（间距统一走 `var(--space-*)`）
6. Focus 用 `:focus-visible`（焦点环用中性色 `var(--color-focus-ring)`）
7. 光学对齐（标题 / 图标方向）

任一 FAIL → **回 Step 3 改完再走**，不带已知问题进 Step 4。

## 3.5.B Polish Pass — [`visual-polish-guide.md`](visual-polish-guide.md) §7

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

## 3.5.C Harden 清单 — [`harden-checklist.md`](harden-checklist.md)

逐条过 10 项非正常路径：空态 / loading / error / 长文本 / 极端数据 / 0-1-N 状态 / 权限缺失 / 小视口 / 键盘可达 / 时区时间。

每条：✅ 已覆盖 / ❌ 缺失（回 Step 3 补）/ ➖ 业务无关（标注理由）。
