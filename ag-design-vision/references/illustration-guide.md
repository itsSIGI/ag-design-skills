# 插画与图形风格指导 — Illustration Guide

> 为 Vision Spec 的插画/图形章节提供结构化决策支持。
> 插画不是必需的——大多数 Landing page 可以只靠排版和配色。加插画要有明确目的。

---

## 1. 是否需要插画？

```
页面需要传达的核心信息是什么？
│
├─ 抽象概念（AI/云/安全/协作）→ 插画可以帮助具象化 → 考虑使用
├─ 具体产品/功能 → 截图/录屏 > 插画 → 优先用产品截图
├─ 数据/指标 → 数据可视化 > 插画 → 用图表
├─ 纯品牌表达 → 根据品牌调性决定
│
使用插画的理由成立吗？
├─ YES → 继续选择风格
└─ NO → 标注 Illustration: N/A，跳过本章节
```

---

## 2. 风格决策树

```
视觉风格原型是什么？（来自 style-vocabulary.md）
│
├─ Editorial Minimalism / Swiss
│  → 极简线条图（single-weight stroke）或无插画
│
├─ Neo-Brutalism
│  → 粗线条 + 不规则形状 / collage 风格
│
├─ Glassmorphism / Gradient Flow
│  → 3D render 或 abstract gradient shape
│
├─ Bento Grid
│  → 小型 icon-illustration（每个 cell 一个）
│
├─ Dark Cinematic
│  → 光效/粒子/抽象光线 或 高质量产品渲染
│
├─ Scientific Precision
│  → 技术线框图 / 数据可视化 / 结构图
│
├─ Organic
│  → 手绘 / 水彩 / 自然元素
│
├─ Retro
│  → 复古插画 / risograph 风格 / 旧式版画
│
├─ Neon
│  → 发光线条 / 网格背景 / 粒子
│
└─ 其他
   → 与用户确认
```

---

## 3. 风格参数化描述

每种插画风格需要在 Vision Spec 中给出以下参数：

| 参数 | 描述 | 示例 |
|------|------|------|
| **Line weight** | 线条粗细 | 1px uniform / 2-4px variable |
| **Fill style** | 填充方式 | flat / gradient / texture / none (outline only) |
| **Color count** | 用色数量 | 2-3 色 / 单色+背景 / 全调色板 |
| **Color source** | 色彩来源 | 从 Hero Palette 推导 / 独立但和谐 |
| **Complexity** | 复杂度 | minimal (5-10 shapes) / moderate / detailed |
| **Perspective** | 透视 | flat 2D / isometric / 3D |
| **Style consistency** | 一致性要求 | 所有插画必须同一风格/可以混搭 |

---

## 4. 颜色链接协议

插画色彩**必须**从 Vision Spec 的配色策略推导，不能独立于配色体系：

### 4.1 推导规则
```
Step 1: 取 Hero Palette 的 accent color
Step 2: 生成该色的 3 个变体（+20% 亮度 / 原始 / -20% 亮度）
Step 3: 取 1 个中性色（从 text secondary 或 surface）
Step 4: 可选：取 1 个互补/类似色作为辅助

→ 插画调色板 = 3 个 accent 变体 + 1 中性 + 0-1 辅助 = 4-5 色
```

### 4.2 一致性检查
- 同一页面上所有插画使用相同调色板
- 插画色彩与页面背景色有足够对比度
- 插画中不出现与 AG 品牌蓝/绿冲突的色彩（除非页面就是用这些色）

---

## 5. 构图与放置

### 5.1 放置策略
| 位置 | 适合 | 注意 |
|------|------|------|
| Hero 背景 | 大型抽象装饰 | 不遮挡文字，降低不透明度或 blur |
| Hero 右侧 | 产品图/主视觉 | 与标题平衡，不争注意力 |
| Section 左/右 | 图文对排 | 插画≤50% 宽度，文字优先 |
| Bento cell | 小型 icon-illustration | 统一尺寸，居中 |
| 背景装饰 | floating shapes | 极低不透明度（0.05-0.1），不影响可读性 |

### 5.2 尺寸约束
- 单张插画不超过视口 40% 面积
- 背景装饰总面积不超过视口 30%
- 插画不覆盖文字——如有重叠，文字必须有足够对比度

---

## 6. 技术规格

