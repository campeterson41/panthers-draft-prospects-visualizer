# Components

Every component lives in `src/components/`, paired with a `.module.css`. All props are plain values — no context, no Redux, no router. The global "open player profile" pattern is a single `onPlayerClick(name)` callback threaded through from `App.jsx`.

## The 9 tabs

Tabs are defined in `App.jsx`:

```js
const TABS = [
  { id: 'signal',      label: 'Signal' },
  { id: 'prototypes',  label: 'Prototypes' },
  { id: 'position',    label: 'By Position' },
  { id: 'top30',       label: 'Top 30 Visits' },
  { id: 'multitouch',  label: 'Multi-Touch' },
  { id: 'byMeeting',   label: 'By Meeting' },
  { id: 'byRound',     label: 'By Round' },
  { id: 'all',         label: 'All Prospects' },
  { id: 'intel',       label: 'Draft Intel' },
];
```

### 1. Signal — the flagship view
[`ScatterPlot.jsx`](../src/components/ScatterPlot.jsx) + [`PositionInvestmentChart.jsx`](../src/components/PositionInvestmentChart.jsx)

Left: scatter of **board rank (x)** × **combined Signal + Fit score (y)**.
- Dot color = position
- Dot size = touch count
- Brighter fill = Top 30 or multi-touch
- Green ring = prototype fit
- Gold dashed verticals = Panthers pick slots (19, 51, 83, 119, 158, 159, 200)
- UDFA-projected prospects hidden by default (toggle)
- Hover opens a rich tooltip with a collapsible "Signals" list and a **View Profile →** button

Right: position investment table. Each row = position, with a horizontal bar showing total meetings (light blue) with a Top 30 highlight (darker blue). The far-right column shows roster need tier + level bar. Click a row to filter the whole app by that position.

### 2. Prototypes
[`PrototypesTab.jsx`](../src/components/PrototypesTab.jsx)

Two sub-views:
- **Overview** — stacked horizontal bar per position showing proportion of prospects who are Prototype / Partial / Outlier / No-data against the archetype thresholds.
- **Position drill-down** — for each of OL, EDGE, DI, LB, CB, S, WR, TE:
  - Left card: "What They Want" (thresholds + key traits) with a summary of fit counts.
  - Right: H×W scatter with the ideal zone shaded, threshold lines dashed, and an Arm Length bar chart below it when `armLengthMin` is set (EDGE, CB).
  - Bottom: grid of player fit cards sorted by fit status.

Uses `computePhysicalFit` from `prospectUtils.js`.

### 3. By Position
[`ByPosition.jsx`](../src/components/ByPosition.jsx)

Grid of position cards (QB, WR, OL, …). Each card shows prospect count, Top 30 count, multi-touch count, and a name preview. Clicking a card filters into a detail view with Top 30 visits grouped separately from other meetings.

### 4. Top 30 Visits
[`Top30Grid.jsx`](../src/components/Top30Grid.jsx)

Position-grouped tiles of just the Top 30 prospects, sorted by board rank within each group. Multi-touch players get a `2x`/`3x` badge.

### 5. Multi-Touch
[`MultiTouch.jsx`](../src/components/MultiTouch.jsx)

Card list of prospects with 2+ meetings, sorted by touch count then board rank. Shows every meeting type + projected round + rank.

### 6. By Meeting
[`MeetingBreakdown.jsx`](../src/components/MeetingBreakdown.jsx)

Groups prospects under each meeting type (Top 30, Combine, Pro Day, Senior Bowl, Shrine, American, Hula, Virtual, Local Visit, Local Day, Unofficial). One prospect appears in multiple groups if they attended multiple events.

### 7. By Round
[`ByRound.jsx`](../src/components/ByRound.jsx)

Groups by projected round (1st → UDFA → Unknown). Top 30 prospects are visually highlighted in each group.

### 8. All Prospects
[`ProspectTable.jsx`](../src/components/ProspectTable.jsx)

Sortable table (Name, Pos, Met At, Meetings, Projected, Board Rank). `projected` sorts via `ROUND_ORDER` map. Default sort: board rank ascending.

### 9. Draft Intel
[`IntelTab.jsx`](../src/components/IntelTab.jsx)

Six sub-sections driven entirely by `draftIntel.js`:
- **Mock Consensus** — pick-19 mock rollup with expandable source rows
- **Media Intel** — quote cards from beat and national reporters
- **Roster Needs** — the full `draftNeeds` list with rationale
- **GM Philosophy** — Morgan + Canales quotes grouped by theme
- **Roster Archetypes** — ideal size, key traits, current roster per position
- **2025 Draft Results** — reference table

