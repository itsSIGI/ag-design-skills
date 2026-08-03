/**
 * Pattern: Thinking Indicator / 思考指示器
 * Purpose / 用途: Animated indicator showing agent is thinking/processing
 *   显示 Agent 正在思考/处理的动画指示器
 * Archetype: ai-chat-interface
 */

import { Caption } from '@/components/ag/typography';

export function ThinkingIndicator({
  seconds,
  phase,
}) {
  const label = phase || 'Thinking...';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-1) 0',
      }}
    >
      {/* Spinning icon / 旋转图标 */}
      <Caption
        style={{
          color: 'var(--color-text-muted)',
          display: 'inline-block',
          flexShrink: 0,
        }}
      >
        <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </Caption>
      {/* Phase label / 阶段标签 */}
      <Caption style={{ color: 'var(--color-text-muted)', flex: 1 }}>
        {label}
      </Caption>
      {/* Elapsed time / 已用时间 */}
      {seconds !== undefined && (
        <Caption
          style={{
            color: 'var(--color-text-muted)',
            fontVariantNumeric: 'tabular-nums',
            opacity: 0.6,
          }}
        >
          {seconds}s
        </Caption>
      )}
    </div>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽           | Component / 组件 | Token Ref / 引用                     |
 * |-----------------------|------------------|--------------------------------------|
 * | Spinner / 旋转图标    | animate-spin svg | --color-text-muted, CSS spin anim    |
 * | Phase label / 阶段    | Caption          | --color-text-muted                   |
 * | Timer / 计时器        | Caption          | --color-text-muted, 0.6 opacity      |
 *
 * Notes / 注意:
 * - Minimal footprint: single inline row / 最小占用：单行内联
 * - Timer uses tabular-nums for stable width / 计时器用等宽数字避免抖动
 * - Default phase "Thinking..." can be overridden / 默认阶段"Thinking..."可自定义
 */
