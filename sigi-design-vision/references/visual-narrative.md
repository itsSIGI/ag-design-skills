# 视觉叙事 — Visual Narrative

> 把页面当作一个"视觉故事"来编排。每个 section 是一个"场景"，滚动是"翻页"。
> 用于 Vision Spec 的布局编排章节。

---

## 1. 四种页面叙事结构

### 1.1 Classic SaaS / 经典 SaaS

```
Hero（价值主张）
  ↓ 80-120px
Features（核心功能 3-6 个）
  ↓ 60-80px
Social Proof（客户 logo / 推荐语 / 数据指标）
  ↓ 60-80px
CTA（行动号召）
  ↓ 40-60px
Footer
```

**适合**：产品 Landing page、SaaS 首页、工具介绍
**节奏**：高能量开场 → 理性说服 → 信任背书 → 行动收束
**Hero 能量**：★★★★ 高——视觉冲击力在这里

### 1.2 Problem → Solution / 问题→方案

```
Problem（痛点描述——用户共鸣）
  ↓ 80-100px
Agitation（痛点放大——数据/场景）
  ↓ 60-80px
Solution（方案展示——产品/功能）
  ↓ 60-80px
Evidence（证据——案例/数据/对比）
  ↓ 60-80px
CTA
  ↓ 40-60px
Footer
```

**适合**：新品类推广、需要教育市场的产品
**节奏**：共鸣 → 紧张 → 释放 → 证明 → 行动
**Hero 能量**：★★★ 中——Hero 是问题描述，不是产品秀

### 1.3 Story Arc / 品牌故事弧

```
Setup（引子——品牌起源/愿景）
  ↓ 80-120px
Tension（挑战——为什么做这件事）
  ↓ 60-80px
Journey（历程——怎么走到今天）
  ↓ 60-80px
Resolution（成果——今天的产品/团队）
  ↓ 60-80px
Invitation（邀请——加入/试用/了解更多）
  ↓ 40-60px
Footer
```

**适合**：品牌页、关于我们、年度报告
**节奏**：沉浸 → 情感共鸣 → 认同 → 行动
**Hero 能量**：★★★★★ 最高——大面积视觉叙事

### 1.4 Progressive Disclosure / 渐进披露

```
Overview（概览——一句话 + 核心视觉）
  ↓ 40-60px
Layer 1（第一层细节——点击/滚动展开）
  ↓ 40-60px
Layer 2（第二层细节——更技术/更深入）
  ↓ 40-60px
Layer 3（第三层细节——API/文档/对比表）
  ↓ 40-60px
CTA（根据用户已到达的深度调整 CTA）
  ↓ 40-60px
Footer
```

**适合**：技术产品深度介绍、API 文档 Landing、面向不同深度的受众
**节奏**：简单 → 逐层深入 → 技术细节 → 行动
**Hero 能量**：★★ 低——概览式，不抢戏

---

## 2. 叙事结构选择决策

```
页面核心目的是什么？
│
├─ 让用户试用/购买产品 → Classic SaaS
├─ 让用户理解为什么需要这个产品 → Problem → Solution
├─ 让用户认同品牌/团队 → Story Arc
├─ 让不同深度的用户都能得到信息 → Progressive Disclosure
```

---

## 3. Section 视觉权重管理

### 3.1 视觉能量分配

每个 section 都有一个"视觉能量值"。整个页面的能量不应均匀——需要**起伏**：

```
能量
 ★★★★★ │  ╭──╮                            ╭──╮
 ★★★★  │  │  │                            │  │
 ★★★   │  │  ╰──╮     ╭──╮              │  │
 ★★    │  │     │     │  │     ╭──╮     │  │
 ★     │──╯     ╰──╮  │  ╰──╮  │  ╰──╮  │  ╰──
       │           ╰──╯     ╰──╯     ╰──╯
       └──────────────────────────────────────────
        Hero  Features  Proof  Detail  CTA  Footer
```

### 3.2 视觉能量工具

