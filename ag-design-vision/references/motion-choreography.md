# 审美动效编排 — Motion Choreography

> 超越 AG 功能性 transition（0.15-0.2s ease）的表现力动效指导。
> 用于 Vision Spec 的动效编排章节。

---

## 1. 动效类别

### 1.1 入场动画（Entrance）

页面加载或首次出现时的元素入场。

| 名称 | CSS 描述 | 适合场景 |
|------|---------|---------|
| **fade-up** | opacity 0→1 + translateY(20px→0) | 通用型，最安全 |
| **fade-in** | opacity 0→1 | 极微妙，用于辅助元素 |
| **scale-reveal** | opacity 0→1 + scale(0.95→1) | Hero 主元素，"呼吸"感 |
| **slide-in-left/right** | translateX(±40px→0) + opacity | 双列布局的两侧元素 |
| **clip-reveal** | clip-path: inset(100% 0 0 0) → inset(0) | 戏剧性揭幕，品牌页 |
| **blur-in** | filter: blur(10px→0) + opacity | 梦幻/科技感 |

```css
/* fade-up 标准实现 */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 500ms ease-out both;
}
```

### 1.2 Scroll-driven（滚动驱动）

元素进入视口时触发。

**Intersection Observer 实现**：
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
```

**CSS scroll-timeline（渐进增强）**：
```css
/* 进度跟随滚动——用于渐变背景变化/parallax */
@supports (animation-timeline: scroll()) {
  .scroll-driven {
    animation: scrollReveal linear;
    animation-timeline: view();
    animation-range: entry 0% entry 100%;
  }
}
```

### 1.3 Stagger（交错延迟）

列表/网格元素依次入场，制造"波浪"效果。

| 元素数量 | 单个延迟 | 总延迟不超过 |
|---------|---------|-------------|
| 3-4 个 | 100-120ms | 500ms |
| 5-8 个 | 80-100ms | 700ms |
| 9-12 个 | 60-80ms | 800ms |
| 12+ 个 | 不建议 stagger，改用分组入场 |

```css
/* CSS stagger */
.stagger-item {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 400ms ease-out, transform 400ms ease-out;
}
.stagger-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}
/* 每个元素延迟递增 */
.stagger-item:nth-child(1) { transition-delay: 0ms; }
.stagger-item:nth-child(2) { transition-delay: 100ms; }
.stagger-item:nth-child(3) { transition-delay: 200ms; }
/* ... 或用 CSS 变量 + calc */
.stagger-item {
  transition-delay: calc(var(--index, 0) * 100ms);
}
```

### 1.4 Hover 编排

卡片/图片/按钮的 hover 微交互。

| 元素 | Hover 效果 | 时长 |
|------|-----------|------|
| 卡片 | box-shadow 提升 + translateY(-2px~-4px) | 200ms ease |
| 图片 | scale(1.02~1.05) | 300ms ease-out |
| 按钮 | background-color change | 150ms ease |
| 链接 | color + underline-offset | 150ms ease |
| 图标 | rotate(5deg~15deg) 或 scale(1.1) | 200ms ease |

### 1.5 页面过渡

SPA 路由切换或分步表单。

| 过渡类型 | 推荐场景 | 实现 |
|---------|---------|------|
| Cross-fade | 通用，最安全 | opacity 交叉 250ms |
| Slide | 向导/步骤 | translateX 300ms |
| Morph | 列表→详情 | View Transitions API |

---

## 2. Easing 词汇表

| 名称 | cubic-bezier 值 | 用途 |
|------|----------------|------|
| **ease-out** | (0, 0, 0.2, 1) | 入场动画——快速到达，缓慢落地 |
| **ease-in** | (0.4, 0, 1, 1) | 退场动画——缓慢开始，快速离开 |
| **ease-in-out** | (0.4, 0, 0.2, 1) | 循环/摆动——两端缓，中间快 |
| **spring** | (0.34, 1.56, 0.64, 1) | 弹性——有轻微过冲，活泼感 |
| **sharp** | (0.4, 0, 0.6, 1) | 精确——干脆利落 |
| **linear** | (0, 0, 1, 1) | 进度条/持续动画——匀速 |

**选择决策**：
```
元素在"到达"？ → ease-out（90% 场景的默认选择）
元素在"离开"？ → ease-in
元素在"往返"？ → ease-in-out
需要活泼感？   → spring（谨慎使用，过度弹跳会分散注意力）
```

---

## 3. 时长规则

### 3.1 基准表

| 动画类型 | 时长范围 | 推荐值 |
|---------|---------|--------|
| 微交互（hover/focus） | 100-200ms | 150ms |
| 元素入场 | 300-600ms | 400-500ms |
| 展开/折叠 | 200-300ms | 250ms |
| 页面过渡 | 200-350ms | 300ms |
| Hero 入场 | 500-800ms | 600ms |
| Stagger 总时长 | 不超过 | 800ms |

### 3.2 比例原则
同一个 Vision Spec 内的时长应成比例：

```
基准：入场动画 = 400ms
Hero 入场 = 1.5x = 600ms
微交互 = 0.4x = 150ms
展开折叠 = 0.6x = 250ms
```

### 3.3 铁律
- **永远不要**让用户等动画——内容必须在 1s 内可见
- **永远不要**循环播放装饰动画（除 loading spinner 和 agent 状态点）
- **永远不要**用动效延迟"优化" Time to Interactive——内容立即可用

---

## 4. 性能规则

### 4.1 只动 transform 和 opacity
这两个属性不触发 layout 或 paint，由 GPU 直接合成：

```css
/* ✅ 性能安全 */
transform: translateY() / scale() / rotate()
opacity: 0 → 1

