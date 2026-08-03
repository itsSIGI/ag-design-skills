# AG Design Skills 协作协议

> 五个 skill 之间的数据传递、回环路径、项目级上下文共享的统一约定。

## 五个 Skill 的协作全景

```
用户需求
  │
  ├─── 功能性页面 ──────────────────────────────────────────────┐
  │                                                              │
  ├─── 需要审美创新？ ─── YES ──┐                                │
  │                              │                                │
  ▼                              ▼                                ▼
┌──────────────┐         ┌──────────────┐         ┌───────────────┐
│  compass     │         │  vision      │         │  craft        │
│  需求拆解     │         │  视觉创意     │         │  UI 代码生成   │
│              │ 规格表   │              │ Vision  │               │
│  Step 1-6   │────────▶│  Step 0-5    │─Spec──▶│  Step 1-6     │
│              │ +视觉创新│              │         │               │
└──────────────┘ 标记    └──────────────┘         │  接收两种输入：│
       ▲                   ▲    │                  │  A) 标准 recipe│
       │ 策略冲突            │    │ 合规查询          │  B) Vision Spec│
       │                   │    ▼                  │               │
┌──────────────┐         合规裁决                   │  Step 4 ──────┼──▶ audit
│  arbiter     │ ◀─── 接口 8 ──────────            │    ▼          │    合规审计
│  设计决策仲裁 │                                   │  Step 5-6     │
│              │ ◀─── craft 设计决策问题             └───────────────┘
│              │ ──── 裁决结论 → recipe ──────────────────▶
│              │ ◀─── audit → arbiter 标注
└──────────────┘
       ▲
       │ → arbiter 标注
┌──────────────┐
│  audit       │
│  合规审计     │
└──────────────┘
```

---

## 接口 1：compass → craft

**传递物**：UI 模块规格表（compass Step 5.5 输出）

**格式约定**：

| 字段 | 含义 | craft 如何消费 |
|------|------|---------------|
| 模块名 | 业务语义名称 | 映射为 recipe 的 slot 名 |
| 平台 | Web / Mobile / Both | 决定是否走响应式规则 |
| 使用角色 | 角色名 | 信息密度和交互复杂度参考 |
| 优先级 | MVP / 后续迭代 | 决定是否纳入本次生成 |
| 信息字段 | 字段列表 | recipe 的数据槽位 |
| 交互元素 | 按钮/输入/选择器 | recipe 的组件槽位 |
| 推荐原型 | archetype 名 | craft Step 1.0 的 pattern/archetype 匹配起点 |
| 视觉创新 | 是/否 | `是` 时触发 vision skill（接口 6） |

## 接口 2：craft → audit

**传递物**：生成代码 + Locked Recipe 表

**格式约定**：
- 代码：完整组件代码（React/Vue/HTML）
- Recipe：Step 1.5 输出的标准 Locked Recipe 表格
- 两者都必须完整传入，缺一不可（标准模式）
- 独立审计模式：只传代码，跳过 recipe 一致性检查
- Vision Spec 模式：代码 + Recipe（含 TOKEN_ESCAPE 条目），audit 检查 TOKEN_ESCAPE 声明完整性

## 接口 3：audit → arbiter（设计决策回路）

**触发**：audit 发现违规但本质是设计决策问题（不是代码实现问题）

**传递物**：

```markdown
## Audit → Arbiter 升级

- **违规项**：[审计中发现的问题描述]
- **位置**：[代码行号]
- **为什么不是实现问题**：[说明这是设计层面的选择，不是写错了]
- **需要 arbiter 裁决**：[具体的决策问题]
```

**arbiter 返回**：Arbiter Verdict 格式（见 arbiter SKILL.md 跨 Skill 协作接口）

## 接口 4：arbiter → craft（裁决注入）

**触发**：craft Step 1.5 遇到多选一槽位，需要 arbiter 帮做决策

**传递物**：候选方案列表 + 业务场景描述

**arbiter 返回**：Arbiter Verdict → craft 直接将推荐方案写入 recipe

## 接口 5：compass ↔ arbiter（策略冲突）

**触发**：compass Step 5 产出的多条策略相互矛盾

**传递物**：冲突策略列表 + 各策略对应的角色/痛点

**arbiter 返回**：优先级排序 + 理由（按 Trust > Task > A11y 维度）

---

## 接口 6：compass → vision（Creative Brief Handoff）

**触发**：compass Step 5.5 模块规格表中某模块标注 `视觉创新: 是`，或用户直接以创意页面需求进入 vision

**传递物**：

```markdown
## Compass → Vision Handoff

- **页面类型**: [Landing page / 品牌页 / 营销活动页 / ...]
- **目标受众**: [角色描述]
- **核心信息**: [1-3 个关键信息]
- **情绪关键词**: [3-5 个情绪词]
- **已有约束**: [品牌指南 / 技术限制 / 内容量]
- **设计目标**: [从 compass Step 4 继承]
- **参考**: [用户提供的参考 URL/截图]
```

## 接口 7：vision → craft（Vision Spec Handoff）

**触发**：vision Step 5 完成

