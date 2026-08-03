# Pipeline 细则 — Step 0 / Step 3.6

> 从 SKILL.md 下沉的分步细则。Step 0 在有 Figma/截图输入时读；Step 3.6 在交付前读。

---

## Step 0：读取 Figma 设计稿 / 截图（可选）

用户提供 `https://figma.com/design/:fileKey/...?node-id=...` 或截图时执行：

### Figma URL 模式

1. 调用 `get_figma_data` 获取节点数据
2. 调用 `download_figma_images` 获取截图
3. 看截图理解模块划分和数据类型
4. **从截图和节点数据中识别每一个组件型元素**（弹窗 / 表格 / 表单 / 按钮 / Tabs / Card / ...），列出 `Figma 节点 → shadcn/AG 组件候选` 的初步映射。**这份映射就是 Step 1 recipe 的输入**

### 截图模式

1. 读截图，理解模块划分
2. 识别组件型元素，列出 `截图区域 → shadcn/AG 组件候选` 映射

> ### 铁律：识别 ≠ 实现
>
> 识别出"这里是个 Modal"后 **绝不要** 直接自己拼。Step 1 必须先从 `components-v2.md` 确认 shadcn/AG 组件存在及用法，才能进入 Step 3。

**失败回退**：
- MCP/截图不可用 → 请用户提供截图或文字描述节点结构，降级走文字模式
- URL 无效 / 文件私有 → **暂停**，请用户核对；不允许悄悄回退到无设计稿模式

---

## Step 3.6：Token 校验（机器门禁）

> ### 铁律：把页面交给用户看 / 提交之前，必须做 token 合规检查且全过

**检查项**：

1. **硬编码检测**——代码中不得出现裸 hex/rgb/hsl 色值（ECharts option 内除外）、裸 px 间距（布局 width/height 除外）、裸 border-radius、裸 box-shadow
2. **token 臆造检测**——所有 `var(--*)` 引用必须在 `tokens.css` / `tokens.md` 中存在
3. **组件存在性检测**——所有使用的 shadcn/AG 组件必须在 `components/ui/` 或 `components/ag/` 目录中存在，且在 `components-v2.md` 中有记录
4. **品牌色使用检查**——`#123AFF`（蓝）和 `#00BF74`（绿）及对应 token 只出现在三处：链接 hover、agent 状态点、代码高亮
5. **字重检查**——不出现 `font-weight: 700` 或 `--weight-bold` 以上的值
6. **焦点环检查**——focus 相关样式使用 `var(--color-focus-ring)`（中性色），不用品牌蓝

**约束**：
- 全过**才**交付 / 进 Step 4；❌ 不允许"我看了应该没问题"跳过
- 任一失败 → 修完再检，不带已知违规进 Step 4

---

---

## Step 2.5：出静态预览稿（出方案默认执行）

> **让用户不起 dev server、不登录就能看到方案效果。** 落地真实项目代码前，先出一张稿确认。

1. 读 [`../sigi-design-vision/references/html-mockup-protocol.md`](../../sigi-design-vision/references/html-mockup-protocol.md)（若未读）
2. **按协议话术问用户用哪种工具**：独立 HTML / Pencil（代码预览场景默认推荐 HTML）
3. 用锁定的 recipe（Step 1）+ 页面结构（Step 2）+ 真实 token，按所选工具出页面静态版：
   - HTML → `.design-mockups/<page-name>-<date>/index.html`，挂 `sigi-design-system/assets/tokens.css`，颜色/间距/圆角/字号全走 `var(--*)`
   - Pencil → 建 token 变量后出画板 + 截图
   - 组件用 token 还原**近似**静态样子（稿是给人看效果，不是可运行代码）
4. 告诉用户稿的路径/截图，请用户确认后再进 Step 3 生成真实代码

**复用**：若本次来自 vision 的 Vision Spec，vision 已出稿 → 直接复用作起点，不重画。

**跳过条件**：
- Patch Mode 局部修改（改颜色/间距/文案/单组件）
- 用户明确说"直接写代码 / 不用预览 / 快速做"

---

---

## Step 3：生成代码 —— 操作明细

**操作**：

