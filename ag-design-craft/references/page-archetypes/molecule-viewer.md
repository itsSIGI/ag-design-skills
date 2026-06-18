# Archetype: Molecule Viewer / 分子结构可视化

**Applies to / 适用**：Molecule structure viewer page — 2D/3D visualization + property panel + toolbar / 分子结构查看页——2D/3D 可视化 + 属性面板 + 工具栏

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Header: Back + molecule name + formula + actions  │
│    返回 + 分子名 + 分子式 + 操作                      │
├──────────────────────────────┬──────────────────────┤
│ ② Visualization area (main)  │ ③ Property panel     │
│    可视化区域（主区）          │    属性面板（侧栏）    │
│                              │                      │
│   3Dmol / RDKit rendering    │ MW: 180.16           │
│   ┌──────────────────┐       │ LogP: 1.23           │
│   │                  │       │ TPSA: 63.6           │
│   │   3D/2D struct   │       │ HBD: 2               │
│   │                  │       │ HBA: 4               │
│   └──────────────────┘       │ ...                  │
│                              │                      │
│   Toolbar: rotate/zoom/2D↔3D │ Tags / Categories    │
│   工具栏：旋转/缩放/2D↔3D    │ 标签/分类             │
├──────────────────────────────┴──────────────────────┤
│ ④ Bottom info (optional: similar compounds / history)│
│    底部信息区（可选：相似化合物 / 历史记录）             │
└─────────────────────────────────────────────────────┘
```

## Pseudocode / 伪代码

```tsx
<div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>

  {/* ① Header */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <Button variant="ghost"><i className="mgc_arrow_left_line" aria-label="Back / 返回" /></Button>
      <Heading level={1}>Aspirin</Heading>
      <Caption style={{ color: 'var(--color-text-secondary)' }}>C₉H₈O₄</Caption>
    </div>
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      <Button variant="secondary">Download / 下载</Button>
      <Button variant="secondary">Share / 分享</Button>
    </div>
  </div>

  {/* ②③ Main area + Sidebar / 主区 + 侧栏 */}
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--space-4)' }}>

    {/* ② Visualization area / 可视化区 */}
    <AgCard style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div ref={viewerRef} style={{ height: '480px', background: 'var(--color-surface)' }}>
        {/* 3Dmol.js / RDKit rendering area / 渲染区 */}
      </div>
      {/* Toolbar / 工具栏 */}
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Button variant="ghost" size="sm">2D</Button>
        <Button variant="ghost" size="sm">3D</Button>
        <Button variant="ghost" size="sm"><i className="mgc_zoom_in_line" aria-label="Zoom in / 放大" /></Button>
        <Button variant="ghost" size="sm"><i className="mgc_refresh_1_line" aria-label="Reset / 重置" /></Button>
      </div>
    </AgCard>

    {/* ③ Property panel / 属性面板 */}
    <AgCard>
      <Heading level={2} style={{ marginBottom: 'var(--space-4)' }}>Molecular Properties / 分子属性</Heading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Caption style={{ color: 'var(--color-text-secondary)' }}>Molecular Weight / 分子量 (MW)</Caption>
          <Body>180.16</Body>
        </div>
        {/* More property rows / 更多属性行 */}
      </div>
    </AgCard>
  </div>
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------|------|
| Visualization area fixed height (recommended 400-520px) / 可视化区固定高度（推荐 400-520px） | design-rules: chart fixed height / 图表固定高度 |
| Visualization area background `var(--color-surface)` / 可视化区背景 `var(--color-surface)` | Distinguish canvas from page / 区分画布与页面 |
| Property panel sidebar fixed width `320px` / 属性面板侧栏固定宽度 `320px` | Don't squeeze main area / 不挤压主区 |
| Toolbar buttons use `<Button variant="ghost" size="sm">` / 工具栏按钮用 `<Button variant="ghost" size="sm">` | De-emphasis / 降权 |
| Property key-value: key uses caption + secondary, value uses body / 属性键值对：键用 caption + secondary，值用 body | Hierarchy / 层级 |
| Open-source components (3Dmol/RDKit) container wrapped in `<AgCard>` / 开源组件（3Dmol/RDKit）容器用 `<AgCard>` 包装 | open-source-guide Pattern A / 模式 A |

## Open-source Components / 开源组件

- **3Dmol.js**: 3D rendering, container uses `<AgCard>` / 3D 渲染，容器用 `<AgCard>`
- **RDKit.js**: 2D rendering / 2D 渲染
- **Ketcher**: Structure editing (if editing is needed) / 结构编辑（如需编辑功能）
