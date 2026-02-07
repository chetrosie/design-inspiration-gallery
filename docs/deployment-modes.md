# Deployment Modes

This repository now supports **two deployment modes**:

## Mode A — PostgreSQL + Prisma (Current App)

- Stack: Next.js App Router + Prisma + PostgreSQL
- Best for: Keeping existing feature set with minimal migration
- Cloudflare Pages usage: Deploy via `next-on-pages`

### Cloudflare Pages Settings (Mode A)
- Build command: `npm run build`
- Output directory: `.vercel/output/static`
- Required env:
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL`

## Mode B — Cloudflare Full Native (D1 + R2)

A separate runnable variant is provided under `cloudflare-full/`:

- `cloudflare-full/src/index.js`: Worker entry + APIs
- `cloudflare-full/public/`: Lightweight UI page
- `cloudflare-full/wrangler.toml`: D1/R2 binding config
- `cloudflare-full/schema.sql`: D1 schema

### Included APIs in Mode B
- `GET /api/health`
- `GET /api/inspirations`
- `POST /api/inspirations`
- `POST /api/upload` (upload image to R2)
- `GET /media/:key` (read image from R2)

### Deploy Mode B
```bash
cd cloudflare-full
npm install

# Login
wrangler login

# Create D1 and R2
wrangler d1 create design_inspiration
wrangler r2 bucket create design-inspiration-assets

# Run SQL schema
wrangler d1 execute design_inspiration --file=schema.sql

# Update wrangler.toml database_id
# Deploy
wrangler deploy
```

After deploy, open your worker URL and you will get a simple management UI.
