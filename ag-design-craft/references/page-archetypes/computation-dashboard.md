# Archetype: Computation Dashboard / 计算任务仪表板

**Applies to / 适用**：Computation task monitoring page — task queue + resource usage + status overview / 计算任务监控页——任务队列 + 资源使用 + 状态概览

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Header: Title + new task button                    │
│    标题 + 新建任务按钮                                 │
├─────────────────────────────────────────────────────┤
│ ② Resource monitor row: 3-4 <AgCard> (CPU/GPU/MEM/DISK) │
│    资源监控行：3-4 个 <AgCard>（CPU/GPU/内存/磁盘）     │
│    ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│    │ CPU  │ │ GPU  │ │ MEM  │ │ DISK │              │
│    │ 72%  │ │ 45%  │ │ 8.2G │ │ 120G │              │
│    └──────┘ └──────┘ └──────┘ └──────┘              │
├─────────────────────────────────────────────────────┤
│ ③ Task queue table / 任务队列表格                     │
│    Status(<AgentStatus>) | Name | Type | Submitted | Duration │
│    状态 | 任务名 | 类型 | 提交时间 | 耗时               │
└─────────────────────────────────────────────────────┘
```

## Pseudocode / 伪代码

```tsx
<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

  {/* ① Header */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Heading level={1}>Computation Tasks / 计算任务</Heading>
    <Button>
      <i className="mgc_add_line" style={{ marginRight: 'var(--space-icon-text)' }} /> New Task / 新建任务
    </Button>
  </div>

  {/* ② Resource monitor / 资源监控 */}
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
    {[
      { label: 'CPU', value: '72%', sub: '18/24 cores' },
      { label: 'GPU', value: '45%', sub: '2/4 NVIDIA A100' },
      { label: 'Memory / 内存', value: '8.2 GB', sub: '8.2/32 GB' },
      { label: 'Disk / 磁盘', value: '120 GB', sub: '120/500 GB' },
    ].map(item => (
      <AgCard key={item.label}>
        <Caption style={{ color: 'var(--color-text-secondary)' }}>{item.label}</Caption>
        <Heading style={{ display: 'block', margin: 'var(--space-2) 0' }}>{item.value}</Heading>
        <Caption style={{ color: 'var(--color-text-muted)' }}>{item.sub}</Caption>
      </AgCard>
    ))}
  </div>

  {/* ③ Task queue / 任务队列 */}
  <AgCard>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
      <Heading level={2}>Task Queue / 任务队列</Heading>
      <Input type="text" placeholder="Search tasks... / 搜索任务..." style={{ width: '240px' }} />
    </div>
    <Table>
      <thead>
        <tr>
          <th>Status / 状态</th>
          <th>Task Name / 任务名</th>
          <th>Type / 类型</th>
          <th>Submitted / 提交时间</th>
          <th style={{ textAlign: 'right' }}>Duration / 耗时</th>
          <th style={{ textAlign: 'right' }}>Actions / 操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><AgentStatus status="running" /> Running</td>
          <td>DFT-优化-benzene</td>
          <td><AgBadge variant="info">DFT</AgBadge></td>
          <td>2024-03-15 14:30</td>
          <td style={{ textAlign: 'right' }}>2h 15m</td>
          <td style={{ textAlign: 'right' }}>
            <Button variant="ghost" size="sm">View / 查看</Button>
            <Button variant="ghost" size="sm" style={{ color: 'var(--color-danger-bg)' }}>Terminate / 终止</Button>
          </td>
        </tr>
        {/* More rows / 更多行 */}
      </tbody>
    </Table>
  </AgCard>
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------|------|
| Resource monitor uses equal-width grid + `<AgCard>` / 资源监控用等宽 grid + `<AgCard>` | Dashboard archetype / dashboard 原型 |
| Status column uses `<AgentStatus status="{running/completed/error/paused}">` / 状态列用 `<AgentStatus>`（ag-ext） | Agent status colors fixed / Agent 状态色固定 |
| Task type uses `<AgBadge>` (ag-ext) / 任务类型用 `<AgBadge>`（ag-ext） | decision-tables §3 |
| Duration column right-aligned / 耗时列右对齐 | Numeric right-align rule / 数值右对齐规则 |
| Terminate action uses ghost + danger color / 终止操作用 ghost + danger 色 | De-emphasize dangerous actions / 降权危险操作 |

## Spacing Rhythm / spacing 节奏

- Page padding / 页面 padding：`var(--space-6)` (24px)
- Gap between sections / 区块之间：`var(--space-6)` (24px)
- Resource card gap / 资源卡片 gap：`var(--space-4)` (16px)
