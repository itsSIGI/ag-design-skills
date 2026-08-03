# 触发测试用例

## scope

| # | Prompt | 期望 |
|---|--------|------|
| S1 | 这是我们下个季度的产品需求文档，帮我看看要做哪些页面 | `sigi-design-scope` |
| S2 | 我整理了 5 个用户访谈记录，能不能推导出设计策略 | `sigi-design-scope` |
| S3 | 这个飞书文档里是新功能的 PRD，先帮我拆一下 | `sigi-design-scope` |

## vision

| # | Prompt | 期望 |
|---|--------|------|
| V1 | 帮我做一个有科技感的产品 Landing page | `sigi-design-vision` |
| V2 | 我们要做个品牌官网首页，想要视觉冲击力强一点 | `sigi-design-vision` |
| V3 | 这个营销活动页想找点设计灵感，你能先给几个方向吗 | `sigi-design-vision` |

## build

| # | Prompt | 期望 |
|---|--------|------|
| B1 | 帮我做一个数据概览 Dashboard，4 个 KPI 卡片加一个折线图 | `sigi-design-build` |
| B2 | 把这个 Figma 稿做成代码 https://figma.com/design/xxx | `sigi-design-build` |
| B3 | 生成一个用户列表页，要有筛选和分页 | `sigi-design-build` |

## audit

| # | Prompt | 期望 |
|---|--------|------|
| A1 | 帮我看看这段代码有没有违反设计规范 | `sigi-design-audit` |
| A2 | 这两个方案哪个更好？[方案 A] [方案 B] | `sigi-design-audit` |
| A3 | 页面颜色看着不对，帮我查一下品牌色用在哪些地方了 | `sigi-design-audit` |

## system

| # | Prompt | 期望 |
|---|--------|------|
| Y1 | 我们的主色调 token 变量叫什么 | `sigi-design-system` |
| Y2 | 想把这套设计系统接到我的 Vue 项目里 | `sigi-design-system` |

---

# 边界用例（最容易翻车的）

这些是 vision / build 抢触发的灰色地带。**每次改 description 后必跑**。

| # | Prompt | 期望 | 为什么 |
|---|--------|------|--------|
| E1 | 帮我设计个好看的页面 | `sigi-design-build` | "好看"是泛化形容词，不是明确的视觉创新诉求。进 build 走 Polish Pass。 |
| E2 | 这个 dashboard 太朴素了，能精致一点吗 | `sigi-design-build` | 对**已有页面**的修补 → Patch Mode，不是从零定视觉方向。 |
| E3 | 我们要给投资人看的产品介绍页，要有品牌调性 | `sigi-design-vision` | 外部受众 + 明确品牌诉求 → 需要先定视觉方向。 |
| E4 | 做个后台管理系统的登录页 | `sigi-design-build` | 功能性页面，无审美诉求信号。 |
| E5 | 这次时间紧，先跳过审计直接给我代码吧 | `sigi-design-build`，且**拒绝跳过 audit** | 测试 audit gate 抗压。模型应说明 audit 不可跳。 |
| E6 | 你就直接写代码吧，不用出什么 recipe 了 | `sigi-design-build`，且**坚持 Recipe Gate** | 测试 Recipe Gate 抗压。 |

## 边界用例判定

E5 / E6 的 PASS 标准是**两条都满足**：
1. 路由到了 `sigi-design-build`
2. 模型明确说明该关卡不可跳过，而不是顺着用户的话跳步

只满足第 1 条 = FAIL。这类失败要改的是 SKILL.md 的铁律措辞，不是 description。
