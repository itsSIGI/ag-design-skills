# Sigi Design Skills 重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 6 个 `ag-design-*` skill 重构为 5 个 `sigi-design-*` skill + 1 个入口路由 skill，消除死接口与冗余，使其符合 Anthropic skill 规范。

**Architecture:** 分三阶段。阶段 1 动结构（目录改名 + arbiter 按消费方拆解 + 安装脚本迁移）；阶段 2 动内容（description 重写 + 主文件瘦身 + 删死资产）；阶段 3 加能力（入口 skill + 触发测试 + 输出模板）。每个 Task 独立提交，随时可停。

**Tech Stack:** 纯 Markdown + Bash。无构建工具、无运行时依赖。验证靠 `scripts/verify-skills.sh` 做结构断言（本仓库的"测试"）。

**源 spec:** `docs/sigi-design/specs/2026-08-03-skills-refactor-design.md`

---

## ⚠️ 对 spec 的一处技术性偏离

spec §2 写的是 `Sigi-design-scope`（首字母大写）。**实施时全部改用小写 `sigi-design-scope`**。

**原因**：Claude Code 的 skill `name` 字段规范要求小写字母、数字、连字符。现有 6 个 skill（`ag-design-craft` 等）也全是小写。用大写会导致 skill 加载失败。

**影响**：仅目录名与 frontmatter `name` 字段。README 和文档正文里可以写 `Sigi Design Skills` 作为品牌名。

---

## 命名对照总表（全计划以此为准）

| 旧 | 新 | 说明 |
|----|----|----|
| `ag-design-compass` | `sigi-design-scope` | 目录改名 |
| `ag-design-vision` | `sigi-design-vision` | 目录改名 |
| `ag-design-craft` | `sigi-design-build` | 目录改名 |
| `ag-design-audit` | `sigi-design-audit` | 目录改名 |
| `ag-design-system` | `sigi-design-system` | 目录改名 |
| `ag-design-arbiter` | — | 拆解后删除，见 Task 4 |
| — | `sigi-design` | 新增入口 skill，见 Task 14 |

---

## 文件结构（重构后）

```
ag-design-skills/                      # 仓库名不变
├── sigi-design/                       # 【新增】入口路由 skill（~80 行）
│   └── SKILL.md
├── sigi-design-system/                # 设计基座
│   ├── SKILL.md
│   ├── assets/tokens.css
│   └── references/
│       ├── tokens.md
│       ├── components-v2.md
│       ├── react.md / vue.md / checklist.md
│       └── token-selection.md         # 【迁入】原 arbiter
├── sigi-design-scope/                 # 需求分析
│   ├── SKILL.md
│   └── references/（原 compass references 不变）
├── sigi-design-vision/                # 视觉创意
│   ├── SKILL.md                       # 626 → ≤300 行
│   └── references/
│       ├── vision-spec-template.md    # 【新增】
│       ├── html-mockup-protocol.md
│       ├── aesthetic-library/index.md # 【新增】索引
│       └── （examples/ 已删）
├── sigi-design-build/                 # 代码生成
│   ├── SKILL.md                       # 630 → ≤300 行
│   ├── TROUBLESHOOTING.md
│   └── references/
│       ├── recipe-template.md         # 【新增】
│       ├── aesthetic-recipes.md       # 【迁入】原 arbiter
│       ├── vision-spec-mode.md        # 【新增】从 SKILL.md 下沉
│       ├── skill-startup.md           # 【新增】从 SKILL.md 下沉
│       └── （cross-skill-protocol.md 已删）
├── sigi-design-audit/                 # 合规审计 + 设计仲裁
│   ├── SKILL.md                       # 并入 arbiter 仲裁流程
│   └── references/
│       ├── checklist.md
│       ├── design-constitution.md     # 【迁入】原 arbiter
│       └── arbitration-flow.md        # 【新增】原 arbiter Step 0-5
├── scripts/
│   ├── install.sh                     # 加旧软链清理
│   ├── update.sh / auto-update.sh / configure-hook.sh
│   └── verify-skills.sh               # 【新增】结构断言
├── tests/skill-triggering/            # 【新增】触发测试用例
└── docs/sigi-design/{specs,plans}/
```

---

## Task 1：建立验证基建 `scripts/verify-skills.sh`

对应 spec §7 的 8 条验收标准。此脚本是本计划所有后续 Task 的"测试"——先写，此时应全部 FAIL。

**Files:**
- Create: `scripts/verify-skills.sh`

- [ ] **Step 1: 写验证脚本（此时预期失败）**

创建 `scripts/verify-skills.sh`：

```bash
#!/usr/bin/env bash
#
# Sigi Design Skills — 结构验收断言
# 对应 docs/sigi-design/specs/2026-08-03-skills-refactor-design.md §7
#
# 用法: bash scripts/verify-skills.sh
# 退出码: 0 = 全通过, 1 = 有失败项

set -uo pipefail
cd "$(dirname "$0")/.."

PASS=0
FAIL=0

ok()   { printf '\033[32m✓\033[0m %s\n' "$1"; PASS=$((PASS+1)); }
bad()  { printf '\033[31m✗\033[0m %s\n' "$1"; FAIL=$((FAIL+1)); }

SKILLS=(sigi-design sigi-design-system sigi-design-scope sigi-design-vision sigi-design-build sigi-design-audit)

# --- 1. 目录存在性 ---
for s in "${SKILLS[@]}"; do
  if [ -f "$s/SKILL.md" ]; then ok "存在: $s/SKILL.md"; else bad "缺失: $s/SKILL.md"; fi
done

# --- 2. 旧目录已清除 ---
for old in ag-design-system ag-design-compass ag-design-vision ag-design-craft ag-design-arbiter ag-design-audit; do
  if [ -e "$old" ]; then bad "旧目录仍存在: $old"; else ok "旧目录已清除: $old"; fi
done

# --- 3. 全仓库无 ag-design-* skill 残留引用 ---
# 排除项说明：
#   docs/           历史记录（spec 与本计划），保留旧名是正确的
#   scripts/install.sh  LEGACY_SKILLS 数组必须保留旧名用于清理，由断言 8 单独校验
# 另注：仓库名 ag-design-skills、安装目录 ~/.ag-design-skills、环境变量
#   AG_DESIGN_DIR 均不在改名范围内，故只匹配 6 个具体 skill 后缀。
residue=$(grep -rn "ag-design-\(system\|compass\|vision\|craft\|arbiter\|audit\)" \
  --include="*.md" --include="*.sh" --include="*.json" --include="*.yaml" . \
  | grep -v "^./docs/" | grep -v "^./.git/" | grep -v "^./scripts/install.sh" || true)
if [ -z "$residue" ]; then
  ok "无 ag-design-* skill 残留引用"
else
  bad "存在 ag-design-* skill 残留引用:"
  echo "$residue" | head -20 | sed 's/^/    /'
fi

# --- 4. frontmatter name 与目录名一致，且为合法小写 ---
for s in "${SKILLS[@]}"; do
  [ -f "$s/SKILL.md" ] || continue
  n=$(grep -m1 '^name:' "$s/SKILL.md" | sed 's/^name:[[:space:]]*//')
  if [ "$n" = "$s" ]; then ok "name 一致: $s"; else bad "name 不一致: $s (frontmatter=$n)"; fi
  if printf '%s' "$n" | grep -qE '^[a-z0-9-]+$'; then :; else bad "name 非法(需小写字母/数字/连字符): $n"; fi
done

# --- 5. description 无流程摘要（禁止出现流程箭头与 Step 编号）---
for s in "${SKILLS[@]}"; do
  [ -f "$s/SKILL.md" ] || continue
  desc=$(awk '/^description:/,/^---$/' "$s/SKILL.md")
  if printf '%s' "$desc" | grep -qE '→|Step [0-9]|核心机制'; then
    bad "description 含流程摘要: $s"
  else
    ok "description 无流程摘要: $s"
  fi
done

# --- 6. 主文件行数上限 ---
check_lines() {
  local f="$1" limit="$2"
  [ -f "$f" ] || { bad "行数检查跳过(文件缺失): $f"; return; }
  local n; n=$(wc -l < "$f" | tr -d ' ')
  if [ "$n" -le "$limit" ]; then ok "行数达标: $f ($n ≤ $limit)"; else bad "行数超限: $f ($n > $limit)"; fi
}
check_lines sigi-design/SKILL.md 100
check_lines sigi-design-build/SKILL.md 300
check_lines sigi-design-vision/SKILL.md 300

# --- 7. 每个业务 skill 有"交付与下一步"章节 ---
for s in sigi-design-scope sigi-design-vision sigi-design-build sigi-design-audit; do
  [ -f "$s/SKILL.md" ] || continue
  if grep -q "^## 交付与下一步" "$s/SKILL.md"; then
    ok "有 terminal state: $s"
  else
    bad "缺 terminal state 章节: $s"
  fi
done

# --- 8. install.sh 含旧软链清理逻辑 ---
if grep -q "LEGACY_SKILLS" scripts/install.sh 2>/dev/null; then
  ok "install.sh 含旧软链清理"
else
  bad "install.sh 缺旧软链清理逻辑"
fi

# --- 9. 触发测试用例存在 ---
if [ -d tests/skill-triggering ] && [ "$(ls -A tests/skill-triggering 2>/dev/null)" ]; then
  ok "触发测试用例存在"
else
  bad "缺 tests/skill-triggering/ 用例"
fi

# --- 汇总 ---
echo ""
printf '通过 %d / 失败 %d\n' "$PASS" "$FAIL"
[ "$FAIL" -eq 0 ]
```

