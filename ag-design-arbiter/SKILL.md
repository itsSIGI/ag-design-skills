---
name: ag-design-arbiter
version: 1.0.0
description: >
  设计决策仲裁。当用户需要做 UI/UX 方案取舍、审查现有设计、比较多个方案、或需要
  设计决策指导时使用。触发词："帮我选方案"、"这两个设计哪个好"、"评审这个设计"、
  "设计决策"、"design arbiter"、"设计仲裁"、"该怎么选"。
  不用于：生成 UI 代码（用 ag-design-craft）、拆解需求（用 ag-design-compass）、
  代码审计（用 ag-design-audit）。
---

# Design Arbiter — 设计决策仲裁

## 核心原则

> **先判红线，再谈美观。所有裁决必须引用设计宪法条款编号。**

1. **信任度 > 任务效能 > 无障碍 > 美观**：视觉表现不能凌驾于透明度、任务完成率和可访问性之上
2. **语义优先于数值**：先定义组件承担的语义角色，再映射颜色、层级、状态和 token
3. **一致性优先于局部新奇**：相同语义在跨页面、跨设备、跨流程中应保持同等含义
4. **默认走 token**：颜色、间距、圆角、字体、阴影优先映射到 AG 设计 token；硬编码必须显式声明
5. **裁决必须可执行**：每个决策必须能直接映射到 shadcn/AG 组件或 `var(--*)` token

---

## Step 0: 定义决策对象

**输入**：用户要设计、修改、评审或比较的界面方案

**操作**：
1. 确认这是"设计决策"任务（不是纯实现或纯需求）
2. 明确：主任务、次级任务、关键状态、高风险动作、目标设备
3. 给每个核心元素标注语义角色：主动作、次动作、危险动作、提示信息、容器、装饰
4. 如果用户提供了截图/Figma，先识别 UI 元素并映射到 shadcn/AG 组件体系

**输出**：场景摘要（主任务、关键状态、风险点、设备范围、语义角色列表）

---

## Step 1: 红线筛查

**输入**：Step 0 的场景摘要 + [references/design-constitution.md](references/design-constitution.md) 的红线

**操作**：
1. 逐项检查所有一票否决红线（§2）
2. 命中任何红线 → 立即停止，输出 `REJECT` + 原因 + 最小修复项
3. 未命中 → 输出 `PASS_RED_LINE_SCAN`，继续 Step 2

**输出**：`PASS_RED_LINE_SCAN` 或 `REJECT`（带具体红线条款编号和修复建议）

---

## Step 2: 方案取舍

**输入**：通过红线的一个或多个方案 + [references/design-constitution.md](references/design-constitution.md) 的公理与原则

**操作**：

1. 按固定优先级比较：**Trust → Task Efficacy → Accessibility**，不可倒序
2. 若方案更好看但任务链路更长、风险更难理解或可达性更差 → 放弃该方案
3. 逐项检查补充原则：
   - 语义优先（§3.2）
   - 状态等价（§3.3）
   - 跨场景一致（§3.4）
   - 复杂度预算（§3.5）
   - 空间弹性（§3.7）
4. 每个任务区块强制只保留一个主操作
5. 高风险行为必须有二次确认或撤销机制
6. **审美食谱参考**：对于"该选什么"类决策，查阅 [references/aesthetic-recipes.md](references/aesthetic-recipes.md) 提供具体配方
7. **业务约束评估**（在以上设计维度之后考虑）：
   - **工期影响**：方案 A 比方案 B 多用多少开发时间？差异是否值得？
   - **技术债**：方案是否引入长期维护负担？
   - **开发复杂度**：是否需要新依赖/新技术栈？团队是否熟悉？
   - 业务约束**不能推翻** Trust/Task/A11y 维度的结论，但在同维度平手时作为加权项

**输出**：被选方案 + 选择理由（按优先级说明）+ 被否方案的否决理由

---

## Step 3: 映射到工程表达

**输入**：Step 2 的被选方案 + [references/token-selection.md](references/token-selection.md) 的 token 规则

