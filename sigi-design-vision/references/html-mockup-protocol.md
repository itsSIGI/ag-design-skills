# 可视化设计稿协议 / Visual Mockup Protocol

> **目的**：让"出设计方案"这件事变得**可视化**。无论是 vision 探索视觉方向、
> vision 交付 Vision Spec，还是 build 出方案，都先画一张**能直接看到效果的
> 设计稿**（独立 HTML 或 Pencil，由用户选），让用户看到真实效果再决策，
> 而不是读文字想象。
>
> 本文件是 vision 和 build 共享的权威协议。两个 skill 都引用它。

---

## 何时画设计稿（触发规则）

**核心原则：只要在"出设计方案"，就先画可视化稿再往下走。视觉方案尤其必须画。**

| 场景 | 谁触发 | 画什么 | 工具 |
|------|--------|--------|------|
| 视觉方向探索（3 选 1） | vision Step 2 | 3 张并排缩略稿，每个 Direction 一张 | 问用户（HTML / Pencil），3 选 1 对比默认推荐 HTML |
| Vision Spec 交付前 | vision Step 3/5 | 1 张完整视觉稿（hero + 配色 + 排版 + 布局） | 问用户（HTML / Pencil） |
| build 出方案 | build Step 3 前 | 1 张静态预览稿，确认后再落地项目代码 | 问用户（HTML / Pencil），代码预览默认推荐 HTML |

**不画的情况**：
- 纯 Patch Mode 局部修改（改个颜色/间距/文案）——直接改，不用出稿
- 纯组件级单点修改
- 用户明确说"直接写代码 / 别出预览 / 快速做"

---

## 工具选择：出视觉方案时问用户用哪种

有两个**平级**的画稿工具，各有适用场景。**出视觉方案时主动问用户选哪种**，不要替用户默认：

```markdown
这一版视觉稿，你想用哪种方式看？
1. **独立 HTML** — 高保真、挂真实 token、浏览器直接看、和最终代码同栈（适合快速看真实效果 / 3 选 1 对比）
2. **Pencil 设计稿** — 结构化设计对象、可导出、可当设计文件维护（适合精细稿 / 给设计师看 / 需要导出）
```

### 选项 A：独立 HTML 文件

**适用**：想快、想看高保真真实效果、3 选 1 横向对比、和最终 React/Vue 代码同栈。

- 写一个**自包含**的 `.html` 文件：内联 `<style>`，内联/链接 token（见下），可选内联少量 `<script>`
- 零依赖、不碰项目代码、浏览器双击即看
- 3 选 1 时可在**一个 HTML 文件里横向并排 3 个方向**，一屏对比
- 与最终代码路径一致（都是 HTML/CSS），还原度最高

### 选项 B：Pencil MCP 设计稿

**适用**：想要精细的结构化设计稿、需要导出 PNG/HTML、要当设计文件维护、给设计师协作。

- 调用 pencil MCP：`get_editor_state(include_schema: true)` → `get_guidelines` → `batch_design` → `get_screenshot`
- 结构化设计对象、可导出、可迭代
- `.pen` 文件加密，只能经 pencil MCP 工具读写（不要用 Read/Grep 碰 `.pen`）
- 与最终 React/Vue 代码有 gap（设计对象 ≠ 代码）

### 快速对比

| 维度 | 独立 HTML | Pencil |
|------|-----------|--------|
| 保真度 | 高（真实 token/CSS） | 高（设计对象） |
| 出稿速度 | 快 | 中（需工具链） |
| 3 选 1 并排 | 一屏搞定 | 需多个画板 |
| 可导出 | 就是 HTML 文件 | PNG/HTML 导出 |
| 与最终代码 | 同栈、gap 小 | 有 gap |
| 适合谁看 | 快速自看 / 决策 | 设计师 / 交付物 |

> **默认建议**：探索/对比/看效果偏 HTML，精细稿/交付物偏 Pencil——但**最终由用户选**。用户没明确时，按上面话术问一次。

---

## 铁律：设计稿必须用真实 token（不管哪种工具）

设计稿不是随手写的假图——它要**如实反映最终产品的观感**，所以必须挂真实 token 体系。

### HTML 稿：挂载方式（二选一）

**方式 A（推荐）——链接真实 tokens.css**：

```html
<link rel="stylesheet" href="../sigi-design-system/assets/tokens.css">
```

路径按 HTML 文件相对 `sigi-design-system/assets/tokens.css` 的位置调整。

**方式 B——内联核心 token**：

当 HTML 稿要脱离仓库单独发给用户时，把 `sigi-design-system/assets/tokens.css` 的
`:root { ... }` 语义角色层**内联**进 `<style>`，保证脱离仓库也能正确渲染。

### 用法规则

- 所有颜色/间距/圆角/字号一律用 `var(--color-*)` / `var(--space-*)` / `var(--radius-*)` / `var(--font-size-*)`
- **TIER_3 创意区**（Hero 等）允许用 Vision Spec 里声明的 `TOKEN_ESCAPE` 值（内联写死的 hex/渐变），但要在稿里用注释标出 `/* TOKEN_ESCAPE: xxx */`
- **TIER_1 区域**（导航/页脚/系统 UI）严禁 escape，必须全 token
- 缺 shadcn/AG 组件的真实样式时，用 token 手绘一个**近似**的静态版本即可（稿是给人看效果，不是可运行代码）

