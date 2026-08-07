#!/usr/bin/env bash
#
# Sigi Design Skills — 一次性安装脚本
#
# 作用:
#   1. 把仓库克隆到 ~/.sigi-design-skills（已存在则更新）
#   2. 把 6 个 sigi-design-* skill（含入口）软链到 ~/.claude/skills/
#   3. 引导启用 Claude Code 自动更新
#
# 用法:
#   bash scripts/install.sh
#   或一行式: curl -fsSL <raw-url>/scripts/install.sh | bash
#
# 幂等:可重复执行,不会报错。

set -euo pipefail

REPO_URL="https://github.com/itsSIGI/sigi-design-skills.git"
INSTALL_DIR="${SIGI_DESIGN_DIR:-$HOME/.sigi-design-skills}"
SKILLS_DIR="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"
LEGACY_INSTALL_DIR="$HOME/.ag-design-skills"
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

info()  { printf '\033[36m›\033[0m %s\n' "$1"; }
ok()    { printf '\033[32m✓\033[0m %s\n' "$1"; }
warn()  { printf '\033[33m!\033[0m %s\n' "$1"; }

# --- 0. 迁移旧安装目录 ~/.ag-design-skills → ~/.sigi-design-skills -----------
# 不迁移的话,旧目录仍在但脚本已指向新路径,会重新克隆一份;
# 而 ~/.claude/skills 的软链还指向旧目录 —— 软链不坏,但静默停止更新。
if [ ! -e "$INSTALL_DIR" ] && [ -d "$LEGACY_INSTALL_DIR/.git" ]; then
  info "检测到旧安装目录,迁移: $LEGACY_INSTALL_DIR → $INSTALL_DIR"
  mv "$LEGACY_INSTALL_DIR" "$INSTALL_DIR"
  git -C "$INSTALL_DIR" remote set-url origin "$REPO_URL" 2>/dev/null || true
  ok "迁移完成,远端地址已更新"
fi

# --- 1. 克隆或更新本地仓库 ---------------------------------------------------
if [ -d "$INSTALL_DIR/.git" ]; then
  info "已存在本地仓库,拉取最新: $INSTALL_DIR"
  # 仓库改名后旧 remote 虽有 GitHub redirect,仍统一到新地址避免长期依赖
  git -C "$INSTALL_DIR" remote set-url origin "$REPO_URL" 2>/dev/null || true
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