**操作**：

1. **颜色映射**：按优先级选择 token
   - 优先：语义变量（`--color-text-primary`, `--color-surface` 等）
   - 其次：状态变量（`--color-status-*`, `--color-agent-*`）
   - 最后：原始色阶（仅装饰用途）
2. **组件映射**：
   - 先查 `components-v2.md`，确认有无现成 shadcn/AG 组件
   - 有 → 直接使用
   - 无 → 查 `decision-tables.md` 选开源组件 + token 化包装
3. **排版映射**：
   - 先选语义排版组件（`<Heading>`, `<Body>` 等）
   - 字重上限 600，禁止 700
4. **间距/圆角/阴影**：全部从 token 取值，禁止自定义
5. **焦点/选中态**：中性色（`--color-focus-ring`），非品牌蓝
6. 若 token 无法满足极端场景，必须声明 `TOKEN_ESCAPE: [具体原因]`

**输出**：可实现的设计决策说明（语义层级 + 交互状态 + token 映射 + 必要豁免）

---

## Step 4: 验收并形成结论

**输入**：Step 3 的设计决策说明 + [references/design-constitution.md](references/design-constitution.md) 的验收协议

**操作**：

1. **五维验收**：
   - **Trust**：关键信息完整可见？用户能轻松执行反向选择？
   - **Task Efficacy**：主路径足够短？次级任务不干扰主任务？
   - **Accessibility**：对比度 ≥ 4.5:1？状态不依赖单一颜色？键盘可达？
   - **Consistency**：同语义跨页面一致？
   - **Recovery**：误操作有清晰恢复路径？

2. **AG 专项验收**：
   - 品牌蓝/绿只在三处（链接 hover、agent 状态点、代码高亮）
   - 焦点环/选中态使用中性色
   - 字重 ≤ 600
   - 图标来自白名单库（MingCute / Lucide），单项目单库（shadcn 自带 Lucide 豁免）

3. **判定输出**：
   - `PASS`：全部通过
   - `CONDITIONAL_PASS`：无红线但有可修复缺陷 → 附整改清单
   - `REJECT`：命中红线或关键缺陷 → 指出阻塞项

**输出**：最终裁决 + 精简结论（设计决定、阻塞项、整改项、实现注意点）

---

## Step 5: 自检与交付

**输入**：完整裁决结论

**操作**：
1. 自检是否跳过了红线扫描、优先级比较、token 映射或验收中的任一步
2. 自检是否出现"为了更好看/更特别/更有冲击力"而牺牲主任务或可访问性的合理化
3. 若发现遗漏 → 回到对应 Step 重做（最多 2 轮）
4. 达到轮次仍无法确定 → 向用户明确上报冲突点，不私自裁决

**输出**：可交付的最终判断，或带冲突说明的上报结论

---

## 快速决策模式

对于简单的"A 还是 B"选择题，可跳过完整流程，按以下顺序速判：

1. 有没有命中红线？→ 有则直接否
2. 哪个 Trust 更高？→ 信息更透明的胜出
3. 哪个任务链路更短？→ 步骤更少的胜出
4. 哪个更符合现有设计系统？→ 一致性胜出
5. 以上都平手 → 查 [references/aesthetic-recipes.md](references/aesthetic-recipes.md) 按审美配方选

---

## 探索型决策模式

> 当用户的问题不是"A 还是 B"，而是"要不要用这个模式"、"这里该怎么做"等**没有现成候选方案**的上游问题时使用。

### 触发条件

- 用户没有给出具体方案，而是描述了一个设计困惑
- 问题类型："需要弹窗吗"、"这里用表格还是卡片"、"要不要拆成多个页面"
- 从 audit 回路过来的设计决策问题（标注 `→ arbiter`）

### 操作

