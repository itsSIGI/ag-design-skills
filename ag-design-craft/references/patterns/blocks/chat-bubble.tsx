/**
 * Pattern: Chat Bubble / 对话气泡
 * Purpose / 用途: Message bubbles for AI agent chat interface with avatar, attachments, edit mode
 *   AI Agent 对话界面的消息气泡，支持头像、附件、编辑模式
 * Archetype: ai-chat-interface
 */

import { AgCard } from '@/components/ag/ag-card';
import { Caption } from '@/components/ag/typography';
import { CodeBlock } from '@/components/ag/code-block';

export function ChatBubble({ role, avatar, content, timestamp, editMode = false, children }) {
  const isUser = role === 'user';
  const avatarInitial = (avatar || (isUser ? 'U' : 'A')).charAt(0).toUpperCase();

  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'flex-start',
      }}
    >
      {/* Avatar / 头像 */}
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: isUser ? 'var(--color-surface-secondary)' : 'var(--color-surface)',
          border: isUser ? 'none' : '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'var(--weight-medium)',
          color: 'var(--color-text-muted)',
          flexShrink: 0,
        }}
      >
        {avatarInitial}
      </div>

      {/* Bubble body / 气泡主体 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          className={isUser
            ? 'rounded-[var(--radius-lg)] bg-[var(--color-surface)] px-[var(--space-3)] py-[var(--space-2)]'
            : 'px-0 py-0'
          }
          style={{
            transition: 'background-color 0.15s ease',
          }}
        >
          <div>
            {typeof content === 'string' ? <p>{content}</p> : content}
            {children}
          </div>
        </div>

        {/* Meta row: timestamp + edit indicator / 元信息行：时间戳 + 编辑标记 */}
        {(timestamp || editMode) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginTop: 'var(--space-1)',
            }}
          >
            {timestamp && (
              <time>
                <Caption style={{ color: 'var(--color-text-muted)' }}>
                  {timestamp}
                </Caption>
              </time>
            )}
            {editMode && (
              <Caption
                style={{
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                }}
              >
                <i className="mgc_edit_line" style={{ fontSize: '12px' }} />
                edited
              </Caption>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function AgentBubbleWithTool({ content, toolName, toolInput, toolResult, timestamp, avatar }) {
  return (
    <ChatBubble role="agent" timestamp={timestamp} avatar={avatar}>
      {content && <p>{content}</p>}
      {toolName && (
        <details style={{ marginTop: 'var(--space-3)' }}>
          <summary
            className="text-[length:var(--font-size-small)]"
            style={{
              cursor: 'pointer',
              color: 'var(--color-text-secondary)',
              fontWeight: 'var(--weight-medium)',
              padding: 'var(--space-2) var(--space-3)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              transition: 'color 0.15s ease',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <i className="mgc_terminal_line" style={{ fontSize: '14px', color: 'var(--color-text-muted)' }} />
            Tool call: {toolName}
          </summary>
          <div style={{
            padding: 'var(--space-3)',
            borderTop: '1px solid var(--color-border-subtle)',
          }}>
            {toolInput && (
              <CodeBlock code={JSON.stringify(toolInput, null, 2)} showHeader={false} />
            )}
            {toolResult && (
              <div
                className="text-[length:var(--font-size-small)]"
                style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}
              >
                {toolResult}
              </div>
            )}
          </div>
        </details>
      )}
    </ChatBubble>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽              | Component / 组件    | Token Ref / 引用                        |
 * |--------------------------|---------------------|-----------------------------------------|
 * | Avatar / 头像            | Custom              | 28px, --radius-full, --color-surface    |
 * | User bubble / 用户气泡   | Tailwind classes    | --color-surface, radius-lg              |
 * | Agent bubble / Agent     | Tailwind classes    | no bg, no border, radius-none           |
 * | Timestamp / 时间戳       | Caption             | --color-text-muted                      |
 * | Edit indicator / 编辑标记| Caption+MingCute    | mgc_edit_line, --color-text-muted, 12px |
 * | Tool call / 工具调用     | details+summary     | collapsible, border-top on content      |
 * | Tool icon / 工具图标     | MingCute            | mgc_terminal_line, 14px                 |
 * | Code block / 代码块      | CodeBlock           | mono font                               |
 *
 * Polish notes / 精修要点:
 * - Avatar provides visual anchor for message alignment / 头像为消息对齐提供视觉锚点
 * - Agent avatar has subtle border, user avatar uses surface-secondary bg / Agent 头像有微妙边框，用户头像用次级背景
 * - Tool call summary uses MingCute terminal icon, not emoji / 工具调用用 MingCute 终端图标
 * - Details content has border-top separator for visual structure / 展开内容有顶部边框分隔
 * - Summary has color transition on hover / 摘要 hover 有颜色过渡
 * - Bubble background has transition for streaming scenarios / 气泡背景有过渡（用于流式场景）
 * - Meta row uses flex for timestamp + edit indicator alignment / 元信息行用 flex 对齐时间戳和编辑标记
 * - All icons use MingCute line style, no emoji / 全部用 MingCute line 图标，无 emoji
 */
