# Archetype: List Table / 列表页

**Applies to / 适用**：List/Table pages — search/filter + Table + pagination, the most common B-end page type / 列表/表格页——搜索/筛选 + Table + 分页，最常见的 B 端页型

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Page title + action buttons / 页面标题 + 操作按钮   │
├─────────────────────────────────────────────────────┤
│ ② Optional: Tabs / 可选：Tabs 分区切换               │
├─────────────────────────────────────────────────────┤
│ ③ Search / Filter row / 搜索/筛选行                  │
│    SearchBar + filter controls / 筛选控件            │
├─────────────────────────────────────────────────────┤
│ ④ Toolbar (bulk actions, export; shown on selection) │
│    工具栏（批量操作、导出等，选中行时出现）              │
├─────────────────────────────────────────────────────┤
│ ⑤ Table body / Table 本体                            │
│    Text cols left-aligned | Numeric cols right       │
│    文字列左对齐 | 数值列右对齐                          │
│    5-10 rows mock data / 5-10 行 mock 数据            │
├─────────────────────────────────────────────────────┤
│ ⑥ Pagination / 分页                                  │
└─────────────────────────────────────────────────────┘
```

## Pseudocode / 伪代码

```tsx
<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>

  {/* ① Title + Actions / 标题 + 操作 */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Heading level={1}>列表标题</Heading>
    <Button>
      <i className="mgc_add_line" /> 新建
    </Button>
  </div>

  {/* ② Tabs (optional) / Tabs（可选） */}
  <Tabs>
    <TabsTrigger className="is-active">全部</TabsTrigger>
    <TabsTrigger>进行中</TabsTrigger>
    <TabsTrigger>已完成</TabsTrigger>
  </Tabs>

  {/* ③ Search / Filter / 搜索/筛选 */}
  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
    <SearchBar>
      <Input type="text" placeholder="Search... / 搜索..." />
    </SearchBar>
    {/* Filter controls / 筛选控件 */}
  </div>

  {/* ⑤ Table */}
  <AgCard>
    <Table>
      <thead>
        <tr>
          <th style={{ textAlign: 'left' }}>名称</th>
          <th style={{ textAlign: 'left' }}>状态</th>
          <th style={{ textAlign: 'right' }}>数值</th>
          <th style={{ textAlign: 'right' }}>操作</th>
        </tr>
      </thead>
      <tbody>{/* 5-10 rows mock / 5-10 行 mock */}</tbody>
    </Table>
  </AgCard>

  {/* ⑥ Pagination / 分页 */}
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------|------|
| Text cols left-aligned, numeric cols right-aligned / 文字列左对齐，数值列右对齐 | design-rules CRITICAL |
| Must have pagination + 5-10 real mock rows / 必须有分页 + 5-10 行真实 mock | design-rules HIGH |
| Empty state uses empty-state component (icon + text), no empty table / 空态用空态组件（图标+文案），不要空表格 | harden #1 |
| Loading uses spinner, no self-made skeleton / 加载用 spinner，不自拼骨架 | decision-tables §5 |
| Status column uses `<AgBadge variant="{success/error/warning}">` / 状态列用 `<AgBadge variant="{success/error/warning}">`（ag-ext） | decision-tables §3 |
| Search uses `<SearchBar>` / 搜索用 `<SearchBar>` | decision-tables §2 |

## Spacing Rhythm / spacing 节奏

- Page padding / 页面 padding：`var(--space-6)` (24px)
- Gap between sections / 区块之间 gap：`var(--space-4)` (16px)
- Search/filter row inner gap / 搜索/筛选行内 gap：`var(--space-3)` (12px)

## Common Mistakes / 别犯的错

- ❌ Self-made `<table>` without `<Table>` / 自拼 `<table>` 不用 `<Table>`
- ❌ Numeric column left-aligned / 数字列左对齐
- ❌ Missing pagination / 缺分页
- ❌ Empty state shows blank table / 空态显示空白表格
