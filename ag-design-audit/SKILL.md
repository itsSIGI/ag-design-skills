---
name: ag-design-audit
version: 1.0.0
description: >
  ag-design-craft 产出代码的独立合规审计 sub-skill。冷启动、单一职责、不被主流程
  上下文污染。由 ag-design-craft Step 4 自动调用，或手动触发："审计这段代码"、
  "audit design-craft output"、"check compliance"。支持三种模式：标准审计（需
  recipe）、独立审计（审计已有代码，无需 recipe）、局部审计（只查指定类别）。
  也支持反向定位模式：当用户提供 Decision Trace + 症状时，精确定位哪个节点出了问题。
  触发词："定位问题"、"trace 反查"、"reverse locate"、"哪一步出错"、
  "只查 Token"、"检查品牌色"、"审计这个文件"。
---

# ag-design-audit

`ag-design-craft` 主流程产出代码的**独立合规审计 sub-skill**。冷启动、单一职责、不被主流程上下文污染。

**为什么独立**：长上下文末段，AI 自检时容易跳步、合理化违规。把审计拆成独立 sub-skill 让它**冷启动一次专注一件事**，不再受主流程压力影响。

**跨 Skill 协作**：审计中发现的设计决策问题（标注 `→ arbiter`）升级到 `ag-design-arbiter`——格式约定见 [`ag-design-craft/references/cross-skill-protocol.md`](../ag-design-craft/references/cross-skill-protocol.md)

---

## 输入

主流程必须把以下两份输入完整传入：

1. **生成代码**：design-craft Step 3 产出的完整组件代码
2. **recipe**：design-craft Step 1 产出的 Locked Recipe 表（slot / 组件类型 / 来源 / shadcn/AG 组件 / token 引用 / 验证来源）

任一缺失 → 拒绝审计，要求补齐后重提。

---

## 操作

逐项过 [`references/checklist.md`](references/checklist.md) 中 7 类审计项：

1. **Recipe 一致性**（最关键）— 代码里所有组件原型必须来自 recipe，无自拼 div、无臆造组件
2. **Token 合规** — 业务层零硬编码（颜色/间距/圆角/阴影/字重全走 token）
3. **品牌色规则** — 蓝/绿只在三处（链接 hover、agent 状态点、代码高亮），焦点环/按钮/选中用中性色
4. **排版规则** — 字重 ≤600，系统字体，图标用白名单库（MingCute / Lucide）单项目单库
5. **布局与容器** — 容器用 `<AgCard>`，无嵌套边框，同层级同 radius
6. **开源组件包装** — 有 token 化包装，未自造视觉值
7. **暗色模式 + 无障碍** — 视觉值走语义 token（data-theme 切换无需改代码），4.5:1 对比度

每条违规要**具体到行号**和**违反的规则名**——抽象描述不算合格审计。

---

## 输出格式

### 通过

```
✅ PASS

Recipe 一致性: ✅
Token 合规: ✅
品牌色规则: ✅
排版规则: ✅
布局与容器: ✅
开源组件包装: ✅
暗色模式 + 无障碍: ✅

代码可输出给用户。
```

### 不通过

```
❌ FAIL — 共发现 N 项违规

[1] Token 合规 · 裸 hex 色值
    位置：line 23
    问题：<span style={{ color: '#667085' }}>
    修正方向：换成 var(--color-text-secondary)

[2] 品牌色规则 · 焦点环使用品牌蓝
    位置：line 45
    问题：outline: 2px solid #123AFF
    修正方向：换成 var(--color-focus-ring)

[3] 排版规则 · font-weight 超限
    位置：line 67
    问题：fontWeight: 700
    修正方向：改为 var(--weight-bold) (600)，需要更强对比改字号或加负字距

——
主流程必须按上述项逐条修正，重新跑本 sub-skill 直到 PASS。
最多 2 轮，2 轮后仍 FAIL → 主流程向用户说明具体冲突并请求人工确认。
```

---

## 不做的事

- ❌ 不重写代码——只指出问题和修正方向，重写是主流程的职责
- ❌ 不校验 shadcn/AG 组件内部样式——这些由 `components/ui/` + `components/ag/` 封装，不可能错
- ❌ 不做设计决策——是否应该用 Donut 还是 Bar 这种问题归 `ag-design-arbiter`
- ❌ 不校验 ECharts option 内部的 hex 值——这是唯一允许裸 hex 的场景

**设计决策回路**：审计中发现的问题如果本质是**设计决策问题**（用了不合适的组件类型、布局模式有争议、语义角色不清晰），在 FAIL 报告中标注 `→ arbiter`，提示主流程将该项升级到 `ag-design-arbiter` 重新评估，而非直接要求修改代码。

---

# 模式 1B：独立审计（审计已有代码）

当需要审计**非 craft 产出的代码**（已有代码库、PR diff、其他人写的代码）时，进入独立审计模式。

## 触发条件

