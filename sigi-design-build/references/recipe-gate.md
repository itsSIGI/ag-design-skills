# Recipe Gate — 写代码前的强制门禁

> Step 1.4 完成 recipe 后读本文件。**用户确认前禁止进 Step 2**。

---

## A. 公开输出 Locked Recipe 表

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

## B. 触发 stop-and-ask 的场景

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
