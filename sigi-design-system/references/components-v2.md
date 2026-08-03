# Components v2 — shadcn/ui + AG 扩展组件用法说明

> 做某个组件时查本表：确认组件存在 → 导入对应组件 → 按下方「API/变体/约束」使用。
> 组件分两层：`components/ui/`（shadcn 标准）和 `components/ag/`（AG 独有扩展）。
> 所有组件通过 token-bridge.css 自动消费 AG token 配色，**无需手写颜色**。

## 目录
- **shadcn/ui**: [Button](#button) · [Input](#input) · [Textarea](#textarea) · [Label](#label) · [Select](#select) · [Checkbox](#checkbox) · [RadioGroup](#radiogroup) · [Switch](#switch) · [Slider](#slider) · [Card](#card) · [Badge](#badge) · [Dialog](#dialog) · [Sheet](#sheet--drawer) · [Tabs](#tabs) · [Tooltip](#tooltip) · [DropdownMenu](#dropdownmenu) · [Popover](#popover) · [Accordion](#accordion) · [Table](#table) · [Progress](#progress) · [Skeleton](#skeleton) · [Breadcrumb](#breadcrumb) · [Pagination](#pagination) · [Avatar](#avatar) · [Collapsible](#collapsible) · [Separator](#separator)
- **AG 扩展**: [AgCard](#agcard) · [AgBadge](#agbadge) · [AgentStatus](#agentstatus) · [CodeBlock](#codeblock) · [AgLink](#aglink) · [EmptyState](#emptystate) · [Typography](#typography)

---

## 三层架构

```
tokens.css            AG 唯一事实源（颜色/间距/圆角/阴影）
    ↓
token-bridge.css      AG → shadcn 变量别名映射
    ↓
components/ui/        shadcn 标准组件（消费 shadcn 变量）
components/ag/        AG 扩展组件（直接消费 AG token）
```

---

# shadcn/ui 标准组件

## Button
路径：`components/ui/button.tsx`
导入：`import { Button } from '@/components/ui/button'`

**Variants**：`default`(黑底白字) / `secondary`(灰底) / `ghost`(无底) / `destructive`(红底) / `outline`(描边) / `link`(下划线)
**Sizes**：`default`(h-10) / `sm`(h-9) / `lg`(h-11) / `icon`(h-10 w-10)
**Props**：`variant` / `size` / `asChild`(Slot 模式) / `disabled` / 所有原生 button 属性

约束：
- 焦点环已是中性色（通过 `--ring` → `--color-focus-ring` 桥接）
- **禁止给按钮填充改成彩色**
- Danger 按钮仅用于不可逆破坏操作，**需带二次确认 Dialog**

## Input
路径：`components/ui/input.tsx`
导入：`import { Input } from '@/components/ui/input'`

**Props**：所有原生 input 属性（type / placeholder / disabled 等）
focus 是中性 ring（`--ring` → `--color-focus-ring`），**不是品牌蓝**。

## Textarea
路径：`components/ui/textarea.tsx`
导入：`import { Textarea } from '@/components/ui/textarea'`

与 Input 同风格，min-height 80px。

## Label
路径：`components/ui/label.tsx`
导入：`import { Label } from '@/components/ui/label'`

配合 Input/Checkbox/Radio 使用。`htmlFor` 绑定。

## Select
路径：`components/ui/select.tsx`
导入：`import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'`

基于 Radix Select，内置键盘导航 + ARIA。
```tsx
<Select>
  <SelectTrigger><SelectValue placeholder="选择..." /></SelectTrigger>
  <SelectContent>
    <SelectItem value="a">选项 A</SelectItem>
    <SelectItem value="b">选项 B</SelectItem>
  </SelectContent>
</Select>
```
区别于 DropdownMenu：Select 是**值选择**，DropdownMenu 是**操作菜单**。

## Checkbox
路径：`components/ui/checkbox.tsx`
导入：`import { Checkbox } from '@/components/ui/checkbox'`

基于 Radix Checkbox。选中色中性（primary），**禁止品牌蓝**。
几何形态严格区分语义：**方形=多选(Checkbox)、圆形=单选(RadioGroup)、胶囊=即时开关(Switch)**。

## RadioGroup
路径：`components/ui/radio-group.tsx`
导入：`import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'`

```tsx
<RadioGroup defaultValue="a">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="a" id="r-a" />
    <Label htmlFor="r-a">选项 A</Label>
  </div>
</RadioGroup>
```

## Switch
路径：`components/ui/switch.tsx`
导入：`import { Switch } from '@/components/ui/switch'`

**仅用于即时生效的布尔开关**；"提交后才生效"的字段用 Checkbox。

## Slider
路径：`components/ui/slider.tsx`
导入：`import { Slider } from '@/components/ui/slider'`

`<Slider defaultValue={[50]} max={100} step={1} />`

## Card
路径：`components/ui/card.tsx`
导入：`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'`

shadcn Card 是单级（border + shadow-sm）。如需 5 级 elevation → 用 **AgCard**。

## Badge
路径：`components/ui/badge.tsx`
导入：`import { Badge } from '@/components/ui/badge'`

**Variants**：`default` / `secondary` / `destructive` / `outline`
4 种变体。如需 10 色状态/装饰变体 → 用 **AgBadge**。

## Dialog
路径：`components/ui/dialog.tsx`
导入：`import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog'`

基于 Radix Dialog，内置 focus trap + 遮罩 + Esc 关闭。
```tsx
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* body */}
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Sheet / Drawer
路径：`components/ui/sheet.tsx`
导入：`import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'`

侧边滑出面板。`<SheetContent side="right|left|top|bottom">`

## Tabs
路径：`components/ui/tabs.tsx`
导入：`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'`

基于 Radix Tabs，内置 ARIA tab pattern + 键盘导航。
active 用中性样式，**非品牌蓝**。

## Tooltip
路径：`components/ui/tooltip.tsx`
导入：`import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'`

需要 `<TooltipProvider>` 包裹（通常放 App 根部）。

## DropdownMenu
路径：`components/ui/dropdown-menu.tsx`
导入：`import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu'`

操作菜单（编辑/删除/复制），不是值选择。支持 CheckboxItem / RadioItem / Sub 子菜单。

## Popover
路径：`components/ui/popover.tsx`
导入：`import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'`

通用弹出浮层，适合日期选择器、颜色选择器等复杂内容。

## Accordion
路径：`components/ui/accordion.tsx`
导入：`import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'`

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>标题</AccordionTrigger>
    <AccordionContent>内容</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Table
路径：`components/ui/table.tsx`
导入：`import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'`

开发者工具数据密集场景的核心组件，优先用它而非卡片堆叠。
行 hover 整块淡化（muted/50），不改字色。

## Progress
路径：`components/ui/progress.tsx`
导入：`import { Progress } from '@/components/ui/progress'`

`<Progress value={75} />`，填充用 primary 色（中性），**非品牌蓝**。

## Skeleton
路径：`components/ui/skeleton.tsx`
导入：`import { Skeleton } from '@/components/ui/skeleton'`

加载占位用。`<Skeleton className="h-4 w-[200px]" />`

## Breadcrumb
路径：`components/ui/breadcrumb.tsx`
导入：`import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'`

## Pagination
路径：`components/ui/pagination.tsx`
导入：`import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination'`

## Avatar
路径：`components/ui/avatar.tsx`
导入：`import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'`

```tsx
<Avatar>
  <AvatarImage src="url" alt="name" />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```

## Collapsible
路径：`components/ui/collapsible.tsx`
导入：`import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'`

通用可折叠容器。AI 对话中用于 thinking section 展开/折叠。

## Separator
路径：`components/ui/separator.tsx`
导入：`import { Separator } from '@/components/ui/separator'`

`<Separator />` 水平分割线，`<Separator orientation="vertical" />` 垂直分割线。

---

# AG 扩展组件

> shadcn 不够用的场景才自建。放在 `components/ag/` 命名空间下。

## AgCard
路径：`components/ag/ag-card.tsx`
导入：`import { AgCard, AgCardHeader, AgCardTitle, AgCardDescription, AgCardContent, AgCardFooter } from '@/components/ag/ag-card'`

5 级 elevation 变体：
| Variant | 视觉效果 | AG Token | 用途 |
|---------|---------|----------|------|
| `flat` | 无边无影 | — | 分组容器，不需视觉边界 |
| `contained` | 1px 边框 | `--ring-contained` | **默认**，大部分场景 |
| `ring` | 柔影 | `--shadow-card` | 需要轻微浮起 |
| `whisper` | 柔影(更柔) | `--shadow-whisper` | 暗色自动降级为边框 |
| `inset` | 内嵌 | `--shadow-inset` | 嵌套内容区 |

```tsx
<AgCard variant="ring">
  <AgCardHeader>
    <AgCardTitle>标题</AgCardTitle>
    <AgCardDescription>描述</AgCardDescription>
  </AgCardHeader>
  <AgCardContent>内容</AgCardContent>
</AgCard>
```

约束：
- 可点击卡片必须加 `transition` + hover 效果
- 容器不嵌套卡片边框——每层最多一个 border 语义
- 白底铁律：AgCard 默认白底，不自行加灰底

## AgBadge
路径：`components/ag/ag-badge.tsx`
导入：`import { AgBadge } from '@/components/ag/ag-badge'`

10 色变体 — 5 状态色 + 5 装饰色：
| 类型 | Variants | 用途 |
|------|----------|------|
| 状态（颜色↔状态绑定，不可错配） | `default` / `info` / `success` / `warning` / `error` | 状态标签 |
| 装饰（分类，颜色可自由分配） | `teal` / `purple` / `pink` / `orange` / `sky` | 分类标签 |

约束：一个 badge 不能同时承担状态+分类。如"运行中的研究"→ 并排两个 badge，**不合成一个**。

## AgentStatus
路径：`components/ag/agent-status.tsx`
导入：`import { AgentStatus } from '@/components/ag/agent-status'`

5 种 agent 状态指示器（状态点 + 可选文字标签）：
| Status | 颜色 | 动效 |
|--------|------|------|
| `idle` | 蓝 `--color-agent-idle` | 无 |
| `running` | 绿 `--color-agent-running` | 脉冲 2s |
| `completed` | 绿 `--color-agent-completed` | 无 |
| `error` | 红 `--color-agent-error` | 无 |
| `paused` | 灰 `--color-agent-paused` | 无 |

```tsx
<AgentStatus status="running" />
<AgentStatus status="error" showLabel={false} size="sm" />
```

## CodeBlock
路径：`components/ag/code-block.tsx`
导入：`import { CodeBlock, CodeKeyword, CodeString, CodeComment, CodeFn, CodeNumber } from '@/components/ag/code-block'`

AG 语法高亮代码块，使用 `--color-code-*` token。

```tsx
<CodeBlock language="TypeScript">
  <CodeKeyword>const</CodeKeyword> <CodeFn>greet</CodeFn> = ...
</CodeBlock>
```

语法 token 颜色固定：keyword=蓝, string=绿, comment=灰, fn=黑, number=橙。

## AgLink
路径：`components/ag/ag-link.tsx`
导入：`import { AgLink } from '@/components/ag/ag-link'`

AG 链接——中性色 + 品牌蓝 hover（**唯一允许的品牌蓝控件用途**）。
- **Inline**：`<AgLink href="#">链接</AgLink>` — 带下划线
- **Standalone**：`<AgLink href="#" standalone>查看详情</AgLink>` — 无下划线 + 箭头
- 禁止：纯蓝字代替下划线表示链接

## EmptyState
路径：`components/ag/empty-state.tsx`
导入：`import { EmptyState } from '@/components/ag/empty-state'`

```tsx
<EmptyState
  icon={<SearchIcon />}
  title="No results found"
  description="Try adjusting your search."
  action={<Button variant="outline" size="sm">Clear filters</Button>}
/>
```

## Typography
路径：`components/ag/typography.tsx`
导入：`import { Display, PageTitle, Heading, Subheading, Body, Caption, Micro } from '@/components/ag/typography'`

| 组件 | font-size | weight | 用途 |
|------|-----------|--------|------|
| `Display` | 36px | 600 | 首屏大标题 |
| `PageTitle` | 28px | 600 | 页面标题 |
| `Heading` | 22px | 600 | 区块标题 |
| `Subheading` | 18px | 600 | 小节标题 |
| `Body` | 15px | 400 | 正文 |
| `Caption` | 12px | 400 | 辅助说明 |
| `Micro` | 11px | 500 | 微标签（大写+宽字距） |

约束：字重上限 600（`--weight-bold`），**禁止 700**。

---

# 允许的图标库

图标只用以下**白名单成套库**。核心原则：**单项目选定一个主库**，全程统一，保证线条粗细 / 圆角 / 填充风格一致。

| 库 | 形式 | 写法 | 风格约定 |
|----|------|------|---------|
| [MingCute](https://www.mingcute.com/) | icon font | `<i className="mgc_xxx_line" />` | `_line` 默认 / `_fill` 选中态 |
| [Lucide](https://lucide.dev/) | React 组件 | `import { Calendar } from 'lucide-react'` → `<Calendar />` | stroke 线性风格，`strokeWidth` 默认 2 |

**通用约定**（两库都适用）：
- 颜色用 `currentColor` 继承文字色，不写死颜色值。
- 尺寸用 token：`--size-icon-sm/md/lg`（MingCute 用 `fontSize`，Lucide 用 `size` 或 `width/height`）。
- 与文本垂直居中对齐（`vertical-align: middle` 或 flex `align-items: center`）。

**两库写法示例**：
```tsx
// 项目主库 = MingCute（icon font）
<i className="mgc_search_line" style={{ fontSize: 'var(--size-icon-md)' }} aria-label="搜索" />

// 项目主库 = Lucide（React 组件，如本文件 EmptyState 的 <SearchIcon />）
import { Search } from 'lucide-react';
<Search className="size-[var(--size-icon-md)]" aria-label="搜索" />
```

**shadcn 豁免**：shadcn 组件**内部自带**的 Lucide 功能性微图标（对勾 / 箭头 / 关闭 X 等）豁免，**不计入混用违规** —— 即便项目主库选了 MingCute，也无需替换 shadcn 内置的那些图标。

**禁止**：手写 / 临时拼的 SVG 当图标、非白名单杂牌库（FontAwesome / react-icons 等）、同项目混用多个**主**图标库、用 emoji 代替图标。

---

# 已废弃

以下旧组件体系已废弃，不再使用：
- 旧 `components.css` 中的 `.ag-*` CSS 类（文件已移除）
- 旧 `component-examples.html` 中的 HTML 结构示例（文件已移除）

新组件体系完全基于 React 组件 + Tailwind utility classes + AG token。
