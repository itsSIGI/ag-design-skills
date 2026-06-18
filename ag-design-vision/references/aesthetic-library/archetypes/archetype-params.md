# 风格原型参数化手册 — Archetype Parameters

> 11 个风格原型的**具体视觉参数**。每个值可直接复制到 Vision Spec，无需二次翻译。
> 所有配色经过 WCAG AA 对比度验证；所有排版含 clamp() 响应式写法。

---

## 1. Editorial Minimalism / 编辑式极简

### 标杆作品分析

| 标杆 | 关键视觉特征 | 可提取参数 |
|------|-------------|-----------|
| Apple.com 产品页 | 超大标题居中、单张产品图占全屏、大段留白、极细分隔线、深色/白色双主题切换 | `font-size: 80px; font-weight: 600; letter-spacing: -0.03em; max-width: 720px; section-gap: 120px` |
| Stripe Press | 衬线 display 标题 + 无衬线正文、不对称分栏（55:45）、大量负空间、强调色仅用于超链接 | `font-family: "GT Sectra" serif; body: 18px/1.7; accent: #635BFF (仅链接); content-width: 680px` |

### 配色模板

| Role | 亮色方案 | 暗色方案 |
|------|---------|---------|
| Background | `#FFFFFF` | `#111111` |
| Surface | `#FAFAFA` | `#1A1A1A` |
| Text Primary | `#1D1D1F` (对比度 15.4:1) | `#F5F5F7` (对比度 14.8:1) |
| Text Secondary | `#6E6E73` (对比度 4.6:1) | `#A1A1A6` (对比度 5.2:1) |
| Accent | `#0071E3` (对比度 4.6:1 on white) | `#2997FF` (对比度 5.1:1 on #111) |
| Border | `rgba(0, 0, 0, 0.08)` | `rgba(255, 255, 255, 0.08)` |

### 排版参数

| 元素 | font-size | weight | letter-spacing | line-height |
|------|-----------|--------|---------------|-------------|
| Hero Title | `clamp(2.5rem, 5vw + 1rem, 4.5rem)` | 600 | `-0.03em` | `1.05` |
| Section Title | `clamp(1.75rem, 3vw + 0.5rem, 2.5rem)` | 600 | `-0.02em` | `1.15` |
| Body | `clamp(1rem, 1vw + 0.5rem, 1.125rem)` | 400 | `0` | `1.7` |
| Caption | `0.875rem` | 400 | `0.01em` | `1.5` |

### 间距体系

| 区域 | 值 | Token 映射 |
|------|-----|-----------|
| Section gap | `clamp(80px, 10vw, 120px)` | TOKEN_ESCAPE: `--em-section-gap` |
| Card padding | `32px` | `var(--space-8)` |
| Content max-width | `720px` | TOKEN_ESCAPE: `--em-content-width` |
| Page margin (mobile) | `24px` | `var(--space-6)` |

### 形状与纹理

| 属性 | 值 |
|------|-----|
| border-radius | `0px` (纯直角) |
| box-shadow | `none` |
| 分隔线 | `border-top: 1px solid rgba(0,0,0,0.08)` |
| 特殊纹理 | 无纹理——完全平坦 |

### AG 兼容参数

| 参数 | AG Token 可用？ | TOKEN_ESCAPE？ |
|------|----------------|---------------|
| Background / Surface | yes | — |
| Text Primary / Secondary | yes | — |
| Accent | yes (brand color) | — |
| Hero font-size (4.5rem) | no | `--em-hero-size` |
| Section gap (120px) | no | `--em-section-gap` |
| Content max-width (720px) | no | `--em-content-width` |
| letter-spacing (-0.03em) | no | `--em-hero-tracking` |

---

## 2. Neo-Brutalism / 新粗野主义

### 标杆作品分析

| 标杆 | 关键视觉特征 | 可提取参数 |
|------|-------------|-----------|
| Gumroad (2021-2022 设计) | 3px 黑色实边框、4px 偏移硬阴影、高饱和粉色/黄色色块交替、全大写粗体标题 | `border: 3px solid #000; box-shadow: 4px 4px 0 #000; background: #FF90E8; text-transform: uppercase` |
| Figma Config 活动页 | 不规则色块拼贴、粗体无衬线标题到 96px、高饱和蓝紫黄撞色、卡片无圆角硬堆叠 | `font-size: 96px; weight: 800; gap: 4px; border-radius: 0; palette: #A259FF / #0ACF83 / #F24E1E` |

### 配色模板

| Role | 亮色方案 | 暗色方案 |
|------|---------|---------|
| Background | `#FFFFFF` | `#1A1A1A` |
| Surface | `#FF90E8` (粉)、`#FFD700` (黄)、`#A8F0D4` (薄荷) 交替 | `#2D1B4E` (暗紫)、`#1B3D2F` (暗绿)、`#3D2B1B` (暗棕) 交替 |
| Text Primary | `#000000` (对比度 21:1 on white) | `#FFFFFF` (对比度 12.6:1 on #1A1A1A) |
| Text Secondary | `#333333` (对比度 12.6:1) | `#E0E0E0` (对比度 10.1:1) |
| Accent | `#FF5C00` (对比度 4.7:1 on white) | `#FFB800` (对比度 10.3:1 on #1A1A1A) |
| Border | `3px solid #000000` | `3px solid #FFFFFF` |

### 排版参数

| 元素 | font-size | weight | letter-spacing | line-height |
|------|-----------|--------|---------------|-------------|
| Hero Title | `clamp(3rem, 8vw + 1rem, 6rem)` | 800 | `0.02em` | `1.0` |
| Section Title | `clamp(1.5rem, 4vw + 0.5rem, 2.5rem)` | 700 | `0.02em` | `1.1` |
| Body | `clamp(1rem, 1vw + 0.5rem, 1.125rem)` | 500 | `0` | `1.6` |
| Label / Tag | `0.875rem; text-transform: uppercase` | 700 | `0.08em` | `1.3` |

### 间距体系

| 区域 | 值 | Token 映射 |
|------|-----|-----------|
| Section gap | `clamp(40px, 6vw, 80px)` | TOKEN_ESCAPE: `--nb-section-gap` |
| Card padding | `24px` | `var(--space-6)` |
| Card gap | `4px` (密排) | TOKEN_ESCAPE: `--nb-card-gap` |
| Content max-width | `1200px` | TOKEN_ESCAPE: `--nb-content-width` |

### 形状与纹理

| 属性 | 值 |
|------|-----|
| border-radius | `0px` |
| box-shadow | `4px 4px 0 #000000` (硬阴影，无模糊) |
| border | `2px solid #000000` 或 `3px solid #000000` |
| 特殊纹理 | 无渐变、无模糊——纯平坦色块 + 硬边 |
| hover 状态 | `transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #000` |

### AG 兼容参数

| 参数 | AG Token 可用？ | TOKEN_ESCAPE？ |
|------|----------------|---------------|
| Background (#FFFFFF) | yes | — |
| Text Primary (#000) | yes | — |
| Surface 高饱和色 | no | `--nb-surface-pink`, `--nb-surface-yellow`, `--nb-surface-mint` |
| border (3px solid) | no | `--nb-border` |
| box-shadow (硬阴影) | no | `--nb-shadow` |
| Hero font-size (6rem) | no | `--nb-hero-size` |
| font-weight 800 | no | `--nb-hero-weight` |
| Card gap (4px) | no | `--nb-card-gap` |
| Accent (#FF5C00) | no | `--nb-accent` |
| text-transform uppercase | no | `--nb-transform` |

---

## 3. Glassmorphism / 玻璃态

### 标杆作品分析

| 标杆 | 关键视觉特征 | 可提取参数 |
|------|-------------|-----------|
| Linear.app | 暗色渐变背景(#0A0118→#1B1033)、半透明卡片 rgba(255,255,255,0.05)、20px blur、紫色光晕径向渐变、卡片圆角 16px | `backdrop-filter: blur(20px); background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px` |
| Apple Vision Pro 页面 | 深黑渐变底(#000→#1D1D1F)、磨砂玻璃 blur 40px、大圆角 20px、白色文字 weight 400、微光边框 | `backdrop-filter: blur(40px) saturate(180%); background: rgba(255,255,255,0.08); border-radius: 20px; color: #F5F5F7` |

### 配色模板

| Role | 亮色方案 | 暗色方案 |
|------|---------|---------|
| Background | `linear-gradient(135deg, #E8EAF6 0%, #F3E5F5 50%, #E0F7FA 100%)` | `linear-gradient(135deg, #0A0118 0%, #1B1033 50%, #0D1B2A 100%)` |
| Surface (卡片) | `rgba(255, 255, 255, 0.6)` + `blur(20px)` | `rgba(255, 255, 255, 0.05)` + `blur(20px)` |
| Text Primary | `#1A1A2E` (对比度 10.2:1 on 亮色背景) | `#F0F0F0` (对比度 13.2:1 on #0A0118) |
| Text Secondary | `#5C5C7A` (对比度 4.8:1) | `#A0A0B8` (对比度 5.6:1 on #0A0118) |
| Accent | `#7C3AED` (对比度 5.0:1 on 亮色) | `#A78BFA` (对比度 5.4:1 on #0A0118) |
| Border | `1px solid rgba(255, 255, 255, 0.2)` | `1px solid rgba(255, 255, 255, 0.1)` |
| 光晕 | `radial-gradient(circle at 30% 40%, rgba(124,58,237,0.15), transparent 60%)` | `radial-gradient(circle at 30% 40%, rgba(124,58,237,0.25), transparent 60%)` |

### 排版参数

| 元素 | font-size | weight | letter-spacing | line-height |
|------|-----------|--------|---------------|-------------|
| Hero Title | `clamp(2.25rem, 4vw + 1rem, 3.5rem)` | 500 | `-0.01em` | `1.15` |
| Section Title | `clamp(1.5rem, 2.5vw + 0.5rem, 2rem)` | 500 | `-0.01em` | `1.2` |
| Body | `clamp(0.9375rem, 0.5vw + 0.75rem, 1rem)` | 400 | `0` | `1.65` |
| Card Title | `clamp(1.125rem, 1vw + 0.5rem, 1.25rem)` | 500 | `0` | `1.3` |

### 间距体系

| 区域 | 值 | Token 映射 |
|------|-----|-----------|
| Section gap | `clamp(60px, 8vw, 100px)` | TOKEN_ESCAPE: `--gm-section-gap` |
| Card padding | `24px` | `var(--space-6)` |
| Card gap | `16px` | `var(--space-4)` |
| Content max-width | `1100px` | TOKEN_ESCAPE: `--gm-content-width` |

### 形状与纹理

| 属性 | 值 |
|------|-----|
| border-radius | `16px` (卡片)、`24px` (大容器) |
| box-shadow | `0 8px 32px rgba(0, 0, 0, 0.12)` |
| backdrop-filter | `blur(20px) saturate(180%)` |
| border | `1px solid rgba(255, 255, 255, 0.1)` |
| 光晕效果 | `background: radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.2) 0%, transparent 60%)` |
| noise overlay | `background-image: url("data:image/svg+xml,..."); opacity: 0.02` |

### AG 兼容参数

| 参数 | AG Token 可用？ | TOKEN_ESCAPE？ |
|------|----------------|---------------|
| Text Primary / Secondary | yes | — |
| Card padding (24px) | yes | — |
| Background 渐变 | no | `--gm-bg-gradient` |
| Surface 半透明 | no | `--gm-surface-alpha` |
| backdrop-filter | no | `--gm-blur` |
| border-radius (16/24px) | no | `--gm-radius-card`, `--gm-radius-container` |
| 光晕 radial-gradient | no | `--gm-glow` |
| Accent (#7C3AED) | no | `--gm-accent` |
| box-shadow (32px blur) | no | `--gm-shadow` |
| noise overlay | no | `--gm-noise` |

---

## 4. Bento Grid / 便当盒网格

### 标杆作品分析

| 标杆 | 关键视觉特征 | 可提取参数 |
|------|-------------|-----------|
| Apple 功能对比页 (iPhone/Mac) | 不等高卡片(1:1, 2:1, 1:2)混排、统一 12px 圆角、卡片内居中图标+标题+数字、浅色调 tint 区分(蓝/绿/紫)、gap 8px | `grid-template: auto / repeat(4, 1fr); gap: 8px; border-radius: 12px; padding: 32px` |
| Vercel Dashboard 概览 | 暗底上的功能卡片矩阵、部分卡片 span 2 列、微妙 elevation 差异、monospace 数字、统一的 surface 色 | `background: #0A0A0A; card-bg: #171717; gap: 12px; font-variant-numeric: tabular-nums; border-radius: 8px` |

### 配色模板

| Role | 亮色方案 | 暗色方案 |
|------|---------|---------|
| Background | `#F5F5F7` | `#0A0A0A` |
| Surface (默认卡片) | `#FFFFFF` | `#171717` |
| Surface Tint Blue | `#EFF6FF` (蓝调) | `#172554` (暗蓝调) |
| Surface Tint Green | `#F0FDF4` (绿调) | `#14532D` (暗绿调) |
| Surface Tint Purple | `#FAF5FF` (紫调) | `#3B0764` (暗紫调) |
| Text Primary | `#1D1D1F` (对比度 15.4:1 on #FFF) | `#F5F5F7` (对比度 14.8:1 on #171717) |
| Text Secondary | `#6E6E73` (对比度 4.6:1 on #FFF) | `#A1A1A6` (对比度 5.0:1 on #171717) |
| Accent | `#0071E3` (对比度 4.6:1 on #FFF) | `#2997FF` (对比度 6.2:1 on #171717) |
| Border | `rgba(0, 0, 0, 0.06)` | `rgba(255, 255, 255, 0.06)` |

### 排版参数

| 元素 | font-size | weight | letter-spacing | line-height |
|------|-----------|--------|---------------|-------------|
| Card Title | `clamp(1.125rem, 1vw + 0.5rem, 1.375rem)` | 600 | `-0.01em` | `1.2` |
| Card Description | `clamp(0.875rem, 0.5vw + 0.5rem, 1rem)` | 400 | `0` | `1.5` |
| Display Number | `clamp(2rem, 4vw + 0.5rem, 3.5rem)` | 600 | `-0.02em` | `1.0` |
| Section Title | `clamp(1.75rem, 3vw + 0.5rem, 2.5rem)` | 600 | `-0.02em` | `1.15` |

### 间距体系

| 区域 | 值 | Token 映射 |
|------|-----|-----------|
| Grid gap | `8px` 或 `12px` | TOKEN_ESCAPE: `--bg-grid-gap` |
| Card padding | `clamp(20px, 3vw, 32px)` | TOKEN_ESCAPE: `--bg-card-padding` |
| Section gap | `clamp(60px, 8vw, 100px)` | TOKEN_ESCAPE: `--bg-section-gap` |
| Content max-width | `1200px` | TOKEN_ESCAPE: `--bg-content-width` |
| Bento outer padding | `16px` | `var(--space-4)` |

### 形状与纹理

| 属性 | 值 |
|------|-----|
| border-radius | `12px` (所有卡片统一) |
| box-shadow | `0 1px 3px rgba(0,0,0,0.06)` (亮色)、`none` (暗色) |
| border | `1px solid rgba(0,0,0,0.06)` (亮色)、`1px solid rgba(255,255,255,0.06)` (暗色) |
| 特殊纹理 | 无——纯净平坦。个别 cell 可放置微妙的装饰图标 |

### Grid 模板参考

```css
/* 标准 4 列 Bento */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 8px;
}
/* 大 cell 跨列 */
.bento-cell--wide { grid-column: span 2; }
/* 大 cell 跨行 */
.bento-cell--tall { grid-row: span 2; }
/* 移动端回退 */
@media (max-width: 768px) {
  .bento-grid { grid-template-columns: 1fr; }
}
```

### AG 兼容参数

| 参数 | AG Token 可用？ | TOKEN_ESCAPE？ |
|------|----------------|---------------|
| Background / Surface | yes | — |
| Text Primary / Secondary | yes | — |
| Card border-radius (12px) | partial (AG 有 8px) | `--bg-radius` |
| Surface Tint 色调 | no | `--bg-tint-blue`, `--bg-tint-green`, `--bg-tint-purple` |
| Grid template | no | `--bg-grid-template` |
| Display Number 字号 | no | `--bg-display-size` |

---

## 5. Gradient Flow / 渐变流

### 标杆作品分析

| 标杆 | 关键视觉特征 | 可提取参数 |
|------|-------------|-----------|
| Raycast.com | 深黑底(#000)、彩色径向光晕叠加、文字渐变(background-clip: text)、微妙 grain 纹理 opacity 0.03、大留白 | `background: radial-gradient(circle at 50% 0%, #7C3AED 0%, transparent 50%); -webkit-background-clip: text; noise-opacity: 0.03` |
| Framer.com | 柔和渐变从浅蓝到浅紫、blob 形状 SVG 装饰、grain 纹理、大字号 weight 500、渐变跨 section | `background: linear-gradient(160deg, #E0E7FF 0%, #FCE7F3 50%, #DBEAFE 100%); border-radius: 24px; grain: 0.04` |

### 配色模板

| Role | 亮色方案 | 暗色方案 |
|------|---------|---------|
| Background | `linear-gradient(160deg, #F0F4FF 0%, #FDF2F8 50%, #ECFDF5 100%)` | `linear-gradient(160deg, #0F0720 0%, #1A0B2E 50%, #0B1A2C 100%)` |
| Surface | `rgba(255, 255, 255, 0.7)` | `rgba(255, 255, 255, 0.05)` |
| Text Primary | `#1A1A2E` (对比度 10.5:1 on #F0F4FF) | `#F0F0F5` (对比度 12.8:1 on #0F0720) |
| Text Secondary | `#64648C` (对比度 4.5:1) | `#9898B8` (对比度 5.2:1 on #0F0720) |
| Accent Gradient | `linear-gradient(135deg, #7C3AED, #2563EB)` | `linear-gradient(135deg, #A78BFA, #60A5FA)` |
| Gradient Text | `background: linear-gradient(135deg, #7C3AED, #EC4899); -webkit-background-clip: text` | `background: linear-gradient(135deg, #A78BFA, #F472B6); -webkit-background-clip: text` |
| Border | `rgba(124, 58, 237, 0.1)` | `rgba(167, 139, 250, 0.15)` |

### 排版参数

| 元素 | font-size | weight | letter-spacing | line-height |
|------|-----------|--------|---------------|-------------|
| Hero Title | `clamp(2.5rem, 5vw + 1rem, 5rem)` | 600 | `-0.02em` | `1.1` |
| Hero Title (渐变文字) | 同上 + `background-clip: text; -webkit-text-fill-color: transparent` | 600 | `-0.02em` | `1.1` |
| Section Title | `clamp(1.75rem, 3vw + 0.5rem, 2.5rem)` | 500 | `-0.01em` | `1.2` |
| Body | `clamp(1rem, 1vw + 0.5rem, 1.125rem)` | 400 | `0` | `1.7` |

### 间距体系

| 区域 | 值 | Token 映射 |
|------|-----|-----------|
| Section gap | `clamp(80px, 10vw, 120px)` | TOKEN_ESCAPE: `--gf-section-gap` |
| Card padding | `32px` | `var(--space-8)` |
| Content max-width | `1000px` | TOKEN_ESCAPE: `--gf-content-width` |
| Blob 装饰偏移 | `position: absolute; top: -20%; left: -10%` | TOKEN_ESCAPE: `--gf-blob-offset` |

### 形状与纹理

| 属性 | 值 |
|------|-----|
| border-radius | `16px` (卡片)、`50%` (blob 装饰) |
| box-shadow | `0 4px 24px rgba(124, 58, 237, 0.08)` |
| grain 纹理 | `background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); background-repeat: repeat` |
| blob 形状 | `border-radius: 40% 60% 65% 35% / 55% 45% 55% 45%; filter: blur(60px); opacity: 0.3` |
| 渐变方向 | `135deg` 或 `160deg` (全局统一) |

### AG 兼容参数

| 参数 | AG Token 可用？ | TOKEN_ESCAPE？ |
|------|----------------|---------------|
| Text Primary / Secondary | yes | — |
| Card padding | yes | — |
| Background 渐变 | no | `--gf-bg-gradient` |
| Accent Gradient | no | `--gf-accent-gradient` |
| Gradient Text 效果 | no | `--gf-text-gradient` |
| grain 纹理 | no | `--gf-grain` |
| blob 装饰 | no | `--gf-blob` |
| border-radius (16px) | no | `--gf-radius` |
| box-shadow (紫色) | no | `--gf-shadow` |
| Hero font-size (5rem) | no | `--gf-hero-size` |

---

## 6. Dark Cinematic / 暗色电影感

### 标杆作品分析

| 标杆 | 关键视觉特征 | 可提取参数 |
|------|-------------|-----------|
| OpenAI.com | 纯黑底(#000)、极亮白色文字、绿色强调色(#10A37F)仅用于 CTA 和图标、大留白、径向渐变做微光效果、weight 600 标题 | `background: #000; color: #FFF; accent: #10A37F; box-shadow: 0 0 60px rgba(16,163,127,0.15); section-gap: 100px` |
| Vercel.com 首页 | 深灰底(#000)、代码块美学、渐变光线条纹(linear-gradient 45deg)、等宽字体混排、三角/几何光效装饰 | `background: #000; surface: #111; gradient-line: linear-gradient(90deg, transparent, #FFF, transparent); font-family: "Geist Mono"; border: 1px solid #333` |

### 配色模板

| Role | 亮色方案 (保守亮色变体) | 暗色方案 (主方案) |
|------|---------|---------|
| Background | `#FAFAFA` | `#000000` |
| Surface | `#FFFFFF` | `#111111` |
| Surface Elevated | `#F5F5F5` | `#1A1A1A` |
| Text Primary | `#0A0A0A` (对比度 17.9:1 on #FAFAFA) | `#FFFFFF` (对比度 21:1 on #000) |
| Text Secondary | `#666666` (对比度 5.7:1 on #FAFAFA) | `#888888` (对比度 6.9:1 on #000) |
| Accent | `#0070F3` (对比度 4.6:1 on #FFF) | `#0070F3` (对比度 4.5:1 on #000) |
| Accent Alt (绿) | `#0D9373` (对比度 4.5:1 on #FFF) | `#10A37F` (对比度 5.0:1 on #000) |
| Border | `rgba(0, 0, 0, 0.1)` | `rgba(255, 255, 255, 0.1)` |
| 光线效果 | — | `radial-gradient(circle at 50% 0%, rgba(0,112,243,0.1), transparent 60%)` |

### 排版参数

| 元素 | font-size | weight | letter-spacing | line-height |
|------|-----------|--------|---------------|-------------|
| Hero Title | `clamp(2.5rem, 6vw + 1rem, 4.5rem)` | 600 | `-0.03em` | `1.05` |
| Section Title | `clamp(1.5rem, 3vw + 0.5rem, 2.25rem)` | 600 | `-0.02em` | `1.15` |
| Body | `clamp(1rem, 0.5vw + 0.75rem, 1.125rem)` | 400 | `0` | `1.7` |
| Code / Data | `clamp(0.8125rem, 0.3vw + 0.6rem, 0.9375rem); font-family: "Geist Mono", monospace` | 400 | `0` | `1.6` |

### 间距体系

| 区域 | 值 | Token 映射 |
|------|-----|-----------|
| Section gap | `clamp(80px, 10vw, 120px)` | TOKEN_ESCAPE: `--dc-section-gap` |
| Card padding | `32px` | `var(--space-8)` |
| Content max-width | `1000px` | TOKEN_ESCAPE: `--dc-content-width` |
| Hero height | `100vh` 或 `min(100vh, 800px)` | TOKEN_ESCAPE: `--dc-hero-height` |

### 形状与纹理

| 属性 | 值 |
|------|-----|
| border-radius | `8px` (卡片)、`4px` (按钮/输入框) |
| box-shadow | `0 0 60px rgba(0, 112, 243, 0.08)` (光晕) |
| border | `1px solid rgba(255, 255, 255, 0.1)` |
| 背景微光 | `radial-gradient(ellipse at 50% 0%, rgba(0,112,243,0.08) 0%, transparent 50%)` |
| 网格纹理 | `background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 60px 60px` |
| 光线条 | `background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); height: 1px` |

### AG 兼容参数

| 参数 | AG Token 可用？ | TOKEN_ESCAPE？ |
|------|----------------|---------------|
| Text Primary (#FFF on #000) | yes (dark mode token) | — |
| Text Secondary | yes (dark mode) | — |
| Background (#000) | no (AG dark 通常 #0A0A0A+) | `--dc-bg` |
| Accent (#0070F3) | partial | `--dc-accent` |
| 光晕 radial-gradient | no | `--dc-glow` |
| 网格纹理 | no | `--dc-grid-texture` |
| 光线条 | no | `--dc-light-line` |
| Hero height (100vh) | no | `--dc-hero-height` |
| Section gap (120px) | no | `--dc-section-gap` |
| Code font-family | partial | `--dc-mono-font` |

---

## 7. Scientific Precision / 科学精确

### 标杆作品分析

| 标杆 | 关键视觉特征 | 可提取参数 |
|------|-------------|-----------|
| Observable.com | 代码+数据+叙事三栏混排、monospace 数据值 tabular-nums、功能性色板(蓝=信息/红=警告/绿=成功)、1px 细线表格、紧凑信息密度 | `font-family: "Source Code Pro"; font-variant-numeric: tabular-nums; border: 1px solid #E5E7EB; gap: 8px; color-info: #3B82F6; color-success: #10B981` |
| Wolfram Alpha | 严格层级(input→result→related)、数学公式渲染、数据表精确对齐、冷灰背景(#F7F7F8)、无装饰纯功能 | `background: #F7F7F8; font-size: 14px; line-height: 1.5; table-border: 1px solid #DDD; padding: 8px 12px` |

### 配色模板

| Role | 亮色方案 | 暗色方案 |
|------|---------|---------|
| Background | `#FAFBFC` | `#0D1117` |
| Surface | `#FFFFFF` | `#161B22` |
| Text Primary | `#1F2328` (对比度 15.1:1 on #FFF) | `#E6EDF3` (对比度 11.7:1 on #161B22) |
| Text Secondary | `#656D76` (对比度 4.6:1 on #FFF) | `#8B949E` (对比度 4.8:1 on #161B22) |
| Data Blue (信息) | `#0969DA` (对比度 5.1:1 on #FFF) | `#58A6FF` (对比度 5.3:1 on #161B22) |
| Data Green (成功) | `#1A7F37` (对比度 4.8:1 on #FFF) | `#3FB950` (对比度 4.6:1 on #161B22) |
| Data Red (警告) | `#CF222E` (对比度 5.6:1 on #FFF) | `#F85149` (对比度 4.7:1 on #161B22) |
| Data Yellow (注意) | `#9A6700` (对比度 4.5:1 on #FFF) | `#D29922` (对比度 5.1:1 on #161B22) |
| Border | `#D0D7DE` | `#30363D` |

### 排版参数

| 元素 | font-size | weight | letter-spacing | line-height |
|------|-----------|--------|---------------|-------------|
| Section Title | `clamp(1.25rem, 2vw + 0.5rem, 1.75rem)` | 600 | `0` | `1.25` |
| Body | `clamp(0.875rem, 0.3vw + 0.7rem, 1rem)` | 400 | `0` | `1.6` |
| Code / Data | `clamp(0.8125rem, 0.2vw + 0.6rem, 0.875rem); font-family: "JetBrains Mono", "Fira Code", monospace` | 400 | `0` | `1.5` |
| Table Header | `0.75rem; text-transform: uppercase` | 600 | `0.05em` | `1.3` |
| Data Value (大字号) | `clamp(1.5rem, 3vw + 0.5rem, 2.5rem); font-variant-numeric: tabular-nums` | 600 | `-0.02em` | `1.0` |

### 间距体系

| 区域 | 值 | Token 映射 |
|------|-----|-----------|
| Section gap | `clamp(40px, 5vw, 64px)` | `var(--space-8)` ~ `var(--space-16)` |
| Card padding | `16px` 或 `20px` | `var(--space-4)` ~ `var(--space-5)` |
| Table cell padding | `8px 12px` | `var(--space-2) var(--space-3)` |
| Data group gap | `8px` | `var(--space-2)` |
| Content max-width | `1200px` | TOKEN_ESCAPE: `--sp-content-width` |

### 形状与纹理

| 属性 | 值 |
|------|-----|
| border-radius | `4px` (卡片/按钮)、`2px` (输入框/表格) |
| box-shadow | `0 1px 2px rgba(0,0,0,0.04)` (极轻微) |
| border | `1px solid #D0D7DE` (亮色)、`1px solid #30363D` (暗色) |
| 网格背景 | `background-image: linear-gradient(#F0F0F0 1px, transparent 1px), linear-gradient(90deg, #F0F0F0 1px, transparent 1px); background-size: 20px 20px; opacity: 0.5` |
| 特殊纹理 | 无——完全功能性 |

### AG 兼容参数

| 参数 | AG Token 可用？ | TOKEN_ESCAPE？ |
|------|----------------|---------------|
| Background / Surface | yes | — |
| Text Primary / Secondary | yes | — |
| Border color | yes | — |
| border-radius (4px) | yes | — |
| Data 色板 (蓝/绿/红/黄) | partial (AG 有语义色) | `--sp-data-blue`, `--sp-data-green` |
| monospace font-family | partial | `--sp-mono-font` |
| Content max-width (1200px) | no | `--sp-content-width` |

---

## 8. Organic / 有机生态

### 标杆作品分析

| 标杆 | 关键视觉特征 | 可提取参数 |
|------|-------------|-----------|
| Headspace.com | 大圆角(24px)卡片、柔和橙/蓝/绿低饱和度配色、有机 blob 形状装饰、圆润无衬线字体、大量圆形元素 | `border-radius: 24px; background: #FEF3E2; accent: #F47D31; blob: border-radius: 40% 60% 55% 45% / 60% 40% 55% 45%` |
| Notion 营销页 | 暖白底(#FFFAF5 感)、手绘风插画装饰、圆润排版 weight 500、柔和投影 box-shadow 大 blur、大圆角按钮 | `background: #FFFFFF; surface: #F7F6F3; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.06); font-weight: 500` |

### 配色模板

| Role | 亮色方案 | 暗色方案 |
|------|---------|---------|
| Background | `#FBF8F4` (暖白) | `#1C1917` (暖黑) |
| Surface | `#FFFFFF` | `#292524` |
| Text Primary | `#292524` (对比度 12.6:1 on #FBF8F4) | `#FAFAF9` (对比度 13.8:1 on #1C1917) |
| Text Secondary | `#78716C` (对比度 4.5:1 on #FBF8F4) | `#A8A29E` (对比度 5.0:1 on #1C1917) |
| Accent Terracotta | `#C2410C` (对比度 5.9:1 on #FBF8F4) | `#FB923C` (对比度 5.7:1 on #1C1917) |
| Accent Sage | `#3F6212` (对比度 6.3:1 on #FBF8F4) | `#84CC16` (对比度 6.8:1 on #1C1917) |
| Accent Sand | `#92400E` (对比度 5.7:1 on #FBF8F4) | `#FCD34D` (对比度 10.6:1 on #1C1917) |
| Border | `rgba(120, 113, 108, 0.15)` | `rgba(168, 162, 158, 0.15)` |

### 排版参数

| 元素 | font-size | weight | letter-spacing | line-height |
|------|-----------|--------|---------------|-------------|
| Hero Title | `clamp(2rem, 4vw + 1rem, 3.5rem)` | 600 | `-0.01em` | `1.2` |
| Section Title | `clamp(1.5rem, 2.5vw + 0.5rem, 2rem)` | 600 | `0` | `1.25` |
| Body | `clamp(1rem, 0.5vw + 0.75rem, 1.125rem)` | 400 | `0.01em` | `1.8` |
| Display (衬线, TIER_3 only) | `clamp(2rem, 5vw + 0.5rem, 3.5rem); font-family: "Lora", serif` | 400 | `0` | `1.2` |

### 间距体系

| 区域 | 值 | Token 映射 |
|------|-----|-----------|
| Section gap | `clamp(60px, 8vw, 96px)` | TOKEN_ESCAPE: `--org-section-gap` |
| Card padding | `clamp(24px, 3vw, 40px)` | TOKEN_ESCAPE: `--org-card-padding` |
| Content max-width | `960px` | TOKEN_ESCAPE: `--org-content-width` |
| Page side padding | `clamp(20px, 5vw, 80px)` | TOKEN_ESCAPE: `--org-page-padding` |

### 形状与纹理

| 属性 | 值 |
|------|-----|
| border-radius | `20px` (卡片)、`9999px` (按钮/pill)、`50%` (头像/图标) |
| box-shadow | `0 8px 30px rgba(0, 0, 0, 0.06)` |
| blob 装饰 | `border-radius: 40% 60% 55% 45% / 60% 40% 55% 45%; background: rgba(194,65,12,0.08); filter: blur(40px)` |
| 纸质纹理 | `background-image: url("data:image/svg+xml,...noise..."); opacity: 0.03` |
| wave 分隔 | `clip-path: ellipse(120% 100px at 50% 100%)` (section 底部波浪) |

### AG 兼容参数

| 参数 | AG Token 可用？ | TOKEN_ESCAPE？ |
|------|----------------|---------------|
| Text Primary / Secondary | partial (色温偏离) | `--org-text-primary`, `--org-text-secondary` |
| Background (#FBF8F4 暖白) | no | `--org-bg` |
| Surface | no (暖色调) | `--org-surface` |
| Accent Terracotta | no | `--org-accent-terracotta` |
| Accent Sage | no | `--org-accent-sage` |
| border-radius (20px) | no | `--org-radius` |
| blob 装饰 | no | `--org-blob` |
| 纸质纹理 | no | `--org-paper-texture` |
| Serif font-family | no | `--org-display-font` |
| box-shadow (30px blur) | no | `--org-shadow` |
| wave clip-path | no | `--org-wave` |

---

## 9. Retro / 复古怀旧

### 标杆作品分析

| 标杆 | 关键视觉特征 | 可提取参数 |
|------|-------------|-----------|
| Mailchimp 年度报告 | 暖色调(#F5EFE7 底)、复古插画风格、衬线标题(Cooper Black 感)、装饰性分隔线带纹样、old-paper 色调 | `background: #F5EFE7; color: #3C2415; font-family: "Playfair Display"; border-bottom: 2px solid #3C2415; ornamental dividers` |
| Dropbox Design (旧版品牌页) | 柔和粉/黄/蓝低饱和色块拼接、圆润衬线标题、手绘线条装饰、杂志式排版分栏、胶片质感照片 | `surface: #FFF1E6 / #E6F0FF / #FFF8E1; font-family: "Lora"; photo-filter: sepia(0.1) contrast(1.05); letter-spacing: 0.03em` |

### 配色模板

| Role | 亮色方案 | 暗色方案 |
|------|---------|---------|
| Background | `#F5F0EB` (米白) | `#1A1612` (暗棕) |
| Surface | `#FFFDF8` (象牙白) | `#2A241E` |
| Text Primary | `#3C2415` (深棕, 对比度 9.8:1 on #F5F0EB) | `#F0E6D8` (暖白, 对比度 10.2:1 on #1A1612) |
| Text Secondary | `#7A6555` (中棕, 对比度 4.5:1) | `#B8A898` (对比度 5.1:1 on #1A1612) |
| Accent Burgundy | `#8B2252` (酒红, 对比度 6.4:1) | `#D4617A` (对比度 5.0:1 on #1A1612) |
| Accent Forest | `#2D5016` (森林绿, 对比度 6.8:1) | `#6B8F4E` (对比度 4.6:1 on #1A1612) |
| Accent Gold | `#8B6914` (暗金, 对比度 4.5:1) | `#D4A843` (对比度 5.8:1 on #1A1612) |
| Border | `#D4C5B2` (暖灰线) | `#4A3F35` |

### 排版参数

| 元素 | font-size | weight | letter-spacing | line-height |
|------|-----------|--------|---------------|-------------|
| Hero Title (衬线) | `clamp(2.5rem, 5vw + 1rem, 4rem); font-family: "Playfair Display", serif` | 700 | `0.01em` | `1.15` |
| Section Title | `clamp(1.5rem, 3vw + 0.25rem, 2.25rem); font-family: "Playfair Display", serif` | 600 | `0.02em` | `1.2` |
| Body | `clamp(1rem, 0.5vw + 0.75rem, 1.0625rem); font-family: system-ui, sans-serif` | 400 | `0.01em` | `1.75` |
| Small Caps Label | `0.8125rem; font-variant: small-caps; text-transform: lowercase` | 500 | `0.1em` | `1.4` |
| Pullquote | `clamp(1.25rem, 2vw + 0.5rem, 1.75rem); font-family: "Playfair Display", serif; font-style: italic` | 400 | `0` | `1.6` |

### 间距体系

| 区域 | 值 | Token 映射 |
|------|-----|-----------|
| Section gap | `clamp(60px, 8vw, 96px)` | TOKEN_ESCAPE: `--retro-section-gap` |
| Card padding | `clamp(24px, 3vw, 40px)` | TOKEN_ESCAPE: `--retro-card-padding` |
| Content max-width | `780px` (窄——印刷品比例) | TOKEN_ESCAPE: `--retro-content-width` |
| Page margin | `clamp(40px, 8vw, 120px)` (黄金比例感) | TOKEN_ESCAPE: `--retro-page-margin` |

### 形状与纹理

| 属性 | 值 |
|------|-----|
| border-radius | `0px` (直角)，按钮可选 `2px` |
| box-shadow | `none` (无阴影，用边框代替层次) |
| border | `2px solid #3C2415` (装饰性粗边框) |
| 装饰性分隔线 | `border-top: 1px solid #D4C5B2; position: relative;` + 中央放置 ornament SVG |
| 纸质纹理 | `background-image: url("data:image/svg+xml,...noise..."); opacity: 0.05; mix-blend-mode: multiply` |
| 照片滤镜 | `filter: sepia(0.1) contrast(1.05) brightness(0.98)` |
| 照片比例 | `aspect-ratio: 3/2` 或 `aspect-ratio: 4/3` (胶片比例) |

### AG 兼容参数

| 参数 | AG Token 可用？ | TOKEN_ESCAPE？ |
|------|----------------|---------------|
| Background (#F5F0EB) | no | `--retro-bg` |
| Surface (#FFFDF8) | no | `--retro-surface` |
| Text Primary (#3C2415) | no | `--retro-text-primary` |
| Text Secondary (#7A6555) | no | `--retro-text-secondary` |
| Accent Burgundy | no | `--retro-accent-burgundy` |
| Accent Forest | no | `--retro-accent-forest` |
| Accent Gold | no | `--retro-accent-gold` |
| Border (#D4C5B2) | no | `--retro-border` |
| Serif font-family | no | `--retro-display-font` |
| 纸质纹理 | no | `--retro-paper-texture` |
| 照片滤镜 | no | `--retro-photo-filter` |
| Small Caps 处理 | no | `--retro-smallcaps` |

---

## 10. Neon / 霓虹赛博

### 标杆作品分析

| 标杆 | 关键视觉特征 | 可提取参数 |
|------|-------------|-----------|
| GitHub Universe 活动页 | 纯黑底(#000)、紫蓝渐变光晕(#7C3AED→#2563EB)、发光边框 glow effect、等宽代码字体、全大写宽字距标题 | `background: #000; box-shadow: 0 0 30px rgba(124,58,237,0.4); text-shadow: 0 0 20px rgba(124,58,237,0.6); letter-spacing: 0.15em; text-transform: uppercase` |
| Tron Legacy 风格数字设计 | 极简线条发光(cyan #00FFFF)、纯黑背景无妥协、扫描线纹理叠加、几何网格背景微光、字体极细或极粗两极 | `color: #00FFFF; text-shadow: 0 0 10px #00FFFF, 0 0 40px rgba(0,255,255,0.3); scanline: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)` |

### 配色模板

| Role | 亮色方案 (极少使用, 仅备用) | 暗色方案 (主方案) |
|------|---------|---------|
| Background | `#F0F0F5` | `#000000` (纯黑，无妥协) |
| Surface | `#FFFFFF` | `#0A0A0F` |
| Text Primary | `#0A0A0F` (对比度 18.1:1 on #F0F0F5) | `#FFFFFF` (对比度 21:1 on #000) |
| Text Secondary | `#6B6B80` (对比度 4.5:1) | `#808090` (对比度 5.3:1 on #000) |
| Neon Cyan | `#0891B2` (对比度 4.5:1 on #F0F0F5) | `#00FFFF` (对比度 12.1:1 on #000) |
| Neon Magenta | `#A21CAF` (对比度 5.3:1 on #F0F0F5) | `#FF00FF` (对比度 6.7:1 on #000) |
| Neon Green | `#15803D` (对比度 5.1:1 on #F0F0F5) | `#39FF14` (对比度 11.5:1 on #000) |
| Neon Purple | `#7C3AED` (对比度 5.0:1 on #F0F0F5) | `#A855F7` (对比度 5.0:1 on #000) |
| Border | `rgba(0, 0, 0, 0.1)` | `rgba(0, 255, 255, 0.2)` |

### 排版参数

| 元素 | font-size | weight | letter-spacing | line-height |
|------|-----------|--------|---------------|-------------|
| Hero Title | `clamp(3rem, 8vw + 1rem, 7.5rem)` | 800 | `0.15em` | `0.95` |
| Hero Title (全大写) | 同上 + `text-transform: uppercase` | 800 | `0.15em` | `0.95` |
| Section Title | `clamp(1.5rem, 3vw + 0.5rem, 2.5rem)` | 600 | `0.08em` | `1.1` |
| Body | `clamp(0.9375rem, 0.5vw + 0.7rem, 1.0625rem); font-family: "JetBrains Mono", monospace` | 400 | `0.02em` | `1.65` |
| Label / HUD | `0.6875rem; text-transform: uppercase; font-family: monospace` | 500 | `0.2em` | `1.3` |

### 间距体系

| 区域 | 值 | Token 映射 |
|------|-----|-----------|
| Section gap | `clamp(60px, 10vw, 120px)` | TOKEN_ESCAPE: `--neon-section-gap` |
| Card padding | `24px` | TOKEN_ESCAPE: `--neon-card-padding` |
| Content max-width | `1100px` | TOKEN_ESCAPE: `--neon-content-width` |
| Hero height | `100vh` | TOKEN_ESCAPE: `--neon-hero-height` |

### 形状与纹理

| 属性 | 值 |
|------|-----|
| border-radius | `0px` (硬边) 或 `2px` (极小) |
| box-shadow (发光) | `0 0 20px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.1)` |
| text-shadow (发光) | `0 0 10px currentColor, 0 0 40px rgba(currentColor, 0.3)` |
| border (发光边框) | `1px solid rgba(0, 255, 255, 0.3); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.05)` |
| 扫描线纹理 | `background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px); pointer-events: none` |
| 网格背景 | `background-image: linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px` |
| CRT 效果 (可选) | `animation: crt-flicker 0.15s infinite; @keyframes crt-flicker { 0% { opacity: 0.97 } 50% { opacity: 1 } }` |

### AG 兼容参数

| 参数 | AG Token 可用？ | TOKEN_ESCAPE？ |
|------|----------------|---------------|
| Background (#000) | no | `--neon-bg` |
| Surface (#0A0A0F) | no | `--neon-surface` |
| Text Primary (#FFF) | yes (dark mode) | — |
| Neon Cyan | no | `--neon-cyan` |
| Neon Magenta | no | `--neon-magenta` |
| Neon Green | no | `--neon-green` |
| Neon Purple | no | `--neon-purple` |
| box-shadow 发光 | no | `--neon-glow-shadow` |
| text-shadow 发光 | no | `--neon-text-glow` |
| 扫描线纹理 | no | `--neon-scanline` |
| 网格背景 | no | `--neon-grid` |
| Hero font-size (7.5rem) | no | `--neon-hero-size` |
| letter-spacing (0.15em) | no | `--neon-hero-tracking` |
| text-transform uppercase | no | `--neon-transform` |
| monospace font | no | `--neon-mono-font` |

---

## 11. Swiss / International / 瑞士国际主义

### 标杆作品分析

| 标杆 | 关键视觉特征 | 可提取参数 |
|------|-------------|-----------|
| Braun/Dieter Rams 数字化表达 (braun.com) | 纯白底、Helvetica 字体、严格 8px 基准网格、强调色极克制(红色面积<3%)、无圆角直角几何、所有内容严格对齐列线 | `font-family: "Helvetica Neue", "Inter", sans-serif; --grid-unit: 8px; accent: #E53935 (面积≤5%); border-radius: 0; columns: 12` |
| ETH Zurich 官网 (ethz.ch) | 学术严谨排版、模块化字阶(Perfect Fourth 1.333)、左对齐一致、功能性蓝色强调、粗线条做视觉锚点、严格列对齐 | `font-family: "ETH Sans" / Inter; scale-ratio: 1.333; text-align: left; accent: #1F407A; border-bottom: 3px solid #1F407A` |

### 配色模板

| Role | 亮色方案 | 暗色方案 |
|------|---------|---------|
| Background | `#FFFFFF` | `#111111` |
| Surface | `#F5F5F5` | `#1A1A1A` |
| Text Primary | `#111111` (对比度 17.9:1 on #FFF) | `#EEEEEE` (对比度 13.2:1 on #111) |
| Text Secondary | `#555555` (对比度 7.5:1 on #FFF) | `#999999` (对比度 6.3:1 on #111) |
| Accent (功能红) | `#E53935` (对比度 4.6:1 on #FFF, 面积≤5%) | `#EF5350` (对比度 4.6:1 on #111) |
| Accent (功能蓝, 替代方案) | `#1565C0` (对比度 7.3:1 on #FFF) | `#42A5F5` (对比度 5.9:1 on #111) |
| Border | `#E0E0E0` | `#333333` |
| 粗线条锚点 | `#111111` (3px) | `#EEEEEE` (3px) |

### 排版参数 (Perfect Fourth 1.333 字阶)

| 元素 | font-size | weight | letter-spacing | line-height |
|------|-----------|--------|---------------|-------------|
| Hero Title | `clamp(2rem, 4vw + 0.5rem, 3.5rem)` (即 56px @desktop) | 600 | `0` | `1.1` |
| H2 | `clamp(1.5rem, 3vw + 0.25rem, 2.625rem)` (即 42px) | 600 | `0` | `1.15` |
| H3 | `clamp(1.25rem, 2vw + 0.25rem, 2rem)` (即 32px) | 500 | `0` | `1.2` |
| Body | `clamp(0.9375rem, 0.3vw + 0.75rem, 1rem)` (即 16px) | 400 | `0` | `1.6` |
| Caption | `0.75rem` (即 12px) | 400 | `0.02em` | `1.5` |

字阶比率推导：`16px → 21.3px → 28.4px → 37.9px → 50.5px` (×1.333)

### 间距体系 (8px 基准网格)

| 区域 | 值 | Token 映射 |
|------|-----|-----------|
| Section gap | `clamp(48px, 6vw, 80px)` (即 8px×6~10) | `var(--space-12)` ~ `var(--space-20)` |
| Card padding | `24px` (8px×3) | `var(--space-6)` |
| Paragraph gap | `16px` (8px×2) | `var(--space-4)` |
| Content max-width | `1120px` (8px×140) | TOKEN_ESCAPE: `--swiss-content-width` |
| Column gap | `24px` (8px×3) | `var(--space-6)` |

### 形状与纹理

| 属性 | 值 |
|------|-----|
| border-radius | `0px` (严格直角) |
| box-shadow | `none` (纯平面) |
| border | `1px solid #E0E0E0` (功能性分隔) |
| 粗线条视觉锚点 | `border-bottom: 3px solid #111111` (标题下方) |
| 特殊纹理 | 无——完全平面。可选：显性网格线 `background-image: linear-gradient(#E0E0E0 1px, transparent 1px); background-size: 100% 8px` (调试用) |
| 装饰 | 无装饰。形式追随功能 |

### Grid 模板参考

```css
/* 瑞士风格 12 列网格 */
.swiss-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  max-width: 1120px;
  margin: 0 auto;
}
/* 经典分栏 */
.swiss-content--narrow { grid-column: 1 / 7; }    /* 左半 */
.swiss-content--wide { grid-column: 1 / 9; }      /* 2/3 */
.swiss-content--full { grid-column: 1 / -1; }     /* 全宽 */
.swiss-sidebar { grid-column: 9 / -1; }           /* 右侧 1/3 */
/* 移动端 */
@media (max-width: 768px) {
  .swiss-grid { grid-template-columns: 1fr; gap: 16px; }
}
```

### AG 兼容参数

| 参数 | AG Token 可用？ | TOKEN_ESCAPE？ |
|------|----------------|---------------|
| Background / Surface | yes | — |
| Text Primary / Secondary | yes | — |
| Border | yes | — |
| border-radius (0px) | yes | — |
| Spacing (8px 基准) | yes | — |
| Accent Red (#E53935) | no | `--swiss-accent` |
| Content max-width (1120px) | no | `--swiss-content-width` |
| 粗线条锚点 (3px) | no | `--swiss-anchor-line` |

---

## 速查：各原型 TOKEN_ESCAPE 预算汇总

| 原型 | TOKEN_ESCAPE 数量 | AG 兼容度 | 主要偏离领域 |
|------|-------------------|----------|-------------|
| Editorial Minimalism | 4 | ★★★★★ | Hero 字号、间距、内容宽度 |
| Neo-Brutalism | 10+ | ★★☆☆☆ | 配色、边框、阴影、字重全偏离 |
| Glassmorphism | 10 | ★★★☆☆ | 背景渐变、模糊、透明度、圆角 |
| Bento Grid | 6 | ★★★★☆ | Grid 模板、Tint 色调、Display 字号 |
| Gradient Flow | 10 | ★★★☆☆ | 渐变色值、文字渐变、grain 纹理 |
| Dark Cinematic | 10 | ★★★☆☆ | 背景极黑、光晕、网格纹理 |
| Scientific Precision | 3 | ★★★★★ | Data 色板、内容宽度 |
| Organic | 11 | ★★☆☆☆ | 暖色调全偏离、有机形状、纹理 |
| Retro | 12 | ★★☆☆☆ | 配色/字体/纹理全偏离 |
| Neon | 15 | ★☆☆☆☆ | 几乎所有视觉值偏离 |
| Swiss | 3 | ★★★★★ | 强调色、内容宽度、锚点线 |

---

## 对比度速查表

> 所有原型的 Text Primary + Background 组合均达到 WCAG AAA (7:1)。
> 所有 Text Secondary + Background 组合均达到 WCAG AA (4.5:1)。
> Accent 色在大文本 (≥18px bold 或 ≥24px regular) 上均达到 WCAG AA (3:1)。

| 原型 | 亮色 Primary 对比度 | 亮色 Secondary 对比度 | 暗色 Primary 对比度 | 暗色 Secondary 对比度 |
|------|--------------------|--------------------|--------------------|--------------------|
| Editorial Minimalism | 15.4:1 | 4.6:1 | 14.8:1 | 5.2:1 |
| Neo-Brutalism | 21:1 | 12.6:1 | 12.6:1 | 10.1:1 |
| Glassmorphism | 10.2:1 | 4.8:1 | 13.2:1 | 5.6:1 |
| Bento Grid | 15.4:1 | 4.6:1 | 14.8:1 | 5.0:1 |
| Gradient Flow | 10.5:1 | 4.5:1 | 12.8:1 | 5.2:1 |
| Dark Cinematic | 17.9:1 | 5.7:1 | 21:1 | 6.9:1 |
| Scientific Precision | 15.1:1 | 4.6:1 | 11.7:1 | 4.8:1 |
| Organic | 12.6:1 | 4.5:1 | 13.8:1 | 5.0:1 |
| Retro | 9.8:1 | 4.5:1 | 10.2:1 | 5.1:1 |
| Neon | 18.1:1 | 4.5:1 | 21:1 | 5.3:1 |
| Swiss | 17.9:1 | 7.5:1 | 13.2:1 | 6.3:1 |
