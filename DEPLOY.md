Recommended deployment (easy to extend later)

Overview
- Recommended: Deploy to Vercel. It natively supports Next.js (app dir + API routes), provides preview URLs for PRs, automatic HTTPS, and simple custom-domain management.
- Alternative (frontend-only): GitHub Pages (static export only). Use this only if you can remove or move API routes.

Vercel (recommended)
1. Sign in to https://vercel.com and "Import Project" from GitHub.
2. Select the `keyverdict` repo and import.
3. Build settings: leave defaults (Vercel auto-detects Next.js). Build command: `next build` (default).
4. Environment variables: add any keys under Project Settings → Environment Variables.
5. Configure branches: enable automatic deploys from `main` (or your chosen branch).
6. Preview deploys: each PR gets a preview URL — use that to test before merging.
7. Custom domain: after you own the domain, add it in Vercel and follow the DNS instructions (CNAME for subdomains, A records for apex).

Notes for future changes / migration
- Vercel supports rollbacks and preview deployments per-PR, so your workflow remains simple: feature branch → PR → preview → merge → production deploy.
- When ready to use a custom domain, add it in Vercel and update DNS at your registrar. Vercel will provide verification records and automatic TLS.
- If you ever move away from Vercel to another host that supports Next.js (Netlify, Cloudflare Pages, Render), the repo requires minimal changes.

If you need to keep the repo on GitHub Pages (static-only)
- Limitations: `app/api/*` routes will not work. Anything server-side must be moved to another backend.
- Steps to produce a static export:
  1. Add these scripts to your `package.json` (example):

  {
    "scripts": {
      "build": "next build",
      "export": "next export",
      "export:all": "npm run build && npm run export"
    }
  }

  2. Run locally to generate static output:

```bash
npm ci
npm run export:all
# output will be in ./out/
```

  3. To publish `out/` to GitHub Pages, you can use a GitHub Actions workflow (example below).

Sample GitHub Actions workflow (copy to `.github/workflows/gh-pages.yml`)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run export:all
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

Custom domain DNS hints
- For a subdomain (e.g., `www.example.com`): create a `CNAME` pointing to your host's target (Vercel provides the value).
- For an apex domain (`example.com`): follow host instructions — typically two `A` records pointing to provider IPs or an ANAME/ALIAS record if supported.
- Confirm DNS propagation and enable HTTPS on your host platform.

Recommended workflow (simple and extendable)
- Use feature branches + PRs.
- Rely on Vercel preview deploys to test changes.
- Merge to `main` for production.
- Add protected-branch rules if desired.

Next steps I can take for you
- Create the `.github/workflows/gh-pages.yml` file to publish a static export (if you want GitHub Pages now).
- Help connect the repo to Vercel and configure environment variables (I can draft instructions or the exact steps).
- Add the `npm` scripts to `package.json` for static export.

Choose which next step you'd like me to do and I'll implement it.
