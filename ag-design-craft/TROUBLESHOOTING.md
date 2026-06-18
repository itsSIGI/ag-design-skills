# Design Craft 翻车排查指南

> 用 `ag-design-craft` 产出的代码不符合规范时，按本指南排查——大部分情况 30 秒内就能定位。

## 默认机制：每次产出都有 Decision Summary

ag-design-craft 在每次产出代码后**自动追加** Decision Summary，长这样：

```
## Decision Summary
- 页面类型：dashboard
- 核心组件：<AgCard>, <Button variant="default">, heading, body
- 开源依赖：ECharts 5.x
- Token 覆盖率：100%
- 品牌色使用：未使用
- 已知限制：小视口适配标 ➖（桌面端页面）
- 框架：React

> 输入 `decision trace` 或 `决策链路` 可获得完整决策链路表
```

**先扫这段**，大部分问题这里就能看出端倪。

---

## 三档排查路径

### 档 1：扫 Summary 就能判断（80% 情况）

| 你看到的 | 推测问题 | 操作 |
|---------|---------|------|
| 页面类型为某 pattern 但产出明显不像 | pattern 命中错（intent_keywords 太宽） | 让 AI 重做 + "未命中应该重新走标准流程" |
| 核心组件 N 个但代码里多了组件 | Step 3 偷加了组件 | 直接说"代码里多了 X，回去补 recipe 或删除" |
| Token 覆盖率 < 100% | 有硬编码残留 | 要求走 Step 3.6 修正 |
| 品牌色出现在非三处 | 品牌色滥用 | 指出位置要求修正 |
| 已知限制说明特殊处理 | AI 主动报告了边界决策 | 看是否你接受这个决策 |

### 档 2：要完整 Decision Trace（15% 情况）

Summary 信息不够时，**直接说**：

> "decision trace"
> （或："决策链路表"、"完整 trace"、"详细决策"）

AI 会输出一张标准化表格，列出每个决策节点（1.0 / 1.4 / 2 / 3.5 / 4 等）+ 选择 + 依据。

拿到 trace 后**看你怀疑的那一节是否合理**：
- 节点 1.4 写"组件已确认" → 看组件是否真覆盖了你想要的功能
- 节点 2 写"容器用 AgCard" → 是否合理
- 节点 4 写"PASS" → 但你看到违规 → sub-skill 漏报

### 档 3：让 AI 反向定位（5% 情况）

Trace 也看不清根因时，**调 sub-skill 反向定位**。直接对 AI 说：

```
"trace 反查"（或 "定位问题" / "reverse locate"）

症状：[一句话描述哪里不对]
代码片段：[5–10 行违规代码]
决策链路表：[把上面拿到的 trace 表整段贴回去]
```

`ag-design-audit` sub-skill 会切换到 **Reverse Locate 模式**，输出：

```
症状归类：<A-H 类型>
根因节点：<节点 ID，1-2 个>
为什么这一步出错：<具体原因>
修复方向：
  - 立刻可改：[本次代码改哪]
  - skill 层面：[补 anti-examples / 补 checklist / 加强措辞]
建议沉淀：[把这次错误记到哪]
```

---

## 高频症状速查表

按现象直接对应可能的 trace 节点，**节省档 3 的诊断时间**：

| 症状 | 主嫌疑节点 | 一句话原因 |
|------|----------|---------|
| 组件名在 components-v2.md 不存在 | **1.4** | AI 凭训练记忆编造组件 |
| 自拼 `<div style="position: fixed">` 模拟弹窗 | **1** + **3** | recipe 没锁 / 锁了但渲染偏离 |
| 裸 hex 色值出现在业务代码 | **3.6** | Token 校验漏过 |
| 品牌蓝出现在按钮/焦点环 | **4** | sub-skill 漏报品牌色滥用 |
| 加了导出/刷新按钮（用户没要求） | **1** + **3** | 偷加用户没要的元素 |
| Bar 图在 `grid-cols-2` 里 | **2** | Step 2 漏读 design-rules 容器规则 |
| 表格数字列左对齐 | **4** | sub-skill checklist 漏 |
| `<AgCard>` 嵌套 `<AgCard>` 出现双重边框 | **2** | 容器层级规则违规 |
| 字重 700 出现 | **3.6** | Token 校验漏过字重检查 |
| 焦点环用了品牌蓝 | **4** | sub-skill 漏报焦点环规则 |

---

## 沉淀闭环

每次档 3 反向定位完成后，**必须**做以下任一：

1. 在 `ag-design-craft/references/anti-examples.md` 补一条反例（症状 + 修正 + 根因节点 ID）
2. 如根因是 sub-skill 漏报 → 在 `ag-design-audit/references/checklist.md` 补对应规则
3. 如根因是决策表缺业务场景 → 在 `ag-design-craft/references/decision-tables.md` 补该场景行

不沉淀 = 同样的错误下次还会犯。**每次诊断都该让 skill 变更聪明一点**。

---

## 触发词速记卡

| 想做什么 | 对 AI 说 |
|---------|---------|
| 看简短决策摘要 | （自动输出，无需触发） |
| 看完整决策链路表 | `decision trace` / `决策链路` |
| 让 AI 反向定位问题 | `trace 反查` + 贴症状 + 贴 trace |
| 重新跑合规审计 | `审计这段代码` / `audit design-craft output` |
