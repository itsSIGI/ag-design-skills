/**
 * Pattern: Feedback Card / 反馈选择卡
 * Purpose / 用途: User feedback selection card with 3 action types
 *   用户反馈选择卡片，3 种操作类型（continue/retry/alternative）各有独立颜色
 * Archetype: ai-chat-interface
 */

import { AgCard } from '@/components/ag/ag-card';
import { Button } from '@/components/ui/button';

export function FeedbackCard({
  prompt,
  options,
  onSelect,
}) {
  const actionConfig = {
    continue: {
      label: 'Continue',    labelZh: '继续',
      color: 'var(--color-status-success-text)',
      icon: '👍',
    },
    retry: {
      label: 'Retry',       labelZh: '重试',
      color: 'var(--color-status-warning-text)',
      icon: '🔄',
    },
    alternative: {
      label: 'Alternative', labelZh: '替代方案',
      color: 'var(--color-status-info-text)',
      icon: '💡',
    },
  };

  return (
    <AgCard
      variant="contained"
      style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}
    >
      <p className="text-[length:var(--font-size-small)]" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
        {prompt}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {options.map((opt) => {
          const cfg = actionConfig[opt.action] || actionConfig.continue;
          return (
            <Button
              key={opt.action}
              variant="ghost"
              size="sm"
              style={{
                color: cfg.color,
                borderColor: cfg.color,
                borderWidth: '1px',
                borderStyle: 'solid',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
              }}
              onClick={() => onSelect(opt.action)}
            >
              <span>{cfg.icon}</span>
              {opt.label || cfg.label}
            </Button>
          );
        })}
      </div>
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽              | Component / 组件    | Token Ref / 引用                     |
 * |--------------------------|---------------------|--------------------------------------|
 * | Container / 容器         | AgCard contained    | --space-4 padding, --radius-md       |
 * | Prompt text / 提示文本   | text-small          | --color-text-secondary               |
 * | Continue btn / 继续按钮  | Button ghost        | --color-status-success-text border   |
 * | Retry btn / 重试按钮     | Button ghost        | --color-status-warning-text border   |
 * | Alternative / 替代按钮   | Button ghost        | --color-status-info-text border      |
 *
 * Notes / 注意:
 * - Each action type has distinct semantic color / 每种操作类型有独立的语义颜色
 * - Buttons are outlined with action-specific border / 按钮使用操作对应色描边
 */
