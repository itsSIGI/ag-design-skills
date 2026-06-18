---
name: ag-design-vision
version: 1.1.0
description: >
  创意视觉策略 skill。为需要审美创新的任何页面生成结构化的 Vision Spec，供
  ag-design-craft 直接执行。不按页面类型硬切——Dashboard、表格、表单也可能需要
  视觉创新。通过用户意图信号（"高级感"、"品牌调性"、"视觉冲击力"等）或受众
  特征（面向外部用户/决策者/投资人）按需激活。核心机制：AI 主动搜索设计灵感 →
  风格方向探索（3 选 1）→ 深化 Vision Spec（7 章节）→ 合规桥接 → 交付 craft。
  触发词："Landing page"、"营销页"、"品牌页"、"hero section"、"视觉创新"、
  "creative direction"、"mood board"、"design-vision"、"视觉风格"、
  "沉浸式"、"storytelling"、"motion-driven"、"editorial layout"、
  "高级感"、"品牌调性"、"视觉冲击力"、"不要太普通"、"独特风格"、"好看一点"、
  "精致一些"、"有设计感"。
  不用于：纯组件修改、Patch Mode 修补、纯后端任务。
---

# ag-design-vision

创意视觉策略师——为需要审美创新的场景生成结构化的、craft 可直接执行的 **Vision Spec**。

**定位边界**：

| 维度 | vision | arbiter | craft |
|------|--------|---------|-------|
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
├─ compass Step 5.5 标注 `视觉创新: 是`？
│  YES → 激活 vision
│
├─ 页面是 Landing page / 营销页 / 品牌页 / 展示页？
│  YES → 默认激活 vision（除非用户说"简单做就行"）
│
└─ 以上均否 → 标准 craft，不激活 vision
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
| AG 设计宪法 | `ag-design-arbiter/references/design-constitution.md` | Step 4 合规检查 |
| AG Token 规则 | `ag-design-arbiter/references/token-selection.md` | Step 4 TOKEN_ESCAPE |
| 跨 Skill 协作 | `ag-design-craft/references/cross-skill-protocol.md` | 接口数据格式 |
| 审美参考库 | [`references/aesthetic-library/`](references/aesthetic-library/README.md) | Step 2 灵感来源（尤其无 web search 时） |
| 风格原型参数 | [`references/aesthetic-library/archetypes/archetype-params.md`](references/aesthetic-library/archetypes/archetype-params.md) | Step 2 具体视觉参数 |
| 行业配色方案 | [`references/aesthetic-library/palettes/industry-palettes.md`](references/aesthetic-library/palettes/industry-palettes.md) | Step 3 §2 配色策略 |
| Section 视觉范式 | [`references/aesthetic-library/patterns/section-patterns.md`](references/aesthetic-library/patterns/section-patterns.md) | Step 3 §4 布局编排 |
| 页面组合参考 | [`references/aesthetic-library/compositions/page-compositions.md`](references/aesthetic-library/compositions/page-compositions.md) | Step 2-3 完整页面配方 |
| 精选设计灵感 | [`references/aesthetic-library/inspirations/curated-references.md`](references/aesthetic-library/inspirations/curated-references.md) | Step 2 灵感来源（预收集的高质量参考 + 视觉 DNA） |
| 动效开源库 | [`references/motion-libraries.md`](references/motion-libraries.md) | Step 3 §5 动效库选择 + Vision Spec §5 实现方案 |

---

## Step 0：加载知识库

**操作**：
1. 读 `style-vocabulary.md`，将 11+ 风格原型名称和核心特征载入上下文
2. 读 `color-theory.md`，将配色和谐类型和情绪映射载入上下文
3. 读 [`aesthetic-library/README.md`](references/aesthetic-library/README.md)，了解审美参考库的目录结构和使用协议
4. 如果用户提供了参考 URL/截图 → 分析参考资料，提取可借鉴的视觉属性

---

## Step 1：创意简报分析

