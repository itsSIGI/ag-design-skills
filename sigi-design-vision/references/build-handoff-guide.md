# Build Implementation Guide — 交付给 sigi-design-build 的实现指南

> vision Step 5 交付时，在 Vision Spec 末尾追加本指南。
> 三个小节：Recipe 策略 / Transition Seam 实现 / 技术栈建议。

---

```markdown
## Build Implementation Guide / 实现指南

### Recipe 策略
- **TIER_3 区域**（Hero 等）：按 Vision Spec 值直接实现，每个 TOKEN_ESCAPE 在 recipe 中单独登记
- **TIER_2 区域**（Body sections）：走标准 recipe 流程，从 decision-tables + components-v2.md 选组件
- **TIER_1 区域**（Nav/Footer）：走标准 recipe 流程，零偏离

### Transition Seam 实现
- [描述从创意区到标准区的 CSS 过渡方式——如渐变覆盖层、颜色渐变、间距渐变]

### 技术栈建议
- **动效库**：[CSS-only / Framer Motion / GSAP，基于动效复杂度选择]
- **响应式**：[clamp() 为主 / media query 补充]
- **字体加载**：[如有 display font，加载策略]
```
