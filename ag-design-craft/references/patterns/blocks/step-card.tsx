/**
 * Pattern: Step Card / 步骤卡片
 * Purpose / 用途: Collapsible card for agent execution steps with 7-state status
 *   Agent 执行步骤的可折叠卡片，支持 7 种状态（pending/generating/running/completed/failed/cancelled/skipped）
 * Archetype: ai-chat-interface, experiment-workflow
 */

import { useState } from 'react';
import { AgCard } from '@/components/ag/ag-card';
import { AgBadge } from '@/components/ag/ag-badge';
import { Body, Caption } from '@/components/ag/typography';
import { Button } from '@/components/ui/button';

export function StepCard({
  stepName,
  specialist,
  status,
  summary,
  thinkingSeconds,
  messagesCount,
  onViewThread,
  children,
}) {
  const [expanded, setExpanded] = useState(status === 'running');

  const statusConfig = {
    pending:    { label: 'Pending',    labelZh: '待执行',  tagVariant: 'default',  icon: 'mgc_time_line',          iconColor: 'var(--color-text-muted)' },
    generating: { label: 'Generating', labelZh: '生成中',  tagVariant: 'warning',  icon: 'mgc_loading_line',       iconColor: 'var(--color-status-warning-text)' },
    running:    { label: 'Running',    labelZh: '运行中',  tagVariant: 'info',     icon: 'mgc_loading_line',       iconColor: 'var(--color-status-info-text)' },
    completed:  { label: 'Completed',  labelZh: '已完成',  tagVariant: 'success',  icon: 'mgc_check_circle_line',  iconColor: 'var(--color-status-success-text)' },
    failed:     { label: 'Failed',     labelZh: '失败',    tagVariant: 'error',    icon: 'mgc_close_circle_line',  iconColor: 'var(--color-status-error-text)' },
    cancelled:  { label: 'Cancelled',  labelZh: '已取消',  tagVariant: 'warning',  icon: 'mgc_forbid_circle_line', iconColor: 'var(--color-status-warning-text)' },
    skipped:    { label: 'Skipped',    labelZh: '已跳过',  tagVariant: 'default',  icon: 'mgc_skip_forward_line',  iconColor: 'var(--color-text-muted)' },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <AgCard
      variant="contained"
      style={{
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
      }}
    >
      {/* Header / 头部 - clickable toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-3) var(--space-4)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.15s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: 0 }}>
          {/* Status icon — MingCute, color-bound to status / 状态图标——MingCute，颜色绑定状态 */}
          <i
            className={config.icon}
            style={{
              fontSize: '16px',
              color: config.iconColor,
              flexShrink: 0,
            }}
            aria-label={config.label}
          />
          <Body
            style={{
              fontWeight: 'var(--weight-medium)',
              color: 'var(--color-text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {stepName}
          </Body>
          {specialist && (
            <AgBadge variant="default" style={{ flexShrink: 0 }}>
              {specialist}
            </AgBadge>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0, marginLeft: 'var(--space-2)' }}>
          {status === 'running' && thinkingSeconds !== undefined && (
            <Caption
              style={{
                color: 'var(--color-status-info-text)',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.01em',
              }}
            >
              {thinkingSeconds}s
            </Caption>
          )}
          {messagesCount > 0 && (
            <Caption
              style={{
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
              }}
            >
              <i className="mgc_chat_1_line" style={{ fontSize: '12px' }} />
              {messagesCount}
            </Caption>
          )}
          <AgBadge variant={config.tagVariant}>
            {config.label}
          </AgBadge>
          {/* Chevron / 折叠箭头 */}
          <i
            className={expanded ? 'mgc_down_line' : 'mgc_right_line'}
            style={{
              fontSize: '14px',
              color: 'var(--color-text-muted)',
              transition: 'transform 0.15s ease',
            }}
          />
        </div>
      </button>

      {/* Separator / 分隔线 — only when expanded */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--color-border-subtle)', margin: '0 var(--space-4)' }} />
      )}

      {/* Expanded content / 展开内容 */}
      {expanded && (
        <div style={{ padding: 'var(--space-3) var(--space-4)' }}>
          {summary && (
            <p
              className="text-[length:var(--font-size-small)]"
              style={{
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}
            >
              {summary}
            </p>
          )}
          {children}
          {status === 'completed' && onViewThread && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onViewThread(); }}
              style={{
                marginTop: 'var(--space-2)',
                color: 'var(--color-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
              }}
            >
              <i className="mgc_arrow_right_line" style={{ fontSize: '14px' }} />
              View full thread
            </Button>
          )}
        </div>
      )}
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽             | Component / 组件    | Token Ref / 引用                            |
 * |-------------------------|---------------------|---------------------------------------------|
 * | Container / 容器        | AgCard contained    | --radius-md, overflow hidden, transition    |
 * | Header / 头部           | button              | --space-3 y, --space-4 x, bg transition     |
 * | Status icon / 状态图标  | MingCute            | 16px, status-bound color                    |
 * | Step name / 步骤名      | Body                | --weight-medium, truncate                   |
 * | Specialist / 专家       | AgBadge             | default variant                             |
 * | Timer / 计时器          | Caption             | --color-status-info-text, tabular-nums      |
 * | Msg count / 消息数      | Caption+MingCute    | mgc_chat_1_line, --color-text-muted, 12px   |
 * | Status tag / 状态       | AgBadge             | semantic slot binding                       |
 * | Chevron / 折叠箭头      | MingCute            | mgc_down/right_line, 14px, transition       |
 * | Separator / 分隔线      | div                 | --color-border-subtle, margin 0 --space-4   |
 * | Summary / 摘要          | text-small          | --color-text-secondary, line-height 1.6     |
 * | View link / 链接        | Button ghost        | sm, mgc_arrow_right_line                    |
 *
 * Polish notes / 精修要点:
 * - All status icons use MingCute line style, no emoji / 所有状态图标用 MingCute line 风格，无 emoji
 * - Spinner icons (generating/running) should have CSS animation / 加载图标应有 CSS 旋转动画
 * - Chevron uses MingCute down/right icons with transition / 折叠箭头用 MingCute 图标+过渡
 * - Message count uses mgc_chat_1_line icon instead of emoji / 消息数用聊天图标替代 emoji
 * - Separator only shows when expanded for clean collapsed state / 分隔线仅展开时显示
 * - Timer uses tabular-nums + negative letter-spacing / 计时器用等宽数字+负字距
 * - Header button has background transition for hover / 头部按钮有背景色过渡
 * - Card container has box-shadow + border-color transition / 卡片容器有阴影+边框颜色过渡
 * - View thread button uses arrow icon instead of text / 查看线程按钮用箭头图标替代文本符号
 */
