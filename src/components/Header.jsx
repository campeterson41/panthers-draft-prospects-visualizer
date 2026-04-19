import { getByPosition, getPositions, POSITION_COLORS, YEARS } from '../data/meetings';
import styles from './Header.module.css';

export default function Header({ prospects, filterPosition, onFilterChange, year, onYearChange }) {
  const byPos = getByPosition(prospects);
  const positions = getPositions(prospects);
  const top30Count = prospects.filter(p => p.isTop30).length;
  const multiCount = prospects.filter(p => p.isMultiTouch).length;

  const stats = [
    { label: 'Prospects Met', value: prospects.length },
    { label: 'Top 30 Visits', value: top30Count },
    { label: 'Multi-Touch', value: multiCount },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        <div>
          <h1 className={styles.title}>Panthers Draft Prospects</h1>
          <p className={styles.subtitle}>Pre-Draft Meeting Tracker</p>
        </div>
        <div className={styles.yearToggle}>
          {YEARS.map(y => (
            <button
              key={y}
              className={`${styles.yearBtn} ${year === y ? styles.yearActive : ''}`}
              onClick={() => onYearChange(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stats}>
        {stats.map(s => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterPill} ${!filterPosition ? styles.active : ''}`}
          onClick={() => onFilterChange(null)}
        >
          All
        </button>
        {positions.map(pos => (
          <button
            key={pos}
            className={`${styles.filterPill} ${filterPosition === pos ? styles.active : ''}`}
            style={{
              '--pill-color': POSITION_COLORS[pos],
              ...(filterPosition === pos ? { background: POSITION_COLORS[pos], color: '#fff', borderColor: POSITION_COLORS[pos] } : {}),
            }}
            onClick={() => onFilterChange(filterPosition === pos ? null : pos)}
          >
            {pos}
            <span className={styles.pillCount}>{byPos[pos]?.length}</span>
          </button>
        ))}
      </div>
    </header>
  );
}
