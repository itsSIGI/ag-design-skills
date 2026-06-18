/**
 * Pattern: Project Card / 项目卡片
 * Purpose / 用途: Project overview card with status, progress, source tag, and actions
 *   项目概览卡片，含状态指示、进度条、来源标签和操作菜单
 * Archetype: dashboard, list-table
 */

import { AgCard } from '@/components/ag/ag-card';
import { AgBadge } from '@/components/ag/ag-badge';
import { Body, Caption } from '@/components/ag/typography';
import { Button } from '@/components/ui/button';

export function ProjectCard({
  name,
  status,
  source,
  progress,
  createdAt,
  creatorLabel,
  isPublic = false,
  pinned = false,
  selected = false,
  onClick,
  onRename,
  onDelete,
}) {
  const statusConfig = {
    draft:     { label: 'Draft',     labelZh: '草稿',   tagVariant: 'default',  barColor: 'var(--color-text-muted)' },
    planning:  { label: 'Planning',  labelZh: '规划中', tagVariant: 'default',  barColor: 'var(--color-text-muted)' },
    running:   { label: 'Running',   labelZh: '运行中', tagVariant: 'info',     barColor: 'var(--color-status-info-text)' },
    completed: { label: 'Completed', labelZh: '已完成', tagVariant: 'success',  barColor: 'var(--color-status-success-text)' },
    delivered: { label: 'Delivered', labelZh: '已交付', tagVariant: 'success',  barColor: 'var(--color-status-success-text)' },
    cancelled: { label: 'Cancelled', labelZh: '已取消', tagVariant: 'error',    barColor: 'var(--color-status-error-text)' },
    archived:  { label: 'Archived',  labelZh: '已归档', tagVariant: 'warning',  barColor: 'var(--color-text-muted)' },
  };

  const config = statusConfig[status] || statusConfig.draft;
  const creatorInitial = (creatorLabel || '?').charAt(0).toUpperCase();

  return (
    <AgCard
      variant="contained"
      className={`${selected ? 'ring-1 ring-[var(--color-selected)] shadow-[var(--shadow-whisper)]' : ''} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      style={{
        padding: 'var(--space-3)',
        borderRadius: 'var(--radius-md)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
      }}
    >
      {/* Header row / 头部行 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            {pinned && (
              <i className="mgc_pin_line" style={{ fontSize: '14px', color: 'var(--color-status-warning-text)' }} aria-label="Pinned" />
            )}
            <Body
              style={{
                fontWeight: 'var(--weight-medium)',
                color: 'var(--color-text-primary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </Body>
          </div>
          {/* Source + visibility tags / 来源 + 可见性标签 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginTop: 'var(--space-1)' }}>
            {source && (
              <AgBadge variant="default">{source}</AgBadge>
            )}
            <i
              className={isPublic ? 'mgc_earth_line' : 'mgc_lock_line'}
              style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
              aria-label={isPublic ? 'Public' : 'Private'}
            />
          </div>
        </div>
        {/* Status tag / 状态标签 */}
        <AgBadge variant={config.tagVariant}>
          {config.label}
        </AgBadge>
      </div>

      {/* Progress bar / 进度条 */}
      {progress !== undefined && (
        <div style={{ marginTop: 'var(--space-3)' }}>
          <div
            className="h-1 w-full rounded-full bg-[var(--color-surface-secondary)]"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="h-full rounded-full transition-[width] duration-300 ease-out"
              style={{
                width: `${Math.min(progress, 100)}%`,
                backgroundColor: config.barColor,
              }}
            />
          </div>
        </div>
      )}

      {/* Footer / 底部 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'var(--space-3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {/* Creator avatar / 创建者头像 */}
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 'var(--weight-medium)',
              color: 'var(--color-text-muted)',
            }}
          >
            {creatorInitial}
          </div>
          <Caption style={{ color: 'var(--color-text-muted)' }}>
            {createdAt}
          </Caption>
        </div>
        {/* Action buttons — visible on hover via parent CSS / 操作按钮——通过父级 CSS hover 显示 */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-1)',
            opacity: 0,
            transition: 'opacity 0.15s ease',
          }}
          className="project-card__actions"
        >
          {onRename && (
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onRename(); }} aria-label="Rename">
              <i className="mgc_edit_line" style={{ fontSize: '14px' }} />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              aria-label="Delete"
              style={{ color: 'var(--color-status-error-text)' }}
            >
              <i className="mgc_delete_2_line" style={{ fontSize: '14px' }} />
            </Button>
          )}
        </div>
      </div>
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽                | Component / 组件    | Token Ref / 引用                        |
 * |----------------------------|---------------------|-----------------------------------------|
 * | Container / 容器           | AgCard contained    | --space-3 padding, --radius-md          |
 * | Project name / 项目名      | Body                | --weight-medium, truncate               |
 * | Pin icon / 置顶图标        | MingCute            | --color-status-warning-text, 14px       |
 * | Visibility / 可见性        | MingCute            | --color-text-muted, 12px                |
 * | Source tag / 来源标签       | AgBadge             | default variant                         |
 * | Status tag / 状态标签       | AgBadge             | semantic slot binding                   |
 * | Progress bar / 进度条       | Tailwind bar        | bar color = status, width transition    |
 * | Creator avatar / 创建者     | Custom              | 20px, --radius-full, --color-surface-secondary |
 * | Date / 日期                 | Caption             | --color-text-muted                      |
 * | Action btns / 操作按钮      | Button ghost icon   | hover-reveal, 14px icons                |
 *
 * Polish notes / 精修要点:
 * - Card hover: box-shadow + translateY(-1px) micro-lift / 卡片 hover 微浮
 * - Progress bar fill has width transition for animation / 进度条有填充动画
 * - Action buttons opacity:0 → parent:hover opacity:1 / 操作按钮 hover 时渐现
 * - All icons use MingCute line style, no emoji / 全部用 MingCute line 图标，无 emoji
 * - Avatar uses surface-secondary for subtle bg differentiation / 头像用 surface-secondary 做微妙背景层次
 */
