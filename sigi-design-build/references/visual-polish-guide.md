# 视觉精修指南 — 从 70 分到 90 分

> aesthetic-recipes.md 保证"不出错"（70 分安全线），本文件教**怎么做好看**——在 AG 的克制调色板里创造高级感。
> 用于 craft Step 3 代码生成 + Step 3.5 Polish Pass。

---

## 1. 对比梯度：让层级"呼吸"

AG 调色板是近乎单色的——不能靠色彩制造视觉焦点，必须靠**对比梯度**。

### 1.1 三级文本色的正确用法

不要把三级文本色当"深浅灰三种颜色"——它们是**信息权重工具**：

```
var(--color-text-primary)    → 此刻需要读的     → 标题、数据值、操作标签
var(--color-text-secondary)  → 读了有帮助的     → 描述、辅助标注、时间戳
var(--color-text-muted)      → 不读也没关系的   → placeholder、装饰性文案、禁用态
```

**精修技巧**：同一个卡片内，`primary` 元素不超过 2 个。如果一个卡片有 3 个 `primary` 元素，说明层级没做好——降一个到 `secondary`。

### 1.2 字号+字重的"阶梯法"

不要每层都改字号。精修做法是**交替使用字号和字重**制造微妙层次：

```
✅ 精修做法                    ❌ 平庸做法
28px / 600  页面标题            28px / 600  页面标题
15px / 500  卡片标题(medium)    22px / 600  卡片标题
15px / 400  正文                15px / 400  正文
13px / 400  辅助                13px / 400  辅助
```

关键：卡片标题和正文**同字号不同字重**，比改字号更精致。

### 1.3 数据值的视觉"拉力"

KPI 大数字需要视觉"拉力"——让数字在页面上"跳出来"：

```css
/* 精修：负字距 + tabular-nums 让大数字紧凑有力 */
.kpi-value {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;  /* 比默认 -0.01em 更紧 */
}
```

---

## 2. 阴影与层次感

AG 的 shadow 系统很克制，但正确使用能制造"浮起"的高级感。

### 2.1 阴影选择决策

```
元素是否需要"浮起"？
│
├─ 常驻内容（KPI 卡、列表项）
│  → 不用阴影，用 border: 1px solid var(--color-border-subtle)
│  → 干净、安静
│
├─ 需要与背景区分（独立卡片、内容区块）
│  → var(--shadow-card)：微妙的底部阴影
│  → 不要用 --shadow-modal，太重
│
├─ Hover 提升效果
│  → 从 var(--shadow-card) 升级到 var(--shadow-whisper)
│  → 配合 translateY(-1px) 制造"微浮"
│
└─ 弹层/下拉
   → var(--shadow-modal)
```

### 2.2 Hover 提升——"呼吸"效果

design-rules 说"hover 仅改背景色"，但**可点击卡片**可以有微浮效果：

```css
/* 可点击卡片的 hover 精修 */
.card-clickable {
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.card-clickable:hover {
  box-shadow: var(--shadow-whisper);
  transform: translateY(-1px);
}
```

**注意**：这不违反 design-rules——"hover 仅改背景色"针对的是按钮/列表项，可点击**卡片**的微浮是 AG 的设计签名。

---

## 3. 留白节奏：不均匀才高级

均匀间距 = 枯燥。精修的留白有**节奏变化**。

### 3.1 "紧-松-紧"三段节奏

```
页面标题行        padding: var(--space-6)         ← 松（呼吸区）
KPI 卡片区        gap: var(--space-4)             ← 紧（信息密集）
区块间距          margin: var(--space-8)          ← 松（分段）
表格区            row gap: var(--space-2)         ← 更紧（扫描效率）
底部操作栏        padding: var(--space-4)         ← 中（收尾）
```

### 3.2 标题与内容的"断裂间距"

标题和内容之间的间距要**小于**内容块之间的间距：

```
✅ 精修                        ❌ 平庸
区块标题                       区块标题
  ↕ 12px (--space-3)             ↕ 24px (--space-6)
内容行                         内容行
  ↕ 24px (--space-6)             ↕ 24px (--space-6)
区块标题                       区块标题
```

标题"粘"在内容上方（12px），内容块之间"断开"（24px）——视觉上自动分组。

### 3.3 "内紧外松"法则

组件内部紧凑（`--space-2` ~ `--space-3`），组件之间宽敞（`--space-4` ~ `--space-6`），页面边距最宽敞（`--space-6` ~ `--space-8`）。

三层间距形成**从密到疏**的梯度，视觉上会有"层次感"。

---

## 4. 色调分层：单色调色板的丰富感

AG 主色调是灰色系。但灰色也有**冷暖和深浅**之分。

### 4.1 背景层级

不要所有背景都用同一个白色：

