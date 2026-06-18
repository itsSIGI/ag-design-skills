# Archetype: Settings / Config / 设置配置页

**Applies to / 适用**：Sectioned settings page (system settings, user preferences, feature config, etc.) / 分区设置页（系统设置、用户偏好、功能配置等）

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Page title / 页面标题                               │
├──────────────┬──────────────────────────────────────┤
│ ② Left nav   │ ③ Right content area / 右侧内容区     │
│   左侧导航    │   Section title / 分区标题             │
│   Section 1  │   Setting items + controls / 设置项    │
│   Section 2 ←│   ...                                 │
│   Section 3  │                                      │
│              │   Save button (if needed)             │
│              │   保存按钮（如需）                      │
└──────────────┴──────────────────────────────────────┘
```

## Pseudocode / 伪代码

```tsx
<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>

  {/* ① Title / 标题 */}
  <Heading level={1}>设置</Heading>

  <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--space-6)' }}>

    {/* ② Left nav / 左侧导航 */}
    <nav>
      <a className="nav-item is-active">通用设置</a>
      <a className="nav-item">通知偏好</a>
      <a className="nav-item">团队管理</a>
      <a className="nav-item">API 密钥</a>
    </nav>

    {/* ③ Right content / 右侧内容 */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

      {/* Settings section / 设置分区 */}
      <AgCard>
        <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>通用设置</Heading>

        {/* Setting row: label + control / 设置行：label + 控件 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div>
            <Body>启用通知</Body>
            <Caption style={{ color: 'var(--color-text-secondary)', display: 'block' }}>接收系统通知和提醒</Caption>
          </div>
          <Switch checked />
        </div>

        {/* More setting rows / 更多设置行 */}
      </AgCard>
    </div>
  </div>
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------|------|
| Left nav uses vertical navigation / 左侧导航用垂直导航 | components-v2.md |
| Each section in one `<AgCard>` in right content / 右侧内容每个分区一个 `<AgCard>` | Container rule / 容器规则 |
| Setting row: text on left, control on right, justify-between / 设置行：左文字右控件，中间 justify-between | Standard settings page pattern / 标准设置页模式 |
| Row separator uses `border-bottom: var(--color-border-subtle)` / 行分隔用 `border-bottom: var(--color-border-subtle)` | Tokenized / token 化 |
| Switch uses `<Switch>` (instant effect), Checkbox uses `<Checkbox>` (on submit) / Switch 用 `<Switch>`（立即生效），Checkbox 用 `<Checkbox>`（提交时生效） | decision-tables §2 |
| Left nav width `220px`, content area adaptive / 左导航宽度 `220px`，内容区自适应 | Compact / 紧凑 |

## Spacing Rhythm / spacing 节奏

- Page padding / 页面 padding：`var(--space-6)` (24px)
- Nav-to-content gap / 导航与内容 gap：`var(--space-6)` (24px)
- Gap between sections / 分区之间 gap：`var(--space-6)` (24px)
- Setting row padding / 设置行 padding：`var(--space-3) 0` (12px)
