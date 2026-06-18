# 视觉风格原型词汇表 — Style Vocabulary

> 每个风格原型是一组**参数化的视觉 DNA**——不是灵感图片，而是可直接填入 Vision Spec 的具体属性。
> Step 2 从这里选 3 个方向给用户，Step 3 按选定原型展开完整 Spec。

---

## 使用方法

1. 读 Creative Brief 的情绪关键词
2. 在下方原型中找 **When to use** 匹配度最高的 3 个
3. 生成 Direction Card 时，直接引用原型的 Visual DNA
4. 用户选定后，在 Step 3 深化时以原型为骨架，根据具体需求调整参数

> ### 开放体系声明
>
> 以下 11 个原型是**快速启动基底**，不是封闭清单。实际的审美灵感来源远比这丰富：
>
> - **AI 搜索的设计参考** > 原型库：Step 2 会主动从 Dribbble/Behance/Awwwards 搜索高质量参考
> - **原型作为兜底**：搜索结果与原型高匹配时使用原型骨架；部分匹配时混合原型；无匹配时构建自定义风格
> - **原型可扩展**：遇到新的视觉风格且成功交付后，沉淀为新原型（见 SKILL.md 自演化机制）
>
> 使用优先级：**搜索到的真实优秀作品** > **原型匹配** > **原型混合** > **自定义风格模板**

---

## 1. Editorial Minimalism / 编辑式极简

**When to use**：产品介绍、技术博客、研究报告展示、需要阅读沉浸感的场景
**When NOT to use**：需要视觉热闹感的营销活动、信息密度极高的仪表板

**Visual DNA**：
- **Typography**: Impact scale，大标题 48-72px weight 600，正文 18px weight 400，行高 1.6-1.8。大量留白让文字"浮"在页面上
- **Color**: 近乎单色——黑/深灰 + 纯白 + 1 个极克制的强调色（用于 CTA 和关键链接）
- **Space**: 极慷慨的留白。section 间距 80-120px。内容区最大宽度 680-720px
- **Shape**: 无圆角或极小圆角（0-4px）。几何感，直线为主
- **Texture**: 完全平坦，无渐变无纹理。偶尔用极细线条（1px hairline）做分隔
- **Grid**: 单列为主，偶尔双列。不对称分割（如 55:45）增加节奏感

**AG 兼容度**：★★★★★ 最高——AG 本身就是克制的灰色系，编辑式极简是最自然的延伸
**TOKEN_ESCAPE 预估**：3-5 个（主要在 Hero 标题字号和间距上）

**参考标杆**：
- Apple.com 产品页——大标题 + 大留白 + 单张产品图
- Stripe Press——编辑排版 + 克制配色

---

## 2. Neo-Brutalism / 新粗野主义

**When to use**：开发者工具、技术创新展示、年轻化品牌、需要"反设计"张力的场景
**When NOT to use**：企业级客户、医疗/金融/政务等需要信任感的场景

**Visual DNA**：
- **Typography**: 粗体无衬线，标题 weight 600 + 全大写或混合大小写。标题可到 60-96px。行高紧凑 1.0-1.2
- **Color**: 高饱和撞色——黄+黑、粉+蓝、绿+紫。大面积纯色块做背景。不怕"丑"
- **Space**: 密度两极化——标题区极大留白，内容区可以紧凑
- **Shape**: 无圆角（0px），粗边框（2-3px solid black）。几何方块堆叠
- **Texture**: 平坦但有"重量感"——粗边框、硬阴影（offset shadow 而非 blur）
- **Grid**: Bento-like 但更粗犷。不规则尺寸的色块拼贴

**AG 兼容度**：★★☆☆☆ 低——与 AG"冷峻精确"风格有大反差，需大量 TOKEN_ESCAPE
**TOKEN_ESCAPE 预估**：10-15 个（配色、边框、阴影、圆角全部偏离）

**参考标杆**：
- Gumroad 早期设计——粗边框 + 硬阴影 + 高饱和色
- Figma Config 活动页——色块拼贴 + 粗字体

---

## 3. Glassmorphism / 玻璃态

