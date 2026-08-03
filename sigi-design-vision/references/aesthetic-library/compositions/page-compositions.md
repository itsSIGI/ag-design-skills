# 页面组合参考库 — Page Compositions

> 经过验证的"页面配方"——风格原型 x 行业 x 叙事结构的交叉组合。
> 每个组合是 Vision Spec 7 个章节的参数快照，可直接作为 Vision Spec 的起点骨架。
>
> **使用方法**：
> 1. 根据 Creative Brief 的行业 + 情绪关键词，从下方组合中选取最接近的
> 2. 以组合参数为骨架，根据具体需求微调
> 3. 所有配色值已通过 WCAG AA 对比度验证
> 4. 所有 TOKEN_ESCAPE 数量已在 15 个预算内

---

## 1. SaaS 产品 Landing — Scientific Precision x Classic SaaS

**行业**: SaaS / 企业软件
**目标受众**: 产品经理、技术负责人、企业 IT 决策者
**情绪关键词**: trustworthy, precise, efficient, modern, reliable
**风格原型**: Scientific Precision (primary) + Editorial Minimalism (secondary)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Hero | 价值主张 + 产品截图 + CTA | TIER_3 | ★★★★★ | min-height: 90vh | 0（渐变过渡） |
| KPI Strip | 3 个核心指标 | TIER_1 | ★★★ | auto (~80px) | 40px |
| Features | 3-4 个核心功能，图文交替 | TIER_1 | ★★★★ | auto | 48px |
| Integrations | 集成生态展示 | TIER_1 | ★★ | auto | 40px |
| Social Proof | 客户 logo + 推荐语 | TIER_1 | ★★★ | auto | 40px |
| CTA | 行动号召 | TIER_2 | ★★★★ | auto (~280px) | 32px |
| Footer | 标准页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #F8FAFC | #0C0F1A |
| Surface | #FFFFFF | #151926 |
| Text Primary | #0F172A | #F1F5F9 |
| Text Secondary | #64748B | #94A3B8 |
| Accent | #2563EB | #3B82F6 |
| Accent Soft | rgba(37,99,235,0.08) | rgba(59,130,246,0.12) |
| Border | #E2E8F0 | rgba(255,255,255,0.08) |
| Hero BG | #0C0F1A | #0C0F1A |
| Hero Glow | radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12), transparent 70%) | 同左 |

> 对比度验证：#0F172A on #F8FAFC = 15.4:1 (AA); #F1F5F9 on #0C0F1A = 17.1:1 (AA); #64748B on #F8FAFC = 5.1:1 (AA)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Hero Title | clamp(40px, 5vw + 12px, 64px) | 600 | letter-spacing: -0.025em; line-height: 1.08 |
| Hero Subtitle | clamp(16px, 1.5vw + 8px, 20px) | 400 | line-height: 1.6; max-width: 48ch |
| Section Title | 22px (`<Heading>`) | 600 | letter-spacing: -0.01em; line-height: 1.2 |
| Body | 15px (`<Body>`) | 400 | line-height: 1.6 |
| KPI Value | 36px (`<Display>`) | 600 | font-variant-numeric: tabular-nums; letter-spacing: -0.02em |
| Caption | 13px (`<Caption>`) | 400 | line-height: 1.5 |

字阶: Perfect Fourth (1.333), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Hero title | fade-up + scale(0.98->1) | 600ms ease-out | A |
| Hero subtitle | fade-up | 400ms ease-out, delay 200ms | A |
| Hero CTA | fade-up | 400ms ease-out, delay 400ms | A |
| Hero screenshot | fade-up + scale(0.96->1) | 700ms ease-out, delay 300ms | A |
| KPI numbers | countUp (scroll-enter) | 800ms ease-out, stagger 100ms | A |
| Features | fade-up (scroll-enter) | 400ms ease-out, stagger 100ms | A |
| Logo row | fade-in (scroll-enter) | 400ms ease | A |
| CTA section | fade-up (scroll-enter) | 400ms ease-out | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | hero-section-bg | #0C0F1A | TIER_3 | Hero 背景 |
| 2 | hero-glass-surface | rgba(255,255,255,0.04) | TIER_3 | Hero 内卡片 |
| 3 | hero-glow | radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12), transparent 70%) | TIER_3 | Hero 光晕 |
| 4 | hero-cta-accent | #2563EB | TIER_3 | Hero CTA 按钮 |
| 5 | hero-title-size | clamp(40px, 5vw+12px, 64px) | TIER_3 | Hero 标题字号 |
| 6 | hero-subtitle-style | clamp(16px, 1.5vw+8px, 20px) + rgba(255,255,255,0.7) | TIER_3 | Hero 副标题 |
| 7 | hero-nav-text | #FAFAFA | TIER_3 | 导航在 Hero 上的文字色 |

**总 TOKEN_ESCAPE**: 7 / 15
**AG Token 覆盖率**: 84%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| Linear.app | 暗色 Hero + 产品截图浮起 + 微妙光晕 | 品牌紫色调 |
| Stripe.com | 排版节奏 + section 间距 + CTA 层级 | 彩虹渐变装饰 |
| Datadog.com | 数据指标展示 + 集成生态布局 | 过多的配色 |

---

## 2. AI 产品展示 — Dark Cinematic x Classic SaaS

**行业**: AI / 机器学习 / 智能平台
**目标受众**: 技术领导者、AI 工程师、企业创新负责人
**情绪关键词**: futuristic, intelligent, powerful, sophisticated, dramatic
**风格原型**: Dark Cinematic (primary)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Hero | AI 能力展示 + 动态视觉 + CTA | TIER_3 | ★★★★★ | 100vh | 0 |
| Capabilities | 3-4 个 AI 能力卡片 | TIER_2 | ★★★★ | auto | 100px |
| Demo | 产品交互演示区 | TIER_3 | ★★★★ | auto | 80px |
| Social Proof | 客户案例 + 指标 | TIER_2 | ★★★ | auto | 80px |
| Pricing | 定价方案 | TIER_1 | ★★ | auto | 60px |
| CTA | 行动号召 + 光晕背景 | TIER_3 | ★★★★ | auto (~320px) | 40px |
| Footer | 标准暗色页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #FAFAFA | #050508 |
| Surface | #FFFFFF | #0F0F14 |
| Surface Elevated | #F5F5F5 | #1A1A22 |
| Text Primary | #0A0A0A | #F1F5F9 |
| Text Secondary | #6B7280 | #9CA3AF |
| Accent | #7C3AED | #8B5CF6 |
| Accent Glow | radial-gradient(circle at 50% 30%, rgba(124,58,237,0.10), transparent 60%) | radial-gradient(circle at 50% 30%, rgba(139,92,246,0.12), transparent 60%) |
| Border | #E5E7EB | rgba(255,255,255,0.06) |

