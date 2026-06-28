#!/usr/bin/env bash
#
# AG Design Skills — 静默自动更新（Claude Code SessionStart hook 调用）
#
# 行为:
#   - 有新版本 → 拉取并打印一行更新提示
#   - 无更新   → 完全静默
#   - 失败/超时/无网络 → 静默退出,绝不阻塞 Claude Code 启动
#
# 在 ~/.claude/settings.json 中这样接入:
#   "SessionStart": [ { "hooks": [
#     { "type": "command", "command": "bash ~/.ag-design-skills/scripts/auto-update.sh" }
#   ] } ]

INSTALL_DIR="${AG_DESIGN_DIR:-$HOME/.ag-design-skills}"
TIMEOUT_SECS="${AG_DESIGN_UPDATE_TIMEOUT:-10}"

# 不是 git 仓库就直接退(可能用户没用 install.sh 装),静默
[ -d "$INSTALL_DIR/.git" ] || exit 0

# 选一个可用的 timeout 命令(macOS 默认无 timeout,可能有 gtimeout)
TIMEOUT_BIN=""
if command -v timeout >/dev/null 2>&1; then
  TIMEOUT_BIN="timeout"
elif command -v gtimeout >/dev/null 2>&1; then
  TIMEOUT_BIN="gtimeout"
fi

run_with_timeout() {
  if [ -n "$TIMEOUT_BIN" ]; then
    "$TIMEOUT_BIN" "$TIMEOUT_SECS" "$@"
  else
    "$@"
  fi
}

before="$(git -C "$INSTALL_DIR" rev-parse HEAD 2>/dev/null)" || exit 0

# ff-only 静默拉取;任何失败(网络/冲突/超时)都吞掉,不阻塞启动
run_with_timeout git -C "$INSTALL_DIR" pull --ff-only --quiet >/dev/null 2>&1 || exit 0

after="$(git -C "$INSTALL_DIR" rev-parse HEAD 2>/dev/null)" || exit 0

# 有更新才提示,否则静默
if [ -n "$after" ] && [ "$before" != "$after" ]; then
  short="$(git -C "$INSTALL_DIR" rev-parse --short HEAD 2>/dev/null)"
  title="$(git -C "$INSTALL_DIR" log -1 --pretty=%s 2>/dev/null)"
  printf '\033[32m✓ AG Design Skills 已更新到 %s: %s\033[0m\n' "$short" "$title"
fi

exit 0