**When to use**：现代科技感、AI/云服务产品、需要"透明/轻盈"感受的场景
**When NOT to use**：低性能设备目标、需要极高可读性的数据密集场景

**Visual DNA**：
- **Typography**: 轻量无衬线，weight 400-500 为主。标题 36-56px。白色或极浅色文字在半透明背景上
- **Color**: 深色或渐变背景 + 半透明白/浅色卡片（rgba 白色 0.1-0.2 透明度）。强调色通过"光晕"（radial gradient）体现
- **Space**: 中等留白。卡片间距 16-24px。整体视觉密度中等
- **Shape**: 大圆角（16-24px）。软化边缘，增加"漂浮感"
- **Texture**: backdrop-filter: blur(20-40px) + 微妙 border（1px solid rgba(255,255,255,0.1)）。光晕效果（radial-gradient）
- **Grid**: 卡片网格为主。卡片有"浮"在背景上的层次感

**AG 兼容度**：★★★☆☆ 中等——需要 TOKEN_ESCAPE 做背景和模糊效果，但布局可复用 AG
**TOKEN_ESCAPE 预估**：8-12 个（背景渐变、模糊值、透明度、圆角）

**参考标杆**：
- Linear.app——暗背景 + 玻璃态卡片 + 光晕
- Apple Vision Pro 页面——磨砂玻璃 + 深色背景

---

## 4. Bento Grid / 便当盒网格

**When to use**：功能展示、产品特性概览、"一页展示多个亮点"的场景
**When NOT to use**：叙事性强的品牌故事、需要单一焦点的 Hero 场景

**Visual DNA**：
- **Typography**: 清晰的层级——卡片标题 20-24px weight 500，描述 14-16px weight 400。数字/指标可用 display size
- **Color**: 统一的中性底色 + 每个 Bento cell 可有微妙的色调差异（如浅蓝/浅绿/浅紫 tint）。不超过 3 个色调
- **Space**: 卡片间 gap 统一（8-16px）。卡片内部 padding 一致。紧凑但不拥挤
- **Shape**: 统一中等圆角（8-12px）。所有卡片同一个圆角值
- **Texture**: 微妙的 elevation 差异——部分 cell 可用轻微阴影或背景差。可在个别 cell 放装饰性图形
- **Grid**: 非均匀网格——大小 cell 混排。典型：2x2 中有一个跨列大 cell。比例变化制造视觉节奏

**AG 兼容度**：★★★★☆ 高——本质是 `<AgCard>` 的变体网格，主要 ESCAPE 在 grid 模板和 cell 色调
**TOKEN_ESCAPE 预估**：5-8 个（grid-template、cell 色调、特殊 cell 尺寸）

**参考标杆**：
- Apple 功能对比页——Bento 布局展示芯片/电池/相机特性
- Vercel Dashboard 式概览——不同大小卡片展示功能

---

## 5. Gradient Flow / 渐变流

**When to use**：品牌升级、创新产品发布、需要"未来感/科技感"的场景
**When NOT to use**：严肃的数据报告、需要中性客观感受的场景

**Visual DNA**：
- **Typography**: 现代无衬线，标题可用 gradient text（background-clip: text）。标题 48-80px weight 500-600
- **Color**: 多色渐变为核心视觉——线性/径向/锥形渐变。从 AG 装饰色板（Teal→Purple→Orange）推导。渐变要"安静"——低饱和度、大范围过渡
- **Space**: 大 section 留白（80-120px）让渐变有空间展开。渐变不应被内容遮挡
- **Shape**: 中等圆角（8-16px）。流体形状（blob/wave SVG）做装饰
- **Texture**: 渐变本身就是纹理。可叠加微妙 grain（noise overlay 0.02-0.05 opacity）增加质感。避免渐变太"塑料感"
- **Grid**: 全宽渐变背景 + 内容在居中容器内。渐变跨越 section 边界制造连续感

**AG 兼容度**：★★★☆☆ 中等——渐变值全部需要 TOKEN_ESCAPE，但文本和交互组件可用 AG token
**TOKEN_ESCAPE 预估**：8-12 个（渐变色值、方向、blob 形状）

