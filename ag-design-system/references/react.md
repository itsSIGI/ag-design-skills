# React 用法示例

> **形式：shadcn/ui 组件 + Tailwind utility + AG token**。
> 组件使用 shadcn/ui 标准组件（`components/ui/`）和 AG 扩展组件（`components/ag/`），
> 通过 Tailwind utility classes 配合 `var(--*)` token 做定制。
> 详细组件清单和用法见 `references/components-v2.md`。

## 接入（一次）

```tsx
// 入口（如 main.tsx / App.tsx）import 一次即可全局生效
import "./styles/tokens.css";      // 复制自 assets/tokens.css
```

切换主题：在 `<html>` 上设 `data-theme`：
```tsx
document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
// 不设则跟随系统 prefers-color-scheme
```

## 静态组件：直接写 className

```tsx
<button className="ag-btn ag-btn--primary">开始对话</button>
<button className="ag-btn ag-btn--secondary ag-btn--compact">取消</button>
<input className="ag-input" placeholder="you@example.com" />

<div className="ag-card ag-card--contained is-clickable">
  <h3 className="ag-card__title">项目卡</h3>
  <p className="ag-card__desc">默认 Contained 变体。</p>
</div>

<span className="ag-tag ag-tag--success">ACTIVE</span>
```

## 带 variant 的薄封装（可选，提升复用）

只是把 className 拼接收口，**不重写样式**：

```tsx
type BtnVariant = "primary" | "secondary" | "ghost" | "danger";

function Button({
  variant = "primary",
  compact,
  className = "",
  ...props
}: { variant?: BtnVariant; compact?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = ["ag-btn", `ag-btn--${variant}`, compact && "ag-btn--compact", className]
    .filter(Boolean).join(" ");
  return <button className={cls} {...props} />;
}

// 用法
<Button variant="danger">删除</Button>
```

## 交互态：用 state 切换 .is-* class

**Switch（即时开关）**
```tsx
function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch" aria-checked={checked} aria-label={label}
      className={`ag-switch ${checked ? "is-on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="ag-switch__thumb" />
    </button>
  );
}
```

**Tabs**
```tsx
function Tabs({ items }: { items: { key: string; label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = React.useState(items[0].key);
  return (
    <div className="ag-tabs">
      <div className="ag-tabs__list" role="tablist">
        {items.map((t) => (
          <button key={t.key} role="tab" aria-selected={active === t.key}
            className={`ag-tab ${active === t.key ? "is-active" : ""}`}
            onClick={() => setActive(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="ag-tabs__panel" role="tabpanel">
        {items.find((t) => t.key === active)?.content}
      </div>
    </div>
  );
}
```

**Modal（含遮罩 + Esc 关闭 + 点击遮罩关闭）**
```tsx
function Modal({ open, onClose, title, children, footer }: {
  open: boolean; onClose: () => void; title: string;
  children: React.ReactNode; footer?: React.ReactNode;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="ag-overlay" onClick={onClose}>
      <div className="ag-modal" role="dialog" aria-modal="true"
        onClick={(e) => e.stopPropagation()}>
        <div className="ag-modal__header">
          <h2 className="ag-modal__title">{title}</h2>
          <button className="ag-btn ag-btn--ghost ag-icon-btn" aria-label="关闭" onClick={onClose}>✕</button>
        </div>
        <div className="ag-modal__body">{children}</div>
        {footer && <div className="ag-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
```

**Accordion**
```tsx
function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`ag-accordion__item ${open ? "is-open" : ""}`}>
      <button className="ag-accordion__trigger" aria-expanded={open} onClick={() => setOpen(!open)}>
        {title} <span className="ag-accordion__icon" aria-hidden>▾</span>
      </button>
      {open && <div className="ag-accordion__panel">{children}</div>}
    </div>
  );
}
```

## 约束（与 checklist.md 一致）

- ❗ 只用 className 引用已有类，**不要在 React 里写 inline style 色值或 styled-components 硬编码**——否则脱离 token 体系、无法换肤。
- 需要动态值（如 slider 百分比、progress 宽度）才用 inline `style`，且只用于布局尺寸，不用于颜色。
- 产出后对照 `references/checklist.md` 自检。
