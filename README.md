# Design Inspiration Gallery (设计灵感收藏馆)

<p align="center">
  <img src="public/placeholder-image.jpg" alt="Design Inspiration Gallery" width="600" />
</p>

<p align="center">
  一个现代化的设计灵感收集和分享平台，支持多用户、内容管理、Notion集成等功能。
</p>

<p align="center">
  <a href="https://github.com/your-username/design-inspiration-gallery/stargazers">
    <img src="https://img.shields.io/github/stars/your-username/design-inspiration-gallery" alt="GitHub Stars">
  </a>
  <a href="https://github.com/your-username/design-inspiration-gallery/issues">
    <img src="https://img.shields.io/github/issues/your-username/design-inspiration-gallery" alt="GitHub Issues">
  </a>
  <a href="https://github.com/your-username/design-inspiration-gallery/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/your-username/design-inspiration-gallery" alt="License">
  </a>
</p>

## 功能特性

- 🎨 **精美的设计灵感展示** - 响应式网格布局，支持分类和标签筛选
- 🔐 **用户认证系统** - 支持GitHub、Google登录和邮箱注册
- 📁 **分类和标签管理** - 灵活的内容组织方式
- 🔄 **Notion数据库集成** - 自动同步Notion中的设计灵感
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **快速加载和SEO优化** - Next.js SSR和静态生成
- 🛠️ **完整的后台管理系统** - 轻松管理内容、分类和标签
- 🚀 **多种部署方式** - 支持Vercel、Cloudflare Pages、Docker等

## 技术栈

- **前端**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **后端**: Next.js API Routes
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js
- **部署**: Vercel, Cloudflare Pages, Docker
- **其他**: Notion API, React Icons

## 快速开始

### 环境要求

- Node.js >= 18
- PostgreSQL >= 13
- npm 或 yarn

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/your-username/design-inspiration-gallery.git
cd design-inspiration-gallery
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
# 编辑 .env.local 文件，填写必要的配置
```

4. 数据库迁移
```bash
npx prisma migrate dev
```

5. 启动开发服务器
```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 部署

详细的部署指南请查看 [DEPLOYMENT.md](DEPLOYMENT.md) 文件。

### Vercel部署（推荐）

1. 推送代码到GitHub
2. 在[Vercel](https://vercel.com)上导入项目
3. 配置环境变量
4. 部署完成！

## Notion集成

本项目支持与Notion数据库集成：

1. 在Notion中创建一个数据库用于存储灵感
2. 创建一个Notion集成并获取token
3. 分享数据库给该集成
4. 在环境变量中配置NOTION_TOKEN和NOTION_DATABASE_ID

## 项目结构

```
├── app/                 # Next.js App Router页面
├── components/          # React组件
├── lib/                 # 工具函数和库
├── prisma/              # Prisma数据库模式
├── public/              # 静态资源
└── styles/              # 全局样式
```

## 数据库设计

```prisma
model User {
  id            String     @id @default(cuid())
  name          String?
  email         String?    @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  role          Role       @default(USER)
  inspirations  Inspiration[]
}

model Category {
  id           String        @id @default(cuid())
  name         String
  slug         String        @unique
  description  String?
  inspirations Inspiration[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Tag {
  id           String        @id @default(cuid())
  name         String
  slug         String        @unique
  inspirations Inspiration[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Inspiration {
  id          String     @id @default(cuid())
  title       String
  description String?
  imageUrl    String
  link        String?
  author      String?
  prompt      String?
  categoryId  String?
  category    Category?  @relation(fields: [categoryId], references: [id])
  tags        Tag[]
  userId      String?
  user        User?      @relation(fields: [userId], references: [id])
  notionId    String?
  isPublic    Boolean    @default(true)
  likes       Int        @default(0)
  views       Int        @default(0)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

## API接口

### 公开接口

- `GET /api/inspirations` - 获取灵感列表
- `GET /api/inspirations/[id]` - 获取单个灵感详情
- `GET /api/categories` - 获取分类列表
- `GET /api/categories/[id]` - 获取单个分类详情
- `GET /api/tags` - 获取标签列表
- `GET /api/tags/[id]` - 获取单个标签详情

### 受保护接口

- `POST /api/inspirations` - 创建新灵感
- `PUT /api/inspirations/[id]` - 更新灵感
- `DELETE /api/inspirations/[id]` - 删除灵感
- `POST /api/categories` - 创建新分类
- `PUT /api/categories/[id]` - 更新分类
- `DELETE /api/categories/[id]` - 删除分类
- `POST /api/tags` - 创建新标签
- `PUT /api/tags/[id]` - 更新标签
- `DELETE /api/tags/[id]` - 删除标签
- `POST /api/sync/notion` - 手动触发Notion同步

## 开发指南

### 添加新功能

1. 创建新分支
```bash
git checkout -b feature/your-feature-name
```

2. 实现功能
3. 编写测试
4. 提交PR

### 数据库修改

1. 修改 `prisma/schema.prisma`
2. 运行迁移命令
```bash
npx prisma migrate dev --name your_migration_name
```
3. 生成Prisma客户端
```bash
npx prisma generate
```

## 贡献

欢迎提交Issue和PR来改进这个项目！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

如果你有任何问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/your-username/design-inspiration-gallery/issues)
- 发送邮件至 your-email@example.com

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/your-username">Your Name</a>
</p>