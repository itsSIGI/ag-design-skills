# Vision Spec 模板（7 章节）

> Step 3 深化方向时按本模板填写。产出写到
> `docs/sigi-design/vision/<date>-<topic>.md`。

## 产物头部必须包含

每份 Vision Spec 开头写死下游指令：

> 下一步：用 sigi-design-build 按本 Spec 生成代码。
> TIER_3 区域的每个 TOKEN_ESCAPE 需在 build 的 recipe 中单独登记。

---

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

