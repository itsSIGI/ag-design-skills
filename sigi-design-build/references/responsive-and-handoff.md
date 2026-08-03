# 响应式设计指导

> AG 设计系统以桌面端 B2B 应用为主，但需要基本的响应式支撑。

## 断点体系

| 断点名 | 宽度 | 典型设备 | 布局策略 |
|--------|------|---------|---------|
| `--bp-sm` | ≤ 768px | 手机 / 竖屏平板 | 单列，侧栏折叠 |
| `--bp-md` | 769–1024px | 横屏平板 / 小笔记本 | 2 列，侧栏可折叠 |
| `--bp-lg` | 1025–1440px | 标准笔记本 | 标准布局 |
| `--bp-xl` | ≥ 1441px | 大屏 / 外接显示器 | 标准布局 + 侧边面板 |

## 响应式规则

### 必须遵循

1. **Grid 列数响应**：`grid-template-columns` 在小屏断点退化为更少列
   - 4 列 KPI → `--bp-md` 变 2 列 → `--bp-sm` 变 1 列
   - 3 列卡片 → `--bp-sm` 变 1 列
2. **侧栏折叠**：chat 界面的 context panel、split-view 的 detail panel 在 `--bp-md` 以下折叠或隐藏
3. **表格横向滚动**：数据表在窄屏使用 `overflow-x: auto` 而非隐藏列
4. **触摸目标**：移动端可点击元素最小 44×44px

### 不需要做（除非用户明确要求）

- 完整的移动端适配（AG 是桌面端 B2B 工具）
- 移动端专用布局
- PWA 离线支持

## 在 craft 流程中的位置

- **Step 2 组合布局**：标注关键断点下的布局退化方案
- **Step 3.5B Harden**：小视口检查项使用本文件的断点体系
- **Patch Mode P3**：列宽调整需检查断点退化是否仍合理

---

# 开发交接协议（Dev Handoff）

> craft 输出的代码给到开发者时，附带的交接信息。

## 交接清单（在 Decision Summary 之后可选输出）

触发词："dev handoff" / "开发交接" / "交接给开发"

```markdown
## Dev Handoff

### 依赖
- **设计系统**：shadcn/ui + AG 扩展组件（`components-v2.md`）+ `tokens.css`（版本：[当前版本]）
- **开源组件**：[库名@版本]（如有）
- **图标库**：白名单库 MingCute / Lucide（单项目单库，标注实际所用）

### 关键实现说明
- [组件 A]：使用 `<AgCard variant="ring">`，注意 hover 态自带
- [图表]：ECharts 配色从 tokens.md 色阶取，支持暗色模式需监听 `data-theme` 变更
- [特殊处理]：[如有]

### Token 映射速查
| 用途 | Token | 当前值 |
|------|-------|--------|
| 页面背景 | var(--color-bg) | #FFFFFF |
| 卡片背景 | var(--color-surface) | #FFFFFF |
| 主文本 | var(--color-text-primary) | #0D0D12 |
| [按需补充] | | |

### 状态变体
| 组件 | 默认 | Hover | Active | Disabled |
|------|------|-------|--------|----------|
| [按需列出有交互的组件] | | | | |

### 注意事项
- 暗色模式：所有视觉值走语义 token，切换 `data-theme="dark"` 即可
- 无障碍：焦点环使用 `var(--color-focus-ring)`，对比度 ≥ 4.5:1
- [其他注意事项]
```

---

# 设计系统演化协议

> 把自演化从"愿景"升级为"可执行协议"。

## 演化触发 → 行动

| 触发 | 判定 | 行动 | 产出 |
|------|------|------|------|
| Pattern 成功复用 3 次 | 同类需求 3 次用了类似的 recipe 结构 | 提议沉淀为新 pattern | 新 `.tsx` 文件 + pattern-index.json 条目 |
| 新页面类型 | 现有 12 个 archetype 都不匹配 | 提议新增 archetype | 新 `.md` 骨架文件 + README 索引更新 |
| Decision-tables 未覆盖 | 查表未命中且最终方案经过验证 | 提议补行 | decision-tables.md 新行 |
| 翻车案例 | audit FAIL 且根因有普遍性 | 必须记录 | anti-examples.md 新条目 |
| Token 不足 | TOKEN_ESCAPE 出现 ≥ 2 次 | 提议补 token | 向设计系统团队提需求 |

## 提议格式（向用户输出）

```markdown
## 设计系统演化建议

**触发**：[本次什么场景触发了演化]
**类型**：Pattern 沉淀 / Archetype 新增 / Decision-table 补行 / Token 补充
**提议内容**：[具体要添加什么]
**依据**：[引用本次任务中的哪个决策/验证结果]

是否现在执行沉淀？（回复"沉淀"执行，回复"跳过"不处理）
```

**翻车案例除外**——audit FAIL 的反例**不需要用户确认**，直接写入 `anti-examples.md`。
