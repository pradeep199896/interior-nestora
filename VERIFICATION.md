# Verification and deployment status

Verified locally on 7 September 2026 using Node.js 22.23.0, Next.js 16.3.4, and Chromium 153 on macOS. See the scripts and tests in this source to repeat the checks.

## Completed checks

- ESLint: passed, no errors or warnings.
- TypeScript: passed with strict checking.
- Production build: passed using `next build --webpack`; all pages, dynamic consultation endpoint, project routes, metadata and social image compiled.
- Dependency lockfile: `npm ci --dry-run --ignore-scripts --offline` passed.
- Dependency audit: zero known vulnerabilities at verification time.
- Server tests: 9 passed. Includes complete enquiry content, recipient and Reply-To, invalid/oversized requests, invalid dates, consent, honeypot, minimum form age, stale requests, origin protection, rate-limit rejection/failure, unconfigured email, provider acceptance/rejection/missing ID/network failure, and all default/service/project WhatsApp encodings.
- Browser suite: 48 checks across desktop (1440px), tablet (810px) and mobile (390px). All 12 page routes, responsive navigation, services prefilling, filters/empty states, galleries, keyboard control, touch swipes, form validation/loading/error/success, metadata, social image, sitemap, robots and missing-page behavior.
- Axe WCAG A/AA scans on every page; additional scan inside the open modal gallery. Captions, controls, headings, labels, focus restoration and contrast checked.
- All visible images loaded successfully. No horizontal overflow at tested viewport sizes. Additional 320px checks passed on Home, Services, Projects, Contact and About.
- 28 unique internal links and service anchors checked: no failures.
- Email links use `mailto:thenestorainteriors@gmail.com`; WhatsApp links target `917013265720`. Prefilled messages were decoded and compared with their templates. No WhatsApp message was sent.
- Desktop and mobile screenshots visually reviewed. Reduced-motion CSS disables animations and smooth scrolling.

## Lighthouse lab measurements

Measured against the local production server with `NEXT_PUBLIC_SITE_URL=http://localhost:3000` to exercise configured canonical/robots behavior. This localhost setting is for verification only; configure the actual HTTPS domain before deployment.

| Category       | Mobile | Desktop |
| -------------- | ------ | ------- |
| Performance    | 98     | 100     |
| Accessibility  | 100    | 100     |
| Best practices | 100    | 100     |
| SEO            | 100    | 100     |

Mobile lab details: FCP 0.9s, LCP 2.5s, total blocking time 50ms, CLS 0. An earlier pass measured mobile performance 91; lab scores vary with caching and machine load. These are local lab results, not deployed field/Core Web Vitals measurements. The homepage was audited for Lighthouse; the broader browser suite checks all pages.

Without an explicit site URL, previews deliberately use `noindex` and a disallowing robots file. The initial unconfigured SEO score was 69 solely due to that intentional indexing block. The configured-URL check scored 100. Do not enable indexing for an unclaimed preview.

Reports and screenshots are in the workspace `artifacts/` folder and are excluded from the compact source ZIP. Run `npm run audit:site` while the server is running to regenerate Lighthouse HTML and JSON reports. Run `npm run test:e2e` to regenerate the browser report.

## Deployment status: not deployed

No public URL was created. `vercel whoami` reported logged out. The advertised `vercel deploy --temporary` option entered a login flow; a noninteractive retry returned “No existing credentials found.” No authenticated Vercel project is available in this workspace. The unattended login was cancelled.

Permanent deployment requires either a local `npx vercel login` session with access to your Vercel project/team, or a server-side deployment token supplied securely to the local environment. Do not put a token into source code or chat. Domain ownership/DNS access is also needed to connect a custom domain. No payment, account ownership claim, domain registration or DNS change was performed.

## Email and anti-spam status: implemented, not live-verified

Resend and Upstash credentials are not configured. No real test email was sent and no inbox delivery was verified. Server/provider and browser success/failure cases were tested with mocks. Production form submission remains unavailable until the configuration below is present; WhatsApp and direct email links remain usable.

Required configuration:

- `NEXT_PUBLIC_SITE_URL`: final HTTPS website origin.
- `RESEND_API_KEY`: Resend sending key.
- `EMAIL_FROM`: sender on a domain verified in Resend.
- `CONTACT_RECIPIENT_EMAIL=thenestorainteriors@gmail.com` (already defaults to the configured business email).
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: distributed anti-spam storage.
- `RATE_LIMIT_SALT`: a random server-only secret.
- `NEXT_PUBLIC_WHATSAPP_NUMBER=917013265720` is already the default.

After configuration, deploy, load the final public URL, check the canonical and sitemap, submit a marked test enquiry, inspect Resend's accepted event, verify receipt in the business inbox and test Reply-To. Those live checks remain outstanding and are not represented as complete.

## Content status

Four projects are clearly marked samples; none claims a real client identity, address or completion. Team and testimonial placeholders are explicit. The generated hero is visibly labeled as a concept. Supplied video stills are lower-resolution references, not retouched professional portfolio photography. Image sources and the generation prompt are documented in `IMAGE-SOURCES.md`.
