# Production Readiness Review — mammoth-cetv-portal

Generated: 2026-05-16  
Last updated: 2026-06-02

---

## Status Summary

| # | Issue | Severity | Status |
|---|---|---|---|
| 1 | Security headers in `next.config.ts` | Critical | ✅ Fixed |
| 2 | `external_channels` unscoped endpoint | Critical | ✅ By design |
| 3 | Missing MongoDB indexes | High | ✅ Fixed |
| 4 | N+1 query in `/api/playlists` | High | ✅ Fixed |
| 5 | Promo code claim not atomic | High | ✅ Fixed |
| 6 | No try/catch around `stripe.setupIntents.create` | High | ✅ Fixed |
| 7 | JSON parse errors swallowed silently | High | Open |
| 8 | Location + screen insert not transactional | High | ✅ Fixed |
| 9 | Unbounded queries on list endpoints | High | Open |
| 10 | No rate limiting on high-risk endpoints | Medium | Open |
| 11 | Activation PIN stored in plaintext | Medium | ✅ By design |
| 12 | No pagination on list endpoints | Medium | Open |
| 13 | Client-side env vars not validated at startup | Medium | Open |
| 14 | MongoDB client default connection options | Medium | ✅ Fixed |
| 15 | No `.env.example` file | Medium | ✅ Fixed |

**11 resolved · 5 open**

---

## Open Items

### 7. Unhandled JSON parse errors swallowed silently
Several routes do `await req.json().catch(() => ({}))` and proceed with an empty body, leading to silent misbehaviour rather than a clear 400.

**Fix:**
```ts
let body: unknown;
try {
  body = await req.json();
} catch {
  return Response.json({ error: "Invalid JSON" }, { status: 400 });
}
```

---

### 9. Unbounded queries on all list endpoints
`find({}).toArray()` with no `.limit()` on content, screens, playlists, and layouts. An account with thousands of items returns everything in a single response.

**Fix:** Add `.limit(100)` as a minimum guard now; add proper pagination (`page`/`limit` query params with a total count) as a follow-up.

---

### 10. No rate limiting on high-risk endpoints
`/api/content/generate` (triggers an OpenAI API call and S3 upload per request) and `/api/screens/[id]/activate` (PIN guessing) have no rate limiting. Upstash Ratelimit is already available as a dependency via Redis.

---

### 12. No pagination on list endpoints
Related to #9. No `page`/`limit` params, no total count in API responses. Frontend will break as data volumes grow.

---

### 13. Client-side env vars not validated at startup
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` are accessed with `!` non-null assertions in client components. If either is missing at build time the page crashes silently client-side.

**Fix:** Validate these in a shared `env.ts` module that throws a descriptive error at module load time.

---

## Resolved Items

| # | Issue | Resolution |
|---|---|---|
| 1 | Security headers | Added HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. `remotePatterns` restricted to HTTPS + CETV S3 bucket only. |
| 2 | `external_channels` unscoped | By design — all accounts share the global channel catalogue. |
| 4 | N+1 in `/api/playlists` | Single `$in` query + in-memory Map. 2 round-trips regardless of playlist count. |
| 5 | Promo code race condition | Single atomic `findOneAndUpdate` with `$cond` pipeline. |
| 8 | Non-transactional onboarding inserts | `session.withTransaction()` wraps location + screen insert + account update. |
| 11 | PIN stored in plaintext | By design — device reads token directly for matching. |
| 14 | MongoDB default connection options | `maxPoolSize: 10`, `minPoolSize: 2`, `serverSelectionTimeoutMS: 5000`, `socketTimeoutMS: 45000`. |
| 15 | No `.env.example` | Created with all 19 vars documented by service group. |
| 3 | Missing MongoDB indexes | All 7 indexes added: `users.clerk_user_id`, `screens.account_id`, `content.{account_id,status}`, `playlists.{account_id,status}`, `screen_layouts.account_id`, `locations.account_id`, `promo_codes.{code,status}`. |
| 6 | Stripe calls unprotected | Wrapped `customers.create` + `setupIntents.create` in both `orders/route.ts` and `onboarding/order/route.ts`. Card/invalid-request errors → 400; all other Stripe errors → 502. |

---

## Highest Actual Risk

- **#6 (Stripe error handling)** — any Stripe failure during order placement returns an opaque 500 with no recovery path for the user.
