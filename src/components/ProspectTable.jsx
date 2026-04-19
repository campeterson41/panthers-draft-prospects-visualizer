import { useState, useMemo } from 'react';
import { POSITION_COLORS } from '../data/meetings';
import styles from './ProspectTable.module.css';

const COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'position', label: 'Pos', sortable: true },
  { key: 'metAt', label: 'Met At', sortable: false },
  { key: 'touchCount', label: 'Meetings', sortable: true },
  { key: 'projected', label: 'Projected', sortable: true },
  { key: 'consensusMid', label: 'Board Rank', sortable: true },
];

const ROUND_ORDER = { '1st Round': 1, '2nd Round': 2, '3rd Round': 3, '4th Round': 4, '5th Round': 5, '6th Round': 6, '7th Round': 7, 'UDFA': 8 };

export default function ProspectTable({ prospects, onPlayerClick }) {
  const [sortKey, setSortKey] = useState('consensusMid');
  const [sortDir, setSortDir] = useState('asc');

  const sorted = useMemo(() => {
    return [...prospects].sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];
      if (sortKey === 'projected') { aVal = ROUND_ORDER[aVal] ?? 9; bVal = ROUND_ORDER[bVal] ?? 9; }
      if (sortKey === 'name') {
        aVal = (aVal || '').toLowerCase(); bVal = (bVal || '').toLowerCase();
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      aVal = aVal ?? 999; bVal = bVal ?? 999;
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [prospects, sortKey, sortDir]);

  function handleSort(key) {
    if (!COLUMNS.find(c => c.key === key)?.sortable) return;
    if (sortKey === key) { setSortDir(d => d === 'asc' ? 'desc' : 'asc'); }
    else { setSortKey(key); setSortDir(key === 'name' ? 'asc' : 'desc'); }
  }

  return (
    <div className={styles.section}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {COLUMNS.map(col => (
                <th key={col.key}
                  className={`${styles.th} ${col.sortable ? styles.sortable : ''} ${sortKey === col.key ? styles.activeSort : ''}`}
                  onClick={() => handleSort(col.key)}>
                  {col.label}
                  {sortKey === col.key && <span className={styles.sortArrow}>{sortDir === 'asc' ? ' \u25B2' : ' \u25BC'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(p => (
              <tr key={p.id} className={`${styles.row} ${p.isTop30 ? styles.top30Row : ''} ${p.isMultiTouch ? styles.multiTouchRow : ''}`}>
                <td className={styles.td}>
                  <span className={styles.name} onClick={() => onPlayerClick?.(p.name)} style={{ cursor: 'pointer' }}>{p.name}</span>
                  {p.isTop30 && <span className={styles.badgeT30}>T30</span>}
                  {p.isMultiTouch && <span className={styles.badgeMT}>{p.touchCount}x</span>}
                </td>
                <td className={styles.td}>
                  <span className={styles.posPill} style={{ background: POSITION_COLORS[p.position] }}>{p.position}</span>
                </td>
                <td className={styles.td}>
                  <div className={styles.meetings}>
                    {p.meetingTypes.map((mt, i) => (
                      <span key={i} className={`${styles.meetingPill} ${mt === 'Top 30' ? styles.meetingTop30 : ''}`}>{mt}</span>
                    ))}
                  </div>
                </td>
                <td className={styles.td}>{p.touchCount}</td>
                <td className={styles.td}><span className={styles.projected}>{p.projected || '—'}</span></td>
                <td className={styles.td}>
                  {p.consensusMid ? (
                    <span className={styles.rank}>
                      {p.consensusMid}
                      {p.consensusLow !== p.consensusHigh && p.consensusLow && p.consensusHigh && (
                        <span className={styles.rankRange}> ({p.consensusLow}–{p.consensusHigh})</span>
                      )}
                    </span>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
