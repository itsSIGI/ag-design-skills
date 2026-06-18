/**
 * Pattern: Service Card / 服务卡片
 * Purpose / 用途: Marketplace service/product card with gradient header, icon, pricing, and stats
 *   市场服务/产品卡片，含渐变头部、图标、定价信息和统计数据
 * Archetype: data-explorer, list-table
 */

import { AgCard } from '@/components/ag/ag-card';
import { AgBadge } from '@/components/ag/ag-badge';
import { Body, Caption } from '@/components/ag/typography';

export function ServiceCard({
  name,
  description,
  category,
  status,
  pricingLabel,
  stats,
  colorIndex = 0,
  onClick,
}) {
  const statusConfig = {
    draft:     { label: 'Draft',     labelZh: '草稿',   tagVariant: 'default' },
    published: { label: 'Published', labelZh: '已发布', tagVariant: 'success' },
    archived:  { label: 'Archived',  labelZh: '已归档', tagVariant: 'warning' },
  };

  const config = statusConfig[status] || statusConfig.draft;

  const gradientColors = [
    { from: 'rgba(59, 130, 246, 0.1)', to: 'transparent' },
    { from: 'rgba(139, 92, 246, 0.1)', to: 'transparent' },
    { from: 'rgba(16, 185, 129, 0.1)', to: 'transparent' },
    { from: 'rgba(245, 158, 11, 0.1)', to: 'transparent' },
    { from: 'rgba(168, 85, 247, 0.1)', to: 'transparent' },
    { from: 'rgba(20, 184, 166, 0.1)', to: 'transparent' },
  ];

  const gradient = gradientColors[colorIndex % gradientColors.length];

  return (
    <AgCard
      variant="contained"
      className={onClick ? 'cursor-pointer' : ''}
      onClick={onClick}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}
    >
      {/* Gradient header / 渐变头部 */}
      <div
        style={{
          padding: 'var(--space-4)',
          background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <Body
              style={{
                fontWeight: 'var(--weight-medium)',
                color: 'var(--color-text-primary)',
                display: 'block',
              }}
            >
              {name}
            </Body>
            {category && (
              <AgBadge variant="default" style={{ marginTop: 'var(--space-1)' }}>
                {category}
              </AgBadge>
            )}
          </div>
          <AgBadge variant={config.tagVariant}>
            {config.label}
          </AgBadge>
        </div>
      </div>

      {/* Body / 主体 */}
      <div style={{ padding: 'var(--space-3) var(--space-4)' }}>
        {description && (
          <p
            className="text-[length:var(--font-size-small)]"
            style={{
              color: 'var(--color-text-secondary)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </p>
        )}

        {/* Pricing / 定价 */}
        {pricingLabel && (
          <div
            className="text-[length:var(--font-size-small)]"
            style={{
              marginTop: 'var(--space-3)',
              fontWeight: 'var(--weight-medium)',
              color: 'var(--color-text-primary)',
            }}
          >
            {pricingLabel}
          </div>
        )}

        {/* Stats row / 统计行 */}
        {stats && (
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-3)',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <Caption style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </Caption>
                <div className="text-[length:var(--font-size-small)]" style={{ color: 'var(--color-text-primary)', fontWeight: 'var(--weight-medium)' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽                | Component / 组件   | Token Ref / 引用                       |
 * |----------------------------|--------------------|-----------------------------------------|
 * | Container / 容器           | AgCard contained   | --radius-lg, overflow hidden            |
 * | Gradient header / 渐变头部 | Custom             | 135deg gradient, low opacity tint       |
 * | Name / 名称                | Body               | --weight-medium                         |
 * | Category / 分类            | AgBadge            | default variant                         |
 * | Status / 状态              | AgBadge            | semantic binding                        |
 * | Description / 描述         | text-small         | --color-text-secondary, 2-line clamp    |
 * | Pricing / 定价             | text-small         | --weight-medium                         |
 * | Stat label / 统计标签      | Caption            | --color-text-muted                      |
 * | Stat value / 统计值        | text-small         | --weight-medium                         |
 *
 * Notes / 注意:
 * - Gradient color cycles through palette by index / 渐变颜色按索引循环调色板
 * - Gradient uses low-opacity tints (0.1) for subtlety / 渐变使用低透明度（0.1）保持克制
 * - Stats row separated by top border / 统计行用顶部边框分隔
 */