**输入**：用户描述 / compass 传来的规格表（含 `视觉创新: 是`）/ 参考 URL/截图

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
- **设计目标**：[从 compass 继承，或从用户描述提炼]
```

**输出**：结构化 Creative Brief

> ### 铁律：不猜测
>
> 简报中任何关键字段（目标受众、核心信息、情绪关键词）如果用户没有明确提供，
> **必须追问**，不许自行填充。可以给建议选项帮助用户选择，但不能替用户做决定。

---

## Step 2：风格方向探索（双轨灵感 + 3 选 1）

**输入**：Step 1 的 Creative Brief

**操作**：

### 2.0 确定灵感获取路径（双轨决策）

```
Web search 可用？（尝试搜索一次即知）
│
├─ YES → 主路径：搜索 + 内部库校验（2.1a）
│  1. 主动搜索 Dribbble/Behance/Awwwards 获取实时灵感
│  2. 用 inspirations/ 预收集参考作为基线对照
│  3. 用 aesthetic-library/archetypes/ 补充具体参数值
│  4. 用 aesthetic-library/palettes/ 校验配色专业度
│  5. 用 aesthetic-library/patterns/ 确认布局范式有成熟先例
│
└─ NO → 备用路径：纯内部库匹配（2.1b）
   1. 从 inspirations/ 按视觉特质匹配预收集的高质量参考
   2. 从 aesthetic-library/archetypes/ 按情绪关键词匹配风格原型+具体参数
   3. 从 aesthetic-library/palettes/ 选取匹配行业和视觉特质的配色方案
   4. 从 aesthetic-library/compositions/ 选取完整页面组合作为起点
   5. 从 aesthetic-library/patterns/ 选取 section 级视觉范式
   6. 向用户说明："基于内置审美库推荐，非实时搜索结果"
```

### 2.1a 搜索 + 内部库校验（Web search 可用时）

> **不依赖用户提供参考**——vision 自己去找。

1. 根据 Creative Brief 的行业、页面类型、情绪关键词，主动搜索设计平台：
   - **Dribbble**：UI/Web 设计（搜索 `[行业] [页面类型] [风格关键词] web design`）
   - **Behance**：品牌/视觉设计（搜索品牌展示、视觉系统相关）
   - **Awwwards**：创意网站（搜索获奖作品）
   - **Pinterest**：情绪灵感（搜索情绪关键词对应的视觉方向）
   - 详细搜索策略见 [`references/mood-board-method.md`](references/mood-board-method.md) §6

2. **筛选高质量参考**（不是随便搜到什么都用）：
   - 点赞/收藏量高（Dribbble ≥500 likes，Behance Featured/Appreciated）
   - 来自认证设计师或知名设计工作室
   - 视觉完成度高（不是草图或概念稿）
   - 可执行（不过度依赖视频/3D/WebGL 等高复杂度技术）

3. 从筛选后的 3-5 个参考中，用 `mood-board-method.md` §3 的提取协议提取视觉 DNA

4. **内部库校验**（搜索结果 + 内部库交叉验证）：
   - 读 [`aesthetic-library/inspirations/curated-references.md`](references/aesthetic-library/inspirations/curated-references.md)，用预收集参考作为质量基线
   - 读 [`aesthetic-library/archetypes/archetype-params.md`](references/aesthetic-library/archetypes/archetype-params.md)，用原型参数补充搜索结果中缺少的具体 CSS 值
   - 读 [`aesthetic-library/palettes/industry-palettes.md`](references/aesthetic-library/palettes/industry-palettes.md)，验证配色方案的对比度和专业度
   - 读 [`aesthetic-library/patterns/section-patterns.md`](references/aesthetic-library/patterns/section-patterns.md)，确认布局选择有成熟范式

### 2.1b 纯内部库匹配（Web search 不可用时）

> 无 web search 不等于降质——内部审美库提供经过验证的具体参数，质量有保证。

1. 读 [`aesthetic-library/inspirations/curated-references.md`](references/aesthetic-library/inspirations/curated-references.md)，按视觉特质匹配预收集的高质量参考（含视觉 DNA）
2. 按 Creative Brief 的情绪关键词，在 `style-vocabulary.md` 风格选择速查表中初筛原型
3. 读 [`aesthetic-library/archetypes/archetype-params.md`](references/aesthetic-library/archetypes/archetype-params.md)，获取匹配原型的**具体视觉参数**（标杆分析 + CSS 值 + 配色模板 + 排版参数 + 间距体系 + 形状纹理）
4. 读 [`aesthetic-library/palettes/industry-palettes.md`](references/aesthetic-library/palettes/industry-palettes.md)，按视觉特质 + 行业筛选配色方案
5. 读 [`aesthetic-library/compositions/page-compositions.md`](references/aesthetic-library/compositions/page-compositions.md)，找到匹配的完整页面组合作为起点
6. 用以上具体参数构建 3 个 Direction Card

### 2.2 与风格原型匹配或构建自定义风格

4. 将提取的视觉 DNA 与 `style-vocabulary.md` 中的原型对照：
   - **高匹配**：直接使用原型作为骨架，参考作品补充细节
   - **部分匹配**：混合 2 个原型（见 `style-vocabulary.md` 混合风格指导）
   - **无匹配**：标注为"自定义风格"，用 Visual DNA 参数模板描述（见 `style-vocabulary.md` 自定义风格章节）

### 2.3 生成 Direction Card

5. 为用户生成 3 个方向：

```markdown
### Direction A：[风格名] — [中文名]

