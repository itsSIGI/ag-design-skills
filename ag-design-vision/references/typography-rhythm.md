# 表现力排版 — Typography Rhythm

> 超越 AG 标准排版组件（`<Heading>` / `<Body>` / `<Caption>` 等）的创意排版指导。
> 用于 Vision Spec 的排版组合章节。

---

## 1. 模块化字阶（Type Scale）

### 为什么用字阶
随机字号 = 视觉混乱。模块化字阶让所有字号源自同一个数学比率，自动产生和谐感。

### 四种预设字阶

| 名称 | 比率 | 适合场景 | 字号序列（基准 16px） |
|------|------|---------|---------------------|
| **Major Third** | 1.25 | 正文为主、阅读密集 | 10 / 13 / 16 / 20 / 25 / 31 / 39 / 49 |
| **Perfect Fourth** | 1.333 | 平衡型、通用 Landing | 9 / 12 / 16 / 21 / 28 / 38 / 50 / 67 |
| **Augmented Fourth** | 1.414 | 视觉冲击型 | 8 / 11 / 16 / 23 / 32 / 45 / 64 / 90 |
| **Perfect Fifth** | 1.5 | 极强冲击、大标题主导 | 7 / 10 / 16 / 24 / 36 / 54 / 81 / 121 |

### 选择决策
```
页面信息密度？
├─ 高（长文、技术文档） → Major Third 1.25
├─ 中（产品 Landing）   → Perfect Fourth 1.333
├─ 低（品牌展示、Hero 为主） → Augmented Fourth 1.414 或 Perfect Fifth 1.5
```

---

## 2. Hero 标题处理

### 2.1 字号范围
| 场景 | 推荐范围 | 最大值 |
|------|---------|--------|
| SaaS Landing Hero | 48-72px | 80px |
| 品牌/活动页 Hero | 64-96px | 120px |
| 单词/短语 Hero | 80-120px | 120px |
| 数据/KPI Hero | 48-64px | 72px |

### 2.2 响应式缩放（clamp）
用 CSS `clamp()` 实现流畅缩放，不依赖断点跳变：

```css
/* SaaS Landing Hero 标题 */
font-size: clamp(36px, 5vw + 16px, 72px);

/* 品牌页大标题 */
font-size: clamp(48px, 8vw + 16px, 120px);

/* 公式：clamp(最小, 斜率vw + 偏移, 最大) */
/* 斜率计算：(最大 - 最小) / (max-viewport - min-viewport) * 100 */
```

### 2.3 字重与字距组合

| 标题尺寸 | 推荐 weight | letter-spacing | line-height |
|---------|-------------|---------------|-------------|
| ≥ 80px | 500-600 | -0.03em ~ -0.04em | 0.9-1.0 |
| 48-80px | 500-600 | -0.02em ~ -0.03em | 1.0-1.1 |
| 32-48px | 500 | -0.01em ~ -0.02em | 1.1-1.2 |
| 24-32px | 500 | -0.01em | 1.2-1.3 |
| ≤ 24px | 400-500 | 0 ~ 0.01em | 1.4-1.6 |

**规律**：字号越大 → 字距越紧 → 行高越紧。大字需要"拉紧"才有力量感。

### 2.4 标题宽度约束
长标题必须限制宽度，避免一行拉满视口：

```css
/* 最大宽度约束 */
max-width: 16ch;  /* 短标题：3-5 词 */
max-width: 24ch;  /* 中标题：6-10 词 */
max-width: 32ch;  /* 长标题：11-15 词 */

/* 或用 vw 约束 */
max-width: min(720px, 90vw);
```

---

## 3. 文字效果

### 3.1 Gradient Text（渐变文字）
TIER_3 区域可使用。注意可读性：

```css
.gradient-text {
  background: linear-gradient(135deg, #6366F1, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
**约束**：仅用于标题（≥ 24px），不用于正文。渐变两端色必须与背景有足够对比度。

### 3.2 全大写处理
全大写标题需要加宽字距：

```css
.uppercase-title {
  text-transform: uppercase;
  letter-spacing: 0.08em;  /* 大写字母间距更宽才好读 */
  font-weight: 600;
}
```
**约束**：仅用于短文本（≤ 5 词）。长段落禁止全大写。

### 3.3 数据值排版（继承 AG polish）
KPI 和统计数据保持 AG 的精修做法：
```css
.data-value {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}
```

---

## 4. 字体族决策

### 4.1 AG 默认
AG 使用系统字体栈（sans-serif），所有 TIER_1/TIER_2 区域必须使用系统字体。

### 4.2 TIER_3 Display Font 选择树
```
需要什么感觉？
├─ 现代/中性 → Inter Display / system-ui
├─ 权威/学术 → Serif（Playfair Display / Lora / Source Serif）
├─ 技术/代码 → Monospace（JetBrains Mono / Fira Code）
├─ 个性/独特 → 需要与用户确认具体字体
```

### 4.3 字体加载策略
```css
/* 使用 font-display: swap 避免 FOIT */
@font-face {
  font-family: 'Display Font';
  src: url('/fonts/display.woff2') format('woff2');
  font-display: swap;
  /* 只加载需要的字重 */
  font-weight: 500;
}
```
**预算**：最多 2 个字体文件（1 display weight + 1 italic if needed），总大小 ≤ 100KB。

---

## 5. 正文与标题的混排

### 5.1 AG 排版组件在非 Hero 区域的使用

Vision Spec 的排版只在 TIER_3 Hero 区域偏离 AG 标准。Body sections 应该回到 AG 标准排版：

```
Hero 区域（TIER_3）：
  标题 → 自定义 display size + TOKEN_ESCAPE
  副标题 → 自定义 size
  
过渡段（TIER_2）：
  小标题 → <Heading> 或 <Subheading>
  正文 → <Body>
  
主体内容（TIER_1）：
  全部回到 → <Heading> / <Body> / <Small> / <Caption>
```

### 5.2 垂直节奏
正文段落之间的间距应该保持节奏感：

| 元素关系 | 间距策略 |
|---------|---------|
| 段落↔段落 | 1em（等于行高） |
| 标题↔段落 | 0.5em（标题"粘"在内容上） |
| section↔section | 3-5em（明确的视觉断裂） |
| 引用块/代码块 前后 | 1.5em |
