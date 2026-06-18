# 创意配色理论 — Color Theory for Vision Spec

> 超越 AG token 体系的创意配色指导。用于 Vision Spec 的配色策略章节。
> 每个配色方案最终必须通过 AG Compliance Bridge 映射回 TOKEN_ESCAPE 声明。

---

## 1. 色彩和谐类型决策树

```
需要什么样的情绪？
│
├─ 统一/沉稳/高级感
│  → Monochromatic（单色）：一个色相，多个明度/饱和度变体
│  → Analogous（类似色）：色轮相邻 30° 内的 2-3 个色相
│
├─ 对比/活力/冲击力
│  → Complementary（互补色）：色轮对面 180° 的两个色相
│  → Split-Complementary（分裂互补）：一个主色 + 其互补色两侧各 30° 的色
│
├─ 丰富/多元/欢快
│  → Triadic（三等分）：色轮上等距 120° 的三个色相
│  → Tetradic（四等分）：色轮上等距 90° 的四个色相（难用好，慎选）
│
└─ 中性/克制/让内容说话
   → Achromatic（无彩色）：纯黑白灰
   → Near-monochromatic：一个极低饱和色 + 黑白灰
```

---

## 2. 情绪→调色板映射表

| 情绪类别 | 色温 | 饱和度 | 明度策略 | 推荐和谐类型 |
|---------|------|--------|---------|-------------|
| **Trustworthy / 可信赖** | 冷（蓝/蓝绿） | 中低（30-50%） | 中高明度，高对比文字 | Monochromatic / Analogous |
| **Innovative / 创新** | 冷暖混合 | 中（40-60%） | 暗背景+亮强调 | Split-Complementary / Gradient |
| **Energetic / 活力** | 暖（橙/黄/红） | 高（60-80%） | 高明度，鲜艳 | Triadic / Complementary |
| **Calm / 沉静** | 冷（蓝/绿/灰蓝） | 低（20-40%） | 高明度，柔和 | Analogous / Monochromatic |
| **Bold / 大胆** | 任意 | 极高（70-100%） | 高对比 | Complementary / 直接撞色 |
| **Premium / 高端** | 中性偏暖/偏冷 | 极低（10-30%） | 暗色为主，金/银点缀 | Near-monochromatic |

---

## 3. 调色板配方模板（6 套预设）

### 3.1 Trust Blue / 信赖蓝
```
Background:  #F8FAFC (浅蓝灰)
Surface:     #FFFFFF
Text:        #0F172A (深蓝灰)
Secondary:   #64748B (中灰蓝)
Accent:      #2563EB (蓝)
Accent-soft: rgba(37, 99, 235, 0.08) (蓝色 wash)
```
**适合**：SaaS Landing、企业官网、API 文档展示
**60-30-10**：浅蓝灰 60% / 深色文字+边框 30% / 蓝色 CTA 10%

### 3.2 Innovation Gradient / 创新渐变
```
Background:  #0F0F23 (深蓝黑)
Surface:     rgba(255,255,255,0.05) (半透明白)
Text:        #F1F5F9 (浅灰白)
Secondary:   #94A3B8 (中灰)
Gradient:    linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899) (紫→粉)
Accent:      #818CF8 (亮紫)
```
**适合**：AI 产品展示、技术创新发布
**60-30-10**：深蓝黑 60% / 灰白文字 30% / 渐变光晕 10%

### 3.3 Nature Organic / 自然有机
```
Background:  #FEFCF8 (暖白)
Surface:     #F5F0EB (米灰)
Text:        #3D3929 (暖深褐)
Secondary:   #8C836F (暖中灰)
Accent:      #4A7C59 (森林绿)
Accent-warm: #C4956A (陶土)
```
**适合**：生命科学、健康、可持续发展
**60-30-10**：暖白 60% / 暖灰+褐色文字 30% / 绿色+陶土 10%

