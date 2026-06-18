# Decision Tables

> **核心目的**：把 AI"凭品味选组件"的题目变成"查表选"。novel 场景下（pattern 库未命中时）AI 也只能在很窄的合规通道里发挥。

## 使用约定

- **左列业务场景**：当前包含通用 B-end 模板 + Agentic Genius 化学科研/AI 平台特有场景（v1.0）
- **右列组件**：分两类来源——
  - `shadcn/ui + ag-ext`：使用 shadcn/ui 基础组件 + AG 扩展组件，详见 `components-v2.md`
  - `开源-<库名>`：使用第三方组件库，必须按 [`open-source-guide.md`](open-source-guide.md) 做 token 化包装
- **命中后直接用右列组件**，不许凭品味选

---

## 1. 浮层选择

| 业务场景 | 用 | 不用 | 原因 |
|---------|----|----|------|
| 危险操作二次确认（删除数据集 / 终止计算 / 不可逆） | `<Dialog>`（danger 语义内容） | 普通确认框 | 搭配 `<Button variant="destructive">` 明确风险 |
| 焦点任务需要表单输入 | `<Dialog>` | Drawer / Popover | Modal 阻塞主内容，保持专注 |
| 资料详情查看 / 长内容浏览 | `<Sheet>` | `<Dialog>` | 不打断主操作 |
| 实时筛选 / 设置面板 | `<Sheet>` | `<Dialog>` | 适合长时间停留 |
| 鼠标悬停 / 点击触发的小气泡 | `<Tooltip>` 或 Popover | `<Dialog>` | 不阻塞 + 定位灵活 |
| 鼠标悬停查看简短文本说明 | `<Tooltip>` | Popover | Tooltip 仅纯文本 |
| 下拉菜单（操作列表） | `<DropdownMenu>` | Popover | Dropdown 自带菜单语义 |
| 临时反馈消息 | Toast (sonner)（未安装，标记 future） | Alert | Toast 非阻塞临时 |

> **shadcn 组件**：`<Dialog>`、`<Tooltip>`、`<Sheet>`、`<DropdownMenu>` 直接使用。Toast 使用 sonner（尚未安装，标记 future）。

---

## 2. 表单控件选择

| 输入类型 | 用 | 不用 | 原因 |
|---------|----|----|------|
| 简单单行文本 | `<Input>` | — | — |
| 多行文本 | `<Input>`（textarea 模式） | 多个 input 堆叠 | — |
| 搜索 | `<Input>` + search icon（自定义组合） | 自拼 input + 搜索图标 | Input 搜索模式自带清除 + 图标 |
| 预定义下拉（项数 ≤ 50） | `<Select>` | input + datalist | — |
| 可搜索下拉（项数 ≥ 50） | Combobox (cmdk)（未安装，标记 future）或开源 AutoComplete | Select | 大列表需搜索 |
| 二选一切换（设置/立即生效） | `<Switch>` | Checkbox | Switch 表达"立即生效" |
| 二选一勾选（表单/提交时生效） | `<Checkbox>` | Switch | Checkbox 表达"提交时生效" |
| 单选 2–7 项 | `<RadioGroup>` + `<RadioGroupItem>` | 多个 Button 循环 | 自带键盘 + 选中态 |
| 滑动值 | `<Slider>` | input type=range | — |
| 日期选择 | 开源 DatePicker（token 化包装） | 自拼 input | — |
| 时间选择 | 开源 TimePicker（token 化包装） | input type=time | — |
| 文件上传 | 开源 Upload（token 化包装） | input type=file | 需预览 + 进度 |
| 颜色选择 | 开源 ColorPicker | input | — |

> **shadcn 表单组件**：`<Input>`、`<Select>`、`<Switch>`、`<Checkbox>`、`<RadioGroup>` + `<RadioGroupItem>`、`<Slider>`。
> 搜索用 `<Input>` + search icon 自定义组合。Combobox (cmdk) 尚未安装，标记 future。
> 其余（DatePicker/TimePicker/Upload/ColorPicker）需开源组件。

---

## 3. 数据展示选择

| 展示需求 | 用 | 不用 | 原因 |
|---------|----|----|------|
| 结构化表格 | `<Table>` | 自拼 `<table>` | 需排序/对齐/分页 |
| Tabs 分组切换（页内） | `<Tabs>` + `<TabsTrigger>` | 多个 Button 切换 | Tabs 自带键盘 + ARIA |
| 折叠分组（FAQ / 参数面板） | `<Accordion>` | 自拼 hide/show | Accordion 自带动画 + 无障碍 |
| 多步流程指示 | 开源 Steps（token 化包装） | 自拼数字 + 线条 | Steps 自带激活/完成态 |
| 状态标签（Running/Completed/Error） | `<AgBadge variant="success/error/warning/info">` | `<span>` + 颜色 | 自带语义 variant |
| 头像 | `<Avatar>` | `<img>` 加圆角 | 需 fallback |
| 进度展示 | `<Progress>` | 自拼 div | — |
| 代码块 | `<CodeBlock>` | `<pre>` + 自定义样式 | 自带语法高亮 token |
| Agent 状态点 | `<AgentStatus status="running/idle/error/paused/completed">` | 自拼彩色圆点 | 固定语义色 + pulse 动画 |

