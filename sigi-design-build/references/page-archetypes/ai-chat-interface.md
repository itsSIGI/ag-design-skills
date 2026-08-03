# Archetype: AI Chat Interface / AI 对话界面

**Applies to / 适用**: AI Agent chat interface — message stream + tool calls + input area + optional context sidebar
AI Agent 对话界面——消息流 + 工具调用展示 + 输入区 + 可选上下文侧栏

## Layout Skeleton / 区域骨架

```
┌─────────────────────────────────────────────────────┐
│ ① Top bar: Agent name + status dot + settings       │
│   顶栏：Agent 名 + 状态点 + 设置                     │
├──────────────────────────────┬──────────────────────┤
│ ② Message stream area        │ ③ Context panel      │
│   消息流区域                  │   上下文面板（可选）  │
│                              │                      │
│ [AI] Analysis results...      │ Ref doc 1 / 引用 1   │
│   └ Tool calls (collapsed)   │ Ref doc 2 / 引用 2   │
│   └ Step cards (collapsible) │                      │
│   └ Event lines              │ Team status panel    │
│                              │   团队状态面板        │
│      [User] Please calc... │  │                      │
│                              │                      │
│ [AI] Thinking... ●           │                      │
│                              │                      │
│ [Ask] ⚠ Needs human input   │                      │
│ [Feedback] Continue/Retry    │                      │
│ [SOW] Scope of Work form     │                      │
│                              │                      │
├──────────────────────────────┤                      │
│ ④ Input area / 输入区        │                      │
│    textarea + send button    │                      │
└──────────────────────────────┴──────────────────────┘
```

## Recommended Patterns / 推荐 Pattern

| Pattern | Usage / 用途 |
|---------|-------------|
| `chat-bubble` / `message-bubble` | User and agent message display / 用户和 Agent 消息展示 |
| `step-card` | Agent execution steps with 7-state status / Agent 执行步骤，7 种状态 |
| `tool-activity` | Grouped tool call display / 工具调用分组展示 |
| `thinking-indicator` | Agent thinking animation / Agent 思考动画 |
| `ask-card` | Human intervention request (3 urgency levels) / 人工干预请求（3 级紧急度） |
| `feedback-card` | User feedback selection (continue/retry/alt) / 用户反馈选择 |
| `sow-card` | Scope of Work form card / 工作范围表单卡 |
| `event-line` | Agent-pushed event with severity / Agent 推送事件 |
| `code-block` | Code snippet in messages / 消息中的代码片段 |
| `agent-status` | Agent running status indicator / Agent 运行状态指示 |

## Pseudocode / 伪代码

```tsx
<div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>

  {/* ① Top bar / 顶栏 */}
  <div style={{ padding: 'var(--space-3) var(--space-6)', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <AgentStatus status="running" />
      <Heading level={2}>Chemistry Agent</Heading>
    </div>
    <Button variant="ghost" size="sm">
      <i className="mgc_settings_3_line" aria-label="Settings" />
    </Button>
  </div>

  <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

    {/* ②+④ Left: message stream + input / 左侧：消息流 + 输入 */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

      {/* ② Message stream / 消息流 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>

        {/* AI message / AI 消息 */}
        <div className="chat-bubble chat-bubble--ai">
          <p>Analysis results...</p>
          {/* Tool call group / 工具调用组 */}
          <ToolActivityGroup tools={[...]} />
        </div>

        {/* Step cards / 步骤卡 */}
        <StepCard stepName="Data Preparation" specialist="Chemistry Agent" status="completed" />
        <StepCard stepName="Molecular Analysis" specialist="ML Agent" status="running" />

        {/* Event line / 事件线 */}
        <EventLine actor="Experiment Agent" description="Resubmitted 4 failed RXNs" severity="success" />

        {/* User message / 用户消息 */}
        <div className="chat-bubble chat-bubble--user">
          <p>Please calculate benzene properties</p>
        </div>

        {/* Thinking indicator / 思考指示器 */}
        <ThinkingIndicator seconds={12} phase="Analyzing molecular structure..." />

        {/* Ask card / 人工干预卡 */}
        <AskCard action="Verify RXN conditions" urgency="high" agent="Experiment Agent" />

        {/* Feedback card / 反馈卡 */}
        <FeedbackCard prompt="How should we proceed?" options={[
          { action: 'continue', label: 'Continue' },
          { action: 'retry', label: 'Retry' },
          { action: 'alternative', label: 'Try alternative' },
        ]} />

        {/* SOW card / 工作范围卡 */}
        <SowCard fields={[...]} filledCount={3} totalCount={5} />
      </div>

      {/* ④ Input area / 输入区 */}
      <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-end' }}>
          <Input as="textarea" rows={1} placeholder="Type a message... / 输入消息..." style={{ flex: 1, resize: 'none' }} />
          <Button>
            <i className="mgc_send_line" aria-label="Send" />
          </Button>
        </div>
      </div>
    </div>

    {/* ③ Context panel (optional) / 上下文面板（可选） */}
    <div style={{ width: '300px', borderLeft: '1px solid var(--color-border-subtle)', overflowY: 'auto', padding: 'var(--space-4)' }}>
      <Caption style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>Context / 引用上下文</Caption>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <AgCard>
          <Caption>benzene.mol</Caption>
          <Caption style={{ color: 'var(--color-text-muted)', display: 'block' }}>Molecule file / 分子文件</Caption>
        </AgCard>
      </div>
    </div>
  </div>
</div>
```

