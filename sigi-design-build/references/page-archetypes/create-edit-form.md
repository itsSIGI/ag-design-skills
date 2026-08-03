# Archetype: Create / Edit Form / 创建编辑表单页

**Applies to / 适用**：Multi-section form page for creating/editing entities (new compound, edit experiment, configure Agent, etc.) / 创建/编辑实体的多分区表单页（新建化合物、编辑实验、配置 Agent 等）

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Page title + Back/Cancel / 页面标题 + 返回/取消     │
├─────────────────────────────────────────────────────┤
│ ② Form section A (<AgCard>) / 表单分区 A（<AgCard>）  │
│    Section title + form fields / 分区标题 + 表单字段   │
├─────────────────────────────────────────────────────┤
│ ③ Form section B (<AgCard>) / 表单分区 B（<AgCard>）  │
│    Section title + form fields / 分区标题 + 表单字段   │
├─────────────────────────────────────────────────────┤
│ ④ Form section C ... / 表单分区 C ...                │
├─────────────────────────────────────────────────────┤
│ ⑤ Bottom action bar (fixed/sticky) / 底部操作栏       │
│    Cancel(ghost) + Save(primary)                     │
│    取消(ghost) + 保存(primary)                        │
└─────────────────────────────────────────────────────┘
```

## Pseudocode / 伪代码

```tsx
<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '800px' }}>

  {/* ① Title / 标题 */}
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
    <Button variant="ghost">
      <i className="mgc_arrow_left_line" aria-label="Back / 返回" />
    </Button>
    <Heading level={1}>新建实验</Heading>
  </div>

  {/* ② Section A / 分区 A */}
  <AgCard>
    <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>基本信息</Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div>
        <label style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}><Caption>名称</Caption></label>
        <Input />
      </div>
      <div>
        <label style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}><Caption>描述</Caption></label>
        <Input as="textarea" rows={3} />
      </div>
    </div>
  </AgCard>

  {/* ③ Section B / 分区 B */}
  <AgCard>
    <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>参数配置</Heading>
    {/* Form fields / 表单字段 */}
  </AgCard>

  {/* ⑤ Bottom action bar / 底部操作栏 */}
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border-subtle)' }}>
    <Button variant="ghost">取消</Button>
    <Button>保存</Button>
  </div>
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------|------|
| Form max-width `800px`, centered or left-aligned / 表单最大宽度 `800px`，居中或左对齐 | Long lines are hard to read / 长行读起来累 |
| Each section in one `<AgCard>` / 每个分区一个 `<AgCard>` | Container rule / 容器规则 |
| Section title uses `<Heading level={2}>` / 分区标题用 `<Heading level={2}>` | Hierarchy consistency / 层级一致 |
| Field labels use `<Caption>` + `color: var(--color-text-secondary)` / 字段标签用 `<Caption>` + `color: var(--color-text-secondary)` | De-emphasis / 层级降权 |
| Action bar: Cancel uses ghost, Save uses primary / 操作栏：取消用 ghost，保存用 primary | Primary-secondary distinction / 主次分明 |
| Density-first — field gap: `gap: var(--space-4)` / 密度优先——字段间 `gap: var(--space-4)` | design-rules HIGH |

## Spacing Rhythm / spacing 节奏

- Page padding / 页面 padding：`var(--space-6)` (24px)
- Gap between sections / 分区之间 gap：`var(--space-6)` (24px)
- Field gap within section / 分区内字段 gap：`var(--space-4)` (16px)
- Label-to-input spacing / 标签与输入框间距：`var(--space-1)` (4px)

## Common Mistakes / 别犯的错

- ❌ Form stretches full width (beyond 800px is hard to read) / 表单撑满全宽（超过 800px 很难读）
- ❌ Two equal-weight buttons (must have primary-secondary distinction) / 两个等权按钮（必须有主次之分）
- ❌ Fields missing labels / 字段缺 label
- ❌ Self-made input without `<Input>` / 自拼 input 不用 `<Input>`
