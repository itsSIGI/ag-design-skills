#!/usr/bin/env bash
#
# AG Design Skills — 自动把 SessionStart 更新 hook 合并进 Claude Code settings.json
#
# 由 install.sh 调用,也可单独运行。安全特性:
#   - 幂等:已配置则跳过,不重复添加
#   - 备份:写入前备份原 settings.json
#   - 保留:用 jq / python3 合并,绝不覆盖用户已有的 hook
#   - 容错:无 jq 也无 python3 时,降级为打印手动配置提示
#
# 用法: bash scripts/configure-hook.sh

set -uo pipefail

INSTALL_DIR="${AG_DESIGN_DIR:-$HOME/.ag-design-skills}"
SETTINGS="${CLAUDE_SETTINGS:-$HOME/.claude/settings.json}"
HOOK_CMD="bash $INSTALL_DIR/scripts/auto-update.sh"

info()  { printf '\033[36m›\033[0m %s\n' "$1"; }
ok()    { printf '\033[32m✓\033[0m %s\n' "$1"; }
warn()  { printf '\033[33m!\033[0m %s\n' "$1"; }

print_manual_hint() {
  cat <<EOF
$(warn "无法自动配置,请手动在 $SETTINGS 的 hooks.SessionStart 中加入:")

  { "type": "command", "command": "$HOOK_CMD" }
EOF
}

# --- settings.json 不存在则创建一个最小骨架 --------------------------------
mkdir -p "$(dirname "$SETTINGS")"
if [ ! -f "$SETTINGS" ]; then
  printf '{}\n' > "$SETTINGS"
  info "创建了新的 settings.json"
fi

# --- 幂等检查:已含我们的 hook 命令就跳过 ----------------------------------
if grep -q "scripts/auto-update.sh" "$SETTINGS" 2>/dev/null; then
  ok "自动更新 hook 已配置,跳过"
  exit 0
fi

# --- 备份 -------------------------------------------------------------------
backup="$SETTINGS.bak.$(date +%Y%m%d%H%M%S)"
cp "$SETTINGS" "$backup"

merge_with_jq() {
  jq --arg cmd "$HOOK_CMD" '
    .hooks //= {} |
    .hooks.SessionStart //= [] |
    .hooks.SessionStart += [ { "hooks": [ { "type": "command", "command": $cmd } ] } ]
  ' "$SETTINGS" > "$SETTINGS.tmp" && mv "$SETTINGS.tmp" "$SETTINGS"
}

merge_with_python() {
  CLAUDE_SETTINGS="$SETTINGS" AG_HOOK_CMD="$HOOK_CMD" python3 - <<'PY'
import json, os, sys
path = os.environ["CLAUDE_SETTINGS"]
cmd  = os.environ["AG_HOOK_CMD"]
try:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
except Exception:
    data = {}
if not isinstance(data, dict):
    sys.exit(1)
hooks = data.setdefault("hooks", {})
ss = hooks.setdefault("SessionStart", [])
ss.append({"hooks": [{"type": "command", "command": cmd}]})
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")
PY
}

# --- 合并:jq 优先,降级 python3 -------------------------------------------
if command -v jq >/dev/null 2>&1; then
  if merge_with_jq; then
    ok "已通过 jq 自动配置自动更新 hook(原配置备份: $backup)"
    exit 0
  fi
elif command -v python3 >/dev/null 2>&1; then
  if merge_with_python; then
    ok "已通过 python3 自动配置自动更新 hook(原配置备份: $backup)"
    exit 0
  fi
fi

# --- 都失败:还原备份 + 手动提示 -------------------------------------------
cp "$backup" "$SETTINGS"
warn "自动配置未成功,已还原原配置"
print_manual_hint
exit 0