以下任一：
- 用户提供代码 + 说"审计这段代码"但**没有 recipe**
- 用户说"审计这个文件 / 这个 PR / 这段已有代码"
- 代码明显不是来自 craft 流程（没有 Decision Summary、没有 recipe）

## 输入

1. **代码**（必须）：组件代码、文件路径、或 git diff
2. **recipe**（无）：独立审计模式不要求 recipe

## 操作

跳过"Recipe 一致性"检查（第 1 类），执行其余 6 类审计项：

1. ~~Recipe 一致性~~（跳过——无 recipe 可对比）
2. **Token 合规** — 业务层零硬编码
3. **品牌色规则** — 蓝/绿只在三处
4. **排版规则** — 字重 ≤600，系统字体，图标用白名单库（MingCute / Lucide）单项目单库
5. **布局与容器** — 容器用 `<AgCard>`，无嵌套边框
6. **开源组件包装** — token 化包装
7. **暗色模式 + 无障碍** — 语义 token、对比度

## 输出格式

与标准模式相同，但标注 `[独立审计模式 — 无 Recipe 对比]`。

---

# 模式 1C：局部审计

只检查指定类别，跳过其余。

## 触发条件

用户明确指定审计范围：
- "只查 Token 合规"
- "检查一下品牌色使用"
- "看看无障碍有没有问题"

## 操作

只执行用户指定的审计类别。输出时标注 `[局部审计 — 仅检查: Token 合规]`。

其余行为与标准模式相同（具体到行号、给修正方向）。

---

## 失败处理

- **输入不完整**（缺代码或缺 recipe）→ 拒绝，要求补齐
- **第 1 轮 FAIL，第 2 轮仍 FAIL** → 输出 FAIL + 提示主流程"已 2 轮，请向用户求确认"

---

# 模式 2：反向定位（Reverse Locate）

当用户**已经拿到 Decision Trace** 并指出具体症状时，切换到反向定位模式——精确找到 trace 上哪个节点导致了问题。

## 触发条件

同时满足三点才进入反向定位模式：

1. 用户提供了 **Decision Trace 表**（来自 design-craft Step 6 的标准格式）
2. 用户描述了**具体症状**（"X 不对"、"应该是 Y"）
3. 用户使用触发词："定位问题" / "trace 反查" / "reverse locate" / "哪一步出错"

任一缺失 → 提示用户补全。

## 操作

### 第 1 步：症状归类

| 症状类型 | 关键特征 |
|---------|---------|
| **A. 用了不存在的组件** | 引用了 components-v2.md 未定义的组件 |
| **B. 组件用法错** | 组件对，但 variant/props 组合方式或场景不对 |
| **C. 自拼 div 模拟组件** | 应该用 `<AgCard>` / `<Dialog>` 等，结果手写 |
| **D. 裸 hex / 裸 px / 臆造 token** | 业务代码中出现硬编码视觉值 |
| **E. 品牌色滥用** | 蓝/绿出现在三处之外（焦点环/按钮/导航用了蓝色） |
| **F. 布局违规** | 容器嵌套/筛选器位置/Bar 图不全宽 |
| **G. 多余元素** | recipe 没有但代码里多出来的组件 |
| **H. 可访问性缺失** | 对比度不足 / 图标缺 aria-label / 焦点不可达 |

### 第 2 步：节点匹配

| 症状 | 主嫌疑节点 | 次嫌疑节点 |
|------|----------|----------|
| A 不存在类 | **1.4** 组件确认 | **1.5** Recipe Gate |
| B 用法错 | **1.4** 组件确认 | **3** 代码生成 |
| C 自拼 div | **1** Recipe 锁定 | **1.4.5** 缺失处理 |
| D 硬编码 | **3** 代码生成 | **3.6** Token 校验 |
| E 品牌色滥用 | **3** 代码生成 | **4** 审计漏报 |
| F 布局违规 | **2** 组合布局 | **3** 代码生成 |
| G 多余元素 | **1** Recipe 锁定 | **3** 代码生成 |
| H 可访问性 | **4** 审计漏报 | **3.5** 质量自检 |

### 第 3 步：定性根因

精确指出 1–2 个节点，给出三段式答复：

```markdown
**症状归类**：<A–H 中的字母 + 类型描述>

**根因节点**：<节点 ID 列表，1–2 个>

**为什么这一步出错**：<具体原因，引用 trace 中该节点的记录>

**修复方向**：
- 立刻可改：<本次代码改哪几行 / 改成什么>
- skill 层面（防再犯）：<补 anti-examples / 补 checklist，给出具体文件路径>
```

### 第 4 步：沉淀建议

```markdown
**建议沉淀**：
- 把本次错误形态加进 `ag-design-craft/references/anti-examples.md`
- 如根因是 sub-skill 漏报 → 在 `ag-design-audit/references/checklist.md` 补规则
- 如根因是决策表查错 → 在 `ag-design-craft/references/decision-tables.md` 补行
```