**参考标杆**：
- Raycast.com——深色底 + 彩色渐变光晕
- Framer.com——柔和渐变 + grain 纹理

---

## 6. Dark Cinematic / 暗色电影感

**When to use**：高端产品展示、AI/ML 技术展示、夜间模式优先、需要"戏剧性"的场景
**When NOT to use**：日间常用的工具页面、需要轻松愉快感受的场景

**Visual DNA**：
- **Typography**: 高对比——极亮文字（#FFFFFF 或 #F0F0F0）在极深背景上。标题粗 weight 600，正文细 weight 400 制造反差
- **Color**: 深色背景（#0A0A0A ~ #1A1A1A）+ 单一高亮强调色（品牌蓝/绿/紫）。强调色只用于关键焦点。大面积暗色 + 小面积亮色
- **Space**: 慷慨留白，让暗色背景的"空"变成设计元素。section 间距 80-120px
- **Shape**: 小圆角（4-8px）。锐利感，配合深色的"精确"情绪
- **Texture**: 微妙的背景渐变（radial，从中心略亮到边缘纯暗）。可用极淡的网格线纹理增加深度
- **Grid**: 居中单列或不对称双列。大量负空间。产品图/3D 渲染可全出血

**AG 兼容度**：★★★☆☆ 中等——AG 有暗色模式 token，但电影感需要更极端的对比度和装饰
**TOKEN_ESCAPE 预估**：8-12 个（背景色加深、强调色亮度、渐变装饰）

**参考标杆**：
- OpenAI.com——深黑 + 绿色强调 + 大留白
- Vercel.com 首页——暗色 + 代码美学 + 渐变光线

---

## 7. Scientific Precision / 科学精确

**When to use**：科研数据展示、技术文档、实验报告、需要"可信赖"感受的场景
**When NOT to use**：需要温暖/人情味的场景、面向非技术受众的营销

**Visual DNA**：
- **Typography**: 等宽体混排——代码/数据用 monospace，说明文字用 sans-serif。标题 28-48px weight 500，数据值用 tabular-nums + 负字距
- **Color**: 冷灰底 + 功能性配色（数据可视化色板）。颜色只为传递信息，不为装饰。AG 默认配色最为匹配
- **Space**: 信息密度适中。数据区紧凑（8-12px gap），说明区宽松（24-32px）。"内紧外松"
- **Shape**: 小圆角（2-4px）或无圆角。精确的矩形网格。数据表格用 1px 线分隔
- **Texture**: 完全平坦。网格线和坐标轴是唯一的"纹理"。可用微妙的背景网格（grid pattern）
- **Grid**: 严格的列对齐。数据表格和图表占主导。12 列网格，严格对齐

**AG 兼容度**：★★★★★ 最高——这就是 AG 的 DNA。几乎零 TOKEN_ESCAPE
**TOKEN_ESCAPE 预估**：2-4 个（可能在 Hero 标题或数据可视化装饰上）

**参考标杆**：
- Observable.com——代码+数据+叙事混排
- Wolfram Alpha——数据精确性 + 清晰层级

---

## 8. Organic / 有机生态

**When to use**：生命科学、健康/医疗、可持续发展、需要"自然/人性化"感受的场景
**When NOT to use**：需要技术硬核感的场景、效率优先的工具界面

**Visual DNA**：
- **Typography**: 圆润的无衬线（如 Inter 的 rounded 变体感觉）。中等字重。行高宽松 1.7-1.8。可在 TIER_3 用衬线做 display
- **Color**: 自然色调——暖灰、大地色（terracotta/sage/sand）、柔和绿色。低饱和度。配色灵感来自自然界
- **Space**: 宽松留白，有"呼吸感"。圆形/椭圆形的负空间。section 间距 60-80px
- **Shape**: 大圆角（16-24px）甚至完全圆形。有机形状（blob/wave）。避免锐角
- **Texture**: 微妙的纸质纹理（noise overlay 0.03 opacity）或水彩渐变。温暖而非冰冷
- **Grid**: 非对称布局。图文穿插。流动感——避免死板的矩形网格

