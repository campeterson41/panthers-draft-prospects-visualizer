import { useState } from 'react';
import { draftIntel } from '../data/draftIntel';
import { POSITION_COLORS } from '../data/meetings';
import styles from './IntelTab.module.css';

const SECTIONS = [
  { id: 'mocks', label: 'Mock Consensus' },
  { id: 'media', label: 'Media Intel' },
  { id: 'needs', label: 'Roster Needs' },
  { id: 'philosophy', label: 'GM Philosophy' },
  { id: 'archetypes', label: 'Roster Archetypes' },
  { id: 'draft2025', label: '2025 Draft Results' },
];

export default function IntelTab() {
  const [section, setSection] = useState('mocks');

  return (
    <div className={styles.section}>
      <div className={styles.subTabs}>
        {SECTIONS.map(s => (
          <button key={s.id}
            className={`${styles.subTab} ${section === s.id ? styles.subTabActive : ''}`}
            onClick={() => setSection(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {section === 'mocks' && <MocksView />}
        {section === 'media' && <MediaIntelView />}
        {section === 'needs' && <NeedsView />}
        {section === 'philosophy' && <PhilosophyView />}
        {section === 'archetypes' && <ArchetypesView />}
        {section === 'draft2025' && <Draft2025View />}
      </div>
    </div>
  );
}

function MocksView() {
  const [expanded, setExpanded] = useState(null);
  const total = draftIntel.mockConsensus.reduce((s, m) => s + m.mockCount, 0);

  return (
    <div>
      <h2 className={styles.viewTitle}>Mock Draft Consensus — Pick #19</h2>
      <p className={styles.viewSubtitle}>
        {total} total mock projections tracked. Click any row to see which analysts picked that player and why.
      </p>
      <div className={styles.mockList}>
        {draftIntel.mockConsensus.map((m, i) => (
          <div key={i} className={`${styles.mockRow} ${expanded === i ? styles.mockRowExpanded : ''}`}>
            <div className={styles.mockRowHeader} onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className={styles.mockLeft}>
                <span className={styles.mockCount}>{m.mockCount}</span>
                <span className={styles.mockCountLabel}>mock{m.mockCount !== 1 ? 's' : ''}</span>
              </div>
              <div className={styles.mockInfo}>
                <div className={styles.mockName}>
                  <span className={styles.posPill} style={{ background: POSITION_COLORS[m.position] || '#9ca3af' }}>{m.position}</span>
                  {m.player}
                </div>
                <span className={styles.mockSchool}>{m.school}</span>
                <p className={styles.mockNotes}>{m.notes}</p>
              </div>
              <button className={styles.expandBtn} aria-label={expanded === i ? 'Collapse' : 'Expand'}>
                {expanded === i ? '▲' : '▼'} Sources
              </button>
            </div>

            {expanded === i && (
              <div className={styles.sourcesTable}>
                <div className={styles.sourcesHeader}>
                  <span>Source</span>
                  <span>Outlet</span>
                  <span>Date</span>
                  <span>Note</span>
                </div>
                {m.sources.map((src, j) => (
                  <div key={j} className={`${styles.sourceRow} ${src.type === 'beat' ? styles.sourceRowBeat : ''}`}>
                    <span className={styles.sourceAnalyst}>
                      {src.analyst}
                      {src.type === 'beat' && <span className={styles.beatBadge}>BEAT</span>}
                    </span>
                    <span className={styles.sourceOutlet}>{src.outlet}</span>
                    <span className={styles.sourceDate}>{src.date}</span>
                    <span className={styles.sourceNote}>{src.note}</span>
                  </div>
                ))}
                {!m.sources.some(s => s.type === 'beat') && (
                  <p className={styles.noBeatNote}>No Panthers beat reporter has confirmed this player as a target.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MediaIntelView() {
  const TAG_COLORS = {
    'Pick 19': '#0085CA',
    'TE': '#e67e22',
    'S': '#ff9800',
    'BPA': '#2ecc71',
    'OL': '#9b59b6',
    'QB': '#e74c3c',
    'WR': '#3498db',
    'EDGE': '#e91e63',
    'CB': '#00bcd4',
  };

  return (
    <div>
      <h2 className={styles.viewTitle}>Media Intelligence</h2>
      <p className={styles.viewSubtitle}>
        Attributed quotes from reporters and analysts. Source, outlet, and date shown for every claim.
      </p>
      <div className={styles.mediaList}>
        {draftIntel.mediaIntel.map((item, i) => (
          <div key={i} className={styles.mediaCard}>
            <p className={styles.mediaQuote}>"{item.quote}"</p>
            <div className={styles.mediaMeta}>
              <span className={styles.mediaSource}>
                <strong>{item.source}</strong>, {item.outlet}
              </span>
              <span className={styles.mediaDate}>{item.date}</span>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.mediaLink}>
                  Source →
                </a>
              )}
              <span
                className={styles.mediaTag}
                style={{ background: (TAG_COLORS[item.tag] || '#9ca3af') + '20', color: TAG_COLORS[item.tag] || '#6b7280' }}
              >{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NeedsView() {
  return (
    <div>
      <h2 className={styles.viewTitle}>2026 Roster Needs</h2>
      <p className={styles.viewSubtitle}>Need level 1–10 based on current roster depth and contract status.</p>
      <div className={styles.needsList}>
        {draftIntel.draftNeeds.map(n => (
          <div key={n.position} className={styles.needRow}>
            <div className={styles.needLeft}>
              <span className={styles.needPos} style={{ background: POSITION_COLORS[n.position] }}>{n.position}</span>
              <span className={styles.needTier}>Tier {n.tier}</span>
            </div>
            <div className={styles.needBar}>
              <div className={styles.needFill} style={{ width: `${(n.level / 10) * 100}%` }} />
            </div>
            <span className={styles.needLevel}>{n.level}</span>
            <p className={styles.needReason}>{n.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhilosophyView() {
  return (
    <div>
      <h2 className={styles.viewTitle}>Draft Philosophy — Direct Quotes</h2>
      <p className={styles.viewSubtitle}>Exact quotes only. No paraphrasing or interpretation.</p>

      <div className={styles.valuesGrid}>
        {draftIntel.coreValues.map((v, i) => (
          <div key={i} className={styles.valueCard}>
            <h4 className={styles.valueTrait}>{v.trait}</h4>
            <p className={styles.valueDesc}>{v.description}</p>
          </div>
        ))}
      </div>

      <h3 className={styles.subHeading}>Dan Morgan</h3>
      <div className={styles.quotesList}>
        {draftIntel.gmQuotes.map((q, i) => (
          <div key={i} className={styles.quoteCard}>
            <p className={styles.quoteText}>"{q.quote}"</p>
            <div className={styles.quoteMeta}>
              <span className={styles.quoteContext}>{q.context}</span>
              <span className={styles.quoteTag}>{q.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <h3 className={styles.subHeading}>Dave Canales</h3>
      <div className={styles.quotesList}>
        {draftIntel.canalesQuotes.map((q, i) => (
          <div key={i} className={styles.quoteCard}>
            <p className={styles.quoteText}>"{q.quote}"</p>
            <div className={styles.quoteMeta}>
              <span className={styles.quoteContext}>{q.context}</span>
              <span className={styles.quoteTag}>{q.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchetypesView() {
  const positions = Object.entries(draftIntel.positionArchetypes);
  return (
    <div>
      <h2 className={styles.viewTitle}>Roster Archetypes — What They Look For</h2>
      <div className={styles.archetypeList}>
        {positions.map(([pos, data]) => (
          <div key={pos} className={styles.archetypeCard}>
            <div className={styles.arcHeader}>
              <span className={styles.arcPos} style={{ background: POSITION_COLORS[pos] }}>{pos}</span>
              <span className={styles.arcSize}>{data.idealSize}</span>
            </div>
            <p className={styles.arcType}>{data.rosterType}</p>
            <div className={styles.arcTraits}>
              {data.keyTraits.map((t, i) => (
                <span key={i} className={styles.arcTrait}>{t}</span>
              ))}
            </div>
            <div className={styles.arcRoster}>
              <span className={styles.arcRosterLabel}>Current roster:</span>
              {data.currentRoster.map((p, i) => (
                <div key={i} className={styles.arcPlayer}>
                  <span className={styles.arcPlayerName}>{p.name}</span>
                  <span className={styles.arcPlayerSize}>{p.size}</span>
                  <span className={styles.arcPlayerRole}>{p.role}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Draft2025View() {
  return (
    <div>
      <h2 className={styles.viewTitle}>2025 Draft Results</h2>
      <p className={styles.viewSubtitle}>Morgan's first draft class as Panthers GM.</p>
      <div className={styles.draftList}>
        {draftIntel.draft2025Results.map((d, i) => (
          <div key={i} className={styles.draftRow}>
            <div className={styles.draftPick}>
              <span className={styles.draftRound}>R{d.round}</span>
              <span className={styles.draftPickNum}>#{d.pick}</span>
            </div>
            <span className={styles.posPill} style={{ background: POSITION_COLORS[d.position] }}>{d.position}</span>
            <div className={styles.draftInfo}>
              <span className={styles.draftName}>{d.name}</span>
              <span className={styles.draftSchool}>{d.school}</span>
            </div>
            <p className={styles.draftInsight}>{d.insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
