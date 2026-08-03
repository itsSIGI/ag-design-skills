# Vision Spec 示例：SaaS Landing Page

> 假设场景：AG 的 AI 化学研究平台需要一个面向科研机构决策者的产品 Landing page。
> 本示例展示完整的 Vision Spec 输出格式。

---

## Creative Brief / 创意简报

- **页面类型**：SaaS Landing Page
- **目标受众**：科研机构 CTO/IT 负责人，关注效率和可靠性
- **核心信息**：
  1. AI 加速化学研究 10 倍
  2. 与现有实验流程无缝集成
  3. 被 50+ 研究机构信赖
- **情绪关键词**：trustworthy, innovative, precise, modern, scientific
- **已有约束**：
  - 品牌：AG 品牌色体系（冷灰+蓝+绿）
  - 技术：Next.js + React，可用 Framer Motion
  - 内容：文案已定，有 3 张产品截图，有客户 logo
- **设计目标**：让决策者在 30 秒内理解产品价值并愿意预约 demo

---

## Vision Spec

### 1. Visual Direction / 视觉方向

- **Style Archetype**: Scientific Precision + Editorial Minimalism 混合
- **Mood Keywords**: precise, spacious, confident, scientific, modern
- **Reference Board**:
  | 参考 | 提取什么 | 丢弃什么 |
  |------|---------|---------|
  | Linear.app | 暗色 Hero + 产品截图浮起效果 + 微妙光晕 | 品牌紫色 |
  | Stripe.com | 排版节奏 + section 间距 + CTA 视觉层级 | 彩虹渐变 |
  | DeepMind.com | 科学权威感 + 数据可视化美学 | 具体研究内容 |

### 2. Color Strategy / 配色策略

- **Palette Type**: Near-monochromatic（冷灰）+ 单一功能性强调色（AG 蓝）

  | Role | Value | AG Token Mapping | Scope |
  |------|-------|------------------|-------|
  | Hero background | #0C0F1A | TOKEN_ESCAPE: hero-section-bg | Hero section 背景 |
  | Hero surface | rgba(255,255,255,0.04) | TOKEN_ESCAPE: hero-glass-surface | Hero 内卡片背景 |
  | Hero glow | radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12), transparent 70%) | TOKEN_ESCAPE: hero-glow | Hero 顶部光晕 |
  | Accent | #2563EB | TOKEN_ESCAPE: hero-cta | Hero CTA 按钮 |
  | Body background | var(--color-bg) | — | Body 段标准 AG 白 |
  | Body text | var(--color-text-primary) | — | 标准 AG |
  | Body secondary | var(--color-text-secondary) | — | 标准 AG |
  | Body border | var(--color-border-subtle) | — | 标准 AG |

- **Transition to TIER_1**: Hero 底部叠加 `linear-gradient(to bottom, transparent, var(--color-bg))` 80px 高度的渐变覆盖，从深色无缝过渡到白色 Body
- **60-30-10 Mapping**: 深色 Hero 背景 60% / 白色文字+浅色元素 30% / 蓝色 CTA+光晕 10%
- **Dark mode**: Hero 本身已是暗色，Body 段在暗色模式下自动跟随 AG data-theme="dark"

### 3. Typography Composition / 排版组合

- **Scale Strategy**: Perfect Fourth (1.333)，基准 16px
- **Hero Title Treatment**:
  ```
  font-size: clamp(40px, 5vw + 12px, 64px)
  font-weight: 600
  letter-spacing: -0.025em
  line-height: 1.08
  max-width: 18ch
  color: #FAFAFA
  ```
  TOKEN_ESCAPE: hero-title-size（超出 AG `<Display>` 36px 上限）

- **Hero Subtitle**:
  ```
  font-size: clamp(16px, 1.5vw + 8px, 20px)
  font-weight: 400
  line-height: 1.6
  max-width: 48ch
  color: rgba(255,255,255,0.7)
  ```
  TOKEN_ESCAPE: hero-subtitle

- **Body Rhythm**: 标准 AG 排版组件
  - Section 标题 → `<Heading>` (22px/600)
  - 正文 → `<Body>` (15px/400)
  - 辅助 → `<Caption>` (13px/400)
  - KPI 值 → `<Display>` (36px) + tabular-nums + letter-spacing -0.02em

- **Font families**: system-ui sans-serif（无额外 display font，靠字号和字重制造冲击力）

### 4. Layout Choreography / 布局编排

- **Grid Strategy**: 居中容器 max-width 1200px，12 列网格。Hero 全出血（full-bleed）。
- **Page Narrative Structure**: Classic SaaS — Hero → Features → Social Proof → CTA

  | Section | Height Strategy | Spacing to Next | Layout |
  |---------|----------------|-----------------|--------|
  | Hero | min-height: 90vh | 0（渐变过渡） | 居中单列，产品截图浮在标题下方 |
  | KPI Strip | auto (~80px) | var(--space-10) = 40px | 3 列等分，数字+标签 |
  | Features | auto | var(--space-12) = 48px | 2 列不对称（5:7），图文交替 |
  | Social Proof | auto | var(--space-10) = 40px | Logo 行 + 推荐语卡片 |
  | CTA | auto (~300px) | var(--space-8) = 32px | 居中单列 |
  | Footer | auto | 0 | 标准 AG footer |

