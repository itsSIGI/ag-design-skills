#!/usr/bin/env bash
#
# AG Design Skills — 手动更新（通用兜底）
#
# 适用于 Cursor / Windsurf / Codex 等无 hook 的工具,或不想用自动更新的人。
# 需要时跑一下即可:
#   bash ~/.ag-design-skills/scripts/update.sh

set -uo pipefail

INSTALL_DIR="${AG_DESIGN_DIR:-$HOME/.ag-design-skills}"

info() { printf '\033[36m›\033[0m %s\n' "$1"; }
ok()   { printf '\033[32m✓\033[0m %s\n' "$1"; }
err()  { printf '\033[31m✗\033[0m %s\n' "$1"; }

if [ ! -d "$INSTALL_DIR/.git" ]; then
  err "未找到本地仓库: $INSTALL_DIR"
  err "请先运行安装脚本:bash scripts/install.sh"
  exit 1
fi

before="$(git -C "$INSTALL_DIR" rev-parse --short HEAD 2>/dev/null)"
info "当前版本: $before"
info "拉取最新..."

if ! git -C "$INSTALL_DIR" pull --ff-only; then
  err "更新失败,请检查网络或本地是否有冲突修改"
  exit 1
fi

after="$(git -C "$INSTALL_DIR" rev-parse --short HEAD 2>/dev/null)"

if [ "$before" = "$after" ]; then
  ok "已是最新版本 ($after),无需更新"
else
  ok "已更新: $before → $after"
  git -C "$INSTALL_DIR" log -1 --pretty='  最新提交: %s'
fi
