# 审美自检清单

> Step 5 交付前必须逐条执行。6 个维度：
> Coherence / Impact / Hierarchy / Craft / AG Bridge / Visualization。

---

## 审美自检清单（Step 5 交付前必须执行）

### Coherence / 一致性
- [ ] 所有颜色源自同一个调色板逻辑（和谐类型已记录）
- [ ] 排版最多 2 个字体族（1 display + system sans-serif）
- [ ] 插画风格与声明的风格原型一致
- [ ] 动效语言一致（同一个 easing 族、比例性时长）

### Impact / 冲击力
- [ ] Hero section 有一个明确的视觉焦点
- [ ] 首屏传达了核心信息
- [ ] 情绪关键词在可测量的视觉属性中得到体现（不只是文字声明）

### Hierarchy / 层级
- [ ] 页面各 section 有意的视觉权重变化（不全部等权）
- [ ] CTA 是最高对比度的交互元素
- [ ] 辅助内容在视觉上从属于主要内容

### Craft / 精致度
- [ ] 字阶有一致的数学比率
- [ ] 间距值遵循一致的比例体系
- [ ] 动效时长构成比例集合（不是随机值）
- [ ] 所有文本的颜色对比度 ≥ WCAG AA（4.5:1）

### AG Bridge / 衔接
- [ ] TIER_1 区域使用标准 AG token，零修改
- [ ] TIER_2 区域用 AG token + 文档化扩展
- [ ] TIER_3 区域每个非 token 值都有 TOKEN_ESCAPE 声明
- [ ] 创意区→标准区过渡视觉上顺滑（无突兀接缝）
- [ ] design-constitution section 2 红线无违反
- [ ] 所有动画有 prefers-reduced-motion 回退

### Visualization / 可视化（交付前必须确认）
- [ ] Step 2 已出 3 选 1 并排稿（HTML 或 Pencil，除非用户明确跳过）
- [ ] Step 3.5 已出完整视觉稿并经用户对着稿确认
- [ ] 稿挂了真实 token（HTML 挂 tokens.css / Pencil 建 token 变量），TIER_1 区域观感与真实系统一致
