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
#   docs/               历史记录（spec 与实施计划），保留旧名是正确的
#   scripts/install.sh  LEGACY_SKILLS 数组必须保留旧名用于清理，由断言 8 单独校验
#   scripts/verify-skills.sh  本文件的断言 2 需列举旧名
# 另注：仓库名 ag-design-skills、安装目录 ~/.ag-design-skills、环境变量
#   AG_DESIGN_DIR 均不在改名范围内，故只匹配 6 个具体 skill 后缀。
residue=$(grep -rn "ag-design-\(system\|compass\|vision\|craft\|arbiter\|audit\)" \
  --include="*.md" --include="*.sh" --include="*.json" --include="*.yaml" . \
  | grep -v "^./docs/" | grep -v "^./.git/" \
  | grep -v "^./scripts/install.sh" | grep -v "^./scripts/verify-skills.sh" || true)
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