```
页面背景     var(--color-bg)                纯白
卡片背景     var(--color-surface)            微灰（和纯白有 0.5-1% 的明度差）
内嵌区域     var(--color-surface-secondary)  稍深灰（代码块、引用框）
```

三个几乎一样的白灰，肉眼看不出差异，但**放在一起**就会产生微妙的层次感。

### 4.2 边框的"隐形"技巧

精修的边框不应该"看得到"——应该只是"感觉到有结构"：

```css
/* 精修：几乎看不见但有结构 */
border: 1px solid var(--color-border-subtle);  /* 和背景只差几个色阶 */

/* 不是精修：明显的线 */
border: 1px solid var(--color-border-strong);  /* 过于显眼，切割视觉 */
```

`--color-border-subtle` 在大多数场景下优于 `--color-border-strong`。只在需要强调分隔的地方（表格表头、模块分割）用 strong。

---

## 5. Focal Point 编排

每个页面应该有**一个**视觉焦点。不是"所有东西都重要"。

### 5.1 确定焦点

```
页面类型           焦点在哪                     怎么强调
Dashboard         KPI 数字区                   display 排版 (36px) + 顶部位置
数据浏览器         搜索栏                       320px 宽度 + 页面最上方
对话界面          最新一条消息                  底部位置 + 自动滚动
详情页            实体名称/核心信息             page-title 排版 + 顶部全宽
表单              提交按钮                     `<Button>` primary + 底部固定位置
```

### 5.2 弱化非焦点

焦点确定后，其余元素**必须降权**：
- 次要按钮用 `ghost` 或 `secondary`，不用 `primary`
- 辅助信息用 `--color-text-muted`
- 不相关的装饰直接删掉

### 5.3 "唯一亮色"法则

AG 是近乎无色的界面。当页面出现**一处彩色**时，它自动成为焦点：

- Agent 状态点（绿色 pulse）→ 正在运行的视觉焦点
- 错误状态标签（红色）→ 需要注意的视觉焦点
- 趋势箭头（绿/红）→ 数据变化的视觉焦点

**不要**让多个彩色元素同时竞争注意力。如果一个页面有 4 个彩色状态标签，考虑把非当前关注的状态改为 `default`（灰色）。

---

## 6. 动效规范

AG 的动效原则：**功能性 > 装饰性**。动效是为了帮助理解状态变化，不是为了"看起来酷"。

### 6.1 Transition 配方

```css
/* 标准过渡：所有可交互元素 */
transition-duration: 0.15s;         /* 快，不拖沓 */
transition-timing-function: ease;   /* 自然曲线 */

/* 展开/折叠面板 */
transition-duration: 0.2s;
transition-timing-function: ease-out;

/* 页面切换/模态框 */
transition-duration: 0.25s;
transition-timing-function: ease-in-out;
```

### 6.2 必须有动效的场景

| 场景 | 动效 | 时长 |
|------|------|------|
| 可点击卡片 hover | box-shadow + translateY(-1px) | 0.2s |
| 按钮 hover | background-color | 0.15s |
| 折叠面板展开 | height / opacity | 0.2s |
| Toast 出现 | translateY + opacity | 0.25s |
| Agent 状态点 running | pulse 动画 | 1.5s infinite |
| 进度条填充 | width | 0.3s ease-out |

### 6.3 不要加动效的场景

- 页面初始渲染（不要 fade-in 整个页面）
- 数据表格行（行太多，动效会卡）
- 导航切换（直接切换，不要 slide）
- 状态标签变色（直接变，不要渐变）

---

## 7. Polish Pass 检查清单

> 在 Step 3.5 质量自检之后、Step 3.6 Token 校验之前执行。

| # | 检查项 | 精修方向 |
|---|--------|---------|
| 1 | 页面有一个明确的视觉焦点吗？ | 确认 focal point，弱化其余 |
| 2 | 文本层级用了 ≥2 个维度（字号+字重+颜色）吗？ | 补充缺失维度 |
| 3 | 同一卡片内 primary 色文本 ≤ 2 个吗？ | 降级多余的 primary |
| 4 | 间距有"紧-松"的节奏变化吗？ | 标题粘内容，内容块断开 |
| 5 | 可点击卡片有 hover 微浮效果吗？ | 加 shadow + translateY transition |
| 6 | 大数字有 tabular-nums + 负字距吗？ | 加 font-variant-numeric |
| 7 | 背景用了 bg/surface/surface-secondary 层次吗？ | 不要全用同一个白色 |
| 8 | 边框优先用 subtle 而非 strong 吗？ | 边框"看不到但有结构" |
| 9 | 页面最多 1-2 处彩色元素吗？ | 减少色彩竞争 |
| 10 | 可交互元素都有 transition 声明吗？ | 补 0.15-0.2s ease |
