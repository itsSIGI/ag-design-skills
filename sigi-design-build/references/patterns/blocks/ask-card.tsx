/**
 * Pattern: Ask Card / 人工干预卡片
 * Purpose / 用途: Human intervention request card with 3 urgency levels
 *   需要人工处理的请求卡片，3 级紧急度（high/medium/low）彩色描边
 * Archetype: ai-chat-interface
 */

import { AgCard } from '@/components/ag/ag-card';
import { AgBadge } from '@/components/ag/ag-badge';
import { Caption } from '@/components/ag/typography';
import { Button } from '@/components/ui/button';

export function AskCard({
  action,
  urgency = 'medium',
  agent,
  timestamp,
  onLocate,
}) {
  const urgencyConfig = {
    high: {
      label: 'Urgent',     labelZh: '紧急',
      borderColor: 'var(--color-status-error-text)',
      bgColor: 'rgba(var(--color-status-error-rgb, 239, 68, 68), 0.06)',
      badgeVariant: 'error',
    },
    medium: {
      label: 'Medium',     labelZh: '中等',
      borderColor: 'var(--color-status-warning-text)',
      bgColor: 'rgba(var(--color-status-warning-rgb, 245, 158, 11), 0.06)',
      badgeVariant: 'warning',
    },
    low: {
      label: 'Low',        labelZh: '低',
      borderColor: 'var(--color-border)',
      bgColor: 'var(--color-surface)',
      badgeVariant: 'default',
    },
  };

  const config = urgencyConfig[urgency] || urgencyConfig.medium;

  return (
    <AgCard
      style={{
        borderColor: config.borderColor,
        backgroundColor: config.bgColor,
        padding: 'var(--space-3) var(--space-4)',
        borderRadius: 'var(--radius-md)',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
        {/* Warning icon / 警告图标 */}
        <span style={{ color: config.borderColor, fontSize: 'var(--font-size-body)', flexShrink: 0, marginTop: '2px' }}>
          ⚠
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Urgency badge + agent / 紧急度标签 + Agent 名 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <AgBadge variant={config.badgeVariant}>
              {config.label}
            </AgBadge>
            {agent && (
              <Caption style={{ color: 'var(--color-text-muted)' }}>
                {agent}
              </Caption>
            )}
          </div>
          {/* Action description / 操作描述 */}
          <p
            className="text-[length:var(--font-size-small)]"
            style={{ color: 'var(--color-text-primary)', lineHeight: 1.5 }}
          >
            {action}
          </p>
          {/* Footer / 底部 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--space-3)' }}>
            {timestamp && (
              <time>
                <Caption style={{ color: 'var(--color-text-muted)' }}>
                  {timestamp}
                </Caption>
              </time>
            )}
            {onLocate && (
              <Button variant="ghost" size="sm" onClick={onLocate}>
                Locate / 定位
              </Button>
            )}
          </div>
        </div>
      </div>
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽             | Component / 组件 | Token Ref / 引用                        |
 * |-------------------------|------------------|-----------------------------------------|
 * | Container / 容器        | AgCard           | urgency-bound border + bg               |
 * | Warning icon / 警告图标 | Icon             | color = urgency border color            |
 * | Urgency badge / 紧急度  | AgBadge          | error/warning/default                   |
 * | Agent name / Agent 名   | Caption          | --color-text-muted                      |
 * | Action text / 操作描述  | text-small       | --color-text-primary                    |
 * | Timestamp / 时间        | Caption          | --color-text-muted                      |
 * | Locate btn / 定位按钮   | Button ghost     | sm size                                 |
 *
 * Notes / 注意:
 * - Only card type allowed to interrupt user / 唯一允许打断用户的主动消息类别
 * - Border color semantically bound to urgency / 边框颜色语义绑定到紧急度
 * - High urgency: red border + red tint bg / 高优先: 红色描边 + 红色底色
 */
