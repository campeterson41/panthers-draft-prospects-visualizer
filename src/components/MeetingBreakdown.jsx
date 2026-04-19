import { useMemo } from 'react';
import { MEETING_TYPES_ORDERED, POSITION_COLORS } from '../data/meetings';
import styles from './MeetingBreakdown.module.css';

export default function MeetingBreakdown({ prospects, onPlayerClick }) {
  const grouped = useMemo(() => {
    const groups = {};
    prospects.forEach(p => {
      p.meetingTypes.forEach(mt => {
        if (!groups[mt]) groups[mt] = [];
        groups[mt].push(p);
      });
    });
    return MEETING_TYPES_ORDERED
      .filter(mt => groups[mt]?.length > 0)
      .map(mt => ({
        type: mt,
        prospects: groups[mt].sort((a, b) => (a.consensusMid || 999) - (b.consensusMid || 999)),
      }));
  }, [prospects]);

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>By Meeting Type</h2>
      <div className={styles.groups}>
        {grouped.map(g => (
          <div key={g.type} className={styles.group}>
            <div className={styles.groupHeader}>
              <span className={styles.typeName}>{g.type}</span>
              <span className={styles.typeCount}>{g.prospects.length}</span>
            </div>
            <div className={styles.list}>
              {g.prospects.map(p => (
                <div key={p.id} className={styles.row}>
                  <span className={styles.posPill} style={{ background: POSITION_COLORS[p.position] }}>
                    {p.position}
                  </span>
                  <span className={styles.name} onClick={() => onPlayerClick?.(p.name)} style={{ cursor: 'pointer' }}>{p.name}</span>
                  {p.isMultiTouch && <span className={styles.mtBadge} title={p.metAt}>+{p.touchCount - 1}</span>}
                  <span className={styles.proj}>{p.projected || '—'}</span>
                  {p.consensusMid && <span className={styles.rank}>#{p.consensusMid}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
