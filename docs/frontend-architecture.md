# 前端架构设计

## 技术栈
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod (数据验证)
- Framer Motion (动画)
- React Query (数据获取和状态管理)

## 项目结构

```
frontend/
├── app/                    # App Router目录
│   ├── api/               # API路由
│   ├── auth/              # 认证页面
│   │   ├── login/
│   │   ├── register/
│   │   └── callback/
│   ├── dashboard/         # 主控制台
│   ├── inspirations/      # 灵感管理
│   ├── categories/        # 分类管理
│   ├── tags/              # 标签管理
│   ├── collections/       # 收藏集管理
│   ├── prompts/           # 提示词管理
│   ├── collector/         # 内容采集
│   ├── settings/          # 设置页面
│   └── layout.tsx         # 根布局
├── components/            # 可复用组件
│   ├── ui/                # UI基础组件
│   ├── layout/            # 布局组件
│   ├── inspiration/       # 灵感相关组件
│   ├── collection/        # 收藏集相关组件
│   ├── prompt/            # 提示词相关组件
│   └── collector/         # 采集器相关组件
├── hooks/                 # 自定义Hooks
├── lib/                   # 工具库
│   ├── api/               # API客户端
│   ├── auth/              # 认证相关
│   ├── notion/            # Notion集成
│   └── utils/             # 通用工具
├── types/                 # TypeScript类型定义
├── public/                # 静态资源
└── styles/                # 全局样式
```

## 核心组件设计

### 1. 布局组件

#### MainLayout
主应用布局，包含导航栏和侧边栏

Props:
- children: React.ReactNode

#### Navbar
顶部导航栏

Props:
- user: User | null

#### Sidebar
侧边栏导航菜单

Props:
- activeItem: string

### 2. UI基础组件

#### Button
按钮组件

Props:
- variant: "primary" | "secondary" | "outline" | "ghost"
- size: "sm" | "md" | "lg"
- disabled: boolean
- onClick: () => void
- children: React.ReactNode

#### Input
输入框组件

Props:
- type: string
- placeholder: string
- value: string
- onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
- error: string | undefined

#### Textarea
文本域组件

Props:
- placeholder: string
- value: string
- onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
- error: string | undefined

#### Card
卡片组件

Props:
- title: string
- children: React.ReactNode
- actions: React.ReactNode

#### Modal
模态框组件

Props:
- isOpen: boolean
- onClose: () => void
- title: string
- children: React.ReactNode
- footer: React.ReactNode

#### Tag
标签组件

Props:
- name: string
- color: string
- onDelete?: () => void

### 3. 灵感相关组件

#### InspirationCard
灵感卡片展示组件

Props:
- inspiration: Inspiration
- onEdit: (id: string) => void
- onDelete: (id: string) => void

#### InspirationList
灵感列表组件

Props:
- inspirations: Inspiration[]
- loading: boolean
- onEdit: (id: string) => void
- onDelete: (id: string) => void

#### InspirationForm
灵感编辑表单组件

Props:
- inspiration?: Inspiration
- onSubmit: (data: InspirationFormData) => void
- onCancel: () => void

### 4. 分类相关组件

#### CategorySelector
分类选择器组件

Props:
- value: string
- onChange: (value: string) => void
- categories: Category[]

### 5. 标签相关组件

#### TagInput
标签输入组件

Props:
- tags: string[]
- onChange: (tags: string[]) => void

#### TagSelector
标签选择器组件

Props:
- selectedTags: string[]
- onTagSelect: (tagId: string) => void
- tags: Tag[]

### 6. 收藏集相关组件

#### CollectionCard
收藏集卡片组件

Props:
- collection: Collection
- onEdit: (id: string) => void
- onDelete: (id: string) => void

#### CollectionSelector
收藏集选择器组件

Props:
- selectedCollections: string[]
- onCollectionSelect: (collectionId: string) => void
- collections: Collection[]

### 7. 提示词相关组件

#### PromptSelector
提示词选择器组件

Props:
- value: string
- onChange: (value: string) => void
- prompts: Prompt[]

#### PromptForm
提示词编辑表单组件

Props:
- prompt?: Prompt
- onSubmit: (data: PromptFormData) => void
- onCancel: () => void

### 8. 采集器相关组件

#### UrlInput
URL输入组件

Props:
- value: string
- onChange: (value: string) => void
- onSubmit: () => void

#### ScrapingPreview
采集预览组件

Props:
- scrapedData: ScrapedData | null
- loading: boolean

## 页面设计

### 1. 仪表板页面 (/dashboard)
- 展示统计数据（总灵感数、分类数、标签数等）
- 最近添加的灵感
- 快速操作入口

### 2. 灵感列表页面 (/inspirations)
- 灵感列表展示
- 分类筛选
- 标签筛选
- 搜索功能
- 分页功能

### 3. 灵感详情页面 (/inspirations/[id])
- 灵感详细信息展示
- 编辑功能
- 删除功能
- 添加到收藏集

### 4. 分类管理页面 (/categories)
- 分类列表展示
- 创建新分类
- 编辑分类
- 删除分类

### 5. 标签管理页面 (/tags)
- 标签列表展示
- 创建新标签
- 删除标签

### 6. 收藏集页面 (/collections)
- 收藏集列表展示
- 创建新收藏集
- 编辑收藏集
- 删除收藏集

### 7. 收藏集详情页面 (/collections/[id])
- 收藏集内灵感展示
- 添加灵感到收藏集
- 从收藏集移除灵感

### 8. 提示词管理页面 (/prompts)
- 提示词列表展示
- 创建新提示词
- 编辑提示词
- 删除提示词

### 9. 内容采集页面 (/collector)
- URL输入框
- 采集按钮
- 采集结果显示
- 自动分类建议
- 保存到系统

### 10. 设置页面 (/settings)
- 用户信息设置
- Notion集成设置
- 主题设置

## 状态管理

使用React Context API和React Query进行状态管理：

1. AuthContext: 管理用户认证状态
2. React Query: 管理服务器状态和缓存

## 路由设计

```
/                          -> 重定向到 /dashboard
/dashboard                 -> 仪表板
/inspirations             -> 灵感列表
/inspirations/new         -> 新建灵感
/inspirations/[id]        -> 灵感详情
/inspirations/[id]/edit   -> 编辑灵感
/categories               -> 分类管理
/tags                     -> 标签管理
/collections              -> 收藏集列表
/collections/new         -> 新建收藏集
/collections/[id]         -> 收藏集详情
/collections/[id]/edit   -> 编辑收藏集
/prompts                  -> 提示词管理
/prompts/new              -> 新建提示词
/prompts/[id]/edit       -> 编辑提示词
/collector                -> 内容采集
/settings                 -> 设置页面
/auth/login               -> 登录页面
/auth/register            -> 注册页面
/auth/callback            -> 认证回调
```

## 响应式设计

使用Tailwind CSS实现响应式设计：

- 移动端优先设计
- 断点: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
- 在移动端优化触摸交互
- 在桌面端提供更多功能和信息密度