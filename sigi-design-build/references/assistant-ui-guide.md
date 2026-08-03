# assistant-ui 集成指南

> assistant-ui 是基于 Radix primitives 的 AI 聊天运行时 + headless 组件库。
> 与 shadcn/ui 同源体系，可无缝消费 AG token 皮肤。
> 本文件定义 **何时用**、**怎么装**、**如何与 AG 体系配合**。

---

## 何时使用 assistant-ui

### 触发条件（满足任一即推荐）

| 信号 | 说明 |
|------|------|
| 消息 streaming | 需要实时打字机效果、流式输出中间态 |
| 对话持久化 | 消息历史存储、会话恢复、多线程管理 |
| 对话分支 | 用户可编辑历史消息并重新生成（branching） |
| 工具调用执行 | Agent 调用外部 API/函数，需展示调用状态和结果 |
| 附件处理 | 消息附带文件上传、图片、文档引用 |
| Human-in-the-loop | Agent 请求人工确认/决策 |
| 多 Agent 协作 | 多个 Agent 在同一线程中交替响应 |

### 不需要 assistant-ui 的场景

| 场景 | 替代方案 |
|------|---------|
| 纯静态消息展示（展示历史对话） | 用现有 pattern blocks（chat-bubble / message-bubble） |
| 简单的单次问答（无 streaming） | `<Input>` + `<Button>` + 手动 fetch |
| Agent 状态指示器 | `<AgentStatus>`（AG 扩展组件） |
| 代码片段展示 | `<CodeBlock>`（AG 扩展组件） |

---

## 安装

```bash
# 核心包（必装）
pnpm add @assistant-ui/react

# Markdown 渲染（二选一）
pnpm add @assistant-ui/react-markdown    # 标准 markdown 渲染
pnpm add @assistant-ui/react-streamdown  # streaming 打字机 markdown（推荐）

# AI SDK 适配（按后端选择）
pnpm add @assistant-ui/react-ai-sdk ai   # Vercel AI SDK
# 或直接用 useLocalRuntime + ChatModelAdapter 自定义接入
```

### 依赖关系

```
@assistant-ui/react          ← 核心：primitives + runtime hooks
  ├── @assistant-ui/core     ← 运行时引擎（框架无关）
  ├── @assistant-ui/store    ← 状态管理
  ├── @radix-ui/*            ← 共享 Radix 基础（与 shadcn 相同）
  └── assistant-stream       ← streaming 协议
```

---

## 核心概念

### Primitives（headless 组件）

assistant-ui 的 UI 层全部是 headless primitive——只提供行为绑定和 ARIA，不带样式。用 Tailwind + AG token 做皮肤。

| Primitive | 用途 | AG 对应 |
|-----------|------|--------|
| `ThreadPrimitive` | 整个对话容器：消息列表 + 自动滚动 + 空状态 | ai-chat-interface 原型的 ②+④ 区域 |
| `MessagePrimitive` | 单条消息：自动区分 user/assistant、条件渲染 | chat-bubble / message-bubble pattern |
| `MessagePartPrimitive` | 消息内容块：text / reasoning / tool-call / image | — |
| `ComposerPrimitive` | 输入区：auto-resize textarea + 发送 + 附件 + 快捷键 | Input + Send button |
| `ActionBarPrimitive` | 消息操作栏：copy / edit / reload / speech | message-bubble 的 meta actions |
| `BranchPickerPrimitive` | 对话分支选择：上一版本 / 下一版本 | AG 无对应（新能力） |
| `ChainOfThoughtPrimitive` | 思考过程：折叠/展开 + streaming | thinking-indicator pattern |
| `ThreadListPrimitive` | 会话列表：多线程管理 | AG 无对应（新能力） |
| `ThreadListItemPrimitive` | 会话列表项：标题 + 时间 + 操作 | AG 无对应（新能力） |
| `SuggestionPrimitive` | 建议回复：预设快捷响应 | AG 无对应（新能力） |
| `AttachmentPrimitive` | 附件展示：文件名 + 类型 + 预览 | message-bubble 的 attachment slot |
| `ErrorPrimitive` | 错误状态：消息发送失败 / runtime 异常 | AG 无对应 |
| `AssistantModalPrimitive` | 浮动聊天窗口：可折叠的 assistant 面板 | AG 无对应 |

### Runtime（运行时）

| Runtime Hook | 适用场景 |
|-------------|---------|
| `useLocalRuntime` | 前端直连 AI API（开发/原型验证） |
| `useExternalStoreRuntime` | 自定义消息存储（已有后端 API） |
| `useAssistantTransportRuntime` | assistant-ui Cloud 协议 |

### Adapters（适配器）