### 6.1 文件格式
| 类型 | 格式 | 理由 |
|------|------|------|
| 线条/几何/icon | SVG | 矢量无损，小体积，可 CSS 控制颜色 |
| 渐变/复杂图形 | SVG + 内嵌渐变 | 保持矢量 |
| 照片/3D 渲染 | WebP > PNG | WebP 体积更小 |
| 动画插画 | Lottie (JSON) / CSS animation | Lottie 支持复杂路径动画 |

### 6.2 SVG 优化
```
- 移除元数据（editor info, comments）
- 合并重叠路径
- 简化小数精度到 2 位
- 移除隐藏层
- 使用 SVGO 或类似工具
- 目标：单个 SVG ≤ 20KB
```

### 6.3 响应式处理
```css
/* SVG 响应式 */
.illustration {
  width: 100%;
  max-width: 480px;  /* 不超过设计尺寸 */
  height: auto;
}

/* 小视口隐藏装饰性插画 */
@media (max-width: 768px) {
  .decorative-illustration {
    display: none;
  }
}
```

---

## 7. 插画获取策略（三级优先）

> 插画质量是视觉方案成败的关键。按以下优先级选择获取方式，确保质量可控。

### 7.1 优先级 1：成熟插画资源库

先从经过验证的高质量插画资源库中寻找匹配的素材：

