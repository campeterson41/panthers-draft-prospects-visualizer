import { useMemo } from 'react';
import { ROUND_ORDER, POSITION_COLORS } from '../data/meetings';
import styles from './ByRound.module.css';

export default function ByRound({ prospects, onPlayerClick }) {
  const grouped = useMemo(() => {
    const groups = {};
    prospects.forEach(p => {
      const key = p.projected || 'Unknown';
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });
    Object.values(groups).forEach(arr =>
      arr.sort((a, b) => (a.consensusMid || 999) - (b.consensusMid || 999))
    );
    return ROUND_ORDER
      .filter(r => groups[r]?.length > 0)
      .map(r => ({ round: r, prospects: groups[r] }));
  }, [prospects]);

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>By Projected Round</h2>
      <div className={styles.rounds}>
        {grouped.map(g => (
          <div key={g.round} className={styles.round}>
            <div className={styles.roundHeader}>
              <span className={styles.roundName}>{g.round}</span>
              <span className={styles.roundCount}>{g.prospects.length}</span>
            </div>
            <div className={styles.tiles}>
              {g.prospects.map(p => (
                <div key={p.id} className={`${styles.tile} ${p.isTop30 ? styles.top30 : ''}`}>
                  <span className={styles.posPill} style={{ background: POSITION_COLORS[p.position] }}>
                    {p.position}
                  </span>
                  <div className={styles.tileInfo}>
                    <span className={styles.tileName} onClick={() => onPlayerClick?.(p.name)} style={{ cursor: 'pointer' }}>{p.name}</span>
                    <span className={styles.tileMeta}>
                      {p.metAt}
                      {p.consensusMid && <> · #{p.consensusMid}</>}
                    </span>
                  </div>
                  {p.isTop30 && <span className={styles.t30}>T30</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
