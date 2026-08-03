# Sigi Design Skills 重构设计文档

> 日期：2026-08-03
> 状态：待 review
> 范围：整套 skills 的重命名 + 结构精简 + 易用性增强

---

## 1. 背景与动机

现有 `ag-design-skills` 是 6 个协作 skill 的设计工具链。经实地盘点与业界对标（Anthropic superpowers、Vercel skills），发现四类问题：

**A. 命名不表达触发时机**
`compass / craft / arbiter` 是隐喻名词（罗盘/工艺/仲裁者），模型无法从名字判断何时该用。

**B. 接口体系半数是死的**
README 声称 8 个跨 skill 接口，实测：

| 接口 | 状态 | 证据 |
|------|------|------|
| 接口 4 arbiter→craft | **死** | `craft/SKILL.md:205-221` Step 1.5 无任何调 arbiter 逻辑 |
| 接口 5 compass↔arbiter | **死** | compass 处理冲突方式是"让用户决策"，从不调 arbiter |
| 接口 1 compass→craft | **半死** | craft 全文零处提及 compass 输入格式 |
| 接口 3 audit→arbiter | **弱** | arbiter 接收方表格未列 audit 字段 |
| Design Log 机制 | **近死** | 106 行模板，全仓库仅 1 处读取，0 处写入 |
| 自演化机制 | **纯装饰** | 3 处表格描述，无脚本、无触发点、无写入路径 |

**C. arbiter 无自动调用点**
`craft/SKILL.md` 全文提到 arbiter 仅 2 次，且都只是引用其 `aesthetic-recipes.md` **文件**，从未把 arbiter 当 skill 调用。它完全依赖用户手动触发。

**D. 违反 Anthropic 官方 skill 规范**

| 规范 | 出处 | 现状 |
|------|------|------|
| description 禁写流程摘要 | `writing-skills:150-172` | craft/vision **均中招** |
| body < 500 行 | `anthropic-best-practices:241` | craft 630、vision 626 |
| 名字表达"在做什么" | `writing-skills:268-276` | 6 个全是隐喻名词 |

官方实测结论：description 写流程摘要会导致模型**照 description 走而跳过正文**——一个写"code review between tasks"的 description 让模型只做了一次 review，尽管正文流程图明确要求两次。

---

## 2. 命名方案

前缀统一为 `Sigi-design-`，采用短词（单词）风格。

| 新名 | 原名 | 职责 |
|------|------|------|
| `Sigi-design` | — （新增） | 入口/路由：索引 + 优先级 + Red Flags |
| `Sigi-design-scope` | ag-design-compass | 需求分析 → UI 模块规格表 |
| `Sigi-design-vision` | ag-design-vision | 视觉创意 → Vision Spec |
| `Sigi-design-build` | ag-design-craft | Recipe-first 生成 UI 代码 |
| `Sigi-design-audit` | ag-design-audit + arbiter 的仲裁流程 | 合规审计 + 设计仲裁（arbiter 的 3 个 reference 按消费方分散归位，见 §3.1） |
| `Sigi-design-system` | ag-design-system | 设计基座（token + 组件 + 清单） |

**决策记录**：
- 曾考虑全动名词式（`exploring-visual-direction`），因加前缀后过长而放弃
- `vision` / `audit` / `system` 保留原词
- `compass → scope`、`craft → build`：更直白，减少隐喻

---

## 3. 结构改造

### 3.1 arbiter 按真实消费方拆解归位

不是整体塞进 audit，而是按各 reference 的**实际引用关系**归位：

| 文件 | 行数 | 实际消费方（实测） | 去向 |
|------|------|-------------------|------|
| `design-constitution.md` | 184 | vision(4处) + arbiter 自身 | → **audit**（红线是审计判据） |
| `aesthetic-recipes.md` | 314 | craft(2处) + arbiter 兜底 | → **build**（生成时查配方） |
| `token-selection.md` | 210 | vision(1处) | → **system**（本质是 token 规则） |

arbiter 的 SKILL.md（257 行）中的**决策仲裁流程**并入 audit，成为其"设计决策"模式。

