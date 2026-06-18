/**
 * Pattern: Experiment Step Card / 实验步骤卡片
 * Purpose / 用途: Card display for individual experiment workflow steps
 *   实验流程中单个步骤的卡片展示
 * Archetype: experiment-workflow
 */

import { AgCard } from '@/components/ag/ag-card';
import { AgBadge } from '@/components/ag/ag-badge';
import { Body, Caption } from '@/components/ag/typography';
import { Button } from '@/components/ui/button';

export function ExperimentStepCard({
  stepNumber,
  title,
  status,
  parameters = [],
  notes,
  onEdit,
}) {
  const statusConfig = {
    pending:   { tagVariant: 'default', label: 'Pending',   labelZh: '待执行' },
    active:    { tagVariant: 'info',    label: 'Active',    labelZh: '进行中' },
    completed: { tagVariant: 'success', label: 'Completed', labelZh: '已完成' },
    skipped:   { tagVariant: 'warning', label: 'Skipped',   labelZh: '已跳过' },
    failed:    { tagVariant: 'error',   label: 'Failed',    labelZh: '失败' },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <AgCard variant="contained" style={{ padding: 'var(--space-4)' }}>
      {/* 头部：步骤号 + 标题 + 状态 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span
            className="text-[length:var(--font-size-small)]"
            style={{
              color: 'var(--color-text-muted)',
              fontWeight: 'var(--weight-medium)',
              minWidth: 'var(--space-8)',
            }}
          >
            Step {stepNumber}
          </span>
          <Body
            style={{
              color: 'var(--color-text-primary)',
              fontWeight: 'var(--weight-medium)',
            }}
          >
            {title}
          </Body>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <AgBadge variant={config.tagVariant}>
            {config.label}
          </AgBadge>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              aria-label={`Edit ${title} / 编辑 ${title}`}
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* 参数列表 */}
      {parameters.length > 0 && (
        <div
          style={{
            marginTop: 'var(--space-3)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 'var(--space-3)',
          }}
        >
          {parameters.map((param) => (
            <div key={param.name}>
              <Caption style={{ color: 'var(--color-text-muted)' }}>
                {param.name}
              </Caption>
              <div className="text-[length:var(--font-size-small)]" style={{ color: 'var(--color-text-primary)' }}>
                {param.value}
                {param.unit && (
                  <span style={{ color: 'var(--color-text-secondary)', marginLeft: 'var(--space-1)' }}>
                    {param.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 备注 */}
      {notes && (
        <div
          className="text-[length:var(--font-size-small)]"
          style={{
            marginTop: 'var(--space-3)',
            color: 'var(--color-text-secondary)',
            padding: 'var(--space-2) var(--space-3)',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          {notes}
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
 * | Step number / 步骤号   | text-small         | --color-text-muted, medium weight   |
 * | Title / 标题           | Body               | --color-text-primary, medium        |
 * | Status tag / 状态标签  | AgBadge            | semantic slot binding               |
 * | Edit btn / 编辑按钮    | Button ghost       | sm size                             |
 * | Param label / 参数标签 | Caption            | --color-text-muted                  |
 * | Param value / 参数值   | text-small         | --color-text-primary                |
 * | Unit / 单位            | text-small         | --color-text-secondary              |
 * | Notes / 备注区         | text-small         | --color-surface bg                  |
 *
 * Chemistry notes / 化学科研注意:
 * - Parameter precision must match actual measurement / 参数值精度应与实际测量精度一致
 * - Units should use standard SI symbols / 单位应使用标准 SI 单位符号
 */
