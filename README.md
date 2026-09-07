# Deploying `nestora-interiors` to Vercel

This repository is a Next.js app. Below are concise steps to connect a GitHub repo and deploy to Vercel.

1) Prepare the repo locally

```bash
# from project root
git init
git add .
git commit -m "chore: initial commit"
# Create remote with GitHub CLI (preferred) or create repo on github.com
# Using GitHub CLI:
# replace <owner>/<repo> with your desired repo
gh repo create <owner>/<repo> --public --source=. --remote=origin --push
```

If you prefer the GitHub web UI: create a new repo and follow the instructions to push an existing repository.

2) Import to Vercel (recommended)

- Go to https://vercel.com and sign in.
- Click "New Project" → "Import Git Repository" → choose GitHub and authorize Vercel to access your repo.
- Select your repository, Vercel will detect Next.js automatically.
- Confirm settings (Build Command: `npm run build`, Output: automatic). Click "Deploy".

3) Alternative: Deploy with Vercel CLI

```bash
# Install if not present
npm i -g vercel

# Run from project root and follow prompts (link to a Vercel account + project)
vercel

# To deploy a production build:
vercel --prod
```

4) Post-deploy

- Visit the assigned Vercel domain shown in the Vercel dashboard.
- If you need environment variables, add them in the Vercel project Settings → Environment Variables.

Troubleshooting
- If build fails locally, run `npm install` then `npm run build` and fix errors.
- Ensure `next`, `react`, and `react-dom` versions are compatible with Vercel (they are in this repo).

If you want, I can:
- initialize a local git repo and commit for you
- attempt to create the GitHub repo using `gh` (requires you to be logged in locally)
- run `vercel` CLI to link and deploy (requires interactive auth)

Tell me which of the three actions above you'd like me to do next.
# Nestora Interiors

A complete Next.js App Router website for a Hyderabad interior design company. React, TypeScript, Tailwind CSS, local optimized WebP imagery, accessible project galleries, and a server-side Resend enquiry endpoint.

## Run locally

Use Node.js 22 LTS and npm. Extract the supplied ZIP or clone your own repository containing these files.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for local form requests. Credentials are only needed for real email delivery. WhatsApp and email links work without them. In development, the rate limiter uses a local shared bucket when Redis is absent. Restarting the development server resets that bucket.

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```

`build` explicitly uses Next.js's supported Webpack builder for reliable builds in restricted environments. `start` binds to 127.0.0.1 by default. For a container use `npx next start --hostname 0.0.0.0`. Vercel uses its native Next.js runtime.

## What is included

- Home, Services, Projects, four sample project detail pages, About, Design Process, Contact, Privacy Policy, Terms, and custom error/404 pages.
- Style and room filters with an honest empty state; native modal gallery with keyboard arrows, Escape, focus restoration, and touch swipes.
- Every requested consultation field, client/server validation, consent, loading/error/success states, selected-service prefilling, and WhatsApp continuation.
- Unique metadata, canonical URLs, local business schema with supplied information only, sitemap, robots, favicon and generated social sharing graphic.
- Sticky responsive navigation, mobile WhatsApp, site-wide chat button, reduced-motion support and semantic structure.
- Supplied video references and one generated hero concept. See `IMAGE-SOURCES.md`.

There are no fictional testimonials, client identities, completion statistics, office addresses, maps, awards, business hours, guarantees, social profiles or prices. Team and review sections explicitly await verified information. No before/after slider is shown because no verified matching before/after pair was provided.

## Configuration

`lib/config.ts` is the single business configuration: name, location, service area, display phone, email, WhatsApp number, message templates, navigation, SEO, team, reviews and social links. The public WhatsApp environment variable overrides the configured fallback. If you change the number, update `company.phone` as the display label too.

| Variable                      | Purpose                                                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`        | Final HTTPS origin, without a trailing slash. Used for canonicals, sitemap, metadata and same-origin form protection. Rebuild after changing it. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only, including country code. Default `917013265720`. Public, safe for frontend.                                                          |
| `CONTACT_RECIPIENT_EMAIL`     | Optional server override; falls back to `company.email`. Set to `thenestorainteriors@gmail.com`.                                                 |
| `EMAIL_FROM`                  | Resend-verified sender such as `Nestora Interiors <enquiries@your-verified-domain>`.                                                             |
| `RESEND_API_KEY`              | Server-only Resend API key.                                                                                                                      |
| `UPSTASH_REDIS_REST_URL`      | Server-only Upstash Redis REST endpoint.                                                                                                         |
| `UPSTASH_REDIS_REST_TOKEN`    | Server-only Upstash Redis REST token.                                                                                                            |
| `RATE_LIMIT_SALT`             | Long random secret for hashing request identifiers. Generate with `openssl rand -hex 32`.                                                        |

