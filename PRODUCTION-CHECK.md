# Production Readiness Checklist — mammoth-cetv-portal

Generated: 2026-06-09 (branch `dev-production-check`)
Supersedes the 2026-05-16 review. Items carried over from that review keep a "carried over" note.

## How this was verified

| Check | Result |
|---|---|
| `npm run build` (production, Turbopack) | ✅ Compiles — but only with secrets present (see #9) |
| `tsc --noEmit` | ✅ Clean |
| `npm run lint` | ✅ Runs (config fixed 2026-06-09) — surfaces 27 errors / 30 warnings (see #3) |
| `npm ci` | ✅ Passes (lockfile regenerated 2026-06-09, see #2) |
| `npm audit` | ⚠️ 0 critical, 5 high remaining — all transitive via `@trigger.dev/sdk` + `fast-xml-builder` (see #17) |
| Tests / CI | ❌ None exist — no test files, no `.github/workflows` (see #16) |

---

## Blockers — fix before launch

### 1. Critical advisory against pinned `@clerk/nextjs@6.36.2` — ✅ FIXED 2026-06-09
`npm audit` reported a **critical middleware route-protection bypass** in the official Clerk SDK. Upgraded to `@clerk/nextjs@6.39.5` (patched, same major). This required bumping `react`/`react-dom` 19.2.1 → 19.2.7 to satisfy Clerk's peer range. Audit no longer flags Clerk. **Remaining manual step:** re-test sign-in, onboarding redirect, and protected routes in a real environment.

### 2. `package-lock.json` out of sync — `npm ci` fails — ✅ FIXED 2026-06-09
`npm ci` errored with `Missing: react@19.2.7 from lock file`. Lockfile regenerated alongside the #1/#4 upgrades; `npm ci` now passes cleanly.

### 3. ESLint is broken — ✅ FIXED 2026-06-09
`npm run lint` crashed because `eslint.config.mjs` loaded `eslint-config-next@16` through `FlatCompat`, but v16 ships native flat configs — the legacy shim choked on their circular plugin references. Rewritten to import `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript` directly via `defineConfig`, with ignores for `.next/`, `out/`, `build/`, `next-env.d.ts`.

**Follow-up:** lint now runs and exits 1 on 27 pre-existing errors (so a CI lint gate would fail until they're cleaned up):
- 20× `react-hooks/set-state-in-effect` — mostly `app/screens/screens-page.tsx` (9), layout pages, pickers, `hooks/use-mobile.ts`
- 3× `react/no-unescaped-entities` (onboarding components)
- 2× `@typescript-eslint/no-explicit-any` (`app/playlists/[id]/edit/page.tsx`)
- 1× `react-hooks/purity` (`components/ui/sidebar.tsx:599`, `Math.random` in render)
- 1× `prefer-const` (`lib/mongodb.ts:19`, auto-fixable)

Plus 30 warnings (15× `@next/next/no-img-element`, 12× unused vars, 3× `exhaustive-deps`).

### 4. `next@16.0.8` has high-severity advisories — ✅ FIXED 2026-06-09
Included Server Actions source-code exposure and a DoS vector. Upgraded `next` and `eslint-config-next` 16.0.8 → 16.2.9. Audit no longer flags Next. Verified after upgrade: `tsc --noEmit` clean, production build compiles, lint still runs (same 27 pre-existing errors as #3).

---

## High — fix before or immediately after launch

### 5. API routes with zero try/catch (carried over) — ✅ Stripe portion FIXED 2026-06-09
Any thrown error (Stripe, OpenAI, S3, Mongo, bad ObjectId) returns an opaque 500 with no log context.

**Fixed (both Stripe order routes — `app/api/onboarding/order/route.ts` and `app/api/orders/route.ts`):**
- `stripe.customers.create` wrapped → 502 with a user-facing message on failure.
- `stripe.setupIntents.create` wrapped → card declines return **402 with Stripe's user-safe decline message** (clients already toast `data.error`), invalid payment details → 400, other Stripe failures → 502 with server-side logging.
- **SetupIntent `status` now checked** — anything other than `succeeded` returns 402 and no order is recorded (previously a failed/`requires_action` intent still placed the order and completed onboarding).
- `new ObjectId(screenId/locationId)` guarded → 400 on malformed ids (was 500).
- `await req.json()` guarded → 400 on malformed JSON (was 500).

**Still open (no try/catch):**
- `app/api/content/generate/route.ts` — OpenAI image call + S3 put, both unguarded.
- `app/api/content/upload-url/route.ts`, `app/api/playlists/route.ts`, `app/api/channels/route.ts`, `app/api/locations/route.ts`, `app/api/content/generate/save/route.ts`, all `app/api/onboarding/*` except order.

### 6. No MongoDB indexes (carried over — spec ready, not yet applied)
Every authenticated request looks up `users` by `clerk_user_id`, and every collection is filtered by `account_id`, with no indexes anywhere (`createIndex` appears nowhere in the repo). Full collection scans on every request; degrades silently as data grows.

**2026-06-09:** Full index specification written to **`MONGODB-INDEXES.md`**, derived from the actual query shapes in `app/api/**` (including the compound `screens.{account_id, playlist_id}` and sort-covering `content`/`playlists` indexes). Remaining step: run the script there against each environment's database.

### 7. Unbounded list queries / no pagination (carried over — still open)
Six routes call `.toArray()` with no `.limit()`: `channels`, `content`, `layouts`, `playlists`, `playlists/[id]`, `screens`. Add `.limit(100)` as a guard now; proper `page`/`limit` pagination as follow-up.

### 8. No rate limiting (carried over — still open)
- `POST /api/content/generate` — one paid OpenAI image generation + S3 upload per request, limited only by Clerk auth.
- `POST /api/screens/[id]/activate` — 4-character alphanumeric PIN with unlimited attempts.
- `POST /api/content/upload-url` — unlimited presigned URL minting.

### 9. Build requires production secrets; clients constructed at module scope
Verified: `next build` fails without `MONGODB_URI`, then again without `OPENAI_API_KEY`. Causes:
- `lib/mongodb.ts` throws at import and calls `client.connect()` eagerly at module load.
- `app/api/content/generate/route.ts:8` constructs the OpenAI client at module scope.

Lazy-initialize (the `lib/stripe.ts` proxy pattern already does this correctly) so the app can build in CI/Docker without secrets, and so a transient Mongo outage at boot doesn't poison the cached connect promise.

### 10. No error monitoring or observability
No Sentry/`instrumentation.ts`/APM anywhere; errors go to `console.error` only. In production nobody will know routes are failing. PostHog (client analytics) is not a substitute.

### 11. Clerk webhook: non-transactional inserts + PII logging
`app/api/webhooks/clerk/route.ts` inserts `accounts` then `users` without a transaction. If the user insert fails, Svix retries and the duplicate-check (on `users` only) passes again → orphaned account per retry. Wrap in `session.withTransaction()` like the onboarding location route. Also logs user emails to stdout (line 65) — drop or redact.

---

## Medium

### 12. Malformed JSON handling (carried over — still open)
`order`, `upload-url`, `generate`, and `activate` call `await req.json()` unguarded (malformed body → 500). `content/[id]` swallows parse errors with `.catch(() => ({}))` and proceeds with an empty body. Standardize: parse failure → 400.

### 13. No error/not-found boundaries
`app/error.tsx`, `app/global-error.tsx`, and `app/not-found.tsx` don't exist. Any uncaught render error shows Next's default error screen with no recovery path.

### 14. Presigned upload URL is unconstrained
`app/api/content/upload-url/route.ts` signs a PUT for any `contentType` and any size, with the key extension taken from the user's filename. Allowlist content types (image/video), cap size (presigned POST with `content-length-range`, or validate after upload), and derive the extension from the content type.

### 15. Client/env misconfiguration fails silently
- `providers/posthog.tsx:10` — `NEXT_PUBLIC_POSTHOG_KEY!` non-null assertion; missing key initializes PostHog with `undefined`.
- `app/layouts/layouts-page.tsx:111` — missing `NEXT_PUBLIC_PREVIEW_PLAYER_URL` silently falls back to `http://localhost:5173` **in production**.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` still use `!` assertions (carried over). A shared `env.ts` validator would catch all of these at build/boot.

### 16. No tests and no CI
Zero test files, no test script, no `.github/workflows`. Nothing gates a deploy — at minimum add a CI job running `npm ci && tsc --noEmit && next build` (which today would have caught #2 and #3), plus smoke tests for the order and webhook flows.

### 17. Remaining high-severity transitive vulnerabilities
After the Clerk/Next bumps, `npm audit` still flags `@trigger.dev/sdk` (via `socket.io`, `systeminformation`), `js-cookie` (via `@clerk/shared`), and `fast-xml-builder`. Re-run `npm audit` after upgrades and clear what's actionable.

### 18. Node 20 runtime nearing AWS SDK floor
Build emits: AWS SDK v3 releases after early Jan 2027 require Node ≥ 22. Plan the runtime upgrade with the next dependency pass.

---

## Low / hygiene

- **Console noise**: 12 `console.log` calls in app code (6 in API routes, mostly the Clerk webhook). Replace with a leveled logger or remove.
- **`.env.example` drift**: documents `AWS_BUCKET` as a "legacy alias" but nothing references it anymore — delete the line.
- **`tsconfig.tsbuildinfo` is committed** — add to `.gitignore`.
- **`next.config.ts` image fallback**: if S3 env vars are absent at build time, `remotePatterns` silently widens to `*.s3.amazonaws.com`. Fail the build instead.
- **No health-check endpoint** (`/api/health`) for the load balancer / uptime monitoring.
- **`@types/sharp` is a deprecated stub** — sharp ships its own types; remove the dev dep.

---

## Verified good ✅

- **Production build compiles** (Next 16, Turbopack) with env vars present; type check clean.
- **Auth on every API route** — all 27 app routes call `auth()`; the one exception (`/api/webhooks/clerk`) correctly verifies Svix signatures instead.
- **Account scoping** — sampled routes consistently filter by `account_id` from the authenticated user.
- **Security headers** (HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy) in `next.config.ts` (fixed in prior review).
- **Atomic promo-code claim** via `findOneAndUpdate` pipeline (fixed in prior review).
- **Mongo connection pool options** tuned (`maxPoolSize`, timeouts) (fixed in prior review).
- **Lazy Stripe client** with env validation (`lib/stripe.ts`) — the pattern the Mongo/OpenAI clients should copy.
- **`.env.example`** present and covers all 24 env vars currently referenced.
- **Socket-server commands** (reboot/reload/set-timezone) validate ownership, handle missing config with 503, and pass errors through.

## Prior-review items accepted as "by design"

- `external_channels` endpoint is unscoped — global catalogue shared by all accounts.
- Activation PIN stored in plaintext — device reads token directly for matching. (Rate limiting in #8 is the compensating control; without it this design is guessable.)

---

## Suggested order of attack

1. ~~Regenerate lockfile, fix ESLint config, upgrade `@clerk/nextjs` + `next` (#1–#4)~~ ✅ Done 2026-06-09.
2. Add CI running install + typecheck + build (#16) so regressions of step 1 can't land.
3. ~~Wrap the order routes' Stripe calls, check SetupIntent status~~ ✅ Done 2026-06-09; remaining: error handling for the non-Stripe routes (#5).
4. Create MongoDB indexes (#6) — one script, biggest silent-scaling win.
5. Rate limiting + query limits (#7, #8), then error monitoring (#10) before real traffic.
