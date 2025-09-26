# ProSite Builder

ProSite Builder is a Next.js application for selling ready-made website templates. Customers can browse industry-specific designs, preview live screenshots, and unlock production-ready codebases with a single purchase.

## Features

- Marketing landing page that highlights the value proposition and featured templates.
- Template gallery with category filters and rich detail pages.
- Pricing plans tailored for founders, solo makers, and agencies.
- Dashboard concept showcasing how purchased downloads will appear once Stripe checkout is connected.
- Authentication pages for log in and registration flows (UI only).
- Supporting pages for support, privacy, terms, contact, and checkout roadmap.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project structure

- `src/lib/templates.ts` – in-memory catalog used across pages.
- `src/app/page.tsx` – marketing landing page with featured templates.
- `src/app/templates/*` – gallery and template detail views.
- `src/app/dashboard/page.tsx` – sample user dashboard populated with mock purchases.
- `src/app/pricing/page.tsx` – pricing tiers and CTAs.
- `src/app/auth/*` – login and registration screens.

## Next steps

- Wire up real authentication (NextAuth) and persistence via MongoDB.
- Replace mock checkout screen with a live Stripe integration.
- Store template assets (ZIPs, imagery) in persistent storage such as S3.
- Add lightweight customization workflows for colors, copy, and branding assets.