| Adapter | 用途 |
|---------|------|
| `ChatModelAdapter` | 接入 AI 后端：定义 `run()` 方法处理消息→响应 |
| `AttachmentAdapter` | 文件上传处理 |
| `FeedbackAdapter` | 用户反馈（点赞/点踩） |
| `SuggestionAdapter` | 建议回复生成 |

### 工具调用

| API | 用途 | AG 对应 |
|-----|------|--------|
| `useAssistantTool` / `makeAssistantTool` | 注册可执行工具 | tool-activity pattern |
| `makeAssistantToolUI` | 自定义工具调用 UI | tool-activity 的代码预览 |
| `humanTool` / `hitlTool` | Human-in-the-loop 工具 | ask-card pattern |

---

## AG Pattern → assistant-ui Primitive 映射

> 核心原则：**现有 pattern blocks 提供视觉参考**（布局、间距、配色），
> **assistant-ui primitives 提供运行时骨架**，
> **AG token + Tailwind 做样式覆盖**。

| AG Pattern Block | assistant-ui Primitive | 映射说明 |
|-----------------|----------------------|---------|
| `chat-bubble.tsx` | `MessagePrimitive.Root` + `.Content` | primitive 自动区分 user/assistant，通过 `MessagePrimitive.If` 条件渲染 |
| `message-bubble.tsx` | `MessagePrimitive.Root` + `.Content` + `ActionBarPrimitive` | 增强版：附件 → `AttachmentPrimitive`，操作 → `ActionBarPrimitive` |
| `thinking-indicator.tsx` | `ChainOfThoughtPrimitive.Root` + `.Content` | 内置 streaming 展开/折叠 + 滚动锁定 |
| `tool-activity.tsx` | `makeAssistantToolUI` + `MessagePartPrimitive` (tool-call) | 工具调用 UI 自动与运行时绑定 |
| `code-block.tsx` | Markdown 渲染器自定义 `code` 组件 | 把 AG `<CodeBlock>` 注册为 markdown code 渲染器 |
| `step-card.tsx` | 多 `makeAssistantToolUI` 组合 | 每个 step 对应一个 tool call |
| `ask-card.tsx` | `humanTool` / `hitlTool` | 运行时自动暂停等待用户输入 |
| `feedback-card.tsx` | `FeedbackAdapter` | 通过 adapter 接口上报反馈 |
| `event-line.tsx` | `MessagePrimitive` (system role) | 系统消息作为独立消息渲染 |
| `sow-card.tsx` | `makeAssistantToolUI` (custom) | SOW 表单作为工具调用 UI |
| `agent-status.tsx` | `useThread` → `thread.isRunning` | 从运行时状态推导，用 `<AgentStatus>` 展示 |
| Input + Send | `ComposerPrimitive.Root` + `.Input` + `.Send` | 自带 auto-resize、Enter 发送、附件拖放 |
| 无对应 | `BranchPickerPrimitive` | **新能力**：对话分支导航 |
| 无对应 | `ThreadListPrimitive` | **新能力**：多会话管理 |
| 无对应 | `SuggestionPrimitive` | **新能力**：建议快捷回复 |

---

## AG Token 皮肤化

assistant-ui primitives 不带样式。用 Tailwind className + AG token 变量做皮肤：

### Thread 容器

```tsx
<ThreadPrimitive.Root className="flex flex-col h-full bg-[var(--color-bg)]">
  <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto px-[var(--space-6)] py-[var(--space-4)]">
    <ThreadPrimitive.Messages />
    <ThreadPrimitive.ViewportFooter className="sticky bottom-0" />
  </ThreadPrimitive.Viewport>
</ThreadPrimitive.Root>
```

### 消息气泡

```tsx
{/* User 消息 */}
<MessagePrimitive.Root className="flex justify-end mb-[var(--space-4)]">
  <div className="max-w-[85%] rounded-[var(--radius-lg)] bg-[var(--color-bubble-user-bg)] text-[var(--color-bubble-user-text)] px-[var(--space-3)] py-[var(--space-2)]">
    <MessagePrimitive.Content />
  </div>
</MessagePrimitive.Root>

{/* Assistant 消息 */}
<MessagePrimitive.Root className="mb-[var(--space-4)]">
  <div className="text-[var(--color-text-primary)] leading-relaxed">
    <MessagePrimitive.Content />
  </div>
</MessagePrimitive.Root>
```

### 输入区

```tsx
<ComposerPrimitive.Root className="flex gap-[var(--space-3)] items-end p-[var(--space-4)] border-t border-[var(--color-border-subtle)]">
  <ComposerPrimitive.Input
    className="flex-1 resize-none bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]"
    placeholder="输入消息..."
  />
  <ComposerPrimitive.Send asChild>
    <Button size="icon">
      <i className="mgc_send_line" />
    </Button>
  </ComposerPrimitive.Send>
</ComposerPrimitive.Root>
```

