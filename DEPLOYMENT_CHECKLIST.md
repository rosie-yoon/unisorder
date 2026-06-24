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

2. Set required production environment variables.
   - `UNISORDER_ADMIN_SETUP_KEY`
   - `UNISORDER_ADMIN_SESSION_SECRET`
   - Use long random values. The setup key is only for creating the first admin account.

3. Confirm admin persistence strategy.
   - Production FAQ, guide, and admin account data is stored in Supabase.
   - Local/offline content falls back to `data/content.json`.
   - Local admin account fallback uses `data/admin-users.json`, which is gitignored.

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
  - `UNISORDER_ADMIN_SETUP_KEY`
  - `UNISORDER_ADMIN_SESSION_SECRET`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Supabase project: `unisorder-site`
  - Project ref: `nchzpvxvyboceuzbzlmv`
  - Region: `ap-northeast-1`
  - Dashboard: `https://supabase.com/dashboard/project/nchzpvxvyboceuzbzlmv`

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
4. Add environment variables.
   - `UNISORDER_ADMIN_SETUP_KEY=<long-random-setup-key>`
   - `UNISORDER_ADMIN_SESSION_SECRET=<long-random-session-secret>`
   - `SUPABASE_URL=<supabase-project-url>`
   - `SUPABASE_SERVICE_ROLE_KEY=<supabase-service-role-key>`
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
   - First admin setup or admin login
   - FAQ create/update/delete
   - Guide create/update/delete
   - Admin account create/update/delete
8. Check mobile view.
   - Header menu
   - Hero
   - Feature tabs
   - Growth story slider
   - Pricing cards
   - Footer

## Content Database

Completed on 2026-06-24 KST:

1. Created Supabase project `unisorder-site`.
2. Applied database migration:
   - `supabase/migrations/20260624054500_create_content_tables.sql`
   - `supabase/migrations/20260624093000_create_admin_users.sql`
3. Seeded initial content:
   - 6 FAQs
   - 4 guides
4. Updated the app content store:
   - Uses Supabase when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set.
   - Falls back to `data/content.json` for local/offline use.
5. Verified production CRUD through `https://unisorder.vercel.app`:
   - FAQ create/update/delete
   - Guide create/update/delete
   - Admin account create/update/delete

## Immediate Next Engineering Task

The content store and admin login foundation have been moved to Supabase. Next engineering improvements:

1. Add scammer report submission and moderation workflow.
2. Move admin to a private deployment/domain when the final URL is chosen.
3. Ask the existing developer to complete the Cloudflare DNS cutover for `unisorder.com`.