**收益**：消除接口 3/4/5 三个死接口；每个 reference 与其消费方同目录，引用路径变短。

### 3.2 接口从 8 个砍到 3 个，产物文件当总线

参照 superpowers 的做法——**不画全局拓扑图**，每个 skill 只知道自己的单一下游。

```
scope  → docs/sigi-design/specs/<date>-<topic>.md   → build 读
vision → docs/sigi-design/vision/<date>-<topic>.md  → build 读
build  → 代码                                       → audit 审计
```

**关键机制**：每份产物**头部自带下游指令**，例如 scope 产出的规格表开头写：

```markdown
> 下一步：用 Sigi-design-build 按本规格表生成代码。
> 若需视觉创新，先用 Sigi-design-vision 出 Vision Spec。
```

这样即使换会话、换人打开文件，链路也不断。这是 superpowers 防止接口悬空的核心手法（`writing-plans:47-61`）。

**同时删除**：
- README 的 8 接口全景图（图越全越容易出死接口）
- `cross-skill-protocol.md` 中 106 行 Design Log 模板
- 各 SKILL.md 里重复 3 份的接口定义（vision:554-604 与 protocol:105-163 逐字重复）

### 3.3 每个 skill 写死单一 terminal state

在每个 SKILL.md 末尾加一节，明确"我之后只能去哪"。以 scope 为例：

```markdown
## 交付与下一步

产物：`docs/sigi-design/specs/<date>-<topic>.md`

**唯一下游**：Sigi-design-build。不要在此直接写代码，不要跳过 build 自行实现。
```

五个 skill 的 terminal state 定义：

| skill | 产物 | 唯一下游 |
|-------|------|---------|
| `Sigi-design-scope` | `docs/sigi-design/specs/<date>-<topic>.md` | build（若标注"视觉创新: 是"则先经 vision） |
| `Sigi-design-vision` | `docs/sigi-design/vision/<date>-<topic>.md` | build |
| `Sigi-design-build` | 项目代码 | audit |
| `Sigi-design-audit` | PASS / FAIL 报告 | 终点。FAIL 时回 build 修复 |
| `Sigi-design-system` | 无产物（被动查询的数据源） | 无下游 |

### 3.4 description 重写

删掉所有流程摘要，改为 `Use when...` 结构。示例：

**改前**（vision，中招）：
```
创意视觉策略 skill。...核心机制：AI 主动搜索设计灵感 → 风格方向探索（3 选 1）
→ 深化 Vision Spec（7 章节）→ 合规桥接 → 交付 craft。
触发词：Landing page、营销页、...（21 个触发词，含"好看一点""精致一些"）
```

**改后**：
```
Use when a page needs aesthetic innovation beyond standard components —
before writing any UI code. 触发：Landing page / 营销页 / 品牌页 / 视觉风格 /
视觉冲击力 / 设计感。不用于：纯组件修改、Patch Mode、纯后端任务。
```

要点：
- 删除流程摘要（防止模型照 description 走）
- vision 触发词 21 → 6 个，删掉"好看一点""精致一些"等与 build 抢触发的泛化口语
- 保留已有的"不用于"（这点原本就做得比 superpowers 好）
- 加 `before X` 时序后缀，同时定义触发点和顺序

### 3.5 主文件瘦身至 500 行内

| 文件 | 现状 | 目标 |
|------|------|------|
| build (原craft) | 630 | ≤300 |
| vision | 626 | ≤300 |

正文只保留：核心原则 + Iron Law + Checklist + 流程图 + "何时读哪个 reference"。重内容下沉到 references/。

### 3.6 删除零引用死资产

| 资产 | 行数 | 引用数 | 删除时的同步清理 |
|------|------|--------|-----------------|
| `vision/references/examples/` | 390 | 0（vision SKILL.md:625 只在自演化表提到"产出到 examples/"，非读取） | 同步删 vision SKILL.md:625 那行 + README 目录树对应行 |
| `ag-design-system/agents/openai.yaml` | — | 0 | 无 |
| 各 SKILL.md frontmatter `version:` 字段 | 5 处 | Claude Code 不消费 | 5 个文件各删一行 |