1. **场景建模**：用 Step 0 的方法结构化场景（主任务/关键状态/风险点）
2. **生成候选方案**：基于场景至少生成 2-3 个可行方案（不能只给 1 个），每个标注：
   - 方案描述（一句话）
   - 对 Trust/Task/A11y 的影响
   - 工期估算（轻量/中等/重量）
   - 在 AG 设计系统中的实现路径（shadcn/AG 组件 / 需要开源组件）
3. **走标准 Step 1-4 流程**评估这些自生成的候选方案
4. 输出**推荐 + 理由 + 替代方案**

---

## 跨 Skill 协作接口

### arbiter 作为接收方

| 来源 | 触发 | arbiter 输入 | arbiter 输出 |
|------|------|-------------|-------------|
| **craft Step 1.5** | recipe 有多选一槽位 | 候选方案 + 业务场景描述 | 推荐方案 + 理由 |
| **audit FAIL** | 审计发现设计决策问题（标注 `→ arbiter`） | 违规代码 + 症状描述 | 设计决策裁决 + 修改方向 |
| **compass Step 5** | 多条策略冲突 | 策略列表 + 冲突描述 | 策略优先级排序 |
| **vision Step 4** | 创意方向与 AG 红线有张力 | Creative Intent + 冲突点 + TIER + 提议方案 + 回退方案 | 合规裁决（见下方接口 8 格式） |

### arbiter 作为发起方

| 目标 | 触发 | arbiter 输出 | 目标 skill 操作 |
|------|------|-------------|----------------|
| **craft** | arbiter 裁决了组件/布局方案 | 裁决结论 + token 映射 | craft 直接用于 recipe |
| **audit** | arbiter 裁决涉及合规边界 | TOKEN_ESCAPE 声明 | audit 在该项豁免检查 |

### 接口 8：vision ↔ arbiter（Creative Compliance Check）

当 `ag-design-vision` 在 Step 4 发现创意方向与 AG 红线有张力时，向 arbiter 发起合规查询。

**vision → arbiter 查询格式**：

```markdown
## Vision → Arbiter 合规查询

- **Creative Intent**: [想做什么]
- **Potential Conflict**: [哪条红线/原则有张力]
- **TIER Zone**: [TIER_2 / TIER_3]
- **Proposed Resolution**: [TOKEN_ESCAPE 声明 + 理由]
- **Fallback if Rejected**: [被否决后的回退方案]
```

**arbiter → vision 裁决格式**：

```markdown
## Arbiter → Vision 合规裁决

- **Decision**: APPROVE / APPROVE_WITH_CONDITIONS / REJECT
- **Conditions**: [具体约束，如有]
- **TIER Confirmation**: [确认 TIER 分类]
- **TOKEN_ESCAPE Approved**: [批准的 ESCAPE 清单 + 作用域限制]
```

**裁决规则**：
- TIER_3 区域的创意自由度最高，只要不违反红线（§2）通常 APPROVE
- TIER_2 区域需要更严格审查，创意必须在 AG 组件变体范围内
- TIER_1 区域不接受创意偏离——vision 不应对 TIER_1 区域提出 TOKEN_ESCAPE
- REJECT 时必须提供具体的回退建议

### 数据传递格式

arbiter 的裁决结论统一用以下格式，方便其他 skill 消费：

```markdown
## Arbiter Verdict

- **决策点**：[一句话描述]
- **裁决**：[方案名 / REJECT]
- **维度评分**：Trust [高/中/低] | Task [高/中/低] | A11y [高/中/低]
- **业务约束**：[工期影响 / 技术债评估]
- **token 映射**：[关键 shadcn/AG 组件 / var(--*)]（如适用）
- **豁免声明**：[TOKEN_ESCAPE 项]（如有）
```

---

## 失败回退

| 情况 | 处理 |
|---|---|
| 用户只给了模糊描述 | 先用 Step 0 结构化场景，再追问关键信息 |
| 两个方案都命中红线 | 都 REJECT，指出各自修复方向 |
| 无法映射到现有 token | 输出 TOKEN_ESCAPE 声明，建议向设计系统补充 |
| 涉及化学科研专业领域 | 参考 design-constitution.md §2.6 化学科研红线 |
