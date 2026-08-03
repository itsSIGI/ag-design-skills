# Archetype: AI Agent Config / Agent 配置页

**Applies to / 适用**：Agent/model configuration page — parameter settings + prompt editing + tool/capability selection / Agent/模型配置页——参数设置 + 提示词编辑 + 工具/能力选择

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Header: Agent name + status + Save/Test            │
│    Agent 名 + 状态 + 保存/测试                         │
├──────────────┬──────────────────────────────────────┤
│ ② Left nav   │ ③ Config content area / 配置内容区    │
│   左侧导航    │                                      │
│   Basic Info │   Prompt editing area (textarea)      │
│   Prompt  ← │   提示词编辑区（textarea）              │
│   Tools      │   + Variable insertion / 变量插入      │
│   Parameters │                                      │
│   Test       │                                      │
└──────────────┴──────────────────────────────────────┘
```

## Pseudocode / 伪代码

```tsx
<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>

  {/* ① Header */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <Button variant="ghost"><i className="mgc_arrow_left_line" aria-label="Back / 返回" /></Button>
      <Heading level={1}>Chemistry Agent</Heading>
      <AgentStatus status="idle" />
    </div>
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      <Button variant="secondary">Test / 测试</Button>
      <Button>Save / 保存</Button>
    </div>
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 'var(--space-6)' }}>

    {/* ② Left nav / 左侧导航 */}
    <nav style={{ display: 'flex', flexDirection: 'column' }}>
      <a>基本信息</a>
      <a className="is-active">提示词</a>
      <a>工具选择</a>
      <a>参数设置</a>
    </nav>

    {/* ③ Config content / 配置内容 */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

      {/* Prompt editing / 提示词编辑 */}
      <AgCard>
        <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>System Prompt / 系统提示词</Heading>
        <Input as="textarea" rows={12} placeholder="Define the Agent's role and behavior... / 定义 Agent 的角色和行为..." style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-small)' }} />
      </AgCard>

      {/* Tool selection / 工具选择 */}
      <AgCard>
        <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>Available Tools / 可用工具</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {tools.map(tool => (
            <div key={tool.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <label><input type="checkbox" checked={tool.enabled} /></label>
              <div>
                <Body>{tool.name}</Body>
                <Caption style={{ color: 'var(--color-text-secondary)', display: 'block' }}>{tool.description}</Caption>
              </div>
            </div>
          ))}
        </div>
      </AgCard>

      {/* Parameter settings / 参数设置 */}
      <AgCard>
        <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>Model Parameters / 模型参数</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ color: 'var(--color-text-secondary)' }}><Caption>Temperature</Caption></label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <input type="range" min={0} max={2} step={0.1} defaultValue={0.7} />
              <Body style={{ width: '40px' }}>0.7</Body>
            </div>
          </div>
          <div>
            <label style={{ color: 'var(--color-text-secondary)' }}><Caption>Max Tokens</Caption></label>
            <Input type="number" defaultValue={4096} />
          </div>
        </div>
      </AgCard>
    </div>
  </div>
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------|------|
| Left nav uses vertical nav layout, consistent with settings-config / 左导航用垂直导航布局，与 settings-config 一致 | Consistency / 一致性 |
| Prompt uses monospace font `var(--font-mono)` / 提示词用等宽字体 `var(--font-mono)` | Code/prompt style / 代码/提示词风格 |
| Tool list uses checkbox for selection / 工具列表用 checkbox 选择 | decision-tables §9 |
| Slider uses `<input type="range">` + numeric display on right / 滑块用 range input + 右侧数值显示 | Parameter visualization / 参数可视化 |
| Agent status uses `<AgentStatus>` (ag-ext) / Agent 状态用 `<AgentStatus>`（ag-ext） | Fixed semantic colors / 固定语义色 |

## Spacing Rhythm / spacing 节奏

- Page padding / 页面 padding：`var(--space-6)` (24px)
- Nav-to-content gap / 导航与内容 gap：`var(--space-6)` (24px)
- Gap between config sections / 配置分区之间：`var(--space-6)` (24px)
- Field gap within section / 分区内字段 gap：`var(--space-4)` (16px)
