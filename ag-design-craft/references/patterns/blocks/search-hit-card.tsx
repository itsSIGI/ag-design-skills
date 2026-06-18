/**
 * Pattern: Search Hit Card / 搜索结果卡片
 * Purpose / 用途: Slot-based card for search results with icon, title, badges, description, meta, actions
 *   基于插槽的搜索结果卡片，支持图标/标题/徽章/描述/元信息/操作区
 * Archetype: data-explorer, list-table
 */

import { AgCard } from '@/components/ag/ag-card';
import { Body, Caption } from '@/components/ag/typography';

export function SearchHitCard({
  icon,
  title,
  badges,
  description,
  meta,
  actions,
  selected = false,
  onClick,
}) {
  return (
    <AgCard
      variant="contained"
      className={`${selected ? 'ring-1 ring-[var(--color-selected)] shadow-[var(--shadow-whisper)]' : ''} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      style={{
        padding: 'var(--space-3)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        minHeight: '118px',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      {/* Top row: icon + title + actions / 顶部: 图标 + 标题 + 操作 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
        {/* Icon slot / 图标插槽 */}
        {icon && (
          <div
            style={{
              width: 'var(--space-9, 36px)',
              height: 'var(--space-9, 36px)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border-subtle)',
              flexShrink: 0,
              fontSize: '16px',
              color: 'var(--color-text-muted)',
            }}
          >
            {icon}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
            {/* Title slot / 标题插槽 */}
            <div style={{ minWidth: 0, flex: 1 }}>
              <Body
                style={{
                  fontWeight: 'var(--weight-medium)',
                  color: 'var(--color-text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </Body>
            </div>
            {/* Actions slot / 操作插槽 — visible on hover via parent CSS / 通过父级 CSS hover 显示 */}
            {actions && (
              <div
                className="search-hit-card__actions"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                  flexShrink: 0,
                  opacity: 0,
                  transition: 'opacity 0.15s ease',
                }}
              >
                {actions}
              </div>
            )}
          </div>
          {/* Badges slot / 徽章插槽 */}
          {badges && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', marginTop: 'var(--space-1)' }}>
              {badges}
            </div>
          )}
        </div>
      </div>

      {/* Description slot / 描述插槽 */}
      {description && (
        <div
          className="text-[length:var(--font-size-small)]"
          style={{
            color: 'var(--color-text-secondary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6,
          }}
        >
          {description}
        </div>
      )}

      {/* Meta slot / 元信息插槽 */}
      {meta && (
        <Caption
          style={{
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          {meta}
        </Caption>
      )}
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽             | Component / 组件   | Token Ref / 引用                              |
 * |-------------------------|--------------------|-----------------------------------------------|
 * | Container / 容器        | AgCard contained   | --space-3 padding, --radius-lg, transition    |
 * | Icon / 图标             | Custom             | 36px, --radius-sm, --color-surface-secondary  |
 * | Title / 标题            | Body               | --weight-medium, truncate                     |
 * | Actions / 操作          | Custom             | hover-reveal, opacity transition 0.15s        |
 * | Badges / 徽章           | AgBadge[]          | flex-wrap                                     |
 * | Description / 描述      | text-small         | --color-text-secondary, 2-line clamp          |
 * | Meta / 元信息           | Caption            | --color-text-muted, flex row                  |
 *
 * Polish notes / 精修要点:
 * - Card hover: box-shadow + translateY(-1px) micro-lift / 卡片 hover 微浮
 * - Selected state: --color-selected ring + --shadow-whisper / 选中态用语义选中色
 * - Icon container: surface-secondary bg + subtle border for depth / 图标容器用次级背景+微妙边框增加层次
 * - Actions hover-reveal: opacity:0 → parent:hover opacity:1 / 操作按钮 hover 渐现
 * - Description line-height 1.6 for readability / 描述行高 1.6 提升可读性
 * - Meta row uses flex+gap for icon+text alignment / 元信息行用 flex 对齐图标和文本
 * - All transitions use 0.15-0.2s ease / 所有过渡 0.15-0.2s ease
 */