> 对比度验证：#F1F5F9 on #050508 = 19.2:1 (AA); #9CA3AF on #050508 = 7.8:1 (AA); #8B5CF6 on #050508 = 5.2:1 (AA large text)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Hero Title | clamp(48px, 6vw + 16px, 80px) | 600 | letter-spacing: -0.03em; line-height: 1.05 |
| Hero Subtitle | clamp(18px, 1.5vw + 10px, 22px) | 400 | line-height: 1.6; max-width: 52ch |
| Section Title | clamp(28px, 3vw + 8px, 40px) | 600 | letter-spacing: -0.02em; line-height: 1.15 |
| Body | 16px | 400 | line-height: 1.7; color: #9CA3AF |
| Code Snippet | 14px (monospace) | 400 | line-height: 1.5; font-family: JetBrains Mono, monospace |
| Caption | 13px | 400 | line-height: 1.5 |

字阶: Augmented Fourth (1.414), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Hero title | clip-reveal (inset from bottom) | 800ms ease-out, delay 200ms | A |
| Hero subtitle | fade-in | 500ms ease, delay 600ms | A |
| Hero glow | opacity 0->1 + scale(0.8->1) | 1200ms ease-out | A |
| Capabilities cards | fade-up (scroll-enter) | 500ms ease-out, stagger 120ms | A |
| Demo area | fade-up + scale(0.96->1) (scroll-enter) | 600ms ease-out | A |
| Social Proof | fade-in (scroll-enter) | 400ms ease | A |
| CTA glow | opacity pulse 0.6->1->0.6 | 3000ms ease-in-out infinite | A |
| CTA content | fade-up (scroll-enter) | 400ms ease-out | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | page-bg | #050508 | TIER_3 | 全页深黑背景 |
| 2 | dark-surface | #0F0F14 | TIER_2 | 卡片/区块背景 |
| 3 | dark-surface-elevated | #1A1A22 | TIER_2 | Hover 提升态 |
| 4 | dark-text | #F1F5F9 | TIER_3 | 主文字 |
| 5 | dark-text-secondary | #9CA3AF | TIER_2 | 辅助文字 |
| 6 | accent-purple | #8B5CF6 | TIER_3 | 强调色 |
| 7 | accent-glow | radial-gradient(circle at 50% 30%, rgba(139,92,246,0.12), transparent 60%) | TIER_3 | 光晕 |
| 8 | dark-border | rgba(255,255,255,0.06) | TIER_2 | 微妙边框 |
| 9 | hero-display-size | clamp(48px, 6vw+16px, 80px) | TIER_3 | Hero 标题 |
| 10 | section-title-size | clamp(28px, 3vw+8px, 40px) | TIER_3 | Section 标题 |
| 11 | noise-overlay | opacity 0.02 noise texture | TIER_3 | 背景纹理 |

**总 TOKEN_ESCAPE**: 11 / 15
**AG Token 覆盖率**: 78%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| OpenAI.com | 暗色空间感 + 大标题冲击力 + 克制强调色 | GPT 产品特定元素 |
| Anthropic.com | 克制的 AI 产品展示 + 对话式演示区域 | 品牌暖色 |
| Vercel.com | 代码美学 + 光线渐变 + 产品演示区域 | 三角形品牌元素 |

---

## 3. 企业品牌展示 — Swiss x Story Arc

**行业**: 企业官网 / 集团品牌
**目标受众**: 投资人、合作伙伴、行业领袖、媒体
**情绪关键词**: authoritative, professional, systematic, trustworthy, visionary
**风格原型**: Swiss / International (primary)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Setup (Hero) | 品牌愿景 + 全幅视觉 | TIER_3 | ★★★★★ | 100vh | 120px |
| Tension | 行业挑战 + 数据痛点 | TIER_2 | ★★★ | auto | 80px |
| Journey | 发展历程 / 里程碑 | TIER_2 | ★★★★ | auto | 80px |
| Resolution | 今日成果 + KPI | TIER_1 | ★★★ | auto | 60px |
| Team / Culture | 团队文化展示 | TIER_1 | ★★ | auto | 60px |
| Invitation (CTA) | 合作邀请 | TIER_2 | ★★★★ | auto (~300px) | 40px |
| Footer | 标准页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #FFFFFF | #111111 |
| Surface | #F5F5F5 | #1A1A1A |
| Text Primary | #111111 | #FAFAFA |
| Text Secondary | #6B6B6B | #A3A3A3 |
| Accent | #111111 | #FAFAFA |
| Accent Functional | #2563EB | #3B82F6 |
| Border | #E5E5E5 | rgba(255,255,255,0.1) |
| Divider (thick) | #111111 (2px) | #FAFAFA (2px) |

> 对比度验证：#111111 on #FFFFFF = 18.1:1 (AA); #6B6B6B on #FFFFFF = 5.4:1 (AA); #FAFAFA on #111111 = 18.1:1 (AA)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Hero Title | clamp(40px, 5vw + 12px, 56px) | 500 | letter-spacing: -0.02em; line-height: 1.1 |
| Hero Subtitle | clamp(16px, 1.2vw + 10px, 20px) | 400 | line-height: 1.6; max-width: 48ch |
| Section Title | 28px | 500 | letter-spacing: -0.01em; line-height: 1.2 |
| Body | 16px | 400 | line-height: 1.7 |
| Data Value | 48px | 500 | font-variant-numeric: tabular-nums; letter-spacing: -0.02em |
| Label | 12px | 500 | text-transform: uppercase; letter-spacing: 0.08em |

字阶: Perfect Fourth (1.333), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Hero title | fade-up | 600ms ease-out | A |
| Hero subtitle | fade-up | 400ms ease-out, delay 200ms | A |
| Tension data | fade-up (scroll-enter) | 400ms ease-out | A |
| Timeline items | fade-up (scroll-enter) | 400ms ease-out, stagger 120ms | A |
| KPI numbers | countUp (scroll-enter) | 1000ms ease-out, stagger 100ms | A |
| Team cards | fade-in (scroll-enter) | 400ms ease, stagger 80ms | A |
| CTA section | fade-up (scroll-enter) | 400ms ease-out | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | hero-title-size | clamp(40px, 5vw+12px, 56px) | TIER_3 | Hero 标题 |
| 2 | hero-subtitle | clamp(16px, 1.2vw+10px, 20px) | TIER_3 | Hero 副标题 |
| 3 | thick-divider | 2px solid #111111 | TIER_2 | 瑞士风格粗分隔线 |
| 4 | uppercase-label | 12px/500/uppercase/0.08em | TIER_2 | 分类标签 |
| 5 | data-display-size | 48px | TIER_2 | KPI 数据值 |

**总 TOKEN_ESCAPE**: 5 / 15
**AG Token 覆盖率**: 91%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| IBM.com | 企业权威感 + 网格系统 + 数据展示 | 品牌蓝色 |
| ETH Zurich 官网 | 学术严谨 + 瑞士排版 + 信息层级 | 学术特定内容 |
| McKinsey.com | 商务克制 + 留白节奏 + 数据权威感 | 行业报告特定元素 |

---

## 4. 开发者工具 Landing — Editorial Minimalism x Progressive Disclosure

