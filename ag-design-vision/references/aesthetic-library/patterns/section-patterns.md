# Section 视觉范式库 — Section Patterns

> 按页面 section 类型分类的视觉范式。用于 Vision Spec §4 Layout Choreography 中定义每个 section 的具体布局。
> 每个 pattern 提供完整的布局参数、排版层级、动效推荐和 CSS 骨架，可直接填入 Spec。

---

## 使用方法

1. 根据 visual-narrative.md 选定的叙事结构，确定页面包含哪些 section
2. 为每个 section 从本文件中选取匹配的 pattern
3. 根据 style-vocabulary.md 选定的风格原型，筛选"适用风格"匹配的 pattern
4. 将 pattern 的布局参数、排版层级、动效推荐填入 Vision Spec §4
5. 根据项目实际需求调整 CSS 变量值

---

## 一、Hero Section

### 1.1 Centered Headline Hero — 居中大标题型

**适用风格**: Editorial Minimalism / Swiss / Scientific Precision
**视觉能量**: ★★★★☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-16, 64px) var(--space-6, 24px) |
| min-height | 85vh |
| grid | 单列居中 |
| text-align | center |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Title | clamp(2.5rem, 5vw + 1rem, 4.5rem) | 600 | --color-text-primary | 800px |
| Subtitle | clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem) | 400 | --color-text-secondary | 600px |
| CTA | 1rem | 500 | --color-text-on-accent | auto |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| Title | fade-up (§1.1) | 600ms | ease-out (0,0,0.2,1) | page-load |
| Subtitle | fade-up (§1.1) | 500ms | ease-out | page-load, delay 150ms |
| CTA | fade-up (§1.1) | 400ms | ease-out | page-load, delay 300ms |

**CSS 骨架**:
```css
.hero-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  padding: var(--space-16) var(--space-6);
  text-align: center;
}

.hero-centered__title {
  font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  font-weight: 600;
  line-height: 1.1;
  max-width: 800px;
  color: var(--color-text-primary);
}

.hero-centered__subtitle {
  margin-top: var(--space-4);
  font-size: clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem);
  font-weight: 400;
  line-height: 1.6;
  max-width: 600px;
  color: var(--color-text-secondary);
}

.hero-centered__cta {
  margin-top: var(--space-8);
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | min-height: 70vh; padding 缩减至 var(--space-12) |
| sm (≤768px) | min-height: 60vh; Title max-width: 100% |

**参考来源**: Stripe.com 首页、Notion.so 首页

---

### 1.2 Split Screen Hero — 分屏型

**适用风格**: Swiss / Bento Grid / Editorial Minimalism
**视觉能量**: ★★★★☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-16, 64px) var(--space-6, 24px) |
| min-height | 80vh |
| grid | grid-template-columns: 1fr 1fr; gap: var(--space-12) |
| text-align | left |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Title | clamp(2rem, 4vw + 0.5rem, 3.5rem) | 600 | --color-text-primary | 100% |
| Subtitle | clamp(1rem, 1.2vw + 0.5rem, 1.25rem) | 400 | --color-text-secondary | 100% |
| Body | 1rem | 400 | --color-text-tertiary | 100% |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| 文字列 | slide-in-left (§1.1) | 600ms | ease-out | page-load |
| 图片列 | slide-in-right (§1.1) | 600ms | ease-out | page-load, delay 100ms |
| CTA | fade-up (§1.1) | 400ms | ease-out | page-load, delay 300ms |

**CSS 骨架**:
```css
.hero-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
  min-height: 80vh;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
}

.hero-split__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.hero-split__title {
  font-size: clamp(2rem, 4vw + 0.5rem, 3.5rem);
  font-weight: 600;
  line-height: 1.15;
  color: var(--color-text-primary);
}

.hero-split__subtitle {
  font-size: clamp(1rem, 1.2vw + 0.5rem, 1.25rem);
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.hero-split__media {
  position: relative;
  border-radius: var(--radius-lg, 12px);
  overflow: hidden;
}

.hero-split__media img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | grid-template-columns: 1fr; 图片在文字下方; min-height: auto |
| sm (≤768px) | padding 缩减; gap 缩减至 var(--space-6) |

**参考来源**: Linear.app 首页、Vercel.com 产品页

---

### 1.3 Full-Bleed Background Hero — 全出血背景型

**适用风格**: Dark Cinematic / Gradient Flow / Glassmorphism
**视觉能量**: ★★★★★

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | 100vw（全出血） |
| padding | var(--space-20, 80px) var(--space-6, 24px) |
| min-height | 100vh |
| grid | 单列居中，内容区 max-width: 800px |
| text-align | center |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Title | clamp(2.5rem, 6vw + 1rem, 5rem) | 700 | --color-text-on-dark 或 #FFFFFF | 800px |
| Subtitle | clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem) | 400 | rgba(255,255,255,0.8) | 600px |
| CTA | 1.125rem | 500 | --color-text-on-accent | auto |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| 背景 | scale-reveal (§1.1) | 800ms | ease-out | page-load |
| Title | blur-in (§1.1) | 700ms | ease-out | page-load, delay 200ms |
| Subtitle | fade-up (§1.1) | 500ms | ease-out | page-load, delay 400ms |
| CTA | fade-up (§1.1) | 400ms | ease-out | page-load, delay 550ms |

