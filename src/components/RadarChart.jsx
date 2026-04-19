import styles from './RadarChart.module.css';

const LABELS = {
  height: 'HEIGHT',
  size: 'WEIGHT',
  speed: '40-YARD',
  explosion: 'VERT JUMP',
  power: 'BROAD JUMP',
  agility: '3-CONE',
  quickness: 'SHUTTLE',
};

const CX = 120, CY = 120, R = 90;

export default function RadarChart({ percentiles }) {
  if (!percentiles) return null;
  const keys = Object.keys(LABELS).filter(k => percentiles[k] != null);
  if (keys.length < 3) return null;

  const n = keys.length;
  const angleStep = (2 * Math.PI) / n;

  function point(i, pct) {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = (pct / 100) * R;
    return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
  }

  const gridRings = [25, 50, 75, 100];
  const dataPoints = keys.map((k, i) => point(i, percentiles[k]));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ') + 'Z';

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 240 240" className={styles.svg}>
        {/* Grid rings */}
        {gridRings.map(pct => {
          const pts = keys.map((_, i) => point(i, pct));
          const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ') + 'Z';
          return <path key={pct} d={path} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />;
        })}

        {/* Axis lines */}
        {keys.map((_, i) => {
          const [x, y] = point(i, 100);
          return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />;
        })}

        {/* Data shape */}
        <path d={dataPath} fill="rgba(0, 133, 202, 0.12)" stroke="#0085CA" strokeWidth="1.5" />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#0085CA" />
        ))}

        {/* Labels */}
        {keys.map((k, i) => {
          const [x, y] = point(i, 118);
          return (
            <text key={k} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
              className={styles.label}>
              {LABELS[k]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