**AG 兼容度**：★★☆☆☆ 低——AG 是冷灰色系，有机风格需要暖色调和有机形状
**TOKEN_ESCAPE 预估**：10-14 个（配色全部偏离、圆角加大、纹理装饰）

**参考标杆**：
- Notion 营销页——温暖色调 + 圆润形状 + 手绘插画
- Headspace.com——有机形状 + 柔和色彩

---

## 9. Retro / 复古怀旧

**When to use**：品牌故事、历史叙事、需要"温暖/怀旧/手工感"的场景
**When NOT to use**：需要现代技术感的场景、面向年轻 Z 世代的产品

**Visual DNA**：
- **Typography**: 衬线体（Playfair Display / Lora 等）做标题。正文仍用无衬线。大小写混排。可用 small-caps。字距略宽 0.02-0.05em
- **Color**: 低饱和暖色调——米白（#F5F0EB）、棕红（#8B4513）、深绿（#2D5016）、金色（#B8860B）。像老照片的色调
- **Space**: 对称留白。居中布局为主。印刷品式的 margin 比例
- **Shape**: 无圆角或装饰性圆角（如仅顶部圆角）。可用装饰性边框/线条
- **Texture**: 纸质纹理、轻微 grain、线条装饰（divider lines with ornaments）。有"印刷品"质感
- **Grid**: 居中单列，印刷品式比例（golden ratio margin）。图片可用胶片比例（3:2 / 4:3）

**AG 兼容度**：★★☆☆☆ 低——视觉语言与 AG 现代感大不同
**TOKEN_ESCAPE 预估**：10-14 个（字体、配色、纹理、装饰元素全部偏离）

**参考标杆**：
- Mailchimp 年度报告——复古插画 + 暖色调
- Dropbox Design——柔和怀旧感 + 手绘元素

---

## 10. Neon / 霓虹赛博

**When to use**：游戏相关、开发者活动、黑客松、需要"高能/前卫"感受的场景
**When NOT to use**：企业客户、需要安静专注的工具界面

**Visual DNA**：
- **Typography**: 粗体无衬线或等宽体。标题可到 72-120px。全大写 + 极宽字距（0.1-0.2em）。可用 text-shadow 模拟发光
- **Color**: 纯黑背景（#000000）+ 高饱和霓虹色（cyan #00FFFF / magenta #FF00FF / neon green #39FF14）。颜色发光效果（box-shadow 用色彩 blur）
- **Space**: 两极——标题区极大留白，功能区可紧凑。暗色背景让"空"本身有存在感
- **Shape**: 无圆角或极小圆角。硬边几何。可用发光边框（box-shadow: 0 0 20px [neon color]）
- **Texture**: 发光效果、扫描线（scanline overlay）、网格背景（grid pattern with low opacity）
- **Grid**: 自由布局，不受网格约束。元素可重叠。层次通过发光强度表达

**AG 兼容度**：★☆☆☆☆ 最低——与 AG 视觉语言完全对立，仅适合独立的活动页
**TOKEN_ESCAPE 预估**：14-15 个（几乎所有视觉值偏离）

**参考标杆**：
- GitHub Universe 活动页——暗底 + 紫色/蓝色光晕
- Tron Legacy 风格——发光线条 + 纯黑

---

## 11. Swiss / International / 瑞士国际主义

**When to use**：企业官网、正式的产品页、需要"专业/可靠/系统化"感受的场景
**When NOT to use**：需要温暖/个性化的场景、面向非专业受众的趣味营销

**Visual DNA**：
- **Typography**: Helvetica/Inter/sans-serif。严格的字号层级——每级严格遵循模块化字阶（如 Perfect Fourth 1.333）。左对齐为主。标题 32-56px weight 500-600
- **Color**: 白底 + 黑文字 + 1 个功能性强调色。极度克制——强调色面积 ≤5%。配色"消失"在内容后面
- **Space**: 数学化的间距——基于 8px 基准网格，所有值是 8 的倍数。规律感强
- **Shape**: 无圆角（0px）。纯几何。直线和直角
- **Texture**: 完全无纹理。纯粹的平面设计。颜色平涂。偶尔用粗线条做视觉锚点
- **Grid**: 严格的多列网格（6/8/12 列）。所有元素严格对齐网格线。网格甚至可以显性化（visible grid lines）

