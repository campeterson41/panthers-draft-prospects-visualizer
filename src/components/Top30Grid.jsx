import { useMemo } from 'react';
import { POSITION_COLORS, getPositions } from '../data/meetings';
import styles from './Top30Grid.module.css';

export default function Top30Grid({ prospects, onPlayerClick }) {
  const top30 = useMemo(() => prospects.filter(p => p.isTop30), [prospects]);

  const grouped = useMemo(() => {
    const groups = {};
    top30.forEach(p => {
      if (!groups[p.position]) groups[p.position] = [];
      groups[p.position].push(p);
    });
    Object.values(groups).forEach(arr =>
      arr.sort((a, b) => (a.consensusMid || 999) - (b.consensusMid || 999))
    );
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [top30]);

  if (top30.length === 0) return null;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        Top 30 Visits
        <span className={styles.count}>{top30.length} prospects</span>
      </h2>
      <div className={styles.grid}>
        {grouped.map(([position, players]) => (
          <div key={position} className={styles.group}>
            <div className={styles.groupHeader}>
              <span className={styles.posDot} style={{ background: POSITION_COLORS[position] }} />
              <span className={styles.posLabel}>{position}</span>
              <span className={styles.posCount}>{players.length}</span>
            </div>
            <div className={styles.tiles}>
              {players.map(p => (
                <div key={p.id} className={`${styles.tile} ${p.isMultiTouch ? styles.multiTouch : ''}`}>
                  <div className={styles.tileName} onClick={() => onPlayerClick?.(p.name)} style={{ cursor: 'pointer' }}>{p.name}</div>
                  <div className={styles.tileMeta}>
                    {p.consensusMid ? `#${p.consensusMid}` : '—'}
                    {p.projected && <span className={styles.tileProj}>{p.projected}</span>}
                  </div>
                  {p.isMultiTouch && (
                    <span className={styles.mtBadge} title={`${p.touchCount} meetings: ${p.metAt}`}>
                      {p.touchCount}x
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
