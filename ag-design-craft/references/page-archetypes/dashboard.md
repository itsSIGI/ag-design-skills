# Archetype: Dashboard / 总览页

**Applies to / 适用**: Metrics + global filters + charts/lists overview page (home, data overview, etc.)
指标 + 全局筛选 + 图表/列表的总览页（home overview、数据概览等）

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Header: page title (left) + global filters (right)│
│   头部行：页面标题(左) + 全局筛选/操作(右)            │
├─────────────────────────────────────────────────────┤
│ ② KPI row: 3-4 kpi-stat-cards in equal-width grid    │
│   KPI 指标行：3-4 个指标卡等宽排列                    │
│    ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│    │ KPI1 │ │ KPI2 │ │ KPI3 │ │ KPI4 │              │
│    └──────┘ └──────┘ └──────┘ └──────┘              │
├─────────────────────────────────────────────────────┤
│ ③ Chart area (by type) / 图表区                      │
│    Time series → Bar/Column (full width)             │
│    Proportion → Donut   Summary → Gauge              │
├──────────────────────────────┬──────────────────────┤
│ ④ Project cards / list area  │ ⑤ Topology view      │
│   项目卡 / 列表区（可选）     │   拓扑视图（可选）    │
│   Using project-card pattern │   topology-node       │
│                              │                      │
└──────────────────────────────┴──────────────────────┘
```

## Recommended Patterns / 推荐 Pattern

| Pattern | Usage / 用途 |
|---------|-------------|
| `kpi-stat-card` | Core metric display / 核心指标展示 |
| `project-card` | Project overview cards with status & progress / 项目卡片 |
| `topology-node` | Agent DAG topology visualization / Agent 拓扑可视化 |
| `status-tag` | Status indicators in lists / 列表中的状态指示 |

## Pseudocode / 伪代码

```tsx
<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

  {/* ① Header / 头部行 */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Heading level={1}>Dashboard</Heading>
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      {/* Filter / action buttons */}
    </div>
  </div>

  {/* ② KPI row / KPI 指标行 */}
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
    <KpiStatCard label="Active Projects" value="24" trend={12} trendLabel="vs last month" />
    <KpiStatCard label="Running Agents" value="8" />
    <KpiStatCard label="Completed Tasks" value="1,234" trend={-3} trendLabel="vs last week" />
    <KpiStatCard label="Success Rate" value="94.2%" trend={2.1} />
  </div>

  {/* ③ Chart area — Bar full width / 图表区 */}
  <AgCard style={{ height: '320px' }}>
    {/* ECharts / chart component */}
  </AgCard>

  {/* ④+⑤ Projects + Topology / 项目 + 拓扑 */}
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
    {/* Project cards grid / 项目卡片网格 */}
    <div>
      <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>Recent Projects / 近期项目</Heading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <ProjectCard name="Drug Discovery Phase 2" status="running" progress={67} />
        <ProjectCard name="ADMET Analysis" status="completed" progress={100} />
      </div>
    </div>

    {/* Topology view / 拓扑视图 */}
    <div>
      <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>Agent Topology / Agent 拓扑</Heading>
      <AgCard style={{ padding: 'var(--space-4)' }}>
        <TopologyNode name="Coordinator" role="coordinator" status="active" isRoot />
        <TopologyEdge />
        <TopologyNode name="Chemistry Agent" role="specialist" status="active" />
      </AgCard>
    </div>
  </div>
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------------|-------------|
| Global filters next to page title on right / 全局筛选器紧靠标题右侧 | design-rules CRITICAL |
| KPI cards equal-width, `grid` + `gap: var(--space-4)` / KPI 卡等宽 | spacing via token |
| Bar/Column chart full width row / Bar 图独占全宽行 | design-rules HIGH |
| Chart fixed pixel height (280-360px recommended) / 图表固定像素高度 | design-rules HIGH |
| Page bg white `var(--color-bg)` / 页面背景白 | design-rules CRITICAL |
| Containers use `<AgCard>` (ag-ext), no custom shadow / 容器用 `<AgCard>`（ag-ext） | replacement mapping §7 |

## Spacing Rhythm / spacing 节奏

- Page padding: `var(--space-6)` (24px)
- Section gap: `var(--space-6)` (24px)
- Card internal padding: `<AgCard>` built-in
- KPI card gap: `var(--space-4)` (16px)

## Common Mistakes / 别犯的错

- ❌ Filters in top-right corner / 筛选器放右上角
- ❌ Bar chart inside split grid / Bar 图塞进分列网格
- ❌ Custom shadow on cards / 卡片加自定义 shadow
- ❌ KPI values in brand blue / KPI 数值用品牌蓝