/* ❌ 触发 layout/paint，会卡 */
width / height / margin / padding / top / left
background-color（频繁变化时）
filter: blur()（初始渲染可以，动画中避免）
```

### 4.2 will-change 使用
```css
/* 仅在即将动画的元素上使用 */
.about-to-animate {
  will-change: transform, opacity;
}
/* 动画结束后移除 */
.done-animating {
  will-change: auto;
}
```
**约束**：同时 `will-change` 的元素不超过 10 个——每个都占用 GPU 内存。

### 4.3 减少重排
- 用 `transform: translateY()` 代替 `margin-top` 变化
- 用 `scale()` 代替 `width/height` 变化
- 折叠动画用 `max-height` + `overflow: hidden`，不用 `height`

---

## 5. prefers-reduced-motion 强制回退

**每一个动画都必须有 reduced-motion 回退**：

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**或逐个声明**：
```css
.hero-title {
  animation: fadeUp 600ms ease-out;
}
@media (prefers-reduced-motion: reduce) {
  .hero-title {
    animation: none;
    opacity: 1;  /* 内容立即可见 */
  }
}
```

**铁律**：reduced-motion 用户必须看到所有内容，只是没有动画。不能因为禁用动画导致内容不可见。

---

## 6. 实现技术选择

### 6.1 决策树
```
动效复杂度？
│
├─ 仅 CSS transition/animation → CSS-only（推荐）
│  适合：fade/slide/scale 入场、hover、简单 stagger
│
├─ 需要 scroll 触发 → Intersection Observer + CSS class toggle
│  适合：scroll-reveal、scroll-driven 动画
│
├─ 需要复杂编排（timeline、spring physics、gesture） → Framer Motion（React）
│  适合：页面过渡、拖拽、复杂 stagger、spring 弹性
│
└─ 需要极高控制（SVG path animation、canvas、WebGL） → GSAP
   适合：logo 动画、粒子效果、3D 变换