**灵感来源**：
| 参考 | 来源 | 提取什么 | 丢弃什么 |
|------|------|---------|---------|
| [作品名/设计师] | Dribbble/Behance | [布局/配色/动效...] | [品牌专属元素] |

**情绪匹配**：[为什么这个方向适合 Brief 的情绪关键词]

**视觉草图**：
- 配色：[主调 + 强调色方向]
- 排版：[字阶策略——如"Impact scale, 72/36/18"]
- 布局：[网格策略——如"全出血 Hero + 收敛主体"]
- 动效：[动效语言——如"staggered reveal on scroll"]
- 纹理：[有/无——如"微妙 grain overlay"]

**AG 兼容度**：[高/中/低——需要多少 TOKEN_ESCAPE]
**风险点**：[可能与 AG 红线的张力]
```

6. **公开输出 3 张 Direction Card**，请用户选择

**⚠️ 必须用户确认**：

```markdown
请选择视觉方向：

1. **Direction A** — [风格名]：[一句话特征]
2. **Direction B** — [风格名]：[一句话特征]
3. **Direction C** — [风格名]：[一句话特征]

回 "选 A" / "选 B" / "选 C" / "混合 A+B" / 或提出修改意见。
```

收到用户明确选择前，**禁止进 Step 3**。

### 兜底：搜索无理想结果

如果 2.1a 路径中设计平台搜索结果质量不足：
1. 降级到 2.1b 纯内部库匹配路径
2. 补充读 `mood-board-method.md` §5（无参考时的关键词交叉法）
3. 向用户说明："未找到足够高质量的参考，以下方向基于内置审美库推荐"

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

### Vision Spec 格式（7 章节）

```markdown
## Vision Spec

### 1. Visual Direction / 视觉方向
- **Style Archetype**: [风格原型名，来自 style-vocabulary.md]
- **Mood Keywords**: [3-5 个情绪词]
- **Reference Board**: [2-3 参考 + 标注从每个参考提取什么]

### 2. Color Strategy / 配色策略
- **配色模式**: [品牌延伸 / 全新配色 — 从 Creative Brief 继承]
  - 品牌延伸 → 读 `color-theory.md` §7 品牌延伸协议
  - 全新配色 → 读 `color-theory.md` §1-§6 自由构建
- **Palette Type**: [配色和谐类型——analogous/complementary/split-complementary/triadic/monochromatic]
- **Hero Palette** (TIER_3 creative extension):

  | Role | Value | AG Token Mapping | Scope |
  |------|-------|------------------|-------|
  | Primary accent | [hex] | TOKEN_ESCAPE: [scope description] | [hero CTA only / ...] |
  | Surface tint | [rgba] | TOKEN_ESCAPE: [scope] | [hero bg wash / ...] |
  | Text on hero | var(--color-text-primary) | — | standard token |

