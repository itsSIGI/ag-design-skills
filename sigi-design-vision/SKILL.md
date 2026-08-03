---
name: sigi-design-vision
description: >
  Use when a page needs aesthetic innovation beyond standard components —
  before any UI code is written. Any page type qualifies, including dashboards,
  if the user signals aesthetic intent.
  触发：Landing page / 营销页 / 品牌页 / 视觉创新 / 视觉风格 / 视觉冲击力 /
  品牌调性 / creative direction / mood board。
  不用于：纯组件修改、Patch Mode 修补、纯后端任务。
---

# sigi-design-vision

创意视觉策略师——为需要审美创新的场景生成结构化的、build 可直接执行的 **Vision Spec**。

**定位边界**：

| 维度 | vision | audit | build |
|------|--------|-------|-------|
| 角色 | 创造者（生成视觉方向） | 裁判（在方案间仲裁） | 执行者（按方案写代码） |
| 何时 | 无现成视觉方向 | 有方案需选择/验证 | 有方案需实现 |
| 输出 | Vision Spec（结构化视觉方案） | Verdict（裁决结论） | 代码 |

---

## 加载即执行（Skill 启动协议）

激活本 skill 后的第一件事——在处理用户需求之前——按顺序完成：

1. 读 [`references/style-vocabulary.md`](references/style-vocabulary.md)，载入视觉风格原型词汇表
2. 读 [`references/color-theory.md`](references/color-theory.md)，载入配色理论和调色板配方
3. 之后才开始处理用户输入

> ### 渐进披露
>
> 其余 reference 文件按需读取：
> - 用户提到排版/字体 → 读 `typography-rhythm.md`
> - 用户提到动画/动效 → 读 `motion-choreography.md`（编排理论）+ `motion-libraries.md`（开源库选择）
> - 用户提到插画/图形 → 读 `illustration-guide.md`
> - 需要做情绪板 → 读 `mood-board-method.md`
> - 需要构建页面叙事 → 读 `visual-narrative.md`
> - 需要灵感参考 → 读 `aesthetic-library/inspirations/curated-references.md`
> - **要出可视化设计稿（方向探索 / Vision Spec 交付）→ 读 `html-mockup-protocol.md`**

---

## 触发决策树（意图信号驱动）

```
用户需求到达
│
├─ 用户描述中有审美诉求信号？
│  （"高级感" / "品牌调性" / "视觉冲击力" / "不要太普通" / "好看一点" /
│   "独特风格" / "精致一些" / "有设计感" / "差异化" / "沉浸式"）
│  YES → 激活 vision
│
├─ 受众是外部用户/决策者/投资人/合作伙伴？
│  YES → 主动建议激活 vision："这个页面面向外部受众，要不要走视觉创新？"
│
├─ 用户明确要求创意视觉处理？
│  YES → 激活 vision（任何页面类型都可以，包括 Dashboard）
│
├─ scope Step 5.5 标注 `视觉创新: 是`？
│  YES → 激活 vision
│
├─ 页面是 Landing page / 营销页 / 品牌页 / 展示页？
│  YES → 默认激活 vision（除非用户说"简单做就行"）
│
└─ 以上均否 → 标准 build，不激活 vision
```

**关键变化**：不再按页面类型硬切。Dashboard、表格、表单都可能需要 vision——取决于用户的审美诉求和受众特征。当不确定时，主动询问：

```markdown
检测到您的页面可能受益于视觉创新。是否需要走创意视觉方向？
1. **是** — 我会先搜索设计灵感、探索风格方向，再生成代码
2. **否** — 直接走标准组件库生成，快速出结果
```

**触发词**：Landing page / 营销页 / 品牌页 / showcase / hero section / 视觉创新 / creative direction / mood board / design-vision / 视觉风格 / 沉浸式 / storytelling / motion-driven / editorial layout / 差异化视觉 / 品牌风格 / 高级感 / 品牌调性 / 视觉冲击力 / 不要太普通 / 独特风格 / 好看一点 / 精致一些 / 有设计感

---

## 权威来源

| 类别 | 文件 | 何时读 |
|------|------|--------|
| 风格原型 | [`references/style-vocabulary.md`](references/style-vocabulary.md) | Step 0 必读 |
| 配色理论 | [`references/color-theory.md`](references/color-theory.md) | Step 0 必读 |
| 排版韵律 | [`references/typography-rhythm.md`](references/typography-rhythm.md) | Step 3 排版章节 |
| 动效编排 | [`references/motion-choreography.md`](references/motion-choreography.md) | Step 3 动效章节 + §8 方案库 + §9 质量分级 |
| 插画指导 | [`references/illustration-guide.md`](references/illustration-guide.md) | Step 3 插画章节 + §7 三级优先策略 + §9 质量把控 |
| 情绪板 | [`references/mood-board-method.md`](references/mood-board-method.md) | Step 2 方向探索 |
| 视觉叙事 | [`references/visual-narrative.md`](references/visual-narrative.md) | Step 3 布局章节 |
| AG 设计宪法 | [`../sigi-design-audit/references/design-constitution.md`](../sigi-design-audit/references/design-constitution.md) | Step 4 合规检查 |
| AG Token 规则 | [`../sigi-design-system/references/token-selection.md`](../sigi-design-system/references/token-selection.md) | Step 4 TOKEN_ESCAPE |
| 审美参考库 | [`references/aesthetic-library/index.md`](references/aesthetic-library/index.md) | Step 2-3 需灵感/参数时按索引定位 |
| 动效开源库 | [`references/motion-libraries.md`](references/motion-libraries.md) | Step 3 §5 动效库选择 + Vision Spec §5 实现方案 |
| 可视化设计稿协议 | [`references/html-mockup-protocol.md`](references/html-mockup-protocol.md) | Step 2 出方向稿 + Step 3/5 出视觉稿（必读，含 HTML/Pencil 工具选择） |

