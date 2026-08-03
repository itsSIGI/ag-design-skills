# Vision Spec Mode — 视觉创新页面的 recipe 构建

> 当 build 收到来自 `sigi-design-vision` 的 Vision Spec 时读本文件。
> 本模式**不替代**标准 Step 1-6，只修改 Step 1 的 recipe 输入来源。

---

## Vision Spec Mode（视觉创新页面）

> 当 craft 收到来自 `sigi-design-vision` 的 Vision Spec 时激活。适用于 Landing page、营销页、品牌页等需要审美创新的场景。

### 触发条件

- 用户说"按照 Vision Spec 生成"
- vision skill 交付了完整 Vision Spec（7 章节结构化方案）
- compass 模块规格表标注 `视觉创新: 是`，且 vision 已产出 Spec

### 与标准流程的关系

Vision Spec Mode **不替代**标准 Step 1-6 流程，而是**修改 Step 1 的 recipe 输入来源**：

```
标准模式：  用户描述 → Step 1 recipe → Step 2-6
Vision 模式：Vision Spec + 用户描述 → Step 1 recipe（含 TOKEN_ESCAPE）→ Step 2-6
```

### Step 1 的变化：读 Vision Spec 构建 Recipe

1. **读 TIER mapping**（Vision Spec §7）确定每个 section 的 TIER 分类：
   - **TIER_1 区域**：走标准 recipe 流程，使用 shadcn/AG 组件 + 标准 token
   - **TIER_2 区域**：走标准 recipe，可使用 shadcn/AG 组件变体（暗色变体等）
   - **TIER_3 区域**：按 Vision Spec 自建结构，每个自定义值登记为 TOKEN_ESCAPE

2. **TIER_3 区域的 recipe 登记**：

   | Slot | 组件类型 | 来源 | 组件 / 自建 | Token 引用 | 验证来源 | 备注 |
   |------|---------|------|----------------|-----------|---------|------|
   | Hero 标题 | Display Text | vision-spec | 自建 | TOKEN_ESCAPE: hero-title-size | Vision Spec §3 | clamp(40px, 5vw+12px, 64px) |
   | Hero 背景 | Section | vision-spec | 自建 | TOKEN_ESCAPE: hero-section-bg | Vision Spec §2 | #0C0F1A |

   - `来源` 列标注 `vision-spec`
   - `验证来源` 列标注 Vision Spec 对应章节号
   - 每个 TOKEN_ESCAPE 必须在 recipe 中显式登记

3. **过渡接缝（Transition Seam）**：
   - 读 Vision Spec §7 的过渡描述
   - 在 recipe 中为过渡带分配独立 slot（如"Hero→Body 渐变过渡"）
   - 过渡带的视觉值走 TOKEN_ESCAPE 或标准 token 渐变

### Step 3 的变化：按 Spec 生成代码

- **TIER_3 区域**：按 Vision Spec §2-§6 的具体参数值生成（配色、排版、布局、动效、插画）
- **TIER_1/2 区域**：仍走标准 shadcn/AG 组件 + token，与普通页面无异
- **动效**：按 Vision Spec §5 的 motion plan 实现，包括 easing、duration、trigger、stagger
- **prefers-reduced-motion**：必须按 Spec §5 的回退方案实现

### Step 3.6 Token 校验的变化

- TOKEN_ESCAPE 声明的值**不算硬编码违规**（已在 recipe 中显式登记）
- 但 TOKEN_ESCAPE 总数必须 ≤ 15，TIER_1 区域必须 = 0
- 未在 recipe 登记的硬编码仍然违规

### Step 4 audit 的变化

传给 `sigi-design-audit` 时额外附上：
- Vision Spec 的 §7 TIER mapping
- Recipe 中所有 TOKEN_ESCAPE 条目
- audit 会检查 TOKEN_ESCAPE 声明完整性（每个自定义值都有对应声明）

### 关键不变量

- ✅ TIER_1 区域零 TOKEN_ESCAPE——导航、Footer 等必须用标准 AG 组件
- ✅ Recipe Gate（Step 1.5）仍然强制执行——Vision Spec 不免除 recipe 门禁
- ✅ 6 条铁律在 Vision Spec Mode 下同样有效
- ❌ 不允许"整个页面都是 TIER_3"——至少导航和 Footer 是 TIER_1