- **Transition to TIER_1**: [创意色如何在 1-2 个 section 内过渡到标准 AG token]
- **60-30-10 Mapping**: [Primary surface 60% / Neutral text 30% / Accent 10%]
- **Dark mode consideration**: [是否需要暗色版本，如何适配]

### 3. Typography Composition / 排版组合
- **Scale Strategy**: [模块化字阶名 + 比率，如"Perfect Fourth 1.333"]
- **Hero Title Treatment**:
  - font-size: [具体值 + clamp() 响应式]
  - font-weight: [≤600]
  - letter-spacing: [具体值]
  - line-height: [具体值]
  - max-width: [限制单行宽度]
- **Body Rhythm**: [非 Hero 区域如何使用标准 shadcn/AG 排版组件]
- **TOKEN_ESCAPE declarations**: [所有超出 AG 标准字阶的值]
- **Font families**: [system sans-serif + 可选 display font (TIER_3 only)]

### 4. Layout Choreography / 布局编排
- **Grid Strategy**: [列数/分割策略——如"12-column with asymmetric 7:5 split"]
- **Page Narrative Structure**: [从 visual-narrative.md 选择——如"Hero → Features → Social Proof → CTA"]
- **Vertical Rhythm Map**:

  | Section | Height Strategy | Spacing to Next | Notes |
  |---------|----------------|-----------------|-------|
  | Hero | 100vh / 80vh / auto | var(--space-12) | [full bleed / contained] |
  | Features | auto | var(--space-10) | [grid / stack] |
  | ... | ... | ... | ... |

- **Responsive Behavior**: [sm/md/lg/xl 各断点的关键变化]

### 5. Motion Choreography / 动效编排
- **Motion Style**: [动效语言名——如"staggered reveal"]
- **实现方案选择**: 从 `motion-choreography.md` §8 方案库选编排理论，从 `motion-libraries.md` 选具体开源库实现，标注质量等级（A/B/C）
- **Section-by-section motion plan**:

  | Section | Trigger | Animation | Duration | Easing | Delay |
  |---------|---------|-----------|----------|--------|-------|
  | Hero | page load | fade-up + scale(0.98→1) | 600ms | ease-out | 0 |
  | Features | scroll-enter | stagger-up | 400ms | ease-out | 100ms/item |
  | CTA | scroll-enter | fade-in | 300ms | ease | 0 |

- **prefers-reduced-motion fallback**: [每个动画的无动效回退——全部内容立即可见]
- **Performance budget**: [仅 transform+opacity / will-change 策略 / 总动画数 ≤8]

### 6. Illustration / Graphic Direction / 插画方向（如适用）
- **获取策略**: [资源库 / AI 生成(有参考) / 需专业插画师 — 按 `illustration-guide.md` §7 三级优先策略选择]
- **Style**: [插画风格——如"geometric abstract, single-stroke"]
- **Color Linkage**: [插画色彩如何从 Hero Palette 推导]
- **Placement**: [位置/尺寸/与文本的关系]
- **File Format**: [SVG preferred / PNG fallback, resolution]
- 如不需要插画，本章节标注 **N/A**

### 7. AG Compliance Bridge / AG 合规桥接
- **TIER Mapping**:

  | Page Zone | TIER | Treatment |
  |-----------|------|-----------|
  | Navigation | TIER_1 | 标准 AG，零修改 |
  | Hero | TIER_3 | 创意区，TOKEN_ESCAPE |
  | Body sections | TIER_2 | AG token + 装饰色扩展 |
  | Footer | TIER_1 | 标准 AG，零修改 |

