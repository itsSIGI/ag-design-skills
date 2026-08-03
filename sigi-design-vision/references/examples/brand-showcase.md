# Vision Spec 示例：Brand Showcase / 品牌展示页

> 假设场景：AG 需要一个品牌展示页面，面向潜在合作伙伴和投资人，展示 AG 的技术实力和愿景。
> 采用 Dark Cinematic 风格，与 SaaS Landing 示例形成对比。

---

## Creative Brief / 创意简报

- **页面类型**：Brand Showcase / 品牌展示
- **目标受众**：潜在合作伙伴、投资人、行业领袖
- **核心信息**：
  1. AG 正在重新定义化学研究的未来
  2. 我们的 AI Agent 已经在改变研究方式
  3. 与我们合作，共同推动科学进步
- **情绪关键词**：dramatic, visionary, authoritative, futuristic, bold
- **已有约束**：
  - 品牌：AG 品牌色（蓝+绿）
  - 技术：Next.js + React + Framer Motion
  - 内容：品牌故事文案、团队成就数据、合作伙伴 logo、品牌视频
- **设计目标**：让访客在 60 秒内感受到 AG 的技术实力和愿景，产生合作意愿

---

## Vision Spec

### 1. Visual Direction / 视觉方向

- **Style Archetype**: Dark Cinematic
- **Mood Keywords**: dramatic, visionary, authoritative, futuristic, precise
- **Reference Board**:
  | 参考 | 提取什么 | 丢弃什么 |
  |------|---------|---------|
  | OpenAI.com | 暗色空间感 + 大标题冲击力 + 克制的绿色强调 | GPT 产品元素 |
  | Vercel.com 首页 | 代码美学 + 光线渐变 + 产品演示区域处理 | Vercel 品牌三角形 |
  | Apple Pro Display 页 | 产品"浮起"的戏剧性 + 极简文案 | Apple 品牌字体 |

### 2. Color Strategy / 配色策略

- **Palette Type**: Dark Dramatic（极深背景 + 高对比强调色）

  | Role | Value | AG Token Mapping | Scope |
  |------|-------|------------------|-------|
  | Page background | #050505 | TOKEN_ESCAPE: page-bg | 全页深黑背景 |
  | Surface | #111111 | TOKEN_ESCAPE: dark-surface | 内容卡片/区块 |
  | Surface elevated | #1A1A1A | TOKEN_ESCAPE: dark-surface-elevated | Hover 提升态 |
  | Text primary | #FAFAFA | TOKEN_ESCAPE: dark-text | 主文字 |
  | Text secondary | #A3A3A3 | TOKEN_ESCAPE: dark-text-secondary | 辅助文字 |
  | Accent green | #00BF74 | 来自 AG agent 绿 | Agent 状态 + 核心强调 |
  | Accent glow | radial-gradient(circle at 50% 30%, rgba(0,191,116,0.08), transparent 60%) | TOKEN_ESCAPE: accent-glow | 背景光晕 |
  | Border | rgba(255,255,255,0.08) | TOKEN_ESCAPE: dark-border | 微妙边框 |

- **Transition to TIER_1**: 本页面全程暗色，Footer 使用 AG dark theme token。导航使用标准 AG 暗色模式组件。
- **60-30-10**: 深黑背景 60% / 浅灰白文字 30% / 绿色强调 10%

### 3. Typography Composition / 排版组合

- **Scale Strategy**: Perfect Fifth (1.5)——极强视觉冲击

- **Hero Title Treatment**:
  ```
  font-size: clamp(56px, 8vw + 16px, 96px)
  font-weight: 600
  letter-spacing: -0.035em
  line-height: 1.0
  max-width: 14ch
  color: #FAFAFA
  ```
  TOKEN_ESCAPE: hero-display-size

- **Section Title**:
  ```
  font-size: clamp(32px, 4vw + 8px, 48px)
  font-weight: 600
  letter-spacing: -0.02em
  line-height: 1.1
  color: #FAFAFA
  ```
  TOKEN_ESCAPE: section-title-size

- **Body**: 18px/400 weight, line-height 1.7, color #A3A3A3, max-width 60ch
- **KPI Values**: 64px tabular-nums, letter-spacing -0.03em, color #FAFAFA

- **Font families**: system-ui sans-serif

### 4. Layout Choreography / 布局编排

- **Grid Strategy**: 居中 max-width 1080px，内容区偏窄增加沉浸感
- **Page Narrative Structure**: Story Arc — Setup → Tension → Journey → Resolution → Invitation

  | Section | Height | Spacing to Next | Layout |
  |---------|--------|-----------------|--------|
  | Hero | 100vh | 0 | 居中单列，极大标题 + 微妙光晕背景 |
  | Manifesto | auto | 120px | 居中单列，大段引言文字，max-width 720px |
  | KPI Impact | auto | 100px | 3 列数字 + 标签 |
  | Agent Showcase | auto | 100px | 交替布局——左文右图 / 右文左图，3 个 Agent 特性 |
  | Partners | auto | 80px | Logo 网格（3×4 或 4×3） |
  | Vision CTA | auto (~400px) | 60px | 居中单列，大标题 + CTA 按钮 + 绿色光晕背景 |
  | Footer | auto | 0 | 标准 AG 暗色 footer |

- **Responsive**:
  - xl: 如上
  - lg: max-width 960px
  - md: Agent Showcase 变单列，KPI 保持 3 列
  - sm: 全部单列，Hero 100vh → auto + 120px padding-top

