# Archetype: Data Explorer / 数据库浏览器

**Applies to / 适用**: Data browsing/exploration page — advanced filtering + search + batch operations + table + split-view detail
数据浏览/探索页——高级筛选 + 搜索 + 批量操作 + 表格 + split-view 详情

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Header: title + count + import/export             │
│   头部：标题 + 数据量统计 + 导入/导出                 │
├─────────────────────────────────────────────────────┤
│ ② Search + advanced filters row                     │
│   搜索 + 高级筛选行                                  │
│    <Input> search + filter chips + advanced filter btn   │
├─────────────────────────────────────────────────────┤
│ ③ Toolbar (appears on selection)                     │
│   工具栏（选中行时出现）                               │
│    Selected N | Batch delete | Export | Tag           │
├──────────────────────────────┬──────────────────────┤
│ ④ Data table / card list     │ ⑤ Detail panel       │
│   数据表格 / 卡片列表        │   详情面板（可选）     │
│   Using search-hit-card      │   Entity details      │
│   in card-list mode          │                      │
├──────────────────────────────┴──────────────────────┤
│ ⑥ Pagination / 分页                                 │
└─────────────────────────────────────────────────────┘
```

## Recommended Patterns / 推荐 Pattern

| Pattern | Usage / 用途 |
|---------|-------------|
| `search-bar` | Top search with auto-complete / 顶部搜索栏 |
| `search-hit-card` | Slot-based result cards in split-view / 搜索结果卡片 |
| `status-tag` | Status and category tags / 状态和分类标签 |
| `molecule-card` | Molecule result cards (chemistry) / 分子结果卡（化学） |
| `empty-state` | No results state / 无结果状态 |

## Pseudocode / 伪代码

```tsx
<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>

  {/* ① Header / 头部 */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <Heading level={1}>Compound Database / 化合物数据库</Heading>
      <Caption style={{ color: 'var(--color-text-muted)' }}>12,345 total</Caption>
    </div>
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      <Button variant="secondary">Import</Button>
      <Button><i className="mgc_add_line" /> Create</Button>
    </div>
  </div>

  {/* ② Search + filters / 搜索 + 筛选 */}
  <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
    <SearchBar placeholder="Search name, SMILES, CAS..." style={{ width: '320px' }} />
    <Select style={{ width: '140px' }}><option>All types</option></Select>
    <Select style={{ width: '140px' }}><option>All sources</option></Select>
    <Button variant="ghost" size="sm">
      <i className="mgc_filter_line" /> Advanced filters
    </Button>
  </div>

  {/* ③ Toolbar on selection / 选中时工具栏 */}
  {selectedCount > 0 && (
    <AgCard variant="inset" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
      <Body>{selectedCount} selected</Body>
      <Button variant="ghost" size="sm">Export</Button>
      <Button variant="ghost" size="sm">Add tags</Button>
      <Button variant="ghost" size="sm" style={{ color: 'var(--color-danger-bg)' }}>Delete</Button>
    </AgCard>
  )}

  {/* ④+⑤ Split view: list + detail / 分栏：列表 + 详情 */}
  <div style={{ display: 'flex', gap: 'var(--space-4)', flex: 1 }}>
    {/* Card list using search-hit-card / 卡片列表 */}
    <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', overflowY: 'auto' }}>
      <SearchHitCard
        icon={<MoleculeIcon />}
        title="Aspirin"
        badges={[<StatusTag status="success" label="Verified" />]}
        description="Acetylsalicylic acid, MW 180.16"
        meta="Updated 2 hours ago"
        selected={true}
      />
      {/* ... more cards */}
    </div>

    {/* Detail panel / 详情面板 */}
    <div style={{ width: '50%', overflowY: 'auto' }}>
      <AgCard style={{ padding: 'var(--space-6)' }}>
        {/* Entity detail content */}
      </AgCard>
    </div>
  </div>

  {/* ⑥ Pagination / 分页 */}
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------------|-------------|
| Search bar `320px` wide, supports multiple search modes / 搜索框 320px，支持多种搜索方式 | chemistry search specifics |
| Batch toolbar appears on selection, uses `<AgCard variant="inset">` / 批量工具栏选中时出现 | visual demotion |
| Split-view: 50/50 list + detail, using `search-hit-card` / 分栏 50/50，用搜索结果卡 | real project pattern |
| Selected card shows emphasized border + shadow / 选中卡片强调边框 + 阴影 | search-hit-card pattern |
| Numeric columns right-aligned / 数值列右对齐 | design-rules |
| Pagination required / 分页必须有 | design-rules HIGH |

## Difference from list-table / 与 list-table 原型的区别

data-explorer adds over list-table / data-explorer 比 list-table 多出:
- Advanced filters (multi-condition) / 高级筛选（多条件组合）
- Batch operations toolbar / 批量操作工具栏
- More complex search (SMILES, CAS, etc.) / 更复杂的搜索
- Data count display / 数据量统计
- Split-view detail panel / 分栏详情面板
