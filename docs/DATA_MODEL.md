# Data Model

Four data sources, all static, all bundled at build time. Everything joins on a **slugified player name**.

## 1. `src/data/meetings.js` — Panthers-specific meeting activity

Two hand-maintained arrays (`RAW_2026`, `RAW_2025`) of ~150 prospects/year. Source: news reports, beat writers, prospect tweets, all-star game rosters, combine interview lists.

### Raw row shape
```js
{
  name: "Jermod McCoy",
  position: "CB",                      // QB, RB, WR, TE, OL, DI, EDGE, LB, CB, S, K, P
  metAt: "Top 30",                     // comma-separated list of meeting types
  projected: "1st Round",              // '1st Round' … '7th Round' | 'UDFA' | null
  consensusLow: 6,                     // best big-board rank from any tracked source
  consensusHigh: 20,                   // worst big-board rank (the range)
}
```

### After `processRaw()` each prospect also has
```js
{
  id: "2026-18",                       // year + index, used as React key
  year: 2026,
  meetingTypes: ["Top 30"],            // parsed array
  touchCount: 1,
  isTop30: true,                       // Top 30 appears in meetingTypes
  isMultiTouch: false,                 // touchCount >= 2
  consensusMid: 13,                    // average of low/high (or whichever exists)
  projectedRound: 1,                   // parsed int; UDFA → 8
}
```

### Meeting-type vocabulary (`MEETING_TYPES_ORDERED`)
In display order: `Top 30`, `Combine`, `Pro Day`, `Senior Bowl`, `Shrine Bowl`, `American Bowl`, `Hula Bowl`, `Virtual`, `Local Visit`, `Local Day`, `Unofficial`.

### Interest weights (`INTEREST_WEIGHTS`)
```
Top 30         1.0     (rare, high-intent — capped at 30 per team per cycle)
Local Visit    1.0     (in-facility, unlimited for in-state prospects)
Combine        0.7
Pro Day        0.6
Senior Bowl    0.5
Shrine Bowl    0.4
American Bowl  0.3
Hula Bowl      0.3
Virtual        0.25
Local Day      0.25
Unofficial     0.25
(unknown)      0.1
```
Summed across meeting types, capped at 2.0.

### Exports
- `allProspects` — `{ 2026: [...], 2025: [...] }`
- `YEARS` — `[2026, 2025]`
- `POSITION_COLORS` — position → hex color
- `MEETING_TYPES_ORDERED`, `ROUND_ORDER`
- `getByPosition(prospects)`, `getPositions(prospects)`, `computeInterestScore(prospect)`

## 2. `src/data/players.json` — Consensus big board

**478 entries.** The master ranked board — combines multiple analysts (Daniel Jeremiah, Mel Kiper, Dane Brugler, Lance Zierlein, Chad Reuter, Todd McShay, Bucky Brooks, Jordan Reid, and others) into a consensus.

```json
{
  "id": "fernando-mendoza",                  // slugified name — join key
  "rank": 1,                                 // overall consensus rank
  "name": "Fernando Mendoza",
  "position": "QB",                          // finer-grained: OT, IOL, DT, OG, OC in addition to OL/DI
  "school": "Indiana",
  "consensusScore": 100,                     // 0-100
  "athleticism": 82,                         // 0-100
  "notes": "Heisman Trophy winner…",
  "mockRange": { "floor": 1, "ceiling": 5, "consensus": 2 },
  "tags": ["heisman-winner", "pocket-passer", "scheme-fit:pro-style"]
}
```

Positions present: `QB, RB, WR, TE, OT, IOL, OL, DT, EDGE, LB, CB, S, K, LS, P`.
Note the overlap (`OT/IOL/OL`, `DT/DI`) — the app normalizes via `POS_MAP` in `PlayerProfile.jsx`.

## 3. `src/data/beastProfiles.json` — Brugler-style scouting profiles

**408 entries.** Detailed profiles in the style of Dane Brugler's "The Beast". 389 have a `playerId` linking to `players.json`; 348 have full measurables.

```json
{
  "posRank": "QB1",
  "pos": "QB",                               // CB, DT, EDGE, LB, OC, OG, OT, QB, RB, S, TE, WR
  "nameSchool": "Fernando Mendoza Indiana",
  "grade": "1st round",                      // "1st" .. "7th round" | "2nd-3rd round" | ""
  "height": "6'5\"",                         // display
  "weight": "236",
  "age": "22.56",
  "forty": "",
  "strengths": [ "Tall, good-sized athlete…", … ],
  "weaknesses": [ "Benefited from RPO-heavy offense…", … ],
  "summary": "A one-year starter at Indiana…",
  "playerId": "fernando-mendoza",            // ← join to players.json

  "measurables": {
    "height": "6'4 3/4\"",
    "heightRaw": 6046,                       // NFL combine format: FFII/E (feet-inches-eighths)
    "weight": 236,
    "forty": "4.56",                         // optional
    "tenSplit": "1.57",                      // optional
    "vertJump": 31,
    "broadJump": "10'10\"",
    "broadJumpInches": 130,
    "threeCone": "7.12",
    "shuttle": "4.36",
    "handSize": "9 1/2",
    "armLength": "31 7/8",                   // whole + fraction — parsed in prospectUtils
    "wingspan": "76 3/4"
  },

  "percentiles": {                           // 0-100 at position
    "explosion": 68, "size": 95,
    "speed": 77, "power": 75, "agility": 43, "quickness": 33
  },

  "callouts": [ "3rd fastest 40-yard dash among QBs (4.56s)", … ],

  "ranks": {                                 // rank N of M at position
    "height": { "rank": 3, "total": 19 },
    "size":   { "rank": 2, "total": 19 },
    "speed":  { … }, "explosion": { … },
    "power": { … }, "agility": { … }, "quickness": { … },
    "age":   { "rank": 4, "total": 20 }
  },

  "seasonStats": {                           // position-dependent shape
    "season": "2025", "gp": "16", "gs": "16",
    "type": "passing",
    "comp": "273", "att": "379", "compPct": "72.0%",
    "passYds": "3535", "passTD": "41", "int": "6",
    "headline": "3535 yds, 41 TD, 6 INT (72.0%)"
  }
}
```

