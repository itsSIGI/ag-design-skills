# Skill 启动协议与权威来源索引

> 激活 `sigi-design-build` 后的第一件事读本文件。

---

## Step -1：预览与校验环境

> 本 skill **只含知识 + 规则**，不往项目里注入运行时代码。预览靠项目本身的 dev server。

**预览 = 本地跑项目 dev server + 正常登录**：

1. 起项目 dev server（如 `pnpm dev`）
2. 浏览器正常登录 —— 本地 = 本地前端 + 真实后端
3. 导航到你的页面 → 带真实鉴权 + 真实数据的真实样子

design-craft 生成的页面是**真实路由上的真实代码**，不挂免鉴权预览路由。

---

## 加载即执行（Skill 启动协议）

**激活本 skill 后的第一件事**——在跟用户聊业务之前——必须按顺序完成：

1. 读 `sigi-design-system` skill 的 `references/components-v2.md`，把当前 shadcn/ui + AG 扩展组件清单载入上下文
2. 读 `sigi-design-system` skill 的 `references/tokens.md`，载入 token 体系
3. 读 [`patterns/pattern-index.json`](patterns/pattern-index.json)，知道当前有哪些可复用页面 pattern
4. 之后才开始处理用户输入

跳过加载协议直接开工 = 高概率在中后段翻车。**先吃组件清单、token 体系和 pattern 库，再说做什么页面**。

> ### 省 token：渐进披露，命中即止
>
> **别预读整个 references 库**。按需读：
> - 先查 decision-tables §10 业务表 / pattern-index（都很小）
> - **命中 pattern → 只读那个 pattern 的代码 + recipe，直接抄填，跳过规则库通读**
> - 命中原型 → 读那个原型 + 它指向的真实文件；未命中才按需读规则文件

---

**两种输入模式**：
- **文字描述** → 从 Step 1 开始
- **Figma URL**（含 `figma.com`）或**截图** → 先执行 **Step 0**，再从 Step 1 继续

**权威来源**：

| 类别 | 文件 | 何时读 |
|------|------|--------|
| Token 体系 | `sigi-design-system/references/tokens.md` | 取色值/间距/圆角 |
| 组件用法 | `sigi-design-system/references/components-v2.md` | 做具体组件 |
| 组件示例 | `sigi-design-system/references/components-v2.md` | 复制组件用法 |
| React 用法 | `sigi-design-system/references/react.md` | React 项目 |
| Vue 用法 | `sigi-design-system/references/vue.md` | Vue 项目 |
| 达标自检 | `sigi-design-system/references/checklist.md` | 产出后核对 |
| 业务→组件决策 | [`decision-tables.md`](decision-tables.md) | 选组件类型 |
| 组合层规则 | [`design-rules.md`](design-rules.md) | anti-pattern / 布局 |
| 开源组件指南 | [`open-source-guide.md`](open-source-guide.md) | 用第三方库时 |
| 视觉质量自检 | [`quality-self-check.md`](quality-self-check.md) | Step 3.5 |
| 视觉精修指南 | [`visual-polish-guide.md`](visual-polish-guide.md) | Step 3 生成 + Step 3.5 Polish Pass |
| 审美配方 | [`aesthetic-recipes.md`](aesthetic-recipes.md) | Step 3 排版/配色/间距配方 |
| 非正常路径 | [`harden-checklist.md`](harden-checklist.md) | Step 3.5 |
| 翻车案例 | [`anti-examples.md`](anti-examples.md) | FAIL 后参考 |
| 组件缺失协议 | [`component-missing-protocol.md`](component-missing-protocol.md) | Step 1.4.5 缺失处理 |
| 诊断协议 | [`diagnostic-protocol.md`](diagnostic-protocol.md) | Step 5-6 决策追踪 |
| 翻车排查 | [`../TROUBLESHOOTING.md`](../TROUBLESHOOTING.md) | 产出问题排查 |
| 局部修改协议 | [`patch-mode.md`](patch-mode.md) | 用户要"改一下"时 |
| 多页面流程 | [`multi-page-flow.md`](multi-page-flow.md) | 向导/onboarding/多步表单 |
| 响应式 + 交接 | [`responsive-and-handoff.md`](responsive-and-handoff.md) | 断点/Dev Handoff/演化协议 |
| 跨 Skill 协作 | [`cross-skill-protocol.md`](cross-skill-protocol.md) | skill 间数据传递/回环/上下文共享 |
| 页面原型 | [`page-archetypes/README.md`](page-archetypes/README.md) | 新页面选骨架 |
| AI 聊天运行时 | [`assistant-ui-guide.md`](assistant-ui-guide.md) | AI 对话需要 streaming/持久化/分支时 |
| 可视化设计稿协议 | [`../../sigi-design-vision/references/html-mockup-protocol.md`](../../sigi-design-vision/references/html-mockup-protocol.md) | Step 2.5 出预览稿（含 HTML/Pencil 工具选择） |