Never commit `.env.local` or secrets. Only the example file belongs in the repository. Keep server keys out of all `NEXT_PUBLIC_` variables.

If the site URL is not explicitly configured, preview metadata uses the Vercel deployment URL when available and disables search indexing. Local fallback is localhost. Set the final public URL and redeploy to enable indexing.

## Email setup

1. Create a Resend account and add a sending domain you control. Add the DNS records Resend supplies and wait for domain verification.
2. Create a sending API key and store it as `RESEND_API_KEY` in `.env.local` or Vercel environment settings. Do not paste secrets into source code or chat.
3. Set `EMAIL_FROM` to an address on that verified domain. Gmail is the recipient, not a sender domain you can verify through Gmail. Resend's test sender is restricted and is not a production replacement.
4. Set `CONTACT_RECIPIENT_EMAIL=thenestorainteriors@gmail.com`.
5. Create an Upstash Redis database. Set its REST URL/token and generate `RATE_LIMIT_SALT`.
6. Set `NEXT_PUBLIC_SITE_URL` to the exact origin serving the form and redeploy.
7. Submit a clearly marked test enquiry, verify Resend accepted it, check the recipient inbox/spam folder, and reply to confirm Reply-To reaches the customer's address. A preferred date is never treated as a confirmed appointment.

The endpoint sends a complete plain-text enquiry through `https://api.resend.com/emails`, with the customer email in `reply_to`. HTTP success requires a successful provider response containing an email ID. Provider rejection, timeout or missing configuration produces an honest failure with direct contact alternatives. Acceptance is not proof of inbox delivery. Local tests mock the provider and do not send email.

Spam controls: a hidden honeypot, 2-second minimum/24-hour maximum form age, body-size limit, origin check, strict field validation, plain-text output, and 5 attempts per 15 minutes. Production fails closed if distributed rate limiting is missing/unavailable. On Vercel, the limiter uses the platform-controlled `x-vercel-forwarded-for` header and stores only a salted HMAC identifier. Other hosts deliberately use a shared anonymous bucket until you adapt `lib/rate-limit.ts` to that host's trusted proxy contract. Do not blindly trust user-supplied forwarding headers.

No enquiry bodies, customer addresses, provider errors or raw IPs are logged by the application. The endpoint uses no-store responses. Your hosting/email services have separate logs and retention settings.

## Deploy to Vercel

The repository includes `vercel.json` with the Next.js preset and Mumbai function region. No account credentials are stored here.

1. Create a GitHub/GitLab/Bitbucket repository and push the source (or use the Vercel CLI directly).
2. Import the repository into Vercel. Choose the Next.js preset and Node.js 22.
3. Add the environment variables above in the correct Production/Preview environments. Use the matching site URL for each deployment origin.
4. Deploy. Visit the URL, check `/contact`, `/sitemap.xml`, `/robots.txt` and a sample project. Complete an actual test email before announcing the email form as operational.

CLI alternative:

