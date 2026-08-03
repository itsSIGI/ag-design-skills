/**
 * Pattern: Tool Activity / 工具调用活动
 * Purpose / 用途: Grouped display of agent tool calls with collapsible code preview
 *   Agent 工具调用的分组展示，含可折叠代码预览和连接线
 * Archetype: ai-chat-interface
 */

import { useState } from 'react';
import { AgCard } from '@/components/ag/ag-card';
import { CodeBlock } from '@/components/ag/code-block';
import { Caption } from '@/components/ag/typography';

export function ToolActivity({
  toolName,
  status,
  input,
  output,
  duration,
}) {
  const [expanded, setExpanded] = useState(false);

  const statusConfig = {
    running:   { label: 'Running',   labelZh: '运行中',  tagVariant: 'info',    iconType: 'spinner' },
    completed: { label: 'Completed', labelZh: '已完成',  tagVariant: 'success', iconType: 'check' },
    failed:    { label: 'Failed',    labelZh: '失败',    tagVariant: 'error',   iconType: 'x' },
  };

  const config = statusConfig[status] || statusConfig.running;

  function summarize(text, max = 120) {
    if (!text) return 'No output';
    const compact = text.replace(/\s+/g, ' ').trim();
    return compact.length > max ? compact.slice(0, max) + '...' : compact;
  }

  return (
    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
      {/* Vertical connector line / 垂直连接线 */}
      <div style={{
        width: '2px',
        backgroundColor: 'var(--color-border)',
        borderRadius: '1px',
        flexShrink: 0,
        minHeight: 'var(--space-8)',
      }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Tool header / 工具头部 */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            width: '100%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 'var(--space-1) 0',
          }}
        >
          <span style={{ color: `var(--color-status-${config.tagVariant}-text)` }}>
            {config.iconType === 'spinner' ? '⟳' : config.iconType === 'check' ? '✓' : '✕'}
          </span>
          <span
            className="text-[length:var(--font-size-small)] font-[number:var(--weight-medium)]"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {toolName}
          </span>
          {duration && (
            <Caption style={{ color: 'var(--color-text-muted)', fontVariantNumeric: 'tabular-nums' }}>
              {duration}
            </Caption>
          )}
          <Caption style={{ color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
            {expanded ? '▾' : '▸'}
          </Caption>
        </button>

        {/* Code preview / 代码预览 */}
        {expanded ? (
          <div style={{ marginTop: 'var(--space-2)' }}>
            {input && (
              <div style={{ marginBottom: 'var(--space-2)' }}>
                <Caption style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)', display: 'block' }}>Input</Caption>
                <CodeBlock code={typeof input === 'string' ? input : JSON.stringify(input, null, 2)} showHeader={false} />
              </div>
            )}
            {output && (
              <div>
                <Caption style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)', display: 'block' }}>Output</Caption>
                <CodeBlock code={typeof output === 'string' ? output : JSON.stringify(output, null, 2)} showHeader={false} />
              </div>
            )}
          </div>
        ) : output ? (
          <Caption style={{ color: 'var(--color-text-muted)', padding: 'var(--space-1) 0', display: 'block' }}>
            {summarize(typeof output === 'string' ? output : JSON.stringify(output))}
          </Caption>
        ) : null}
      </div>
    </div>
  );
}

export function ToolActivityGroup({ tools }) {
  return (
    <AgCard
      variant="flat"
      style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}
    >
      {tools.map((tool, i) => (
        <ToolActivity key={i} {...tool} />
      ))}
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽             | Component / 组件   | Token Ref / 引用                   |
 * |-------------------------|--------------------|------------------------------------|
 * | Group container / 容器  | AgCard flat        | --space-3 padding                  |
 * | Connector / 连接线      | Custom             | --color-border, 2px width          |
 * | Tool name / 工具名      | text-small         | --weight-medium                    |
 * | Duration / 耗时         | Caption            | --color-text-muted, tabular-nums   |
 * | Code block / 代码块     | CodeBlock          | mono font                          |
 * | Summary / 摘要          | Caption            | --color-text-muted, truncate 120ch |
 *
 * Notes / 注意:
 * - Collapsed shows one-line summary / 折叠态显示单行摘要
 * - Vertical connector line links related tool calls / 垂直连接线关联相关工具调用
 */