| 资源库 | 风格特征 | 适用场景 | 格式 | 许可 |
|--------|---------|---------|------|------|
| [unDraw](https://undraw.co) | 扁平、现代、可自定义品牌色 | SaaS/产品/技术 | SVG | MIT |
| [DrawKit](https://drawkit.io) | 精致扁平/等距/3D | 产品/商务/科技 | SVG/PNG | 免费+付费 |
| [Blush](https://blush.design) | 可组合的角色/场景插画 | 品牌/营销/社交 | SVG/PNG | 免费+付费 |
| [Storyset](https://storyset.com) | 可动画的场景插画 | 解释型/流程型 | SVG/动画 | 免费 |
| [Humaaans](https://humaaans.com) | 可拼装的人物插画 | 团队/协作/多样性 | SVG | 免费 |
| [Open Peeps](https://openpeeps.com) | 手绘线条人物 | 友好/亲切/轻松 | SVG | CC0 |
| [manypixels](https://manypixels.co/gallery) | 2D 扁平 + 等距 | 通用/商务 | SVG/PNG | 免费 |
| [illlustrations](https://illlustrations.co) | 开源扁平场景 | 通用/Landing page | SVG/AI | MIT |
| [Icons8 Illustrations](https://icons8.com/illustrations) | 多风格（Ouch/Pablita/Undraw 等） | 各种 | SVG/PNG | 需归属 |
| [Absurd Design](https://absurd.design) | 超现实手绘 | 创意/品牌/独特风格 | PNG | 免费 |
| [LottieFiles](https://lottiefiles.com) | 动画插画/图标 | 微交互/装饰/loading | Lottie JSON | 免费+付费 |

**使用流程**：
1. 根据 Vision Spec 风格方向确定插画风格需求
2. 在上表中找风格匹配的资源库
3. 搜索并选取素材
4. 按 §4 颜色链接协议调整配色
5. 按 §5 构图规则放置

### 7.2 优先级 2：AI 生成（有参考地画）

当资源库中找不到匹配的插画时，AI 生成作为兜底——但必须**有参考地画**，不凭空创作。

**强制前置步骤**：
1. **搜索参考**：在 Dribbble/Behance 上搜索与所需风格匹配的优秀插画作品
   - 搜索关键词：`[风格] illustration [主题]`（如 "geometric abstract chemistry illustration"）
   - 筛选标准：点赞数 ≥300、风格完成度高、色彩运用成熟
2. **从参考中提取风格参数**：
   - 线条粗细（1px uniform / 2-4px variable / 粗线条 4px+）
   - 填充方式（flat / gradient / texture / outline only）
   - 用色数量（2-3 色 / 4-5 色 / 全调色板）
   - 构图比例（居中对称 / 不对称 / 满版 / 留白）
   - 透视角度（flat 2D / isometric / 3/4 view）
   - 细节复杂度（minimal 5-10 shapes / moderate / detailed）
3. **按参考风格生成**：明确引用参考的风格参数，不凭空发挥
4. **比对验证**：生成后与参考作品做风格一致性比对（见 §9）

**AI 生成提示词模板**：
```
Style reference: [参考作品描述/链接]
Subject: [需要画什么]
Color palette: [从 Vision Spec 配色策略提取的 3-5 色]
Style parameters: line-weight [X], fill [X], complexity [X], perspective [X]
Constraints: match reference style, no text, transparent background, suitable for web SVG export
```

### 7.3 优先级 3：标注为"需专业插画师介入"

当需求超出 AI 能力时，不硬做——输出详细的插画 Brief 作为外包文档。

**超出 AI 能力的场景**：
- 高度写实的场景插画
- 品牌吉祥物/角色设计（需要多角度一致性）
- 复杂叙事场景（多人物/多层次/动态场景）
- 需要与真实照片融合的插画
- 需要系列一致性的多张插画集（如 10 张同风格的功能图标插画）

**插画 Brief 模板**：
```markdown
## Illustration Brief / 插画外包 Brief

- **数量**：[N 张]
- **风格**：[风格名 + 参考作品链接]
- **色彩规范**：[Vision Spec 配色策略中的具体色值]
- **构图要求**：[尺寸比例 + 安全区 + 文字叠加区域]
- **主题**：[每张的具体主题/场景]
- **技术要求**：[SVG / PNG @2x / 透明背景 / 最大文件尺寸]
- **参考作品**：[3-5 个搜索到的参考 + 标注提取什么]
- **一致性要求**：[所有插画必须同一风格/色彩/线条粗细]
```

---

## 8. AG 品牌共存规则

- **TIER_1 区域**（导航/页脚/系统 UI）：仅使用白名单图标（MingCute / Lucide），不放插画
- **TIER_2 区域**（Body sections）：可用简单的 icon-illustration，风格必须与 AG 克制感兼容
- **TIER_3 区域**（Hero/品牌区）：插画风格自由，但需在过渡段逐渐收敛到 AG 风格
- AG logo 使用遵循品牌规范——不改色、不变形、不放在复杂背景上

---

## 9. 插画质量把控协议

### 9.1 AI 生成插画强制检查清单

每张 AI 生成的插画必须通过以下全部检查：

- [ ] **无 AI 伪影**：无多余手指、融合物体、文字乱码、不自然的纹理过渡
- [ ] **风格一致性**：与同页面其他插画风格一致（线条粗细、填充方式、透视角度）
- [ ] **配色合规**：所有颜色来自 Vision Spec 配色策略（§4 颜色链接协议）
- [ ] **参考匹配度**：与搜索到的参考作品风格参数基本一致（允许 ±20% 偏差）
- [ ] **无版权问题**：不含可识别的品牌 logo、真实人脸、受版权保护的角色
- [ ] **分辨率合格**：@2x 导出，无锯齿、无模糊
- [ ] **背景透明**：除非设计要求，否则导出为透明背景
- [ ] **文件大小合规**：SVG ≤ 20KB / PNG ≤ 200KB / WebP ≤ 150KB

### 9.2 风格一致性验证

当一个页面需要多张插画时：

1. **先生成第一张**并确认风格正确
2. **用第一张作为风格锚点**生成后续插画
3. **逐张比对**：线条粗细是否一致、用色是否来自同一调色板、透视角度是否统一
4. 如果出现风格漂移 → 以第一张为准重新生成

### 9.3 与 Vision Spec 配色的校验

```
插画用色 ⊆ Vision Spec Palette

检查方式：
1. 提取插画中使用的所有色值
2. 与 Vision Spec §2 配色策略表对照
3. 允许：Palette 色值的 ±10% 亮度/饱和度变体
4. 不允许：Palette 中不存在且偏差 > 10% 的色值
```

### 9.4 插画决策流程

```
需要插画吗？（§1 决策树）
│
├─ 不需要 → 标注 N/A
│
└─ 需要
   │
   ├─ 在资源库中找到匹配素材？（§7.1）
   │  YES → 下载 + 调色 + 放置
   │
   ├─ 资源库无匹配 → AI 生成（§7.2）
   │  │
   │  ├─ 搜索参考作品
   │  ├─ 提取风格参数
   │  ├─ 按参考生成
   │  ├─ 质量检查（§9.1）
   │  └─ PASS → 使用 / FAIL → 重新生成或降级到 §7.3
   │
   └─ 超出 AI 能力 → 输出插画 Brief（§7.3）
```
