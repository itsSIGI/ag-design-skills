# Token 选择规则 — Agentic Genius

本文件提炼 AG 设计系统中与设计决策最相关的 token 规则，供 Agent 在把设计判断落到工程表达时使用。

---

## 1. 总规则

- 所有视觉值必须走 `var(--*)` 语义变量或 shadcn/AG 组件，业务层零硬编码
- 决策顺序固定为：
  1. 先选语义角色
  2. 再选对应 token
  3. 最后才回退到原始色阶（仅装饰用途）
- 默认不写 Hex / RGB / HSL
- 若必须突破 token，先写注释 `/* TOKEN_ESCAPE: [具体原因] */`

---

## 2. 颜色映射顺序

### 2.1 优先级链

```
语义变量（--color-*）  →  状态变量（--color-status-*）  →  原始色阶（--n*, --signal-*）
     ↑ 优先                                                        ↓ 最后回退
```

### 2.2 文本色

| 用途 | Token | 说明 |
|------|-------|------|
| 主文本 | `--color-text-primary` | 标题、正文、关键数据 |
| 副文本 | `--color-text-secondary` | 辅助说明、时间戳 |
| 占位/禁用 | `--color-text-muted` | placeholder、disabled 态 |
| 主按钮字 | `--color-primary-text` | 黑底白字 / 白底黑字（暗色翻转） |

### 2.3 背景色

| 用途 | Token | 说明 |
|------|-------|------|
| 页面底 | `--color-bg` | 纯白 / 深蓝黑 |
| 卡片/输入底 | `--color-surface` | 微灰 |
| 浮层/弹窗 | `--color-surface-elevated` | 高于 surface |
| hover 底 | `--color-surface-hover` | 鼠标悬停 |

### 2.4 边框色

| 用途 | Token | 说明 |
|------|-------|------|
| 卡片边/分割线 | `--color-border-subtle` | 浅分割 |
| 输入框/悬停边 | `--color-border-strong` | 明确边界 |

### 2.5 焦点与选中（关键！）

| 用途 | Token | 说明 |
|------|-------|------|
| **焦点环** | `--color-focus-ring` | **中性色**（N1000/白），**不是品牌蓝** |
| **选中态** | `--color-selected` | **中性色**，**不是品牌蓝** |
| 链接 hover | `--color-link-hover` | 唯一品牌蓝的控件用途 |

### 2.6 语义状态色

| 状态 | 背景 | 文本 |
|------|------|------|
| 默认 | `--color-status-default-bg` | `--color-status-default-text` |
| 信息 | `--color-status-info-bg` | `--color-status-info-text` |
| 成功 | `--color-status-success-bg` | `--color-status-success-text` |
| 警告 | `--color-status-warning-bg` | `--color-status-warning-text` |
| 错误 | `--color-status-error-bg` | `--color-status-error-text` |

**严格绑定**：成功≠蓝、错误≠黄，不可交换。

### 2.7 Agent 状态色（固定语义）

| 状态 | Token | 颜色 |
|------|-------|------|
| 待响应 | `--color-agent-idle` | 蓝 |
| 运行中 | `--color-agent-running` | 绿（带 pulse） |
| 已完成 | `--color-agent-completed` | 绿 |
| 错误 | `--color-agent-error` | 红 |
| 暂停 | `--color-agent-paused` | 灰 |

### 2.8 品牌蓝/绿限用规则

