# Aesthetic Library / 审美参考库

> Vision Skill 的内部审美参考库。当 web search 不可用时，从这里获取高质量的视觉方向；
> 有 web search 时，用这里的参数作为搜索结果的质量基线和参数化骨架。

## 目录结构

```
aesthetic-library/
├── archetypes/       风格原型具体参数（11 个原型的标杆分析 + CSS 值）
├── palettes/         配色方案库（行业 × 视觉特质双维度，WCAG AA 验证）
├── patterns/         页面元素视觉范式（hero/feature/CTA 等的布局+动效模板）
├── compositions/     完整页面组合参考（风格×行业×叙事的交叉组合）
└── inspirations/     精选设计灵感库（6 大视觉特质分类的高质量参考 + 视觉 DNA）
```

## 使用协议

### 双轨流程（Vision Step 2）

```
搜索灵感时：
│
├─ Web search 可用
│  1. 主路径：搜索 Dribbble/Behance/Awwwards
│  2. 用 inspirations/ 的预收集参考作为基线对照
│  3. 用 archetypes/ 的参数化骨架补充具体值
│  4. 用 palettes/ 校验配色的专业度
│  5. 用 patterns/ 确认布局范式有成熟先例
│
└─ Web search 不可用
   1. 从 inspirations/ 按视觉特质匹配预收集参考
   2. 从 archetypes/ 按情绪关键词匹配风格原型
   3. 从 palettes/ 选取匹配行业和视觉特质的配色方案
   4. 从 patterns/ 选取页面元素的视觉范式
   5. 从 compositions/ 选取完整页面组合作为起点
   6. 向用户说明："基于内置审美库推荐，非实时搜索结果"
```

### 质量保证

- 所有配色方案经过 WCAG AA 对比度验证
- 所有 CSS 值来自成熟产品的实际实现（标注参考来源）
- 所有排版参数遵循模块化字阶体系
- 所有动效方案标注质量等级（A/B/C）

### 沉淀机制

每次 Vision Spec 成功交付后：
1. 提取 Vision Spec 中经过验证的视觉参数
2. 归类到对应子目录
3. 标注来源项目和交付日期
