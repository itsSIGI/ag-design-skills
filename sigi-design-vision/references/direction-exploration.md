# 风格方向探索细则

> Step 2 读本文件。含双轨灵感获取（搜索 / 纯内部库）、
> Direction Card 格式、3 选 1 可视化稿。

---

**输入**：Step 1 的 Creative Brief

**操作**：

### 2.0 确定灵感获取路径（双轨决策）

```
Web search 可用？（尝试搜索一次即知）
│
├─ YES → 主路径：搜索 + 内部库校验（2.1a）
│  1. 主动搜索 Dribbble/Behance/Awwwards 获取实时灵感
│  2. 用 inspirations/ 预收集参考作为基线对照
│  3. 用 aesthetic-library/archetypes/ 补充具体参数值
│  4. 用 aesthetic-library/palettes/ 校验配色专业度
│  5. 用 aesthetic-library/patterns/ 确认布局范式有成熟先例
│
└─ NO → 备用路径：纯内部库匹配（2.1b）
   1. 从 inspirations/ 按视觉特质匹配预收集的高质量参考
   2. 从 aesthetic-library/archetypes/ 按情绪关键词匹配风格原型+具体参数
   3. 从 aesthetic-library/palettes/ 选取匹配行业和视觉特质的配色方案
   4. 从 aesthetic-library/compositions/ 选取完整页面组合作为起点
   5. 从 aesthetic-library/patterns/ 选取 section 级视觉范式
   6. 向用户说明："基于内置审美库推荐，非实时搜索结果"
```

### 2.1a 搜索 + 内部库校验（Web search 可用时）

> **不依赖用户提供参考**——vision 自己去找。

1. 根据 Creative Brief 的行业、页面类型、情绪关键词，主动搜索设计平台：
   - **Dribbble**：UI/Web 设计（搜索 `[行业] [页面类型] [风格关键词] web design`）
   - **Behance**：品牌/视觉设计（搜索品牌展示、视觉系统相关）
   - **Awwwards**：创意网站（搜索获奖作品）
   - **Pinterest**：情绪灵感（搜索情绪关键词对应的视觉方向）
   - 详细搜索策略见 [`references/mood-board-method.md`](mood-board-method.md) §6

2. **筛选高质量参考**（不是随便搜到什么都用）：
   - 点赞/收藏量高（Dribbble ≥500 likes，Behance Featured/Appreciated）
   - 来自认证设计师或知名设计工作室
   - 视觉完成度高（不是草图或概念稿）
   - 可执行（不过度依赖视频/3D/WebGL 等高复杂度技术）

3. 从筛选后的 3-5 个参考中，用 `mood-board-method.md` §3 的提取协议提取视觉 DNA

4. **内部库校验**（搜索结果 + 内部库交叉验证）：
   - 读 [`aesthetic-library/inspirations/curated-references.md`](aesthetic-library/inspirations/curated-references.md)，用预收集参考作为质量基线
   - 读 [`aesthetic-library/archetypes/archetype-params.md`](aesthetic-library/archetypes/archetype-params.md)，用原型参数补充搜索结果中缺少的具体 CSS 值
   - 读 [`aesthetic-library/palettes/industry-palettes.md`](aesthetic-library/palettes/industry-palettes.md)，验证配色方案的对比度和专业度
   - 读 [`aesthetic-library/patterns/section-patterns.md`](aesthetic-library/patterns/section-patterns.md)，确认布局选择有成熟范式

### 2.1b 纯内部库匹配（Web search 不可用时）

> 无 web search 不等于降质——内部审美库提供经过验证的具体参数，质量有保证。

