# 动效开源库推荐 — Motion Libraries

> 收录可直接使用的现成动效资源库。与 `motion-choreography.md`（动效编排理论）互补——
> 本文件解决"用什么库实现"，前者解决"动效该怎么编排"。
>
> **优先用现成库的高质量预设，而不是手写 CSS 动画。**

---

## 使用决策树

```
需要什么动效？
│
├─ 页面入场/滚动显现（fade-in, slide-up 等）
│  ├─ shadcn/Tailwind 项目 → Magic UI / tailwindcss-animated
│  ├─ 快速加到现有页面 → AOS（滚动触发）/ Animate.css（入场）
│  └─ React 零配置 → AutoAnimate
│
├─ 炫酷视觉组件（3D 卡片、光束、渐变动效等）
│  ├─ 最全选择 → React Bits（150+ 组件）
│  ├─ 与 shadcn 同架构 → Magic UI
│  └─ 最炫特效 → Aceternity UI
│
├─ 文字动效（打字机、字符拆分、数字滚动）
│  ├─ 打字机效果 → Typed.js
│  ├─ 字符级动画 → Splitting.js
│  └─ 数字翻转/滚动 → Number Flow
│
├─ 背景特效（粒子、3D 背景、纸屑）
│  ├─ 粒子效果 → tsParticles
│  ├─ 3D 动态背景 → Vanta.js
│  └─ 庆祝/纸屑 → canvas-confetti
│
├─ 滚动体验（平滑滚动、视差）
│  ├─ 平滑滚动 → Lenis（最活跃）
│  ├─ 视差滚动 → Rellax（轻量）/ Locomotive Scroll（全功能）
│  └─ 图片视差 → SimpleParallax.js
│
├─ 微交互（悬浮、标注、SVG 描边）
│  ├─ 3D 悬浮效果 → Atropos
│  ├─ 手绘标注动画 → Rough Notation
│  └─ SVG 路径描边 → Vivus
│
└─ 底层动画引擎（自己编排时用，已在 motion-choreography.md §8 覆盖）
   → Framer Motion / GSAP / CSS Animations
```

---

## 一、React 动效组件库（复制粘贴型）

> **首选方案**。与 shadcn/Tailwind 生态一致，提供可直接复制的现成组件。

### React Bits ★★★★★

- **npm**: `react-bits`（也可复制粘贴）
- **GitHub**: ~41k stars（2025 年爆发）
- **做什么**: 大量现成动效组件——3D 效果、文字动画、背景特效、交互组件
- **安装**: 复制粘贴或 npm 安装
- **兼容**: React + Tailwind
- **维护**: 活跃（2026-06）
- **Vision 用途**: Hero 动效组件、文字效果、背景装饰

### Magic UI ★★★★★

- **npm**: CLI 安装 `npx magicui-cli add [组件名]`
- **GitHub**: ~21k stars
- **做什么**: 150+ 动画组件，与 shadcn/ui 同架构（CLI 添加到项目）
- **安装**: CLI 添加单个组件，与 shadcn 体验一致
- **兼容**: React/Next.js + Tailwind
- **维护**: 活跃（2026-06）
- **Vision 用途**: Landing page 动效组件、TIER_3 区域视觉增强
- **AG 集成**: 架构与 shadcn 一致，token 化包装方式相同

### Aceternity UI ★★★★☆

- **npm**: CLI 安装
- **做什么**: 以炫酷 3D/视觉特效闻名（3D 卡片、光束、背景网格、聚光灯等）
- **兼容**: React/Next.js + Tailwind
- **维护**: 活跃
- **Vision 用途**: 需要强视觉冲击力的 TIER_3 区域
- **注意**: 部分效果偏重，注意性能预算

### Motion Primitives ★★★★☆

- **npm**: CLI 安装
- **GitHub**: ~5.6k stars
- **做什么**: 精美的动画 UI 组件——文字动效、过渡、手势
- **兼容**: React + Tailwind
- **维护**: 活跃（2026-03）

### AutoAnimate ★★★★☆

- **npm**: `@formkit/auto-animate`
- **GitHub**: ~14k stars
- **做什么**: 零配置自动过渡动画——列表增删、显隐切换自动添加动画
- **安装**: 一行代码激活
- **兼容**: React / Vue / 原生
- **维护**: 活跃（2026-04）
- **Vision 用途**: TIER_2 区域的列表/卡片过渡，零开发成本

---

## 二、滚动动效库

### AOS ★★★★★

- **npm**: `aos`
- **GitHub**: ~28k stars
- **做什么**: 最流行的滚动显现库，30+ 预设动画（fade/flip/slide/zoom），加 `data-aos` 属性即用
- **兼容**: 框架无关
- **维护**: 稳定（经典库）
- **Vision 用途**: 通用滚动入场动画，最安全的选择

### Lenis ★★★★☆

- **npm**: `lenis`
- **GitHub**: ~14k stars
- **做什么**: 平滑滚动库，提供惯性滚动效果
- **兼容**: 有 React wrapper
- **维护**: 活跃（2026-06）
- **Vision 用途**: 需要高级滚动体验的 Landing page

### Rellax ★★★☆☆

- **npm**: `rellax`
- **GitHub**: ~7k stars
- **做什么**: 轻量视差滚动（仅 1.5kb），`data-rellax` 属性驱动
- **兼容**: 框架无关
- **Vision 用途**: 简单视差效果，零负担

---

## 三、文字与数字动效

### Typed.js ★★★★☆