### 3.4 Dark Dramatic / 暗色戏剧
```
Background:  #0A0A0A (近纯黑)
Surface:     #171717 (极深灰)
Text:        #FAFAFA (近纯白)
Secondary:   #A3A3A3 (中灰)
Accent:      #22C55E (明亮绿) 或 #3B82F6 (明亮蓝)
Glow:        rgba(34, 197, 94, 0.15) (光晕)
```
**适合**：开发者工具、AI 展示、黑客松
**60-30-10**：深黑 60% / 灰白文字 30% / 亮色 accent 10%

### 3.5 Warm Retro / 暖色复古
```
Background:  #F5F0EB (米白)
Surface:     #E8DFD1 (浅米)
Text:        #2C1810 (深棕)
Secondary:   #8B7355 (中棕)
Accent:      #C44536 (砖红)
Accent-gold: #B8860B (暗金)
```
**适合**：品牌故事、历史叙事、手工感
**60-30-10**：米白 60% / 棕色文字+边框 30% / 砖红+金色 10%

### 3.6 Electric Neon / 电光霓虹
```
Background:  #000000 (纯黑)
Surface:     #0D0D0D (近黑)
Text:        #FFFFFF (纯白)
Secondary:   #737373 (中灰)
Neon-1:      #00FFFF (cyan)
Neon-2:      #FF00FF (magenta)
Glow:        0 0 20px rgba(0, 255, 255, 0.3) (发光 box-shadow)
```
**适合**：游戏/活动页、黑客松、极前卫展示
**60-30-10**：纯黑 60% / 白色文字 30% / 霓虹发光 10%

---

## 4. 渐变构造规则

### 4.1 方向选择
| 渐变目的 | 推荐方向 | 角度 |
|---------|---------|------|
| 天空/空间感 | 上→下 | 180deg |
| 动态/流动 | 左上→右下 | 135deg |
| 水平扩展 | 左→右 | 90deg |
| 聚焦/光源 | 径向（radial）| center |
| 扫描/旋转 | 锥形（conic）| center |

### 4.2 色标数量
- **2 色**：最安全，过渡最自然
- **3 色**：中间色应是两端色的调和色，避免"脏灰"中间段
- **4+ 色**：高风险，只用于彩虹/光谱效果。中间色之间间距不均等可增加节奏感

### 4.3 过渡平滑度
```css
/* 自然过渡——渐变色标间距不均等 */
background: linear-gradient(135deg,
  #6366F1 0%,
  #8B5CF6 35%,   /* 不是 50%——偏向起始色 */
  #EC4899 100%
);

/* 避免"硬带"——中间加一个透明度变化的同色标 */
background: linear-gradient(135deg,
  #6366F1 0%,
  #7C5CE2 30%,   /* 调和色 */
  #EC4899 100%
);
```