> **注意**：`compass/references/examples/` 有真实读取（compass SKILL.md:19、:40），**保留不删**。本条只删 vision 的。

### 3.7 aesthetic-library 索引化

4855 行（5 个文件 + README）仅被浅引用 10 次，占 vision 全部 references 的绝大部分。改为 `index.md` + 按需加载，不再期望整体进上下文。

---

## 4. 新增能力

### 4.1 入口 skill `Sigi-design`（~80 行）

参照 `using-superpowers` 范式，只做路由，不做业务：

1. **5 个 skill 一句话索引** — 什么需求进哪个
2. **优先级规则** — process skill（scope/vision）优先于 implementation（build），audit 是 gate 不可跳
3. **Red Flags 表** — 堵死"这个简单不用走流程""直接写代码吧"这类模型自我说服

### 4.2 触发测试用例 `tests/skill-triggering/`

每个 skill 2-3 条**不提 skill 名**的自然中文 prompt，验证能否正确触发。参照 `superpowers/tests/skill-triggering/`。

重点覆盖：
- vision vs build 的触发边界（"帮我设计个好看的页面"该进谁）
- audit 的压力场景（"这次先跳过审计吧"）

### 4.3 各 skill 输出模板文件

把内联在 SKILL.md 里的输出格式拆成独立模板（目前只有 compass 有 `output-template.md`）：
- `Sigi-design-vision/references/vision-spec-template.md`
- `Sigi-design-build/references/recipe-template.md`
- `Sigi-design-audit/references/audit-report-template.md`

---

## 5. 迁移方案

### 5.1 install.sh 的软链问题

现有 `scripts/install.sh` 把 6 个 skill **软链**到 `~/.claude/skills/`。改名后旧软链会变成**悬空链接**，必须处理：

```bash
# 新增：清理旧版 ag-design-* 悬空软链
for old in ag-design-system ag-design-compass ag-design-vision \
           ag-design-craft ag-design-arbiter ag-design-audit; do
  [ -L "$SKILLS_DIR/$old" ] && rm "$SKILLS_DIR/$old"
done
```

同时更新 `SKILLS=()` 数组为新的 5 个名字 + 入口 skill。

### 5.2 目录改名用 `git mv`

保留 git 历史，便于回溯。

### 5.3 README 重写

- 删除 8 接口表和全景拓扑图
- 更新所有 skill 名
- 新增 QUICKSTART 章节（目前"快速开始"在 207 行，太靠后）

---

## 6. 分阶段执行

每阶段独立提交，可随时叫停。

| 阶段 | 内容 | 风险 |
|------|------|------|
| **1** | 目录改名（git mv）+ arbiter 拆解归位 + install.sh 迁移逻辑 | 结构调整，风险集中 |
| **2** | description 重写 + 主文件瘦身 + 删死资产 | 收益最大（触发准确度） |
| **3** | 入口 skill + 触发测试 + 输出模板 | 增量增强，低风险 |

---

## 7. 验收标准

- [ ] 5 个 skill + 1 入口全部改名完成，`git mv` 保留历史
- [ ] arbiter 3 个 reference 按消费方归位，无遗留引用路径
- [ ] 全仓库无 `ag-design-` 残留引用（README/SKILL.md/scripts 全覆盖）
- [ ] 每个 SKILL.md 的 description 无流程摘要
- [ ] build / vision 主文件 ≤300 行
- [ ] 每个 SKILL.md 末尾有"交付与下一步"单一 terminal state
- [ ] install.sh 能清理旧软链并正确安装新名字
- [ ] 触发测试用例能跑，vision/build 边界不混淆

---

## 8. 明确不做的事

- **不改设计系统本身**：tokens.css、组件规范内容不动，只动组织方式
- **不改上一轮刚加的可视化设计稿协议**：只跟着改名和路径
- **不做向后兼容层**：不保留 `ag-design-*` 别名（用户量可控，一次切干净）
- **不引入外部依赖**：不加构建工具、不加运行时