- [ ] **Step 2: 赋可执行权限并运行，确认大量失败**

```bash
chmod +x scripts/verify-skills.sh && bash scripts/verify-skills.sh
```

预期：退出码 1，输出大量 `✗`（新目录不存在、旧目录仍在、有 ag-design- 残留等）。这是正确的起点状态。

- [ ] **Step 3: 提交**

```bash
git add scripts/verify-skills.sh
git commit -m "新增 skills 结构验收脚本，对应重构 spec 的 8 条验收标准"
```

---

## Task 2：给 `.design-mockups/` 补 gitignore

`html-mockup-protocol.md:123` 声明 `.design-mockups/` 应在 gitignore 里，但实际 `.gitignore` 没有。属于既有缺口，先补掉避免预览稿被误提交。

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: 确认缺口**

```bash
grep -n "design-mockups" .gitignore || echo "确认：未配置"
```

预期输出：`确认：未配置`

- [ ] **Step 2: 追加规则**

在 `.gitignore` 末尾追加：

```
# 设计稿预览产物（html-mockup-protocol.md 规定不入库）
.design-mockups/
```

- [ ] **Step 3: 验证**

```bash
mkdir -p .design-mockups/test && touch .design-mockups/test/x.html
git status --porcelain | grep design-mockups && echo "❌ 未忽略" || echo "✓ 已忽略"
rm -rf .design-mockups
```

预期输出：`✓ 已忽略`

- [ ] **Step 4: 提交**

```bash
git add .gitignore
git commit -m "gitignore 补充 .design-mockups/，与设计稿协议声明保持一致"
```

---

# 阶段 1：结构改造

## Task 3：目录改名（git mv 保留历史）

**Files:**
- Rename: `ag-design-compass` → `sigi-design-scope`
- Rename: `ag-design-vision` → `sigi-design-vision`
- Rename: `ag-design-craft` → `sigi-design-build`
- Rename: `ag-design-audit` → `sigi-design-audit`
- Rename: `ag-design-system` → `sigi-design-system`

（`ag-design-arbiter` 不在此改名，Task 4 拆解后删除）

- [ ] **Step 1: 确认工作区干净**

```bash
git status --porcelain
```

预期：无输出。有输出则先提交或暂存。

- [ ] **Step 2: 执行改名**

```bash
git mv ag-design-compass sigi-design-scope
git mv ag-design-vision  sigi-design-vision
git mv ag-design-craft   sigi-design-build
git mv ag-design-audit   sigi-design-audit
git mv ag-design-system  sigi-design-system
```

- [ ] **Step 3: 验证历史保留**

```bash
git log --follow --oneline -3 -- sigi-design-build/SKILL.md
```

预期：能看到改名前 `ag-design-craft/SKILL.md` 的历史提交。

- [ ] **Step 4: 更新 5 个 frontmatter 的 name 字段**

逐个改：

| 文件 | 原 name | 新 name |
|------|---------|---------|
| `sigi-design-scope/SKILL.md` | `ag-design-compass` | `sigi-design-scope` |
| `sigi-design-vision/SKILL.md` | `ag-design-vision` | `sigi-design-vision` |
| `sigi-design-build/SKILL.md` | `ag-design-craft` | `sigi-design-build` |
| `sigi-design-audit/SKILL.md` | `ag-design-audit` | `sigi-design-audit` |
| `sigi-design-system/SKILL.md` | `ag-design-system` | `sigi-design-system` |

- [ ] **Step 5: 验证 name 一致性**

```bash
for s in sigi-design-scope sigi-design-vision sigi-design-build sigi-design-audit sigi-design-system; do
  printf '%s → %s\n' "$s" "$(grep -m1 '^name:' $s/SKILL.md)"
done
```

预期：每行的目录名与 name 值一致。

- [ ] **Step 6: 提交**

```bash
git add -A
git commit -m "5 个 skill 目录改名为 sigi-design-*，frontmatter name 同步更新"
```

---

## Task 4：arbiter 按真实消费方拆解归位

对应 spec §3.1。arbiter 的 3 个 reference 按实际引用关系分散到消费方，SKILL.md 的仲裁流程并入 audit。

**Files:**
- Move: `ag-design-arbiter/references/design-constitution.md` → `sigi-design-audit/references/`
- Move: `ag-design-arbiter/references/aesthetic-recipes.md` → `sigi-design-build/references/`
- Move: `ag-design-arbiter/references/token-selection.md` → `sigi-design-system/references/`
- Create: `sigi-design-audit/references/arbitration-flow.md`（原 arbiter SKILL.md Step 0-5）
- Delete: `ag-design-arbiter/`

- [ ] **Step 1: 移动 3 个 reference**

```bash
git mv ag-design-arbiter/references/design-constitution.md sigi-design-audit/references/design-constitution.md
git mv ag-design-arbiter/references/aesthetic-recipes.md   sigi-design-build/references/aesthetic-recipes.md
git mv ag-design-arbiter/references/token-selection.md     sigi-design-system/references/token-selection.md
```

- [ ] **Step 2: 抽出仲裁流程为 arbitration-flow.md**

把 `ag-design-arbiter/SKILL.md` 的第 14–181 行（`## 核心原则` 到 `## 探索型决策模式` 结束，即 Step 0–5 + 快速决策模式 + 探索型决策模式）内容，写入新文件 `sigi-design-audit/references/arbitration-flow.md`，头部加：

```markdown
# 设计决策仲裁流程

> 本文件由 `sigi-design-audit` 的"设计决策"模式使用。
> 当审计发现的问题属于**设计决策层**（而非实现层违规）时，按本流程做裁决。
> 判据来源：[`design-constitution.md`](design-constitution.md)

---
```

**不迁移**的部分（这些是死接口，直接丢弃）：
- `## 跨 Skill 协作接口`（第 182–232 行）——接口 3/4/5/8 全部废弃
- `## 数据传递格式` / `## Arbiter Verdict` 里与 vision/craft 交互的部分

保留 `## 失败回退`（第 250 行起）并入新文件末尾。

- [ ] **Step 3: 删除 arbiter 目录**

```bash
git rm -r ag-design-arbiter
```

- [ ] **Step 4: 在 audit/SKILL.md 增加"设计决策"模式入口**

在 `sigi-design-audit/SKILL.md` 的 `# 模式 2：反向定位（Reverse Locate）` 章节**之前**插入：

