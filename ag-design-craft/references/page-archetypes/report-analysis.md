# Archetype: Report / Analysis / 分析报告页

**Applies to / 适用**：Analysis report page — chart combinations + data table + export functionality / 分析报告页——图表组合 + 数据表 + 导出功能

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Header: Report title + time range + export         │
│    报告标题 + 时间范围 + 导出                           │
├─────────────────────────────────────────────────────┤
│ ② KPI summary row / KPI 摘要行                       │
│    ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│    │Total │ │Pass  │ │Fail  │ │ Avg  │              │
│    │ 总量 │ │ 成功 │ │ 失败 │ │ 平均 │              │
│    └──────┘ └──────┘ └──────┘ └──────┘              │
├─────────────────────────────────────────────────────┤
│ ③ Time-series chart (Bar/Column, full width)         │
│    时序图（Bar/Column，独占全宽）                       │
├──────────────────────────┬──────────────────────────┤
│ ④ Proportion (Donut)     │ ⑤ Distribution (Gauge)   │
│    占比图（Donut）        │    分布图（Gauge/其他）    │
├──────────────────────────┴──────────────────────────┤
│ ⑥ Data detail table (optional) / 数据明细表格（可选）  │
└─────────────────────────────────────────────────────┘
```

## Pseudocode / 伪代码

```tsx
<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

  {/* ① Header */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Heading level={1}>Computation Task Analysis Report / 计算任务分析报告</Heading>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <Select style={{ width: '160px' }}>
        <option>Last 7 days / 最近 7 天</option>
        <option>Last 30 days / 最近 30 天</option>
        <option>Last 90 days / 最近 90 天</option>
      </Select>
      <Button variant="secondary">
        <i className="mgc_download_2_line" style={{ marginRight: 'var(--space-icon-text)' }} /> Export / 导出
      </Button>
    </div>
  </div>

  {/* ② KPI summary / KPI 摘要 */}
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
    {[
      { label: 'Total Tasks / 总任务数', value: '1,234', trend: '+12%' },
      { label: 'Success Rate / 成功率', value: '94.2%', trend: '+2.1%' },
      { label: 'Failures / 失败数', value: '72', trend: '-8%' },
      { label: 'Avg Duration / 平均耗时', value: '3.2h', trend: '-15%' },
    ].map(item => (
      <AgCard key={item.label}>
        <Caption style={{ color: 'var(--color-text-secondary)' }}>{item.label}</Caption>
        <Heading style={{ display: 'block', margin: 'var(--space-2) 0' }}>{item.value}</Heading>
        <Caption style={{ color: 'var(--color-text-muted)' }}>{item.trend}</Caption>
      </AgCard>
    ))}
  </div>

  {/* ③ Time-series chart — full width / 时序图 — 独占全宽 */}
  <AgCard>
    <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>Task Trend / 任务趋势</Heading>
    <div style={{ height: '320px' }}>{/* ECharts Bar */}</div>
  </AgCard>

  {/* ④⑤ Proportion + Distribution — two columns / 占比 + 分布 — 两列 */}
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
    <AgCard>
      <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>Task Type Distribution / 任务类型分布</Heading>
      <div style={{ height: '280px' }}>{/* ECharts Donut */}</div>
    </AgCard>
    <AgCard>
      <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>Success Rate / 成功率</Heading>
      <div style={{ height: '280px' }}>{/* ECharts Gauge */}</div>
    </AgCard>
  </div>

  {/* ⑥ Data detail / 数据明细 */}
  <AgCard>
    <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>Data Detail / 数据明细</Heading>
    <Table>
      <thead>
        <tr>
          <th>Task Name / 任务名</th>
          <th>Type / 类型</th>
          <th>Status / 状态</th>
          <th>Submitted / 提交时间</th>
          <th style={{ textAlign: 'right' }}>Duration / 耗时</th>
        </tr>
      </thead>
      <tbody>{/* Data rows / 数据行 */}</tbody>
    </Table>
  </AgCard>
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------|------|
| Time-series chart (Bar) takes full width row / 时序图（Bar）独占全宽行 | design-rules CRITICAL |
| Proportion (Donut) and summary (Gauge) can be side-by-side / 占比图（Donut）和汇总（Gauge）可并列 | Non-Bar charts can split columns / 非 Bar 可分列 |
| Chart types: time-series->Bar, proportion->Donut, summary rate->Gauge / 图表类型：时序->Bar，占比->Donut，汇总率->Gauge | design-rules HIGH |
| Each chart fixed height (320px / 280px) / 每个图表固定高度（320px / 280px） | design-rules HIGH |
| Time range filter next to title on right / 时间范围筛选紧靠标题右侧 | design-rules CRITICAL |
| Export button uses secondary / 导出按钮用 secondary | Non-primary action / 非主操作 |

## Spacing Rhythm / spacing 节奏

- Page padding / 页面 padding：`var(--space-6)` (24px)
- Gap between sections / 区块之间：`var(--space-6)` (24px)
- KPI card gap / KPI 卡 gap：`var(--space-4)` (16px)
- Side-by-side chart gap / 并列图表 gap：`var(--space-4)` (16px)