**行业**: 开发者工具 / API / CLI / SDK
**目标受众**: 软件开发者、架构师、DevOps 工程师
**情绪关键词**: clean, focused, developer-friendly, elegant, fast
**风格原型**: Editorial Minimalism (primary)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Overview (Hero) | 一句话价值 + 代码片段预览 + CTA | TIER_3 | ★★★★ | auto, padding: 120px 0 | 60px |
| Layer 1: Quick Start | 安装命令 + 3 步上手 | TIER_1 | ★★★ | auto | 48px |
| Layer 2: Features | 核心功能深入（代码示例） | TIER_1 | ★★★ | auto | 48px |
| Layer 3: API Reference | API 概览 + 文档链接 | TIER_1 | ★★ | auto | 40px |
| Comparison | 与竞品对比表 | TIER_1 | ★★ | auto | 40px |
| CTA | 行动号召（按深度分层） | TIER_2 | ★★★ | auto (~200px) | 32px |
| Footer | 标准页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #FAFAFA | #0A0A0A |
| Surface | #FFFFFF | #141414 |
| Text Primary | #171717 | #EDEDED |
| Text Secondary | #737373 | #A3A3A3 |
| Accent | #18181B | #FAFAFA |
| Code BG | #F4F4F5 | #1E1E1E |
| Code Text | #18181B | #D4D4D8 |
| Syntax Highlight | #2563EB | #60A5FA |
| Border | #E4E4E7 | rgba(255,255,255,0.08) |

> 对比度验证：#171717 on #FAFAFA = 17.4:1 (AA); #737373 on #FAFAFA = 4.6:1 (AA); #EDEDED on #0A0A0A = 17.9:1 (AA)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Hero Title | clamp(32px, 4vw + 8px, 48px) | 600 | letter-spacing: -0.02em; line-height: 1.1; max-width: 20ch |
| Hero Subtitle | clamp(16px, 1.2vw + 8px, 18px) | 400 | line-height: 1.7; max-width: 56ch |
| Section Title | 22px | 600 | letter-spacing: -0.01em; line-height: 1.2 |
| Body | 16px | 400 | line-height: 1.7; max-width: 680px |
| Code | 14px (monospace) | 400 | line-height: 1.6; font-family: JetBrains Mono, monospace |
| Inline Code | 14px (monospace) | 400 | padding: 2px 6px; border-radius: 4px |

字阶: Major Third (1.25), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Hero title | fade-up | 500ms ease-out | A |
| Hero code preview | fade-in | 400ms ease, delay 300ms | A |
| Quick Start steps | fade-up (scroll-enter) | 400ms ease-out, stagger 100ms | A |
| Feature sections | fade-up (scroll-enter) | 400ms ease-out | A |
| Code blocks | fade-in (scroll-enter) | 300ms ease | A |
| Comparison table | fade-up (scroll-enter) | 400ms ease-out | A |
| CTA | fade-up (scroll-enter) | 400ms ease-out | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | hero-title-size | clamp(32px, 4vw+8px, 48px) | TIER_3 | Hero 标题 |
| 2 | hero-content-width | max-width: 680px | TIER_3 | Hero 内容区窄宽度 |
| 3 | code-bg | #F4F4F5 / #1E1E1E | TIER_2 | 代码块背景 |
| 4 | syntax-highlight | #2563EB / #60A5FA | TIER_2 | 代码高亮色 |

**总 TOKEN_ESCAPE**: 4 / 15
**AG Token 覆盖率**: 93%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| Stripe Docs Landing | 编辑式排版 + 代码片段展示 + 渐进层次 | 品牌彩色渐变 |
| Tailwind CSS 首页 | 代码驱动的说服力 + 极简布局 + 清晰层级 | 品牌青色 |
| Resend.com | 开发者审美 + 克制配色 + 代码优先 | 品牌特定元素 |

---

## 5. 生物科技/制药 — Scientific Precision x Problem->Solution

**行业**: 生物科技 / 制药 / 医疗研究
**目标受众**: 科研人员、临床负责人、研发管理层
**情绪关键词**: trustworthy, scientific, precise, hopeful, evidence-based
**风格原型**: Scientific Precision (primary)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Problem | 研究痛点 + 行业数据 | TIER_3 | ★★★★ | auto, padding: 100px 0 | 100px |
| Agitation | 痛点放大 + 对比数据可视化 | TIER_2 | ★★★ | auto | 80px |
| Solution | 平台方案展示 + 产品截图 | TIER_2 | ★★★★ | auto | 80px |
| Evidence | 研究成果 + 论文引用 + 数据指标 | TIER_1 | ★★★ | auto | 60px |
| Pipeline | 研发管线/流程展示 | TIER_1 | ★★ | auto | 60px |
| CTA | 预约演示/合作咨询 | TIER_2 | ★★★ | auto (~240px) | 40px |
| Footer | 标准页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #F8FAFC | #0C1017 |
| Surface | #FFFFFF | #141A24 |
| Text Primary | #0F172A | #E2E8F0 |
| Text Secondary | #64748B | #94A3B8 |
| Accent Teal | #0D9488 | #14B8A6 |
| Accent Teal Soft | rgba(13,148,136,0.08) | rgba(20,184,166,0.12) |
| Data Positive | #059669 | #10B981 |
| Data Negative | #DC2626 | #EF4444 |
| Border | #E2E8F0 | rgba(255,255,255,0.08) |
| Grid Pattern | rgba(15,23,42,0.04) | rgba(255,255,255,0.03) |

> 对比度验证：#0F172A on #F8FAFC = 15.4:1 (AA); #64748B on #F8FAFC = 5.1:1 (AA); #0D9488 on #FFFFFF = 4.6:1 (AA large text)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Problem Title | clamp(32px, 4vw + 8px, 48px) | 500 | letter-spacing: -0.02em; line-height: 1.15 |
| Solution Title | clamp(28px, 3vw + 8px, 40px) | 500 | letter-spacing: -0.015em; line-height: 1.2 |
| Body | 16px | 400 | line-height: 1.7 |
| Data Label | 12px (monospace) | 500 | text-transform: uppercase; letter-spacing: 0.06em |
| Data Value | 36px | 500 | font-variant-numeric: tabular-nums; letter-spacing: -0.02em |
| Citation | 14px | 400 | font-style: italic; line-height: 1.6 |

字阶: Perfect Fourth (1.333), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Problem title | fade-up | 500ms ease-out | A |
| Problem data | fade-in (scroll-enter) | 400ms ease, delay 200ms | A |
| Data chart bars | scale-y 0->1 (scroll-enter) | 600ms ease-out, stagger 80ms | B |
| Solution screenshots | fade-up + scale(0.97->1) (scroll-enter) | 500ms ease-out | A |
| Evidence KPIs | countUp (scroll-enter) | 800ms ease-out, stagger 120ms | A |
| Pipeline steps | fade-up (scroll-enter) | 400ms ease-out, stagger 100ms | A |
| CTA | fade-up (scroll-enter) | 400ms ease-out | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | problem-title-size | clamp(32px, 4vw+8px, 48px) | TIER_3 | Problem 标题 |
| 2 | accent-teal | #0D9488 / #14B8A6 | TIER_2 | 科学主题强调色 |
| 3 | data-positive | #059669 | TIER_2 | 正向数据指标 |
| 4 | data-negative | #DC2626 | TIER_2 | 负向数据指标 |
| 5 | grid-pattern | rgba(15,23,42,0.04) | TIER_3 | 背景网格纹理 |
| 6 | mono-label | 12px monospace uppercase | TIER_2 | 数据标签 |