### Pencil 稿：用 token 值建变量

Pencil 走自己的变量体系，做法：
- 先 `get_variables` 看 `.pen` 已有变量；缺则把 `tokens.css` 语义角色层的**实际色值/间距值**建成 Pencil 变量（如 `color-primary-bg` = `#0F1729`）
- 组件填色/间距一律绑到这些变量，不硬填裸值
- TIER_3 创意区可用 Vision Spec 的 TOKEN_ESCAPE 值，在图层名或备注里标 `TOKEN_ESCAPE`
- 生成后用 `get_screenshot` 出图给用户看

---

## 输出规范

### 文件位置与命名

设计稿写到一个不污染项目源码的位置。默认：

```
.design-mockups/<page-name>-<yyyymmdd>/
  ├─ index.html              # HTML：build 单方案 / vision 单视觉稿
  ├─ directions.html         # HTML：vision 3 选 1 并排稿
  ├─ mockup.pen              # Pencil：设计文件（若用 Pencil）
  ├─ screenshots/            # Pencil 导出的截图
  └─ assets/                 # 若有图片
```

`.design-mockups/` 应在 `.gitignore` 里（临时预览产物，不入库）。写稿前检查/追加。

### 视口与还原度

- 桌面稿默认 `1440px` 宽容器；移动稿 `390px`
- 用真实的字体栈（system sans-serif + Vision Spec 指定的 display font）
- 布局用 flex/grid，还原真实的间距节奏（用 `--space-*`）
- 动效：静态稿里**不必**做完整动效，但可用注释或一个 hero 入场示意说明动效意图；若用户想看动效，用内联 CSS `@keyframes` 做关键几个

### 交付话术

画完稿，明确告诉用户怎么看，并给出下一步选择：

```markdown
已生成设计稿：
- HTML：`.design-mockups/xxx/index.html`（浏览器双击打开，或 `open` 命令）
- 或 Pencil：已导出截图 `.design-mockups/xxx/screenshots/`

请确认：
1. **就按这个来** — 进入下一步（vision 深化 / build 落地代码）
2. **调整** — 告诉我改哪里（配色/布局/字号/间距…）
3. **换种工具再看** — 想看另一种（HTML ↔ Pencil）我再出一版
```

（只输出实际用的那种工具对应的路径行。）

---

## 各接入点的具体做法

> 每个接入点都**先按上面"工具选择"话术问用户选 HTML 还是 Pencil**，再按所选工具出稿。下面以 HTML 为例说明内容要点，Pencil 的内容要点相同、只是载体不同。

### vision Step 2：3 选 1 并排稿

在输出 3 张 Direction Card 的**文字**同时出并排稿（HTML → `directions.html`；Pencil → 一个画板放 3 栏）：

- 一个横向 3 栏布局，每栏一个 Direction 的**微缩真实稿**（hero 区 + 一个内容区块示意）
- 每栏顶部标 `Direction A/B/C + 风格名`
- 每栏用该方向的配色/排版/布局参数真实渲染，让用户一眼看出 3 个方向的差异
- 稿下方保留原有的"选 A / 选 B / 选 C / 混合"话术

目的：把"读 3 段文字描述"升级成"看 3 个真实缩略图"。3 选 1 对比场景默认推荐 HTML（一屏并排更快）。

### vision Step 3/5：完整视觉稿

选定方向、Vision Spec 成型后出完整视觉稿（HTML → `index.html`；Pencil → 完整画板）：

- 按 Vision Spec 7 章节的参数渲染一张**完整首屏 + 1-2 个下滚 section** 的静态稿
- 配色用 Color Strategy 的 Hero Palette + token 过渡
- 排版用 Typography Composition 的字阶
- 布局用 Layout Choreography 的网格
- Hero 区标出 TOKEN_ESCAPE 注释/备注
- 交付前让用户对着稿确认，再交给 sigi-design-build

### build Step 3 前：静态预览稿

recipe 锁定后、生成真实项目代码前，先出稿（代码预览场景默认推荐 HTML）：

- 用锁定的组件 recipe + token 手绘页面静态版
- 让用户不起 dev server、不登录就能看效果
- 确认后再落地到真实路由的真实代码
- 若来自 vision 的 Vision Spec，可直接复用 vision 出的稿作为起点，不必重画

---

## 护栏

1. **稿是给人看的，不是运行代码**：不必引入构建工具、不必真实可交互；用 token 还原观感即可。
2. **不替代最终代码**：设计稿（HTML/Pencil）只是方案预览。用户确认后，build 仍走"真实路由真实代码"流程。
3. **不入库**：所有稿写进 `.design-mockups/`（已 gitignore），不进项目源码目录。
4. **token 一致性**：稿里的 TIER_1 区域颜色/间距必须和真实系统一致，否则预览会误导决策。
5. **`.pen` 只用 pencil MCP 读写**：绝不用 Read/Grep 碰 `.pen` 文件。