### 5. Motion Choreography / 动效编排

- **Motion Style**: Cinematic reveal — 缓慢、有力的入场

  | Section | Trigger | Animation | Duration | Easing | Delay |
  |---------|---------|-----------|----------|--------|-------|
  | Hero title | page load | clip-reveal (inset from bottom) | 800ms | ease-out | 200ms |
  | Hero subtitle | page load | fade-in | 500ms | ease | 600ms |
  | Hero glow | page load | opacity 0→1 + scale(0.8→1) | 1200ms | ease-out | 0 |
  | Manifesto | scroll-enter | fade-up | 600ms | ease-out | 0 |
  | KPI numbers | scroll-enter | countUp | 1000ms | ease-out | stagger 150ms |
  | Agent cards | scroll-enter | slide-in (左/右交替) | 500ms | ease-out | 0 |
  | Partner logos | scroll-enter | fade-in | 400ms | ease | stagger 50ms |
  | CTA glow | scroll-enter | opacity pulse (0.6→1→0.6) | 3000ms | ease-in-out | infinite |

- **prefers-reduced-motion**: 所有动画禁用，内容直接可见。CTA glow 保持静态 opacity 0.8
- **Performance budget**: 8 个动画（符合预算），CTA pulse 是唯一的循环动画（装饰性，用 CSS @keyframes），不阻塞交互
- **实现**：Framer Motion（clip-reveal 和 slide-in 需要更精细的控制）

### 6. Illustration / Graphic Direction / 插画方向

- **Style**: 无插画。视觉冲击力来自排版+光效+产品截图
- **装饰元素**:
  - 绿色径向光晕（Hero 和 CTA 区域各一个）
  - 微妙的 noise overlay（0.02 opacity）增加深色背景质感
  - 极细的水平分隔线（rgba(255,255,255,0.06)）在 section 间

### 7. AG Compliance Bridge / AG 合规桥接

- **TIER Mapping**:

  | Page Zone | TIER | Treatment |
  |-----------|------|-----------|
  | Navigation | TIER_1 | AG 暗色模式标准导航 |
  | Hero | TIER_3 | 自定义深黑 + clip-reveal + 大标题 |
  | Manifesto | TIER_3 | 自定义排版（大段引言） |
  | KPI Impact | TIER_2 | AG `<Display>` 排版组件 + 自定义暗色背景 |
  | Agent Showcase | TIER_2 | AG `<AgCard>` 暗色变体 + `<Heading>`/`<Body>` 排版组件 |
  | Partners | TIER_1 | 标准 logo 网格 |
  | Vision CTA | TIER_3 | 自定义 CTA + 光晕 |
  | Footer | TIER_1 | AG 暗色标准 footer |

- **Token Coverage**: 10 个 TOKEN_ESCAPE / 约 50 个视觉值 = 80% token 覆盖率
- **Red Line Check**:
  - ✅ 无欺骗性设计
  - ✅ 无体验死胡同
  - ✅ 对比度 AA（#FAFAFA on #050505 = 19.6:1；#A3A3A3 on #050505 = 8.9:1）
  - ✅ AG 绿色用于 agent 状态 — 符合品牌色三处限定（agent 状态点）
  - ✅ 字重 ≤ 600
  - ✅ 焦点环使用白色 ring（中性色）
- **Transition Seams**: 全页暗色，无明暗过渡问题。TIER_3→TIER_2 过渡靠间距（100-120px 留白）和视觉能量递减（标题字号从 96px 降到 48px 降到 22px）自然完成。

---

## Craft Implementation Guide / 实现指南

### Recipe 策略
- **全页暗色模式**：设置根元素 `data-theme="dark"` 或自定义暗色 CSS 变量
- **Hero + Manifesto + CTA**：自建结构，TOKEN_ESCAPE 逐项登记
- **KPI + Agent Showcase + Partners**：使用 AG `<AgCard>` / `<Display>` / `<Heading>` 组件暗色变体
- **Footer**：标准 AG 暗色 footer

### 技术栈建议
- **动效**：Framer Motion（clip-reveal 和交替 slide-in 需要精细控制）
- **光晕**：CSS radial-gradient + 绝对定位 + pointer-events: none
- **Noise overlay**：SVG filter 或小型 noise.png 平铺
- **KPI countUp**：Framer Motion 的 useMotionValue + useTransform

---

## TOKEN_ESCAPE 汇总（10 个，未超预算 15）

| # | Name | Value | Scope | TIER |
|---|------|-------|-------|------|
| 1 | page-bg | #050505 | 全页背景 | TIER_3 |
| 2 | dark-surface | #111111 | 卡片/区块背景 | TIER_2/3 |
| 3 | dark-surface-elevated | #1A1A1A | Hover 态 | TIER_2 |
| 4 | dark-text | #FAFAFA | 主文字 | TIER_3 |
| 5 | dark-text-secondary | #A3A3A3 | 辅助文字 | TIER_2/3 |
| 6 | accent-glow | radial-gradient(...) | 背景光晕 | TIER_3 |
| 7 | dark-border | rgba(255,255,255,0.08) | 微妙边框 | TIER_2/3 |
| 8 | hero-display-size | clamp(56px,...,96px) | Hero 标题 | TIER_3 |
| 9 | section-title-size | clamp(32px,...,48px) | Section 标题 | TIER_3 |
| 10 | noise-overlay | opacity 0.02 noise | 背景纹理 | TIER_3 |
