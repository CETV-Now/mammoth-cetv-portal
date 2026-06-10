# MongoDB Indexes — mammoth-cetv-portal

Addresses PRODUCTION-CHECK.md item #6 (no indexes anywhere; every query is a full
collection scan). The indexes below are derived from the actual query patterns in
`app/api/**` and the server components as of 2026-06-09 — each one is justified by a
real filter/sort the app runs, not added speculatively.

Run the script at the bottom against **each environment** (the database named by
`MONGODB_DB`). `createIndex` is idempotent — re-running is safe and existing
identical indexes are left untouched.

---

## Required indexes

### `users`
Every authenticated request starts with a lookup by Clerk user id
(`findOne({ clerk_user_id })` — ~50 call sites).

```js
db.users.createIndex({ clerk_user_id: 1 }, { unique: true })
```

`unique` also enforces the invariant the Clerk webhook assumes when it checks for an
existing user before insert (`app/api/webhooks/clerk/route.ts:72`). If this fails with
a duplicate-key error, there are duplicate users in the data — fix those first.

### `screens`
Listed per account (`app/api/screens/route.ts:28`), and queried/updated by
`{ account_id, playlist_id }` when resolving playlist assignments
(`app/api/playlists/route.ts:34`, `app/api/playlists/[id]/route.ts:47,165,172`).

```js
db.screens.createIndex({ account_id: 1, playlist_id: 1 })
```

One compound index covers both shapes — the `account_id` prefix serves the plain
per-account listing, the full key serves the playlist-assignment queries.

### `content`
Listed by `{ account_id, status, type }` sorted by `created_at` descending
(`app/api/content/route.ts:30-31`).

```js
db.content.createIndex({ account_id: 1, status: 1, created_at: -1 })
```

The `type: { $ne: "layout_content" }` clause can't use an index efficiently anyway;
this index narrows to the account+status range and serves the sort.

### `playlists`
Listed by `{ account_id, status: "active" }` sorted by `created_at` descending
(`app/api/playlists/route.ts:26-27`).

```js
db.playlists.createIndex({ account_id: 1, status: 1, created_at: -1 })
```

### `screen_layouts`
Listed per account, sorted by name (`app/api/layouts/route.ts:17-18`).

```js
db.screen_layouts.createIndex({ account_id: 1, name: 1 })
```

### `locations`
Fetched per account in onboarding and the screens/locations pages.

```js
db.locations.createIndex({ account_id: 1 })
```

### `device_orders`
Listed per account (`app/api/orders/route.ts`).

```js
db.device_orders.createIndex({ account_id: 1 })
```

### `promo_codes`
Validated by `{ code, status: "active" }` (`app/api/onboarding/promo/validate/route.ts:18-21`).
The claim path queries by `_id` and needs nothing extra.

```js
db.promo_codes.createIndex({ code: 1, status: 1 })
```

If codes are guaranteed unique, prefer `db.promo_codes.createIndex({ code: 1 }, { unique: true })`
instead — it serves the same query and prevents duplicate codes at the data layer.

---

## Collections that need nothing

- **`accounts`** — only ever queried by `_id`, which is indexed by default.
- **`external_channels`** — global catalogue read with `find({})`; an index can't help
  a full-collection read. (If it grows past a few hundred documents, add `{ name: 1 }`
  to serve the sort in `app/api/channels/route.ts:16`.)

---

## Ready-to-run script

Save-free one-liner — paste into `mongosh "<MONGODB_URI>"`:

```js
use("<MONGODB_DB>"); // replace with the env's database name, e.g. "production"

db.users.createIndex({ clerk_user_id: 1 }, { unique: true });
db.screens.createIndex({ account_id: 1, playlist_id: 1 });
db.content.createIndex({ account_id: 1, status: 1, created_at: -1 });
db.playlists.createIndex({ account_id: 1, status: 1, created_at: -1 });
db.screen_layouts.createIndex({ account_id: 1, name: 1 });
db.locations.createIndex({ account_id: 1 });
db.device_orders.createIndex({ account_id: 1 });
db.promo_codes.createIndex({ code: 1, status: 1 });
```

Verify afterwards:

```js
["users","screens","content","playlists","screen_layouts","locations","device_orders","promo_codes"]
  .forEach(c => printjson({ [c]: db[c].getIndexes().map(i => i.name) }));
```

---

## Notes

- **Index builds are online** in MongoDB 4.2+ (Atlas included) — they don't lock the
  collection, but build on a primary under load; run during a quiet window for large
  collections.
- **Keep this file in sync**: if a route gains a new filter shape (e.g. pagination
  cursors from PRODUCTION-CHECK.md #7), update the corresponding index here.
- A longer-term option is creating indexes from code at startup or via a migration
  tool, so new environments can't be deployed without them. Until then this file is
  the source of truth.