## Key Layout Rules / 关键布局规则

| Rule / 规则 | Basis / 依据 |
|------------|-------------|
| AI bubble `.chat-bubble--ai` (left), user `.chat-bubble--user` (right) / AI 左对齐，用户右对齐 | components-v2.md |
| Agent status uses `<AgentStatus status="{running/idle/error}">` (ag-ext) / Agent 状态用 `<AgentStatus>`（ag-ext） | fixed semantic color |
| Tool calls use `ToolActivityGroup` with collapsible code preview / 工具调用用分组折叠 | decision-tables §9 |
| Step cards show agent workflow progress / 步骤卡展示 Agent 工作流进度 | real project pattern |
| Ask cards are the ONLY type that can interrupt user / 只有 Ask 卡可以打断用户 | design constitution |
| Thinking indicator is minimal (single inline row) / 思考指示器最小化（单行内联） | information density |
| Message stream `overflow-y: auto`, input area fixed at bottom / 消息流可滚动，输入区固定底部 | standard chat layout |
| Context panel fixed width `300px`, optional / 上下文面板固定 300px | don't squeeze messages |

## Spacing Rhythm / spacing 节奏

- Message stream padding: `var(--space-6)` (24px)
- Message gap: `var(--space-4)` (16px)
- Input area padding: `var(--space-4)` (16px) top/bottom

---

## assistant-ui 运行时版本

> 当项目需要 streaming / 对话持久化 / 分支对话 / 工具调用执行等运行时能力时，
> 上述静态布局骨架可升级为 assistant-ui 驱动的动态版本。
> 完整指南见 [`assistant-ui-guide.md`](../assistant-ui-guide.md)。

### 升级映射

| 静态版本（上方伪代码） | assistant-ui 版本 |
|----------------------|------------------|
| 外层 `<div>` flex 布局 | `<AssistantRuntimeProvider runtime={runtime}>` 包裹 |
| 消息流 `<div>` + 手动 map | `<ThreadPrimitive.Root>` + `<ThreadPrimitive.Messages>` |
| `chat-bubble--ai/user` div | `<MessagePrimitive.Root>` + `<MessagePrimitive.If user\|assistant>` |
| `<ThinkingIndicator>` | `<ChainOfThoughtPrimitive.Root>` + `<ChainOfThoughtPrimitive.Content>` |
| `<ToolActivityGroup>` | `makeAssistantToolUI` 注册自定义工具 UI |
| `<AskCard>` | `humanTool` / `hitlTool` |
| `<Input>` + `<Button>` Send | `<ComposerPrimitive.Root>` + `.Input` + `.Send` |
| `<AgentStatus>` | `useThread` → `thread.isRunning` 推导状态 + `<AgentStatus>` 展示 |

### 伪代码（assistant-ui 版本）

```tsx
import { AssistantRuntimeProvider, useLocalRuntime } from '@assistant-ui/react';
import { ThreadPrimitive, MessagePrimitive, ComposerPrimitive } from '@assistant-ui/react';

function ChatPage() {
  const runtime = useLocalRuntime(myModelAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
        {/* ① Top bar — 与静态版本相同 */}
        {/* ... */}

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* ②+④ Thread + Composer */}
          <ThreadPrimitive.Root className="flex-1 flex flex-col">
            <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto px-[var(--space-6)] py-[var(--space-4)]">
              <ThreadPrimitive.Messages
                components={{
                  UserMessage: AgUserMessage,
                  AssistantMessage: AgAssistantMessage,
                }}
              />
            </ThreadPrimitive.Viewport>

            {/* ④ Composer */}
            <ComposerPrimitive.Root className="flex gap-[var(--space-3)] items-end p-[var(--space-4)] border-t border-[var(--color-border-subtle)]">
              <ComposerPrimitive.Input
                className="flex-1 resize-none bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)]"
                placeholder="输入消息..."
              />
              <ComposerPrimitive.Send asChild>
                <Button><i className="mgc_send_line" /></Button>
              </ComposerPrimitive.Send>
            </ComposerPrimitive.Root>
          </ThreadPrimitive.Root>

          {/* ③ Context panel — 与静态版本相同 */}
          {/* ... */}
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}
```

### 何时升级

- **保持静态版本**：纯展示型、无后端 AI 接口、demo/原型页面
- **升级 assistant-ui**：接入真实 AI 后端、需要 streaming、需要工具调用、需要对话历史管理