- **Token Coverage**: [TOKEN_ESCAPE 数量 / 总视觉值数量 → 百分比]
- **Red Line Check**: [逐条确认 6 条铁律 + design-constitution section 2 红线无违反]
- **Transition Seams**: [精确描述创意区→标准区的"降落带"——哪里开始退化、用几个 section 过渡]
```

### Vision Spec 质量标准

- 每个 TOKEN_ESCAPE 必须有明确的 **scope**（作用域）和 **justification**（理由）
- 配色值必须有 **WCAG AA 对比度** 验证（文本色 vs 背景色 ≥ 4.5:1）
- 排版值必须给出 **clamp() 响应式** 写法
- 动效必须有 **prefers-reduced-motion** 回退

**输出**：完整 Vision Spec 草稿

---

## Step 4：合规桥接检查

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

4. **有冲突时**：调用 arbiter（接口 8），传递：

```markdown
## Vision → Arbiter 合规查询

- **Creative Intent**: [Vision Spec 想做什么]
- **Potential Conflict**: [哪条红线/原则有张力]
- **TIER Zone**: [TIER_2 / TIER_3]
- **Proposed Resolution**: [TOKEN_ESCAPE 声明 + 理由]
- **Fallback if Rejected**: [被否决后的回退方案]
```

5. **有红线张力时需用户确认**

**输出**：合规验证通过的 Vision Spec（或标注需要用户决策的冲突点）

---

## Step 5：交付 craft

**输入**：通过合规检查的 Vision Spec

**操作**：

1. 在 Vision Spec 末尾追加 **Craft Implementation Guide**：

```markdown
## Craft Implementation Guide / 实现指南

### Recipe 策略
- **TIER_3 区域**（Hero 等）：按 Vision Spec 值直接实现，每个 TOKEN_ESCAPE 在 recipe 中单独登记
- **TIER_2 区域**（Body sections）：走标准 recipe 流程，从 decision-tables + components-v2.md 选组件
- **TIER_1 区域**（Nav/Footer）：走标准 recipe 流程，零偏离

### Transition Seam 实现
- [描述从创意区到标准区的 CSS 过渡方式——如渐变覆盖层、颜色渐变、间距渐变]

### 技术栈建议
- **动效库**：[CSS-only / Framer Motion / GSAP，基于动效复杂度选择]
- **响应式**：[clamp() 为主 / media query 补充]
- **字体加载**：[如有 display font，加载策略]
```

2. 将 Vision Spec 传递给 craft（接口 7）

**输出**：完整的 Vision Spec + Craft Implementation Guide

---

## 审美自检清单（Step 5 交付前必须执行）

### Coherence / 一致性
- [ ] 所有颜色源自同一个调色板逻辑（和谐类型已记录）
- [ ] 排版最多 2 个字体族（1 display + system sans-serif）
- [ ] 插画风格与声明的风格原型一致
- [ ] 动效语言一致（同一个 easing 族、比例性时长）

### Impact / 冲击力
- [ ] Hero section 有一个明确的视觉焦点
- [ ] 首屏传达了核心信息
- [ ] 情绪关键词在可测量的视觉属性中得到体现（不只是文字声明）

### Hierarchy / 层级
- [ ] 页面各 section 有意的视觉权重变化（不全部等权）
- [ ] CTA 是最高对比度的交互元素
- [ ] 辅助内容在视觉上从属于主要内容

### Craft / 精致度
- [ ] 字阶有一致的数学比率
- [ ] 间距值遵循一致的比例体系
- [ ] 动效时长构成比例集合（不是随机值）
- [ ] 所有文本的颜色对比度 ≥ WCAG AA（4.5:1）

### AG Bridge / 衔接
- [ ] TIER_1 区域使用标准 AG token，零修改
- [ ] TIER_2 区域用 AG token + 文档化扩展
- [ ] TIER_3 区域每个非 token 值都有 TOKEN_ESCAPE 声明
- [ ] 创意区→标准区过渡视觉上顺滑（无突兀接缝）
- [ ] design-constitution section 2 红线无违反
- [ ] 所有动画有 prefers-reduced-motion 回退

---

## 护栏（防过度设计）

### 1. 内容-装饰比
首屏 ≥60% 面积是有意义内容（标题、副标题、CTA、核心信息），装饰元素（渐变、插画、背景效果）≤40%。

**检查方法**：心算首屏各区块面积占比。

### 2. 动画预算
每页最多 **8 个独立动画**。scroll-driven 动画每个触发区算 1 个。

**超出 → 合并或删减**，优先保留 Hero 入场和 CTA 区域动效。

### 3. TOKEN_ESCAPE 预算
每份 Vision Spec 最多 **15 个 TOKEN_ESCAPE 声明**。

- TIER_1 区域：0 个（铁律）
- TIER_2 区域：≤ 5 个
- TIER_3 区域：≤ 10 个

**超出 → 回 Step 3 精简**。优先保留配色和排版的 ESCAPE，动效尽量用 CSS 标准属性。

### 4. 字体预算
最多 **2 个字体族**：1 个 display font（TIER_3 only）+ system sans-serif。

**不引入 3 个以上字体**。AG 系统字体栈在非创意区域保持不变。

---

## 跨 Skill 协作接口

### 接口 6：compass → vision（Creative Brief Handoff）

**触发**：compass Step 5.5 标注 `视觉创新: 是`

```markdown
## Compass → Vision Handoff