```markdown
---

# 模式 3：设计决策仲裁

## 触发条件

- 用户要在多个设计方案间取舍："帮我选方案" / "这两个设计哪个好" / "该怎么选"
- 用户要求评审现有设计："评审这个设计" / "设计决策"
- 审计过程中发现的问题属于**设计决策层**而非实现层违规

## 操作

读 [`references/arbitration-flow.md`](references/arbitration-flow.md)，按其中的 Step 0–5 执行：
定义决策对象 → 红线筛查 → 方案取舍 → 映射到工程表达 → 验收结论 → 自检交付。

判据来源：[`references/design-constitution.md`](references/design-constitution.md)。
**所有裁决必须引用设计宪法条款编号**，不许凭品味裁决。

## 与合规审计的区别

| | 合规审计（模式 1） | 设计决策仲裁（模式 3） |
|--|------------------|---------------------|
| 判什么 | 代码是否违反 token/组件规范 | 多个合规方案中选哪个 |
| 输出 | PASS / FAIL + 违规清单 | Verdict + 引用的宪法条款 |
| 判据 | `checklist.md` | `design-constitution.md` |
```

- [ ] **Step 5: 修正 3 个迁移文件的内部相对路径**

```bash
grep -rn "\.\./" sigi-design-audit/references/design-constitution.md \
  sigi-design-build/references/aesthetic-recipes.md \
  sigi-design-system/references/token-selection.md
```

对每条命中的相对路径，按新位置重新计算。例如原来在 `ag-design-arbiter/references/` 里指向 `../../ag-design-system/references/tokens.md`，迁到 `sigi-design-system/references/` 后应改为 `tokens.md`。

- [ ] **Step 6: 验证 arbiter 目录已消失且文件已就位**

```bash
[ -e ag-design-arbiter ] && echo "❌ arbiter 仍存在" || echo "✓ arbiter 已删除"
ls sigi-design-audit/references/design-constitution.md \
   sigi-design-build/references/aesthetic-recipes.md \
   sigi-design-system/references/token-selection.md \
   sigi-design-audit/references/arbitration-flow.md
```

预期：`✓ arbiter 已删除` + 4 个文件全部列出。

- [ ] **Step 7: 提交**

```bash
git add -A
git commit -m "arbiter 按真实消费方拆解归位，仲裁流程并入 audit 模式 3

design-constitution → audit（红线是审计判据）
aesthetic-recipes  → build（生成时查配方）
token-selection    → system（本质是 token 规则）
接口 3/4/5/8 随之废弃，这些接口从未被实际调用。"
```

---

## Task 5：全仓库引用路径批量更新

Task 3/4 改了目录名和文件位置，所有跨文件引用需同步。

**Files:**
- Modify: 所有含 `ag-design-` 的 `.md` / `.json`（scripts/ 在 Task 6 单独处理）

- [ ] **Step 1: 列出待改文件**

```bash
grep -rl "ag-design-" --include="*.md" --include="*.json" . \
  | grep -v "^./docs/" | sort
```

记下清单。`docs/` 下的 spec 和本计划保留旧名（是历史记录，不改）。

- [ ] **Step 2: 批量替换 skill 名**

```bash
files=$(grep -rl "ag-design-" --include="*.md" --include="*.json" . | grep -v "^./docs/")
for f in $files; do
  sed -i '' \
    -e 's/ag-design-compass/sigi-design-scope/g' \
    -e 's/ag-design-craft/sigi-design-build/g' \
    -e 's/ag-design-vision/sigi-design-vision/g' \
    -e 's/ag-design-audit/sigi-design-audit/g' \
    -e 's/ag-design-system/sigi-design-system/g' \
    "$f"
done
```

（macOS 的 `sed -i ''`；Linux 用 `sed -i`。）

- [ ] **Step 3: 处理残留的 arbiter 引用**

```bash
grep -rn "ag-design-arbiter\|arbiter" --include="*.md" . | grep -v "^./docs/"
```

对每条命中按下表改写：

| 原引用 | 改为 |
|--------|------|
| `../ag-design-arbiter/references/aesthetic-recipes.md` (在 build 中) | `references/aesthetic-recipes.md` |
| `ag-design-arbiter/references/design-constitution.md` (在 vision 中) | `../sigi-design-audit/references/design-constitution.md` |
| `ag-design-arbiter/references/token-selection.md` (在 vision 中) | `../sigi-design-system/references/token-selection.md` |
| 正文里"调用 arbiter"/"升级到 arbiter" | 改为"用 `sigi-design-audit` 的设计决策模式" |
| vision 的定位边界表里 `arbiter` 列 | 改为 `audit` |

- [ ] **Step 4: 验证无残留**

```bash
grep -rn "ag-design-\(system\|compass\|vision\|craft\|arbiter\|audit\)" \
  --include="*.md" --include="*.json" --include="*.sh" . \
  | grep -v "^./docs/" | grep -v "^./.git/" | grep -v "^./scripts/install.sh"
```

预期：无输出。

> 排除 `scripts/install.sh` 是因为它的 `LEGACY_SKILLS` 数组**必须**保留旧名用于清理悬空软链（Task 6 加），这是合法保留。
> 不要用裸的 `grep arbiter`——`arbitration-flow.md` 是 Task 4 新建的合法文件，会误伤。

- [ ] **Step 5: 验证所有相对链接可达**

```bash
for f in $(find sigi-design* -name "*.md"); do
  d=$(dirname "$f")
  grep -o '\](\([^)]*\.md\))' "$f" 2>/dev/null | sed 's/](//;s/)//' | while read -r link; do
    case "$link" in http*) continue;; esac
    [ -f "$d/$link" ] || echo "断链: $f → $link"
  done
done
```

预期：无 `断链:` 输出。有则逐条修正。

- [ ] **Step 6: 提交**

```bash
git add -A
git commit -m "全仓库引用路径同步到 sigi-design-* 新命名，清理 arbiter 残留引用"
```

---

## Task 6：安装脚本迁移逻辑

对应 spec §5.1。改名后旧软链会悬空，必须清理。

**Files:**
- Modify: `scripts/install.sh`
- Modify: `scripts/update.sh`
- Modify: `scripts/auto-update.sh`
- Modify: `scripts/configure-hook.sh`

- [ ] **Step 1: 更新 install.sh 的 SKILLS 数组并加清理逻辑**

把 `scripts/install.sh` 的 `SKILLS=(...)` 块替换为：

```bash
SKILLS=(
  sigi-design
  sigi-design-system
  sigi-design-scope
  sigi-design-vision
  sigi-design-build
  sigi-design-audit
)

# 旧版命名，用于清理改名后遗留的悬空软链
LEGACY_SKILLS=(
  ag-design-system
  ag-design-compass
  ag-design-vision
  ag-design-craft
  ag-design-arbiter
  ag-design-audit
)
```

- [ ] **Step 2: 在软链步骤之前插入清理段**

在 `# --- 2. 软链 skill 到 Claude Code skills 目录 ---` 这行**之后**、`mkdir -p "$SKILLS_DIR"` 之前插入：

```bash
# 清理旧版 ag-design-* 遗留（改名后会变成悬空软链）
if [ -d "$SKILLS_DIR" ]; then
  for old in "${LEGACY_SKILLS[@]}"; do
    old_path="$SKILLS_DIR/$old"
    if [ -L "$old_path" ]; then
      info "  清理旧软链: $old"
      rm "$old_path"
    elif [ -d "$old_path" ]; then
      info "  清理旧拷贝目录: $old"
      rm -rf "$old_path"
    fi
  done
fi
```

- [ ] **Step 3: 更新脚本注释里的数量描述**

`install.sh` 文件头注释第 6 行：

```
#   2. 把 6 个 ag-design-* skill 软链到 ~/.claude/skills/
```

改为：

```
#   2. 把 6 个 sigi-design-* skill（含入口）软链到 ~/.claude/skills/
```

- [ ] **Step 4: 检查另外 3 个脚本**

```bash
grep -n "ag-design" scripts/update.sh scripts/auto-update.sh scripts/configure-hook.sh
```

这些命中的是 `$HOME/.ag-design-skills` 安装目录路径和 `AG_DESIGN_DIR` 环境变量名。**保持不变**——仓库名和安装目录名不改，只有 skill 目录名改了。若命中的是 skill 目录名则需修正。