---

## Step 0：加载知识库

**操作**：
1. 读 `style-vocabulary.md`，将 11+ 风格原型名称和核心特征载入上下文
2. 读 `color-theory.md`，将配色和谐类型和情绪映射载入上下文
3. 读 [`aesthetic-library/index.md`](references/aesthetic-library/index.md)，了解审美参考库的索引和按需加载规则
4. 如果用户提供了参考 URL/截图 → 分析参考资料，提取可借鉴的视觉属性

---

## Step 1：创意简报分析

**输入**：用户描述 / scope 传来的规格表（含 `视觉创新: 是`）/ 参考 URL/截图

**操作**：从输入中提取并结构化以下信息：

```markdown
## Creative Brief / 创意简报

- **页面类型**：[Landing page / 品牌页 / 营销活动页 / 产品展示 / Dashboard / 数据报告 / ...]
- **目标受众**：[角色描述——谁会看到这个页面？]
- **核心信息**：[页面需要传达的 1-3 个关键信息]
- **情绪关键词**：[3-5 个情绪词——用户直说的 + 从语境推断的]
- **配色模式**：[品牌延伸 / 全新配色]
  - 品牌延伸：在已有品牌色体系内丰富视觉表现（扩展色阶、渐变、光效、暗色模式等）
  - 全新配色：不受既有品牌约束，按页面目标和情绪全新构建配色
- **已有约束**：
  - 品牌：[已有品牌色/字体/logo？需要遵循品牌规范？]
  - 技术：[框架限制？需要 SSR？动效库偏好？]
  - 内容：[文案已定？图片已有？需要插画？]
- **设计目标**：[从 scope 继承，或从用户描述提炼]
```

**输出**：结构化 Creative Brief

> ### 铁律：不猜测
>
> 简报中任何关键字段（目标受众、核心信息、情绪关键词）如果用户没有明确提供，
> **必须追问**，不许自行填充。可以给建议选项帮助用户选择，但不能替用户做决定。

---

## Step 2：风格方向探索（3 选 1）

完整细则 → [`references/direction-exploration.md`](references/direction-exploration.md)

**流程骨架**：
1. 确定灵感路径——web search 可用则搜 Dribbble/Behance/Awwwards + 内部库校验；不可用则纯内部库匹配
2. 提取视觉 DNA，与 `style-vocabulary.md` 原型对照
3. 输出 3 张 Direction Card（文字）
4. **同时出 3 选 1 并排可视化稿** —— 读 [`references/html-mockup-protocol.md`](references/html-mockup-protocol.md)，按协议话术问用户选 HTML / Pencil
5. 收到 "选 A/B/C" 前**禁止进 Step 3**

---

## Step 3：方向深化（生成 Vision Spec）

**输入**：用户选定的方向 + Creative Brief

**操作**：把选定方向展开为完整 **Vision Spec**（7 个章节）。

按需读取 reference 文件：
- 配色章节 → `color-theory.md`（已加载）
- 排版章节 → `typography-rhythm.md`
- 动效章节 → `motion-choreography.md`（编排理论）+ `motion-libraries.md`（开源库选择）
- 插画章节 → `illustration-guide.md`
- 布局/叙事 → `visual-narrative.md`

### Vision Spec 格式

按 [`references/vision-spec-template.md`](references/vision-spec-template.md) 的 7 章节模板填写：
视觉方向 / 配色策略 / 排版组合 / 布局编排 / 动效编排 / 插画方向 / AG 合规桥接。

**质量标准**（不可省）：
- 每个 TOKEN_ESCAPE 有明确 scope + justification
- 配色值有 WCAG AA 对比度验证（文本 vs 背景 ≥ 4.5:1）
- 排版值给出 clamp() 响应式写法
- 动效有 prefers-reduced-motion 回退

**输出**：完整 Vision Spec 草稿

### Step 3.5：画完整视觉稿（必做）

> Vision Spec 是文字，用户仍看不到整体效果。**按 Spec 参数渲染一张完整视觉稿**，交付前让用户对着稿确认。

