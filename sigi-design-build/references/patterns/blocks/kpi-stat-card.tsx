/**
 * Pattern: KPI Stat Card / 指标统计卡
 * Purpose / 用途: Core metric display for dashboards and overview pages
 *   仪表板/概览页的核心指标展示
 * Archetype: dashboard, computation-dashboard, report-analysis
 */

import { AgCard } from '@/components/ag/ag-card';
import { Display, Caption } from '@/components/ag/typography';

export function KpiStatCard({ label, value, trend, trendLabel, icon }) {
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  return (
    <AgCard
      variant="contained"
      style={{
        padding: 'var(--space-5)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      {/* Top row: label + optional icon / 顶部：标签 + 可选图标 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Caption style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.01em' }}>
          {label}
        </Caption>
        {icon && (
          <span style={{ color: 'var(--color-text-muted)', fontSize: '16px', lineHeight: 1 }}>
            {/* MingCute icon / MingCute 图标 */}
            {icon}
          </span>
        )}
      </div>

      {/* Value — tabular-nums + negative letter-spacing for visual pull / 数值——等宽数字 + 负字距制造视觉拉力 */}
      <Display
        style={{
          marginTop: 'var(--space-2)',
          color: 'var(--color-text-primary)',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </Display>

      {/* Trend row — compact, secondary weight / 趋势行——紧凑、次级视觉权重 */}
      {trend !== undefined && (
        <Caption
          style={{
            marginTop: 'var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
          }}
        >
          <span
            style={{
              color: isPositive
                ? 'var(--color-status-success-text)'
                : isNegative
                  ? 'var(--color-status-error-text)'
                  : 'var(--color-text-muted)',
              fontWeight: 'var(--weight-medium)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {isPositive ? '↑' : isNegative ? '↓' : '—'} {Math.abs(trend)}%
          </span>
          {trendLabel && (
            <span style={{ color: 'var(--color-text-muted)' }}>{trendLabel}</span>
          )}
        </Caption>
      )}
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽        | Component / 组件    | Token Ref / 引用                    |
 * |--------------------|---------------------|-------------------------------------|
 * | Container / 容器   | AgCard contained    | --space-5 padding                   |
 * | Label / 指标标签   | Caption             | --color-text-secondary              |
 * | Icon / 图标        | MingCute            | --color-text-muted, 16px            |
 * | Value / 指标数值   | Display             | tabular-nums, letter-spacing -0.02  |
 * | Trend / 趋势       | Caption             | --weight-medium, status color       |
 *
 * Polish notes / 精修要点:
 * - Value uses tabular-nums + tighter letter-spacing for visual "pull" / 数值用等宽数字 + 更紧字距
 * - Trend value uses medium weight to stand out from trendLabel / 趋势值用 medium 字重与说明文案区分
 * - Icon slot enables visual anchor without adding color / 图标槽位提供视觉锚点但不增加色彩
 * - Card has transition for hover micro-lift in clickable contexts / 卡片有 transition 支持可点击场景的微浮
 */