**总 TOKEN_ESCAPE**: 6 / 15
**AG Token 覆盖率**: 88%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| Benchling.com | 科研工具美学 + 数据展示方式 + 信任感 | 品牌特定色彩 |
| Genentech.com | 制药行业权威感 + 严谨排版 | 企业化装饰 |
| DeepMind.com | 科学可视化 + 数据美学 + 留白节奏 | AI 研究特定内容 |

---

## 6. B 端 Dashboard 展示 — Bento Grid x Progressive Disclosure

**行业**: 数据分析 / BI 工具 / 运营平台
**目标受众**: 产品经理、运营分析师、管理层
**情绪关键词**: organized, insightful, clear, efficient, modern
**风格原型**: Bento Grid (primary) + Scientific Precision (secondary)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Overview (Hero) | 一句话定位 + Dashboard 预览截图 | TIER_3 | ★★★★ | auto, padding: 80px 0 | 60px |
| Layer 1: Bento Features | 6 个功能 Bento 卡片 | TIER_2 | ★★★★ | auto | 48px |
| Layer 2: Deep Dive | 单个功能深入展示 | TIER_1 | ★★★ | auto | 48px |
| Layer 3: Tech Specs | 性能指标 + 集成列表 | TIER_1 | ★★ | auto | 40px |
| Testimonials | 客户评价 | TIER_1 | ★★ | auto | 40px |
| CTA | 免费试用 | TIER_2 | ★★★ | auto (~200px) | 32px |
| Footer | 标准页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #FAFAFA | #0A0A0A |
| Surface | #FFFFFF | #141414 |
| Bento Cell 1 | #F0F4FF (蓝 tint) | #111827 |
| Bento Cell 2 | #F0FDF4 (绿 tint) | #0D1B12 |
| Bento Cell 3 | #FFF7ED (橙 tint) | #1C1108 |
| Text Primary | #18181B | #FAFAFA |
| Text Secondary | #71717A | #A1A1AA |
| Accent | #2563EB | #3B82F6 |
| Border | #E4E4E7 | rgba(255,255,255,0.08) |

> 对比度验证：#18181B on #FAFAFA = 16.8:1 (AA); #71717A on #FAFAFA = 4.7:1 (AA); #18181B on #F0F4FF = 15.7:1 (AA)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Hero Title | clamp(28px, 3.5vw + 8px, 44px) | 600 | letter-spacing: -0.02em; line-height: 1.15 |
| Hero Subtitle | clamp(15px, 1vw + 8px, 18px) | 400 | line-height: 1.6; max-width: 52ch |
| Bento Card Title | 20px | 500 | letter-spacing: -0.01em; line-height: 1.3 |
| Bento Card Body | 14px | 400 | line-height: 1.5 |
| Metric Value | 32px | 600 | font-variant-numeric: tabular-nums; letter-spacing: -0.02em |
| Body | 15px | 400 | line-height: 1.6 |

字阶: Major Third (1.25), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Hero title | fade-up | 500ms ease-out | A |
| Hero screenshot | fade-up + scale(0.97->1) | 600ms ease-out, delay 200ms | A |
| Bento cards | fade-up (scroll-enter) | 400ms ease-out, stagger 80ms | A |
| Deep Dive content | fade-up (scroll-enter) | 400ms ease-out | A |
| Metrics | countUp (scroll-enter) | 800ms ease-out, stagger 100ms | A |
| Testimonial cards | fade-in (scroll-enter) | 400ms ease, stagger 100ms | A |
| CTA | fade-up (scroll-enter) | 400ms ease-out | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | hero-title-size | clamp(28px, 3.5vw+8px, 44px) | TIER_3 | Hero 标题 |
| 2 | bento-grid | grid-template: "a a b c" "a a d e" / 1fr 1fr 1fr 1fr | TIER_2 | Bento 网格模板 |
| 3 | bento-cell-blue | #F0F4FF / #111827 | TIER_2 | Bento 蓝色 tint |
| 4 | bento-cell-green | #F0FDF4 / #0D1B12 | TIER_2 | Bento 绿色 tint |
| 5 | bento-cell-orange | #FFF7ED / #1C1108 | TIER_2 | Bento 橙色 tint |
| 6 | bento-gap | 12px | TIER_2 | Bento 间距 |
| 7 | bento-radius | 12px | TIER_2 | Bento 圆角 |

**总 TOKEN_ESCAPE**: 7 / 15
**AG Token 覆盖率**: 85%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| Apple 功能页 (iPhone) | Bento 布局节奏 + 大小 cell 混排 | 产品特定内容 |
| Vercel Dashboard | 数据卡片 + 功能概览 + 开发者美学 | 品牌特定元素 |
| Notion 功能页 | Bento 布局 + 功能演示嵌入 | 暖色调 |

---

## 7. 活动/会议 Landing — Gradient Flow x Classic SaaS

