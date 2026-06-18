/**
 * Pattern: Empty State / 空状态
 * Purpose / 用途: Display for empty lists, no search results, or initial empty state
 *   列表/搜索无结果、初始空状态的展示
 * Archetype: list-table, data-explorer, ai-chat-interface
 */

import { EmptyState as AgEmptyState } from '@/components/ag/empty-state';
import { Button } from '@/components/ui/button';

export function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <AgEmptyState title={title} description={description} icon={icon}>
      {actionLabel && onAction && (
        <Button variant="default" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </AgEmptyState>
  );
}

// Preset: Search empty state / 预设：搜索空态
export function SearchEmptyState({ query, onClear }) {
  return (
    <EmptyState
      icon={
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      }
      title={`No results for "${query}"`}
      description="Try different keywords or adjust your filters"
      actionLabel="Clear search"
      onAction={onClear}
    />
  );
}

// Preset: List empty state / 预设：列表空态
export function ListEmptyState({ entityName, onAdd }) {
  return (
    <EmptyState
      icon={
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      }
      title={`No ${entityName} yet`}
      description={`Click below to create your first ${entityName}`}
      actionLabel={`Create ${entityName}`}
      onAction={onAdd}
    />
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽        | Component / 组件 | Token Ref / 引用               |
 * |--------------------|------------------|---------------------------------|
 * | Container / 容器   | AgEmptyState     | built-in centered layout        |
 * | Icon / 图标        | icon prop        | --color-text-muted              |
 * | Title / 标题       | title prop       | --color-text-primary            |
 * | Description / 描述 | description prop | --color-text-secondary          |
 * | CTA / 操作按钮     | Button default   | neutral black/white             |
 *
 * Notes / 注意: Illustrations/icons may use decorative palette (content layer allows color)
 *   插画/图标可用装饰色板（属"内容"层，允许彩色）
 */