> **shadcn 展示组件**：`<Table>`、`<Tabs>` + `<TabsTrigger>`、`<Accordion>`、`<Avatar>`、`<Progress>`。
> **ag-ext 展示组件**：`<AgBadge>`、`<CodeBlock>`、`<AgentStatus>`。

---

## 4. 容器选择

| 业务场景 | 用 | 实现方式 |
|---------|----|---------|
| 标准卡片（标题 + 内容） | `<AgCard>` | `<AgCard>` 包标题 + 内容 |
| 浮起特性卡 | `<AgCard variant="whisper">` | 带 whisper 阴影 |
| 环线选择卡 | `<AgCard variant="ring">` | 带 ring 边框 |
| 选中态卡片 | `<AgCard variant="ring">` + selected | 带选中环 |
| 按下/禁用容器 | `<AgCard variant="inset">` | 带 inset 内阴影 |
| 表格容器 | `<Table>` 直接放 | Table 自带容器外观 |
| 表单容器 | 开源 Form + `<AgCard>` 包装 | — |
| 弹窗/浮层容器 | `<Dialog>` 内部 | Dialog 自带容器 |

> **ag-ext 有 `<AgCard>`**（5 种 variant：flat/contained/ring/whisper/inset）。与 MoeGo 不同，不需要自拼卡片。
> 但**容器嵌套规则不变**：每层最多一个 border 语义，不嵌套卡片边框。

---

## 5. 反馈选择

| 反馈语义 | 用 | 不用 | 原因 |
|---------|----|----|------|
| 操作成功/失败临时反馈 | Toast (sonner)（未安装，标记 future） | Alert 内嵌 | Toast 非阻塞临时 |
| 页面级常驻提示（服务维护、计算资源耗尽） | Alert（开源 + token 化） | Toast | Alert 不消失 |
| 表单字段错误 | 输入框 error 态（`<Input>` 自带） | 自拼红字 | 走表单标准 |
| Loading 全屏 | loading spinner（custom） | 自拼 | — |
| Loading 局部（按钮内） | `<Button>` 的 loading 态 | 改文案 | — |

---

## 6. 空状态

| 场景 | 用 | 不用 | 原因 |
|------|----|----|------|
| 列表为空 | `<EmptyState>`（MingCute 图标 + 文案） | 自拼"暂无数据"灰字 | 需图标 + 引导文案 |
| 搜索无结果 | `<EmptyState>` + 搜索语义文案 | 同上 | — |
| 错误页 | `<EmptyState>`（MingCute 图标 + 错误文案 + 重试按钮） | Toast | 错误是常驻状态 |

> **ag-ext 有 `<EmptyState>` 组件**——搭配 MingCute 图标 + `<Body>`/`<Caption>` 文案。需在 recipe 中显式登记为复合块。

---

## 7. 替代映射（堵死 AI 自拼本能）

| ❌ AI 容易这么写 | ✅ 正确做法 | 原因 |
|------|--------|------|
| `<div style="position:fixed; ...">` 模拟弹窗 | `<Dialog>` | 缺无障碍 + token 不一致 |
| `<div>` + 自定义阴影 + 圆角 模拟卡片 | `<AgCard variant="...">` | 已有 5 种 variant |
| `<hr>` 或 `border-t` 分割线 | `<Separator>` 或 `<hr>` + `var(--color-border-subtle)` | 走 token |
| `<span style="color:green">` 状态标签 | `<AgBadge variant="success/error/...">` | 自带语义 variant |
| 自拼 `<table>` | `<Table>` | — |
| 多个 Button 循环模拟切换 | `<Tabs>` | — |
| 自拼 input + 搜索图标 | `<Input>` + search icon 组合 | — |
| `<span style="background:blue; border-radius:50%">` 状态点 | `<AgentStatus status="idle/running/...">` | 固定语义 + pulse |
| `<pre>` + 手动高亮 | `<CodeBlock>` | 自带高亮 token |
| `font-weight: 700` 加粗 | `font-weight: var(--weight-bold)` (600) | 700 违规 |
| `box-shadow: 0 4px 6px rgba(...)` | `var(--shadow-card)` / `var(--shadow-whisper)` 等 | 走 token |
| `border-radius: 8px` | `var(--radius-md)` | 走 token |
| `outline: 2px solid blue` 焦点环 | `outline: 2px solid var(--color-focus-ring)` | 焦点环用中性色 |
| 自拼 hover 加 `shadow` / `transform` | shadcn/ag-ext 组件自带 hover 态 | 交互态已内置 |

