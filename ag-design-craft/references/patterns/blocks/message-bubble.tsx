/**
 * Pattern: Message Bubble / 消息气泡（增强版）
 * Purpose / 用途: Enhanced chat message bubble with prose styling, attachments, edit mode, and meta actions
 *   增强版聊天消息气泡，支持 prose 排版、附件展示、编辑模式和元信息操作
 * Archetype: ai-chat-interface
 */

import { AgCard } from '@/components/ag/ag-card';
import { Caption } from '@/components/ag/typography';
import { Button } from '@/components/ui/button';

export function MessageBubble({
  role,
  content,
  timestamp,
  attachments,
  isEditing = false,
  onEdit,
  onCopy,
  onRegenerate,
  children,
}) {
  const isUser = role === 'user';

  return (
    <div
      className={isUser
        ? 'rounded-[var(--radius-lg)] bg-[var(--color-surface)] px-[var(--space-3)] py-[var(--space-2)]'
        : 'px-0 py-0'
      }
      style={{ maxWidth: isUser ? '85%' : '100%' }}
    >
      {/* Content area / 内容区 */}
      <div>
        {isEditing ? (
          <textarea
            defaultValue={content}
            style={{
              width: '100%',
              minHeight: '80px',
              padding: 'var(--space-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              resize: 'vertical',
            }}
          />
        ) : (
          <div style={{ color: 'var(--color-text-primary)', lineHeight: 1.6 }}>
            {typeof content === 'string' ? <p>{content}</p> : content}
          </div>
        )}
        {children}
      </div>

      {/* Attachments / 附件 */}
      {attachments && attachments.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            marginTop: 'var(--space-2)',
          }}
        >
          {attachments.map((att, i) => (
            <AgCard
              key={i}
              variant="flat"
              style={{
                padding: 'var(--space-2) var(--space-3)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Caption style={{ color: 'var(--color-text-muted)' }}>📎</Caption>
              <span className="text-[length:var(--font-size-small)]" style={{ color: 'var(--color-text-secondary)' }}>{att.name}</span>
            </AgCard>
          ))}
        </div>
      )}

      {/* Meta actions / 元信息操作行 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          marginTop: 'var(--space-2)',
        }}
      >
        {timestamp && (
          <time>
            <Caption style={{ color: 'var(--color-text-muted)' }}>
              {timestamp}
            </Caption>
          </time>
        )}
        <div style={{ display: 'flex', gap: 'var(--space-1)', marginLeft: 'auto' }}>
          {onCopy && (
            <Button variant="ghost" size="icon" onClick={onCopy} aria-label="Copy">
              📋
            </Button>
          )}
          {isUser && onEdit && (
            <Button variant="ghost" size="icon" onClick={onEdit} aria-label="Edit">
              ✏️
            </Button>
          )}
          {!isUser && onRegenerate && (
            <Button variant="ghost" size="icon" onClick={onRegenerate} aria-label="Regenerate">
              🔄
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽               | Component / 组件    | Token Ref / 引用                     |
 * |---------------------------|---------------------|--------------------------------------|
 * | User bubble / 用户气泡    | Tailwind classes    | --color-surface bg, --radius-lg      |
 * | Agent bubble / Agent气泡  | Tailwind classes    | no bg, no border                     |
 * | Content / 内容            | div                 | line-height 1.6                      |
 * | Edit textarea / 编辑框    | Custom              | --color-surface bg, --color-border   |
 * | Attachment / 附件         | AgCard flat         | --space-2 padding, --radius-sm       |
 * | Timestamp / 时间戳        | Caption             | --color-text-muted                   |
 * | Action btns / 操作按钮    | Button ghost icon   | hover reveal                         |
 *
 * Notes / 注意:
 * - User bubble max-width 85%, agent bubble full width / 用户气泡最大宽度 85%，Agent 气泡全宽
 * - Edit mode replaces prose with textarea / 编辑模式用 textarea 替换 prose
 * - Meta actions row: timestamp left, buttons right / 元信息行：时间戳左，按钮右
 * - User: edit button; Agent: regenerate button / 用户：编辑按钮；Agent：重新生成按钮
 */
