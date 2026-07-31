# MikeHuber.com — Next.js 14

A full-stack personal/professional website built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and a file-based CMS. Designed for Vercel deployment.

---

## Features

| Feature | Details |
|---|---|
| **Pages** | Home, About, Speaking, Training, Content/Book, Blog, Testimonials, Contact |
| **Blog / CMS** | Markdown (`.md`) or MDX files in `content/posts/` — no database required |
| **Contact Form** | React Hook Form with validation → API route → JSON lead store |
| **Admin Dashboard** | Password-protected `/admin` — leads inbox, blog post list |
| **Auth** | JWT cookie via `jose` (no external auth service needed) |
| **Email Alerts** | Optional Nodemailer integration (see `app/api/contact/route.ts`) |
| **SEO** | Metadata API, OG tags, `generateStaticParams` for blog posts |
| **Styling** | Tailwind CSS with custom navy/gold corporate palette |

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

> **Note:** This project uses `@tailwindcss/typography`. If it's not installed:
> ```bash
> npm install @tailwindcss/typography
> ```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# Admin dashboard password
ADMIN_PASSWORD=your-strong-password-here

# JWT secret (any long random string, 32+ chars)
JWT_SECRET=replace-with-a-long-random-secret-string

# Public site URL (used for OG tags)
NEXT_PUBLIC_SITE_URL=https://mikehuber.com

# Optional: SMTP for email notifications on contact form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL_TO=mike@mikehuber.com
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Writing Blog Posts

Drop a Markdown file in `content/posts/` and it will appear on the blog automatically. Use this frontmatter format:

```md
---
title: "Your Post Title"
date: "2024-06-15"
excerpt: "A one-sentence summary shown in the blog listing."
author: "Mike Huber"
tags: ["seo", "content marketing", "strategy"]
---

Your post content here...
```

**Filename = URL slug.** `my-post-title.md` → `/blog/my-post-title`

MDX (`.mdx`) is also supported — you can use React components inline.

---

## Admin Dashboard

Access at `/admin/login`. Enter the password you set in `ADMIN_PASSWORD`.

| Page | Path | What it shows |
|---|---|---|
| Dashboard | `/admin` | Stats overview + recent leads |
| Leads | `/admin/leads` | All contact form submissions |
| Posts | `/admin/posts` | All blog posts |

### Lead storage

By default, leads are stored in `data/leads/submissions.json` (file-based, no database). 

**To upgrade to a real database**, replace `lib/leads.ts` with your preferred ORM (Prisma, Drizzle, etc.) — the API surface (`getLeads`, `saveLead`) stays the same.

---

## Enabling Email Notifications

In `app/api/contact/route.ts`, uncomment the Nodemailer block and fill in your SMTP env vars. Gmail works well with an [App Password](https://support.google.com/accounts/answer/185833).

---

## Deploying to Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option B: GitHub + Vercel Dashboard

1. Push this repo to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add your environment variables in **Settings → Environment Variables**
4. Click **Deploy**

> **Important:** On Vercel, the file-based lead store (`data/leads/`) doesn't persist between deployments. For production, replace `lib/leads.ts` with a database (Supabase free tier is a great fit).

---

## Project Structure

```
mikehuber-nextjs/
├── app/
│   ├── (site)/              # Public pages with Nav + Footer
│   │   ├── page.tsx         # Home
│   │   ├── about/
│   │   ├── speaking/
│   │   ├── training/
│   │   ├── content-marketing/
│   │   ├── testimonials/
│   │   ├── contact/
│   │   └── blog/
│   │       └── [slug]/      # Dynamic blog post routes
│   ├── admin/               # Password-protected admin
│   │   ├── login/
│   │   ├── leads/
│   │   └── posts/
│   ├── api/
│   │   ├── contact/         # Contact form endpoint
│   │   └── admin/login/     # Auth endpoint
│   ├── layout.tsx           # Root layout (metadata)
│   └── globals.css
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx      # Client-side form with validation
│   └── TestimonialCard.tsx
├── content/
│   └── posts/               # Your blog posts (.md / .mdx)
├── data/
│   ├── testimonials.ts      # Testimonial data
│   └── leads/               # Auto-created on first form submission
├── lib/
│   ├── posts.ts             # Blog helpers
│   ├── leads.ts             # Lead storage
│   └── auth.ts              # JWT utilities
├── middleware.ts             # Admin route protection
├── tailwind.config.ts
├── next.config.mjs
└── .env.local.example
```

---

## Customization Notes

- **Colors:** Defined in `tailwind.config.ts` under `navy` and `gold` — change there to retheme the whole site.
- **Testimonials:** Edit `data/testimonials.ts`.
- **Navigation links:** Edit the `links` array in `components/Nav.tsx`.
- **Contact options:** Edit the `interests` array in `components/ContactForm.tsx`.
- **Add new pages:** Create a new folder in `app/(site)/` with a `page.tsx`.
