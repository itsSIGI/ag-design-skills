/**
 * Pattern: Event Line / 事件分隔线
 * Purpose / 用途: Agent-pushed event card with severity indicator, actor, and description
 *   Agent 主动推送的事件卡片，含严重程度指示、执行者和描述
 * Archetype: ai-chat-interface
 */

import { useState } from 'react';
import { AgCard } from '@/components/ag/ag-card';
import { Caption } from '@/components/ag/typography';
import { Button } from '@/components/ui/button';

export function EventLine({
  actor,
  description,
  severity = 'info',
  timestamp,
  report,
}) {
  const severityConfig = {
    success: { icon: '✓', color: 'var(--color-status-success-text)', label: 'Success', labelZh: '成功' },
    warning: { icon: '⚠', color: 'var(--color-status-warning-text)', label: 'Warning', labelZh: '警告' },
    error:   { icon: '✕', color: 'var(--color-status-error-text)',   label: 'Error',   labelZh: '错误' },
    info:    { icon: 'ℹ', color: 'var(--color-status-info-text)',    label: 'Info',     labelZh: '信息' },
  };

  const config = severityConfig[severity] || severityConfig.info;
  const [reportExpanded, setReportExpanded] = useState(false);

  return (
    <AgCard
      variant="flat"
      style={{
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-2) var(--space-4)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
        {/* Severity icon / 严重程度图标 */}
        <span
          style={{
            color: config.color,
            flexShrink: 0,
            marginTop: '2px',
            fontWeight: 'var(--weight-medium)',
          }}
        >
          {config.icon}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Actor name / 执行者名 */}
          {actor && (
            <div
              className="text-[length:var(--font-size-small)]"
              style={{
                fontWeight: 'var(--weight-medium)',
                color: 'var(--color-text-primary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {actor}
            </div>
          )}
          {/* Description / 描述 */}
          <div
            className="text-[length:var(--font-size-small)]"
            style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
              wordBreak: 'break-word',
              marginTop: actor ? 'var(--space-1)' : '0',
            }}
          >
            {description}
          </div>
        </div>
      </div>

      {/* Report toggle / 报告折叠 */}
      {report && (
        <div style={{ marginTop: 'var(--space-2)' }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReportExpanded(!reportExpanded)}
            style={{ fontSize: 'var(--font-size-caption)' }}
          >
            {reportExpanded ? '▾ Hide report' : '▸ Show report'}
          </Button>
          {reportExpanded && (
            <AgCard
              variant="contained"
              style={{
                marginTop: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div
                className="text-[length:var(--font-size-small)]"
                style={{
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {report}
              </div>
            </AgCard>
          )}
        </div>
      )}

      {/* Timestamp / 时间戳 */}
      {timestamp && (
        <time>
          <Caption
            style={{
              color: 'var(--color-text-muted)',
              display: 'block',
              marginTop: 'var(--space-2)',
            }}
          >
            {timestamp}
          </Caption>
        </time>
      )}
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽             | Component / 组件  | Token Ref / 引用                      |
 * |-------------------------|-------------------|---------------------------------------|
 * | Container / 容器        | AgCard flat       | --radius-md, --color-surface bg       |
 * | Severity icon / 图标    | Custom            | color = severity token                |
 * | Actor / 执行者          | text-small        | --weight-medium, truncate             |
 * | Description / 描述      | text-small        | --color-text-secondary, break-word    |
 * | Report toggle / 报告    | Button ghost      | sm size, caption font-size            |
 * | Report content / 内容   | AgCard + text     | --color-text-secondary, pre-wrap      |
 * | Timestamp / 时间戳      | Caption           | --color-text-muted                    |
 *
 * Notes / 注意:
 * - Severity colors from semantic status tokens / 严重程度颜色来自语义状态 token
 * - success=✓ green, warning=⚠ amber, error=✕ red, info=ℹ brand / 对应关系
 * - Report is collapsible to avoid overwhelming the chat flow / 报告可折叠以避免占据过多对话流空间
 * - When no actor, description starts on same line as icon / 无执行者时，描述与图标同行
 */