- **npm**: `typed.js`
- **GitHub**: ~16k stars
- **做什么**: 打字机效果——多行、退格、循环、自定义速度
- **兼容**: 有 React wrapper
- **维护**: 活跃（2026-01）
- **Vision 用途**: Hero 标题打字机效果

### Number Flow ★★★★★

- **npm**: `@number-flow/react`
- **GitHub**: ~7.4k stars
- **做什么**: 数字滚动/翻转动画，支持货币/百分比等格式
- **兼容**: React / Vue / Svelte 原生组件
- **维护**: 活跃（2026-06）
- **Vision 用途**: KPI 数字动效、计数器、价格展示
- **AG 集成**: 替代手写 `tabular-nums` + countUp 方案

### Splitting.js ★★★☆☆

- **npm**: `splitting`
- **GitHub**: ~1.8k stars
- **做什么**: 文字/元素拆分，把文字拆成单个字符/单词并注入 CSS 变量
- **兼容**: 框架无关
- **Vision 用途**: 字符级入场动画、交错显现

---

## 四、背景与粒子特效

### tsParticles ★★★★☆

- **npm**: `@tsparticles/react`
- **GitHub**: ~8.9k stars
- **做什么**: particles.js 增强版——粒子/纸屑/烟花/雪花等 100+ 预设
- **兼容**: React / Vue / Angular 组件
- **维护**: 活跃（2026-06）
- **Vision 用途**: Hero 背景粒子效果
- **注意**: 预设丰富但需控制粒子数量，注意性能

### Vanta.js ★★★☆☆

- **npm**: `vanta`
- **GitHub**: ~6.6k stars
- **做什么**: Three.js 驱动的动态 3D 背景（波浪、鸟群、网格、雾等）
- **兼容**: 框架无关
- **维护**: 稳定
- **Vision 用途**: 全屏 3D 背景
- **注意**: GPU 消耗较大，移动端需降级

### canvas-confetti ★★★★☆

- **npm**: `canvas-confetti`
- **GitHub**: ~12.6k stars
- **做什么**: 高性能纸屑/庆祝动画
- **兼容**: 框架无关
- **维护**: 活跃（2025-10）
- **Vision 用途**: 成功状态、里程碑庆祝、CTA 点击反馈

---

## 五、微交互与特殊效果

### Atropos ★★★★☆

- **npm**: `atropos`
- **GitHub**: ~3.6k stars
- **做什么**: 3D 视差悬浮效果（触摸/陀螺仪友好）
- **兼容**: React / Vue 组件
- **维护**: 活跃（2026-05）
- **Vision 用途**: 产品卡片悬浮、Feature 展示

### Rough Notation ★★★☆☆

- **npm**: `rough-notation`
- **GitHub**: ~9.6k stars
- **做什么**: 手绘风格标注动画（下划线、圆圈、高亮、删除线）
- **兼容**: 框架无关 + React 绑定
- **Vision 用途**: 文字强调、教育类页面、Organic 风格

### Vivus ★★★☆☆

- **npm**: `vivus`
- **GitHub**: ~15.5k stars
- **做什么**: SVG 路径描边动画
- **兼容**: 框架无关
- **Vision 用途**: Logo 入场、图表绘制效果、技术图描边

---

## 六、Tailwind 动画扩展

### tailwindcss-animated ★★★★☆

- **npm**: `tailwindcss-animated`
- **做什么**: Tailwind 扩展动画工具集，比 shadcn 默认的 tailwindcss-animate 更多预设
- **维护**: 活跃（2026-05）
- **Vision 用途**: 快速添加入场/退出动画

### tw-animate-css ★★★☆☆

- **npm**: `tw-animate-css`
- **做什么**: Tailwind v4 兼容的动画类库
- **维护**: 活跃（2026-02）
- **Vision 用途**: Tailwind v4 项目的动画基础

---

## 七、Lottie 动画资源

### Lottie Web + LottieFiles ★★★★☆

- **npm**: `lottie-react`（React 封装）
- **GitHub**: lottie-web ~32k stars
- **做什么**: 渲染 After Effects 导出的 JSON 动画
- **资源**: [LottieFiles](https://lottiefiles.com/) 提供海量免费动画资源
- **维护**: 活跃
- **Vision 用途**: 空状态动画、Loading、微交互、图标动画
- **注意**: 需要设计师产出或从 LottieFiles 选取，不是代码直接生成的

---

## Vision Spec 中的库选择记录

在 Vision Spec §5 Motion Choreography 中，推荐使用以下格式记录库选择：

```markdown
### 动效实现方案

| Section | 效果 | 推荐库 | 备选 | 理由 |
|---------|------|--------|------|------|
| Hero 标题 | 打字机效果 | Typed.js | — | 最成熟，预设丰富 |
| Hero 背景 | 粒子效果 | tsParticles | Vanta.js | 预设多，性能可控 |
| Feature 卡片 | 滚动入场 | AOS | Magic UI | 零配置，最安全 |
| KPI 数字 | 数字翻转 | Number Flow | react-countup | 支持格式化，更精致 |
| 全局 | 平滑滚动 | Lenis | — | 当前最活跃 |
```

## 性能预算提醒

- 同一页面最多引入 **2-3 个动效库**，避免包体积膨胀
- 粒子/3D 背景类库必须提供 **移动端降级方案**（减少粒子数或禁用）
- 所有动效必须有 **prefers-reduced-motion 回退**（这是 AG 铁律）
- Magic UI / React Bits 等复制粘贴型库不增加运行时依赖，优先选择