品牌蓝 `--signal-blue` (#123AFF) 和品牌绿 `--signal-green` (#00BF74) **只在三处**使用：

1. 链接 hover（`--color-link-hover`）
2. Agent 状态点（`--color-agent-*`）
3. 代码高亮（`--color-code-*`）

其他任何地方出现品牌蓝/绿 → **红线违规**。

---

## 3. 间距选择

### 3.1 从 `--space-*` 取值

| Token | 值 | 典型用途 |
|-------|-----|---------|
| `--space-1` | 4px | 图标与文字微间距 |
| `--space-2` | 8px | 紧凑列表项间距 |
| `--space-3` | 12px | 表单字段间 |
| `--space-4` | 16px | 默认 padding |
| `--space-6` | 24px | 卡片内 padding |
| `--space-8` | 32px | 区块间距 |
| `--space-12` | 48px | 大区域分隔 |

### 3.2 特殊间距

- 图标+文字：`--space-icon-text`（6px）
- 禁止裸数字 padding/margin/gap

---

## 4. 圆角选择

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-none` | 0 | Agent 气泡 |
| `--radius-xs` | 4px | Tag |
| `--radius-sm` | 6px | **默认**：按钮、输入框、代码块 |
| `--radius-md` | 8px | 卡片 |
| `--radius-lg` | 12px | Modal、用户气泡 |
| `--radius-xl` | 16px | 大 feature 卡 |
| `--radius-full` | 9999px | 圆点、头像、pill |

**铁律**：嵌套元素 radius ≤ 父元素 radius。

---

## 5. 阴影选择

| Token | 用途 |
|-------|------|
| `--shadow-card` | 默认卡片 |
| `--shadow-whisper` | 浮起 feature 卡（暗色降级为 1px 边框） |
| `--shadow-modal` | 弹窗 / popover |
| `--shadow-inset` | 按下 / disabled 容器 |
| `--ring-contained` | Ring 卡片普通态 |
| `--ring-selected` | Ring 卡片选中态 |

焦点环不在阴影系统：用 `outline: 2px solid var(--color-focus-ring)` + offset 2px。

---

## 6. 排版选择

### 6.1 决策顺序

1. 先判文本语义：标题？正文？强调？
2. 选对应排版组件（`<Display>` / `<Heading>` / `<Body>` 等）
3. 仅组件无法满足时才组合 `var(--font-size-*)` + `var(--weight-*)`

### 6.2 字号排版组件

| 组件 | 字号 | 用途 |
|------|------|------|
| `<Display>` | 36px | 页面大标题 |
| `<PageTitle>` | 28px | 页面标题 |
| `<Heading>` | 22px | 区块标题 |
| `<Subheading>` | 18px | 子区块标题 |
| `<BodyLg>` | 16px | 大号正文 |
| `<Body>` | 15px | 默认正文 |
| `<Small>` | 13px | 辅助文本 |
| `<Caption>` | 12px | 说明文字 |
| `<Micro>` | 11px | 徽章、极小标签 |

### 6.3 字重规则

| Token | 值 | 用途 |
|-------|-----|------|
| `--weight-regular` | 400 | 正文 |
| `--weight-medium` | 500 | 按钮、导航、链接 |
| `--weight-bold` | 600 | 标题（**上限**） |

**禁止 700**。需要更强对比 → 改字号或加负字距，不加粗。

大标题（≥22px）带 `letter-spacing: -0.01em ~ -0.02em`。

---

## 7. 快速决策查表

当面临"该用什么"的选择时，按以下顺序速查：

| 决策 | 第一选择 | 回退 |
|------|---------|------|
| 背景色 | `--color-bg` / `--color-surface` | 原始色阶装饰色 |
| 文本色 | `--color-text-primary/secondary/muted` | — |
| 按钮色 | 中性黑白（Primary）/ 中性灰（Secondary） | 红色仅 Danger |
| 焦点态 | `--color-focus-ring`（中性） | — |
| 间距 | `--space-4`（16px 默认） | 按 4px 网格调整 |
| 圆角 | `--radius-sm`（6px 默认） | 按场景查 §4 |
| 阴影 | `--shadow-card`（默认） | 按层级查 §5 |
| 字重 | 400 正文 / 500 按钮 / 600 标题 | — |

---

## 8. 禁止清单

- 无声明的硬编码色值
- 手写 `:focus` / `:hover` 覆盖 shadcn/AG 组件内置态
- 用固定高度压缩文案容器
- 把原始色阶当第一选择（应最后回退）
- 品牌蓝用于焦点环、选中态、按钮填充
- 字重 700
- 自定义圆角 / 阴影（不从 token 取）
- 非白名单图标库（白名单：MingCute / Lucide）/ 手写 SVG 图标
- Web Font / Google Fonts