---

## 8. 化学科研专用场景

| 业务场景 | 推荐方案 | 开源候选 | 注意事项 |
|---------|---------|---------|---------|
| 2D 分子结构展示 | RDKit.js / Ketcher（嵌入 `<AgCard>`） | 开源-RDKit / 开源-Ketcher | 容器用 `<AgCard>`，背景 `var(--color-surface)` |
| 3D 分子结构查看 | 3Dmol.js（嵌入 `<AgCard>`） | 开源-3Dmol | 容器固定高度，工具栏用 `<Button variant="ghost">` |
| 分子属性面板（MW/LogP/TPSA） | `<AgCard>` + 属性键值对布局 | — | 键用 `<Caption>`，值用 `<Body>` |
| 化学反应方程式 | Ketcher 或自定义 SVG | 开源-Ketcher | — |
| 实验步骤流程 | `<AgCard>` 列表 + 步骤序号 + 状态 `<AgBadge>` | — | 每步一张 `<AgCard>`，状态用 `<AgBadge variant="success/warning/error">` |
| 实验参数表单（温度/压力/时间/浓度） | `<Input>` + `<Select>` + 单位标注 | — | 数值输入带单位后缀，范围校验 |
| 计算任务队列 | `<Table>` + `<AgentStatus>` + `<AgBadge>` | — | 状态列用 `<AgentStatus status="running/completed/error/paused">` |
| 计算资源监控（CPU/GPU/内存） | ECharts Gauge / Bar + `<AgCard>` | 开源-ECharts | 图表内部可用 hex（从 tokens.md 原始色阶取） |
| 光谱/色谱数据曲线 | ECharts Line + `<AgCard>` | 开源-ECharts | 交互式缩放 + 峰值标注 |
| 数据集列表（筛选+批量操作） | `<Table>` + `<Input>` (search) + `<Button>` 工具栏 | — | 批量操作放工具栏，单行操作放行尾 |
| 化合物搜索（结构式+文本混合） | `<Input>` (search) + 结构式绘制器 | 开源-Ketcher | 搜索模式切换用 `<Tabs>` |

---

## 9. AI 对话 / Agent 界面

| 业务场景 | 推荐方案 | 注意事项 |
|---------|---------|---------|
| 用户消息气泡 | 用户消息气泡组件（custom） | 圆角 `var(--radius-lg)`，右对齐 |
| AI 消息气泡 | AI 消息气泡组件（custom） | 圆角 `var(--radius-none)` + 三边 `var(--radius-lg)` |
| 消息输入框 | `<Input>`（textarea 模式） + 发送 `<Button variant="default">` | — |
| Agent 状态指示 | `<AgentStatus status="running/idle/error/paused/completed">` | 绿=running(带pulse)、蓝=idle、红=error、灰=paused |
| 工具调用展示（Agent 调用 API/函数） | `<CodeBlock>` + `<Accordion>` | 折叠显示输入/输出，展开看详情 |
| 思考过程展示 | `<Accordion>` + `<Caption>` 文本 | 默认折叠，颜色用 `var(--color-text-muted)` |
| 上下文面板（引用的文档/数据） | 侧边面板 + `<AgCard>` 列表 | 每个引用一张 `<AgCard>`，点击跳转 |
| Agent 配置表单（提示词/参数） | `<Input>` + `<Select>` + `<Slider>` | 提示词用 textarea 模式 |
| 工具/能力选择 | `<Checkbox>` 列表 或 `<AgBadge>` 可选组 | 分类用 `<Heading>`，工具项用 checkbox |
| 流式输出中间态 | AI 消息气泡 + 打字机动画 | 动画时长 ≤ 200ms |
| 对话历史列表 | `<AgCard>` 列表 + 时间戳 `<Caption>` | — |

> **assistant-ui 升级路径**：当项目需要 streaming / 对话持久化 / 分支对话 / 工具调用执行等运行时能力时，
> 上述自建方案可升级为 assistant-ui primitives。详见 [`assistant-ui-guide.md`](assistant-ui-guide.md)。
> 映射关系：消息气泡 → `MessagePrimitive`，输入框 → `ComposerPrimitive`，思考展示 → `ChainOfThoughtPrimitive`，
> 工具调用 → `makeAssistantToolUI`，对话分支 → `BranchPickerPrimitive`（新能力）。
> Recipe 来源标 `assistant-ui`，验证来源标 `assistant-ui-guide.md ✓`。

---

## 10. 业务语言 → pattern/原型 直查表