Other `seasonStats.type` shapes include rushing (RB/QB), receiving (WR/TE), blocking (OL — with `passProScore`, `runBlkScore`, `sacksAllowed`, `pressuresAllowed`, `snaps`), and defense (`tackles`, `tfl`, `sacks`, `ff`, `pd`). The UI just uses `headline` for now.

### `heightRaw` format
`6046` = 6 ft, 04 in, 6/8 in = 76.75". `parseHeightRaw()` in `prospectUtils.js` decodes it.

### `armLength` parsing
Strings like `"33 1/8"` → 33.125; or plain decimals. `parseArmLength()` handles both.

## 4. `src/data/draftIntel.js` — Domain knowledge

Hand-curated JS object (not JSON — uses template literals and comments). Six sections:

### `gmQuotes` (9) / `canalesQuotes` (4)
`{ quote, context, tag }` — direct quotes from Morgan and Canales tagged by theme (BPA, Character, Measurables, EDGE, Trenches, Philosophy, QB, Pick 19, Safety, Impact, Strategy).

### `coreValues` (6)
`{ trait, description }` — the observed preference patterns: Character/Culture Fit, Arm Length, Athleticism + Production, Playmaking / Dog Mentality, Immediate Contributor, Versatility.

### `positionArchetypes` (8)
For WR, TE, OL, EDGE, CB, S, DI, LB:
```js
{
  idealSize: "6'3\"+, 195-230 lbs",
  keyTraits: [ "Size", "Route precision", … ],
  sizeThresholds: {
    minHeightIn: 75,     // 6'3" = 75 inches
    weightMin: 195,
    weightMax: 235,      // optional upper bound
    armLengthMin: null   // or 33.0 for EDGE
  },
  rosterType: "Big-bodied — 3 of top 4 WRs are 6'3\"+",
  currentRoster: [
    { name: "Tetairoa McMillan", size: "6'5\" / 212", role: "WR1/X" },
    …
  ]
}
```
These thresholds drive `computePhysicalFit` — they are Cam's interpretation of Morgan's documented preferences, not claimed to be internal Panthers data.

### `draftNeeds` (10)
One per position:
```js
{ position: "S", tier: 1, level: 9.2, reason: "Biggest hole. Nick Scott on 1yr/$2M = placeholder…" }
```
Tier 1 = S/TE/WR. Tier 2 = DI/OL/CB. Tier 3 = EDGE/LB/QB/RB. The `level` (0-10) is rendered as a bar on the Signal tab.

### `mockConsensus` (7 for 2026)
Aggregated pick-19 mocks:
```js
{
  player: "Kenyon Sadiq", position: "TE", school: "Oregon",
  mockCount: 6,
  notes: "4.39 forty…",
  sources: [
    { analyst: "Daniel Jeremiah", outlet: "NFL.com",
      date: "Apr 2026", url: null, pick: 19,
      note: "Best TE athlete in the class", type: "analyst" },
    …
  ]
}
```
`type: "beat"` marks beat writers with direct team intel (Joe Person, Aaron Wilson). `type: "analyst"` is national media.

### `draft2025Results` (8)
Reference data — actual 2025 Panthers picks with a short `insight` each. Used in the Draft Intel tab.

### `mediaIntel` (6)
Direct quotes from beat/national reporters:
```js
{ quote, source, outlet, date: "2026-04-10", url: null, tag: "Pick 19" }
```

## Join keys

`slugify(name)` is the lingua franca: lowercase, strip `' '` and `.`, replace spaces with `-`, drop non-alphanumerics. `findPlayer` tries (in order):
1. exact slug match against `players.json`
2. same slug with trailing `-jr/-sr/-ii/-iii/-iv/-v` stripped
3. fuzzy case-insensitive name match

The `playerId` field on beast profiles is already a slug — `getProfile()` maps `playerId → profile` directly.

## Count summary (current)

| Dataset            | Rows | Joined to meetings | Notes                          |
|--------------------|------|--------------------|--------------------------------|
| `meetings` 2026    | ~125 | —                  | hand-curated                   |
| `meetings` 2025    | ~100 | —                  | hand-curated                   |
| `players.json`     | 478  | ~60-70%            | consensus big board            |
| `beastProfiles`    | 408  | ~55-65%            | 389 have playerId              |
| `draftIntel.mocks` | 7    | —                  | pick-19 projections            |
