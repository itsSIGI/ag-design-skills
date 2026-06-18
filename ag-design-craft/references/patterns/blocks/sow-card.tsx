/**
 * Pattern: SOW Card / 工作范围卡片
 * Purpose / 用途: Scope of Work form card showing field completion status
 *   工作范围（SOW）表单卡片，展示字段填充状态和 Ready/Draft 标记
 * Archetype: ai-chat-interface, create-edit-form
 */

import { AgCard } from '@/components/ag/ag-card';
import { AgBadge } from '@/components/ag/ag-badge';
import { Caption } from '@/components/ag/typography';
import { Button } from '@/components/ui/button';

export function SowCard({
  title = 'Scope of Work',
  fields,
  filledCount,
  totalCount,
  onConfirm,
  onCancel,
}) {
  const isComplete = filledCount === totalCount;

  return (
    <AgCard
      variant="contained"
      style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
    >
      {/* Header / 头部 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-2) var(--space-3)',
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span className="text-[length:var(--font-size-small)] font-[number:var(--weight-medium)]" style={{ color: 'var(--color-text-primary)' }}>
            {title}
          </span>
        </div>
        <AgBadge variant={isComplete ? 'success' : 'warning'}>
          {isComplete ? 'Ready' : 'Draft'}
        </AgBadge>
      </div>

      {/* Fields / 字段列表 */}
      {fields && fields.map((field, i) => (
        <div
          key={field.key}
          style={{
            display: 'flex',
            borderTop: i > 0 ? '1px solid var(--color-border)' : 'none',
          }}
        >
          <Caption
            style={{
              width: '80px',
              flexShrink: 0,
              padding: 'var(--space-1) var(--space-2)',
              color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            {field.label}
          </Caption>
          <span
            className="text-[length:var(--font-size-small)]"
            style={{
              flex: 1,
              padding: 'var(--space-1) var(--space-2)',
              color: field.status === 'filled'
                ? 'var(--color-text-primary)'
                : 'var(--color-status-warning-text)',
              fontStyle: field.status === 'filled' ? 'normal' : 'italic',
              wordBreak: 'break-word',
            }}
          >
            {field.value || (field.status === 'pending' ? 'Pending...' : '—')}
          </span>
        </div>
      ))}

      {/* Actions / 操作区 */}
      {(onConfirm || onCancel) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-3)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel / 取消
            </Button>
          )}
          {onConfirm && (
            <Button
              variant="default"
              size="sm"
              onClick={onConfirm}
              disabled={!isComplete}
              style={{
                backgroundColor: isComplete ? 'var(--color-text-primary)' : 'var(--color-surface)',
                color: isComplete ? 'var(--color-surface-raised, #fff)' : 'var(--color-text-muted)',
              }}
            >
              Confirm / 确认
            </Button>
          )}
        </div>
      )}
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽              | Component / 组件    | Token Ref / 引用                       |
 * |--------------------------|---------------------|-----------------------------------------|
 * | Container / 容器         | AgCard contained    | --radius-md, overflow hidden            |
 * | Header / 头部            | Custom              | --color-surface bg, border-bottom       |
 * | Title / 标题             | text-small          | --weight-medium                         |
 * | Ready/Draft tag / 状态   | AgBadge             | success/warning variant                 |
 * | Field label / 字段标签   | Caption             | --color-text-muted, 80px fixed width    |
 * | Field value / 字段值     | text-small          | filled=primary, pending=warning italic  |
 * | Confirm btn / 确认按钮   | Button default sm   | disabled when incomplete                |
 * | Cancel btn / 取消按钮    | Button ghost sm     | sm size                                 |
 *
 * Notes / 注意:
 * - Field label column is fixed 80px for alignment / 字段标签列固定 80px 对齐
 * - Unfilled fields show warning color + italic / 未填字段显示警告色 + 斜体
 * - Confirm button disabled until all fields filled / 确认按钮在所有字段填充前禁用
 */
