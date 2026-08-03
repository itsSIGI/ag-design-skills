# Locked Recipe 模板

> Step 1.5 按本模板输出。**必须对用户可见**，不能只留在 thinking 里。

## 标准模式

````markdown
## Locked Recipe

| Slot | 组件类型 | 来源 | 组件 | Token 引用 | 验证来源 | 备注 |
|------|---------|------|-----|-----------|---------|------|
| 删除确认弹窗 | Modal | shadcn | `Dialog` | var(--color-surface) | shadcn/dialog ✓ | — |
| KPI 指标卡 | Card | ag-ext | `AgMetricCard` | var(--space-4) | ag/AgMetricCard ✓ | tabular-nums |

## Spacing 决策

| 区域 | Token 变量 | 像素值 |
|------|-----------|--------|
| 卡片间距 | var(--space-4) | 16 |
| 区块间距 | var(--space-8) | 32 |
````

## Vision Spec 模式（额外两列语义）

TIER_3 区域的行，`来源` 填 `vision-spec`，`验证来源` 填 Vision Spec 章节号：

````markdown
| Hero 标题 | Display Text | vision-spec | 自建 | TOKEN_ESCAPE: hero-title-size | Vision Spec §3 | clamp(40px, 5vw+12px, 64px) |
````

## 「验证来源」列的合法取值

| 取值 | 含义 |
|------|------|
| `shadcn/[组件名] ✓` | 已从 components-v2.md 确认 shadcn 组件存在 |
| `ag/[组件名] ✓` | 已从 components-v2.md 确认 AG 扩展组件存在 |
| `tokens.md ✓` | 已确认 token 变量存在 |
| `Vision Spec §N` | Vision Spec 模式下的 TIER_3 自建元素 |

**非法**（写了等于没验证）：凭印象 / 我记得 / 应该有 / Tailwind 默认有 / 其他项目这样用。

## 待决策项格式

任一 slot 不确定时，用这个格式停下来问用户：

````markdown
⚠️ Slot [X] 待用户决策

候选路径：
1. 方案 A —— [来源/做法]，优：... 缺：...
2. 方案 B —— ...

我建议 [N]，理由 [...]。请回 "选 A" / "选 B" 后继续。
````
