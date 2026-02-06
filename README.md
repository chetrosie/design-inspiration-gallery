# Design Inspiration Gallery (设计灵感收藏馆)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fchetrosie%2Fdesign-inspiration-gallery)
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/start?secrets=NEXTAUTH_SECRET%3Dyour_nextauth_secret_here&env=NEXTAUTH_URL%3Dhttps%3A%2F%2Fyour-deployment-url.com)

一个现代化的设计灵感收集和分享平台，支持多用户、内容管理、Notion集成等功能。

## 功能特性

- 🎨 精美的设计灵感展示
- 🔐 用户认证系统（支持GitHub、Google登录）
- 📁 分类和标签管理
- 🔄 Notion数据库集成
- 📱 响应式设计，支持移动端
- ⚡ 快速加载和SEO优化
- 🛠️ 完整的后台管理系统
- 🚀 支持多种部署方式

## 技术栈

- **前端**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **后端**: Next.js API Routes
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js
- **部署**: Vercel, Cloudflare Pages, Docker
- **其他**: Notion API, React Icons

## 在线演示

[在线演示地址](https://design-inspiration-gallery.vercel.app) (部署后更新)

## 快速开始

### 环境要求

- Node.js >= 18
- PostgreSQL >= 13
- npm 或 yarn

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/chetrosie/design-inspiration-gallery.git
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

### 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fchetrosie%2Fdesign-inspiration-gallery)

### Vercel部署

1. 推送代码到GitHub
2. 在[Vercel](https://vercel.com)上导入项目
3. 配置环境变量
4. 部署完成！

### Cloudflare Pages部署

1. 推送代码到GitHub
2. 在[Cloudflare Pages](https://pages.cloudflare.com/)上创建新项目
3. 连接GitHub仓库
4. 配置构建设置：
   - 构建命令: `npm run build`
   - 输出目录: `.next`
5. 配置环境变量
6. 部署完成！

### Docker部署

```bash
# 使用docker-compose（推荐）
docker-compose up -d

# 或者构建镜像
docker build -t inspirehub .
docker run -p 3000:3000 inspirehub
```

更多部署选项请查看 [DEPLOYMENT.md](DEPLOYMENT.md)

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

## 开发指南

### 添加新功能

1. 创建新分支
2. 实现功能
3. 编写测试
4. 提交PR

### 数据库修改

1. 修改 `prisma/schema.prisma`
2. 运行 `npx prisma migrate dev`
3. 运行 `npx prisma generate`

## 贡献

欢迎提交Issue和PR来改进这个项目！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系我们

如有任何问题或建议，请通过以下方式联系我们：

- 提交 [Issue](https://github.com/chetrosie/design-inspiration-gallery/issues)
- 发送邮件至 [your-email@example.com](mailto:your-email@example.com)