**CSS 骨架**:
```css
.hero-fullbleed {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--space-20) var(--space-6);
  text-align: center;
  overflow: hidden;
}

.hero-fullbleed__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-fullbleed__bg img,
.hero-fullbleed__bg video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-fullbleed__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
}

.hero-fullbleed__content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-fullbleed__title {
  font-size: clamp(2.5rem, 6vw + 1rem, 5rem);
  font-weight: 700;
  line-height: 1.05;
  color: #ffffff;
}

.hero-fullbleed__subtitle {
  margin-top: var(--space-4);
  font-size: clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | min-height: 80vh; overlay 加深至 0.5-0.7 以提升文字可读性 |
| sm (≤768px) | min-height: 70vh; Title 字号 clamp 下限降至 2rem |

**参考来源**: Apple Vision Pro 页面、OpenAI.com 首页

---

### 1.4 Product Screenshot Float Hero — 产品截图浮起型

**适用风格**: Bento Grid / Glassmorphism / Swiss
**视觉能量**: ★★★★☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-16, 64px) var(--space-6, 24px) 0 |
| min-height | auto（取决于截图高度） |
| grid | 单列居中，文字在上，截图在下溢出 |
| text-align | center |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Title | clamp(2rem, 4vw + 1rem, 3.75rem) | 600 | --color-text-primary | 700px |
| Subtitle | clamp(1rem, 1.2vw + 0.5rem, 1.25rem) | 400 | --color-text-secondary | 560px |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| Title | fade-up (§1.1) | 600ms | ease-out | page-load |
| Subtitle | fade-up (§1.1) | 500ms | ease-out | page-load, delay 150ms |
| 截图 | fade-up + scale(0.95→1) | 800ms | spring (0.34,1.56,0.64,1) | page-load, delay 300ms |

**CSS 骨架**:
```css
.hero-screenshot {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6) 0;
  text-align: center;
}

.hero-screenshot__title {
  font-size: clamp(2rem, 4vw + 1rem, 3.75rem);
  font-weight: 600;
  line-height: 1.15;
  max-width: 700px;
  color: var(--color-text-primary);
}

.hero-screenshot__subtitle {
  margin-top: var(--space-4);
  font-size: clamp(1rem, 1.2vw + 0.5rem, 1.25rem);
  line-height: 1.6;
  max-width: 560px;
  color: var(--color-text-secondary);
}