### 操作栏

```tsx
<ActionBarPrimitive.Root className="flex gap-[var(--space-1)] mt-[var(--space-2)]">
  <ActionBarPrimitive.Copy asChild>
    <Button variant="ghost" size="icon" />
  </ActionBarPrimitive.Copy>
  <ActionBarPrimitive.Edit asChild>
    <Button variant="ghost" size="icon" />
  </ActionBarPrimitive.Edit>
  <ActionBarPrimitive.Reload asChild>
    <Button variant="ghost" size="icon" />
  </ActionBarPrimitive.Reload>
</ActionBarPrimitive.Root>
```

### 思考过程

```tsx
<ChainOfThoughtPrimitive.Root>
  <Accordion type="single" collapsible>
    <AccordionItem value="thinking">
      <AccordionTrigger>
        <Caption className="text-[var(--color-text-muted)]">思考中...</Caption>
      </AccordionTrigger>
      <AccordionContent>
        <ChainOfThoughtPrimitive.Content className="text-[length:var(--font-size-small)] text-[var(--color-text-secondary)] leading-relaxed" />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</ChainOfThoughtPrimitive.Root>
```

---

## Recipe 登记方式

在 craft Step 1 recipe 表中：

| 字段 | 值 |
|------|---|
| `source` / 来源 | `assistant-ui` |
| `ag_class` / 组件 | primitive 名（如 `MessagePrimitive`）或 hook 名（如 `useAssistantTool`） |
| `token_refs` | 消费的 AG token（如 `var(--color-bubble-user-bg)`） |
| `notes` | 标注 runtime 类型（local / external-store） |
| 验证来源 | `assistant-ui-guide.md ✓` |

示例 recipe 行：

| Slot | 组件类型 | 来源 | 组件 | Token 引用 | 验证来源 | 备注 |
|------|---------|------|------|-----------|---------|------|
| 消息流 | Thread | assistant-ui | `ThreadPrimitive` + `MessagePrimitive` | --color-bg, --color-bubble-* | assistant-ui-guide.md ✓ | useLocalRuntime |
| 输入区 | Composer | assistant-ui | `ComposerPrimitive` | --color-surface, --color-border-subtle | assistant-ui-guide.md ✓ | auto-resize |
| 思考展示 | ChainOfThought | assistant-ui | `ChainOfThoughtPrimitive` + `<Accordion>` | --color-text-muted | assistant-ui-guide.md ✓ | streaming |
| 工具调用 | ToolUI | assistant-ui | `makeAssistantToolUI` | --color-code-bg | assistant-ui-guide.md ✓ | 自动绑定 runtime |

---

## 与现有 pattern blocks 的关系

现有 10 个 AI 聊天 pattern blocks **不废弃**——它们在两种场景下继续有价值：

1. **视觉参考**：pattern blocks 定义了 AG 体系下聊天 UI 的布局、间距、配色标准。使用 assistant-ui 时，皮肤化样式应参考对应 pattern block 的视觉规范。

2. **不需要 runtime 时直接使用**：纯展示型场景（如展示历史对话记录、静态 demo 页面）不需要 assistant-ui 的运行时能力，直接使用 pattern blocks 更轻量。

### 对照表

| 场景 | 用什么 |
|------|-------|
| 实时 AI 对话（streaming + 交互） | assistant-ui primitives + AG token 皮肤 |
| 静态对话展示 | 现有 pattern blocks |
| Agent 状态指示 | `<AgentStatus>`（AG 扩展组件，不依赖 assistant-ui） |
| 代码高亮展示 | `<CodeBlock>`（AG 扩展组件，可注册为 assistant-ui markdown 渲染器） |

---

## 6 条铁律在 assistant-ui 下的适用

| 铁律 | assistant-ui 下的执行方式 |
|------|-------------------------|
| Reference BEFORE Implement | 查本文件确认 primitive 存在后再用，不凭记忆猜 API |
| Recipe 是契约 | assistant-ui 组件必须在 recipe 中标注来源 `assistant-ui` |
| 业务层零硬编码 | primitive 的 className 只用 `var(--*)` token 和 Tailwind utility |
| 品牌蓝/绿只在三处 | assistant-ui 皮肤中同样遵循——链接 hover / agent 状态 / 代码高亮 |
| 字重上限 600 | 消息文本、标题等排版遵循 AG 排版组件规范 |
| 焦点环中性色 | ComposerPrimitive.Input 的 focus ring 用 `var(--color-focus-ring)` |