**传递物**：完整 Vision Spec（7 章节）+ Craft Implementation Guide

**craft 消费方式**：
1. 读 TIER mapping 确定哪些区域用标准 recipe、哪些用创意 spec
2. TIER_3 区域的 recipe 中每个 TOKEN_ESCAPE 单独登记（source 列标注 `vision-spec`）
3. TIER_1/TIER_2 区域走正常 craft 流程（components-v2.md + decision-tables）
4. 过渡接缝（transition seam）按 spec 描述实现
5. 动效编排按 spec 的 motion plan 实现

## 接口 8：vision ↔ arbiter（Creative Compliance Check）

**触发**：vision Step 4 发现创意方向与 AG 红线有张力

**vision → arbiter 查询**：

```markdown
## Vision → Arbiter 合规查询

- **Creative Intent**: [想做什么]
- **Potential Conflict**: [哪条红线/原则有张力]
- **TIER Zone**: [TIER_2 / TIER_3]
- **Proposed Resolution**: [TOKEN_ESCAPE 声明 + 理由]
- **Fallback if Rejected**: [被否决后的回退方案]
```

**arbiter → vision 裁决**：

```markdown
## Arbiter → Vision 合规裁决

- **Decision**: APPROVE / APPROVE_WITH_CONDITIONS / REJECT
- **Conditions**: [具体约束，如有]
- **TIER Confirmation**: [确认 TIER 分类]
- **TOKEN_ESCAPE Approved**: [批准的 ESCAPE 清单 + 作用域限制]
```

---

## 项目级上下文共享

### 问题

每个 skill 独立运行，不知道同一项目之前做了哪些页面、用了什么组件、形成了什么一致性约定。

### 解决方案：项目设计日志

在项目工作目录中维护 `.claude/design-log.md`，记录本项目的设计决策积累：

```markdown
# Design Log — [项目名]

## 已完成页面

| 页面 | 原型 | 核心组件 | 日期 | 备注 |
|------|------|---------|------|------|
| Dashboard | dashboard | `<AgCard>`, KPI stat card | 2025-01-15 | 4 列 KPI |
| 化合物列表 | data-explorer | search-hit-card, status-tag | 2025-01-20 | split-view |
| Landing | vision: Dark Cinematic | TOKEN_ESCAPE ×10 | 2025-02-01 | 全暗色 |

## 项目级设计约定

- KPI 卡统一用 `<AgCard variant="ring">` 变体
- 列表页搜索栏统一 320px 宽
- 品牌蓝只在 agent 状态点使用
- Landing 页的 accent 色固定为 #2563EB

## 待解决的设计债务

- Dashboard 缺少移动端适配
- 化合物列表的高级筛选未实现
```

### 使用规则

- **craft**：生成新页面前读 design-log，确保与已有页面一致
- **audit**：审计时参考 design-log 中的项目级约定
- **compass**：分析新需求时参考 design-log 了解项目上下文
- **arbiter**：做决策时参考 design-log 中的先例
- **vision**：生成 Vision Spec 时参考已有创意页面的风格，保持品牌一致性

### 维护规则

- **craft 每次 PASS 后自动追加**一行到"已完成页面"
- **vision 每次交付 Vision Spec 后追加**一行到"已完成页面"（标注风格和 TOKEN_ESCAPE 数量）
- **arbiter 每次裁决有普遍性结论时**追加到"项目级设计约定"
- **compass 发现设计债务时**追加到"待解决的设计债务"
- 不自动创建——用户首次使用时提议："是否要为本项目创建 design-log？"

### 初始化流程

任何 skill 首次在项目中运行时，检查 `.claude/design-log.md` 是否存在：

```
.claude/design-log.md 存在？
│
├─ YES → 读取后注入当前 skill 的上下文
│
└─ NO → 向用户提议：
   "本项目还没有 design-log。创建后可以在多次设计会话间保持一致性。是否创建？"
   │
   ├─ 用户同意 → 用下方模板创建
   └─ 用户拒绝 → 跳过，不影响当前流程
```

### 空白模板

```markdown
# Design Log — [项目名]

> 由 AG Design Skills 自动维护。记录项目级设计决策积累，确保跨会话一致性。

## 项目信息

- **项目名**: [填写]
- **技术栈**: [React / Vue / Next.js / ...]
- **品牌指南**: [有/无 + 链接]
- **创建日期**: [YYYY-MM-DD]

## 已完成页面

| 页面 | 来源 Skill | 原型/风格 | 核心组件 | TOKEN_ESCAPE | 日期 | 备注 |
|------|-----------|----------|---------|-------------|------|------|
| — | — | — | — | — | — | 暂无 |

## 项目级设计约定

> 由 arbiter 裁决或团队确认的具有普遍性的设计规则。

- 暂无

## Vision 风格锚点

> 由 vision 在首次产出 Vision Spec 后填写。后续创意页面参考此锚点保持品牌一致性。

- **主风格**: [待定]
- **配色模式**: [品牌延伸 / 全新配色]
- **Accent 色**: [待定]
- **TOKEN_ESCAPE 预算已用**: 0 / 15

## 待解决的设计债务

- 暂无
```
