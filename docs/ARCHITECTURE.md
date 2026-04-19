# Architecture

## One-sentence summary

A client-only React SPA that joins three static datasets (Panthers meetings, consensus big board, combine profiles) on a slugified player name, runs each prospect through a scoring pipeline, and renders ~9 tabbed views with hand-rolled SVG charts.

## Runtime shape

There is no server. `vite build` produces static assets; the app runs entirely in the browser. No fetches, no auth, no persistence — state lives in React `useState` for the current session only.

```
┌─────────────────────── App.jsx ───────────────────────┐
│  state: activeTab, filterPosition, year, selected     │
│                                                       │
│  ┌── Header ──┐  year toggle, filter pills, stat row  │
│  │            │                                       │
│  ├── Tabs ────┤  9 tabs (Signal, Prototypes, …)       │
│  │            │                                       │
│  │  <one tab component renders here>                  │
│  │                                                    │
│  └── PlayerProfile (modal, global) ──┘                │
└───────────────────────────────────────────────────────┘
```

## Data flow

```
  src/data/meetings.js                  src/data/players.json
  ┌─────────────────────┐               ┌────────────────────┐
  │ RAW_2026 / RAW_2025 │               │ 478 ranked players │
  │ (name, position,    │               │ (id, rank, mock    │
  │  metAt, projected,  │               │  range, tags…)     │
  │  consensus low/high)│               └────────┬───────────┘
  └──────────┬──────────┘                        │
             │                                   │
             │ processRaw() adds:                │  src/data/beastProfiles.json
             │  - meetingTypes[]                 │  ┌──────────────────────────┐
             │  - touchCount, isTop30,           │  │ 408 profiles with        │
             │    isMultiTouch                   │  │ measurables, percentiles,│
             │  - consensusMid, projectedRound   │  │ strengths/weaknesses,    │
             ▼                                   │  │ seasonStats, callouts    │
  allProspects = { 2026: [...], 2025: [...] }   │  └───────────┬──────────────┘
                                                │              │
                                                └────┬─────────┘
                                                     │
                                                     ▼
                                         src/data/playerLookup.js
                                         findPlayer(name) → { player, profile }
                                         (slugify → exact → suffix-strip → fuzzy)
                                                     │
                                                     ▼
                                         src/data/prospectUtils.js
                                         computePhysicalFit(prospect)
                                         → checks measurables vs.
                                           draftIntel.positionArchetypes[pos]
                                           .sizeThresholds
                                         → fitStatus: prototype|partial|
                                                      outlier|nodata

                                         computeCombinedScore(prospect)
                                         = clamp( interestScore ×
                                                  FIT_MULTIPLIERS[fitStatus], 2.0 )
```

`draftIntel.js` is a fourth dataset consumed by `prospectUtils` (archetypes), `PlayerProfile` (Panthers Fit section), `PrototypesTab` (thresholds + traits), `PositionInvestmentChart` (roster needs), and `IntelTab` (everything).

## Tab architecture

`App.jsx` holds these pieces of state:

| State             | Purpose                                                     |
|-------------------|-------------------------------------------------------------|
| `activeTab`       | Which tab component to mount (string id)                    |
| `filterPosition`  | Optional position filter applied to `prospects` before pass |
| `year`            | `2026` or `2025` — indexes into `allProspects`              |
| `selectedProspect`| Name string; opens `PlayerProfile` modal when truthy        |

Tabs are just conditional renders. `filtered = filterPosition ? prospects.filter(...) : prospects` is memoized and passed to most tabs. The Signal tab uses unfiltered `prospects` because it shows position investment as a chart. Clicking a position row on the Signal tab or a header pill jumps to the By Position tab.

Any component that wants to open the player modal calls `onPlayerClick(name)` — this prop is threaded through every list/card/dot.

## Rendering approach

- **SVG charts are hand-rolled.** No Recharts, D3, Chart.js. Each chart owns its viewBox, scales, ticks, and tooltip logic. This keeps the bundle small and the styling 100% controlled by CSS Modules, but it means adding a new chart type is a larger effort than in a charting-lib-based codebase.
- **Tooltips** on the main scatter are HTML overlays positioned by percentage of the SVG viewBox, so they inherit regular CSS styling (text wrap, buttons, expanders). See `DotTooltip` in `ScatterPlot.jsx`.
- **No animations / transitions** beyond simple CSS hover states.
- **Responsive?** Limited. `#root` is `max-width: 1200px`; most charts use fixed viewBox and scale via `width: 100%`.

## Module boundaries

- `src/data/*` — pure data and derivation functions. No JSX.
- `src/components/*` — each view is self-contained (component + CSS module). They only depend on `src/data/*` and `POSITION_COLORS`.
- `App.jsx` — orchestration only; no business logic.

## Known edge cases

- **Missing board rank** (`consensusMid === null`) — filtered out of the scatter plot; rendered as `—` in tables.
- **Missing measurables** — fit is reported as `nodata` and the prospect is drawn in gray on the Prototypes scatter.
- **UDFA-projected** prospects are hidden from the Signal tab scatter by default (toggle available). They still appear in By Round under the `UDFA` header.
- **Position mismatch between datasets** — `players.json` uses `OT/IOL/DT`; meetings + archetypes use `OL/DI`. `PlayerProfile.jsx` owns the `POS_MAP` normalization.
- **Names with non-ASCII, suffixes, punctuation** — `playerLookup.slugify()` strips `'`, `.`, and non-alphanumerics before matching; the fallback strips trailing `-jr/-sr/-ii/-iii/-iv/-v`.

## Build / run

```bash
npm install
npm run dev       # vite dev server (default port 5173)
npm run build     # static build to dist/
npm run preview   # serve the built bundle
npm run lint      # eslint
```

Deploying is a static-host drop — any bucket or CDN will do. Nothing to provision.