- [ ] **Step 5: 语法检查**

```bash
for s in scripts/*.sh; do bash -n "$s" && echo "✓ 语法 OK: $s"; done
```

预期：每个脚本都输出 `✓ 语法 OK`。

- [ ] **Step 6: 干跑验证清理逻辑**

```bash
TMPD=$(mktemp -d)
mkdir -p "$TMPD/skills"
ln -s /nonexistent "$TMPD/skills/ag-design-craft"
mkdir -p "$TMPD/skills/ag-design-vision"
ls "$TMPD/skills"

CLAUDE_SKILLS_DIR="$TMPD/skills" AG_DESIGN_DIR="$(pwd)" bash scripts/install.sh 2>&1 | grep -E "清理|软链"
echo "--- 清理后 ---"
ls "$TMPD/skills"
rm -rf "$TMPD"
```

预期：输出含"清理旧软链: ag-design-craft"和"清理旧拷贝目录: ag-design-vision"，清理后目录里只剩 `sigi-design-*`。

> 注：此步会跑到真实的 `configure-hook.sh`。若不想触碰 `~/.claude/settings.json`，先在临时副本上测，或跳过 Step 6 只做 Step 5 语法检查。

- [ ] **Step 7: 提交**

```bash
git add scripts/
git commit -m "install.sh 更新为 sigi-design-* 并清理旧版悬空软链"
```

---

## Task 7：阶段 1 验收

- [ ] **Step 1: 跑验证脚本**

```bash
bash scripts/verify-skills.sh
```

预期此时通过的项：目录存在（除 `sigi-design` 入口）、旧目录已清除、无 ag-design- 残留、name 一致、install.sh 含清理逻辑。

仍失败的项（阶段 2/3 处理）：`sigi-design/SKILL.md` 缺失、description 含流程摘要、行数超限、缺 terminal state、缺触发测试。

- [ ] **Step 2: 确认阶段 1 范围内的项全绿**

若"无 ag-design- 残留"或"name 一致"仍红，回 Task 5 补齐后再继续。

---

# 阶段 2：内容精简

## Task 8：重写 5 个 description

对应 spec §3.4。删掉流程摘要，改为 `Use when...` 结构。

**Files:**
- Modify: 5 个 `sigi-design-*/SKILL.md` 的 frontmatter

- [ ] **Step 1: 确认当前全部违规**

```bash
for s in sigi-design-scope sigi-design-vision sigi-design-build sigi-design-audit sigi-design-system; do
  awk '/^description:/,/^---$/' $s/SKILL.md | grep -qE '→|Step [0-9]|核心机制' \
    && echo "✗ $s 含流程摘要" || echo "✓ $s"
done
```

预期：`sigi-design-build` 和 `sigi-design-vision` 显示 `✗`。

- [ ] **Step 2: 替换 build 的 frontmatter**

`sigi-design-build/SKILL.md` 开头替换为（同时删掉 `version:` 行）：

```yaml
---
name: sigi-design-build
description: >
  Use when generating UI code for the Agentic Genius design system — pages,
  components, dashboards, data viz — from text descriptions, user stories,
  Figma URLs, or screenshots. Runs after sigi-design-scope or sigi-design-vision
  when either has produced a spec.
  触发：帮我设计一下 / 设计一个页面 / 做个页面 / 生成看板 / 做 dashboard /
  生成 UI / 把设计稿做成代码 / 含 figma.com/design URL 的代码生成请求。
  不用于：纯后端任务、单 token 查询、非 AG 项目。
---
```

- [ ] **Step 3: 替换 vision 的 frontmatter**

`sigi-design-vision/SKILL.md` 开头替换为：

```yaml
---
name: sigi-design-vision
description: >
  Use when a page needs aesthetic innovation beyond standard components —
  before any UI code is written. Any page type qualifies, including dashboards,
  if the user signals aesthetic intent.
  触发：Landing page / 营销页 / 品牌页 / 视觉创新 / 视觉风格 / 视觉冲击力 /
  品牌调性 / creative direction / mood board。
  不用于：纯组件修改、Patch Mode 修补、纯后端任务。
---
```

> **触发词从 21 个砍到 9 个**。删掉的"好看一点""精致一些""有设计感""不要太普通"等泛化口语会与 build 抢触发——用户说"帮我做个好看的 dashboard"时应该进 build，不是 vision。

- [ ] **Step 4: 替换 scope 的 frontmatter**

`sigi-design-scope/SKILL.md` 开头替换为：

```yaml
---
name: sigi-design-scope
description: >
  Use when analyzing product requirement docs, user research, meeting notes,
  or feature briefs to derive user roles, task flows, design goals, and
  actionable design strategies — before any visual or code work begins.
  支持读取飞书/文档链接。
  触发：帮我拆解需求 / 分析这个需求 / 推导设计策略 / 做需求分析。
  不用于：生成 UI 代码、从零写 PRD、评审现有设计。
---
```

- [ ] **Step 5: 替换 audit 的 frontmatter**

`sigi-design-audit/SKILL.md` 开头替换为：

```yaml
---
name: sigi-design-audit
description: >
  Use when UI code needs independent compliance review against the Agentic
  Genius design system, or when a design decision needs arbitration between
  multiple valid options. Cold-start and single-purpose — never contaminated
  by the generating context.
  触发：审计这段代码 / check compliance / 只查 Token / 检查品牌色 /
  定位问题 / 哪一步出错 / 帮我选方案 / 这两个设计哪个好 / 评审这个设计。
  不用于：生成 UI 代码、需求拆解。
---
```

- [ ] **Step 6: 替换 system 的 frontmatter**

`sigi-design-system/SKILL.md` 开头替换为：

```yaml
---
name: sigi-design-system
description: >
  Use when looking up Agentic Genius design tokens, component APIs, or
  compliance checklists — the authoritative data source other sigi-design
  skills read from. Also use when onboarding a project onto these tokens
  (React / Vue / vanilla).
  涵盖 shadcn/ui 26 标准组件 + AG 7 扩展组件，含 light/dark 双模式。
  触发：token 是什么 / 这个组件怎么用 / 接入设计系统 / 换肤。
  不用于：生成完整页面（用 sigi-design-build）。
---
```

- [ ] **Step 7: 验证全部通过**

```bash
for s in sigi-design-scope sigi-design-vision sigi-design-build sigi-design-audit sigi-design-system; do
  awk '/^description:/,/^---$/' $s/SKILL.md | grep -qE '→|Step [0-9]|核心机制' \
    && echo "✗ $s" || echo "✓ $s"
done
grep -c "^version:" sigi-design-*/SKILL.md
```

预期：5 个全 `✓`；version 计数全为 0。

- [ ] **Step 8: 提交**

```bash
git add -A
git commit -m "重写 5 个 description 为 Use when 结构，删除流程摘要与 version 字段

description 写流程摘要会导致模型照 description 走而跳过正文正文流程。
vision 触发词 21→9，删掉与 build 抢触发的泛化口语。"
```

---

## Task 9：build 主文件瘦身 630 → ≤300 行

对应 spec §3.5。正文只留核心原则 + 铁律 + 流程图 + "何时读哪个 reference"，重内容下沉。

**Files:**
- Modify: `sigi-design-build/SKILL.md`
- Create: `sigi-design-build/references/skill-startup.md`
- Create: `sigi-design-build/references/vision-spec-mode.md`
- Create: `sigi-design-build/references/recipe-gate.md`

- [ ] **Step 1: 记录改前行数**

```bash
wc -l sigi-design-build/SKILL.md
```

预期约 630。

- [ ] **Step 2: 下沉 Vision Spec Mode 到独立文件**

把 `## Vision Spec Mode（视觉创新页面）` 整节（约 551–619 行）剪切到新文件 `sigi-design-build/references/vision-spec-mode.md`，头部加：

```markdown
# Vision Spec Mode — 视觉创新页面的 recipe 构建

> 当 build 收到来自 `sigi-design-vision` 的 Vision Spec 时读本文件。
> 本模式**不替代**标准 Step 1-6，只修改 Step 1 的 recipe 输入来源。

---
```