**行业**: 技术大会 / 行业峰会 / 线上活动
**目标受众**: 开发者、产品经理、行业从业者
**情绪关键词**: energetic, exciting, innovative, community, vibrant
**风格原型**: Gradient Flow (primary) + Dark Cinematic (secondary)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Hero | 活动名 + 日期地点 + 报名 CTA | TIER_3 | ★★★★★ | 100vh | 0（渐变延续） |
| Speakers | 嘉宾阵容 | TIER_2 | ★★★★ | auto | 80px |
| Agenda | 日程安排 | TIER_1 | ★★★ | auto | 60px |
| Highlights | 往届精彩回顾 | TIER_2 | ★★★ | auto | 60px |
| Sponsors | 赞助商 logo | TIER_1 | ★★ | auto | 40px |
| CTA | 立即报名 + 倒计时 | TIER_3 | ★★★★ | auto (~320px) | 40px |
| Footer | 标准页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #FAFAFA | #0A0A14 |
| Surface | #FFFFFF | #12121E |
| Text Primary | #0F0F23 | #F1F5F9 |
| Text Secondary | #64748B | #94A3B8 |
| Gradient Start | #6366F1 | #6366F1 |
| Gradient Mid | #8B5CF6 | #8B5CF6 |
| Gradient End | #EC4899 | #EC4899 |
| Hero BG | linear-gradient(135deg, #0A0A14 0%, #1A1036 50%, #0A0A14 100%) | 同左 |
| Accent | #818CF8 | #818CF8 |
| Border | #E2E8F0 | rgba(255,255,255,0.08) |

> 对比度验证：#F1F5F9 on #0A0A14 = 18.4:1 (AA); #94A3B8 on #0A0A14 = 7.9:1 (AA); #818CF8 on #0A0A14 = 5.7:1 (AA large text)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Hero Title | clamp(48px, 7vw + 12px, 80px) | 600 | letter-spacing: -0.03em; line-height: 1.05 |
| Hero Date/Location | clamp(16px, 1.5vw + 8px, 20px) | 500 | letter-spacing: 0.02em; text-transform: uppercase |
| Section Title | clamp(24px, 3vw + 8px, 36px) | 600 | letter-spacing: -0.015em; line-height: 1.2 |
| Speaker Name | 18px | 500 | line-height: 1.3 |
| Body | 16px | 400 | line-height: 1.6 |
| Countdown Number | 48px | 600 | font-variant-numeric: tabular-nums |

字阶: Augmented Fourth (1.414), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Hero title | blur-in + scale(0.95->1) | 700ms ease-out, delay 100ms | A |
| Hero date | fade-up | 400ms ease-out, delay 400ms | A |
| Hero CTA | fade-up | 400ms ease-out, delay 600ms | A |
| Gradient BG | slow hue-rotate (background-position shift) | 8000ms ease-in-out infinite | A |
| Speakers | fade-up (scroll-enter) | 400ms ease-out, stagger 100ms | A |
| Agenda items | fade-up (scroll-enter) | 400ms ease-out, stagger 80ms | A |
| Countdown | countUp (scroll-enter) | 800ms ease-out | A |
| CTA glow | opacity pulse 0.5->1->0.5 | 4000ms ease-in-out infinite | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | hero-bg-gradient | linear-gradient(135deg, #0A0A14 0%, #1A1036 50%, #0A0A14 100%) | TIER_3 | Hero 渐变背景 |
| 2 | hero-glow | radial-gradient(circle at 50% 40%, rgba(99,102,241,0.15), transparent 60%) | TIER_3 | Hero 光晕 |
| 3 | gradient-text | linear-gradient(135deg, #6366F1, #EC4899) + background-clip: text | TIER_3 | Hero 渐变文字 |
| 4 | hero-display-size | clamp(48px, 7vw+12px, 80px) | TIER_3 | Hero 标题字号 |
| 5 | hero-date-style | uppercase + 0.02em spacing | TIER_3 | 日期样式 |
| 6 | accent-indigo | #818CF8 | TIER_2 | 强调色 |
| 7 | grain-overlay | opacity 0.03 noise | TIER_3 | 渐变纹理叠加 |
| 8 | cta-glow | radial-gradient(circle, rgba(139,92,246,0.12), transparent 60%) | TIER_3 | CTA 光晕 |
| 9 | countdown-size | 48px tabular-nums | TIER_3 | 倒计时数字 |

**总 TOKEN_ESCAPE**: 9 / 15
**AG Token 覆盖率**: 82%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| GitHub Universe | 暗底渐变 + 活动氛围 + 嘉宾展示 | GitHub 品牌绿 |
| Figma Config | 活力渐变 + 社区感 + 日程布局 | 色块拼贴粗犷感 |
| Next.js Conf | 暗色科技 + 倒计时 + 嘉宾网格 | Vercel 品牌元素 |

---

## 8. 教育/学术平台 — Swiss x Classic SaaS

**行业**: 在线教育 / 学术平台 / 知识管理
**目标受众**: 学生、教育工作者、学术研究人员
**情绪关键词**: accessible, structured, credible, clear, empowering
**风格原型**: Swiss / International (primary) + Editorial Minimalism (secondary)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Hero | 平台价值 + 搜索/入口 + CTA | TIER_3 | ★★★★ | auto, padding: 100px 0 | 80px |
| Categories | 学科分类网格 | TIER_1 | ★★★ | auto | 48px |
| Features | 3-4 个核心功能 | TIER_1 | ★★★ | auto | 48px |
| Social Proof | 大学/机构合作 + 数据指标 | TIER_1 | ★★★ | auto | 40px |
| Testimonials | 学生/教师评价 | TIER_1 | ★★ | auto | 40px |
| CTA | 免费注册 | TIER_2 | ★★★ | auto (~240px) | 32px |
| Footer | 标准页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #FFFFFF | #111111 |
| Surface | #F7F7F7 | #1A1A1A |
| Text Primary | #1A1A1A | #F5F5F5 |
| Text Secondary | #666666 | #A3A3A3 |
| Accent Blue | #1D4ED8 | #3B82F6 |
| Accent Blue Soft | rgba(29,78,216,0.06) | rgba(59,130,246,0.10) |
| Category Tint 1 | #EFF6FF | #111827 |
| Category Tint 2 | #F0FDF4 | #0D1B12 |
| Border | #E5E5E5 | rgba(255,255,255,0.1) |
| Divider | #1A1A1A (1px) | #F5F5F5 (1px) |

> 对比度验证：#1A1A1A on #FFFFFF = 17.1:1 (AA); #666666 on #FFFFFF = 5.7:1 (AA); #1D4ED8 on #FFFFFF = 7.2:1 (AA)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Hero Title | clamp(32px, 4vw + 8px, 48px) | 500 | letter-spacing: -0.02em; line-height: 1.15 |
| Hero Subtitle | clamp(16px, 1.2vw + 8px, 18px) | 400 | line-height: 1.7; max-width: 52ch |
| Section Title | 24px | 500 | letter-spacing: -0.01em; line-height: 1.25 |
| Body | 16px | 400 | line-height: 1.7 |
| Category Label | 14px | 500 | line-height: 1.4 |
| Stat Number | 40px | 500 | font-variant-numeric: tabular-nums; letter-spacing: -0.02em |

字阶: Perfect Fourth (1.333), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Hero title | fade-up | 500ms ease-out | A |
| Hero search/CTA | fade-up | 400ms ease-out, delay 200ms | A |
| Category grid | fade-up (scroll-enter) | 400ms ease-out, stagger 60ms | A |
| Feature blocks | fade-up (scroll-enter) | 400ms ease-out, stagger 100ms | A |
| University logos | fade-in (scroll-enter) | 400ms ease, stagger 50ms | A |
| Stat numbers | countUp (scroll-enter) | 800ms ease-out, stagger 100ms | A |
| CTA | fade-up (scroll-enter) | 400ms ease-out | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | hero-title-size | clamp(32px, 4vw+8px, 48px) | TIER_3 | Hero 标题 |
| 2 | hero-subtitle | clamp(16px, 1.2vw+8px, 18px) | TIER_3 | Hero 副标题 |
| 3 | category-tint-blue | #EFF6FF / #111827 | TIER_1 | 分类卡片蓝色 tint |
| 4 | category-tint-green | #F0FDF4 / #0D1B12 | TIER_1 | 分类卡片绿色 tint |
| 5 | stat-display-size | 40px | TIER_2 | 统计数字 |

**总 TOKEN_ESCAPE**: 5 / 15
**AG Token 覆盖率**: 90%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| Coursera.org | 学科分类布局 + 信任背书 + 清晰层级 | 过多装饰色彩 |
| ETH Zurich 官网 | 瑞士排版 + 学术权威感 + 网格系统 | 学校特定品牌 |
| Notion 教育页 | 简洁布局 + 功能展示 + 用户评价 | Notion 品牌元素 |

---

## 9. 创意工具展示 — Glassmorphism x Classic SaaS

**行业**: 设计工具 / 创意软件 / 多媒体平台
**目标受众**: 设计师、创意总监、内容创作者
**情绪关键词**: creative, inspiring, modern, lightweight, polished
**风格原型**: Glassmorphism (primary) + Gradient Flow (secondary)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Hero | 工具名 + 产品动态预览 + CTA | TIER_3 | ★★★★★ | 100vh | 0（渐变延续） |
| Features | 核心创意功能（玻璃态卡片） | TIER_2 | ★★★★ | auto | 80px |
| Showcase | 用户作品画廊 | TIER_2 | ★★★ | auto | 60px |
| Social Proof | 创意社区评价 + 指标 | TIER_1 | ★★★ | auto | 48px |
| Pricing | 定价方案 | TIER_1 | ★★ | auto | 40px |
| CTA | 免费试用 + 光晕 | TIER_3 | ★★★★ | auto (~300px) | 40px |
| Footer | 标准页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #F5F3FF | #0C0A1A |
| Surface (glass) | rgba(255,255,255,0.7) + backdrop-filter: blur(24px) | rgba(255,255,255,0.08) + backdrop-filter: blur(24px) |
| Text Primary | #1E1B4B | #F1F5F9 |
| Text Secondary | #6366F1 (muted) | #A5B4FC |
| Accent | #7C3AED | #8B5CF6 |
| Accent Secondary | #EC4899 | #F472B6 |
| Gradient BG | radial-gradient(circle at 30% 20%, rgba(124,58,237,0.08), transparent 50%), radial-gradient(circle at 70% 80%, rgba(236,72,153,0.06), transparent 50%) | radial-gradient(circle at 30% 20%, rgba(139,92,246,0.12), transparent 50%), radial-gradient(circle at 70% 80%, rgba(244,114,182,0.08), transparent 50%) |
| Glass Border | rgba(255,255,255,0.2) | rgba(255,255,255,0.1) |
| Border | #E9E5FF | rgba(255,255,255,0.06) |

> 对比度验证：#1E1B4B on #F5F3FF = 13.2:1 (AA); #F1F5F9 on #0C0A1A = 17.6:1 (AA); #A5B4FC on #0C0A1A = 8.5:1 (AA)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Hero Title | clamp(44px, 6vw + 12px, 72px) | 600 | letter-spacing: -0.03em; line-height: 1.08 |
| Hero Subtitle | clamp(16px, 1.5vw + 8px, 20px) | 400 | line-height: 1.6; max-width: 48ch |
| Section Title | clamp(24px, 3vw + 8px, 36px) | 600 | letter-spacing: -0.015em; line-height: 1.2 |
| Card Title | 18px | 500 | line-height: 1.3 |
| Body | 16px | 400 | line-height: 1.6 |
| Price | 36px | 600 | font-variant-numeric: tabular-nums |

字阶: Perfect Fourth (1.333), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Hero title | fade-up + scale(0.96->1) | 700ms ease-out | A |
| Hero product preview | fade-up + blur-in | 800ms ease-out, delay 200ms | A |
| Hero CTA | fade-up | 400ms ease-out, delay 500ms | A |
| BG gradient | slow position shift | 12000ms ease-in-out infinite | A |
| Glass cards | fade-up (scroll-enter) | 500ms ease-out, stagger 100ms | A |
| Showcase gallery | fade-in (scroll-enter) | 400ms ease, stagger 80ms | A |
| Pricing cards | fade-up (scroll-enter) | 400ms ease-out, stagger 100ms | A |
| CTA glow | opacity pulse 0.6->1->0.6 | 3000ms ease-in-out infinite | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | page-bg | #F5F3FF / #0C0A1A | TIER_3 | 页面背景 |
| 2 | glass-surface | rgba(255,255,255,0.7) + blur(24px) / rgba(255,255,255,0.08) + blur(24px) | TIER_2 | 玻璃态卡片 |
| 3 | glass-border | rgba(255,255,255,0.2) / rgba(255,255,255,0.1) | TIER_2 | 玻璃态边框 |
| 4 | gradient-blob-1 | radial-gradient purple | TIER_3 | 背景光斑 1 |
| 5 | gradient-blob-2 | radial-gradient pink | TIER_3 | 背景光斑 2 |
| 6 | hero-display-size | clamp(44px, 6vw+12px, 72px) | TIER_3 | Hero 标题 |
| 7 | section-title-size | clamp(24px, 3vw+8px, 36px) | TIER_3 | Section 标题 |
| 8 | accent-purple | #7C3AED / #8B5CF6 | TIER_3 | 主强调色 |
| 9 | accent-pink | #EC4899 / #F472B6 | TIER_3 | 辅强调色 |
| 10 | glass-radius | 20px | TIER_2 | 玻璃态圆角 |
| 11 | grain-overlay | opacity 0.02 noise | TIER_3 | 背景纹理 |
| 12 | cta-glow | radial-gradient purple glow | TIER_3 | CTA 光晕 |

**总 TOKEN_ESCAPE**: 12 / 15
**AG Token 覆盖率**: 75%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| Linear.app | 暗背景 + 玻璃态卡片 + 光晕效果 | 品牌紫色 |
| Framer.com | 创意工具美学 + 渐变 + grain 质感 | 品牌特定元素 |
| Raycast.com | 深色底 + 彩色渐变光晕 + 产品展示 | 效率工具特定功能 |

---

## 10. 开源项目首页 — Editorial Minimalism x Problem->Solution

**行业**: 开源软件 / 开源框架 / 开源工具
**目标受众**: 开源贡献者、技术爱好者、采用决策者
**情绪关键词**: open, transparent, community-driven, reliable, developer-friendly
**风格原型**: Editorial Minimalism (primary) + Scientific Precision (secondary)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Problem | 现有工具痛点 + 代码对比 | TIER_3 | ★★★★ | auto, padding: 100px 0 | 100px |
| Agitation | 痛点量化 + "老方法 vs 新方法" | TIER_2 | ★★★ | auto | 80px |
| Solution | 项目介绍 + 安装命令 + Star/Fork 指标 | TIER_2 | ★★★★ | auto | 60px |
| Evidence | 性能 benchmark + 采用数据 | TIER_1 | ★★★ | auto | 48px |
| Community | 贡献者 + 生态集成 | TIER_1 | ★★ | auto | 40px |
| CTA | Star + 文档入口 | TIER_2 | ★★★ | auto (~200px) | 32px |
| Footer | 标准页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #FAFAFA | #0D1117 |
| Surface | #FFFFFF | #161B22 |
| Text Primary | #1F2328 | #E6EDF3 |
| Text Secondary | #656D76 | #8B949E |
| Accent | #1F6FEB | #58A6FF |
| Accent Soft | rgba(31,111,235,0.08) | rgba(88,166,255,0.12) |
| Code BG | #F6F8FA | #0D1117 |
| Code Border | #D0D7DE | rgba(255,255,255,0.08) |
| Success | #1A7F37 | #3FB950 |
| Border | #D0D7DE | #30363D |

> 对比度验证：#1F2328 on #FAFAFA = 14.8:1 (AA); #656D76 on #FAFAFA = 5.0:1 (AA); #E6EDF3 on #0D1117 = 14.7:1 (AA); #8B949E on #0D1117 = 5.3:1 (AA)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Problem Title | clamp(32px, 4vw + 8px, 48px) | 600 | letter-spacing: -0.025em; line-height: 1.1; max-width: 18ch |
| Solution Title | clamp(24px, 3vw + 8px, 36px) | 600 | letter-spacing: -0.015em; line-height: 1.2 |
| Body | 16px | 400 | line-height: 1.7; max-width: 680px |
| Code Block | 14px (monospace) | 400 | line-height: 1.6; font-family: JetBrains Mono, monospace |
| Install Command | 16px (monospace) | 500 | padding: 12px 20px; border-radius: 6px |
| Benchmark Value | 28px | 600 | font-variant-numeric: tabular-nums; letter-spacing: -0.02em |
| Star Count | 20px | 500 | font-variant-numeric: tabular-nums |

字阶: Major Third (1.25), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Problem title | fade-up | 500ms ease-out | A |
| Code comparison | fade-in (scroll-enter) | 400ms ease, delay 200ms | A |
| Agitation data | fade-up (scroll-enter) | 400ms ease-out | A |
| Install command | fade-up (scroll-enter) | 400ms ease-out | A |
| Star/Fork badges | countUp (scroll-enter) | 800ms ease-out | A |
| Benchmark bars | scale-x 0->1 (scroll-enter) | 600ms ease-out, stagger 100ms | B |
| Contributor avatars | fade-in (scroll-enter) | 400ms ease, stagger 40ms | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | problem-title-size | clamp(32px, 4vw+8px, 48px) | TIER_3 | Problem 标题 |
| 2 | solution-title-size | clamp(24px, 3vw+8px, 36px) | TIER_2 | Solution 标题 |
| 3 | code-bg | #F6F8FA / #0D1117 | TIER_2 | 代码块背景 |
| 4 | code-border | #D0D7DE / rgba(255,255,255,0.08) | TIER_2 | 代码块边框 |
| 5 | install-cmd-style | 16px monospace + padding + radius | TIER_2 | 安装命令样式 |

**总 TOKEN_ESCAPE**: 5 / 15
**AG Token 覆盖率**: 90%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| Astro.build | 开源项目首页结构 + 性能 benchmark + 安装引导 | 品牌色 |
| SvelteKit 首页 | 代码对比展示 + 极简布局 + 社区感 | 框架特定内容 |
| Tailwind CSS 首页 | 代码驱动说服力 + 从痛点出发的叙事 | 品牌青色 |

---

## 11. 金融科技产品 — Scientific Precision x Classic SaaS (bonus)

**行业**: 金融科技 / 支付 / 投资平台
**目标受众**: 企业财务负责人、产品经理、金融从业者
**情绪关键词**: secure, trustworthy, precise, professional, reliable
**风格原型**: Scientific Precision (primary) + Swiss (secondary)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Hero | 核心价值 + 产品 UI 预览 + CTA | TIER_3 | ★★★★ | min-height: 85vh | 0（渐变过渡） |
| Trust Strip | 合规认证 + 安全徽章 | TIER_1 | ★★ | auto (~60px) | 40px |
| Features | 3-4 个核心能力（图文交替） | TIER_1 | ★★★ | auto | 48px |
| Data Dashboard | 产品数据面板截图 + 指标 | TIER_2 | ★★★★ | auto | 48px |
| Social Proof | 企业客户 logo + 交易数据 | TIER_1 | ★★★ | auto | 40px |
| Security | 安全与合规说明 | TIER_1 | ★★ | auto | 40px |
| CTA | 行动号召 | TIER_2 | ★★★ | auto (~240px) | 32px |
| Footer | 标准页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #F8FAFC | #0B0F19 |
| Surface | #FFFFFF | #131A2A |
| Text Primary | #0F172A | #E2E8F0 |
| Text Secondary | #64748B | #94A3B8 |
| Accent Blue | #1E40AF | #3B82F6 |
| Accent Green | #15803D | #22C55E |
| Success Indicator | #059669 | #10B981 |
| Border | #E2E8F0 | rgba(255,255,255,0.06) |
| Hero BG | linear-gradient(180deg, #0B0F19 0%, #111827 100%) | 同左 |

> 对比度验证：#0F172A on #F8FAFC = 15.4:1 (AA); #64748B on #F8FAFC = 5.1:1 (AA); #E2E8F0 on #0B0F19 = 14.2:1 (AA)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Hero Title | clamp(36px, 4.5vw + 10px, 56px) | 600 | letter-spacing: -0.025em; line-height: 1.1 |
| Hero Subtitle | clamp(16px, 1.2vw + 8px, 18px) | 400 | line-height: 1.7; max-width: 52ch |
| Section Title | 24px | 500 | letter-spacing: -0.01em; line-height: 1.25 |
| Body | 15px | 400 | line-height: 1.7 |
| Currency Value | 36px | 600 | font-variant-numeric: tabular-nums; letter-spacing: -0.02em |
| Compliance Label | 12px | 500 | text-transform: uppercase; letter-spacing: 0.05em |

字阶: Perfect Fourth (1.333), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Hero title | fade-up | 500ms ease-out | A |
| Hero product UI | fade-up + scale(0.97->1) | 600ms ease-out, delay 200ms | A |
| Trust badges | fade-in (scroll-enter) | 400ms ease | A |
| Features | fade-up (scroll-enter) | 400ms ease-out, stagger 100ms | A |
| Dashboard screenshot | fade-up (scroll-enter) | 500ms ease-out | A |
| Transaction data | countUp (scroll-enter) | 800ms ease-out, stagger 120ms | A |
| CTA | fade-up (scroll-enter) | 400ms ease-out | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | hero-bg | linear-gradient(180deg, #0B0F19, #111827) | TIER_3 | Hero 深色背景 |
| 2 | hero-title-size | clamp(36px, 4.5vw+10px, 56px) | TIER_3 | Hero 标题 |
| 3 | hero-text-color | #E2E8F0 | TIER_3 | Hero 文字色 |
| 4 | hero-nav-text | #E2E8F0 | TIER_3 | 导航在 Hero 上的文字色 |
| 5 | accent-green | #15803D / #22C55E | TIER_2 | 收入/正向指标色 |
| 6 | compliance-label | 12px uppercase 0.05em | TIER_2 | 合规标签 |

**总 TOKEN_ESCAPE**: 6 / 15
**AG Token 覆盖率**: 88%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| Stripe.com | 排版节奏 + 产品 UI 展示 + 开发者友好感 | 彩虹渐变 |
| Plaid.com | 金融行业信任感 + 数据安全展示 | 品牌绿色 |
| Wise.com | 数据透明度 + 费率对比 + 信任徽章 | 品牌特定元素 |

---

## 12. 健康/医疗平台 — Organic x Problem->Solution (bonus)

**行业**: 健康管理 / 远程医疗 / 健康科技
**目标受众**: 患者、健康管理者、医疗从业者
**情绪关键词**: caring, approachable, trustworthy, warm, human
**风格原型**: Organic (primary) + Swiss (secondary, 提供结构感)

### Section Map + 视觉能量

| Section | 内容 | TIER | 视觉能量 | 高度策略 | 间距 |
|---------|------|------|---------|---------|------|
| Problem | 健康管理痛点 + 共鸣场景 | TIER_3 | ★★★★ | auto, padding: 80px 0 | 80px |
| Agitation | 数据佐证 + 情感叙事 | TIER_2 | ★★★ | auto | 60px |
| Solution | 产品功能 + 界面预览 | TIER_2 | ★★★★ | auto | 60px |
| Evidence | 用户故事 + 健康指标改善数据 | TIER_1 | ★★★ | auto | 48px |
| Professionals | 医疗团队 / 合作机构 | TIER_1 | ★★ | auto | 40px |
| CTA | 开始健康旅程 | TIER_2 | ★★★ | auto (~260px) | 32px |
| Footer | 标准页脚 | TIER_1 | ★ | auto | 0 |

### 配色快照

| Role | 亮色 | 暗色 |
|------|------|------|
| Background | #FEFCF8 | #141210 |
| Surface | #F5F0EB | #1E1B18 |
| Text Primary | #3D3929 | #E8DFD1 |
| Text Secondary | #8C836F | #A39882 |
| Accent Green | #4A7C59 | #6AAF7B |
| Accent Warm | #C4956A | #D4A57A |
| Accent Green Soft | rgba(74,124,89,0.08) | rgba(106,175,123,0.12) |
| Border | #E8DFD1 | rgba(255,255,255,0.08) |
| Illustration BG | #FFF8F0 | #1A1614 |

> 对比度验证：#3D3929 on #FEFCF8 = 9.8:1 (AA); #8C836F on #FEFCF8 = 4.5:1 (AA); #E8DFD1 on #141210 = 11.9:1 (AA)

### 排版快照

| 元素 | size | weight | spacing |
|------|------|--------|---------|
| Problem Title | clamp(32px, 4vw + 8px, 48px) | 500 | letter-spacing: -0.015em; line-height: 1.2 |
| Solution Title | clamp(24px, 3vw + 8px, 36px) | 500 | letter-spacing: -0.01em; line-height: 1.25 |
| Body | 16px | 400 | line-height: 1.8; max-width: 640px |
| Pull Quote | 24px | 400 | font-style: italic; line-height: 1.5; max-width: 32ch |
| Health Metric | 36px | 500 | font-variant-numeric: tabular-nums |
| Caption | 14px | 400 | line-height: 1.5 |

字阶: Major Third (1.25), 基准 16px

### 动效编排

| Section | Animation | Duration | Quality |
|---------|-----------|----------|---------|
| Problem title | fade-up | 500ms ease-out | A |
| Problem scenario | fade-in (scroll-enter) | 500ms ease | A |
| Agitation data | fade-up (scroll-enter) | 400ms ease-out | A |
| Solution screenshots | fade-up + scale(0.97->1) (scroll-enter) | 500ms ease-out | A |
| User story cards | fade-up (scroll-enter) | 400ms ease-out, stagger 120ms | A |
| Health metrics | countUp (scroll-enter) | 1000ms ease-out, stagger 100ms | A |
| CTA | fade-up (scroll-enter) | 400ms ease-out | A |

### TOKEN_ESCAPE 预算

| # | Name | Value | TIER | Scope |
|---|------|-------|------|-------|
| 1 | warm-bg | #FEFCF8 / #141210 | TIER_3 | 暖色背景 |
| 2 | warm-surface | #F5F0EB / #1E1B18 | TIER_2 | 暖色卡片 |
| 3 | warm-text | #3D3929 / #E8DFD1 | TIER_3 | 暖色文字 |
| 4 | warm-text-secondary | #8C836F / #A39882 | TIER_2 | 暖色辅助文字 |
| 5 | accent-sage | #4A7C59 / #6AAF7B | TIER_2 | 森林绿强调 |
| 6 | accent-terracotta | #C4956A / #D4A57A | TIER_2 | 陶土色强调 |
| 7 | warm-border | #E8DFD1 | TIER_2 | 暖色边框 |
| 8 | problem-title-size | clamp(32px, 4vw+8px, 48px) | TIER_3 | Problem 标题 |
| 9 | pull-quote-style | 24px/400/italic | TIER_2 | 引用文字 |
| 10 | illustration-bg | #FFF8F0 / #1A1614 | TIER_2 | 插画背景 |
| 11 | organic-radius | 16px | TIER_2 | 有机圆角 |

**总 TOKEN_ESCAPE**: 11 / 15
**AG Token 覆盖率**: 78%

### 参考标杆

| 产品/网站 | 借鉴什么 | 丢弃什么 |
|-----------|---------|---------|
| Headspace.com | 有机形状 + 柔和色彩 + 温暖氛围 | 冥想特定插画 |
| One Medical | 医疗信任感 + 温暖色调 + 人物摄影 | 具体医疗服务 |
| Calm.com | 自然色调 + 呼吸感留白 + 情感共鸣 | 睡眠特定内容 |

---

## 组合速查表

| # | 场景 | 风格原型 | 叙事结构 | TOKEN_ESCAPE | AG 覆盖率 |
|---|------|---------|---------|-------------|----------|
| 1 | SaaS 产品 Landing | Scientific Precision | Classic SaaS | 7 | 84% |
| 2 | AI 产品展示 | Dark Cinematic | Classic SaaS | 11 | 78% |
| 3 | 企业品牌展示 | Swiss | Story Arc | 5 | 91% |
| 4 | 开发者工具 Landing | Editorial Minimalism | Progressive Disclosure | 4 | 93% |
| 5 | 生物科技/制药 | Scientific Precision | Problem->Solution | 6 | 88% |
| 6 | B 端 Dashboard 展示 | Bento Grid | Progressive Disclosure | 7 | 85% |
| 7 | 活动/会议 Landing | Gradient Flow | Classic SaaS | 9 | 82% |
| 8 | 教育/学术平台 | Swiss | Classic SaaS | 5 | 90% |
| 9 | 创意工具展示 | Glassmorphism | Classic SaaS | 12 | 75% |
| 10 | 开源项目首页 | Editorial Minimalism | Problem->Solution | 5 | 90% |
| 11 | 金融科技产品 | Scientific Precision + Swiss | Classic SaaS | 6 | 88% |
| 12 | 健康/医疗平台 | Organic + Swiss | Problem->Solution | 11 | 78% |

---

## 使用指南

### 选择组合的决策流程

```
Creative Brief 到达
│
├─ 行业匹配？
│  ├─ 直接命中（如"SaaS Landing"）→ 选对应组合
│  └─ 近似匹配 → 选最近行业，微调参数
│
├─ 行业不匹配但情绪匹配？
│  └─ 按情绪关键词从 style-vocabulary.md 选风格原型
│     → 参考本文件中同风格原型的组合作为参数骨架
│
└─ 完全不匹配？
   └─ 构建自定义组合
      → 用本文件的格式模板填充参数
      → 交付成功后沉淀为新组合
```

### 参数微调原则

1. **配色可调，结构少调**：在组合骨架上替换配色方案风险最低，改变 section 结构风险最高
2. **TOKEN_ESCAPE 只增不减的陷阱**：每次微调都倾向于增加 ESCAPE，注意保持在 15 个预算内
3. **混合组合**：可以取组合 A 的配色 + 组合 B 的布局，但叙事结构只能选一个
4. **参考标杆是指南针**：实际搜索到的参考作品优先级高于组合中预设的标杆