> **目的**：PM/研发写 user story 用的是**业务语言**，不是 UI 术语。
> 这张表把**业务动作**直接映射到 pattern/原型/组件，跳过"业务→UI 术语"的易错翻译。
>
> 命中后：有 ✅ pattern 的直接抄代码；有 📐 原型的抄布局骨架；标 ⚠️ 待补的走标准 recipe 流程。

### 数据管理（化合物库/数据集/文件管理）

| 业务动作（PM 怎么说） | 命中 | 类型 |
|---|---|---|
| 化合物列表 / 数据集列表（筛选+表格+分页） | `<Table>` + `<Input>` (search) + `<Pagination>` | 📐 list-table 原型 |
| 新建/编辑化合物/数据集 | `<AgCard>` + 表单组件 | 📐 create-edit-form 原型 |
| **删除数据集 / 移除化合物** 确认 | `<Dialog>` + danger 语义 | ⚠️ 待沉淀为 pattern |
| 化合物详情（分子结构+属性+历史） | 实体详情页 | 📐 entity-detail 原型 |
| 批量导入/导出数据 | `<Dialog>` + 进度展示 | ⚠️ 待补原型 |

### 实验流程（实验管理/实验记录）

| 业务动作 | 命中 | 类型 |
|---|---|---|
| 实验列表（状态筛选+表格） | `<Table>` + `<AgBadge>` 状态列 | 📐 list-table 原型 |
| 新建实验流程（多步表单） | `<AgCard>` 步骤序列 + 表单 | 📐 experiment-workflow 原型 |
| 实验详情（步骤+参数+结果） | 实体详情页 + 步骤面板 | 📐 experiment-workflow 原型 |
| 记录实验结果（表单+附件） | 表单 + 文件上传 | 📐 create-edit-form 原型 |

### AI / 计算任务（模型管理/计算调度）

| 业务动作 | 命中 | 类型 |
|---|---|---|
| 计算任务列表（状态+资源+时间） | `<Table>` + `<AgentStatus>` + `<AgBadge>` | 📐 list-table 原型 |
| 计算任务监控（资源仪表盘） | ECharts + `<AgCard>` + `<AgentStatus>` | 📐 computation-dashboard 原型 |
| 提交计算任务（参数配置） | `<AgCard>` + 表单 + 参数验证 | 📐 create-edit-form 原型 |
| **终止计算任务** 确认 | `<Dialog>` + danger 语义 | ⚠️ 待沉淀为 pattern |
| 模型/Agent 配置页 | 表单 + 参数面板 + 能力选择 | 📐 ai-agent-config 原型 |

### AI 对话（Chat/Agent 交互）

| 业务动作 | 命中 | 类型 |
|---|---|---|
| AI 对话界面（消息流+输入+状态） | 消息气泡组件 + `<AgentStatus>` + `<Input>` | 📐 ai-chat-interface 原型 |
| 工具调用结果展示 | `<CodeBlock>` + `<Accordion>` | 组件范式 |
| Agent 状态切换/监控 | `<AgentStatus status="running/idle/error/paused">` | 组件范式 |

### 分析报告（Dashboard/图表/导出）

| 业务动作 | 命中 | 类型 |
|---|---|---|
| 概览仪表盘（KPI+图表+列表） | `<AgCard>` + ECharts | 📐 dashboard 原型 |
| 分析报告页（图表组合+数据表+导出） | `<AgCard>` + `<Table>` + ECharts | 📐 report-analysis 原型 |
| 数据浏览器（筛选/搜索/批量） | `<Table>` + `<Input>` (search) + 工具栏 | 📐 data-explorer 原型 |

### 设置/配置

| 业务动作 | 命中 | 类型 |
|---|---|---|
| 系统设置页（分区配置） | `<Tabs>` + `<AgCard>` 分区 | 📐 settings-config 原型 |
| 用户/团队管理 | `<Table>` + `<Dialog>` 编辑 | 📐 list-table 原型 |
| 权限管理 | `<Table>` + `<Checkbox>` / `<Switch>` | 📐 settings-config 原型 |

> ⚠️ **标 "待补原型" / "待沉淀"的**：走标准 recipe 流程；做完后**从真实产出萃取补进 page-archetypes / patterns**。
> 这张表是"活的"——每做一类新业务需求，回来补一行。

---

## 校准日志

- **v1.0** (2026-06)：基于 Agentic Genius 设计系统旧版 CSS 类清单 + 化学科研/AI 平台业务场景初版。
- **v2.0** (2026-06)：迁移至 shadcn/ui + AG 扩展组件体系，替换所有旧版 CSS 类引用为组件化写法。详见 `components-v2.md`。
- **后续校准**：随真实 design-craft 使用历史持续补充业务场景行。