.hero-screenshot__image {
  margin-top: var(--space-10);
  width: 100%;
  max-width: 960px;
  border-radius: var(--radius-xl, 16px) var(--radius-xl, 16px) 0 0;
  box-shadow:
    0 -4px 6px rgba(0, 0, 0, 0.02),
    0 -20px 60px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.hero-screenshot__image img {
  width: 100%;
  height: auto;
  display: block;
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | 截图 max-width: 100%; padding-top 缩减 |
| sm (≤768px) | 截图圆角缩小至 var(--radius-md, 8px); box-shadow 减弱 |

**参考来源**: Linear.app 首页、Raycast.com 首页

---

### 1.5 Gradient Glow Hero — 渐变光晕型

**适用风格**: Gradient Flow / Glassmorphism / Dark Cinematic
**视觉能量**: ★★★★★

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | 100vw（全出血背景）; 内容区 max-width: 800px |
| padding | var(--space-20, 80px) var(--space-6, 24px) |
| min-height | 90vh |
| grid | 单列居中 |
| text-align | center |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Title | clamp(2.5rem, 5vw + 1rem, 4.5rem) | 600 | --color-text-primary; 可用 background-clip: text 渐变文字 | 800px |
| Subtitle | clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem) | 400 | --color-text-secondary | 600px |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| 光晕 | 渐变背景动画 (§8.1) | 8s loop | ease-in-out | page-load |
| Title | blur-in (§1.1) | 700ms | ease-out | page-load, delay 200ms |
| Subtitle | fade-up (§1.1) | 500ms | ease-out | page-load, delay 400ms |

**CSS 骨架**:
```css
.hero-glow {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  padding: var(--space-20) var(--space-6);
  text-align: center;
  background: var(--color-bg-primary, #0a0a0a);
  overflow: hidden;
}

.hero-glow__orb {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.4;
  pointer-events: none;
}

.hero-glow__orb--primary {
  top: 20%;
  left: 30%;
  background: var(--color-glow-primary, #6366f1);
}

.hero-glow__orb--secondary {
  bottom: 20%;
  right: 25%;
  background: var(--color-glow-secondary, #06b6d4);
}

@keyframes glowPulse {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.15); opacity: 0.5; }
}

.hero-glow__orb {
  animation: glowPulse 8s ease-in-out infinite;
}

.hero-glow__content {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.hero-glow__title {
  font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  font-weight: 600;
  line-height: 1.1;
  color: var(--color-text-primary, #ffffff);
}

/* 渐变文字（可选） */
.hero-glow__title--gradient {
  background: linear-gradient(
    135deg,
    var(--color-glow-primary, #6366f1),
    var(--color-glow-secondary, #06b6d4)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-glow__subtitle {
  margin-top: var(--space-4);
  font-size: clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem);
  line-height: 1.6;
  color: var(--color-text-secondary, rgba(255, 255, 255, 0.7));
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | 光晕尺寸缩小至 400px; min-height: 75vh |
| sm (≤768px) | 光晕尺寸缩小至 280px; blur 降至 80px 以提升移动端性能 |

**参考来源**: Raycast.com 首页、Vercel.com 首页、Linear.app

---

## 二、Feature Section

### 2.1 Zigzag Features — 图文交替型

**适用风格**: Editorial Minimalism / Swiss / Organic
**视觉能量**: ★★★☆☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-16, 64px) var(--space-6, 24px) |
| min-height | auto |
| grid | grid-template-columns: 1fr 1fr; 奇偶行图文方向互换 |
| text-align | left |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Section Label | 0.875rem | 600 | --color-accent | auto |
| Title | clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem) | 600 | --color-text-primary | 100% |
| Body | 1rem | 400 | --color-text-secondary | 100% |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| 每组图文 | fade-up (§1.1) | 500ms | ease-out | scroll-reveal (§1.2) threshold 0.2 |
| 图片 | scale-reveal (§1.1) | 600ms | ease-out | scroll-reveal, delay 100ms |

**CSS 骨架**:
```css
.zigzag {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
}

.zigzag__item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
}

.zigzag__item + .zigzag__item {
  margin-top: var(--space-16);
}

/* 偶数行反转方向 */
.zigzag__item:nth-child(even) {
  direction: rtl;
}
.zigzag__item:nth-child(even) > * {
  direction: ltr;
}

.zigzag__label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent);
}

.zigzag__title {
  margin-top: var(--space-2);
  font-size: clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem);
  font-weight: 600;
  line-height: 1.25;
  color: var(--color-text-primary);
}

