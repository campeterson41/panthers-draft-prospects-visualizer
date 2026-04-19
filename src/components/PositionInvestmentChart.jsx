import { useMemo } from 'react';
import { POSITION_COLORS } from '../data/meetings';
import { draftIntel } from '../data/draftIntel';
import styles from './PositionInvestmentChart.module.css';

export default function PositionInvestmentChart({ prospects, onPositionClick, activePosition }) {
  const needMap = useMemo(() => {
    const m = {};
    draftIntel.draftNeeds.forEach(n => { m[n.position] = n; });
    return m;
  }, []);

  const rows = useMemo(() => {
    const groups = {};
    prospects.forEach(p => {
      if (!groups[p.position]) groups[p.position] = { total: 0, top30: 0, multiTouch: 0 };
      groups[p.position].total++;
      if (p.isTop30) groups[p.position].top30++;
      if (p.isMultiTouch) groups[p.position].multiTouch++;
    });
    return Object.entries(groups)
      .map(([pos, data]) => ({ pos, ...data }))
      .sort((a, b) => b.total - a.total);
  }, [prospects]);

  const maxTotal = rows[0]?.total || 1;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <span className={styles.headerPos}>POS</span>
        <span className={styles.headerBar}>Meetings (click to drill down)</span>
        <span className={styles.headerCount}>Total</span>
        <span className={styles.headerTop30}>Top 30</span>
        <span className={styles.headerNeed}>Roster Need</span>
      </div>
      {rows.map(({ pos, total, top30, multiTouch }) => {
        const need = needMap[pos];
        const barFrac = total / maxTotal;
        const top30Frac = top30 / total;
        const isActive = activePosition === pos;
        return (
          <div
            key={pos}
            className={`${styles.row} ${isActive ? styles.rowActive : ''}`}
            onClick={() => onPositionClick(isActive ? null : pos)}
          >
            <span
              className={styles.posPill}
              style={{ background: POSITION_COLORS[pos] || '#9ca3af' }}
            >{pos}</span>

            <div className={styles.barTrack}>
              <div
                className={styles.barOther}
                style={{ width: `${barFrac * 100}%` }}
              />
              {top30 > 0 && (
                <div
                  className={styles.barTop30}
                  style={{ width: `${barFrac * top30Frac * 100}%` }}
                />
              )}
            </div>

            <span className={styles.count}>{total}</span>
            <span className={styles.top30Count}>
              {top30 > 0 ? (
                <span className={styles.top30Badge}>{top30} Top 30</span>
              ) : (
                <span className={styles.noneText}>—</span>
              )}
            </span>
            <span className={styles.needCell}>
              {need ? (
                <span className={styles.needWrap}>
                  <span className={styles.needTier}>T{need.tier}</span>
                  <div className={styles.needMini}>
                    <div
                      className={styles.needMiniFill}
                      style={{ width: `${(need.level / 10) * 100}%` }}
                    />
                  </div>
                  <span className={styles.needLevel}>{need.level}</span>
                </span>
              ) : (
                <span className={styles.noneText}>—</span>
              )}
            </span>
          </div>
        );
      })}
      <p className={styles.hint}>Click a row to filter all tabs by that position</p>
    </div>
  );
}
