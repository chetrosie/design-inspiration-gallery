# 部署指南

本项目支持多种部署方式，包括Vercel、Cloudflare Pages、Docker和传统VPS部署。

## 目录
- [Vercel部署](#vercel部署)
- [Cloudflare Pages部署](#cloudflare-pages部署)
- [Docker部署](#docker部署)
- [VPS部署](#vps部署)
- [环境变量配置](#环境变量配置)
- [数据库设置](#数据库设置)
- [Notion集成配置](#notion集成配置)

## Vercel部署

### 自动部署（推荐）
1. 将代码推送到GitHub/GitLab/Bitbucket
2. 在[Vercel官网](https://vercel.com)注册并登录
3. 点击"New Project"
4. 选择你的代码仓库
5. 配置项目设置：
   - Framework Preset: Next.js
   - Root Directory: /
6. 设置环境变量（参考下方环境变量配置）
7. 点击"Deploy"

### 手动部署
```bash
# 安装Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel
```

## Cloudflare Pages部署

1. 将代码推送到GitHub
2. 在[Cloudflare Pages](https://pages.cloudflare.com/)创建新项目
3. 连接GitHub仓库
4. 配置构建设置：
   - 构建命令: `npm run build`
   - 输出目录: `.next`
5. 设置环境变量
6. 部署

## Docker部署

### 使用Docker Compose（推荐）
```bash
# 克隆项目
git clone <repository-url>
cd design-inspiration-gallery

# 构建并启动
docker-compose up -d
```

### 手动构建Docker镜像
```bash
# 构建镜像
docker build -t inspirehub .

# 运行容器
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://username:password@host:5432/database \
  -e NEXTAUTH_SECRET=your_secret \
  -e NEXTAUTH_URL=https://your-domain.com \
  inspirehub
```

## VPS部署

### 准备工作
1. 确保VPS已安装Node.js (>=18) 和 PostgreSQL
2. 克隆项目到服务器

### 部署步骤
```bash
# 1. 克隆项目
git clone <repository-url>
cd design-inspiration-gallery

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 文件

# 4. 数据库迁移
npx prisma migrate deploy

# 5. 构建项目
npm run build

# 6. 启动服务
npm start
```

### 使用PM2管理进程
```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "inspirehub" -- start

# 设置开机自启
pm2 startup
pm2 save
```

### Nginx反向代理配置
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 环境变量配置

创建 `.env.local` 文件并配置以下变量：

```env
# 数据库连接
DATABASE_URL=postgresql://username:password@localhost:5432/inspirehub

# NextAuth配置
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-domain.com

# GitHub OAuth (可选)
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Google OAuth (可选)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Notion集成 (可选)
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
```

## 数据库设置

### PostgreSQL设置
```sql
-- 创建数据库用户
CREATE USER inspirehub WITH PASSWORD 'your_password';

-- 创建数据库
CREATE DATABASE inspirehub OWNER inspirehub;

-- 授权
GRANT ALL PRIVILEGES ON DATABASE inspirehub TO inspirehub;
```

### 数据库迁移
```bash
# 首次部署时运行
npx prisma migrate deploy

# 开发环境中创建新迁移
npx prisma migrate dev --name init
```

## Notion集成配置

1. 在Notion中创建一个数据库用于存储灵感
2. 在[Notion开发者门户](https://developers.notion.com/)创建一个新的集成
3. 复制集成的Internal Integration Token
4. 分享你的数据库给该集成
5. 复制数据库ID（在数据库页面URL中找到）
6. 在环境变量中配置：
   ```
   NOTION_TOKEN=your_notion_token
   NOTION_DATABASE_ID=your_database_id
   ```

## 性能优化建议

1. **静态资源优化**：
   - 启用图片压缩
   - 使用CDN加速静态资源

2. **数据库优化**：
   - 为常用查询字段添加索引
   - 定期清理无用数据

3. **缓存策略**：
   - 使用Redis缓存热点数据
   - 配置HTTP缓存头

4. **监控和日志**：
   - 配置应用监控
   - 设置错误日志收集