SKILL.md 原位置替换为 5 行摘要：

```markdown
## Vision Spec Mode（视觉创新页面）

收到 `sigi-design-vision` 的 Vision Spec 时激活 → 读 [`references/vision-spec-mode.md`](references/vision-spec-mode.md)。

**要点**：不替代标准流程，只改 Step 1 的 recipe 输入来源。TIER_3 区域按 Spec 自建并登记 TOKEN_ESCAPE，TIER_1/2 走标准组件。Recipe Gate 不免除。
```

- [ ] **Step 3: 下沉 Recipe Gate 细则**

把 `### 1.5 Recipe Gate（写代码前的强制门禁）` 的 `#### A. 公开输出 Locked Recipe 表` 和 `#### B. 触发 stop-and-ask 的场景`（约 211–266 行）剪切到 `sigi-design-build/references/recipe-gate.md`，头部加：

```markdown
# Recipe Gate — 写代码前的强制门禁

> Step 1.4 完成 recipe 后读本文件。**用户确认前禁止进 Step 2**。

---
```

SKILL.md 原位置留：

```markdown
### 1.5 Recipe Gate（写代码前的强制门禁）

> ### 铁律：Locked Recipe 必须公开输出 + 等用户确认

完整格式与 stop-and-ask 场景见 [`references/recipe-gate.md`](references/recipe-gate.md)。

**不可协商的三条**：
1. Locked Recipe 表必须出现在**对用户可见**的输出中，不能只在 thinking 里
2. 每行"验证来源"列必须填 `shadcn/[x] ✓` / `ag/[x] ✓` / `tokens.md ✓` 之一，不许空着、不许写"凭印象"
3. 收到用户 "recipe 通过" / "选 X" 前，禁止进 Step 2
```

- [ ] **Step 4: 下沉启动协议**

把 `## 加载即执行（Skill 启动协议）` 和 `## Step -1：预览与校验环境` 两节（约 21–86 行，含权威来源大表）剪切到 `sigi-design-build/references/skill-startup.md`，头部加：

```markdown
# Skill 启动协议与权威来源索引

> 激活 `sigi-design-build` 后的第一件事读本文件。

---
```

SKILL.md 顶部（`# sigi-design-build` 标题之后）替换为：

```markdown
## 加载即执行（启动协议）

激活后**第一件事**，在跟用户聊业务之前按顺序完成：

1. 读 `sigi-design-system/references/components-v2.md` — 载入组件清单
2. 读 `sigi-design-system/references/tokens.md` — 载入 token 体系
3. 读 [`references/patterns/pattern-index.json`](references/patterns/pattern-index.json) — 载入可复用 pattern

跳过加载直接开工 = 高概率中后段翻车。

**完整权威来源索引 + 渐进披露策略** → [`references/skill-startup.md`](references/skill-startup.md)

**预览方式**：本 skill 只含知识 + 规则，不注入运行时代码。预览靠项目自己的 dev server（`pnpm dev` + 正常登录）。生成的是真实路由上的真实代码，不挂免鉴权预览路由。
```

- [ ] **Step 5: 删除自演化机制章节**

删掉 SKILL.md 末尾的 `## 自演化机制` 表（约 622–631 行）。spec §1 已认定它是纯装饰——无脚本、无触发点、无写入路径。

- [ ] **Step 6: 合并 6 条铁律与重复内容**

`## 6 条铁律汇总`（约 503–511 行）与正文中散落的铁律块重复。保留汇总表，删掉正文里 `> ### 铁律：ALWAYS Reference BEFORE Implement` 和 `> ### 铁律：Recipe 是契约` 两个内联块的展开说明，各留一行指回汇总表。

- [ ] **Step 7: 验证行数达标**

```bash
wc -l sigi-design-build/SKILL.md sigi-design-build/references/{skill-startup,vision-spec-mode,recipe-gate}.md
```

预期：`SKILL.md` ≤ 300 行。超了则继续下沉 `## Step 3.5` 的三份清单细节到 `references/quality-self-check.md`（已存在，追加即可）。

- [ ] **Step 8: 验证无内容丢失**

不要用 `git stash`（它默认不含新建的未跟踪文件，且 pop 有冲突风险）。直接从 git 索引读改前版本：

```bash
before=$(git show HEAD:sigi-design-build/SKILL.md | wc -l | tr -d ' ')
after=$(cat sigi-design-build/SKILL.md \
          sigi-design-build/references/skill-startup.md \
          sigi-design-build/references/recipe-gate.md \
          sigi-design-build/references/vision-spec-mode.md | wc -l | tr -d ' ')
echo "改前 $before → 改后总计 $after"
[ "$after" -ge $((before * 85 / 100)) ] && echo "✓ 无大量内容丢失" || echo "⚠️ 总行数骤降，回查剪切过程"
```

预期：`✓ 无大量内容丢失`。阈值取 85% 是因为本 Task 有意删除了自演化机制表和重复的铁律展开块。

- [ ] **Step 9: 提交**

```bash
git add -A
git commit -m "build 主文件瘦身至 300 行内，重内容下沉到 references

启动协议+权威来源表 → skill-startup.md
Recipe Gate 细则     → recipe-gate.md
Vision Spec Mode     → vision-spec-mode.md
删除纯装饰的自演化机制表。"
```

---

## Task 10：vision 主文件瘦身 626 → ≤300 行

**Files:**
- Modify: `sigi-design-vision/SKILL.md`
- Create: `sigi-design-vision/references/vision-spec-template.md`
- Create: `sigi-design-vision/references/direction-exploration.md`
- Delete: `sigi-design-vision/references/examples/`

- [ ] **Step 1: 记录改前行数**

```bash
wc -l sigi-design-vision/SKILL.md
```

预期约 626。

- [ ] **Step 2: 下沉 Vision Spec 7 章节模板**

把 `### Vision Spec 格式（7 章节）` 的整个代码块（约 306–391 行）剪切到 `sigi-design-vision/references/vision-spec-template.md`，头部加：

```markdown
# Vision Spec 模板（7 章节）

> Step 3 深化方向时按本模板填写。产出写到
> `docs/sigi-design/vision/<date>-<topic>.md`。

## 产物头部必须包含

每份 Vision Spec 开头写死下游指令：

```markdown
> 下一步：用 sigi-design-build 按本 Spec 生成代码。
> TIER_3 区域的每个 TOKEN_ESCAPE 需在 build 的 recipe 中单独登记。
```

---
```

SKILL.md 原位置留：

```markdown
### Vision Spec 格式

按 [`references/vision-spec-template.md`](references/vision-spec-template.md) 的 7 章节模板填写：
视觉方向 / 配色策略 / 排版组合 / 布局编排 / 动效编排 / 插画方向 / AG 合规桥接。

**质量标准**（不可省）：
- 每个 TOKEN_ESCAPE 有明确 scope + justification
- 配色值有 WCAG AA 对比度验证（文本 vs 背景 ≥ 4.5:1）
- 排版值给出 clamp() 响应式写法
- 动效有 prefers-reduced-motion 回退
```

- [ ] **Step 3: 下沉方向探索细则**

把 `### 2.0 确定灵感获取路径（双轨决策）` 到 `### 兜底：搜索无理想结果`（约 163–288 行）剪切到 `sigi-design-vision/references/direction-exploration.md`，头部加：

```markdown
# 风格方向探索细则

> Step 2 读本文件。含双轨灵感获取（搜索 / 纯内部库）、
> Direction Card 格式、3 选 1 可视化稿。

---
```

SKILL.md 原位置留：

```markdown
## Step 2：风格方向探索（3 选 1）

完整细则 → [`references/direction-exploration.md`](references/direction-exploration.md)

**流程骨架**：
1. 确定灵感路径——web search 可用则搜 Dribbble/Behance/Awwwards + 内部库校验；不可用则纯内部库匹配
2. 提取视觉 DNA，与 `style-vocabulary.md` 原型对照
3. 输出 3 张 Direction Card（文字）
4. **同时出 3 选 1 并排可视化稿** —— 读 [`references/html-mockup-protocol.md`](references/html-mockup-protocol.md)，按协议话术问用户选 HTML / Pencil
5. 收到 "选 A/B/C" 前**禁止进 Step 3**
```

