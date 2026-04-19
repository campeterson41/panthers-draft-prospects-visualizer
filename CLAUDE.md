# Panthers Draft Prospects Visualizer — Project Context

A single-page React app that turns the Carolina Panthers' pre-draft interactions (Top 30 visits, Combine interviews, Pro Days, all-star games, virtual meetings, local visits) into a scouting-signal map for the 2026 NFL Draft, with 2025 available as a comparison year.

## Why it exists

The Panthers hold **pick #19** in the 2026 draft, plus picks 51, 83, 119, 158, 159, and 200. GM **Dan Morgan** has publicly committed to a "best player available" (BPA) approach but has strong documented preferences for length, power, and character fit. Canales wants immediate-impact players — "I don't really believe in drafting for depth."

The visualizer answers three questions:

1. **Where is Panthers scouting effort concentrated?** (which positions, which individual prospects have multiple touches, which got the rare Top 30 invite)
2. **Which prospects satisfy the combination of signal + board rank + physical prototype?** These are the most likely real targets at each pick.
3. **How does the visit board align with documented roster needs?** (S, TE, WR are top-tier needs — does the meeting activity match?)

## Stack

- **Vite 8** + **React 19** (no TypeScript — `.jsx` with CSS Modules)
- **No backend, no API calls** — all data is static JSON/JS files bundled at build time
- **No charting library** — all charts are hand-rolled SVG (scatter, radar, bar, stacked bar, H×W plot)
- `package.json` scripts: `dev`, `build`, `lint`, `preview`

## Top-level layout

```
panthers-draft-prospects-visualizer/
├── index.html              # Vite entry
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/                 # favicon, icons
├── src/
│   ├── main.jsx            # React root
│   ├── App.jsx             # Tab switcher + shared state
│   ├── App.module.css
│   ├── index.css           # CSS custom properties (colors, radius) + reset
│   ├── components/         # 13 view components, each with its own .module.css
│   └── data/
│       ├── meetings.js     # ~150 prospects/year, meeting types, board ranks
│       ├── players.json    # 478 ranked prospects (consensus big board)
│       ├── beastProfiles.json  # 408 Dane Brugler-style profiles
│       ├── draftIntel.js   # Morgan/Canales quotes, archetypes, needs, mocks, media
│       ├── playerLookup.js # Slug-based join: meeting name → player → profile
│       └── prospectUtils.js # Physical fit + combined score helpers
└── docs/                   # This context set
```

## Key files to read first

- [`src/App.jsx`](src/App.jsx) — tab structure, shared state (active tab, position filter, year, selected prospect modal)
- [`src/data/meetings.js`](src/data/meetings.js) — raw meeting data + `processRaw()` pipeline + meeting-type weights for `computeInterestScore`
- [`src/data/draftIntel.js`](src/data/draftIntel.js) — domain knowledge: GM quotes, position archetypes with size thresholds, roster needs, mock consensus
- [`src/data/prospectUtils.js`](src/data/prospectUtils.js) — `computePhysicalFit` and `computeCombinedScore` (the "Signal + Fit Score" on the scatter plot)

Then see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md), [`docs/PANTHERS_CONTEXT.md`](docs/PANTHERS_CONTEXT.md), and [`docs/COMPONENTS.md`](docs/COMPONENTS.md).

## Conventions

- **Position codes** in meeting data and archetypes use: `QB, RB, WR, TE, OL, DI, EDGE, LB, CB, S, K, P`. `players.json` uses finer-grained codes (`OT, IOL, DT`) which `PlayerProfile` normalizes via `POS_MAP` before looking up the archetype.
- **Team colors** are "Panthers blue" (`#0085CA`, `--accent`) and gold (`#b8860b`, `--gold`). See [`src/index.css`](src/index.css) for the full token list.
- **CSS Modules** per component. No Tailwind, no CSS-in-JS.
- **No state management library** — props + local `useState` only. The selected prospect modal lives at the App level and is opened by any component via an `onPlayerClick(name)` callback.
- **Name matching** is slug-based with suffix-stripping fallback ([`playerLookup.js`](src/data/playerLookup.js)). Not every meeting-data prospect will have a matching profile — `PlayerProfile` has a graceful "No draft profile available" state.

## The two score formulas

1. **Interest Score** (`computeInterestScore` in `meetings.js`) — weighted sum of meeting types, capped at 2.0. `Top 30 = 1.0`, `Local Visit = 1.0`, `Combine = 0.7`, `Pro Day = 0.6`, `Senior Bowl = 0.5`, others lower.
2. **Combined Score** (`computeCombinedScore` in `prospectUtils.js`) — Interest Score × fit multiplier (`prototype 1.25`, `partial 1.1`, `outlier 0.9`, `nodata 1.0`), capped at 2.0. This is the Y-axis of the Signal tab's main scatter.

Prototype fit is determined by checking the prospect's measurables (height, weight, arm length) against `draftIntel.positionArchetypes[pos].sizeThresholds`. All three pass = `prototype`; some pass = `partial`; none pass = `outlier`; missing data = `nodata`.

## Status

Pre-draft tool, actively updated as visit info leaks. Data is hand-curated by Cam. The 2026 draft is April 23–25, 2026.
