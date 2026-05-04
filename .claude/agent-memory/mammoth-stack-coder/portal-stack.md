---
name: Portal Stack
description: Tech stack and key dependency versions for mammoth-cetv-portal
type: project
---

Next.js 16.0.8, React 19.2.1, Tailwind v4, TypeScript strict mode.
Clerk pinned to 6.36.2 (not ^6.36.2) — higher versions break with React 19.2.1 peer deps.
MongoDB ^7, Stripe ^17, @stripe/react-stripe-js ^3, svix ^1 for webhook verification.
@types/google.maps required for Google Places type safety in step-location.tsx.
shadcn new-york style, neutral base color, Lucide icons.
components.json lives at project root; cssVariables: true.

**Why:** Matches mammoth-ad-ops-platform stack exactly per requirements.
**How to apply:** When adding new deps, verify peer compat with React 19.2.1 first.
