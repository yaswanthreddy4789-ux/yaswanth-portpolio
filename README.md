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

## Services and quote requests

This portfolio has no service pages and no contact form. They live on the separate services website. Once it is live, set `NEXT_PUBLIC_SERVICES_URL` in Vercel (Settings → Environment Variables). The "Hire me" and case-study buttons then open it, and the old `/services/...` URLs redirect to it. Until then "Hire me" scrolls to the Contact details (email, phone, WhatsApp).

## Hero photos

The hero entrance uses three photos from `public/hero/`; the About section and preloader use `public/photo.jpg`. Change the main portrait with `npm run photo -- "C:\path\to\image.jpg"`. To change the hero photos, replace the files in `public/hero/` (720x900 JPG).

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
