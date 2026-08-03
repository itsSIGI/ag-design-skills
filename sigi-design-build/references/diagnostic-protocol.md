# Diagnostic Protocol

ag-design-craft 的诊断协议：Decision Summary（自动输出）+ Decision Trace（按需触发）+ 反向定位。

---

## Step 5：决策摘要输出（每次产出末尾必须执行）

PASS 后，在最终代码块**之后**必须追加 Decision Summary（~200 tokens），让用户能扫一眼知道关键决策路径。

### 输出格式（固定）

```markdown
## Decision Summary

- **页面类型**：[原型名 或 "自由布局"]
- **核心组件**：[shadcn/AG 组件清单]
- **开源依赖**：[第三方库名 + 版本，无则写"无"]
- **Token 覆盖率**：[所有视觉值中 token 引用的比例]
- **品牌色使用**：[蓝/绿出现位置，或"未使用"]
- **已知限制**：[Harden 中标 ➖ 的项 + 原因]
- **框架**：[React / Vue / Vanilla]

> 输入 `decision trace` 或 `决策链路` 可获得完整决策链路表，用于反向定位问题。
```

### 字段填充规则

- **页面类型**：Step 1.0 命中的 archetype 或 pattern name；未命中写 `自由布局`
- **核心组件**：组件数量 + 列出所有使用的 shadcn/AG 组件（去重，按出现顺序）
- **Token 覆盖率**：所有视觉值中通过 `var(--)` 或 shadcn/AG 组件引用的比例
- **品牌色使用**：蓝/绿出现位置，或"未使用"
- **已知限制**：Harden 清单中标 ➖ 的项 + 理由

### 为什么要这一步

普通使用零成本（只多 ~200 tokens 输出），但**所有产出都自带最浅一层的诊断线索**。同事发现问题时：
- **大部分情况**：扫一眼 summary 就能判断"是 pattern 命中错"还是"recipe 漏了组件"——不用要完整 trace
- **少数复杂情况**：升级到 Step 6 拿完整 Decision Trace

---

## Step 6：决策链路表（按需触发）

> **不要默认输出**——只在用户**明确要求**时才执行 Step 6。

### 触发词（任一）

- "decision trace" / "决策链路" / "决策链路表"
- "你为什么这么做" / "show decision chain"
- "完整 trace" / "详细决策"

### 输出格式（标准化表格）

```markdown
## Decision Trace

| 节点 ID | Step | 决策点 | 选择 | 依据 / 来源 |
|---------|------|--------|------|-----------|
| 0.1 | Step 0 | 输入模式判定 | Figma URL / 截图 / 文字 | 用户输入类型 |
| 1.0 | Step 1.0 | Pattern 查询 | <pattern 名 \| 未命中> | <匹配的 intent_keywords \| 无匹配关键词> |
| 1.3 | Step 1.3 | decision-tables 查询 | <命中的章节 + 行号 \| 未命中> | <匹配的业务场景描述> |
| 1.4 | Step 1.4 | 组件确认 | <N 个组件已确认 \| 缺失> | components-v2.md 章节引用 |
| 1.4.5 | Step 1.4.5 | 缺失处理协议 | <未触发 \| 情况 A/B/C/D> | <触发原因 + 走的路径> |
| 1.5 | Step 1.5 | Recipe Gate | <用户确认 \| 用户选 X> | 用户回复原文 |
| 2 | Step 2 | 组合布局 | <布局描述> | <容器/图表/筛选器规则引用> |
| 3 | Step 3 | 代码生成 | <严格按 recipe \| 偏离> | <偏离原因如有> |
| 3.5 | Step 3.5 | 质量自检 | <7 项全过 \| N 项回修> | quality-self-check.md |
| 3.6 | Step 3.6 | Token 校验 | <全过 \| N 项修正> | 检查项清单 |
| 4 | Step 4 | 合规审计 | <PASS \| FAIL after N rounds> | ag-design-audit 结论 |
```

### 节点 ID 命名规则

格式：`<Step 号>.<子步号>`

每个节点 ID 在用户反向定位时是**精确锚点**——用户说"问题出在节点 1.4"，AI 立刻知道是组件确认那一步。

---

## 反向定位（用户指出问题后）

用户拿到 Decision Trace 后说"产出 X 不对"，主流程或 `ag-design-audit` sub-skill 进入**反向定位模式**：

1. **症状归类**——属于哪类违规（recipe 错 / 渲染偏离 / sub-skill 漏报 / 决策表查错）
2. **节点匹配**——根据症状类型对应到 trace 哪一行（见 ag-design-audit Reverse Locate）
3. **根因定性**——精确到一个或两个节点 + 解释"为什么这一步出错"
4. **修复方向**——分两类：
   - 立刻可改：本次代码改哪几行
   - skill 层面：补 anti-examples / 补 checklist / 加强措辞
