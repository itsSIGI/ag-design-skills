/**
 * Pattern: Agent Status Indicator / Agent 状态指示器
 * Purpose / 用途: Display AI Agent running status with color-bound dot indicator
 *   展示 AI Agent 的运行状态，颜色绑定状态点
 * Archetype: ai-chat-interface, ai-agent-config, computation-dashboard
 */

import { AgentStatus as AgentStatusComponent } from '@/components/ag/agent-status';
import { AgCard } from '@/components/ag/ag-card';
import { Subheading } from '@/components/ag/typography';
import { Caption } from '@/components/ag/typography';

export function AgentStatus({ status, label }) {
  return (
    <AgentStatusComponent status={status} label={label} />
  );
}

// Agent status card with details / 带详情的 Agent 状态卡
export function AgentStatusCard({ agentName, status, model, lastActive, taskCount }) {
  return (
    <AgCard variant="contained" style={{ padding: 'var(--space-4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Subheading style={{ color: 'var(--color-text-primary)' }}>
            {agentName}
          </Subheading>
          <AgentStatus status={status} />
        </div>
      </div>
      <div
        style={{
          marginTop: 'var(--space-3)',
          display: 'flex',
          gap: 'var(--space-6)',
        }}
      >
        {model && (
          <div>
            <Caption style={{ color: 'var(--color-text-muted)' }}>
              Model / 模型
            </Caption>
            <div className="text-[length:var(--font-size-small)]" style={{ color: 'var(--color-text-primary)' }}>
              {model}
            </div>
          </div>
        )}
        {lastActive && (
          <div>
            <Caption style={{ color: 'var(--color-text-muted)' }}>
              Last Active / 最近活跃
            </Caption>
            <div className="text-[length:var(--font-size-small)]" style={{ color: 'var(--color-text-primary)' }}>
              {lastActive}
            </div>
          </div>
        )}
        {taskCount !== undefined && (
          <div>
            <Caption style={{ color: 'var(--color-text-muted)' }}>
              Tasks / 任务数
            </Caption>
            <div className="text-[length:var(--font-size-small)]" style={{ color: 'var(--color-text-primary)' }}>
              {taskCount}
            </div>
          </div>
        )}
      </div>
    </AgCard>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽              | Component / 组件       | Token Ref / 引用                |
 * |--------------------------|------------------------|---------------------------------|
 * | Indicator / 状态指示器   | AgentStatusComponent   | --color-agent-{status}          |
 * | Label / 文本标签         | text-small             | --color-text-secondary          |
 * | Detail card / 详情容器   | AgCard contained       | --space-4 padding               |
 *
 * Rule: Color↔status strictly bound, no swapping / 铁律：颜色↔状态严格绑定，不可交换
 */
