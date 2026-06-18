/**
 * Pattern: Computation Task Row / 计算任务行
 * Purpose / 用途: Single row display in computation task list
 *   计算任务列表中的单行展示
 * Archetype: computation-dashboard, list-table
 */

import { AgBadge } from '@/components/ag/ag-badge';
import { Body, Caption } from '@/components/ag/typography';
import { Button } from '@/components/ui/button';

export function ComputationTaskRow({
  taskId,
  taskName,
  taskType,
  status,
  progress,
  submittedAt,
  duration,
  resource,
  onView,
  onCancel,
}) {
  const statusConfig = {
    queued:    { tagVariant: 'default', label: 'Queued',    labelZh: '排队中' },
    running:   { tagVariant: 'info',    label: 'Running',   labelZh: '运行中' },
    completed: { tagVariant: 'success', label: 'Completed', labelZh: '已完成' },
    failed:    { tagVariant: 'error',   label: 'Failed',    labelZh: '失败' },
    cancelled: { tagVariant: 'warning', label: 'Cancelled', labelZh: '已取消' },
  };

  const config = statusConfig[status] || statusConfig.queued;

  return (
    <tr className="hover:bg-[var(--color-surface-hover)] transition-colors">
      {/* 任务 ID */}
      <td style={{ padding: 'var(--space-2) var(--space-3)' }}>
        <span
          className="text-[length:var(--font-size-small)] font-[family-name:var(--font-mono)]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {taskId}
        </span>
      </td>

      {/* 任务名 */}
      <td style={{ padding: 'var(--space-2) var(--space-3)' }}>
        <div>
          <Body style={{ color: 'var(--color-text-primary)', fontWeight: 'var(--weight-medium)' }}>
            {taskName}
          </Body>
          {taskType && (
            <AgBadge variant="default" style={{ marginLeft: 'var(--space-2)' }}>
              {taskType}
            </AgBadge>
          )}
        </div>
      </td>

      {/* 状态 */}
      <td style={{ padding: 'var(--space-2) var(--space-3)' }}>
        <AgBadge variant={config.tagVariant}>
          {config.label}
        </AgBadge>
      </td>

      {/* 进度条（仅 running 态） */}
      <td style={{ padding: 'var(--space-2) var(--space-3)', minWidth: '120px' }}>
        {status === 'running' && progress !== undefined ? (
          <div>
            <div
              className="h-1 w-full rounded-full bg-[var(--color-surface-secondary)]"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="h-full rounded-full bg-[var(--color-text-primary)] transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <Caption style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
              {progress}%
            </Caption>
          </div>
        ) : (
          <Caption style={{ color: 'var(--color-text-muted)' }}>—</Caption>
        )}
      </td>

      {/* 提交时间 */}
      <td style={{ padding: 'var(--space-2) var(--space-3)' }}>
        <span className="text-[length:var(--font-size-small)]" style={{ color: 'var(--color-text-secondary)' }}>
          {submittedAt}
        </span>
      </td>

      {/* 耗时 */}
      <td style={{ padding: 'var(--space-2) var(--space-3)' }}>
        <span className="text-[length:var(--font-size-small)]" style={{ color: 'var(--color-text-secondary)' }}>
          {duration || '—'}
        </span>
      </td>

      {/* 资源 */}
      <td style={{ padding: 'var(--space-2) var(--space-3)' }}>
        <Caption style={{ color: 'var(--color-text-muted)' }}>
          {resource || '—'}
        </Caption>
      </td>

      {/* 操作 */}
      <td style={{ padding: 'var(--space-2) var(--space-3)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="ghost" size="sm" onClick={onView}>
            View
          </Button>
          {(status === 'queued' || status === 'running') && onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              style={{ color: 'var(--color-status-error-text)' }}
            >
              Cancel
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽           | Component / 组件 | Token Ref / 引用                     |
 * |-----------------------|------------------|--------------------------------------|
 * | Row / 行              | tr               | hover --color-surface-hover          |
 * | Task ID / 任务 ID     | text-small       | --font-mono, --color-text-muted      |
 * | Task name / 任务名    | Body             | medium weight                        |
 * | Type tag / 类型标签   | AgBadge          | default variant                      |
 * | Status tag / 状态标签 | AgBadge          | semantic slot binding                |
 * | Progress / 进度条     | Tailwind bar     | neutral fill color                   |
 * | Time/Resource / 时间  | text-small       | --color-text-secondary               |
 * | View btn / 查看按钮   | Button ghost     | sm size                              |
 * | Cancel btn / 取消按钮 | Button ghost     | --color-status-error-text            |
 *
 * Progress fill uses neutral accent, not brand blue / 进度条填充色使用中性选中色，不用品牌蓝
 */