- **页面类型**: [Landing page / 品牌页 / 营销活动页 / ...]
- **目标受众**: [角色描述]
- **核心信息**: [1-3 个关键信息]
- **情绪关键词**: [3-5 个情绪词]
- **已有约束**: [品牌指南 / 技术限制 / 内容量]
- **设计目标**: [从 compass Step 4 继承]
- **参考**: [用户提供的参考 URL/截图]
```

### 接口 7：vision → craft（Vision Spec Handoff）

**触发**：vision Step 5 完成

传递完整的 Vision Spec（7 章节）+ Craft Implementation Guide。craft 消费方式：
1. 读 TIER mapping 确定哪些区域用标准 recipe、哪些用创意 spec
2. TIER_3 区域的 recipe 中每个 TOKEN_ESCAPE 单独登记
3. TIER_1/TIER_2 区域走正常 craft 流程（components-v2.md + decision-tables）
4. 过渡接缝（transition seam）按 spec 描述实现

### 接口 8：vision ↔ arbiter（Creative Compliance Check）

**触发**：vision Step 4 发现红线张力

Vision → Arbiter 查询：
```markdown
- **Creative Intent**: [想做什么]
- **Potential Conflict**: [哪条红线有张力]
- **TIER Zone**: [TIER_2 / TIER_3]
- **Proposed Resolution**: [TOKEN_ESCAPE + 理由]
- **Fallback if Rejected**: [被否决后的方案]
```

Arbiter → Vision 裁决：
```markdown
- **Decision**: APPROVE / APPROVE_WITH_CONDITIONS / REJECT
- **Conditions**: [具体约束]
- **TIER Confirmation**: [确认 TIER 分类]
- **TOKEN_ESCAPE Approved**: [批准的 ESCAPE 清单 + 作用域限制]
```

---

## 失败模式处理

| 场景 | 处理 |
|------|------|
| 用户简报信息不足 | 追问，给出具体选项帮助用户填充 |
| 3 个方向都不满意 | 追问用户偏好，生成新一轮 3 个方向 |
| TOKEN_ESCAPE 超预算 | 回 Step 3，按"配色 > 排版 > 动效"优先级精简 |
| arbiter REJECT | 按 arbiter 条件修正，或给用户呈现冲突让用户决定 |
| 风格原型库不匹配 | 用 mood-board-method.md 从零构建方向，在 Vision Spec 中标注"自定义风格" |
| craft 反馈无法实现 | 回 Step 3 调整技术栈建议，或降低动效/插画复杂度 |

---

## 自演化机制

| 机制 | 触发条件 | 产出 |
|------|---------|------|
| 风格原型扩展 | 遇到新视觉风格且成功交付 | 新原型 → style-vocabulary.md |
| 调色板配方积累 | 创意配色方案获用户认可 | 新配方 → color-theory.md |
| 动效模式积累 | 新动效编排成功实现 | 新模式 → motion-choreography.md |
| 示例沉淀 | Vision Spec 成功交付并实现 | 新示例 → examples/ |
| 反面教材 | Vision Spec 被 arbiter REJECT 或用户否决 | 记录原因，避免重犯 |
