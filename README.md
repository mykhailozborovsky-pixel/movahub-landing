# MovaHub Landing (Single-File)
A polished, dependency-free landing page you can deploy anywhere.

## Quick Start (Local)
Open `index.html` in your browser.

## Deploy — Option A: Cloudflare Pages (recommended)
1) Create a GitHub repo (e.g., `movahub-landing`), add `index.html`, commit & push.
2) In Cloudflare:
   - Add your domain (if not yet) and change nameservers at your registrar to Cloudflare's.
   - Go to **Pages → Create a project → Connect to Git** and select the repo.
   - Framework preset: **None**. Build command: **None**. Output directory: **/** (root).
   - Deploy. You’ll get a `*.pages.dev` URL.
3) **Custom domain**: In Pages → your project → **Custom domains** → add `yourdomain.tld` and `www.yourdomain.tld`.
   - Cloudflare will create CNAME records automatically.
   - In **SSL/TLS**, set **Full (strict)**, enable **Always Use HTTPS** and **Automatic HTTPS Rewrites**.
4) (Optional) Add **Web Analytics**: Cloudflare → Web Analytics → add the script into `<head>`.

## Deploy — Option B: Vercel
1) Create a GitHub repo and push `index.html`.
2) In Vercel, **New Project → Import** your repo.
   - Framework: **Other** (no build step). Set output dir to root `/`.
3) Deploy and add your custom domain in **Settings → Domains**.
   - Update DNS at your registrar to point to Vercel (A/AAAA/CNAME as instructed).

## DNS Notes
- **Root (@) and www**: point both. With Cloudflare, CNAME flattening supports apex to Pages.
- Propagation can take from a few minutes up to a few hours.
- After propagation, test both `www` and apex (`https://yourdomain.tld`). Force HTTPS.

## Customize
- Change brand name, tagline, and email in `<title>`, meta tags, and the `mailto:` of the button.
- Colors are set as CSS vars `--accent` and `--accent-2`.
- The SVG logo is inline; adjust its gradients and shapes as needed.
- Replace the hero mock with a screenshot of your real app once ready.

## Accessibility & Performance
- High contrast and keyboard-friendly focus states by default.
- No remote assets; everything is inline for fast first paint.
