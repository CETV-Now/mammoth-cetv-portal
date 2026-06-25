# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`mammoth-cetv-portal` is the self-service customer portal for CETV ad-supported digital signage. Customers sign up, onboard a location, order signage devices (Stripe), manage a content library, and build playlists/layouts for their screens. Next.js 16 App Router, full-stack with API routes against MongoDB Atlas; Clerk for auth. `requirements.md` in the repo root is the product spec — read it before changing onboarding, ordering, or layout behavior. The UI intentionally mirrors `../mammoth-ad-ops-platform` (shadcn/ui + Tailwind 4).

## Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
npx shadcn@latest add [component]   # Add a shadcn/ui component
```

No test suite is configured. Copy `.env.example` to `.env.local` — it documents every required variable with comments (Clerk, MongoDB, S3, Stripe, OpenAI, Trigger.dev, Google Places, socket server, preview player, PostHog, `CETV_NETWORK_ID`).

## Architecture

### Auth & onboarding

- **Clerk** email-only signup. `middleware.ts` protects everything except `/sign-in`, `/sign-up`, and `/api/webhooks/clerk` (Clerk webhooks verified with Svix using `CLERK_WEBHOOK_SECRET`).
- The onboarding wizard (`app/onboarding/`) walks new users through: location details (Google Places autocomplete) → ad-serving mode (Ad Free vs Ad Supported) → channel selection → device order. Steps 2–3 are skippable; the device order (step 4) is mandatory — users who abandon it are routed back to it before reaching the dashboard.

### Payments (Stripe)

- `lib/stripe.ts` exposes a **lazy-initialized proxy** — the Stripe client is only constructed on first use so the module can be imported without `STRIPE_SECRET_KEY` at build time. Keep this pattern; do not instantiate Stripe at module top level.
- Device purchase and screen subscription use product/price IDs from env (`STRIPE_DEVICE_PRODUCT_ID`, `STRIPE_SUBSCRIPTION_*`). `NEXT_DEVICE_ALWAYS_CHARGE` toggles charging vs trial-disclaimer behavior.

### Data layer

- **MongoDB Atlas** via `lib/mongodb.ts` — singleton `clientPromise` (HMR-safe global in dev). Key collections: `screens`, `locations`, `content`, `playlists`, `channels`, `orders`.
- New screens get a unique 4-digit install code from `lib/installCode.ts` (checked against the `screens` collection); devices claim themselves with this code at install time.
- This portal's customers all live under the CETV network — `CETV_NETWORK_ID` (a MongoDB ObjectId, set per environment) scopes their documents.

### Background jobs & integrations

- **Trigger.dev** — API routes dispatch tasks by string id via `tasks.trigger(...)` (content transcoding, layout HTML generation, etc.). Task implementations live in the sibling `mammoth-trigger-dev` repo.
- **AWS S3** — content uploads via presigned URLs; AI-generated images also land in the bucket.
- **OpenAI** (`gpt-image-1`) — AI content generation in the Content Library, gated by `NEXT_SHOW_AI_CONTENT_CREATION`.
- **Socket server** — screen commands proxy to `SOCKET_SERVER_URL` with `SOCKET_SERVER_API_TOKEN`.
- **Preview player** — layout previews embed `NEXT_PUBLIC_PREVIEW_PLAYER_URL`.
- **PostHog** — client analytics via `providers/posthog.tsx`.

### Layouts & playlists

Playlists mix user-uploaded content with licensed channel content. Layouts come in two variants: content-only, and a five-zone configurable layout (`app/layouts/`). Drag-and-drop ordering uses `@dnd-kit`.

## Related docs in this repo

- `requirements.md` — product spec (onboarding flow, ad modes, ordering rules)
- `production-check.md` — pre-production checklist