```

### 6.2 AG 功能性动效保持不变
Vision Spec 只增强 TIER_3 创意区域的动效。TIER_1/TIER_2 区域的 AG 功能性动效保持不变：

| AG 元素 | AG 动效 | Vision 修改？ |
|---------|--------|--------------|
| 按钮 hover | bg-color 150ms | 否 |
| 卡片 hover | shadow + translateY 200ms | 否 |
| Modal 出入 | opacity + scale 250ms | 否 |
| Toast | translateY + opacity 250ms | 否 |
| 折叠面板 | height + opacity 200ms | 否 |
| Agent 状态点 | pulse 1.5s infinite | 否 |

---

## 7. 动画预算自检

Vision Spec 完成后核对：

- [ ] 独立动画总数 ≤ 8
- [ ] 首屏内容在 1s 内全部可见（不被动画延迟阻挡）
- [ ] 所有动画只使用 transform + opacity
- [ ] 同时 will-change 的元素 ≤ 10
- [ ] 每个动画有 prefers-reduced-motion 回退
- [ ] Stagger 总时长 ≤ 800ms
- [ ] 无循环播放的装饰动画
- [ ] TIER_1/TIER_2 区域使用 AG 标准动效，未修改

---

## 8. 经过验证的动效方案库

> 不凭空发挥——从成熟方案中选取。每个方案标注质量风险等级（A 低风险 / B 中风险 / C 高风险）。

### 8.1 CSS 原生方案（质量等级 A — AI 可独立完成）

| 效果 | 实现 | 代码模板 |
|------|------|---------|
| fade-up / fade-in | `@keyframes` + `opacity` + `translateY` | 见 §1.1 |
| scale-reveal | `@keyframes` + `opacity` + `scale` | 见 §1.1 |
| clip-reveal | `@keyframes` + `clip-path: inset()` | 见 §1.1 |
| stagger | CSS `transition-delay` + `calc(var(--index) * delay)` | 见 §1.3 |
| hover 微交互 | `transition` on `transform` / `box-shadow` / `opacity` | 见 §1.4 |
| CSS scroll-driven | `animation-timeline: view()` + 渐进增强 | 见 §1.2 |
| 渐变背景动画 | `@keyframes` + `background-position` / hue-rotate | `background-size: 200% 200%; animation: gradient 8s ease infinite` |
| 下划线展开 | `::after` + `transform: scaleX(0→1)` + `transition` | `transform-origin: left; transition: transform 0.3s ease` |
| 文字逐行显示 | `@keyframes` + `clip-path` 逐行 | 每行独立动画，stagger 100-200ms |

### 8.2 Intersection Observer 模式（质量等级 A — 零依赖）

```javascript
// 通用 scroll-reveal 控制器
function createScrollReveal(selector, options = {}) {
  const { threshold = 0.2, rootMargin = '0px', once = true } = options;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (once) observer.unobserve(entry.target);
      }
    });
  }, { threshold, rootMargin });
  document.querySelectorAll(selector).forEach(el => observer.observe(el));
  return observer;
}
```

### 8.3 Framer Motion 方案（React 生态，质量等级 A-B）

| 效果 | API | 质量 | 模板 |
|------|-----|------|------|
| 基础入场 | `motion.div` + `initial/animate` | A | `<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>` |
| scroll-triggered | `useInView` + `motion.div` | A | `const ref = useRef(); const inView = useInView(ref, { once: true }); <motion.div ref={ref} animate={inView ? { opacity: 1 } : { opacity: 0 }}>` |
| stagger 列表 | `variants` + `staggerChildren` | A | `const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }` |
| layout animation | `layoutId` + `AnimatePresence` | B | `<motion.div layoutId="card-1">` 配合 `<AnimatePresence>` |
| spring physics | `transition: { type: 'spring', stiffness, damping }` | B | `transition={{ type: 'spring', stiffness: 100, damping: 15 }}` |
| AnimatePresence | 组件出入场 | A | `<AnimatePresence mode="wait">` 包裹路由 |
| useMotionValue | KPI 数字动画 | B | `const count = useMotionValue(0); const rounded = useTransform(count, Math.round)` |
| 手势 | `whileHover` / `whileTap` / `drag` | A | `<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>` |

### 8.4 GSAP 方案（高控制力，质量等级 B-C）

| 效果 | 插件 | 质量 | 适用 |
|------|------|------|------|
| scroll-triggered 动画 | ScrollTrigger | B | 精确控制滚动位置触发、pin 固定、scrub 跟随 |
| 文字拆分动画 | SplitText | B | 逐字/逐词/逐行入场。需 GSAP Club 许可证 |
| SVG 路径绘制 | DrawSVG | C | 线条从无到有绘制效果。需 Club 许可证 |
| SVG 形变 | MorphSVG | C | 一个 SVG 形状变为另一个。需 Club 许可证 |
| Timeline 编排 | gsap.timeline() | B | 多个动画精确排序和同步 |
| 弹性/物理 | gsap.to + ease: "elastic/bounce" | B | 弹性回弹效果 |

**注意**：GSAP 免费版仅包含核心 + ScrollTrigger。SplitText/DrawSVG/MorphSVG 需要 GSAP Club 许可证。使用前确认项目许可状态。

### 8.5 Lottie 动画（设计师产出，质量等级 A-B）

| 用途 | 来源 | 质量 | 实现 |
|------|------|------|------|
| 装饰/插画动画 | After Effects → Bodymovin → Lottie JSON | A | `<lottie-player src="animation.json" loop autoplay>` |
| 微交互图标 | LottieFiles 资源库 | A | `@lottiefiles/lottie-player` 或 `lottie-react` |
| loading 状态 | LottieFiles 搜索 "loading" | A | 替代纯 CSS spinner |
| 复杂插画入场 | 定制 AE 动画 | B | 需要设计师/动画师产出 AE 文件 |

**LottieFiles 资源库**（lottiefiles.com）：免费动画库，质量有保证。搜索时优先选 "Free" + "Featured" 的动画。

**Lottie React 集成**：
```bash
npm install lottie-react
```
```jsx
import Lottie from 'lottie-react';
import animationData from './animation.json';
<Lottie animationData={animationData} loop={true} style={{ width: 200 }} />
```

### 8.6 专门库（特定效果，质量等级 A）

| 效果 | 库名 | 大小 | 实现 |
|------|------|------|------|
| 数字计数动画 | [countUp.js](https://github.com/inorganik/countUp.js) | 4KB | `new CountUp('target', 12345, { duration: 2.5 })` |
| 打字机效果 | [typed.js](https://github.com/mattboldt/typed.js) | 12KB | `new Typed('#el', { strings: ['text1', 'text2'], typeSpeed: 50 })` |
| 轮播/滑动 | [embla-carousel](https://www.embla-carousel.com/) | 7KB | 轻量可定制轮播，React/Vue/Vanilla |
| 轮播（功能丰富） | [swiper](https://swiperjs.com/) | 30KB | 功能最全的轮播库，parallax/zoom/virtual slides |
| 列表过渡 | [@formkit/auto-animate](https://auto-animate.formkit.com/) | 2KB | `useAutoAnimate()` 自动为列表增删添加动画 |
| 平滑滚动 | [Lenis](https://lenis.darkroom.engineering/) | 8KB | `new Lenis({ lerp: 0.1 })` 丝滑惯性滚动 |
| 视差滚动 | [simple-parallax-js](https://simpleparallax.com/) | 5KB | `new simpleParallax(image, { scale: 1.3 })` |
| 文字拆分（免费） | [splitting.js](https://splitting.js.org/) | 3KB | 逐字/逐行包裹 span 用于 CSS 动画，GSAP SplitText 的免费替代 |
| 画布粒子 | [tsparticles](https://particles.js.org/) | 25KB | 粒子背景效果，高度可配置 |
| 3D 倾斜 | [vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/) | 3KB | 鼠标跟随 3D 倾斜效果 |

### 8.7 方案选择决策树

```
需要什么类型的动效？
│
├─ fade/slide/scale 入场 + hover → CSS 原生（§8.1）
│
├─ scroll-reveal（进入视口触发）→ Intersection Observer（§8.2）+ CSS class toggle
│
├─ React 项目 + stagger/spring/layout → Framer Motion（§8.3）
│
├─ 精确 scroll timeline / pin / 复杂编排 → GSAP ScrollTrigger（§8.4）
│
├─ 装饰动画 / icon 动画 → Lottie（§8.5）
│
├─ 数字/打字机/轮播 → 专门库（§8.6）
│
└─ 粒子/3D/WebGL → tsparticles / Three.js（质量等级 C，慎用）
```

---

## 9. 动效质量分级与把控

### 9.1 三级质量体系

#### A 级 — AI 可独立完成，质量可控

**范围**：CSS transition/animation、Intersection Observer + class toggle、简单 Framer Motion variants、hover 微交互、fade/slide/scale 入场、stagger（≤8 个元素）

**质量检查**：
- [ ] 只使用 `transform` + `opacity`（无 layout/paint 触发）
- [ ] 时长在基准范围内（§3.1）
- [ ] easing 来自词汇表（§2）
- [ ] 有 `prefers-reduced-motion` 回退
- [ ] 在 60fps 下运行（无明显掉帧）

#### B 级 — AI 可完成但需搜索参考验证

**范围**：复杂 stagger 编排（>8 元素）、scroll-driven 视差、Spring physics、GSAP Timeline 编排、Framer Motion layout animation、KPI 数字动画

**质量检查**（A 级全部 + 以下）：
- [ ] 主动搜索 Dribbble/CodePen/GitHub 上的参考实现
- [ ] 参考实现的效果与预期一致后再编写
- [ ] 测试不同滚动速度/屏幕尺寸下的表现
- [ ] Spring 参数经过调试（stiffness/damping 不是随机值）
- [ ] GSAP 动画清理（组件卸载时 kill）

#### C 级 — 建议使用成熟库或外部资源

**范围**：SVG 路径动画、粒子效果、3D 变换（Three.js/WebGL）、复杂 canvas 动画、自定义物理模拟

**策略**：
- 优先使用 Lottie 动画文件（设计师在 After Effects 中制作，导出 JSON）
- 粒子效果使用 tsparticles（高度可配置，不需要从零写）
- 3D 倾斜使用 vanilla-tilt.js（轻量，效果稳定）
- 如果以上库无法满足需求 → **标注为"需要专业动效开发者介入"**，给出详细的动效 Brief

**C 级动效 Brief 模板**（当需要外部开发时）：
```markdown
## 动效 Brief

- **效果描述**：[具体的视觉效果]
- **触发方式**：[page load / scroll / hover / click]
- **参考作品**：[URL + 截图]
- **技术栈**：[建议的实现库]
- **性能要求**：[目标 FPS / 移动端是否需要]
- **降级方案**：[低端设备/reduce-motion 下的替代]
```

### 9.2 动效决策流程

```
确定动效需求
│
├─ 在 §8 方案库中找到匹配方案？
│  ├─ YES + 质量 A 级 → 直接使用代码模板
│  ├─ YES + 质量 B 级 → 搜索参考实现后使用
│  └─ YES + 质量 C 级 → 使用推荐库，不从零写
│
├─ 方案库中没有匹配？
│  ├─ 主动搜索 Dribbble/CodePen 寻找类似效果的实现
│  ├─ 找到可参考的实现 → 按参考编写，标注为 B 级
│  └─ 未找到或复杂度过高 → 标注为 C 级，输出动效 Brief
│
└─ 用户没有明确动效需求？
   → vision 根据风格方向自动推导合适的动效方案
   → 只在大方向上征求用户意见："整体动效偏克制还是偏丰富？"
   → 具体动效选择由 vision 自主决策
```