1. **逐槽位渲染 recipe**——每个槽位使用对应的 shadcn/AG 组件或开源组件，严格匹配 recipe 中登记的组件名和 token
2. 数据填充：把 mock 数据、文案、回调函数填进组件
3. **页面级 wrapper**（外层 layout、卡片间 gap、grid 列宽等少量自定义层）使用 `var(--space-*)` / `var(--radius-*)` 等 token 变量
4. 图标使用白名单库 [MingCute](https://www.mingcute.com/)（icon font）或 [Lucide](https://lucide.dev/)（React 组件），**单项目单库**保持统一；shadcn 自带 Lucide 微图标豁免
5. 每个图表（ECharts 等）声明**固定像素高度**；图表内部配色可直接用 hex（从 tokens.md 原始色阶取）
6. **不添加**用户未明确要求的 UI 元素
7. **框架分叉**：
   - React 项目 → 读 `sigi-design-system/references/react.md` 获取 className 型 + 交互态 hooks 写法
   - Vue 项目 → 读 `sigi-design-system/references/vue.md` 获取 class 型 + 交互态写法
   - 其他 → 从 `components-v2.md` 复制组件结构
8. **审美精修**（生成代码时同步执行，不是事后补）：
   - 读 [`references/visual-polish-guide.md`](visual-polish-guide.md) 应用精修技巧
   - 参考 [`aesthetic-recipes.md`](aesthetic-recipes.md) 选择字号组合 / 间距节奏 / 配色方案
   - 可点击卡片必须有 `transition` + hover 微浮声明
   - 大数字（KPI 值）加 `font-variant-numeric: tabular-nums` + 负字距
   - 背景使用 `bg → surface → surface-secondary` 三级层次
   - 边框优先 `--color-border-subtle`，只在强分隔处用 `--color-border-strong`
   - 每个页面确认一个视觉焦点，其余元素降权

---

## Step 2：组合布局 —— 需要确定的事

需要确定的事：

1. 模块的单一职责（先信息架构，后视觉；不混入无关数据）
2. 容器层级——遵循 `Card` 组件的 5 级 elevation 规则（`default` / `ring` / `whisper` / `selected` / `inset`），不自造阴影
3. 图表类型：汇总/聚合率 → **Gauge**；占比/构成 → **Donut**；时序 → **Bar/Column**
4. **Bar/Column 图独占全宽行**，不放进分列网格
5. 全局筛选器位置：**紧靠页面标题右侧**
6. **白底铁律**：`Card` 组件默认白底（`var(--color-bg)`），不自行加灰底。卡片区分靠 elevation 和间距，不靠底色差异
7. 替代映射查表——任何"用 div 自拼组件"的冲动，先查 [`references/decision-tables.md §7`](decision-tables.md)

---

## Step 1：Recipe 结构化清单字段

5. 产出 **recipe**——结构化清单：

   | 字段 | 含义 |
   |------|------|
   | `slot` | 业务语义（"删除确认弹窗"、"分子数据列表"） |
   | `component_type` | 组件类型（Modal、Table、Button、Card…） |
   | `source` | 来源：`shadcn`（shadcn/ui 标准组件）、`ag-ext`（AG 扩展组件）或 `开源-<库名>` |
   | `component` | 组件名（如 `Dialog`、`AgMetricCard`、`Button variant="primary"`）或开源组件名 |
   | `token_refs` | 引用的关键 token（`var(--color-surface)`、`var(--space-4)`） |
   | `notes` | 特殊说明（开源组件需 token 化包装等） |

---

## Step 4 与输出处理（原文）

## Step 4：合规校验（独立 sub-skill）

**输入**：Step 3 生成的代码 + Step 1 recipe

**操作**：调用 `sigi-design-audit` sub-skill 执行最终审计。

> ### 铁律：Step 4 必须由 sub-skill 执行
>
> **不要**在主流程里"自己跑一遍 checklist"——长上下文末段，主流程模型已经有压力，会跳步、合理化违规。
> sub-skill 是冷启动、单一职责、不被主流程污染。把审计权完全让渡给它。

调用方式：把 Step 3 的代码 + Step 1 的 recipe 传给 `sigi-design-audit` sub-skill。

---

## 输出处理

sub-skill 返回结果后：

| sub-skill 结论 | 主流程动作 |
|----------------|-----------|
| ✅ PASS | 输出最终代码给用户 |
| ❌ FAIL | 按 sub-skill 列出的违规项**逐条修正**代码，重新跑 sub-skill |
| 2 轮仍 FAIL | 停止自动修复，向用户说明具体冲突并请求人工确认 |

**最多 2 轮自动修复**。第 3 轮起必须升级到用户。

**绝不允许**：
- ❌ 看到 FAIL 后不修，直接输出代码
- ❌ 自己重新跑一遍 checklist 后宣称 PASS（绕过 sub-skill）
- ❌ 修了一半就停，剩下的留个注释让用户改

---