1. 读 [`references/html-mockup-protocol.md`](references/html-mockup-protocol.md)（若未读）
2. **按协议话术问用户用哪种工具**：独立 HTML / Pencil（精细稿、给设计师看、要导出 → 偏 Pencil）
3. 按所选工具出完整稿（HTML → `.design-mockups/<page-name>-<date>/index.html`；Pencil → 完整画板 + 截图）：
   - 按 Vision Spec 7 章节参数渲染完整首屏 + 1-2 个下滚 section 的静态稿
   - 配色用 §2 Hero Palette + token 过渡；排版用 §3 字阶；布局用 §4 网格
   - Hero 区（TIER_3）标出 `TOKEN_ESCAPE` 注释/备注；TIER_1 区全 token
   - 挂真实 token（HTML 挂 tokens.css / Pencil 建 token 变量），还原真实观感
4. 告诉用户稿的路径/截图，请用户对着稿确认整体效果
5. 用户认可后再进 Step 4 合规检查；用户要改 → 回本步调整稿 + 同步改 Spec

---

**输入**：Step 3 的 Vision Spec 草稿

**操作**：

1. **TIER 分区验证**：
   - TIER_1 区域（导航/系统 UI/页脚）必须使用标准 AG token，零 TOKEN_ESCAPE
   - TIER_2 区域只能使用 AG 装饰色板（Teal/Purple/Orange/Sky/Pink）的组合
   - TIER_3 区域可自由创意，但每个偏离值必须有 TOKEN_ESCAPE 声明

2. **TOKEN_ESCAPE 预算检查**：
   - 总数 ≤ 15 个。超出 → 回 Step 3 精简
   - TIER_1 区域 = 0 个。任何非零 → 修正

3. **红线扫描**（对照 `design-constitution.md` section 2）：
   - 无欺骗性设计模式
   - 无体验死胡同
   - 无障碍不崩坏（对比度 AA、焦点可达、reduced-motion）
   - 无品牌污染（AG logo/品牌色使用规则）
   - 不破坏工程化基础

4. **有冲突时**：用 `sigi-design-audit` 的设计决策模式，传递：

```markdown
## Vision → 设计决策 合规查询

- **Creative Intent**: [Vision Spec 想做什么]
- **Potential Conflict**: [哪条红线/原则有张力]
- **TIER Zone**: [TIER_2 / TIER_3]
- **Proposed Resolution**: [TOKEN_ESCAPE 声明 + 理由]
- **Fallback if Rejected**: [被否决后的回退方案]
```

5. **有红线张力时需用户确认**

**输出**：合规验证通过的 Vision Spec（或标注需要用户决策的冲突点）

---

## Step 5：交付 sigi-design-build

**输入**：通过合规检查的 Vision Spec

**操作**：

1. 在 Vision Spec 末尾追加 **Build Implementation Guide** —— 模板见
   [`references/build-handoff-guide.md`](references/build-handoff-guide.md)，含三个小节：
   Recipe 策略 / Transition Seam 实现 / 技术栈建议

2. 将 Vision Spec 传递给 `sigi-design-build`

**输出**：完整的 Vision Spec + Build Implementation Guide

---

## 审美自检清单（Step 5 交付前必须执行）

逐条执行 [`references/aesthetic-self-check.md`](references/aesthetic-self-check.md) 的 6 个维度：
Coherence（一致性）/ Impact（冲击力）/ Hierarchy（层级）/ Craft（精致度）/
AG Bridge（衔接）/ Visualization（可视化，Step 2 与 Step 3.5 的稿必须已出并确认）。

---

## 护栏（防过度设计）

完整说明与检查方法 → [`references/guardrails.md`](references/guardrails.md)

**四条硬预算**：
1. **内容-装饰比**：首屏 ≥60% 面积是有意义内容，装饰 ≤40%
2. **动画预算**：每页最多 8 个独立动画，超出 → 合并或删减
3. **TOKEN_ESCAPE 预算**：每份 Spec ≤15 个（TIER_1 = 0，TIER_2 ≤5，TIER_3 ≤10），超出 → 回 Step 3 精简
4. **字体预算**：最多 2 个字体族（1 display + system sans-serif）

---

## 失败模式处理

| 场景 | 处理 |
|------|------|
| 用户简报信息不足 | 追问，给出具体选项帮助用户填充 |
| 3 个方向都不满意 | 追问用户偏好，生成新一轮 3 个方向 |
| TOKEN_ESCAPE 超预算 | 回 Step 3，按"配色 > 排版 > 动效"优先级精简 |
| 设计决策 REJECT | 按裁决条件修正，或给用户呈现冲突让用户决定 |
| 风格原型库不匹配 | 用 mood-board-method.md 从零构建方向，在 Vision Spec 中标注"自定义风格" |
| build 反馈无法实现 | 回 Step 3 调整技术栈建议，或降低动效/插画复杂度 |

---

## 交付与下一步

**产物**：`docs/sigi-design/vision/<date>-<topic>.md`

产物头部必须写死下游指令：

> 下一步：用 sigi-design-build 按本 Spec 生成代码。
> TIER_3 区域的每个 TOKEN_ESCAPE 需在 build 的 recipe 中单独登记。

**唯一下游**：`sigi-design-build`。

**不许**：在此直接写页面代码、跳过 build 自行实现、交付前没让用户对着可视化稿确认。