1. 读 [`aesthetic-library/inspirations/curated-references.md`](aesthetic-library/inspirations/curated-references.md)，按视觉特质匹配预收集的高质量参考（含视觉 DNA）
2. 按 Creative Brief 的情绪关键词，在 `style-vocabulary.md` 风格选择速查表中初筛原型
3. 读 [`aesthetic-library/archetypes/archetype-params.md`](aesthetic-library/archetypes/archetype-params.md)，获取匹配原型的**具体视觉参数**（标杆分析 + CSS 值 + 配色模板 + 排版参数 + 间距体系 + 形状纹理）
4. 读 [`aesthetic-library/palettes/industry-palettes.md`](aesthetic-library/palettes/industry-palettes.md)，按视觉特质 + 行业筛选配色方案
5. 读 [`aesthetic-library/compositions/page-compositions.md`](aesthetic-library/compositions/page-compositions.md)，找到匹配的完整页面组合作为起点
6. 用以上具体参数构建 3 个 Direction Card

### 2.2 与风格原型匹配或构建自定义风格

4. 将提取的视觉 DNA 与 `style-vocabulary.md` 中的原型对照：
   - **高匹配**：直接使用原型作为骨架，参考作品补充细节
   - **部分匹配**：混合 2 个原型（见 `style-vocabulary.md` 混合风格指导）
   - **无匹配**：标注为"自定义风格"，用 Visual DNA 参数模板描述（见 `style-vocabulary.md` 自定义风格章节）

### 2.3 生成 Direction Card

5. 为用户生成 3 个方向：

```markdown
### Direction A：[风格名] — [中文名]

**灵感来源**：
| 参考 | 来源 | 提取什么 | 丢弃什么 |
|------|------|---------|---------|
| [作品名/设计师] | Dribbble/Behance | [布局/配色/动效...] | [品牌专属元素] |

**情绪匹配**：[为什么这个方向适合 Brief 的情绪关键词]

**视觉草图**：
- 配色：[主调 + 强调色方向]
- 排版：[字阶策略——如"Impact scale, 72/36/18"]
- 布局：[网格策略——如"全出血 Hero + 收敛主体"]
- 动效：[动效语言——如"staggered reveal on scroll"]
- 纹理：[有/无——如"微妙 grain overlay"]

**AG 兼容度**：[高/中/低——需要多少 TOKEN_ESCAPE]
**风险点**：[可能与 AG 红线的张力]
```

6. **公开输出 3 张 Direction Card**，请用户选择

### 2.4 生成 3 选 1 可视化设计稿（必做）

> 光有文字 Card 不够直观。**同时画一张并排稿**，让用户看到 3 个方向的真实样子再选。

1. 读 [`references/html-mockup-protocol.md`](html-mockup-protocol.md)（若未读）
2. **按协议话术问用户用哪种工具**：独立 HTML / Pencil（3 选 1 对比默认推荐 HTML，一屏并排更快）
3. 按所选工具出并排稿（HTML → `.design-mockups/<page-name>-<date>/directions.html`；Pencil → 一个画板 3 栏）：
   - 横向 3 栏，每栏一个 Direction 的微缩真实稿（hero 区 + 一个内容区块示意）
   - 每栏用该方向的配色/排版/布局参数**真实渲染**，挂真实 token，一眼看出差异
   - 每栏顶部标 `Direction A/B/C + 风格名`
4. 告诉用户稿的路径/截图，对照文字 Card 一起看

**例外**：用户明确说"不用出预览 / 直接给方向就行" → 跳过本步，只给文字 Card。

**⚠️ 必须用户确认**：

```markdown
请选择视觉方向：

1. **Direction A** — [风格名]：[一句话特征]
2. **Direction B** — [风格名]：[一句话特征]
3. **Direction C** — [风格名]：[一句话特征]

回 "选 A" / "选 B" / "选 C" / "混合 A+B" / 或提出修改意见。
```

收到用户明确选择前，**禁止进 Step 3**。

### 兜底：搜索无理想结果

如果 2.1a 路径中设计平台搜索结果质量不足：
1. 降级到 2.1b 纯内部库匹配路径
2. 补充读 `mood-board-method.md` §5（无参考时的关键词交叉法）
3. 向用户说明："未找到足够高质量的参考，以下方向基于内置审美库推荐"
