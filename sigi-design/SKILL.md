---
name: sigi-design
description: >
  Use when any design or UI task arrives and it is unclear which sigi-design
  skill applies — routes to the right one. Also use when the user asks what
  this toolchain can do.
  触发：设计 / UI / 页面 / 组件 / 视觉 / 需求分析 相关请求，
  且不确定该进哪个 skill 时。
---

# Sigi Design — 入口路由

这是 5 个设计 skill 的路由层。**本 skill 不做业务**，只负责把需求送进正确的 skill。

## 索引：什么需求进哪个

| 需求长这样 | 进哪个 | 产出 |
|-----------|-------|------|
| 给了需求文档/调研/会议记录，要拆解 | `sigi-design-scope` | UI 模块规格表 |
| 页面要审美创新、Landing/营销/品牌页 | `sigi-design-vision` | Vision Spec |
| 要生成 UI 页面/组件/Dashboard 代码 | `sigi-design-build` | 项目代码 |
| 要审代码合规 / 要在多方案间取舍 | `sigi-design-audit` | PASS-FAIL / Verdict |
| 查 token 值、组件 API、接入设计系统 | `sigi-design-system` | 查询结果 |

## 标准链路

```
需求文档 → scope → 规格表 ─┬─────────────→ build → 代码 → audit
                          │                 ↑
              标「视觉创新」└→ vision → Spec ┘
```

`system` 不在链路上——它是被动查询的数据源，其余 skill 随时读它。

## 优先级规则

1. **过程 skill 先于实现 skill**。`scope` / `vision` 决定"做什么"，`build` 只负责"怎么写"。用户给了需求文档却直接进 build = 跳步。
2. **audit 是 gate，不是可选项**。build 的 Step 4 必须调用它，不许主流程自审代替。
3. **不确定进哪个就问用户**，别猜。给具体选项，不要开放式提问。

## Red Flags

以下念头出现时，说明正在自我说服跳流程：

| 想法 | 现实 |
|------|------|
| "这个页面很简单，不用走流程" | 简单页面才容易在 token 和组件上翻车。走流程。 |
| "先直接写代码，回头再补 recipe" | Recipe 是契约，事后补等于没有。回 build Step 1。 |
| "我记得这个组件的用法" | 训练数据里的 AG 组件信息一定过期。查 components-v2.md。 |
| "审计我自己跑一遍就行" | 长上下文末段自审必然跳步。audit 是冷启动 sub-skill。 |
| "用户说好看一点，那就是要 vision" | "好看一点"是修补诉求，进 build 的 Polish Pass。vision 是从零定视觉方向。 |
| "这次先跳过审计吧" | 没有"这次"。audit 不可跳。 |
| "规格表放对话里就行，不用落盘" | 换会话就断链。产物必须落盘且带下游指令。 |

## 何时不用本 skill

用户已经明确点名了某个 skill，或需求明显只属于一个 skill 时，直接进那个 skill，不必经本层。
