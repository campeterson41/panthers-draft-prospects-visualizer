import { POSITION_COLORS } from '../data/meetings';
import styles from './MultiTouch.module.css';

export default function MultiTouch({ prospects, onPlayerClick }) {
  const multi = prospects.filter(p => p.isMultiTouch)
    .sort((a, b) => b.touchCount - a.touchCount || (a.consensusMid || 999) - (b.consensusMid || 999));

  if (multi.length === 0) return <p className={styles.empty}>No multi-touch prospects for this filter.</p>;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        Met Multiple Times
        <span className={styles.count}>{multi.length}</span>
      </h2>
      <div className={styles.cards}>
        {multi.map(p => (
          <div key={p.id} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.posPill} style={{ background: POSITION_COLORS[p.position] }}>
                {p.position}
              </span>
              <span className={styles.touches}>{p.touchCount} meetings</span>
            </div>
            <div className={styles.name} onClick={() => onPlayerClick?.(p.name)} style={{ cursor: 'pointer' }}>{p.name}</div>
            <div className={styles.meetingList}>
              {p.meetingTypes.map((mt, i) => (
                <span key={i} className={`${styles.meetingTag} ${mt === 'Top 30' ? styles.top30Tag : ''}`}>
                  {mt}
                </span>
              ))}
            </div>
            <div className={styles.meta}>
              {p.projected && <span>{p.projected}</span>}
              {p.consensusMid && <span className={styles.rank}>Board: #{p.consensusMid}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
