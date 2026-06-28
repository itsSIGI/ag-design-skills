#!/usr/bin/env bash
#
# AG Design Skills — 一次性安装脚本
#
# 作用:
#   1. 把仓库克隆到 ~/.ag-design-skills（已存在则更新）
#   2. 把 6 个 ag-design-* skill 软链到 ~/.claude/skills/
#   3. 引导启用 Claude Code 自动更新
#
# 用法:
#   bash scripts/install.sh
#   或一行式: curl -fsSL <raw-url>/scripts/install.sh | bash
#
# 幂等:可重复执行,不会报错。

set -euo pipefail

REPO_URL="https://github.com/itsSIGI/ag-design-skills.git"
INSTALL_DIR="${AG_DESIGN_DIR:-$HOME/.ag-design-skills}"
SKILLS_DIR="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"
SKILLS=(
  ag-design-system
  ag-design-compass
  ag-design-vision
  ag-design-craft
  ag-design-arbiter
  ag-design-audit
)

info()  { printf '\033[36m›\033[0m %s\n' "$1"; }
ok()    { printf '\033[32m✓\033[0m %s\n' "$1"; }
warn()  { printf '\033[33m!\033[0m %s\n' "$1"; }

# --- 1. 克隆或更新本地仓库 ---------------------------------------------------
if [ -d "$INSTALL_DIR/.git" ]; then
  info "已存在本地仓库,拉取最新: $INSTALL_DIR"
  git -C "$INSTALL_DIR" pull --ff-only --quiet || warn "拉取失败(可能无网络),沿用现有版本"
  ok "仓库已是最新"
else
  if [ -e "$INSTALL_DIR" ]; then
    warn "$INSTALL_DIR 已存在但不是 git 仓库,请先手动备份/删除后重试"
    exit 1
  fi
  info "克隆仓库到 $INSTALL_DIR"
  git clone --quiet "$REPO_URL" "$INSTALL_DIR"
  ok "克隆完成"
fi

# --- 2. 软链 skill 到 Claude Code skills 目录 -------------------------------
mkdir -p "$SKILLS_DIR"
info "软链 skills 到 $SKILLS_DIR"
for skill in "${SKILLS[@]}"; do
  src="$INSTALL_DIR/$skill"
  dst="$SKILLS_DIR/$skill"
  if [ ! -d "$src" ]; then
    warn "源目录缺失,跳过: $src"
    continue
  fi
  # 若旧版是 cp -r 拷贝的普通目录,先移除再建软链(迁移路径)
  if [ -d "$dst" ] && [ ! -L "$dst" ]; then
    info "  替换旧拷贝为软链: $skill"
    rm -rf "$dst"
  fi
  ln -sfn "$src" "$dst"
  ok "  $skill → $src"
done

# --- 3. 自动配置 Claude Code 更新 hook -------------------------------------
info "配置 Claude Code 自动更新..."
bash "$INSTALL_DIR/scripts/configure-hook.sh" || warn "hook 配置步骤出错,可稍后手动运行 scripts/configure-hook.sh"

# --- 4. 收尾说明 ------------------------------------------------------------
cat <<EOF

$(ok "安装完成!")

  【Claude Code】自动更新已配置完毕 —— 重启 Claude Code 后,
  每次启动会自动拉取最新版,无需任何手动操作。

  【Cursor / Codex / 其他工具】无 hook 机制,需要时手动更新:

      bash $INSTALL_DIR/scripts/update.sh

详见仓库 README 的「自动更新」章节。
EOF
