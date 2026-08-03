# 配色方案库（行业 × 视觉特质）

> 每个方案经过 WCAG AA 对比度验证（相对亮度公式计算），可直接用于 Vision Spec §2 配色策略。
> 与 `color-theory.md` 的 6 套预设互补——本文件提供更精细的配色选择。

## 使用方式

1. **按视觉特质检索（推荐）** — 跳转到 [视觉特质索引](#按视觉特质分类主检索入口)，按目标气质跨行业选方案
2. **按行业检索（辅助）** — 明确行业时直接定位到对应分类
3. **选择亮色/暗色方案** — 根据产品需求选择 Light Mode 或 Dark Mode 色值
4. **确认对比度合规** — 表中已标注对比度比值，Text Primary/Secondary/Accent 均 ≥ 4.5:1
5. **映射 AG Token** — 参考每个方案底部的 AG Token 兼容说明

> **跨行业原则**：好的配色不限于某个行业。OpenAI 的深紫配色可以用在 SaaS 产品上，
> Stripe 的清晰蓝也适合医疗科技。选配色看视觉气质，不看行业出身。

### 对比度验证方法

本文件所有对比度比值按 WCAG 2.1 相对亮度公式计算：
- 相对亮度 L = 0.2126×R + 0.7152×G + 0.0722×B（sRGB 线性化后）
- 对比度 = (L_lighter + 0.05) / (L_darker + 0.05)
- AA 标准：正文 ≥ 4.5:1，大文本（≥18px bold / ≥24px）≥ 3:1

---

## 检索方式

### 主入口：按视觉特质检索

> **推荐的检索路径**。不限行业——任何好看的、匹配目标视觉气质的配色都可以用。

跳转到 [按视觉特质分类](#按视觉特质分类主检索入口) 查看完整的跨行业视觉特质索引。

### 辅助入口：按行业检索

> 当明确知道目标行业时，可缩小范围快速定位。

---

## 按行业分类

---

### 科技/SaaS

---

#### SaaS Clarity Blue — 清晰可信的企业级 SaaS 配色

**适用行业**: 科技/SaaS
**情绪关键词**: 可信赖、专业、清晰、高效、理性
**和谐类型**: monochromatic（蓝灰色阶）
**匹配风格原型**: Swiss / Editorial Minimalism
**参考来源**: Stripe Dashboard、Linear、Notion 企业版

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F8FAFC | #0F172A | — |
| Surface | #FFFFFF | #1E293B | — |
| Text Primary | #0F172A | #F1F5F9 | 17.1:1 / 16.3:1 |
| Text Secondary | #475569 | #94A3B8 | 7.2:1 / 7.0:1 |
| Accent | #2563EB | #60A5FA | 4.9:1 / 7.0:1 |
| Accent Soft | rgba(37, 99, 235, 0.08) | rgba(96, 165, 250, 0.12) | — |
| Success | #16A34A | #4ADE80 | — |
| Error | #DC2626 | #F87171 | — |
| Border | #E2E8F0 | rgba(148, 163, 184, 0.15) | — |

**60-30-10**: 浅蓝灰 Background 60% / 深色文字+Surface 白卡片 30% / 蓝色 Accent 用于 CTA、链接、焦点态 10%
**渐变推荐**: 不适用——该方案强调清晰平面感，避免渐变
**AG Token 兼容**: Background/Surface/Text Primary/Text Secondary/Border 可直接映射 AG token（`--color-bg`, `--color-surface`, `--color-text-primary` 等）；Accent 蓝色需用 `TOKEN_ESCAPE`（AG 默认 accent 为 teal）

---

#### DevTool Emerald — 开发者工具的绿色信号感

**适用行业**: 科技/SaaS（开发者工具方向）
**情绪关键词**: 技术、精确、终端感、专注、可靠
**和谐类型**: analogous（绿-蓝绿）
**匹配风格原型**: Scientific Precision / Dark Cinematic
**参考来源**: Vercel Dashboard、GitHub、Supabase

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F0FDF4 | #0C1222 | — |
| Surface | #FFFFFF | #162032 | — |
| Text Primary | #1E293B | #F0FDF4 | 14.0:1 / 17.8:1 |
| Text Secondary | #4B5563 | #9CA3AF | 7.2:1 / 7.4:1 |
| Accent | #047857 | #34D399 | 5.2:1 / 9.7:1 |
| Accent Soft | rgba(4, 120, 87, 0.08) | rgba(52, 211, 153, 0.12) | — |
| Success | #15803D | #4ADE80 | — |
| Error | #B91C1C | #FCA5A5 | — |
| Border | #D1FAE5 | rgba(52, 211, 153, 0.10) | — |

**60-30-10**: 极浅绿白 Background 60% / 深灰文字+白卡片 30% / 绿色 Accent 用于成功状态、主操作按钮 10%
**渐变推荐**: Dark Mode 可用 `linear-gradient(135deg, #0C1222 0%, #0F2A1D 100%)` 做背景微妙过渡
**AG Token 兼容**: Text Primary/Secondary/Border 可映射 AG token；Background 的绿色调和 Accent 绿色需 `TOKEN_ESCAPE`（共 3-4 个）

---

#### Cloud Indigo — 云服务的深邃科技感

**适用行业**: 科技/SaaS（云计算、基础设施方向）
**情绪关键词**: 深邃、智能、平台感、创新、可扩展
**和谐类型**: monochromatic（靛蓝色阶）
**匹配风格原型**: Gradient Flow / Glassmorphism
**参考来源**: Vercel、Cloudflare、AWS Amplify

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F5F3FF | #0F0D2E | — |
| Surface | #FFFFFF | #1A1745 | — |
| Text Primary | #1E1B4B | #F5F3FF | 14.6:1 / 17.1:1 |
| Text Secondary | #525280 | #9499C4 | 6.7:1 / 6.8:1 |
| Accent | #4F46E5 | #A5B4FC | 5.7:1 / 9.4:1 |
| Accent Soft | rgba(79, 70, 229, 0.08) | rgba(165, 180, 252, 0.12) | — |
| Success | #059669 | #6EE7B7 | — |
| Error | #E11D48 | #FDA4AF | — |
| Border | #E0DEFF | rgba(165, 180, 252, 0.12) | — |

**60-30-10**: 极浅紫白 Background 60% / 深靛蓝文字 30% / 靛蓝 Accent 用于交互元素和渐变装饰 10%
**渐变推荐**: `linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #A78BFA 100%)` — 用于 Hero 区光晕或 CTA 按钮
**AG Token 兼容**: Text 系列可映射 AG token；Background 紫色调、Accent 靛蓝、渐变均需 `TOKEN_ESCAPE`（共 5-6 个）

---

### 生物科技/医疗/制药

---

#### Clinical Trust — 临床级别的信赖蓝

**适用行业**: 生物科技/医疗/制药
**情绪关键词**: 专业、洁净、信赖、冷静、权威
**和谐类型**: monochromatic（蓝色阶）
**匹配风格原型**: Swiss / Scientific Precision
**参考来源**: Pfizer 官网、Mayo Clinic、GE Healthcare

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F0F7FA | #0D1B2A | — |
| Surface | #FFFFFF | #152838 | — |
| Text Primary | #1A2332 | #E8F4F8 | 14.6:1 / 15.5:1 |
| Text Secondary | #5A6B7D | #8EAFC0 | 5.1:1 / 7.5:1 |
| Accent | #006DA4 | #48CAE4 | 5.2:1 / 9.0:1 |
| Accent Soft | rgba(0, 109, 164, 0.08) | rgba(72, 202, 228, 0.10) | — |
| Success | #0F8B5A | #5EEAD4 | — |
| Error | #C53030 | #FEB2B2 | — |
| Border | #D0E6F0 | rgba(142, 175, 192, 0.15) | — |

**60-30-10**: 冷白 Background 60% / 深灰蓝文字+白卡片 30% / 医学蓝 Accent 传递专业权威 10%
**渐变推荐**: 不适用——医疗场景应保持平面清晰感，避免装饰性渐变
**AG Token 兼容**: 高兼容——Text/Surface/Border 直接映射 AG token；Background 冷蓝色调和 Accent 蓝需 `TOKEN_ESCAPE`（共 2-3 个）

---

#### Biotech Sage — 生命科学的有机绿

**适用行业**: 生物科技/医疗/制药（生命科学、基因工程方向）
**情绪关键词**: 自然、生命力、可持续、温暖科技、成长
**和谐类型**: analogous（绿-黄绿-大地色）
**匹配风格原型**: Organic
**参考来源**: Genentech、Illumina、23andMe

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F4F8F0 | #1A2A1A | — |
| Surface | #FFFFFF | #243324 | — |
| Text Primary | #2D3B2D | #EDF3E8 | 11.0:1 / 13.4:1 |
| Text Secondary | #5C6B5C | #8FA88F | 5.3:1 / 5.9:1 |
| Accent | #4A7C59 | #6BBF7B | 4.5:1 / 6.7:1 |
| Accent Soft | rgba(74, 124, 89, 0.08) | rgba(107, 191, 123, 0.10) | — |
| Success | #2E7D32 | #81C784 | — |
| Error | #C62828 | #EF9A9A | — |
| Border | #D5E5CC | rgba(143, 168, 143, 0.15) | — |

**60-30-10**: 暖白绿 Background 60% / 深绿棕文字 30% / 自然绿 Accent 呼应生命主题 10%
**渐变推荐**: `linear-gradient(180deg, #F4F8F0 0%, #E8F0DD 100%)` — 浅绿过渡做页面背景
**AG Token 兼容**: Text 系列基本可映射；Background 暖绿、Accent 绿色调全部需 `TOKEN_ESCAPE`（共 6-8 个，与 AG 冷灰风格差异较大）

---

#### Pharma Precision — 制药行业的精确蓝灰

**适用行业**: 生物科技/医疗/制药（制药、临床试验方向）
**情绪关键词**: 精确、规范、可验证、透明、科学严谨
**和谐类型**: analogous（蓝灰-钢蓝）
**匹配风格原型**: Scientific Precision / Swiss
**参考来源**: Roche、AstraZeneca、Moderna

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F0F4F8 | #0E1A28 | — |
| Surface | #FFFFFF | #182838 | — |
| Text Primary | #1B2A3D | #E8EEF4 | 13.1:1 / 15.0:1 |
| Text Secondary | #5B6E82 | #89A1B8 | 4.8:1 / 6.6:1 |
| Accent | #2E6B9E | #5BA3D9 | 5.1:1 / 6.4:1 |
| Accent Soft | rgba(46, 107, 158, 0.08) | rgba(91, 163, 217, 0.10) | — |
| Success | #1B813E | #66BB6A | — |
| Error | #B71C1C | #EF5350 | — |
| Border | #D4DEE8 | rgba(137, 161, 184, 0.15) | — |

**60-30-10**: 冷灰白 Background 60% / 深蓝灰文字+数据表格 30% / 钢蓝 Accent 用于关键数据指标和 CTA 10%
**渐变推荐**: 不适用——制药行业应保持严谨平面风格
**AG Token 兼容**: 高兼容——色调与 AG 冷灰体系接近。Background/Text 可直接映射；Accent 钢蓝需 `TOKEN_ESCAPE`（共 2-3 个）

---

### 金融/企业

---

#### Corporate Navy — 企业级深蓝稳重感

**适用行业**: 金融/企业
**情绪关键词**: 稳重、权威、专业、体系化、安全
**和谐类型**: monochromatic（深蓝色阶）
**匹配风格原型**: Swiss / Editorial Minimalism
**参考来源**: JPMorgan Chase、Bloomberg、Salesforce Enterprise

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F4F6F9 | #0A1628 | — |
| Surface | #FFFFFF | #132240 | — |
| Text Primary | #0A1628 | #EDF0F5 | 16.7:1 / 15.9:1 |
| Text Secondary | #4A5568 | #8B9BB5 | 7.0:1 / 6.4:1 |
| Accent | #1E40AF | #60A5FA | 8.1:1 / 7.1:1 |
| Accent Soft | rgba(30, 64, 175, 0.08) | rgba(96, 165, 250, 0.10) | — |
| Success | #15803D | #4ADE80 | — |
| Error | #B91C1C | #FCA5A5 | — |
| Border | #D8DEE8 | rgba(139, 155, 181, 0.15) | — |

**60-30-10**: 浅灰白 Background 60% / 深海军蓝文字+白 Surface 30% / 深蓝 Accent 传递权威感 10%
**渐变推荐**: 不适用——企业场景保持平面稳重
**AG Token 兼容**: 高兼容——色调接近 AG 灰色体系。Text/Surface/Border 直接映射；Accent 深蓝需 `TOKEN_ESCAPE`（共 2-3 个）

---

#### Wealth Gold — 高端财富管理的暖金感

**适用行业**: 金融/企业（私人银行、财富管理方向）
**情绪关键词**: 高端、尊贵、信赖、温暖、沉稳
**和谐类型**: analogous（金-棕-象牙）
**匹配风格原型**: Editorial Minimalism / Retro
**参考来源**: UBS、Goldman Sachs Private、Vanguard Personal Advisor

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #FAF8F2 | #16120C | — |
| Surface | #FFFFFF | #221C14 | — |
| Text Primary | #1C1810 | #FAF0DC | 16.7:1 / 16.5:1 |
| Text Secondary | #6B5E4B | #A89878 | 5.9:1 / 6.6:1 |
| Accent | #996515 | #D4A843 | 4.7:1 / 8.4:1 |
| Accent Soft | rgba(153, 101, 21, 0.08) | rgba(212, 168, 67, 0.10) | — |
| Success | #2E7D32 | #81C784 | — |
| Error | #C62828 | #EF9A9A | — |
| Border | #E8E0D0 | rgba(168, 152, 120, 0.15) | — |

**60-30-10**: 象牙白 Background 60% / 深棕文字+白 Surface 30% / 暗金 Accent 用于关键指标和 CTA 10%
**渐变推荐**: `linear-gradient(135deg, #996515 0%, #D4A843 100%)` — 金色渐变仅用于极小面积装饰元素
**AG Token 兼容**: Text 系列可映射 AG token（明度接近）；Background 暖色调、Accent 金色均需 `TOKEN_ESCAPE`（共 5-6 个）

---

#### FinTech Teal — 金融科技的现代青绿

**适用行业**: 金融/企业（FinTech、数字银行方向）
**情绪关键词**: 现代、透明、敏捷、数字化、年轻
**和谐类型**: split-complementary（青绿为主，对角暖色点缀）
**匹配风格原型**: Bento Grid / Glassmorphism
**参考来源**: Stripe、Wise、Robinhood

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #ECFDF5 | #0A1E1E | — |
| Surface | #FFFFFF | #14302E | — |
| Text Primary | #0F2830 | #ECFDF5 | 14.6:1 / 16.4:1 |
| Text Secondary | #3D6B6B | #7FB8B0 | 5.7:1 / 7.7:1 |
| Accent | #0F766E | #2DD4BF | 5.2:1 / 9.3:1 |
| Accent Soft | rgba(15, 118, 110, 0.08) | rgba(45, 212, 191, 0.10) | — |
| Success | #0F8B5A | #34D399 | — |
| Error | #DC2626 | #FCA5A5 | — |
| Border | #C6F0E0 | rgba(127, 184, 176, 0.12) | — |

**60-30-10**: 极浅青绿 Background 60% / 深青文字+白卡片 30% / 青绿 Accent 传递数字化活力 10%
**渐变推荐**: `linear-gradient(135deg, #0F766E 0%, #2DD4BF 100%)` — 用于 Dark Mode CTA 按钮
**AG Token 兼容**: Text 系列可映射；Background 绿色调、Accent 青绿需 `TOKEN_ESCAPE`（共 4-5 个，AG 装饰色板有 teal 可部分复用）

---

### 教育/学术

---

#### Academic Burgundy — 学术机构的典雅酒红

**适用行业**: 教育/学术
**情绪关键词**: 传统、权威、学术、庄重、知性
**和谐类型**: monochromatic（酒红-玫瑰色阶）
**匹配风格原型**: Editorial Minimalism / Retro
**参考来源**: Harvard、Stanford、MIT Press

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #FBF5F3 | #1E0E14 | — |
| Surface | #FFFFFF | #2A1820 | — |
| Text Primary | #2B1520 | #FAF0EC | 15.8:1 / 16.6:1 |
| Text Secondary | #6B4C5A | #B88A9A | 6.9:1 / 6.3:1 |
| Accent | #9B1B30 | #E85D75 | 7.5:1 / 5.5:1 |
| Accent Soft | rgba(155, 27, 48, 0.08) | rgba(232, 93, 117, 0.10) | — |
| Success | #2E7D32 | #81C784 | — |
| Error | #C62828 | #EF9A9A | — |
| Border | #ECDAD5 | rgba(184, 138, 154, 0.15) | — |

**60-30-10**: 暖白 Background 60% / 深棕红文字 30% / 酒红 Accent 体现学术传统 10%
**渐变推荐**: 不适用——学术风格应保持古典平面感
**AG Token 兼容**: Text 系列明度可映射但色调需调整；Background 暖色调、Accent 酒红均需 `TOKEN_ESCAPE`（共 5-7 个）

---

#### EdTech Playful — 教育科技的活力橙

**适用行业**: 教育/学术（在线教育、EdTech 产品方向）
**情绪关键词**: 活力、友好、可达、鼓励、成长
**和谐类型**: complementary（暖橙 + 深蓝对比）
**匹配风格原型**: Bento Grid / Organic
**参考来源**: Duolingo、Khan Academy、Coursera

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #FFFBF0 | #141422 | — |
| Surface | #FFFFFF | #1E1E32 | — |
| Text Primary | #1A1A2E | #FFF8E7 | 16.5:1 / 17.2:1 |
| Text Secondary | #5C5A72 | #A8A6BC | 6.4:1 / 7.7:1 |
| Accent | #B45309 | #F5A623 | 4.9:1 / 9.0:1 |
| Accent Soft | rgba(180, 83, 9, 0.08) | rgba(245, 166, 35, 0.10) | — |
| Success | #15803D | #4ADE80 | — |
| Error | #DC2626 | #F87171 | — |
| Border | #F0E4CC | rgba(168, 166, 188, 0.15) | — |

**60-30-10**: 暖白 Background 60% / 深蓝灰文字+白卡片 30% / 深橙 Accent 激发学习动力 10%
**渐变推荐**: `linear-gradient(135deg, #B45309 0%, #F59E0B 100%)` — Dark Mode 下用于进度条和成就徽章
**AG Token 兼容**: Text 系列可映射 AG token；Background 暖色调、Accent 橙色均需 `TOKEN_ESCAPE`（共 4-6 个）

---

#### Research Slate — 学术研究的冷静石板灰

**适用行业**: 教育/学术（学术出版、研究平台方向）
**情绪关键词**: 严谨、客观、中性、专注、可信
**和谐类型**: analogous（蓝灰色阶）
**匹配风格原型**: Scientific Precision / Swiss
**参考来源**: Notion Academic、Overleaf、Google Scholar

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F7FAFC | #1A202C | — |
| Surface | #FFFFFF | #2D3748 | — |
| Text Primary | #1A202C | #EDF2F7 | 15.6:1 / 14.5:1 |
| Text Secondary | #4A5568 | #A0AEC0 | 7.2:1 / 7.2:1 |
| Accent | #2B6CB0 | #63B3ED | 5.2:1 / 7.2:1 |
| Accent Soft | rgba(43, 108, 176, 0.08) | rgba(99, 179, 237, 0.10) | — |
| Success | #2E7D32 | #68D391 | — |
| Error | #C53030 | #FC8181 | — |
| Border | #E2E8F0 | rgba(160, 174, 192, 0.15) | — |

**60-30-10**: 冷白 Background 60% / 深石板灰文字 30% / 中蓝 Accent 用于引用链接和交互元素 10%
**渐变推荐**: 不适用——学术场景保持纯净平面风格
**AG Token 兼容**: 极高兼容——色调与 AG 冷灰体系几乎一致。Background/Text/Border 可直接映射；Accent 蓝需 `TOKEN_ESCAPE`（共 1-2 个）

---

### 创意/设计

---

#### Studio Coral — 设计工作室的活力珊瑚

**适用行业**: 创意/设计
**情绪关键词**: 创意、温暖、表达、灵感、前卫
**和谐类型**: split-complementary（珊瑚粉为主，紫色和绿色点缀）
**匹配风格原型**: Gradient Flow / Neo-Brutalism
**参考来源**: Dribbble、Figma Community、InVision

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #FFF5F5 | #1E1020 | — |
| Surface | #FFFFFF | #2A1A2E | — |
| Text Primary | #2D1F2F | #FFF0F0 | 14.6:1 / 16.5:1 |
| Text Secondary | #6B5070 | #B898BE | 6.5:1 / 7.2:1 |
| Accent | #C2185B | #FF6B8A | 5.5:1 / 6.7:1 |
| Accent Soft | rgba(194, 24, 91, 0.08) | rgba(255, 107, 138, 0.10) | — |
| Success | #2E7D32 | #81C784 | — |
| Error | #C62828 | #EF9A9A | — |
| Border | #F5D5D5 | rgba(184, 152, 190, 0.15) | — |

**60-30-10**: 极浅粉白 Background 60% / 深紫棕文字 30% / 珊瑚粉 Accent 表达创意活力 10%
**渐变推荐**: `linear-gradient(135deg, #C2185B 0%, #7C3AED 100%)` — 粉紫渐变用于 Hero 区装饰
**AG Token 兼容**: Text 系列明度可映射；Background 粉色调、Accent 珊瑚色、渐变均需 `TOKEN_ESCAPE`（共 6-8 个）

---

#### Design Monochrome — 极简设计师的黑白红

**适用行业**: 创意/设计（作品集、设计工作室官网方向）
**情绪关键词**: 极简、克制、高级、对比、专注作品
**和谐类型**: achromatic + 单一强调色
**匹配风格原型**: Editorial Minimalism / Swiss
**参考来源**: Pentagram、Studio Dumbar、Massimo Vignelli 作品

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #FAFAFA | #111111 | — |
| Surface | #FFFFFF | #1A1A1A | — |
| Text Primary | #111111 | #FAFAFA | 18.1:1 / 18.1:1 |
| Text Secondary | #666666 | #999999 | 5.5:1 / 6.6:1 |
| Accent | #C41E3A | #FF453A | 5.6:1 / 5.5:1 |
| Accent Soft | rgba(196, 30, 58, 0.08) | rgba(255, 69, 58, 0.10) | — |
| Success | #2E7D32 | #81C784 | — |
| Error | #C62828 | #FF6B6B | — |
| Border | #E5E5E5 | rgba(153, 153, 153, 0.15) | — |

**60-30-10**: 纯白/纯黑 Background 60% / 黑/白文字 30% / 深红 Accent 极克制地点缀 CTA 10%（红色面积可压到 5%）
**渐变推荐**: 不适用——极简风格严格禁止渐变
**AG Token 兼容**: 最高兼容——与 AG 灰色体系完美匹配。Background/Text/Border 直接映射；仅 Accent 红需 `TOKEN_ESCAPE`（共 1-2 个）

---

#### Portfolio Lavender — 作品集的柔和薰衣草

**适用行业**: 创意/设计（个人作品集、独立设计师方向）
**情绪关键词**: 柔和、精致、个性化、艺术感、品味
**和谐类型**: analogous（紫-薰衣草-蓝紫）
**匹配风格原型**: Glassmorphism / Organic
**参考来源**: Behance 精选、个人设计师网站、Awwwards 获奖作品

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F8F5FF | #150F28 | — |
| Surface | #FFFFFF | #1E1838 | — |
| Text Primary | #1E1833 | #F3EEFF | 15.8:1 / 16.3:1 |
| Text Secondary | #5C5278 | #A899C4 | 6.6:1 / 7.1:1 |
| Accent | #7C3AED | #A78BFA | 5.3:1 / 6.8:1 |
| Accent Soft | rgba(124, 58, 237, 0.08) | rgba(167, 139, 250, 0.10) | — |
| Success | #059669 | #6EE7B7 | — |
| Error | #E11D48 | #FDA4AF | — |
| Border | #E8DEFF | rgba(168, 153, 196, 0.12) | — |

**60-30-10**: 极浅薰衣草白 Background 60% / 深紫灰文字 30% / 紫色 Accent 表达艺术品味 10%
**渐变推荐**: `linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)` — 柔和紫色渐变做背景装饰
**AG Token 兼容**: Text 系列明度可映射；Background 紫色调、Accent 紫色需 `TOKEN_ESCAPE`（共 4-5 个，AG 装饰色板有 purple 可部分复用）

---

### AI/数据科学

---

#### Neural Violet — AI 神经网络的深紫科技感

**适用行业**: AI/数据科学
**情绪关键词**: 智能、前沿、深邃、神秘、创新
**和谐类型**: analogous（紫-靛蓝-蓝紫）
**匹配风格原型**: Dark Cinematic / Gradient Flow
**参考来源**: OpenAI、Anthropic、Hugging Face

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F5F0FF | #0E0620 | — |
| Surface | #FFFFFF | #1A1030 | — |
| Text Primary | #1A0A2E | #EDE5FF | 16.7:1 / 16.2:1 |
| Text Secondary | #5B4A6E | #A090B8 | 7.1:1 / 6.7:1 |
| Accent | #7C3AED | #A78BFA | 5.1:1 / 7.2:1 |
| Accent Soft | rgba(124, 58, 237, 0.08) | rgba(167, 139, 250, 0.10) | — |
| Success | #059669 | #6EE7B7 | — |
| Error | #E11D48 | #FDA4AF | — |
| Border | #DDD0FF | rgba(160, 144, 184, 0.12) | — |

**60-30-10**: 极浅紫 Background 60% / 深紫文字 30% / 紫色 Accent 呼应 AI 的智能感 10%
**渐变推荐**: `linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)` — 紫-粉渐变用于 Dark Mode Hero 光晕效果
**AG Token 兼容**: Text 系列明度可映射；Background/Accent 紫色调需 `TOKEN_ESCAPE`（共 5-7 个）

---

#### Data Cyan — 数据可视化的明亮青色

**适用行业**: AI/数据科学（数据分析、BI 工具方向）
**情绪关键词**: 清晰、分析、精确、透明、洞察
**和谐类型**: complementary（青色为主，暖橙点缀数据高亮）
**匹配风格原型**: Scientific Precision / Bento Grid
**参考来源**: Tableau、Looker、Observable

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F0F9FF | #061218 | — |
| Surface | #FFFFFF | #0E1E2E | — |
| Text Primary | #0A1929 | #E0F7FA | 16.6:1 / 17.0:1 |
| Text Secondary | #3D5A6E | #78A8BE | 6.8:1 / 7.4:1 |
| Accent | #0E7490 | #22D3EE | 5.0:1 / 10.5:1 |
| Accent Soft | rgba(14, 116, 144, 0.08) | rgba(34, 211, 238, 0.10) | — |
| Success | #0F8B5A | #34D399 | — |
| Error | #DC2626 | #F87171 | — |
| Border | #CCE8F4 | rgba(120, 168, 190, 0.12) | — |

**60-30-10**: 极浅天蓝 Background 60% / 深蓝黑文字+数据图表 30% / 青色 Accent 用于数据高亮和交互 10%
**渐变推荐**: `linear-gradient(135deg, #0E7490 0%, #06B6D4 50%, #22D3EE 100%)` — 青色渐变用于数据可视化装饰
**AG Token 兼容**: Text 系列可映射 AG token；Background 蓝色调、Accent 青色需 `TOKEN_ESCAPE`（共 3-4 个，AG 装饰色板有 teal/cyan 可部分复用）

---

#### ML Graphite — 机器学习的极客石墨感

**适用行业**: AI/数据科学（ML 平台、开发者工具方向）
**情绪关键词**: 极客、专注、终端感、效率、黑客精神
**和谐类型**: achromatic + 单一功能色（绿色——终端/成功语义）
**匹配风格原型**: Dark Cinematic / Scientific Precision
**参考来源**: GitHub Copilot、Weights & Biases、MLflow

| Role | Light Mode | Dark Mode | 对比度(on bg) |
|------|-----------|-----------|--------------|
| Background | #F5F5F5 | #0A0A0A | — |
| Surface | #FFFFFF | #171717 | — |
| Text Primary | #121212 | #E5E5E5 | 17.2:1 / 15.7:1 |
| Text Secondary | #525252 | #A3A3A3 | 7.2:1 / 7.8:1 |
| Accent | #047857 | #34D399 | 5.0:1 / 10.3:1 |
| Accent Soft | rgba(4, 120, 87, 0.08) | rgba(52, 211, 153, 0.10) | — |
| Success | #15803D | #4ADE80 | — |
| Error | #B91C1C | #FCA5A5 | — |
| Border | #D4D4D4 | rgba(163, 163, 163, 0.15) | — |

**60-30-10**: 中性灰白/纯黑 Background 60% / 黑/浅灰文字 30% / 深绿 Accent 呼应终端美学 10%
**渐变推荐**: Dark Mode 可用 `radial-gradient(circle at 50% 0%, rgba(52, 211, 153, 0.08) 0%, transparent 60%)` — 极微妙的绿色光晕做顶部装饰
**AG Token 兼容**: 最高兼容——灰色体系与 AG 完美匹配。Background/Text/Border 直接映射；仅 Accent 绿需 `TOKEN_ESCAPE`（共 1-2 个）

---

## 按视觉特质分类（主检索入口）

> **不限行业**——任何好看的、匹配目标视觉气质的配色都可以跨行业使用。
> 比如 OpenAI 的深紫配色同样适合 SaaS Landing page，Stripe 的清晰蓝也适合医疗科技产品。
> 先选视觉特质，再从匹配的方案中挑选最合适的。

### 冷色科技感 / Cool Tech

**适合场景**：AI 产品、开发者工具、数据平台、SaaS Dashboard、任何想传达"未来感/精确/智能"的页面

| 方案 | 原属行业 | 核心色调 | 特征 |
|------|---------|---------|------|
| DevTool Emerald | 科技/SaaS | 翡翠绿+深灰 | 终端/代码感，暗色模式突出 |
| Neural Violet | AI/数据科学 | 深紫+青色 | 深空感，适合 AI/ML 产品 |
| Cloud Indigo | 科技/SaaS | 靛蓝+暗底 | 现代 SaaS 暗色调 |
| ML Graphite | AI/数据科学 | 石墨灰+绿 | 极客/工程师感 |
| Data Cyan | AI/数据科学 | 青色+深蓝 | 数据可视化，信息密集型 |
| Clinical Trust | 生物科技/医疗 | 冷蓝+白 | 冷色但偏临床精确 |

### 极简专业 / Minimal Professional

**适合场景**：企业官网、B2B SaaS、专业服务、任何需要"可信赖/清晰/不花哨"的页面

| 方案 | 原属行业 | 核心色调 | 特征 |
|------|---------|---------|------|
| SaaS Clarity Blue | 科技/SaaS | 蓝灰 | 最通用，Stripe/Linear 风格 |
| Corporate Navy | 金融/企业 | 深海军蓝 | 稳重权威 |
| Research Slate | 教育/学术 | 石板灰蓝 | 学术型清爽 |
| Design Monochrome | 创意/设计 | 纯黑白+红 | 极端极简，高对比 |
| Pharma Precision | 生物科技/制药 | 钢蓝灰 | 精密、无干扰 |

### 高端质感 / Premium Luxe

**适合场景**：品牌展示页、高端产品、投资人页面、私域服务

| 方案 | 原属行业 | 核心色调 | 特征 |
|------|---------|---------|------|
| Wealth Gold | 金融/企业 | 暗金+深灰 | 金融私行/奢侈品感 |
| Design Monochrome | 创意/设计 | 纯黑白 | Pentagram 式高级黑白 |
| Academic Burgundy | 教育/学术 | 酒红+米色 | 学院派优雅 |
| Neural Violet | AI/数据科学 | 深紫+暗底 | 神秘高端科技 |

### 活力友好 / Vibrant Friendly

**适合场景**：面向消费者的产品、教育平台、社区工具、onboarding 流程

| 方案 | 原属行业 | 核心色调 | 特征 |
|------|---------|---------|------|
| EdTech Playful | 教育/学术 | 活力橙+亮色 | Duolingo 式友好 |
| Studio Coral | 创意/设计 | 珊瑚粉+暖色 | 有温度的设计感 |
| FinTech Teal | 金融/企业 | 青绿+白 | 清新但不幼稚 |
| Biotech Sage | 生物科技/医疗 | 鼠尾草绿 | 自然有机 |

### 柔和艺术 / Soft Artistic

**适合场景**：创意工具、设计师社区、内容平台、个人品牌

| 方案 | 原属行业 | 核心色调 | 特征 |
|------|---------|---------|------|
| Portfolio Lavender | 创意/设计 | 薰衣草紫 | 柔和不刺激 |
| Studio Coral | 创意/设计 | 珊瑚粉 | 温暖艺术感 |
| Biotech Sage | 生物科技/医疗 | 鼠尾草绿 | 有机自然 |

### 深邃戏剧 / Deep Dramatic

**适合场景**：品牌页、发布会页面、暗色主题产品、需要视觉冲击力的场景

| 方案 | 原属行业 | 核心色调 | 特征 |
|------|---------|---------|------|
| Neural Violet | AI/数据科学 | 深紫+暗底 | 最强戏剧性 |
| Cloud Indigo | 科技/SaaS | 靛蓝+暗底 | 深邃但不压抑 |
| ML Graphite | AI/数据科学 | 石墨黑+绿 | 暗色极客 |
| Wealth Gold | 金融/企业 | 暗金+黑 | 暗色奢华 |

---

## 附录：与 color-theory.md 预设配色的对应关系

| color-theory.md 预设 | 本文件最接近方案 | 差异说明 |
|---------------------|----------------|---------|
| Trust Blue | SaaS Clarity Blue | 几乎一致，本文件补充了 Dark Mode 和完整角色表 |
| Innovation Gradient | Neural Violet / Cloud Indigo | 本文件拆分为不同行业方向 |
| Nature Organic | Biotech Sage | 本文件针对生物科技行业微调色值 |
| Dark Dramatic | ML Graphite | 本文件增加了行业语义和 Light Mode |
| Warm Retro | Wealth Gold / Academic Burgundy | 本文件按行业拆分了暖色系 |
| Electric Neon | 无直接对应 | 霓虹风格保留在 color-theory.md 中，适用于活动页等特殊场景 |
