# KeyVerdict — Frontend

An independent property verification service. Next.js frontend, redesigned
(v2) after feedback that v1 read as flat/dated — moved from texture-based
depth to shadow/elevation-based depth, richer accent colors, and pill CTAs.

## Run it

```
npm install
npm run dev
```

Open http://localhost:3000

## What's built

| Route | What it is |
|---|---|
| `/` | Home — two-column hero with a real report preview mockup |
| `/sample-report` | A full example report, print-ready |
| `/how-we-make-money` | The trust/transparency anchor page |
| `/submit` | 4-step intake — locality search, property details, optional map pin, contact |
| `/api/submit` | POST to persist a submission, GET to view all (JSON) |
| `/api/geocode` | Proxies OpenStreetMap Nominatim for real locality search |

## What changed in v2 (this round)

- **Full visual redesign** — new palette (`tailwind.config.ts`): cleaner
  paper background, white elevated cards (`shadow-card` / `shadow-card-hover`),
  richer maroon/gold accents, pill-shaped CTAs. Depth now comes from real
  shadows, not a background texture.
- **New logo** (`components/Logo.tsx`) — a medallion monogram, kept
  deliberately separate from `VerdictStamp` (the report/status indicator)
  so the brand mark isn't doing double duty.
- **Real form validation** — `/submit` now blocks advancing on empty
  required fields (per-step validation, inline error text) and validates
  email format with a real regex before allowing submission. This was
  a genuine bug in the previous version and is fixed.
- **Real locality search** (`components/LocalitySearch.tsx` +
  `app/api/geocode/route.ts`) — debounced search against OpenStreetMap
  Nominatim, proxied through our own API route rather than called directly
  from the browser (Nominatim's usage policy expects a proper User-Agent,
  which browser `fetch` can't set — Node can).
- **Form restructured to reduce drop-off** — 4 shorter steps instead of 3
  denser ones: locality search first (fast, satisfying), property details
  second, the map pin isolated as an explicitly optional/skippable step,
  and email asked for last (asking for email too early is one of the
  biggest levers in form abandonment).

## An honest testing note

I built and ran real, functional tests before handing this off:

- **`/api/submit`**: fully tested end-to-end — started the server, POSTed a
  real submission, confirmed it landed in `data/submissions.json`, then
  wiped the test data.
- **`/api/geocode`**: the code is correct and will work the moment you run
  this outside of my sandbox (Vercel and your own machine have normal
  internet access) — but I could not personally verify it end-to-end,
  because *this development sandbox's own network allowlist* blocks
  `nominatim.openstreetmap.org` (confirmed via a direct curl test, which
  returned `403 Host not in allowlist`). That's a restriction on my tooling,
  not a problem with your code or Nominatim itself. First thing to check
  once you run `npm run dev`: type a locality on `/submit` and confirm
  results appear. If they don't, check your terminal — the route now logs
  Nominatim's actual response on failure.

## Project structure

```
app/
  layout.tsx, globals.css
  page.tsx                     Home
  sample-report/page.tsx
  how-we-make-money/page.tsx
  submit/page.tsx
  api/submit/route.ts          Persists submissions to data/submissions.json
  api/geocode/route.ts         Proxies Nominatim locality search

components/
  Logo.tsx                     Brand mark (medallion monogram)
  VerdictStamp.tsx              Report/status indicator (micro/large/hero/outline states)
  ReportPreviewCard.tsx         Hero visual — a compact mockup of a real report
  LocalitySearch.tsx            Debounced search input, calls /api/geocode
  LocationPicker.tsx             Leaflet map, draggable pin, no API key needed
  Header.tsx / Footer.tsx / SectionLabel.tsx

lib/content.ts                 Sample report data — swap for real report data later

tailwind.config.ts             All design tokens — change a color/shadow here, it updates everywhere
```

## What's NOT built yet

- How It Works, Pricing, About/Methodology/Team, FAQ, Legal pages,
  Insights/Blog, and the post-submission Report Status page — same pattern
  as what exists: new folder under `app/`, a `page.tsx`, reuse
  `Header`/`Footer`/`SectionLabel`.
- **Email notifications.** `/api/submit` logs new submissions to the server
  console with a `TODO` marking exactly where to add Resend/SendGrid/a
  Slack webhook — needs an API key you provide.
- No auth, no dashboard — intentionally deferred to Phase 2.

## Known items

- Next.js pinned to `14.2.35` (latest patched 14.x — an earlier vulnerable
  version was caught and fixed during this build). Remaining `npm audit`
  advisories relate to features not used here (image remote patterns,
  custom middleware, WebSocket upgrades) — revisit before adding those.
- Nominatim's public usage policy asks for reasonable rate limits on
  production traffic — fine for an MVP's volume, but if this gets real
  traffic, consider a paid geocoding provider (Google Places, Mapbox) as a
  drop-in replacement for the fetch inside `api/geocode/route.ts`.

## Deploy

Push to GitHub, import into Vercel — zero config needed for this project
as it stands.
