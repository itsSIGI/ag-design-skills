# Archetype: Entity Detail / 实体详情页

**Applies to / 适用**：Single entity detail page (compound detail, experiment detail, task detail, etc.) — header summary + tabs + content / 单实体详情页（化合物详情、实验详情、任务详情等）——header 摘要 + tabs 分区 + 内容

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Header: Back + entity name + status tag + actions │
│    返回 + 实体名 + 状态标签 + 操作按钮                 │
├─────────────────────────────────────────────────────┤
│ ② Summary card (key properties at a glance)         │
│    摘要卡片（关键属性一览）                             │
│    ┌ Prop1: val │ Prop2: val │ Prop3: val ┐          │
├─────────────────────────────────────────────────────┤
│ ③ Tabs / Tabs 分区                                   │
│    [Overview/概览] [Params/参数] [History/历史] [Related/关联] │
├─────────────────────────────────────────────────────┤
│ ④ Tab content area / Tab 内容区                       │
│    Renders based on active tab / 根据 tab 渲染不同内容 │
└─────────────────────────────────────────────────────┘
```

## Pseudocode / 伪代码

```tsx
<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>

  {/* ① Header */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <Button variant="ghost">
        <i className="mgc_arrow_left_line" aria-label="Back / 返回" />
      </Button>
      <Heading level={1}>实体名称</Heading>
      <AgBadge variant="success">Running</AgBadge>
    </div>
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      <Button variant="secondary">编辑</Button>
      <Button variant="ghost" style={{ color: 'var(--color-danger-bg)' }}>删除</Button>
    </div>
  </div>

  {/* ② Summary card / 摘要卡片 */}
  <AgCard>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
      <div>
        <Caption style={{ color: 'var(--color-text-muted)' }}>Created at / 创建时间</Caption>
        <Body>2024-03-15</Body>
      </div>
      <div>
        <Caption style={{ color: 'var(--color-text-muted)' }}>Creator / 创建者</Caption>
        <Body>张三</Body>
      </div>
      {/* More properties / 更多属性 */}
    </div>
  </AgCard>

  {/* ③ Tabs */}
  <Tabs>
    <TabsTrigger className="is-active">概览</TabsTrigger>
    <TabsTrigger>参数</TabsTrigger>
    <TabsTrigger>历史</TabsTrigger>
  </Tabs>

  {/* ④ Tab content / Tab 内容 */}
  <div>{/* Render based on activeTab / 根据 activeTab 渲染 */}</div>
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------|------|
| Header left: back + title + status tag; right: action buttons / Header 左侧：返回 + 标题 + 状态标签；右侧：操作按钮 | Standard detail page layout / 标准详情页布局 |
| Status uses `<AgBadge>` (ag-ext) semantic variants / 状态用 `<AgBadge>`（ag-ext）语义变体 | decision-tables §3 |
| Summary properties use grid auto-fit, adaptive columns / 摘要属性用 grid auto-fit，自适应列数 | Responsive / 响应式 |
| Property labels use `<Caption>` + muted color, values use `<Body>` / 属性标签用 `<Caption>` + muted 色，值用 `<Body>` | Hierarchy / 层级 |
| Delete action uses ghost + danger color / 删除操作用 ghost + danger 色 | De-emphasize dangerous actions / 降权危险操作 |

## Spacing Rhythm / spacing 节奏

- Page padding / 页面 padding：`var(--space-6)` (24px)
- Gap between sections / 区块之间 gap：`var(--space-4)` (16px)
- Summary property grid gap / 摘要属性 grid gap：`var(--space-4)` (16px)