| 能量等级 | 字号 | 留白 | 配色 | 动效 |
|---------|------|------|------|------|
| ★★★★★ | Display (48-120px) | 极大 (100vh) | 创意配色/渐变 | Hero 入场动画 |
| ★★★★ | Heading (32-48px) | 大 (60-80px) | 强调色点缀 | Scroll reveal |
| ★★★ | Subheading (24-32px) | 中 (40-60px) | 中性色为主 | 简单 fade |
| ★★ | Body (16-20px) | 中 (24-40px) | 纯中性色 | 无/微妙 |
| ★ | Small/Caption (12-14px) | 紧 (16-24px) | muted 色 | 无 |

### 3.3 不允许的能量分配

- ❌ 所有 section 都是 ★★★★★（"Everything screams, nothing is heard"）
- ❌ 所有 section 都是 ★★（"A flat experience with no peaks"）
- ❌ Hero 低于 Body sections（"Anti-climactic entry"）
- ❌ Footer 高于 Features（"The ending steals the show"）

---

## 4. 滚动节奏设计

### 4.1 间距节奏

间距不是均匀的——它遵循叙事节奏：

| 间距类型 | Token / 值 | 用途 |
|---------|-----------|------|
| **紧** | 16-24px | 同一概念的元素间（标题↔描述、图标↔标签） |
| **中** | 40-60px | 同一 section 内的子块间 |
| **松** | 60-80px | section 间的标准间距 |
| **极松** | 80-120px | 叙事转折点的间距（Hero→Body、Problem→Solution） |

### 4.2 节奏变化原则
- **叙事转折处**用极松间距——给读者"呼吸"的空间
- **信息密集处**用紧间距——保持阅读连续性
- **相同重要度的 section 间**间距一致——创建节奏感
- **尾部收束**——最后几个 section 间距逐渐缩小，引导向 CTA

---

## 5. CTA 策略

### 5.1 CTA 放置

| 策略 | 描述 | 适合 |
|------|------|------|
| **尾部 CTA** | 页面底部一个大 CTA section | 最安全，适合所有叙事结构 |
| **双重 CTA** | Hero 内一个 + 尾部一个 | Classic SaaS，给"不想往下看"的人一个快速入口 |
| **Sticky CTA** | 滚动到一定位置后固定在底部/顶部 | 长页面，确保 CTA 始终可达 |
| **分散 CTA** | 每个 section 末尾一个 | Progressive Disclosure，不同深度的用户各取所需 |

### 5.2 CTA 视觉强调

CTA 必须是页面中**最高对比度的交互元素**：

```
所有按钮的对比度排序：
CTA Primary > Section CTA > Navigation CTA > Ghost/Link

视觉手段：
- 尺寸：CTA 按钮比标准按钮大 1.2-1.5 倍
- 颜色：使用 Hero Palette 的 accent 色
- 间距：CTA 周围留足空间（上下至少 var(--space-8)）
- 动效：CTA section 可以有独立的入场动画
```

---

## 6. 内容-装饰比

### 6.1 首屏规则
首屏（above-the-fold）必须 ≥60% 面积是有意义内容：

```
有意义内容 = 标题 + 副标题 + CTA + 核心信息
装饰 = 背景渐变 + 插画 + 动画元素 + 装饰性形状

✅ 标题占 30% + CTA 占 10% + 副标题占 15% + 留白 25% + 装饰 20% = 55% content + 20% decoration
❌ 大面积背景动画 50% + 小标题 15% + CTA 5% + 留白 30% = 20% content + 50% decoration
```

### 6.2 整页规则
- 装饰性元素总面积不超过页面总面积 25%
- 每个 section 至少有一个"可操作信息"（标题/数据/CTA）
- 纯装饰性 section（无内容，只有视觉效果）不超过 1 个

---

## 7. 首屏清单

Vision Spec 完成后检查首屏：

- [ ] 核心信息在首屏可见（无需滚动）
- [ ] 标题传达了页面的核心价值主张
- [ ] CTA 可见且可点击（如果采用双重 CTA 策略）
- [ ] 加载 1s 内首屏内容完全可见（不被动画延迟阻挡）
- [ ] 首屏视觉焦点明确（squint test 通过）
- [ ] 有明确的"向下滚动"暗示（内容露出 / 向下箭头 / 渐变裁切）
- [ ] 内容-装饰比 ≥ 60:40
