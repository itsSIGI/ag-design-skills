# 达标自检清单（产出任何 UI 后逐条核对）

> 这是防止"组件不达规范"的核心机制。生成完组件代码后，**逐条对照本清单**，
> 任一条违反必须改正后才算完成。带 ❌ 的是高频翻车点，重点检查。

## 0. 总铁律：业务 UI 禁止手写视觉值（违反频率最高，零容忍）

- [ ] ❌ **绝不在业务 UI / 新增组件里手写任何"视觉值"**——颜色、`:focus`/`:hover` 态、背景、边框、圆角、阴影、字重，一律走 shadcn/AG 组件或 `var(--*)` token。
- [ ] ❌ **绝不自己写 `:focus` / `:hover` 规则**（最高频漏网点）。输入框/按钮/链接的交互态已内置在 shadcn/AG 组件里，手写一套（尤其蓝色 focus）= 直接违规。
- [ ] ❌ **任何输入框必须用 `<Input>`**，不许另起一套 `border`/`box-shadow`/`background` 的 focus 样式。
- [ ] **"想要的视觉效果 skill 里一定有"**：先找 shadcn/AG 组件 / `var(--*)` token；确实找不到 → **停下来问，不许自己造值**。
- [ ] ✅ **唯一允许手写的是「布局」**：`display`/`flex`/`grid`/`gap`/`width` 等排布尺寸可手写（间距优先用 `var(--space-*)`）。组件的"长相"不许碰，组件的"排布"才归你管。
- [ ] ✅ `components-v2.md` 中的示例代码只服务组件文档展示，**不要原样复制到业务代码**。

## A. 颜色（最易翻车）

- [ ] ❌ **焦点环（focus）是中性色**（`--color-focus-ring` = N1000/W），**不是品牌蓝**。检查所有 `outline`/focus `box-shadow`。
- [ ] ❌ **卡片选中态是中性色**（`--color-selected`），不是品牌蓝。
- [ ] ❌ **输入框/Select 的 focus 是中性**——`border`、`box-shadow` halo **和背景色全部中性**。**淡蓝底 / 蓝边框都算违规**（不只是"焦点环"，整个 focus 态都不许带蓝）。
- [ ] ❌ **按钮填充没有用彩色**——Primary 是黑/白，其余中性；只有 Danger 用红。
- [ ] ❌ **导航 link hover 是中性**（`--color-text-secondary`），不是品牌蓝。
- [ ] 品牌蓝/绿只出现在三处：链接 hover、agent 状态点、代码高亮。其他地方出现 → 复核。
- [ ] Agent 状态点颜色正确：绿=running、蓝=idle、红=error、灰=paused，**没有交换**。
- [ ] Tag 语义槽没有错配（成功≠蓝、错误≠黄）；分类用装饰色且与 B/G/Y/R 不重叠。

## B. 零硬编码（换肤的前提）

- [ ] ❌ 业务组件 CSS **没有出现裸十六进制色值**（如 `#0F1729`），全部用 `var(--color-*)`。
- [ ] ❌ padding/margin/gap **没有裸数字**，全部从 `--space-*` 取；控件固有尺寸从 `--size-*` / `--border-*` / `--ring-*` 取。
- [ ] radius 全部用 `--radius-*`，**没有自定义新圆角**。
- [ ] 阴影全部用 `--shadow-*`/`--ring-*`，**没有自定义新阴影**。
- [ ] 颜色/尺寸的唯一来源是 `tokens.css`；业务层零写死值 → 换主题只改 tokens 即可。

## C. 排版

- [ ] ❌ **字重没有用 700**；标题最多 600，按钮/导航/链接 500，正文 400。
- [ ] 大标题（≥22px）带负字距（`-0.01em ~ -0.02em`）。
- [ ] 字体用系统栈（`--font-sans`/`--font-mono`），**没有引入 Web Font / Google Fonts / Font Awesome**。
- [ ] 导航/正文用 sentence case，uppercase 仅用于 11px micro label / 徽章。

## D. 圆角与层级一致性

- [ ] 同层级多个元素用同一 radius token（不出现"按钮6px、输入框8px"）。
- [ ] 嵌套元素 radius ≤ 父元素 radius。
- [ ] 默认值正确：按钮/输入 6px，卡片 8px，弹窗/用户气泡 12px，tag 4px，agent 气泡 0。

## E. 暗色模式

- [ ] Primary 按钮在暗色下翻转（黑底白字 → 白底黑字）—— 用语义变量即自动满足。
- [ ] 暗色下阴影降级为 1px 边框（Whisper/Card）—— `tokens.css` 已处理，确认未额外写死浅色阴影。
- [ ] 切 `[data-theme="dark"]` 后只靠 token 切换，**组件代码无需任何改动**。

## F. 组件细节与无障碍

- [ ] Checkbox 用 CSS 几何画勾（非图标 glyph）；方形=多选/圆形=单选/胶囊=开关 没有混用。
- [ ] Switch 仅用于即时生效开关；"提交后才生效"的字段用 Checkbox。
- [ ] 所有 focusable 元素有可见 focus ring；仅图标按钮有 `aria-label`；装饰图标 `aria-hidden`。
- [ ] Danger 操作带二次确认。
- [ ] 图标来自白名单成套库（MingCute / Lucide），单项目单库保持统一，`currentColor` 继承文字色；shadcn 自带 Lucide 微图标豁免；**不**手写 SVG / 不用 emoji / 不混用多个主库。

## 快速 grep 自查（可选）

对生成的业务组件 CSS 跑（不要扫 `tokens.css` / 官方组件库内部样式）：
```bash
# 不应有裸十六进制色值（tokens.css 除外）
grep -nE '#[0-9A-Fa-f]{3,6}' your-components.css
# 焦点环误用品牌蓝的信号
grep -niE 'outline.*(123AFF|signal-blue|link-hover)' your-components.css
# 手写 focus/hover 规则（应几乎为零——交互态都在组件内部）
grep -niE ':(focus|hover)' your-styles.css
# focus 态带蓝（淡蓝底 / 蓝边框都算违规）
grep -niE ':focus[^}]*(blue|123AFF|signal-blue|#[0-9A-Fa-f]{3,6})' your-styles.css
```
有命中 → 逐个核对是否违规。`:focus`/`:hover` 命中尤其要警惕：除非是 shadcn/AG 组件内部样式，否则就是手写违规。