.zigzag__body {
  margin-top: var(--space-3);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.zigzag__media {
  border-radius: var(--radius-lg, 12px);
  overflow: hidden;
}

.zigzag__media img {
  width: 100%;
  height: auto;
  display: block;
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | grid-template-columns: 1fr; 图片在文字下方; direction 恢复 ltr |
| sm (≤768px) | gap 缩减至 var(--space-6); 间距全面缩减 |

**参考来源**: Stripe.com 功能介绍、Slack.com 功能页

---

### 2.2 Bento Grid Features — Bento 网格型

**适用风格**: Bento Grid / Glassmorphism / Gradient Flow
**视觉能量**: ★★★★☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-16, 64px) var(--space-6, 24px) |
| min-height | auto |
| grid | grid-template-columns: repeat(3, 1fr); 部分 cell 跨列 |
| text-align | left |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Section Title | clamp(1.75rem, 3vw + 0.5rem, 2.5rem) | 600 | --color-text-primary | 600px |
| Cell Title | 1.25rem | 500 | --color-text-primary | auto |
| Cell Body | 0.9375rem | 400 | --color-text-secondary | auto |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| Section Title | fade-up (§1.1) | 500ms | ease-out | scroll-reveal |
| Bento Cells | stagger fade-up (§1.3) | 400ms each, 100ms delay | ease-out | scroll-reveal |

**CSS 骨架**:
```css
.bento {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
}

.bento__header {
  text-align: center;
  margin-bottom: var(--space-10);
}

.bento__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4, 16px);
}

.bento__cell {
  padding: var(--space-6);
  background: var(--color-bg-elevated, #f8f9fa);
  border-radius: var(--radius-lg, 12px);
  border: 1px solid var(--color-border-subtle, rgba(0, 0, 0, 0.06));
  overflow: hidden;
}

/* 大 cell — 跨 2 列 */
.bento__cell--wide {
  grid-column: span 2;
}

/* 高 cell — 跨 2 行 */
.bento__cell--tall {
  grid-row: span 2;
}

.bento__cell-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.bento__cell-body {
  margin-top: var(--space-2);
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.bento__cell-visual {
  margin-top: var(--space-4);
  border-radius: var(--radius-md, 8px);
  overflow: hidden;
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | grid-template-columns: repeat(2, 1fr); --wide cell 仍跨 2 列 |
| sm (≤768px) | grid-template-columns: 1fr; 所有 cell 全宽; span 失效 |

**参考来源**: Apple.com 功能对比页、Vercel.com Dashboard 概览

---

### 2.3 Icon List Features — 图标列表型

**适用风格**: Swiss / Scientific Precision / Editorial Minimalism
**视觉能量**: ★★★☆☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-16, 64px) var(--space-6, 24px) |
| min-height | auto |
| grid | grid-template-columns: repeat(3, 1fr) 或 repeat(4, 1fr) |
| text-align | center 或 left |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Section Title | clamp(1.75rem, 3vw + 0.5rem, 2.5rem) | 600 | --color-text-primary | 600px |
| Feature Title | 1.125rem | 500 | --color-text-primary | auto |
| Feature Body | 0.9375rem | 400 | --color-text-secondary | auto |
| Icon | 2.5rem (40px) | — | --color-accent | 40px x 40px |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| Section Title | fade-up (§1.1) | 500ms | ease-out | scroll-reveal |
| Feature items | stagger fade-up (§1.3) | 400ms each, 80ms delay | ease-out | scroll-reveal |
| Icons | scale-reveal (§1.1) | 400ms | spring (0.34,1.56,0.64,1) | scroll-reveal, 与文字同步 |

**CSS 骨架**:
```css
.icon-features {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
}

.icon-features__header {
  text-align: center;
  margin-bottom: var(--space-10);
}

.icon-features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

.icon-features__item {
  display: flex;
  flex-direction: column;
  align-items: center; /* 居中型；左对齐型改为 flex-start */
  text-align: center;  /* 居中型；左对齐型改为 left */
}

.icon-features__icon {
  width: 40px;
  height: 40px;
  color: var(--color-accent);
  margin-bottom: var(--space-3);
}

.icon-features__title {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.icon-features__body {
  margin-top: var(--space-2);
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | grid-template-columns: repeat(2, 1fr) |
| sm (≤768px) | grid-template-columns: 1fr; items 改为左对齐 + 水平排列（icon 在左，文字在右） |

**参考来源**: Tailwind CSS 官网、GitHub Features 页

---

### 2.4 Large Image Feature — 大图+描述型

**适用风格**: Editorial Minimalism / Dark Cinematic / Gradient Flow
**视觉能量**: ★★★★☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-16, 64px) var(--space-6, 24px) |
| min-height | auto |
| grid | 单列；大图全宽，描述文字在下方居中 |
| text-align | center（描述区）|

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Label | 0.875rem | 600 | --color-accent | auto |
| Title | clamp(1.75rem, 3vw + 0.5rem, 2.5rem) | 600 | --color-text-primary | 640px |
| Body | 1rem | 400 | --color-text-secondary | 560px |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| 图片 | scale-reveal (§1.1) | 700ms | ease-out | scroll-reveal |
| 文字区 | fade-up (§1.1) | 500ms | ease-out | scroll-reveal, delay 150ms |

**CSS 骨架**:
```css
.large-image-feature {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
}

.large-image-feature__media {
  width: 100%;
  border-radius: var(--radius-xl, 16px);
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
}

.large-image-feature__media img {
  width: 100%;
  height: auto;
  display: block;
}

.large-image-feature__content {
  margin-top: var(--space-8);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.large-image-feature__label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent);
}

.large-image-feature__title {
  margin-top: var(--space-2);
  font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
  font-weight: 600;
  line-height: 1.25;
  max-width: 640px;
  color: var(--color-text-primary);
}

.large-image-feature__body {
  margin-top: var(--space-3);
  font-size: 1rem;
  line-height: 1.7;
  max-width: 560px;
  color: var(--color-text-secondary);
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | 圆角缩小至 var(--radius-lg, 12px); box-shadow 减弱 |
| sm (≤768px) | 圆角缩小至 var(--radius-md, 8px); padding 缩减 |

**参考来源**: Apple.com 产品页（iPhone/Mac 大图展示）、Figma.com 功能页

---

## 三、Social Proof Section

### 3.1 Logo Strip — Logo 条带型

**适用风格**: Swiss / Editorial Minimalism / Scientific Precision（通用，适合所有风格）
**视觉能量**: ★★☆☆☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-10, 40px) var(--space-6, 24px) |
| min-height | auto |
| grid | flex, justify-content: center, gap: var(--space-10) |
| text-align | center |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Caption | 0.875rem | 500 | --color-text-tertiary | auto |
| Logo | — | — | grayscale + opacity 0.5 | 高度 24-36px |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| Caption | fade-in (§1.1) | 400ms | ease-out | scroll-reveal |
| Logos | stagger fade-in (§1.3) | 300ms each, 60ms delay | ease-out | scroll-reveal |

**CSS 骨架**:
```css
.logo-strip {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-10) var(--space-6);
  text-align: center;
}

.logo-strip__caption {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-6);
}

