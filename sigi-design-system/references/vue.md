# Vue 用法示例

> **形式：class 型组件 + AG token**。
> Vue 使用 class 绑定配合 `:class` 的 `.is-*` 切换实现交互态，**不重写样式**。
> 组件清单和用法见 `references/components-v2.md`。示例用 Vue 3 `<script setup>`。

## 接入（一次）

```ts
// main.ts
import "./styles/tokens.css";      // 复制自 assets/tokens.css
```

切换主题：
```ts
document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
// 不设则跟随系统 prefers-color-scheme
```

## 静态组件：直接写 class

```vue
<template>
  <button class="ag-btn ag-btn--primary">开始对话</button>
  <button class="ag-btn ag-btn--secondary ag-btn--compact">取消</button>
  <input class="ag-input" placeholder="you@example.com" />

  <div class="ag-card ag-card--contained is-clickable">
    <h3 class="ag-card__title">项目卡</h3>
    <p class="ag-card__desc">默认 Contained 变体。</p>
  </div>

  <span class="ag-tag ag-tag--success">ACTIVE</span>
</template>
```

## 带 variant 的薄封装（可选）

```vue
<!-- AgButton.vue -->
<script setup lang="ts">
defineProps<{ variant?: "primary" | "secondary" | "ghost" | "danger"; compact?: boolean }>();
</script>
<template>
  <button :class="['ag-btn', `ag-btn--${variant ?? 'primary'}`, { 'ag-btn--compact': compact }]">
    <slot />
  </button>
</template>

<!-- 用法 -->
<AgButton variant="danger">删除</AgButton>
```

## 交互态：用 ref + :class 切换 .is-*

**Switch**
```vue
<script setup lang="ts">
const model = defineModel<boolean>();   // Vue 3.4+ v-model
</script>
<template>
  <button role="switch" :aria-checked="model"
    :class="['ag-switch', { 'is-on': model }]"
    @click="model = !model">
    <span class="ag-switch__thumb" />
  </button>
</template>
```

**Tabs**
```vue
<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{ items: { key: string; label: string }[] }>();
const active = ref(props.items[0]?.key);
</script>
<template>
  <div class="ag-tabs">
    <div class="ag-tabs__list" role="tablist">
      <button v-for="t in items" :key="t.key" role="tab" :aria-selected="active === t.key"
        :class="['ag-tab', { 'is-active': active === t.key }]"
        @click="active = t.key">
        {{ t.label }}
      </button>
    </div>
    <div class="ag-tabs__panel" role="tabpanel">
      <slot :active="active" />
    </div>
  </div>
</template>
```

**Modal（Teleport + Esc 关闭 + 点击遮罩关闭）**
```vue
<script setup lang="ts">
import { watch, onUnmounted } from "vue";
const props = defineProps<{ open: boolean; title: string }>();
const emit = defineEmits<{ close: [] }>();
const onKey = (e: KeyboardEvent) => e.key === "Escape" && emit("close");
watch(() => props.open, (v) => v ? window.addEventListener("keydown", onKey) : window.removeEventListener("keydown", onKey));
onUnmounted(() => window.removeEventListener("keydown", onKey));
</script>
<template>
  <Teleport to="body">
    <div v-if="open" class="ag-overlay" @click="emit('close')">
      <div class="ag-modal" role="dialog" aria-modal="true" @click.stop>
        <div class="ag-modal__header">
          <h2 class="ag-modal__title">{{ title }}</h2>
          <button class="ag-btn ag-btn--ghost ag-icon-btn" aria-label="关闭" @click="emit('close')">✕</button>
        </div>
        <div class="ag-modal__body"><slot /></div>
        <div class="ag-modal__footer"><slot name="footer" /></div>
      </div>
    </div>
  </Teleport>
</template>
```

**Accordion**
```vue
<script setup lang="ts">
import { ref } from "vue";
defineProps<{ title: string }>();
const open = ref(false);
</script>
<template>
  <div :class="['ag-accordion__item', { 'is-open': open }]">
    <button class="ag-accordion__trigger" :aria-expanded="open" @click="open = !open">
      {{ title }} <span class="ag-accordion__icon" aria-hidden>▾</span>
    </button>
    <div v-if="open" class="ag-accordion__panel"><slot /></div>
  </div>
</template>
```

## 约束（与 checklist.md 一致）

- ❗ 只用 class 引用已有类，**不要在 `<style>` 里写硬编码色值**；如需 scoped 样式也只引用 `var(--color-*)` 等 token。
- 动态值（slider 百分比、progress 宽度）用 `:style` 绑定，且只用于布局尺寸，不用于颜色。
- 产出后对照 `references/checklist.md` 自检。
