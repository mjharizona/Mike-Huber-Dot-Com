# Mike Huber premium React redesign

This is the approved ivory, deep-ink and bronze redesign, converted from the static review into native React components and Next.js pages. New frontend code is JavaScript/JSX. Existing backend, admin, assessments and blog utilities retain their TypeScript source. Node.js runs the build and server functions. Netlify remains the deployment destination.

## Start locally

Use Node.js 22 LTS. Run `npm ci`, then `npm run dev`. For a production check run `npm run build` followed by `npm start`.

## Deployment settings

- Existing GitHub repository: https://github.com/mjharizona/Mike-Huber-Dot-Com
- Existing production branch: main, subject to confirming the connected Netlify site's settings.
- Netlify build command: `npm run build`
- Publish directory: `.next`
- Node version: 22, declared in netlify.toml.
- The existing Next.js adapter remains configured in netlify.toml.
- Keep the existing Netlify site, mikehuber.com domain, DNS, environment variables and integrations. Do not create a replacement Netlify site or switch to a static-only deploy.

## What changed

Native JSX pages implement Home, Speaking, About, Books, Advisory and Contact. Shared React header/footer use the text name Mike Huber. The mobile menu and contact form use React state. Session links open the correct abstract and prefill inquiry details. The homepage resources button links to /blog. The corporate-training list now includes IDB, linked to https://idb.org. The requested wording is “quality standards and a business measure.”

The existing blog and scheduled publishing system remain intact. The blog index and article shell now use the premium style. Published and scheduled Markdown/MDX content, FAQ/BlogPosting data, RSS and sitemap are retained. /insights aliases redirect to the existing /blog URLs. Existing photography, training, book, privacy, testimonials, audits, assessment and administration routes remain present.

The framework is updated from Next.js 14.2.5 to the installed 15.5.29 maintenance release, with React/React DOM 19.3.1 and matching React types. The lockfile pins the tested dependency tree. Next.js asynchronous route params are migrated. Blog source tracing is moved to its supported config location, keeping Markdown available to Netlify's server functions. Do not revert these compatibility changes while applying the visual design.

## Contact delivery

The React form calls the existing /api/contact endpoint. Event details join the message while preserving the existing name, email, company, interest and message contract. The form reports success only after the endpoint confirms email acceptance. A missing email configuration returns 503; a rejected delivery returns 502; the visitor sees a direct email alternative. The existing best-effort file lead store is retained, but it is not durable on Netlify's read-only serverless filesystem. Do not treat it as a guaranteed lead database.

Keep the existing RESEND_API_KEY and CONTACT_EMAIL_TO in Netlify. CONTACT_EMAIL_FROM is an optional verified-domain sender override; without it the existing onboarding sender is retained. Confirm the actual sender/domain and a real end-to-end inquiry after deployment using Mike's existing authorized workflow. No credentials are included in this package, and no live inquiry was sent during local checks.

Admin access still uses ADMIN_PASSWORD and JWT_SECRET. In production a missing or short JWT secret now fails closed rather than using a known development fallback. Keep the existing valid secret; do not regenerate it or change login details as part of deployment.

## Branding

Mike rejected the proposed MH logo. Use text only: “Mike Huber” with “Speaker. Author. Advisor.” below it in the header, and “Mike Huber” in the footer. Keep the existing app icons. Do not install the rejected monogram or logo assets.

## Launch status

The source was built from GitHub main ceb7e94abb2a092f0c7d5ff3613819998bdb53bd. Direct push from this session failed because GitHub write credentials were unavailable. No branch was pushed and no Netlify deployment was triggered. Use the included patch through the existing authenticated Claude/GitHub setup. Check for newer upstream commits before applying.