.logo-strip__logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--space-10);
}

.logo-strip__item {
  height: 28px;
  opacity: 0.5;
  filter: grayscale(1);
  transition: opacity 200ms ease, filter 200ms ease;
}

.logo-strip__item:hover {
  opacity: 1;
  filter: grayscale(0);
}

.logo-strip__item img {
  height: 100%;
  width: auto;
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | gap 缩减至 var(--space-8); logo 高度缩至 24px |
| sm (≤768px) | 3 列网格替代 flex 排列; gap 缩减至 var(--space-6) |

**参考来源**: Vercel.com、Stripe.com、几乎所有 SaaS 首页

---

### 3.2 Testimonial Cards — 推荐语卡片型

**适用风格**: Bento Grid / Glassmorphism / Organic
**视觉能量**: ★★★☆☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-16, 64px) var(--space-6, 24px) |
| min-height | auto |
| grid | grid-template-columns: repeat(3, 1fr); gap: var(--space-6) |
| text-align | left |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Section Title | clamp(1.75rem, 3vw + 0.5rem, 2.5rem) | 600 | --color-text-primary | 600px |
| Quote | 1rem | 400 italic | --color-text-primary | 100% |
| Author Name | 0.9375rem | 500 | --color-text-primary | auto |
| Author Title | 0.8125rem | 400 | --color-text-tertiary | auto |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| Section Title | fade-up (§1.1) | 500ms | ease-out | scroll-reveal |
| Cards | stagger fade-up (§1.3) | 400ms each, 100ms delay | ease-out | scroll-reveal |
| Cards hover | translateY(-2px) + shadow 提升 (§1.4) | 200ms | ease | hover |

**CSS 骨架**:
```css
.testimonials {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
}

.testimonials__header {
  text-align: center;
  margin-bottom: var(--space-10);
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.testimonials__card {
  padding: var(--space-6);
  background: var(--color-bg-elevated, #ffffff);
  border-radius: var(--radius-lg, 12px);
  border: 1px solid var(--color-border-subtle, rgba(0, 0, 0, 0.06));
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.testimonials__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.testimonials__quote {
  font-size: 1rem;
  font-style: italic;
  line-height: 1.7;
  color: var(--color-text-primary);
}

.testimonials__author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.testimonials__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonials__author-name {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.testimonials__author-title {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | grid-template-columns: repeat(2, 1fr); 第 3 张卡片全宽或隐藏 |
| sm (≤768px) | grid-template-columns: 1fr; 或改为横向滚动轮播（embla-carousel §8.6） |

**参考来源**: Linear.app 客户推荐、Notion.so 客户页

---

### 3.3 KPI Numbers — KPI 数字型

**适用风格**: Scientific Precision / Swiss / Editorial Minimalism
**视觉能量**: ★★★☆☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-12, 48px) var(--space-6, 24px) |
| min-height | auto |
| grid | flex 或 grid-template-columns: repeat(3, 1fr) 或 repeat(4, 1fr) |
| text-align | center |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Number | clamp(2.5rem, 4vw + 1rem, 4rem) | 700 | --color-text-primary | auto |
| Label | 0.9375rem | 400 | --color-text-secondary | auto |
| Unit/Suffix | clamp(1.5rem, 2vw, 2rem) | 400 | --color-text-tertiary | auto |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| Numbers | countUp.js (§8.6) 数字滚动 | 2000-2500ms | ease-out | scroll-reveal, once |
| Labels | fade-up (§1.1) | 400ms | ease-out | scroll-reveal, delay 200ms |

**CSS 骨架**:
```css
.kpi-numbers {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-12) var(--space-6);
}

.kpi-numbers__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  text-align: center;
}

.kpi-numbers__item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.kpi-numbers__value {
  font-size: clamp(2.5rem, 4vw + 1rem, 4rem);
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--color-text-primary);
}

.kpi-numbers__suffix {
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 400;
  color: var(--color-text-tertiary);
}

.kpi-numbers__label {
  margin-top: var(--space-2);
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}

/* 可选：分隔线 */
.kpi-numbers__item + .kpi-numbers__item {
  border-left: 1px solid var(--color-border-subtle);
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | 数字字号缩小; gap 缩减 |
| sm (≤768px) | grid-template-columns: 1fr; 分隔线改为水平方向; 或改为 2 列 |

**参考来源**: Stripe.com 经济指标展示、GitHub Octoverse 数据页

---

## 四、CTA Section

### 4.1 Centered Simple CTA — 居中简洁型

**适用风格**: Editorial Minimalism / Swiss / Scientific Precision（通用）
**视觉能量**: ★★★★☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px); 内容区 max-width: 640px |
| padding | var(--space-16, 64px) var(--space-6, 24px) |
| min-height | auto |
| grid | 单列居中 |
| text-align | center |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Title | clamp(1.75rem, 3vw + 0.5rem, 2.5rem) | 600 | --color-text-primary | 640px |
| Subtitle | 1.125rem | 400 | --color-text-secondary | 500px |
| CTA Button | 1.125rem | 500 | --color-text-on-accent | auto |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| 整块 | fade-up (§1.1) | 500ms | ease-out | scroll-reveal |
| Button | scale-reveal (§1.1) | 400ms | spring | scroll-reveal, delay 200ms |