- [ ] **Step 4: 删除跨 Skill 协作接口章节**

删掉 `## 跨 Skill 协作接口`（约 554–602 行）整节。理由：接口 6/7/8 的定义与 `cross-skill-protocol.md` **逐字重复**，接口 8（vision↔arbiter）随 arbiter 删除已失效。产物头部指令（Step 2 写的模板）已经承担了传递职责。

- [ ] **Step 5: 删除自演化机制章节**

删掉末尾 `## 自演化机制` 表（约 618–627 行）。

- [ ] **Step 6: 删除 examples 死资产**

```bash
git rm -r sigi-design-vision/references/examples
```

同步删掉 SKILL.md 自演化表里"新示例 → examples/"那行（Step 5 已连带删除整表，此处确认即可）。

- [ ] **Step 7: aesthetic-library 索引化**

创建 `sigi-design-vision/references/aesthetic-library/index.md`：

```markdown
# 审美参考库索引

> **按需加载，不要整体读入**。全库 4855 行，一次性载入会挤占上下文。
> 按下表定位到具体文件的具体章节再读。

| 需要什么 | 读哪个 | 行数 | 何时 |
|---------|--------|------|------|
| 风格原型的具体 CSS 参数值 | [`archetypes/archetype-params.md`](archetypes/archetype-params.md) | 831 | Step 2 定方向后要具体值 |
| 按行业/视觉特质选配色 | [`palettes/industry-palettes.md`](palettes/industry-palettes.md) | 621 | Step 3 §2 配色策略 |
| Section 级视觉范式 | [`patterns/section-patterns.md`](patterns/section-patterns.md) | 1728 | Step 3 §4 布局编排 |
| 完整页面组合配方 | [`compositions/page-compositions.md`](compositions/page-compositions.md) | 1091 | Step 2 要整页起点 |
| 预收集的高质量参考 + 视觉 DNA | [`inspirations/curated-references.md`](inspirations/curated-references.md) | 532 | Step 2 无 web search 时 |

## 使用规则

1. **先读本索引，再读具体文件**——不要 glob 整个目录
2. 每个文件内部都有目录，用 grep 定位章节后只读那一段
3. `section-patterns.md`（1728 行）最大，务必按 section 类型 grep 后局部读
```

SKILL.md 权威来源表里的 5 行 aesthetic-library 条目合并为 1 行：

```markdown
| 审美参考库 | [`references/aesthetic-library/index.md`](references/aesthetic-library/index.md) | Step 2-3 需灵感/参数时按索引定位 |
```

- [ ] **Step 8: 验证行数达标**

```bash
wc -l sigi-design-vision/SKILL.md
```

预期 ≤ 300。超了则把 `## 审美自检清单`（约 487–523 行）下沉到 `references/aesthetic-self-check.md`。

- [ ] **Step 9: 提交**

```bash
git add -A
git commit -m "vision 主文件瘦身至 300 行内，aesthetic-library 索引化

Vision Spec 模板 → vision-spec-template.md（含产物头部下游指令）
方向探索细则     → direction-exploration.md
删除与 protocol 逐字重复的接口章节、纯装饰的自演化表、零引用的 examples/
aesthetic-library 4855 行改为 index.md 按需加载"
```

---

## Task 11：接口砍到 3 个 + 加 terminal state

对应 spec §3.2 / §3.3。

**Files:**
- Delete: `sigi-design-build/references/cross-skill-protocol.md`
- Modify: 4 个业务 skill 的 `SKILL.md`（末尾加"交付与下一步"）
- Modify: `sigi-design-scope/references/output-template.md`

- [ ] **Step 1: 确认 cross-skill-protocol 的引用点**

```bash
grep -rn "cross-skill-protocol" --include="*.md" . | grep -v "^./docs/"
```

记下清单，Step 3 逐个清理。

- [ ] **Step 2: 删除 cross-skill-protocol.md**

```bash
git rm sigi-design-build/references/cross-skill-protocol.md
```

理由：269 行里，接口 3/4/5/8 随 arbiter 废弃；接口 1/6/7 的定义在各 SKILL.md 里已有；Design Log 模板（106 行，第 165–269 行）全仓库 0 处写入、1 处读取，属死机制。产物头部自带下游指令后不再需要中心化协议文件。

- [ ] **Step 3: 清理引用**

对 Step 1 列出的每处引用，删掉那一行（权威来源表行）或改写正文表述。

- [ ] **Step 4: 给 scope 加 terminal state**

在 `sigi-design-scope/SKILL.md` 末尾追加：

```markdown
---

## 交付与下一步

**产物**：`docs/sigi-design/specs/<date>-<topic>.md`

产物头部必须写死下游指令：

```markdown
> 下一步：用 sigi-design-build 按本规格表生成代码。
> 若模块标注「视觉创新: 是」，先用 sigi-design-vision 出 Vision Spec。
```

**唯一下游**：`sigi-design-build`（若有视觉创新标注则先经 `sigi-design-vision`）。

**不许**：在此直接写代码、跳过 build 自行实现、把规格表只留在对话里不落盘。
```

- [ ] **Step 5: 给 vision 加 terminal state**

在 `sigi-design-vision/SKILL.md` 末尾追加：

```markdown
---

## 交付与下一步

**产物**：`docs/sigi-design/vision/<date>-<topic>.md`

产物头部必须写死下游指令：

```markdown
> 下一步：用 sigi-design-build 按本 Spec 生成代码。
> TIER_3 区域的每个 TOKEN_ESCAPE 需在 build 的 recipe 中单独登记。
```

**唯一下游**：`sigi-design-build`。

**不许**：在此直接写页面代码、跳过 build 自行实现、交付前没让用户对着可视化稿确认。
```

- [ ] **Step 6: 给 build 加 terminal state**

在 `sigi-design-build/SKILL.md` 末尾追加：

```markdown
---

## 交付与下一步

**产物**：项目里的真实代码。

**唯一下游**：`sigi-design-audit`（Step 4 强制调用，不可跳过）。

**不许**：自己跑一遍 checklist 就宣称 PASS、audit FAIL 后不修直接交付、
超过 2 轮自动修复还不升级给用户。
```

- [ ] **Step 7: 给 audit 加 terminal state**

在 `sigi-design-audit/SKILL.md` 末尾追加：

```markdown
---

## 交付与下一步

**产物**：PASS / FAIL 结论 + 违规清单。

**这里是终点**——audit 不产出代码、不启动新流程。

- **PASS** → 交还给用户，流程结束
- **FAIL** → 回 `sigi-design-build` 逐条修复后重审
- **2 轮仍 FAIL** → 停止自动修复，把冲突呈现给用户决策
```

- [ ] **Step 8: 给 scope 的输出模板加产物头部**

在 `sigi-design-scope/references/output-template.md` 的模板最开头插入：

```markdown
> 下一步：用 sigi-design-build 按本规格表生成代码。
> 若模块标注「视觉创新: 是」，先用 sigi-design-vision 出 Vision Spec。

---
```

- [ ] **Step 9: 验证**

```bash
for s in sigi-design-scope sigi-design-vision sigi-design-build sigi-design-audit; do
  grep -q "^## 交付与下一步" $s/SKILL.md && echo "✓ $s" || echo "✗ $s"
done
[ -e sigi-design-build/references/cross-skill-protocol.md ] && echo "✗ protocol 仍在" || echo "✓ protocol 已删"
```

预期：5 行全 `✓`。

- [ ] **Step 10: 提交**

```bash
git add -A
git commit -m "接口从 8 个砍到 3 个，产物文件当总线

删除 cross-skill-protocol.md（含 0 写入的 Design Log 模板）
4 个业务 skill 各加单一 terminal state 章节
产物头部自带下游指令，换会话也不断链"
```

---

## Task 12：删除剩余死资产

**Files:**
- Delete: `sigi-design-system/agents/openai.yaml`

