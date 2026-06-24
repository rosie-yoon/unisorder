# UnisOrder Deployment Checklist

## Current DNS Snapshot

Checked on 2026-06-24 KST.

- `unisorder.com` nameservers: Cloudflare
  - `felicity.ns.cloudflare.com`
  - `fiona.ns.cloudflare.com`
- Current `unisorder.com` A records resolve to Cloudflare proxy IPs:
  - `172.67.223.165`
  - `104.21.38.144`
- `www.unisorder.com` currently resolves to the same Cloudflare proxy IPs.

This means the final domain cutover will most likely be done in Cloudflare DNS.

## Before Deployment

1. Choose hosting target.
   - Recommended for this Next.js app: Vercel.
   - Alternative: a Node server/VPS using `npm run build` and `npm run start`.

2. Set required production environment variable.
   - `UNISORDER_ADMIN_TOKEN`
   - Use a long random token. Do not reuse `dev-admin`.

3. Confirm admin persistence strategy.
   - Current implementation stores FAQ and guide content in `data/content.json`.
   - This is fine for local/single-server testing.
   - For Vercel/serverless production, move this storage layer to Supabase/Postgres before serious operation because serverless file writes are not durable.

4. Run local verification.
   - `npm run build`
   - `npm run test:admin-crud`

## Vercel Deployment Path

Completed on 2026-06-24 KST:

- GitHub repository: `rosie-yoon/unisorder`
- Site branch: `codex/unisorder-site`
- Vercel project: `rosie-yoons-projects/unisorder`
- Production URL: `https://unisorder.vercel.app`
- Deployment URL: `https://unisorder-6z2n1f8bz-rosie-yoons-projects.vercel.app`
- Production environment variable added:
  - `UNISORDER_ADMIN_TOKEN`

Notes:

- The GitHub repository's `main` branch currently contains an older FastAPI/Streamlit scaffold.
- The renewed Next.js site was pushed to `codex/unisorder-site` to avoid overwriting the existing `main` branch.
- The current Vercel production deployment was created from the local renewed Next.js site.

Reference build settings:

1. Framework: Next.js
2. Build command: `npm run build`
3. Output: Next.js default

If reconnecting from scratch:

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Configure build settings.
   - Framework: Next.js
   - Build command: `npm run build`
   - Output: Next.js default
4. Add environment variable.
   - `UNISORDER_ADMIN_TOKEN=<long-random-token>`
5. Deploy preview.
6. Verify preview URLs.
   - `/`
   - `/features`
   - `/guide`
   - `/faq`
   - `/admin`
   - `/robots.txt`
   - `/sitemap.xml`

## Domain Connection

In Vercel:

1. Add `unisorder.com`. Completed.
2. Add `www.unisorder.com`. Completed.
3. Vercel will show the required DNS records.

In Cloudflare DNS:

1. Replace current root domain DNS target with the Vercel-provided record.
   - `A unisorder.com 76.76.21.21`
2. Set `www` to the Vercel-provided record.
   - Vercel CLI currently recommends: `A www.unisorder.com 76.76.21.21`
   - If Cloudflare UI prefers a CNAME for `www`, use Vercel's dashboard recommendation at the moment of configuration.
3. Keep Cloudflare SSL/TLS mode at `Full` or `Full (strict)` after Vercel certificate is active.
4. Wait for DNS propagation.

## Post-Cutover QA

1. Open `https://unisorder.com`.
2. Open `https://www.unisorder.com`.
3. Confirm one canonical version redirects or both serve correctly.
4. Check the main CTA links.
   - Login
   - Free start
5. Verify SEO files.
   - `https://unisorder.com/robots.txt`
   - `https://unisorder.com/sitemap.xml`
6. Verify legal pages.
   - `/privacy`
   - `/terms`
7. Verify admin.
   - `/admin`
   - Token login/load data
   - FAQ create/update/delete
   - Guide create/update/delete
8. Check mobile view.
   - Header menu
   - Hero
   - Feature tabs
   - Growth story slider
   - Pricing cards
   - Footer

## Immediate Next Engineering Task

Before serious public operation, replace `data/content.json` storage with a real database-backed store.

Recommended table split:

- `faqs`
- `guides`
- `guide_blocks`

Recommended backend:

- Supabase Postgres + Row Level Security
- Admin API keeps the same route shape:
  - `/api/admin/faqs`
  - `/api/admin/faqs/[id]`
  - `/api/admin/guides`
  - `/api/admin/guides/[id]`

The current `lib/content-store.ts` is intentionally isolated so this migration is small.