## Shared / global

### `Header`
[`Header.jsx`](../src/components/Header.jsx) — title, year toggle (2026/2025), three stats (Prospects Met, Top 30, Multi-Touch), and position filter pills. Pills are colored by position. Active pill fills with the position color.

### `PlayerProfile` (modal)
[`PlayerProfile.jsx`](../src/components/PlayerProfile.jsx) — the rich per-player drawer. Mounted once in `App.jsx`, opens when `selectedProspect` is set.

Sections (conditional on data availability):
1. **Header** — posRank badge, name, position, school, grade, height/weight/40/age
2. **Draft Range** — floor / consensus / ceiling slider
3. **Elite Traits** — `profile.callouts`
4. **Production** — `seasonStats.headline`
5. **Athletic Profile** — radar chart + percentile bars (height, weight, 40, vert, broad, 3-cone, shuttle)
6. **Strengths / Weaknesses** — two-column list
7. **Panthers Fit** — archetype check (Height / Weight / Arm length ✓✗—), key traits tags
8. **Scouting Report** — full Brugler summary

Graceful fallback when no profile is found: just shows the name and "No draft profile available."

### `RadarChart`
[`RadarChart.jsx`](../src/components/RadarChart.jsx) — pure SVG radar with 25/50/75/100 grid rings. Requires at least 3 percentile axes. Labels: HEIGHT, WEIGHT, 40-YARD, VERT JUMP, BROAD JUMP, 3-CONE, SHUTTLE.

## Styling tokens

All colors and sizes come from CSS custom properties in `src/index.css`:

```
--bg            #ffffff
--bg-card       #f8f9fa
--text          #1a1a1a
--text-muted    #6b7280
--accent        #0085CA   (Panthers blue)
--gold          #b8860b
--border        #e5e7eb
--radius        6px
```

Position colors are NOT CSS variables — they live in `POSITION_COLORS` in `meetings.js` and are applied inline.

## Patterns

- **`useMemo` for grouped/sorted derivations** so tab switches don't re-compute.
- **No refs to DOM** except `ScatterPlot.wrapRef` (unused, legacy).
- **Click handlers check the callback exists** — `onPlayerClick?.(name)` — because some list views were originally built without the modal.
- **Tooltips unmount on `onMouseLeave`**; no global escape-key handler on the modal (clicks outside and the × close it).

## Where to add new things

| Want to add…                              | Touch…                                                             |
|-------------------------------------------|--------------------------------------------------------------------|
| A new meeting type                        | `MEETING_TYPES_ORDERED` + `INTEREST_WEIGHTS` in `meetings.js`       |
| A new prospect                            | `RAW_2026` or `RAW_2025` in `meetings.js`                          |
| A new archetype (e.g. Nickel CB)          | `draftIntel.positionArchetypes` + map in `PlayerProfile.POS_MAP`   |
| A new Intel sub-section                   | `SECTIONS` + view component in `IntelTab.jsx`                      |
| A new tab                                 | `TABS` array + render branch in `App.jsx`                          |
| A new per-player signal (e.g. school tag) | Extend `processRaw()` in `meetings.js`, consume in tab components  |
| A new score formula                       | `prospectUtils.js` — add next to `computeCombinedScore`            |
| Adjust size thresholds                    | `draftIntel.positionArchetypes[pos].sizeThresholds`                |

## Component dependency summary

```
App
├── Header                            (meetings data, filter state)
├── ScatterPlot                       (computeCombinedScore, POSITION_COLORS)
├── PositionInvestmentChart           (draftIntel.draftNeeds)
├── ByPosition                        (getPositions, POSITION_COLORS)
├── Top30Grid                         (POSITION_COLORS)
├── MultiTouch                        (POSITION_COLORS)
├── MeetingBreakdown                  (MEETING_TYPES_ORDERED, POSITION_COLORS)
├── ByRound                           (ROUND_ORDER, POSITION_COLORS)
├── ProspectTable                     (POSITION_COLORS)
├── PrototypesTab                     (computePhysicalFit, draftIntel, POSITION_COLORS)
├── IntelTab                          (draftIntel — everything)
└── PlayerProfile                     (getPlayerData, draftIntel.positionArchetypes)
    └── RadarChart                    (percentiles object)
```
