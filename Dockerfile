# 使用官方Node.js运行时作为父镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制剩余文件
COPY . .

# 复制prisma schema并生成客户端
COPY prisma ./prisma/
RUN npx prisma generate

# 构建应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]