**AG 兼容度**：★★★★★ 最高——这就是 AG 设计哲学的起源
**TOKEN_ESCAPE 预估**：2-4 个（可能在 Hero 标题或网格装饰上）

**参考标杆**：
- Braun/Dieter Rams 数字化表达——功能决定形式
- ETH Zurich 官网——学术严谨 + 瑞士排版

---

## 风格选择速查

| 情绪关键词 | 推荐风格 | 次选 |
|-----------|---------|------|
| 专业/可信/精确 | Swiss / Scientific Precision | Editorial Minimalism |
| 创新/未来/科技 | Gradient Flow / Glassmorphism | Dark Cinematic |
| 大胆/个性/叛逆 | Neo-Brutalism / Neon | — |
| 温暖/自然/人性化 | Organic | Retro |
| 高端/沉稳/戏剧 | Dark Cinematic / Editorial Minimalism | — |
| 清晰/系统/功能概览 | Bento Grid / Swiss | Scientific Precision |
| 年轻/活力/前卫 | Neo-Brutalism / Neon | Gradient Flow |
| 科学/数据/严谨 | Scientific Precision | Swiss |
| 品牌故事/叙事 | Editorial Minimalism / Retro | Organic |
| 轻盈/透明/现代 | Glassmorphism | Gradient Flow |

---

## 12. 自定义风格 / Custom Style

当 AI 搜索到的参考作品不属于上述任何原型时，使用以下 Visual DNA 参数模板描述自定义风格：

```markdown
## Custom Style: [自定义风格名]

**灵感来源**: [参考作品名/设计师/URL]
**When to use**: [适用场景]
**When NOT to use**: [不适用场景]

**Visual DNA**:
- **Typography**: [字体族 + 字号范围 + 字重 + 行高 + 特殊处理]
- **Color**: [色温 + 饱和度 + 明度策略 + 主色/辅色/强调色 + 60-30-10]
- **Space**: [留白策略 + section 间距 + 内容最大宽度]
- **Shape**: [圆角值 + 几何/有机 + 边框策略]
- **Texture**: [渐变/纹理/噪点/模糊 + 装饰元素]
- **Grid**: [列数 + 对称/不对称 + 全出血/收敛]

**AG 兼容度**: [高/中/低 + 简要说明]
**TOKEN_ESCAPE 预估**: [数量 + 主要偏离项]
```

**关键规则**：自定义风格必须填满所有 6 个 Visual DNA 维度，不许留空。参数必须是具体值（如 "16-24px"），不许是模糊描述（如 "适中"）。

---

## 13. 混合风格 / Hybrid Style

当需要组合两个原型的 DNA 时：

### 混合规则

1. **选主原型（60%）**：决定整体骨架——布局网格、间距体系、圆角策略
2. **选辅原型（40%）**：补充特色——配色策略、纹理质感、动效语言
3. **冲突解决**：两个原型在同一维度参数冲突时，主原型优先

### 常见有效混合

| 主原型 | 辅原型 | 效果 | 适合 |
|--------|--------|------|------|
| Editorial Minimalism | Dark Cinematic | 极简排版 + 暗色戏剧背景 | 高端技术展示 |
| Swiss | Glassmorphism | 严格网格 + 玻璃态卡片 | 现代企业产品页 |
| Bento Grid | Gradient Flow | 便当布局 + 渐变装饰 | AI/科技功能展示 |
| Scientific Precision | Editorial Minimalism | 数据严谨 + 阅读沉浸 | 科研报告展示 |
| Organic | Retro | 自然色调 + 复古质感 | 生命科学品牌故事 |

### 无效混合（避免）

| 组合 | 为什么不行 |
|------|-----------|
| Neo-Brutalism + Premium | 粗犷 vs 精致，视觉信号矛盾 |
| Neon + Organic | 冰冷赛博 vs 温暖自然，情绪冲突 |
| Retro + Glassmorphism | 复古纸质 vs 现代玻璃，质感不兼容 |
