/**
 * Pattern: Topology Node / 拓扑图节点
 * Purpose / 用途: DAG topology node for agent role visualization with status indicator
 *   DAG 拓扑图中的 Agent 角色节点，含状态指示和连接信息
 * Archetype: ai-agent-config, dashboard
 */

import { AgCard } from '@/components/ag/ag-card';
import { Body, Caption } from '@/components/ag/typography';

export function TopologyNode({
  name,
  role,
  status,
  isRoot = false,
  compact = false,
}) {
  const roleConfig = {
    coordinator: { icon: '👑', label: 'Coordinator', labelZh: '协调者' },
    specialist:  { icon: '🤖', label: 'Specialist',  labelZh: '专家' },
    worker:      { icon: '⚙️', label: 'Worker',      labelZh: '工作者' },
    tool:        { icon: '🔧', label: 'Tool',        labelZh: '工具' },
  };

  const statusConfig = {
    idle:    { color: 'var(--color-text-muted)',         dot: 'var(--color-text-muted)' },
    active:  { color: 'var(--color-status-info-text)',   dot: 'var(--color-status-info-text)' },
    success: { color: 'var(--color-status-success-text)', dot: 'var(--color-status-success-text)' },
    error:   { color: 'var(--color-status-error-text)',  dot: 'var(--color-status-error-text)' },
  };

  const rCfg = roleConfig[role] || roleConfig.specialist;
  const sCfg = statusConfig[status] || statusConfig.idle;

  const width = compact ? '160px' : '210px';
  const padding = compact ? 'var(--space-2) var(--space-3)' : 'var(--space-3) var(--space-4)';

  return (
    <AgCard
      variant="contained"
      style={{
        width,
        padding,
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        borderColor: isRoot ? 'var(--color-status-info-text)' : undefined,
        borderWidth: isRoot ? '2px' : undefined,
      }}
    >
      {/* Status dot / 状态点 */}
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: sCfg.dot,
          flexShrink: 0,
        }}
      />
      {/* Role icon + name / 角色图标 + 名称 */}
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
          <span style={{ fontSize: compact ? '12px' : '14px' }}>{rCfg.icon}</span>
          {compact ? (
            <span
              className="text-[length:var(--font-size-small)]"
              style={{
                fontWeight: 'var(--weight-medium)',
                color: 'var(--color-text-primary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </span>
          ) : (
            <Body
              style={{
                fontWeight: 'var(--weight-medium)',
                color: 'var(--color-text-primary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </Body>
          )}
        </div>
        {!compact && (
          <Caption style={{ color: 'var(--color-text-muted)' }}>
            {rCfg.label}
          </Caption>
        )}
      </div>
    </AgCard>
  );
}

export function TopologyEdge() {
  return (
    <div style={{
      width: '40px',
      height: '2px',
      backgroundColor: 'var(--color-border)',
      alignSelf: 'center',
    }} />
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽            | Component / 组件    | Token Ref / 引用                       |
 * |------------------------|---------------------|-----------------------------------------|
 * | Node container / 容器  | AgCard contained    | --radius-md, fixed width                |
 * | Status dot / 状态点    | Custom              | 8px circle, color = status              |
 * | Role icon / 角色图标   | Custom              | emoji, 12-14px                          |
 * | Name / 名称            | Body/text-small     | --weight-medium, truncate               |
 * | Role label / 角色标签  | Caption             | --color-text-muted, hidden in compact   |
 * | Edge / 连接线          | Custom              | --color-border, 2px height              |
 *
 * Notes / 注意:
 * - Root node: 2px border with info color / 根节点：2px 信息色描边
 * - Compact mode: 160px width, hide role label / 紧凑模式：160px 宽，隐藏角色标签
 * - Standard mode: 210px width, show role label / 标准模式：210px 宽，显示角色标签
 * - For full DAG layout, combine nodes with edges and use CSS grid or absolute positioning
 *   完整 DAG 布局需组合节点和连接线，使用 CSS grid 或绝对定位
 */
