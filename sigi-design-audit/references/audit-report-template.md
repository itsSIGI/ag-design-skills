# 审计报告模板

## PASS

````markdown
## 审计结论：✅ PASS

| 检查项 | 结果 |
|--------|------|
| 硬编码检测 | ✓ 无裸 hex/px/radius/shadow |
| Token 存在性 | ✓ 全部 var(--*) 在 tokens.css 中可查 |
| 组件存在性 | ✓ 全部组件在 components-v2.md 有记录 |
| Recipe 一致性 | ✓ 代码与 Locked Recipe 逐行匹配 |
| 品牌色使用 | ✓ 仅出现在链接 hover / agent 状态点 / 代码高亮 |
| 字重上限 | ✓ 无 700 及以上 |
| 焦点环 | ✓ 使用 var(--color-focus-ring) |

**Token 覆盖率**：[N]/[M] = [X]%
````

## FAIL

````markdown
## 审计结论：❌ FAIL（[N] 项违规）

### 违规 1：[类别]

- **位置**：`path/to/file.tsx:42`
- **问题**：硬编码 `#3B82F6`
- **判据**：checklist.md §2 业务层零硬编码
- **修复**：改为 `var(--color-primary)`

### 违规 2：...

---

**修复后请重新提交审计。** 已修 2 轮仍 FAIL 时停止自动修复，把冲突呈现给用户。
````

## Verdict（设计决策仲裁模式）

````markdown
## Verdict

- **决策对象**：[在什么之间取舍]
- **裁决**：方案 [X]
- **判据**：design-constitution.md §[N] [条款名]
- **理由**：[为什么这条判据指向方案 X]
- **被否方案的问题**：[具体违反了哪条]
- **执行约束**：[如有条件性通过，写明约束]
````
