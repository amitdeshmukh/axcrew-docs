# Deploy to Cloudflare Pages

This is a static HTML site — no build step required.

## Option 1: Git Integration (Recommended)

1. Push this repo to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create**
3. Connect your GitHub repo
4. Configure:
   - **Build command:** _(leave empty)_
   - **Build output directory:** `/`
   - **Root directory:** `/` (or the path to `axcrew-docs/` if it's a subdirectory)
5. Deploy

Cloudflare will auto-deploy on every push to `main`.

## Option 2: Direct Upload

```bash
npx wrangler pages deploy . --project-name=axcrew-docs
```

## Custom Domain

1. In Cloudflare Pages → your project → **Custom domains**
2. Add `axcrew.dev`
3. Update DNS to point to Cloudflare Pages

## Files Served

```
index.html          → the landing page
public/hero.webp    → hero illustration
public/llms.txt     → AI-consumable manifest (run: node scripts/generate-llms-files.mjs)
public/llms-full.txt → full skill reference
```

## Regenerating llms.txt

If skill files in `../ax-crew/src/skills/` change:

```bash
node scripts/generate-llms-files.mjs
```

Then commit and push — Cloudflare will auto-deploy.
