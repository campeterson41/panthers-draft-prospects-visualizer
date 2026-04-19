export const draftIntel = {
  gmQuotes: [
    { quote: "We're definitely in the best-player available mindset.", context: "2026 Pre-Draft Presser", tag: "BPA" },
    { quote: "If the best player we feel is that at 19, I wouldn't hesitate to draft another wideout.", context: "2026 Pre-Draft Presser", tag: "BPA" },
    { quote: "If you're going to miss on a guy, you're going to miss because you don't know what he's about from a personal character standpoint.", context: "2026 Pre-Draft Presser", tag: "Character" },
    { quote: "I think if all things are equal, we're always probably going to go for the longer, bigger guy.", context: "On arm length preference", tag: "Measurables" },
    { quote: "I don't think you can have too many really good pass-rushers.", context: "2026 Combine", tag: "EDGE" },
    { quote: "We just want to dominate the line of scrimmage.", context: "2025 Offseason", tag: "Trenches" },
    { quote: "I'm not really into quick fixes. I don't think there's such thing as a quick fix.", context: "2025 Offseason", tag: "Philosophy" },
    { quote: "Having that depth and frontline players that we added gives us flexibility to draft the best available player.", context: "Post-Free Agency 2026", tag: "Strategy" },
    { quote: "Mobility is big in this league.", context: "On quarterback evaluation", tag: "QB" },
  ],

  canalesQuotes: [
    { quote: "At this point, with the 19th pick, we really have an opportunity to bring a player in that can help us immediately.", context: "2026 Pre-Draft", tag: "Impact" },
    { quote: "I don't really believe in drafting for depth or doing things like that.", context: "2026 Pre-Draft", tag: "Philosophy" },
    { quote: "It could be a wideout. It could be a tight end. Could be a safety.", context: "On pick 19 targets", tag: "Pick 19" },
    { quote: "There's a couple of dynamic safeties that could free us up.", context: "On draft targets", tag: "Safety" },
  ],

  coreValues: [
    { trait: "Character / Culture Fit", description: "Walks prospects through entire facility to observe behavior across interactions" },
    { trait: "Arm Length / Physical Length", description: "Seattle influence — longer players 'make the field shrink'" },
    { trait: "Athleticism + Production", description: "Visit board shows preference for elite athletes with strong college production" },
    { trait: "Playmaking / Dog Mentality", description: "Wants 'playmakers with dog mentality' on both sides of the ball" },
    { trait: "Immediate Contributor", description: "Canales: 'I don't really believe in drafting for depth'" },
    { trait: "Versatility", description: "Values positional flexibility and scheme adaptability" },
  ],

  positionArchetypes: {
    WR: {
      idealSize: "6'3\"+, 195-230 lbs",
      keyTraits: ["Size", "Route precision", "Coverage reading", "Contested catches", "Timing within system"],
      sizeThresholds: { minHeightIn: 75, weightMin: 195, weightMax: 235, armLengthMin: null },
      rosterType: "Big-bodied — 3 of top 4 WRs are 6'3\"+",
      currentRoster: [
        { name: "Tetairoa McMillan", size: "6'5\" / 212", role: "WR1/X" },
        { name: "Xavier Legette", size: "6'3\" / 227", role: "WR2" },
        { name: "Jalen Coker", size: "6'3\" / 213", role: "Slot/WR3" },
        { name: "Jimmy Horn Jr.", size: "5'8\" / 174", role: "Speed/Gadget" },
      ],
    },
    TE: {
      idealSize: "6'3\"+, pass-catching ability required",
      keyTraits: ["Pass-catching", "Speed/athleticism", "Blocking", "Red zone threat"],
      sizeThresholds: { minHeightIn: 75, weightMin: 235, armLengthMin: null },
      rosterType: "Currently all blockers — 31st in TE receiving grade. Desperately need pass-catcher.",
      currentRoster: [
        { name: "Tommy Tremble", size: "6'3\" / 240", role: "Blocking TE" },
        { name: "Ja'Tavion Sanders", size: "6'4\" / 245", role: "TE2" },
        { name: "Mitchell Evans", size: "6'5\" / 250", role: "TE3/Blocker" },
      ],
    },
    OL: {
      idealSize: "305-330 lbs, power-oriented",
      keyTraits: ["Size", "Power at POA", "Run blocking", "Pass protection"],
      sizeThresholds: { minHeightIn: 74, weightMin: 300, weightMax: 340, armLengthMin: null },
      rosterType: "Large, mauling linemen averaging ~320 lbs. Only together 20.5% of snaps in 2025.",
      currentRoster: [
        { name: "Ikem Ekwonu", size: "6'4\" / 320", role: "LT (injured — torn patellar tendon)" },
        { name: "Damien Lewis", size: "6'2\" / 327", role: "LG" },
        { name: "Luke Fortner", size: "6'4\" / 307", role: "C (1-yr stopgap)" },
        { name: "Robert Hunt", size: "6'6\" / 323", role: "RG" },
        { name: "Taylor Moton", size: "6'5\" / 325", role: "RT" },
      ],
    },
    EDGE: {
      idealSize: "6'3\"-6'6\", 33\"+ arm length",
      keyTraits: ["Arm length (33\"+)", "Explosion", "Versatility", "Motor", "Pass rush repertoire"],
      sizeThresholds: { minHeightIn: 75, weightMin: 240, armLengthMin: 33.0 },
      rosterType: "Long-armed, tall edge rushers. Morgan explicitly values arm length — Seattle 'Legion of Boom' influence.",
      currentRoster: [
        { name: "Jaelan Phillips", size: "6'5\" / 266", role: "Starter (33.25\" arms)" },
        { name: "Nic Scourton", size: "6'3\" / 257", role: "Starter" },
        { name: "Princely Umanmielen", size: "6'4\" / 244", role: "Rotational (33⅞\" arms)" },
      ],
    },
    CB: {
      idealSize: "6'0\"-6'2\"",
      keyTraits: ["Length", "Zone coverage", "Ball skills", "Tackling"],
      sizeThresholds: { minHeightIn: 72, weightMin: null, armLengthMin: 31.0 },
      rosterType: "Both starters are 6'1\". Seattle model — length in the secondary.",
      currentRoster: [
        { name: "Jaycee Horn", size: "6'1\" / 200", role: "CB1" },
        { name: "Mike Jackson", size: "6'1\" / 210", role: "CB2" },
      ],
    },
    S: {
      idealSize: "5'11\"-6'2\"",
      keyTraits: ["Range", "Ball-hawking", "Run support", "Communication"],
      sizeThresholds: { minHeightIn: 71, weightMin: null, armLengthMin: null },
      rosterType: "Currently run-defending types. NEED rangy centerfield playmaker at FS. Two-high shell demands it.",
      currentRoster: [
        { name: "Tre'von Moehrig", size: "6'2\" / 202", role: "SS (elite run defender)" },
        { name: "Nick Scott", size: "5'11\" / 200", role: "FS (1yr/$2M placeholder)" },
        { name: "Lathan Ransom", size: "6'1\" / 210", role: "Developmental" },
      ],
    },
    DI: {
      idealSize: "6'3\"-6'5\", 275-330 lbs",
      keyTraits: ["Size", "Run defense", "Interior pressure", "Anchor strength"],
      sizeThresholds: { minHeightIn: 75, weightMin: 275, weightMax: 335, armLengthMin: null },
      rosterType: "Large interior presence. Lost A'Shawn Robinson, need depth. Allowed 4.6 YPC (24th).",
      currentRoster: [
        { name: "Derrick Brown", size: "6'5\" / 320", role: "Franchise DT" },
        { name: "Bobby Brown III", size: "6'4\" / 325", role: "NT" },
        { name: "Tershawn Wharton", size: "6'4\" / 273", role: "RDE" },
      ],
    },
    LB: {
      idealSize: "6'0\"-6'3\"",
      keyTraits: ["Motor", "Range", "Pass coverage", "Three-down capability"],
      sizeThresholds: { minHeightIn: 72, weightMin: 225, armLengthMin: null },
      rosterType: "Signed Devin Lloyd (5 INTs) specifically for coverage ability.",
      currentRoster: [
        { name: "Devin Lloyd", size: "6'3\" / 237", role: "ILB (new signing)" },
        { name: "Trevin Wallace", size: "6'2\" / 230", role: "ILB (underperforming)" },
      ],
    },
  },

  draftNeeds: [
    { position: "S", tier: 1, level: 9.2, reason: "Biggest hole. Nick Scott on 1yr/$2M = placeholder. Need rangy FS for two-high shell." },
    { position: "TE", tier: 1, level: 8.8, reason: "31st in TE receiving grade. All TEs are blockers. Canales scheme demands pass-catching TE." },
    { position: "WR", tier: 1, level: 8.0, reason: "Thin behind McMillan and Coker. Need separation ability." },
    { position: "DI", tier: 2, level: 7.2, reason: "Lost A'Shawn Robinson. Morgan says class is 'a little top-heavy but there are guys we like.'" },
    { position: "OL", tier: 2, level: 7.0, reason: "Ekwonu torn patellar tendon. Fortner 1-year stopgap at C." },
    { position: "CB", tier: 2, level: 6.5, reason: "Slot CB underperformed. Need depth behind Horn/Jackson." },
    { position: "EDGE", tier: 3, level: 5.5, reason: "Phillips + Scourton start but only 30 team sacks in 2025 (28th)." },
    { position: "LB", tier: 3, level: 5.0, reason: "Lloyd signed but Wallace underperforming." },
    { position: "QB", tier: 3, level: 4.0, reason: "Signed Pickett. Want dual-threat backup for Taysom Hill-type role." },
    { position: "RB", tier: 3, level: 3.5, reason: "Hubbard is RB1. Etienne as depth. Low priority." },
  ],

  mockConsensus: [
    {
      player: "Kenyon Sadiq", position: "TE", school: "Oregon", mockCount: 6,
      notes: "4.39 forty, 43.5\" vert. Most common R1 mock pick. No confirmed Top 30 visit with Panthers.",
      sources: [
        { analyst: "Daniel Jeremiah", outlet: "NFL.com", date: "Apr 2026", url: null, pick: 19, note: "Best TE athlete in the class", type: "analyst" },
        { analyst: "Mel Kiper Jr.", outlet: "ESPN", date: "Apr 2026", url: null, pick: 19, note: "Panthers address TE need with elite athlete", type: "analyst" },
        { analyst: "Todd McShay", outlet: "ESPN", date: "Apr 2026", url: null, pick: 19, note: "4.39 speed makes him immediate starter", type: "analyst" },
        { analyst: "Chris Trapasso", outlet: "CBS Sports", date: "Apr 2026", url: null, pick: 19, note: "Canales TE scheme fit", type: "analyst" },
        { analyst: "Charlie Campbell", outlet: "WalterFootball.com", date: "Apr 2026", url: null, pick: 19, note: "Best available at a position of need", type: "analyst" },
        { analyst: "Ryan Wilson", outlet: "CBS Sports", date: "Apr 2026", url: null, pick: 19, note: "Carolina fills 31st-ranked TE unit", type: "analyst" },
      ],
    },
    {
      player: "KC Concepcion", position: "WR", school: "Texas A&M", mockCount: 2,
      notes: "Separation and juice. Local Visit to Charlotte confirmed.",
      sources: [
        { analyst: "Joe Person", outlet: "The Athletic", date: "Apr 2026", url: null, pick: 19, note: "Confirmed local visit. Panthers have shown real interest.", type: "beat" },
        { analyst: "Bucky Brooks", outlet: "NFL.com", date: "Apr 2026", url: null, pick: 19, note: "Separation specialist fits Canales timing routes", type: "analyst" },
      ],
    },
    {
      player: "Jordyn Tyson", position: "WR", school: "Arizona State", mockCount: 2,
      notes: "Route-running, versatility. No confirmed Panthers visit.",
      sources: [
        { analyst: "Pete Prisco", outlet: "CBS Sports", date: "Apr 2026", url: null, pick: 19, note: "Top route runner available at 19", type: "analyst" },
        { analyst: "Jordan Reid", outlet: "ESPN", date: "Apr 2026", url: null, pick: 19, note: "WR depth behind McMillan", type: "analyst" },
      ],
    },
    {
      player: "Spencer Fano", position: "OL", school: "Utah", mockCount: 1,
      notes: "Pro Day visit confirmed. Consensus top-15 board rank. Interior/tackle versatility.",
      sources: [
        { analyst: "Aaron Wilson", outlet: "KPRC Houston", date: "Apr 2026", url: null, pick: 19, note: "Confirmed Panthers pre-draft visit", type: "beat" },
        { analyst: "Lance Zierlein", outlet: "NFL.com", date: "Apr 2026", url: null, pick: 19, note: "Plugs hole left by Ekwonu injury", type: "analyst" },
      ],
    },
    {
      player: "Monroe Freeling", position: "OT", school: "Georgia", mockCount: 1,
      notes: "6'7\"/315, 34.75\" arm length. No confirmed Panthers visit.",
      sources: [
        { analyst: "Dane Brugler", outlet: "The Athletic", date: "Apr 2026", url: null, pick: 19, note: "Elite arm length fits Morgan's measurable preference", type: "analyst" },
      ],
    },
    {
      player: "Emmanuel McNeil-Warren", position: "S", school: "Toledo", mockCount: 1,
      notes: "10 forced fumbles, 5 INTs in career. No confirmed Panthers visit.",
      sources: [
        { analyst: "Nate Davis", outlet: "USA Today", date: "Apr 2026", url: null, pick: 19, note: "Rangy FS for Evero two-high shell", type: "analyst" },
      ],
    },
    {
      player: "Keldric Faulk", position: "EDGE", school: "Auburn", mockCount: 1,
      notes: "6'6\"/285 freak athlete. Combine interview confirmed.",
      sources: [
        { analyst: "Trevor Sikkema", outlet: "PFF", date: "Apr 2026", url: null, pick: 19, note: "BPA — best player on board regardless of position", type: "analyst" },
      ],
    },
  ],

  draft2025Results: [
    { round: 1, pick: 8, name: "Tetairoa McMillan", position: "WR", school: "Arizona", insight: "BPA over need. 6'5\". Won AP OROY." },
    { round: 2, pick: 51, name: "Nic Scourton", position: "EDGE", school: "Texas A&M", insight: "Traded UP for conviction pick." },
    { round: 3, pick: 77, name: "Princely Umanmielen", position: "EDGE", school: "Ole Miss", insight: "Traded UP AGAIN. 33⅞\" arms. Double-dipped at EDGE." },
    { round: 4, pick: 114, name: "Trevor Etienne", position: "RB", school: "Georgia", insight: "Value pick for run-game depth." },
    { round: 4, pick: 122, name: "Lathan Ransom", position: "S", school: "Ohio State", insight: "Physical, run-defending safety." },
    { round: 5, pick: 140, name: "Cam Jackson", position: "DT", school: "Florida", insight: "DI depth for 3-4 front." },
    { round: 5, pick: 163, name: "Mitchell Evans", position: "TE", school: "Notre Dame", insight: "Blocking TE — scheme fit." },
    { round: 6, pick: 208, name: "Jimmy Horn Jr.", position: "WR", school: "Colorado", insight: "Speed element (5'8\"/174)." },
  ],

  mediaIntel: [
    {
      quote: "I think Carolina is widely expected to select an offensive weapon with the 19th pick.",
      source: "Joe Person",
      outlet: "The Athletic",
      date: "2026-04-10",
      url: null,
      tag: "Pick 19",
    },
    {
      quote: "The Panthers have shown strong interest in Kenyon Sadiq. His athleticism and the Panthers' need at tight end make for a logical connection.",
      source: "Ian Rapoport",
      outlet: "NFL Network",
      date: "2026-04-08",
      url: null,
      tag: "TE",
    },
    {
      quote: "Carolina has done extensive work on the safety class. They view the position as one where the right player could transform their defense.",
      source: "Tom Pelissero",
      outlet: "NFL Network",
      date: "2026-04-07",
      url: null,
      tag: "S",
    },
    {
      quote: "Dan Morgan told me the Panthers are not going into the draft with a positional mandate. They will take the best player available at 19.",
      source: "Jonathan Jones",
      outlet: "CBS Sports",
      date: "2026-04-09",
      url: null,
      tag: "BPA",
    },
    {
      quote: "Spencer Fano was one of the prospects who visited Carolina for a pre-draft visit, per sources.",
      source: "Aaron Wilson",
      outlet: "KPRC Houston",
      date: "2026-04-05",
      url: null,
      tag: "OL",
    },
    {
      quote: "The Panthers brought in multiple quarterbacks for Top 30 visits. Don't read into it — this is about finding a Taysom Hill–type piece for the offense.",
      source: "Joe Person",
      outlet: "The Athletic",
      date: "2026-04-11",
      url: null,
      tag: "QB",
    },
  ],
};
