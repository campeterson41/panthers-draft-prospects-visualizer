import { useMemo } from 'react';
import { getPositions, POSITION_COLORS } from '../data/meetings';
import styles from './ByPosition.module.css';

export default function ByPosition({ prospects, filterPosition, onFilterChange, onPlayerClick }) {
  const grouped = useMemo(() => {
    const groups = {};
    prospects.forEach(p => {
      if (!groups[p.position]) groups[p.position] = [];
      groups[p.position].push(p);
    });
    Object.values(groups).forEach(arr =>
      arr.sort((a, b) => (a.consensusMid || 999) - (b.consensusMid || 999))
    );
    const positions = getPositions(prospects);
    return positions
      .filter(pos => groups[pos]?.length > 0)
      .map(pos => ({ position: pos, prospects: groups[pos] }));
  }, [prospects]);

  if (filterPosition) {
    const group = grouped.find(g => g.position === filterPosition);
    if (!group) return <p className={styles.empty}>No prospects at this position.</p>;
    const top30 = group.prospects.filter(p => p.isTop30);
    const others = group.prospects.filter(p => !p.isTop30);

    return (
      <div className={styles.section}>
        <div className={styles.detailHeader}>
          <span className={styles.detailDot} style={{ background: POSITION_COLORS[filterPosition] }} />
          <h2 className={styles.detailTitle}>{filterPosition}</h2>
          <span className={styles.detailCount}>{group.prospects.length} prospects met</span>
        </div>

        {top30.length > 0 && (
          <div className={styles.subsection}>
            <h3 className={styles.subTitle}>Top 30 Visits</h3>
            <div className={styles.detailList}>
              {top30.map(p => <ProspectRow key={p.id} prospect={p} onPlayerClick={onPlayerClick} />)}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div className={styles.subsection}>
            <h3 className={styles.subTitle}>Other Meetings</h3>
            <div className={styles.detailList}>
              {others.map(p => <ProspectRow key={p.id} prospect={p} onPlayerClick={onPlayerClick} />)}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.grid}>
        {grouped.map(g => {
          const top30Count = g.prospects.filter(p => p.isTop30).length;
          const multiCount = g.prospects.filter(p => p.isMultiTouch).length;
          return (
            <button key={g.position} className={styles.card} onClick={() => onFilterChange(g.position)}>
              <div className={styles.cardHeader}>
                <span className={styles.posDot} style={{ background: POSITION_COLORS[g.position] }} />
                <span className={styles.posName}>{g.position}</span>
                <span className={styles.posTotal}>{g.prospects.length}</span>
              </div>
              <div className={styles.cardTags}>
                {top30Count > 0 && <span className={styles.tagT30}>{top30Count} Top 30</span>}
                {multiCount > 0 && <span className={styles.tagMT}>{multiCount} multi-touch</span>}
              </div>
              <div className={styles.namePreview}>
                {g.prospects.slice(0, 4).map(p => (
                  <span key={p.id} className={styles.previewName}>
                    {p.name}
                    {p.consensusMid && <span className={styles.previewRank}> #{p.consensusMid}</span>}
                  </span>
                ))}
                {g.prospects.length > 4 && (
                  <span className={styles.previewMore}>+{g.prospects.length - 4} more</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProspectRow({ prospect: p, onPlayerClick }) {
  return (
    <div className={`${styles.row} ${p.isTop30 ? styles.rowTop30 : ''}`}>
      <div className={styles.rowMain}>
        <span className={styles.rowName} onClick={() => onPlayerClick?.(p.name)} style={{ cursor: 'pointer' }}>{p.name}</span>
        {p.isMultiTouch && <span className={styles.rowMT}>{p.touchCount}x</span>}
      </div>
      <div className={styles.rowMeta}>
        <div className={styles.rowMeetings}>
          {p.meetingTypes.map((mt, i) => (
            <span key={i} className={`${styles.meetingTag} ${mt === 'Top 30' ? styles.meetingTagT30 : ''}`}>
              {mt}
            </span>
          ))}
        </div>
        <div className={styles.rowDetails}>
          {p.projected && <span>{p.projected}</span>}
          {p.consensusMid && (
            <span className={styles.rowRank}>
              Board #{p.consensusMid}
              {p.consensusLow !== p.consensusHigh && p.consensusLow && p.consensusHigh && (
                <span className={styles.rowRange}> ({p.consensusLow}–{p.consensusHigh})</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
