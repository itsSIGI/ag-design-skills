/**
 * Pattern: Status Tag / 状态标签
 * Purpose / 用途: Status display for tasks, experiments, agent runs, etc.
 *   任务状态、实验状态、Agent 运行状态等的标签展示
 * Archetype: list-table, computation-dashboard, experiment-workflow
 */

import { AgBadge } from '@/components/ag/ag-badge';

export function StatusTag({ status, label }) {
  return (
    <AgBadge variant={status || 'default'}>
      {label}
    </AgBadge>
  );
}

// Business status mapping / 业务语义映射
export const TASK_STATUS_MAP = {
  pending:   { status: 'default', label: 'Pending',   labelZh: '待处理' },
  running:   { status: 'info',    label: 'Running',   labelZh: '运行中' },
  completed: { status: 'success', label: 'Completed', labelZh: '已完成' },
  failed:    { status: 'error',   label: 'Failed',    labelZh: '失败' },
  paused:    { status: 'warning', label: 'Paused',    labelZh: '已暂停' },
};

export function TaskStatusTag({ taskStatus }) {
  const config = TASK_STATUS_MAP[taskStatus] || TASK_STATUS_MAP.pending;
  return <StatusTag status={config.status} label={config.label} />;
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽  | Component / 组件 | Token Ref / 引用                 |
 * |--------------|------------------|------------------------------------|
 * | Tag / 标签   | AgBadge          | --color-status-{slot}-bg/text      |
 *
 * Notes / 注意:
 * - Semantic slots must not be swapped (success!=blue, error!=yellow)
 *   语义槽不可错配（成功!=蓝、错误!=黄）
 * - Category tags use decorative variants (--teal/--purple/--pink), not semantic slots
 *   分类标签用装饰色变体，不用语义槽
 * - A single element must not carry both status and category roles
 *   同一元素不能同时承担状态+分类
 */
