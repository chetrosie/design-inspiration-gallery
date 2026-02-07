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

A separate scaffold is provided under `cloudflare-full/`:

- `cloudflare-full/src/index.js`: Worker entry
- `cloudflare-full/wrangler.toml`: D1/R2 binding config
- `cloudflare-full/schema.sql`: D1 schema

### Deploy Mode B
```bash
cd cloudflare-full
npm install
# create D1 and run migration
wrangler d1 create design_inspiration
wrangler d1 execute design_inspiration --file=schema.sql
# update wrangler.toml database_id
wrangler deploy
```

Use this mode when you want full Cloudflare-native architecture.