- **Responsive Behavior**:
  - xl (≥1441px): 如上
  - lg (1025-1440px): 如上，max-width 缩至 1080px
  - md (769-1024px): Features 变单列堆叠，KPI 保持 3 列
  - sm (≤768px): 全部单列，Hero min-height 改为 auto + padding-top 80px

### 5. Motion Choreography / 动效编排

- **Motion Style**: Staggered reveal — 元素依次从下方 fade-up 进入

  | Section | Trigger | Animation | Duration | Easing | Delay |
  |---------|---------|-----------|----------|--------|-------|
  | Hero title | page load | fade-up + scale(0.98→1) | 600ms | ease-out | 0 |
  | Hero subtitle | page load | fade-up | 400ms | ease-out | 200ms |
  | Hero CTA | page load | fade-up | 400ms | ease-out | 400ms |
  | Hero screenshot | page load | fade-up + scale(0.96→1) | 700ms | ease-out | 300ms |
  | KPI numbers | scroll-enter | countUp (0→target) | 800ms | ease-out | stagger 100ms |
  | Features | scroll-enter | fade-up | 400ms | ease-out | stagger 100ms |
  | Logo row | scroll-enter | fade-in | 400ms | ease | 0 |
  | CTA section | scroll-enter | fade-up | 400ms | ease-out | 0 |

- **prefers-reduced-motion fallback**: 所有动画禁用，内容立即可见，KPI 数字直接显示最终值
- **Performance budget**: 8 个动画（符合预算）。仅 transform + opacity。scroll-enter 用 Intersection Observer threshold 0.2

### 6. Illustration / Graphic Direction / 插画方向

- **Style**: N/A — 本页面使用产品截图代替插画
- **装饰元素**:
  - Hero 区域：顶部蓝色径向渐变光晕（radial-gradient）
  - KPI Strip 和 Social Proof 之间：1px `var(--color-border-subtle)` 水平分隔线
  - 背景无其他装饰

### 7. AG Compliance Bridge / AG 合规桥接

- **TIER Mapping**:

  | Page Zone | TIER | Treatment |
  |-----------|------|-----------|
  | Navigation | TIER_1 | 标准 AG 导航，白色文字在深色 Hero 上，滚动后切回标准色 |
  | Hero | TIER_3 | 自定义深色背景 + 光晕 + 大标题 |
  | 渐变过渡带 | TIER_2→1 | 80px 渐变从深色到 var(--color-bg) |
  | KPI Strip | TIER_1 | `<Display>` + tabular-nums，标准 AG |
  | Features | TIER_1 | `<AgCard>` + `<Heading>` + `<Body>`，标准 AG |
  | Social Proof | TIER_1 | `<Caption>` + `<AgCard variant="whisper">`，标准 AG |
  | CTA | TIER_2 | 使用 Hero accent 色做 CTA 按钮（TOKEN_ESCAPE） |
  | Footer | TIER_1 | 标准 AG footer |

- **Token Coverage**: 7 个 TOKEN_ESCAPE / 约 45 个视觉值 = 84% token 覆盖率
- **Red Line Check**:
  - ✅ 无欺骗性设计
  - ✅ 无体验死胡同（CTA 明确，导航始终可用）
  - ✅ 对比度 AA（#FAFAFA on #0C0F1A = 18.2:1）
  - ✅ 品牌色使用合规
  - ✅ 字重 ≤ 600
  - ✅ 焦点环中性色（Hero 区域焦点用白色 ring）
- **Transition Seams**: Hero→Body 过渡用 80px 渐变覆盖层，视觉上无缝。CTA 区域从 Body 白色微升温到带有 accent 色的 surface-tint 背景。

---

## Craft Implementation Guide / 实现指南

### Recipe 策略
- **Hero 区域**：自建结构（全出血 section + 居中内容 + 浮起截图），每个 TOKEN_ESCAPE 在 recipe 登记
- **KPI Strip → Footer**：走标准 craft 流程，使用 `<AgCard>` / `<Display>` / `<Heading>` / `<Body>` / `<Caption>` 组件
- **CTA 按钮**：TOKEN_ESCAPE accent 色，但使用 `<Button>` 组件 + 自定义 bg-color

### Transition Seam 实现
```css
.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, transparent, var(--color-bg));
  pointer-events: none;
}
```

### 技术栈建议
- **动效**：CSS @keyframes + Intersection Observer（复杂度不高，无需 Framer Motion）
- **响应式**：clamp() 为主 + 2 个 media query（md/sm 断点）
- **KPI 计数动画**：轻量 JS countUp 或 CSS @property + @keyframes

---

## TOKEN_ESCAPE 汇总（7 个，未超预算 15）

| # | Name | Value | Scope | TIER |
|---|------|-------|-------|------|
| 1 | hero-section-bg | #0C0F1A | Hero background | TIER_3 |
| 2 | hero-glass-surface | rgba(255,255,255,0.04) | Hero 内卡片 | TIER_3 |
| 3 | hero-glow | radial-gradient(...) | Hero 顶部光晕 | TIER_3 |
| 4 | hero-cta | #2563EB | Hero CTA + 尾部 CTA | TIER_3/2 |
| 5 | hero-title-size | clamp(40px, 5vw+12px, 64px) | Hero 标题 | TIER_3 |
| 6 | hero-subtitle | clamp(16px, 1.5vw+8px, 20px) + rgba text color | Hero 副标题 | TIER_3 |
| 7 | hero-nav-text | #FAFAFA | 导航在 Hero 区域的文字色 | TIER_3 |
