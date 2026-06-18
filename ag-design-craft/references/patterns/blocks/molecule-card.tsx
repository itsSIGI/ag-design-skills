/**
 * Pattern: Molecule Card / 分子卡片
 * Purpose / 用途: Compound/molecule card with 2D structure image and key properties
 *   化合物/分子的卡片展示，含 2D 结构图 + 关键属性
 * Archetype: data-explorer, molecule-viewer, list-table
 */

import { AgCard, AgCardTitle } from '@/components/ag/ag-card';
import { AgBadge } from '@/components/ag/ag-badge';
import { Caption } from '@/components/ag/typography';

export function MoleculeCard({
  name,
  formula,
  molecularWeight,
  smiles,
  structureImageUrl,
  tags = [],
  onClick,
}) {
  return (
    <AgCard
      variant="contained"
      className={onClick ? 'cursor-pointer' : ''}
      onClick={onClick}
      style={{ padding: 'var(--space-4)' }}
    >
      {/* 2D 结构图区域 */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-3)',
          overflow: 'hidden',
        }}
      >
        {structureImageUrl ? (
          <img
            src={structureImageUrl}
            alt={`${name} 分子结构`}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        ) : (
          <Caption style={{ color: 'var(--color-text-muted)' }}>
            No structure image / 暂无结构图
          </Caption>
        )}
      </div>

      {/* 分子信息 */}
      <AgCardTitle style={{ fontSize: 'var(--font-size-body)' }}>
        {name}
      </AgCardTitle>

      {formula && (
        <div
          className="text-[length:var(--font-size-small)]"
          style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}
        >
          {formula}
        </div>
      )}

      {/* 关键属性 */}
      <div
        style={{
          marginTop: 'var(--space-3)',
          display: 'flex',
          gap: 'var(--space-4)',
        }}
      >
        {molecularWeight && (
          <div>
            <Caption style={{ color: 'var(--color-text-muted)' }}>
              MW
            </Caption>
            <div className="text-[length:var(--font-size-small)]" style={{ color: 'var(--color-text-primary)' }}>
              {molecularWeight}
            </div>
          </div>
        )}
        {smiles && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <Caption style={{ color: 'var(--color-text-muted)' }}>
              SMILES
            </Caption>
            <Caption
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-mono)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            >
              {smiles}
            </Caption>
          </div>
        )}
      </div>

      {/* 标签 */}
      {tags.length > 0 && (
        <div
          style={{
            marginTop: 'var(--space-3)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-1)',
          }}
        >
          {tags.map((tag) => (
            <AgBadge key={tag.label} variant={tag.variant || 'default'}>
              {tag.label}
            </AgBadge>
          ))}
        </div>
      )}
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽            | Component / 组件   | Token Ref / 引用                    |
 * |------------------------|--------------------|-------------------------------------|
 * | Container / 容器       | AgCard contained   | --space-4 padding                   |
 * | Structure / 结构图区   | Custom             | --color-surface bg                  |
 * | Name / 名称            | AgCardTitle        | --font-size-body                    |
 * | Formula / 分子式       | text-small         | --color-text-secondary              |
 * | Property value / 属性  | text-small         | --color-text-primary                |
 * | Property label / 标签  | Caption            | --color-text-muted                  |
 * | SMILES                 | Caption            | --font-mono                         |
 * | Tags / 标签            | AgBadge            | decorative color for categories     |
 *
 * Chemistry notes / 化学科研注意:
 * - Molecular weight precision must match data source / 分子量显示精度应与数据源一致
 * - SMILES uses ellipsis when too long, no wrapping / SMILES 过长时用 ellipsis，不换行
 * - Structure distortion should be flagged (Design Constitution §2.6)
 *   结构图失真时应标注警告（设计宪法 §2.6）
 */
