# 组件缺失处理协议（Step 1.4.5 详细流程）

Recipe 构建过程中，某个槽位**找不到合适的 shadcn/ui 组件或 AG 扩展组件**时，按以下四种情况显式处理。**绝不允许沉默地用 div 拼凑**——所有偏离必须留痕（recipe 多一行 或 对话里有用户确认）。

## 情况 A：组件库已有但你没找到

在 `components-v2.md` 首次搜索未命中 → **不要假装拿到了组件信息**。先做：

1. 重读 `components-v2.md` 全文搜索，确认 shadcn/ui 组件（`<Button>` `<Input>` `<Select>` `<Dialog>` `<Tabs>` 等）和 AG 扩展组件（`<AgCard>` `<AgBadge>` `<AgentStatus>` `<CodeBlock>` 等）是否已覆盖需求
2. 查 [`decision-tables.md`](decision-tables.md) §7 替代映射表
3. 仍找不到 → 进入情况 B 或 C

> **凭训练记忆假装"知道有某个 AG 组件变体"是铁律明确禁止的**——见 [`anti-examples.md`](anti-examples.md)。

## 情况 B：能用现有 shadcn + AG 组件组合实现（推荐路径）

如槽位是"KPI 卡"，可用 `<AgCard>` + `<Heading>` + `<Caption>` + `<Body>` 组合。

recipe 里**显式登记复合块**：

```
| Slot          | 组件类型      | 来源             | 组件                                    | Token 引用                         | 验证来源              | 备注                                        |
| KPI 卡片      | 复合块        | shadcn + ag-ext  | <AgCard> + <Heading> + <Body>           | var(--space-4), var(--color-surface) | components-v2.md ✓  | 无独立 KPI 组件，用 AgCard 组合             |
```

**要求**：
- 复合块的每个子组件必须是真实的 shadcn 或 AG 扩展组件（已在 `components-v2.md` 确认存在）
- 备注列必须说明"为什么是组合而不是单一组件"
- Step 3 渲染时按子组件正确组合，所有视觉值走 `var(--*)`

## 情况 C：需要开源组件

如图表（ECharts）、富文本编辑器、Markdown 渲染、复杂日期选择等——shadcn/ui + AG 扩展组件体系既无现成也无法组合。

**操作**：
1. 查 [`open-source-guide.md`](open-source-guide.md) 获取推荐库
2. recipe 中标注 `来源: 开源-<库名>`，备注栏写 token 化包装方案
3. 正常继续流程

```
| Slot      | 组件类型  | 来源         | 组件                  | Token 引用               | 验证来源             | 备注                                 |
| 趋势图    | 图表      | 开源-ECharts | ECharts              | tokens.md 色阶           | open-source-guide ✓  | 配色从 tokens.md 原始色阶取           |
```

## 情况 D：真缺，必须停下问用户

用户需要的功能**既不在 shadcn/ui + AG 扩展组件体系中，也找不到合适的开源方案**——design-craft 不自己造。

**必须停下来给用户显式声明 + 路径选择**：

```markdown
⚠️ 组件缺失声明

需求：[槽位描述]
所需组件：[组件名]
AG 设计系统现状：shadcn/ui 和 AG 扩展组件均未提供，且无法用现有组件组合实现

可选路径：
1. 用现有 shadcn + AG 组件 [A + B + C] 拼凑近似实现（功能受限：[列出局限]）
2. 向设计系统团队提需求补组件（推荐——长期复用）
3. 本项目内临时封装，但必须满足：
   - 内部样式用 AG token（var(--*)），不裸写 hex / px
   - 代码顶部加注释：// TODO: migrate to shadcn/AG component when available
   - recipe 里登记为"临时本地组件"

请确认走哪条路径再继续。
```

**收到用户确认**前不进入 Step 2。

---

## 关键不变量（必守）

- **绝不允许**：Step 3 用 `<div>` 沉默拼一个看起来像组件的东西
- 复合块在 recipe **显式登记**（B）；开源组件**显式标注包装方案**（C）；真缺组件**显式停下问用户**（D）
- **核心**：recipe 不限制创新，限制"沉默的偏离"——所有偏离必须留痕
