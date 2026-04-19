# Panthers Draft Context — 2026

Domain knowledge that makes the visualizer's scoring and layout make sense. If you're editing the app, this is what the numbers and archetypes are grounded in.

## The picks

Carolina enters the 2026 draft with:

| Round | Pick |
|-------|------|
| 1     | **19** |
| 2     | 51   |
| 3     | 83   |
| 4     | 119  |
| 5     | 158, 159 |
| 6     | 200  |

These are the gold vertical lines on the Signal tab scatter plot (see `PANTHERS_PICKS` in [`ScatterPlot.jsx`](../src/components/ScatterPlot.jsx)).

## Front-office philosophy

**GM: Dan Morgan.** Former Panthers LB, Seattle Seahawks scouting background under John Schneider. His influence shows up as:

- **Length obsession** — prefers longer players at every position. Quote: *"I think if all things are equal, we're always probably going to go for the longer, bigger guy."* This drives the `armLengthMin` thresholds at EDGE (33") and CB (31") in `positionArchetypes`.
- **Best Player Available.** Repeatedly stated publicly. *"We're definitely in the best-player available mindset… if the best player we feel is that at 19, I wouldn't hesitate to draft another wideout."*
- **Trenches first.** *"We just want to dominate the line of scrimmage."* Morgan has said he doesn't think you can have too many pass-rushers.
- **Character / culture fit.** Walks prospects through the entire facility to observe how they interact with everyone. *"If you're going to miss on a guy, you're going to miss because you don't know what he's about from a personal character standpoint."*
- **Not a quick-fix guy.** *"I'm not really into quick fixes."* Favors development.

**Head Coach: Dave Canales.** Shanahan/McVay/Baker Mayfield tree.

- **Immediate impact over depth.** *"I don't really believe in drafting for depth or doing things like that."* Relevant because it suggests pick 19 should be a projected starter, not a developmental flyer.
- **Timing routes + multi-tight-end sets.** Makes TE a scheme-critical position (Panthers finished 31st in TE receiving grade in 2025).
- **Public pick-19 position list** (paraphrased): *"It could be a wideout. It could be a tight end. Could be a safety."*

## Roster needs (as the app ranks them)

See `draftIntel.draftNeeds` — levels are Cam's judgment calls based on publicly known roster state:

| Pos  | Tier | Level | Why                                                                                   |
|------|------|-------|---------------------------------------------------------------------------------------|
| S    | 1    | 9.2   | Nick Scott is a placeholder (1yr/$2M). Need rangy FS for the two-high shell.           |
| TE   | 1    | 8.8   | 31st in TE receiving grade. Roster is all blockers. Canales scheme demands it.         |
| WR   | 1    | 8.0   | Thin behind McMillan + Coker. Need separation ability.                                 |
| DI   | 2    | 7.2   | Lost A'Shawn Robinson. Morgan: class "a little top-heavy but there are guys we like." |
| OL   | 2    | 7.0   | Ekwonu torn patellar tendon. Fortner 1-year stopgap at center.                         |
| CB   | 2    | 6.5   | Slot underperformed. Depth behind Horn/Jackson.                                         |
| EDGE | 3    | 5.5   | Phillips + Scourton start but only 30 team sacks in 2025 (28th).                       |
| LB   | 3    | 5.0   | Lloyd signed; Wallace underperforming.                                                  |
| QB   | 3    | 4.0   | Pickett signed; want Taysom Hill-type dual-threat backup.                              |
| RB   | 3    | 3.5   | Hubbard is RB1, Etienne as depth.                                                      |

Tiers drive rendering in [`PositionInvestmentChart.jsx`](../src/components/PositionInvestmentChart.jsx). The `level` value is the bar width on that chart.

## Position archetypes

The heart of the "Panthers Fit" logic. Each position archetype encodes Cam's interpretation of Morgan's preferences into a checkable threshold.

| Pos  | Min Height | Weight     | Arm  | Key traits                                              |
|------|-----------|------------|------|---------------------------------------------------------|
| WR   | 6'3" (75) | 195–235    | —    | Size, route precision, contested catches, timing       |
| TE   | 6'3" (75) | ≥ 235      | —    | Pass-catching, speed, blocking, red zone               |
| OL   | 6'2" (74) | 300–340    | —    | Power at POA, run blocking, pass pro                   |
| EDGE | 6'3" (75) | ≥ 240      | 33"  | Arm length, explosion, versatility, motor              |
| CB   | 6'0" (72) | —          | 31"  | Length, zone coverage, ball skills                     |
| S    | 5'11" (71)| —          | —    | Range, ball-hawking, run support, comms                |
| DI   | 6'3" (75) | 275–335    | —    | Size, run defense, interior pressure, anchor          |
| LB   | 6'0" (72) | ≥ 225      | —    | Motor, range, coverage, three-down                    |

These values live in `draftIntel.positionArchetypes[pos].sizeThresholds` and are consumed by `computePhysicalFit` in [`prospectUtils.js`](../src/data/prospectUtils.js).

