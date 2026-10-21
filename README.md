# Developer Portfolio

Animated portfolio for a full-stack WordPress / Shopify / Wix developer.
Next.js (App Router) · TypeScript · Tailwind CSS 4 · Motion · Lucide.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build
npm start        # serve the production build
```

## Edit your content (everything lives in `src/config/`)

| File | What it controls |
| --- | --- |
| `site.ts` | Name, initials, title, hero copy, availability badge, email, social links, nav, theme colours, SEO text |
| `projects.ts` | Project gallery, filters, case studies, screenshots, URLs |
| `skills.ts` | Platform cards (Expertise) and the Toolkit |
| `content.ts` | About blocks, services, process steps, principles, testimonials, achievements |

**Replace placeholders:** search for `PLACEHOLDER`, `Your Name`, `hello@example.com`, and `placeholder: true`.

- **Projects:** edit/add entries in `projects.ts`. Remove `placeholder: true`, add `url` for a live link, optional `caseStudy` and `results` (only verified facts).
- **Screenshots:** put images in `public/projects/` (≈1600×1000) and set `image: "/projects/my-shot.jpg"`. Without `image`, a generated mockup is shown.
- **Skills / toolkit:** edit `skills.ts`. Only list tools you really use. Optional `logo` path (SVG you may use) in `public/logos/`.
- **Contact details & socials:** `site.ts`. Socials with an empty `href` are hidden.
- **Testimonials / certifications:** add real entries in `content.ts`; the section stays hidden while the lists are empty.
- **Availability badge:** `site.availability.enabled`.
- **Colours:** `site.theme`.

## Contact form

The form posts to `/api/contact`, which emails you through [Resend](https://resend.com). Until configured the API returns 503 and the form tells visitors to email you directly (it never claims delivery).

1. Create a Resend account and API key.
2. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (and optionally `CONTACT_FROM_EMAIL` from a verified domain) in Vercel → Settings → Environment Variables, then redeploy.

Note: without a verified domain Resend's test sender can only deliver to the email address that owns the Resend account.

Spam protection: hidden honeypot, minimum fill time, input validation/escaping, and a best-effort per-instance rate limit.

## Push to GitHub

```bash
git init -b main          # already done if you cloned this folder
git add -A && git commit -m "Initial portfolio"
# create an EMPTY repo on github.com (no README), then:
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## Deploy on Vercel

1. vercel.com → sign in with GitHub → **Add New… → Project** → import the repo.
2. Framework preset: **Next.js** (auto-detected). Build `next build`, install `npm install` — defaults are correct.
3. Add the environment variables above (Production, and Preview if you want to test the form).
4. **Deploy.**

### Automatic deploys
Vercel deploys every push to the production branch (`main`) to **Production**. Pushes to any other branch or pull request get a unique **Preview** URL. Make changes on a branch, open the preview, and merge into `main` only when happy.

### Custom domain (optional, later)
Project → Settings → Domains → add `yourdomain.com`. Vercel shows the DNS records: typically an `A` record `76.76.21.21` for the apex domain and a `CNAME` for `www` to the value Vercel displays (use the exact values shown there). Then set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` and redeploy so canonical/sitemap/Open Graph URLs use it.

## Notes
- Motion respects `prefers-reduced-motion`; the preloader is skipped in that case.
- Brand logos are not bundled (trademark/licensing); the toolkit uses neutral monograms unless you supply logos.
- Hero previews and project mockups are illustrative placeholders until you add real screenshots.
