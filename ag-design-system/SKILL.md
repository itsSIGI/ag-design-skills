---
name: ag-design-system
description: Agentic Genius 品牌设计系统——一键换肤的 design token + 成品组件库。当用户基于 Agentic Genius 规范开发 UI、需要让颜色/排版/组件符合该设计系统、为项目接入这套设计 token（换肤）、或生成符合"开发者优先·中性色主导"风格的界面时使用。涵盖按钮、输入框、Select、搜索、表单控件、卡片、导航、Agent 状态点、代码块、Chat 气泡、链接、Tag 等全部组件，含 light/dark 双模式与硬性达标自检清单。
---

# Agentic Genius Design System

让任意项目（React / Vue / 原生均可）接入 Agentic Genius 品牌规范，实现"一键换肤"：
颜色、排版、圆角、阴影、间距全部收敛为 design token，组件预写好直接复制。
核心理念——**中性色主导，品牌蓝/绿仅在三处出现，焦点环用中性色**。

## 核心机制：双层组件 + Token 皮肤

| 文件 | 作用 | 何时用 |
|---|---|---|
| `assets/tokens.css` | **唯一事实源**——所有设计变量（含 light/dark）。换肤只改这里 | 接入时复制 + import |
| `references/tokens.md` | token 速查表（语义变量→值） | 取色值/字号/间距时读 |
| `references/components-v2.md` | shadcn/ui 标准组件 + AG 扩展组件的用法/状态/约束/示例代码 | 做某个具体组件时读 |
| `references/react.md` | React 用法（shadcn 组件 + Tailwind utility + 交互态） | 目标项目是 React 时读 |
| `references/vue.md` | Vue 用法（class 型 + 交互态） | 目标项目是 Vue 时读 |
| `references/checklist.md` | **达标自检清单**（防错核心） | 产出任何 UI 后逐条核对 |

## 换肤工作流（2 步）

1. **建立 token 层**：把 `assets/tokens.css` 复制进目标项目并全局 import。这一步就完成了"换肤"——页面底色、文本色、组件配色全部就位，并自带 light/dark。
2. **使用组件**：通过 shadcn/ui 标准组件（`components/ui/`）和 AG 扩展组件（`components/ag/`）构建 UI，配合 Tailwind utility classes 和 `var(--*)` token 定制样式。产出后对照 `references/checklist.md` 自检。

> 框架适配：Token 是基座，框架无关。React 用 shadcn/ui 组件（`<Button variant="primary">`）+ Tailwind utility；
> Vue 用 class 型组件；交互态（`.is-open`/`.is-on`/`.is-selected` 等）由框架状态切换，纯 hover/focus 已由组件内部处理。
> **目标项目是 React/Vue 时，读 `references/react.md` / `references/vue.md`** 获取组件封装与交互态写法。
> 切换主题：在 `<html>` 上设 `data-theme="dark"` 或 `data-theme="light"`，不设则跟随系统。

## 核心约束（6 条红线，必须遵守）

这些是最高频的翻车点，正文直接列出，无需翻文档：

0. **禁止手写视觉值（总铁律）**：业务 UI 里的颜色、`:focus`/`:hover` 态、背景、边框、圆角、阴影、字重，一律走 shadcn/AG 组件或 `var(--*)` token，**绝不自己写一套**。交互态已内置在 shadcn/AG 组件里——手写 `:focus`（尤其蓝色 focus）= 直接违规。想要的效果 skill 里一定有，找不到就**停下来问，不许造值**。唯一可手写的是**布局**（flex/grid/gap/width，间距优先 `var(--space-*)`）。
1. **整个 focus 态用中性色**：焦点环 / 卡片选中 / 输入框 focus 的边框、halo、**背景色全部中性**（N1000/W），**淡蓝底、蓝边框都算违规**，绝不用品牌蓝。
2. **品牌蓝/绿只出现在三处**：链接 hover、agent 状态点、代码语法高亮。按钮填充、导航、focus 一律中性。
3. **业务层零硬编码**：业务页面和新增组件的颜色/间距/圆角/阴影引用 token 变量。基础库内部少量控件固有尺寸必须先沉淀为 `--size-*` / `--border-*` / `--ring-*` token，不能散落在业务代码里。
4. **字重上限 600**，禁止 700；需要更强对比改字号或加负字距。
5. **Agent 状态色固定**：绿=running、蓝=idle、红=error、灰=paused，不可交换。

## 何时读哪个 reference

- 需要取某个色值/字号/间距 → 读 `references/tokens.md`
- 要做某个具体组件（按钮/Select/卡片/Modal/Table…）→ 读 `references/components-v2.md` 查看组件用法与示例代码
- 目标项目是 React / Vue → 读 `references/react.md` / `references/vue.md`（组件封装 + Modal/Tabs/Accordion 等交互态写法）
- 写完任何 UI → 读 `references/checklist.md` 逐条自检（**这一步不能省**）

## 备注

- 图标库统一用 [MingCute](https://www.mingcute.com/)（line 默认 / fill 选中），不混用其他图标库或 emoji。
- 完整设计哲学与装饰色板（11×9）见用户原始文档 `agentic-genius-DESIGN.md`（如需扩展分类色相时参考）。
- 本 skill 的 token/组件值均源自该文档与其 HTML 预览，二者保持一致。