**A prospect is a "prototype" if they meet all tracked measurements** for their position. This is an intentionally strict bar — most fall into `partial`. The 1.25× multiplier on prototype fit (vs. 0.9× on outlier) is what separates Keldric Faulk from the pack on the main scatter plot.

## Current Panthers roster snapshots

Stored in `draftIntel.positionArchetypes[pos].currentRoster` for reference when evaluating fit. Highlights:

- **WR:** McMillan (6'5" 2025 R1 OROY), Legette (6'3"), Coker (6'3"), Horn Jr. (5'8" gadget)
- **TE:** Tremble, Sanders, Evans — all blockers, no reliable pass-catcher
- **OL:** Ekwonu (injured), Lewis, Fortner (1yr), Hunt, Moton — average 320 lbs
- **EDGE:** Phillips (33.25" arms), Scourton, Umanmielen (33⅞" arms)
- **CB:** Horn and Jackson, both 6'1"
- **S:** Moehrig (SS, run-defender), Scott (FS placeholder), Ransom (developmental)
- **DI:** Brown (franchise), Bobby Brown III, Wharton
- **LB:** Lloyd (new), Wallace (underperforming)

## Mock draft consensus (pick 19)

From `draftIntel.mockConsensus`. As of mid-April 2026:

| Player              | Pos  | School     | Mocks | Connection                                     |
|---------------------|------|------------|-------|------------------------------------------------|
| Kenyon Sadiq        | TE   | Oregon     | 6     | No confirmed Top 30 — reported athletic freak  |
| KC Concepcion       | WR   | Texas A&M  | 2     | Confirmed Local Visit to Charlotte             |
| Jordyn Tyson        | WR   | Arizona St.| 2     | No confirmed Panthers visit                    |
| Spencer Fano        | OL   | Utah       | 1     | Confirmed Pro Day visit                        |
| Monroe Freeling     | OT   | Georgia    | 1     | 34.75" arms — fits Morgan measurables          |
| Emmanuel McNeil-Warren | S | Toledo     | 1     | No confirmed Panthers visit                    |
| Keldric Faulk       | EDGE | Auburn     | 1     | Combine interview confirmed; 6'6"/285          |

**The gap the visualizer is designed to reveal:** Sadiq is the consensus mock pick but has no confirmed Panthers-specific signal. Concepcion and Faulk have real visits and check archetype boxes. The combined score surfaces that.

## 2025 draft reference

Panthers picks last year (in `draftIntel.draft2025Results`):

| Rd | # | Name                | Pos  | School        | Notes                                     |
|----|---|---------------------|------|----------------|-------------------------------------------|
| 1  |  8| Tetairoa McMillan   | WR   | Arizona        | BPA. 6'5". Won AP OROY.                   |
| 2  | 51| Nic Scourton        | EDGE | Texas A&M      | Traded UP for conviction pick.            |
| 3  | 77| Princely Umanmielen | EDGE | Ole Miss       | Traded UP AGAIN. 33⅞" arms. Double-dipped.|
| 4  |114| Trevor Etienne      | RB   | Georgia        | Run-game depth value.                     |
| 4  |122| Lathan Ransom       | S    | Ohio State     | Physical, run-defending.                  |
| 5  |140| Cam Jackson         | DT   | Florida        | DI depth for 3-4 front.                   |
| 5  |163| Mitchell Evans      | TE   | Notre Dame     | Blocking TE — scheme fit.                 |
| 6  |208| Jimmy Horn Jr.      | WR   | Colorado       | Speed element (5'8"/174).                 |

Patterns to notice: **Morgan trades up for conviction.** Double-dipped at EDGE. BPA at 8 despite WR being a "need" position was the McMillan pick. Every pick fit the archetype (McMillan 6'5", Scourton/Umanmielen long arms, Ransom physical, Evans blocker).

## Media / beat intel

Current threads from `draftIntel.mediaIntel` (April 2026):

- **Joe Person (The Athletic):** Carolina "widely expected to select an offensive weapon with the 19th pick."
- **Ian Rapoport (NFL Network):** Strong interest in Kenyon Sadiq — "athleticism and TE need make for a logical connection."
- **Tom Pelissero (NFL Network):** Panthers have done "extensive work on the safety class."
- **Jonathan Jones (CBS):** Morgan told him Panthers are "not going into the draft with a positional mandate."
- **Aaron Wilson (KPRC):** Confirms Spencer Fano pre-draft visit.
- **Joe Person:** Multiple QBs brought in for Top 30 — "don't read into it — this is about a Taysom Hill–type piece."

That last item is why a pile of QBs (Jack Strand, Diego Pavia, Behren Morton, Haynes King) show up as Top 30 visits despite QB being a tier-3 need.

## Drafting calendar

- **April 23 – Round 1** (pick 19)
- **April 24 – Rounds 2–3** (picks 51, 83)
- **April 25 – Rounds 4–7** (119, 158, 159, 200)

Data freshness matters most in the 2–3 weeks before — that's when Top 30 / Pro Day visits are reported.
