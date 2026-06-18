# Archetype: Experiment Workflow / 实验流程管理

**Applies to / 适用**：Experiment workflow management page — step card sequence + parameter form + status tracking + result recording / 实验流程管理页——步骤卡片序列 + 参数表单 + 状态跟踪 + 结果记录

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Header: Back + experiment name + status + actions │
│    返回 + 实验名 + 状态标签 + 操作                     │
├─────────────────────────────────────────────────────┤
│ ② Step progress bar (horizontal) / 步骤进度条（横向）  │
│    [Prep/准备] → [React/反应] → [Purify/纯化] → [Characterize/表征] → [Analyze/分析] │
├─────────────────────────────────────────────────────┤
│ ③ Current step detail (<AgCard>)                     │
│    当前步骤详情（<AgCard>）                            │
│    Step title + param form + action buttons          │
│    步骤标题 + 参数表单 + 操作按钮                      │
├─────────────────────────────────────────────────────┤
│ ④ Completed steps (collapsible list)                 │
│    已完成步骤记录（折叠列表）                           │
│    <Accordion> one item per step / 每步一项          │
└─────────────────────────────────────────────────────┘
```

## Pseudocode / 伪代码

```tsx
<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

  {/* ① Header */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <Button variant="ghost"><i className="mgc_arrow_left_line" aria-label="Back / 返回" /></Button>
      <Heading level={1}>实验 EXP-2024-001</Heading>
      <AgBadge variant="warning">In Progress / 进行中</AgBadge>
    </div>
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      <Button variant="secondary">Pause / 暂停</Button>
      <Button>Complete Current Step / 完成当前步骤</Button>
    </div>
  </div>

  {/* ② Step progress — horizontal step indicator wrapped in <AgCard> / 步骤进度 — 用 <AgCard> 包装的横向步骤指示器 */}
  <AgCard>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: 'var(--radius-full)',
            background: step.done ? 'var(--color-primary-bg)' : 'var(--color-surface)',
            color: step.done ? 'var(--color-primary-text)' : 'var(--color-text-secondary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Caption>{step.done ? '✓' : i + 1}</Caption>
          </div>
          <Body style={{ color: step.active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
            {step.name}
          </Body>
          {i < steps.length - 1 && <div style={{ width: '40px', height: '1px', background: 'var(--color-border-subtle)' }} />}
        </div>
      ))}
    </div>
  </AgCard>

  {/* ③ Current step detail / 当前步骤详情 */}
  <AgCard>
    <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>Step 2: Reaction / 反应</Heading>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
      <div>
        <Caption style={{ color: 'var(--color-text-secondary)' }}>Temperature / 温度 (°C)</Caption>
        <Input type="number" defaultValue={25} />
      </div>
      <div>
        <Caption style={{ color: 'var(--color-text-secondary)' }}>Duration / 时间 (h)</Caption>
        <Input type="number" defaultValue={2} />
      </div>
      <div>
        <Caption style={{ color: 'var(--color-text-secondary)' }}>Solvent / 溶剂</Caption>
        <Select><option>DMF</option><option>DMSO</option></Select>
      </div>
      <div>
        <Caption style={{ color: 'var(--color-text-secondary)' }}>Concentration / 浓度 (mol/L)</Caption>
        <Input type="number" step={0.1} defaultValue={0.5} />
      </div>
    </div>
  </AgCard>

  {/* ④ Completed steps / 已完成步骤 */}
  <Accordion>
    <AccordionItem>
      <AccordionTrigger>
        <Body>Step 1: Preparation / 准备</Body>
        <AgBadge variant="success" style={{ marginLeft: 'var(--space-2)' }}>Completed / 已完成</AgBadge>
      </AccordionTrigger>
      <AccordionContent>
        {/* Recorded params and results / 已记录的参数和结果 */}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------|------|
| Step indicator: completed steps use `var(--color-primary-bg)` filled circle / 步骤指示器：已完成用 `var(--color-primary-bg)` 填充圆圈 | Neutral color primary action / 中性色主操作 |
| Parameter form uses 2-column grid (desktop) / 参数表单用 2 列 grid（桌面端） | Compact density / 紧凑密度 |
| Completed steps collapsed, use `<Accordion>` / 已完成步骤折叠显示，用 `<Accordion>` | decision-tables §3 |
| Status tags: in-progress=warning, completed=success, failed=error / 状态标签：进行中=warning，已完成=success，失败=error | `<AgBadge>` (ag-ext) semantics / 语义 |
| Numeric inputs annotated with units / 数值输入带单位标注 | Chemistry parameter conventions / 化学参数规范 |

## Spacing Rhythm / spacing 节奏

- Page padding / 页面 padding：`var(--space-6)` (24px)
- Gap between major sections / 大区块之间：`var(--space-6)` (24px)
- Form field grid gap / 表单字段 grid gap：`var(--space-4)` (16px)