**CSS 骨架**:
```css
.cta-centered {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-centered__title {
  font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
  font-weight: 600;
  line-height: 1.2;
  max-width: 640px;
  color: var(--color-text-primary);
}

.cta-centered__subtitle {
  margin-top: var(--space-3);
  font-size: 1.125rem;
  line-height: 1.6;
  max-width: 500px;
  color: var(--color-text-secondary);
}

.cta-centered__button {
  margin-top: var(--space-8);
  padding: var(--space-3) var(--space-8);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-text-on-accent);
  background: var(--color-accent);
  border: none;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: background 150ms ease, transform 150ms ease;
}

.cta-centered__button:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | padding 缩减; 无大变化 |
| sm (≤768px) | Button 全宽; padding 缩减 |

**参考来源**: 几乎所有 SaaS 首页的通用 CTA 模式

---

### 4.2 Decorated Background CTA — 带背景装饰型

**适用风格**: Gradient Flow / Dark Cinematic / Glassmorphism
**视觉能量**: ★★★★★

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | 100%（背景全出血）; 内容区 max-width: 800px |
| padding | var(--space-16, 64px) var(--space-6, 24px) |
| min-height | auto |
| grid | 单列居中 |
| text-align | center |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Title | clamp(1.75rem, 3vw + 0.5rem, 2.75rem) | 600 | #FFFFFF 或 --color-text-on-dark | 700px |
| Subtitle | 1.125rem | 400 | rgba(255,255,255,0.8) | 560px |
| CTA Button | 1.125rem | 500 | --color-text-primary | auto |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| 背景装饰 | 渐变背景动画 (§8.1) | 6s loop | ease-in-out | scroll-reveal |
| Title | fade-up (§1.1) | 500ms | ease-out | scroll-reveal |
| Button | fade-up (§1.1) | 400ms | ease-out | scroll-reveal, delay 200ms |

**CSS 骨架**:
```css
.cta-decorated {
  position: relative;
  padding: var(--space-16) var(--space-6);
  text-align: center;
  background: var(--color-bg-dark, #0f172a);
  overflow: hidden;
}

/* 装饰性渐变 */
.cta-decorated::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -20%;
  width: 140%;
  height: 200%;
  background: radial-gradient(
    ellipse at 50% 50%,
    var(--color-accent-alpha, rgba(99, 102, 241, 0.15)) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.cta-decorated__content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-decorated__title {
  font-size: clamp(1.75rem, 3vw + 0.5rem, 2.75rem);
  font-weight: 600;
  line-height: 1.2;
  max-width: 700px;
  color: #ffffff;
}

.cta-decorated__subtitle {
  margin-top: var(--space-3);
  font-size: 1.125rem;
  line-height: 1.6;
  max-width: 560px;
  color: rgba(255, 255, 255, 0.8);
}

/* 浅色按钮（反色） */
.cta-decorated__button {
  margin-top: var(--space-8);
  padding: var(--space-3) var(--space-8);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-text-primary, #0f172a);
  background: #ffffff;
  border: none;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.cta-decorated__button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | padding 缩减; 渐变范围调整 |
| sm (≤768px) | 渐变 opacity 降低以节省移动端性能; Button 全宽 |

**参考来源**: Vercel.com CTA 区域、Linear.app 底部 CTA

---

### 4.3 Two-Column CTA — 双列型（文案+表单）

**适用风格**: Swiss / Bento Grid / Editorial Minimalism
**视觉能量**: ★★★☆☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-16, 64px) var(--space-6, 24px) |
| min-height | auto |
| grid | grid-template-columns: 1fr 1fr; gap: var(--space-12) |
| text-align | left |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Title | clamp(1.75rem, 3vw + 0.5rem, 2.5rem) | 600 | --color-text-primary | 100% |
| Body | 1rem | 400 | --color-text-secondary | 100% |
| Input Label | 0.875rem | 500 | --color-text-primary | auto |
| Input | 1rem | 400 | --color-text-primary | 100% |
| Submit Button | 1rem | 500 | --color-text-on-accent | 100% |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| 文案列 | slide-in-left (§1.1) | 500ms | ease-out | scroll-reveal |
| 表单列 | slide-in-right (§1.1) | 500ms | ease-out | scroll-reveal, delay 100ms |

**CSS 骨架**:
```css
.cta-twocol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-16) var(--space-6);
}

.cta-twocol__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.cta-twocol__title {
  font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-text-primary);
}

.cta-twocol__body {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.cta-twocol__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--color-bg-elevated, #f8f9fa);
  border-radius: var(--radius-lg, 12px);
  border: 1px solid var(--color-border-subtle, rgba(0, 0, 0, 0.06));
}

.cta-twocol__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.cta-twocol__input {
  padding: var(--space-2) var(--space-3);
  font-size: 1rem;
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: var(--radius-sm, 6px);
  background: var(--color-bg-primary, #ffffff);
  color: var(--color-text-primary);
  transition: border-color 150ms ease;
}

.cta-twocol__input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-alpha, rgba(99, 102, 241, 0.15));
}

.cta-twocol__submit {
  padding: var(--space-3);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-on-accent);
  background: var(--color-accent);
  border: none;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: background 150ms ease;
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | grid-template-columns: 1fr; 表单在文案下方 |
| sm (≤768px) | 表单 padding 缩减; gap 缩减 |

**参考来源**: HubSpot 注册表单 CTA、Notion.so 企业版 CTA

---

## 五、Footer Section

### 5.1 Minimal Footer — 简洁单行型

**适用风格**: Editorial Minimalism / Swiss / Scientific Precision
**视觉能量**: ★☆☆☆☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-6, 24px) |
| min-height | auto |
| grid | flex, justify-content: space-between |
| text-align | — |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Brand/Logo | 1rem | 600 | --color-text-primary | auto |
| Copyright | 0.8125rem | 400 | --color-text-tertiary | auto |
| Links | 0.8125rem | 400 | --color-text-secondary | auto |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| 无入场动效 | — | — | — | — |
| Links hover | color change (§1.4) | 150ms | ease | hover |

**CSS 骨架**:
```css
.footer-minimal {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-border-subtle, rgba(0, 0, 0, 0.06));
}

.footer-minimal__brand {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.footer-minimal__links {
  display: flex;
  gap: var(--space-4);
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-minimal__link {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 150ms ease;
}

.footer-minimal__link:hover {
  color: var(--color-text-primary);
}

.footer-minimal__copyright {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | 无大变化 |
| sm (≤768px) | flex-direction: column; gap: var(--space-3); text-align: center |

**参考来源**: Linear.app Footer、Stripe.com 子页面 Footer

---

### 5.2 Multi-Column Footer — 多列导航型

**适用风格**: Swiss / Bento Grid / 通用
**视觉能量**: ★★☆☆☆

**布局参数**:
| 属性 | 值 |
|------|-----|
| max-width | var(--content-width, 1200px) |
| padding | var(--space-12, 48px) var(--space-6, 24px) var(--space-6, 24px) |
| min-height | auto |
| grid | grid-template-columns: 2fr repeat(3, 1fr); gap: var(--space-8) |
| text-align | left |

**排版层级**:
| 元素 | font-size | weight | color token | max-width |
|------|-----------|--------|------------|-----------|
| Brand/Logo | 1.125rem | 600 | --color-text-primary | auto |
| Brand Description | 0.875rem | 400 | --color-text-secondary | 280px |
| Column Title | 0.8125rem | 600 | --color-text-primary | auto |
| Column Link | 0.875rem | 400 | --color-text-secondary | auto |
| Copyright | 0.8125rem | 400 | --color-text-tertiary | auto |

**动效推荐**:
| 元素 | Animation | Duration | Easing | Trigger |
|------|-----------|----------|--------|---------|
| 无入场动效 | — | — | — | — |
| Links hover | color change (§1.4) | 150ms | ease | hover |

**CSS 骨架**:
```css
.footer-multicol {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-12) var(--space-6) var(--space-6);
  border-top: 1px solid var(--color-border-subtle, rgba(0, 0, 0, 0.06));
}

.footer-multicol__grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: var(--space-8);
}

.footer-multicol__brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-multicol__brand-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.footer-multicol__brand-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  max-width: 280px;
  color: var(--color-text-secondary);
}

.footer-multicol__column-title {
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.footer-multicol__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-multicol__link {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 150ms ease;
}

.footer-multicol__link:hover {
  color: var(--color-text-primary);
}

/* 底栏 */
.footer-multicol__bottom {
  margin-top: var(--space-8);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-multicol__copyright {
  font-size: 0.8125rem;
  color: var(--color-text-tertiary);
}

.footer-multicol__social {
  display: flex;
  gap: var(--space-3);
}

.footer-multicol__social-icon {
  width: 20px;
  height: 20px;
  color: var(--color-text-tertiary);
  transition: color 150ms ease;
}

.footer-multicol__social-icon:hover {
  color: var(--color-text-primary);
}
```

**响应式退化**:
| 断点 | 变化 |
|------|------|
| md (≤1024px) | grid-template-columns: repeat(2, 1fr); brand 列跨 2 列 |
| sm (≤768px) | grid-template-columns: 1fr; 每列全宽; 可折叠为手风琴 |

**参考来源**: Stripe.com Footer、Vercel.com Footer、Tailwind CSS 官网 Footer

---

## 六、Pattern 选择速查

### 按风格原型推荐

| 风格原型 | Hero | Feature | Social Proof | CTA | Footer |
|---------|------|---------|-------------|-----|--------|
| Editorial Minimalism | 居中大标题 / 分屏 | 图文交替 / 大图+描述 | Logo 条带 / KPI 数字 | 居中简洁 | 简洁单行 |
| Swiss | 居中大标题 / 分屏 | 图标列表 / 图文交替 | Logo 条带 / KPI 数字 | 居中简洁 / 双列 | 多列导航 |
| Glassmorphism | 渐变光晕 / 全出血背景 | Bento 网格 | 推荐语卡片 | 带背景装饰 | 简洁单行 |
| Dark Cinematic | 全出血背景 / 渐变光晕 | 大图+描述 | KPI 数字 | 带背景装饰 | 简洁单行 |
| Bento Grid | 产品截图浮起 / 分屏 | Bento 网格 | 推荐语卡片 | 双列 | 多列导航 |
| Gradient Flow | 渐变光晕 / 全出血背景 | Bento 网格 / 大图+描述 | Logo 条带 | 带背景装饰 | 简洁单行 |
| Neo-Brutalism | 居中大标题（粗体变体） | Bento 网格（粗边框变体） | KPI 数字 | 居中简洁（高对比变体） | 简洁单行 |
| Scientific Precision | 居中大标题 | 图标列表 | KPI 数字 | 居中简洁 | 多列导航 |
| Organic | 分屏 / 产品截图浮起 | 图文交替 | 推荐语卡片 | 双列 | 多列导航 |
| Retro | 居中大标题（衬线变体） | 图文交替 | 推荐语卡片 | 居中简洁 | 简洁单行 |
| Neon | 全出血背景 / 渐变光晕 | Bento 网格（发光变体） | KPI 数字 | 带背景装饰（霓虹变体） | 简洁单行 |

### 按视觉能量推荐

| 能量等级 | 适合的 Pattern |
|---------|---------------|
| ★★★★★ | 全出血背景 Hero / 渐变光晕 Hero / 带背景装饰 CTA |
| ★★★★ | 居中大标题 Hero / 分屏 Hero / 产品截图浮起 Hero / Bento 网格 / 大图+描述 |
| ★★★ | 图文交替 / 图标列表 / 推荐语卡片 / KPI 数字 / 双列 CTA |
| ★★ | Logo 条带 / 多列导航 Footer |
| ★ | 简洁单行 Footer |

---

## 七、CSS 变量契约

所有 pattern 依赖以下 CSS 变量。实际项目中由 AG token 或自定义主题提供值：

```css
:root {
  /* 间距体系（8px 基准） */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* 颜色 */
  --color-text-primary: /* 项目定义 */;
  --color-text-secondary: /* 项目定义 */;
  --color-text-tertiary: /* 项目定义 */;
  --color-text-on-accent: /* 项目定义 */;
  --color-text-on-dark: /* 项目定义 */;
  --color-accent: /* 项目定义 */;
  --color-accent-hover: /* 项目定义 */;
  --color-accent-alpha: /* 项目定义 */;
  --color-bg-primary: /* 项目定义 */;
  --color-bg-elevated: /* 项目定义 */;
  --color-bg-dark: /* 项目定义 */;
  --color-border: /* 项目定义 */;
  --color-border-subtle: /* 项目定义 */;

  /* 圆角 */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* 内容宽度 */
  --content-width: 1200px;

  /* 光晕色（渐变光晕型专用） */
  --color-glow-primary: /* 项目定义 */;
  --color-glow-secondary: /* 项目定义 */;
}
```

---

## 八、使用注意事项

1. **Pattern 是骨架，不是成品**：每个 pattern 提供结构性 CSS，实际项目需要根据风格原型调整颜色、字体、圆角等具体值
2. **可混合使用**：一个 section 可以在某个 pattern 骨架上叠加另一个风格原型的视觉参数（如用"居中大标题"骨架 + Dark Cinematic 的配色）
3. **响应式退化是最低保障**：表中只列出关键断点的核心变化，实际可能需要更多微调
4. **动效方案全部引用 motion-choreography.md**：不在本文件中定义新动效，只引用已验证的方案库
5. **CSS 变量优先**：所有硬编码值都有 CSS 变量回退，方便与 AG token 或任何设计系统对接
6. **视觉能量需全局平衡**：参见 visual-narrative.md §3 的能量分配规则，避免所有 section 都选择高能量 pattern