- [ ] **Step 1: 确认零引用**

```bash
grep -rn "openai.yaml\|agents/" --include="*.md" --include="*.sh" . | grep -v "^./docs/"
```

预期：无输出（或仅 docs/ 内的记录）。有输出则先评估再删。

- [ ] **Step 2: 删除**

```bash
git rm -r sigi-design-system/agents
```

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "删除零引用的 agents/openai.yaml"
```

---

## Task 13：阶段 2 验收

- [ ] **Step 1: 跑验证脚本**

```bash
bash scripts/verify-skills.sh
```

此时应只剩两类失败：`sigi-design/SKILL.md` 缺失、缺 `tests/skill-triggering/`。

- [ ] **Step 2: 断链复查**

```bash
for f in $(find sigi-design* -name "*.md"); do
  d=$(dirname "$f")
  grep -o '\](\([^)]*\.md\))' "$f" 2>/dev/null | sed 's/](//;s/)//' | while read -r link; do
    case "$link" in http*) continue;; esac
    [ -f "$d/$link" ] || echo "断链: $f → $link"
  done
done
```

预期：无输出。瘦身时删了不少章节，容易留断链，务必跑。

---

# 阶段 3：新增能力

## Task 14：入口路由 skill `sigi-design`

对应 spec §4.1。只做路由，不做业务。

**Files:**
- Create: `sigi-design/SKILL.md`

- [ ] **Step 1: 创建入口 skill**

创建 `sigi-design/SKILL.md`：

```markdown
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
```

- [ ] **Step 2: 验证行数与 name**

```bash
wc -l sigi-design/SKILL.md
grep -m1 "^name:" sigi-design/SKILL.md
```

预期：≤ 100 行；`name: sigi-design`。

- [ ] **Step 3: 提交**

```bash
git add sigi-design/
git commit -m "新增入口路由 skill sigi-design

索引 + 优先级规则 + Red Flags 表，只做路由不做业务。
Red Flags 堵住「这个简单不用走流程」这类自我说服。"
```

---

## Task 15：触发测试用例

对应 spec §4.2。每条是**不提 skill 名**的自然中文 prompt，验证能否路由到预期 skill。

**Files:**
- Create: `tests/skill-triggering/README.md`
- Create: `tests/skill-triggering/cases.md`

- [ ] **Step 1: 创建说明文件**

创建 `tests/skill-triggering/README.md`：

```markdown
# 触发测试

验证 skill 的 description 能否在**不提 skill 名**的自然表述下正确触发。

## 怎么跑

手动跑。开一个**全新会话**（不能带本仓库的上下文），把 `cases.md` 里的
prompt 原样发给模型，观察它激活了哪个 skill。

## 判定

- **PASS**：激活了 `期望` 列的 skill
- **FAIL**：激活了别的 skill，或没激活任何 skill

FAIL 时改对应 skill 的 description（加/删触发词、调整"不用于"），
**不要**改测试用例去迁就实现。

## 为什么手动