```bash
npx vercel login
npx vercel link
npx vercel env add NEXT_PUBLIC_SITE_URL production
# Add remaining variables through the dashboard or `vercel env add`.
npx vercel --prod
```

If handed a temporary preview and claim link, claim it through your own Vercel account before relying on its persistence. A temporary preview is not a configured permanent production launch. After claiming, configure email and Redis, set your canonical URL and redeploy.

## Connect a custom domain

In Vercel Project → Settings → Domains, add the domain and preferred `www`/apex version. At your registrar, apply the exact DNS records Vercel shows; do not copy stale example IP addresses. Wait for verification and HTTPS provisioning, choose the primary domain and redirect the alternate host to it. Set `NEXT_PUBLIC_SITE_URL` to the primary HTTPS origin and redeploy. Verify the canonical, sitemap and form origin on the final domain. Domain ownership/DNS access is required.

## Update content without changing components

### Services

Edit `services` in `lib/content.ts`: each entry contains a name, description and unique URL-safe ID. Its image is assigned by the map at the end of the array. Add the image path there for your new service. Service pages, enquiry options and automatic WhatsApp prefills use this shared data.

### Projects and images

Copy licensed/owned images into `public/images/` using descriptive filenames. Prefer optimized WebP or AVIF, around 1200–1800 pixels wide for new landscape photographs. Do not upscale low-resolution video frames and expect photographic quality. Update `IMAGE-SOURCES.md` with provenance.

Add an object to `projects` in `lib/content.ts`:

```ts
{
  sample: false, // Only for a verified real project
  slug: 'a-unique-project-slug',
  name: 'Project title',
  style: 'Modern',
  room: 'Living Room',
  image: '/images/project-cover.webp',
  gallery: ['/images/project-cover.webp', '/images/project-detail.webp'],
  description: 'A verified overview of the space.',
  highlights: ['A useful design detail', 'Another design detail'],
}
```

The gallery, detail route, related projects, enquiry links and sitemap update automatically after a rebuild. Add new labels to `categories`/`rooms` if needed. Every existing project is explicitly a sample. When verified project stories arrive, set `sample: false` on that individual project; do not silently remove sample labels from all references. Keep client identifying information out unless authorized.

### FAQs, team, testimonials and social links

- FAQs: edit `[question, answer]` entries in `lib/content.ts`.
- Team: add `{name, role, bio}` to `team` in `lib/config.ts`; the pending state disappears automatically.
- Testimonials: add `{name, quote}` to `testimonials` only when genuine and approved for publication. Empty arrays show a clear placeholder without invented quotes.
- Social links: add `{label, url}` to `socialLinks` only for actual profiles. Empty arrays render nothing.
- Navigation and SEO: edit `navigation` and `seo` in `lib/config.ts`.
- Brand: replace `Logo` in `components/header.tsx` and `app/icon.svg`; the temporary vector/text logo is original and editable.
- Hero: replace `public/images/hero.webp`; update its alternative text and the concept label in `app/page.tsx` if replaced by a verified real photograph.

## Tests and quality checks

```bash
npx playwright install chromium
npm run build
npm run test:e2e -- --workers=4
```

The browser suite covers all routes at desktop, tablet and mobile widths, keyboard navigation, swipe interaction, images, horizontal overflow, axe WCAG A/AA checks, filters, metadata, and mocked form success/failure states. Server tests cover validation, spam rejection, origin/size controls, complete email content, recipient/Reply-To, missing credentials, provider acceptance/rejection/timeouts and WhatsApp encoding. See `VERIFICATION.md` for actual results and limitations.

Source formatting: `npx prettier --write app components lib tests scripts *.ts *.mjs *.json *.md`.

## Useful references

- [Next.js installation and App Router](https://nextjs.org/docs/app/getting-started/installation)
- [Resend send-email API and Reply-To](https://resend.com/docs/api-reference/emails/send-email)
- [Vercel project domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain)

The privacy and terms pages describe this implementation. Update them when business practices, service providers or retention arrangements change.
