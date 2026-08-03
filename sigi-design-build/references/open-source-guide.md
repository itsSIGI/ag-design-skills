# 开源组件 Token 化包装指南

> AG 设计系统现基于 **shadcn/ui**（提供 Button / Input / Select / Checkbox / RadioGroup / Switch / Dialog / Sheet / Tabs / Tooltip / DropdownMenu / Table 等）和 **AG 扩展组件**（AgCard / AgBadge / AgentStatus / CodeBlock / AgLink / EmptyState / 排版组件等）。
> 复杂场景（DatePicker / Upload / Steps / Charts / 分子可视化 / 代码编辑器）仍需引入开源组件。
> 本文件定义如何包装开源组件使其视觉上"融入" AG 设计系统。

---

## 核心原则

1. **外包内不侵** — 用 `<AgCard>` 或其他 AG 扩展组件包裹开源组件，提供外观一致性。不深入覆盖开源组件的内部 CSS（容易在版本升级时崩溃）。
2. **Token 化边界** — 开源组件与 AG 设计系统的接触面仅在以下 token：
   - 容器：背景色 `var(--color-surface)` / `var(--color-bg)`
   - 边框：`var(--color-border-subtle)` / `var(--color-border-strong)`
   - 文本：`var(--color-text-primary)` / `var(--color-text-secondary)`
   - 圆角：`var(--radius-sm)` ~ `var(--radius-md)`
   - 间距：`var(--space-*)` 系列
3. **Recipe 登记** — 开源组件必须在 Step 1 recipe 中显式标注来源（`开源-<库名>`），不允许在 Step 3 悄悄引入。

---

## 推荐组件库

> **注意**：Dialog / Tabs / Select / Drawer / Popover / Dropdown 等常用 UI 组件已由 shadcn/ui 原生提供，无需再引入外部库。以下仅列出 shadcn/ui + AG 扩展组件**未覆盖**的场景。

| 场景 | 推荐库 | 备注 |
|------|--------|------|
| 日期/时间选择 | react-day-picker | shadcn/ui DatePicker 基于此库 |
| 文件上传 | react-dropzone | — |
| 图表/数据可视化 | Apache ECharts | 内部配色可直接用 tokens.md 原始色阶 hex |
| 表格（复杂功能：排序/筛选/虚拟滚动） | TanStack Table | 简单表格用 shadcn `<Table>` |
| Steps / Progress（复杂多步骤） | Ant Design Steps | 简单进度用 shadcn 原生组件 |
| 分子可视化（2D） | RDKit.js / Ketcher | — |
| 分子可视化（3D） | 3Dmol.js / NGL Viewer | — |
| 代码编辑器 | Monaco Editor / CodeMirror | 纯展示用 AG 扩展 `<CodeBlock>` |
| Markdown 渲染 | react-markdown / markdown-it | — |
| AI 聊天界面（streaming + 工具调用 + 对话管理） | @assistant-ui/react | headless primitives + runtime，详见 [`assistant-ui-guide.md`](assistant-ui-guide.md) |

---

## 包装模式

### 模式 A：外层容器包装（推荐）

最简单、最稳定。给开源组件套一个 `<AgCard>` 容器。

```tsx
// ✅ 正确：用 <AgCard> 包装 3Dmol viewer
<AgCard style={{ height: '400px' }}>
  <Heading level={3} style={{ marginBottom: 'var(--space-3)' }}>
    分子结构
  </Heading>
  <div ref={viewerRef} style={{ height: '340px' }} />
</AgCard>
```

### 模式 B：CSS 变量注入

对于支持 CSS 变量 / theme 配置的组件库（如 Ant Design 5.x），通过 ConfigProvider 注入 AG token。

```tsx
// ✅ 正确：Ant Design ConfigProvider 注入 AG token
<ConfigProvider
  theme={{
    token: {
      colorPrimary: 'var(--color-primary-bg)',
      colorBgContainer: 'var(--color-bg)',
      colorBorder: 'var(--color-border-subtle)',
      colorText: 'var(--color-text-primary)',
      colorTextSecondary: 'var(--color-text-secondary)',
      borderRadius: 6, // --radius-sm
      fontFamily: 'var(--font-sans)',
    },
  }}
>
  <DatePicker />
</ConfigProvider>
```

### 模式 C：选择性样式覆盖

对于不支持 theme 配置的组件，通过最小化 CSS 覆盖关键样式。

```css
/* ✅ 正确：最小化覆盖，只改关键触点 */
.wrapped-steps .ant-steps-item-title {
  color: var(--color-text-primary) !important;
  font-family: var(--font-sans) !important;
  font-weight: var(--weight-medium) !important;
}

.wrapped-steps .ant-steps-item-icon {
  border-color: var(--color-border-strong) !important;
  background: var(--color-surface) !important;
}
```

---

## 禁止事项

| ❌ 不允许 | ✅ 替代方案 | 原因 |
|---------|-----------|------|
| 全量覆盖开源组件内部样式 | 模式 A（外层包装）或 模式 B（变量注入） | 版本升级会崩 |
| 在业务代码中为开源组件写裸 hex | 用 `var(--color-*)` | token 合规 |
| 混用多个 UI 组件库 | 统一用 shadcn/ui + AG 扩展组件 | 视觉不一致 |
| 在 recipe 中不标注开源组件来源 | 标注 `开源-<库名>` | 偏离追溯 |
| 开源组件的 focus 用蓝色 | 覆盖为 `var(--color-focus-ring)` | AG 焦点环用中性色 |
| 用开源库实现 shadcn 已覆盖的组件 | 直接用 shadcn/ui 组件 | 避免重复依赖 |

---

## ECharts 专用规则

ECharts 是唯一允许在 `option` 对象内直接使用 hex 值的场景（因为 ECharts 不支持 CSS 变量）。

**取色规则**：
- 从 `tokens.md` 的原始色阶取值（中性 N 系列 / 信号色 / 装饰色）
- 不自创色值
- 图表背景透明（由外层 `<AgCard>` 控制背景）

```tsx
// ✅ 正确：ECharts 配色从 tokens.md 取
const option = {
  color: ['#0F1729', '#667085', '#CDD4DF', '#123AFF', '#00BF74'],
  // ...
};
```

**容器规则**：
- 外层用 `<AgCard>` 包装
- 声明固定像素高度
- 标题用 `<Heading>` 或 `<Body>` 排版组件

---

## 暗色模式注意

开源组件的暗色适配策略：

1. **模式 A**：外层 `<AgCard>` 自动适配暗色（AG 扩展组件已处理主题切换）
2. **模式 B**：ConfigProvider 中用 `var(--color-*)` 引用，自动跟随主题
3. **模式 C**：CSS 覆盖中用 `var(--color-*)` 引用，自动跟随主题
4. **ECharts**：需要通过 JS 读取当前主题（`data-theme` 属性）切换色值，或统一使用两套主题都能接受的中性色