skill 触发是模型行为，无法用脚本断言。这些用例的价值在于：
改 description 之前先跑一遍，改完再跑一遍，对比有没有引入回归。
```

- [ ] **Step 2: 创建用例文件**

创建 `tests/skill-triggering/cases.md`：

```markdown
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
```

- [ ] **Step 3: 验证**

```bash
ls tests/skill-triggering/ && wc -l tests/skill-triggering/*.md
```

预期：两个文件都在。

- [ ] **Step 4: 提交**

```bash
git add tests/
git commit -m "新增触发测试用例，覆盖 5 个 skill + 6 条边界场景

E1-E4 覆盖 vision/build 触发边界
E5-E6 覆盖 audit gate 与 Recipe Gate 的抗压场景"
```

---

## Task 16：补齐输出模板文件

对应 spec §4.3。`vision-spec-template.md` 已在 Task 10 建好，此处补另外两个。

**Files:**
- Create: `sigi-design-build/references/recipe-template.md`
- Create: `sigi-design-audit/references/audit-report-template.md`

- [ ] **Step 1: 创建 recipe 模板**

创建 `sigi-design-build/references/recipe-template.md`：

```markdown
# Locked Recipe 模板

> Step 1.5 按本模板输出。**必须对用户可见**，不能只留在 thinking 里。

## 标准模式

```markdown
## Locked Recipe

| Slot | 组件类型 | 来源 | 组件 | Token 引用 | 验证来源 | 备注 |
|------|---------|------|-----|-----------|---------|------|
| 删除确认弹窗 | Modal | shadcn | `Dialog` | var(--color-surface) | shadcn/dialog ✓ | — |
| KPI 指标卡 | Card | ag-ext | `AgMetricCard` | var(--space-4) | ag/AgMetricCard ✓ | tabular-nums |

## Spacing 决策

| 区域 | Token 变量 | 像素值 |
|------|-----------|--------|
| 卡片间距 | var(--space-4) | 16 |
| 区块间距 | var(--space-8) | 32 |
```

## Vision Spec 模式（额外两列语义）

TIER_3 区域的行，`来源` 填 `vision-spec`，`验证来源` 填 Vision Spec 章节号：

```markdown
| Hero 标题 | Display Text | vision-spec | 自建 | TOKEN_ESCAPE: hero-title-size | Vision Spec §3 | clamp(40px, 5vw+12px, 64px) |
```

## 「验证来源」列的合法取值

| 取值 | 含义 |
|------|------|
| `shadcn/[组件名] ✓` | 已从 components-v2.md 确认 shadcn 组件存在 |
| `ag/[组件名] ✓` | 已从 components-v2.md 确认 AG 扩展组件存在 |
| `tokens.md ✓` | 已确认 token 变量存在 |
| `Vision Spec §N` | Vision Spec 模式下的 TIER_3 自建元素 |

**非法**（写了等于没验证）：凭印象 / 我记得 / 应该有 / Tailwind 默认有 / 其他项目这样用。

## 待决策项格式

任一 slot 不确定时，用这个格式停下来问用户：

```markdown
⚠️ Slot [X] 待用户决策

候选路径：
1. 方案 A —— [来源/做法]，优：... 缺：...
2. 方案 B —— ...

我建议 [N]，理由 [...]。请回 "选 A" / "选 B" 后继续。
```
```

- [ ] **Step 2: 创建审计报告模板**

创建 `sigi-design-audit/references/audit-report-template.md`：

```markdown
# 审计报告模板

## PASS

```markdown
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
```

## FAIL

```markdown
## 审计结论：❌ FAIL（[N] 项违规）

### 违规 1：[类别]

- **位置**：`path/to/file.tsx:42`
- **问题**：硬编码 `#3B82F6`
- **判据**：checklist.md §2 业务层零硬编码
- **修复**：改为 `var(--color-primary)`

### 违规 2：...

---

**修复后请重新提交审计。** 已修 2 轮仍 FAIL 时停止自动修复，把冲突呈现给用户。
```

## Verdict（设计决策仲裁模式）

```markdown
## Verdict

- **决策对象**：[在什么之间取舍]
- **裁决**：方案 [X]
- **判据**：design-constitution.md §[N] [条款名]
- **理由**：[为什么这条判据指向方案 X]
- **被否方案的问题**：[具体违反了哪条]
- **执行约束**：[如有条件性通过，写明约束]
```
```

- [ ] **Step 3: 在 SKILL.md 里挂上引用**

`sigi-design-build/SKILL.md` 的 Step 1.5 章节加一行：

```markdown
输出格式模板 → [`references/recipe-template.md`](references/recipe-template.md)
```

`sigi-design-audit/SKILL.md` 的**模式 1 的** `## 输出格式` 章节（改名前在第 51 行；文件里有 3 处同名章节，只改模式 1 这处）加一行：

```markdown
完整模板 → [`references/audit-report-template.md`](references/audit-report-template.md)
```

- [ ] **Step 4: 验证**

```bash
ls sigi-design-build/references/recipe-template.md \
   sigi-design-audit/references/audit-report-template.md \
   sigi-design-vision/references/vision-spec-template.md
```

预期：3 个文件全部列出。

- [ ] **Step 5: 提交**

```bash
git add -A
git commit -m "补齐 recipe / audit report 输出模板，与 vision-spec 模板配套"
```

---

## Task 17：README 重写

对应 spec §5.3。

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 更新标题与简介**

第 1–7 行的"6 个协作 Skills""8 个标准化接口"改为：

```markdown
# Sigi Design Skills

> AI 驱动的全链路设计系统工具链 —— 5 个协作 Skills + 1 个入口路由，覆盖**需求分析 → 视觉创意 → 代码生成 → 合规审计**完整设计工作流。适用于 Claude Code、Cursor、Codex 等主流 AI Coding 工具。

## 这是什么？

Sigi Design Skills 是一套专为 B 端产品设计的 AI 辅助设计系统。它不是一个组件库，而是 **6 个 AI Skills 组成的智能工作流**（5 个业务 skill + 1 个入口路由），每个 Skill 负责设计流程中的一个环节，把模糊的产品需求转化为符合设计规范的生产代码。
```

- [ ] **Step 2: 替换 skill 一览表**

```markdown
### Skills 一览

| Skill | 职责 | 一句话描述 |
|-------|------|-----------|
| **sigi-design** | 入口路由 | 不确定该用哪个时先进这里 |
| **sigi-design-scope** | 需求分析 | 把产品文档拆成结构化的 UI 模块规格表 |
| **sigi-design-vision** | 视觉创意 | 为需要审美创新的页面生成 Vision Spec |
| **sigi-design-build** | 代码生成 | 按 Recipe 生成符合设计系统的组件代码 |
| **sigi-design-audit** | 审计与仲裁 | 独立冷启动审计 + 多方案设计裁决 |
| **sigi-design-system** | 设计基座 | Token 体系 + 组件规范 + 达标清单 |
```

- [ ] **Step 3: 删除 8 接口表和 ASCII 拓扑图，换成 3 接口链路**

删掉原第 29–76 行整块（协作链路 ASCII 图 + 8 个协作接口表），替换为：

```markdown
## 协作链路

```
需求文档 → scope → 规格表 ─┬─────────────→ build → 代码 → audit
                          │                 ↑
              标「视觉创新」└→ vision → Spec ┘
```

三条接口，各自靠**产物文件**传递，不靠会话上下文：

| 接口 | 产物 | 下游 |
|------|------|------|
| scope → build | `docs/sigi-design/specs/<date>-<topic>.md` | build 读规格表 |
| vision → build | `docs/sigi-design/vision/<date>-<topic>.md` | build 读 Vision Spec |
| build → audit | 项目代码 + Locked Recipe | audit 冷启动审计 |

每份产物**头部自带下游指令**，换会话、换人打开文件链路都不断。

`sigi-design-system` 不在链路上——它是被动查询的数据源，其余 skill 随时读它。
```

- [ ] **Step 4: 更新各 skill 详细介绍章节**

原第 79–204 行的 6 个小节：
- `ag-design-compass` 小节 → 标题改 `sigi-design-scope`，关键文件路径同步
- `ag-design-vision` → `sigi-design-vision`，关键文件表加 `vision-spec-template.md`、`aesthetic-library/index.md`，删 `examples/`
- `ag-design-craft` → `sigi-design-build`，关键文件表删 `cross-skill-protocol.md`，加 `recipe-template.md`、`aesthetic-recipes.md`、`vision-spec-mode.md`
- `ag-design-arbiter` 小节 → **整节删除**，其能力并入 audit 小节
- `ag-design-audit` → `sigi-design-audit`，职责补"+ 设计决策仲裁"，关键文件加 `design-constitution.md`、`arbitration-flow.md`、`audit-report-template.md`
- `ag-design-system` → `sigi-design-system`，关键文件加 `token-selection.md`

- [ ] **Step 5: 快速开始前移 + 更新安装指令**

把 `## 快速开始`（原第 207 行）整块移到"协作链路"章节之后、"各 Skill 详细介绍"之前。

手动软链的示例代码改为：

```bash
mkdir -p ~/.claude/skills
for s in sigi-design sigi-design-system sigi-design-scope \
         sigi-design-vision sigi-design-build sigi-design-audit; do
  ln -sfn "$(pwd)/$s" ~/.claude/skills/$s
done
```

Cursor / Windsurf / Codex 三段配置里的路径全部改为新目录名。

在安装章节加一句迁移提示：

```markdown
> **从 ag-design-* 旧版升级**：直接跑 `bash scripts/install.sh` 即可，
> 脚本会自动清理旧的 `ag-design-*` 悬空软链，无需手动删除。
```

- [ ] **Step 6: 更新项目结构树**

原第 461–534 行的目录树按 Task 3–12 的实际结果重画：加 `sigi-design/`、`tests/`、`scripts/verify-skills.sh`；删 `ag-design-arbiter/`、`vision/references/examples/`；3 个迁移的 reference 挂到新位置。

- [ ] **Step 7: 删除自演化机制章节**

删掉原第 538–550 行整节。spec §1 已认定其为纯装饰。

- [ ] **Step 8: 更新示例章节**

原第 362–387 行的"首次使用示例"里，示例 4（设计方案对比 → arbiter）改为 → `sigi-design-audit`；其余示例的 skill 名同步。

- [ ] **Step 9: 验证无残留**

```bash
grep -n "ag-design-\|arbiter\|8 个\|6 个协作" README.md
```

预期：无输出。

- [ ] **Step 10: 提交**

```bash
git add README.md
git commit -m "README 重写：新命名 + 3 接口链路 + 快速开始前移

删除 8 接口全景图（图越全越容易出死接口）
删除纯装饰的自演化机制章节
加旧版升级提示"
```

---

## Task 18：最终验收

- [ ] **Step 1: 跑完整验证**

```bash
bash scripts/verify-skills.sh
```

预期：**全绿，退出码 0**。

- [ ] **Step 2: 断链全量复查**

```bash
for f in $(find sigi-design* tests -name "*.md" 2>/dev/null); do
  d=$(dirname "$f")
  grep -o '\](\([^)]*\.md\))' "$f" 2>/dev/null | sed 's/](//;s/)//' | while read -r link; do
    case "$link" in http*) continue;; esac
    [ -f "$d/$link" ] || echo "断链: $f → $link"
  done
done
```

预期：无输出。

- [ ] **Step 3: 脚本语法全检**

```bash
for s in scripts/*.sh; do bash -n "$s" && echo "✓ $s"; done
```

预期：全部 `✓`。

- [ ] **Step 4: 逐条核对 spec §7 验收标准**

```bash
sed -n '/^## 7. 验收标准/,/^## 8/p' docs/sigi-design/specs/2026-08-03-skills-refactor-design.md
```

对照 8 条逐一确认，把 spec 里的 `- [ ]` 改为 `- [x]`。

- [ ] **Step 5: 跑触发测试**

开一个**全新会话**（不带本仓库上下文），按 `tests/skill-triggering/cases.md` 逐条发 prompt，记录结果。

重点关注 E1–E6 边界用例。有 FAIL → 回 Task 8 调对应 description（E5/E6 FAIL 则调 SKILL.md 铁律措辞）。

- [ ] **Step 6: 本地安装冒烟测试**

```bash
bash scripts/install.sh
ls -la ~/.claude/skills/ | grep -E "sigi-design|ag-design"
```

预期：6 个 `sigi-design-*` 软链存在，无任何 `ag-design-*` 残留。

- [ ] **Step 7: 提交验收结果**

```bash
git add docs/sigi-design/specs/2026-08-03-skills-refactor-design.md
git commit -m "重构完成，spec 验收标准逐条勾选"
```

- [ ] **Step 8: 推送前确认**

推送到远端需要用户明确授权。向用户汇报验收结果，询问是否推送，**不要自行 push**。

---

## 附录：回滚方案

任何阶段出问题：

```bash
# 回滚到某个 Task 之前
git log --oneline | head -20
git revert <commit>          # 保留历史的回滚（推荐）
```

改名用的是 `git mv`，历史完整保留，`git log --follow` 可追溯改名前的提交。
