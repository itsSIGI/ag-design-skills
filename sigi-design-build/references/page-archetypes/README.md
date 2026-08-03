# Page Archetypes — B 端页面布局原型库

> 解决"产出页面不够好看"的问题。**好看的 90% 来自布局/层级/密度/节奏（可复用），10% 才是视觉样式（AG token 已锁死）**。
> 本库只沉淀**布局结构**——"区域划分 + 层级 + 用哪些 shadcn/ui + AG 扩展组件 + spacing 节奏"。
>
> **做新页面时**：先匹配最接近的原型 → 照搬它的区域骨架 → 填你的内容 → 过校验。

## 收录的原型

### 通用原型（5 个）

| 原型 | 适用场景 |
|------|---------|
| [dashboard](dashboard.md) | 指标 + 筛选 + 图表/列表的总览页 |
| [list-table](list-table.md) | 列表/表格页（筛选 + Table + 分页） |
| [create-edit-form](create-edit-form.md) | 创建/编辑实体的多分区表单页 |
| [entity-detail](entity-detail.md) | 单实体详情页（header + tabs/分区 + 内容） |
| [settings-config](settings-config.md) | 分区设置/配置页 |

### 化学科研 / AI 专用原型（7 个）

| 原型 | 适用场景 |
|------|---------|
| [molecule-viewer](molecule-viewer.md) | 分子结构可视化（2D/3D viewer + 属性面板） |
| [experiment-workflow](experiment-workflow.md) | 实验流程管理（步骤卡片 + 参数表单 + 结果记录） |
| [computation-dashboard](computation-dashboard.md) | 计算任务仪表板（任务队列 + 资源监控） |
| [data-explorer](data-explorer.md) | 数据库浏览器（高级筛选 + 搜索 + 批量操作） |
| [ai-chat-interface](ai-chat-interface.md) | AI Agent 对话界面（消息流 + 工具调用 + 上下文面板） |
| [ai-agent-config](ai-agent-config.md) | Agent 配置页（参数 + 提示词 + 工具选择） |
| [report-analysis](report-analysis.md) | 分析报告页（图表组合 + 数据表 + 导出） |

## 用线上 SaaS 找灵感时的翻译协议

当原型库没覆盖、需要参考线上 SaaS 时：

```
✅ 只准提取：区域怎么排 / 层级怎么分 / 信息密度多大 / 内容怎么组织 / 留白节奏
❌ 必须丢弃：颜色 / 阴影 / 渐变 / 圆角 / 字体 / 具体组件实现
→ 用 shadcn/ui + AG 扩展组件 + var(--*) token 重新表达
→ 过 Token 校验
```

## 诚实的天花板

原型库能把产出从"平庸"拉到"扎实、专业、好看"。但**"惊艳/独特"仍需设计师判断**——这是方法论上限。原型保证不丑、有章法，不保证出彩。
