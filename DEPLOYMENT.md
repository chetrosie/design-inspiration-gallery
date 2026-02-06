# 部署指南

本文档介绍了如何在不同平台上部署 Design Inspiration Gallery 应用。

## 目录

- [环境要求](#环境要求)
- [本地部署](#本地部署)
- [Vercel 部署](#vercel-部署)
- [Cloudflare Pages 部署](#cloudflare-pages-部署)
- [Docker 部署](#docker-部署)
- [传统VPS部署](#传统vps部署)
- [环境变量配置](#环境变量配置)

## 环境要求

- Node.js >= 18
- PostgreSQL >= 13
- npm 或 yarn

## 本地部署

1. 克隆项目
```bash
git clone <repository-url>
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

## Vercel 部署

### 自动部署（推荐）

1. 推送代码到 GitHub/GitLab/Bitbucket
2. 在 [Vercel](https://vercel.com) 上注册账号并登录
3. 点击 "Add New Project"
4. 导入你的 Git 仓库
5. Vercel 会自动检测到这是一个 Next.js 项目
6. 配置环境变量（见下方）
7. 点击 "Deploy" 开始部署

### 手动部署

1. 安装 Vercel CLI
```bash
npm install -g vercel
```

2. 登录 Vercel
```bash
vercel login
```

3. 部署项目
```bash
vercel
```

4. 按照提示选择项目目录和部署设置
5. 配置环境变量

## Cloudflare Pages 部署

1. 推送代码到 GitHub
2. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
3. 点击 "Create a project"
4. 连接 GitHub 账号并选择仓库
5. 配置构建设置：
   - 构建命令: `npm run build`
   - 输出目录: `.next`
6. 配置环境变量（见下方）
7. 点击 "Save and Deploy"

## Docker 部署

### 使用 Docker Compose（推荐）

1. 确保已安装 Docker 和 Docker Compose
2. 编辑 `docker-compose.yml` 中的环境变量
3. 启动服务
```bash
docker-compose up -d
```

### 构建自定义镜像

1. 构建镜像
```bash
docker build -t inspirehub .
```

2. 运行容器
```bash
docker run -p 3000:3000 inspirehub
```

## 传统VPS部署

### Ubuntu 20.04+/Debian 11+

1. 更新系统
```bash
sudo apt update && sudo apt upgrade -y
```

2. 安装 Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. 安装 PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib -y
```

4. 创建数据库和用户
```bash
sudo -u postgres psql
CREATE DATABASE inspirehub;
CREATE USER inspirehub WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE inspirehub TO inspirehub;
\q
```

5. 克隆项目
```bash
git clone <repository-url>
cd design-inspiration-gallery
```

6. 安装依赖
```bash
npm install
```

7. 配置环境变量
```bash
cp .env.example .env.production
# 编辑 .env.production 文件
```

8. 数据库迁移
```bash
npx prisma migrate deploy
```

9. 构建应用
```bash
npm run build
```

10. 安装 PM2 并启动应用
```bash
npm install -g pm2
pm2 start npm --name "inspirehub" -- run "start"
```

11. 设置开机自启
```bash
pm2 startup
pm2 save
```

12. 配置 Nginx（可选）
```bash
sudo apt install nginx -y
```

创建 Nginx 配置文件 `/etc/nginx/sites-available/inspirehub`:
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：
```bash
sudo ln -s /etc/nginx/sites-available/inspirehub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 环境变量配置

无论使用哪种部署方式，都需要配置以下环境变量：

```bash
# 数据库连接
DATABASE_URL=postgresql://username:password@host:port/database

# NextAuth配置
NEXTAUTH_SECRET=your_random_secret_key
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

### 生成 NEXTAUTH_SECRET

可以使用以下命令生成随机密钥：
```bash
openssl rand -base64 32
```

或者在线生成：https://generate-secret.vercel.app/

## 性能优化建议

1. **使用 CDN**：为静态资源启用 CDN 加速
2. **数据库优化**：定期维护数据库索引
3. **图片优化**：使用图片 CDN 服务（如 Cloudinary）
4. **缓存策略**：合理配置 HTTP 缓存头
5. **监控**：部署应用监控和错误跟踪服务

## 故障排除

### 数据库连接问题

确保：
1. 数据库服务正在运行
2. 连接字符串正确
3. 防火墙允许相应端口通信

### 构建失败

1. 检查 Node.js 版本是否 >= 18
2. 确保有足够的内存进行构建
3. 检查磁盘空间是否充足

### 部署后页面无法访问

1. 检查应用日志
2. 确认端口配置正确
3. 检查防火墙设置
4. 验证域名解析是否正确

如遇到其他问题，请查看应用日志或联系技术支持。