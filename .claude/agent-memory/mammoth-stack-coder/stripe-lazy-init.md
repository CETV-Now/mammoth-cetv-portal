---
name: Stripe Lazy Init
description: Stripe must use lazy initialization pattern in lib/stripe.ts to avoid build crashes
type: feedback
---

Do not call `new Stripe(process.env.STRIPE_SECRET_KEY!)` at module level. The build evaluates API routes at static generation time; if the env var is empty the build fails with "Neither apiKey nor config.authenticator provided".

**Why:** Discovered during first build of mammoth-cetv-portal — direct module-level instantiation crashes `next build` when STRIPE_SECRET_KEY is unset.
**How to apply:** Use a lazy getter pattern (Proxy or function) in lib/stripe.ts so Stripe is only instantiated when the route handler actually runs.