### 4.4 Grain 叠加
渐变容易显得"塑料感"。叠加微妙的 noise texture 可增加质感：
```css
/* 在渐变层上叠加 grain */
.gradient-with-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url('grain-texture.svg');
  opacity: 0.03;       /* 极微妙 */
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

---

## 5. AG Token 桥接协议

### 5.1 TOKEN_ESCAPE 声明格式
Vision Spec 中每个偏离 AG token 的色值必须按此格式声明：

```markdown
| Role | Value | AG Token Mapping | Scope |
|------|-------|------------------|-------|
| Hero background | #0F0F23 | TOKEN_ESCAPE: hero-section-only | 仅 Hero section 背景 |
| Accent gradient | linear-gradient(135deg, #6366F1, #EC4899) | TOKEN_ESCAPE: hero-cta | Hero 区 CTA 按钮和光晕 |
| Body surface | var(--color-surface) | — | 标准 AG token |
```

### 5.2 过渡色策略
从创意色过渡到 AG 标准色的"降落带"：

```
TIER_3 Hero         →    过渡段（1-2 sections）    →    TIER_1/2 Body
#0F0F23 (自定义深色)  →    var(--color-bg) (AG 标准白)
#6366F1 (自定义紫)    →    AG 装饰色 Teal/Purple     →    var(--color-text-primary)
```

过渡手法：
1. **渐变覆盖**：在 Hero 底部叠加从透明到 `var(--color-bg)` 的渐变
2. **间距缓冲**：过渡段用 80-120px 大间距，视觉上"呼吸"过渡
3. **色彩降档**：创意强调色 → AG 装饰色板 → AG 语义色，逐步回归

---

## 6. 对比度速查

所有文本必须满足 WCAG AA：

| 场景 | 最小对比度 | 检查方法 |
|------|-----------|---------|
| 正文文本（≤18px） | 4.5:1 | text color vs background |
| 大文本（≥18px bold 或 ≥24px） | 3:1 | text color vs background |
| 非文本 UI 元素（图标/边框） | 3:1 | element vs adjacent |
| 装饰性文本（纯装饰无信息） | 无要求 | — |

**暗背景常见陷阱**：
- ❌ `#737373` on `#0A0A0A` = 4.4:1（不过 AA！）
- ✅ `#A3A3A3` on `#0A0A0A` = 7.2:1（过 AA）
- ❌ 浅色渐变上的白色文字——渐变亮部可能不过对比度

---

## 7. 品牌延伸 vs 全新配色 — 双轨决策协议

### 7.1 模式判定

```
用户的配色诉求是什么？
│
├─ "遵循品牌色规范" / "品牌一致性" / "在现有品牌基础上"
│  → 品牌延伸模式
│
├─ "全新配色" / "不受品牌约束" / "全新平台" / "独立活动页"
│  → 全新配色模式
│
├─ 用户没有明确说
│  → 追问："这个页面需要遵循已有品牌色规范，还是可以全新配色？"
│
└─ 已有品牌指南但用户要"突破"
   → 品牌延伸模式为主，TIER_3 区域可局部突破（需 TOKEN_ESCAPE 声明）
```

### 7.2 品牌延伸模式（Brand Extension）

> 在已有品牌色体系内丰富视觉表现——核心品牌色不变，通过技巧扩展表现力。

**可用手法**：

| 手法 | 具体操作 | TOKEN_ESCAPE？ |
|------|---------|----------------|
| **色阶扩展** | 从品牌主色生成 5-9 级色阶（±10-20% 亮度/饱和度） | 否——仍在品牌色域内 |
| **渐变** | 品牌色之间的渐变（如品牌蓝→品牌绿） | TIER_3 需声明 |
| **光效/光晕** | 品牌色的低透明度 radial-gradient 做背景装饰 | TIER_3 需声明 |
| **暗色模式** | 深色背景 + 品牌色作为 accent | TIER_3 背景色需声明 |
| **Tint/Wash** | 品牌色的极低饱和度版本做 section 背景 | 否——装饰色板范围内 |
| **互补色点缀** | 品牌色的色轮互补色，仅用于极小面积（≤5%） | 需声明 |

**不可用手法**：
- ❌ 替换品牌主色
- ❌ 大面积使用非品牌色
- ❌ 品牌色的饱和度/色相偏移 > 30°

**TOKEN_ESCAPE 预算**：品牌延伸模式下 ≤ 8 个（比全新模式更紧，因为创意空间更小）

### 7.3 全新配色模式（New Palette）

> 不受既有品牌约束，按页面目标和情绪从零构建配色。

**使用本文件 §1-§6 的完整工具链**：
1. §1 选配色和谐类型
2. §2 按情绪选调色板方向
3. §3 从预设配方开始或全新构建
4. §4 构建渐变（如需要）
5. §5 通过 AG Token 桥接协议声明 TOKEN_ESCAPE
6. §6 验证对比度

**TOKEN_ESCAPE 预算**：全新模式下 ≤ 15 个（标准预算）

### 7.4 混合场景

当页面有品牌区域和自由区域时（如官网 Landing page）：
- **品牌区域**（导航、Footer、Logo 附近）→ 品牌延伸模式
- **创意区域**（Hero、CTA、特色 section）→ 全新配色模式
- 过渡带按 §5.2 的过渡色策略处理
