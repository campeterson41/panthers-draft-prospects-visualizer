import { useState, useMemo, useRef } from 'react';
import { POSITION_COLORS } from '../data/meetings';
import { computeCombinedScore, FIT_COLORS, FIT_LABELS } from '../data/prospectUtils';
import styles from './ScatterPlot.module.css';

const PANTHERS_PICKS = [19, 51, 83, 119, 158, 159, 200];
const W = 800, H = 420;
const PAD = { top: 20, right: 30, bottom: 50, left: 52 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const MAX_RANK = 200;
const MAX_SCORE = 2.0;

function scaleX(rank) {
  return PAD.left + ((rank - 1) / (MAX_RANK - 1)) * PLOT_W;
}
function scaleY(score) {
  return PAD.top + PLOT_H - (score / MAX_SCORE) * PLOT_H;
}

function DotTooltip({ prospect, anchorPct, onClose, onPlayerClick }) {
  const [signalsOpen, setSignalsOpen] = useState(false);
  const { p, xPct, yPct } = anchorPct;
  const color = POSITION_COLORS[p.position] || '#9ca3af';

  // Position: flip left if too close to right edge, flip up if too close to bottom
  const left = xPct > 75 ? `calc(${xPct}% - 180px)` : `${xPct}%`;
  const top = yPct > 70 ? `calc(${yPct}% - 10px - 100%)` : `${yPct}%`;

  return (
    <div
      className={styles.tooltip}
      style={{ left, top }}
      onMouseLeave={onClose}
    >
      <div className={styles.ttHeader}>
        <span className={styles.ttName}>{p.name}</span>
        <span className={styles.ttPosPill} style={{ background: color }}>{p.position}</span>
      </div>
      {p.school && <div className={styles.ttSchool}>{p.school}</div>}
      <div className={styles.ttRank}>Board rank: <strong>#{p.consensusMid}</strong></div>
      {p.fitStatus && p.fitStatus !== 'nodata' && (
        <div className={styles.ttFit} style={{ color: FIT_COLORS[p.fitStatus] }}>
          {p.fitStatus === 'prototype' ? '✓' : p.fitStatus === 'partial' ? '~' : '✗'} {FIT_LABELS[p.fitStatus]}
        </div>
      )}
      <div className={styles.ttSignalsRow}>
        <button
          className={styles.ttSignalsBtn}
          onClick={() => setSignalsOpen(o => !o)}
        >
          Signals: {p.touchCount} {signalsOpen ? '▲' : '▼'}
        </button>
      </div>
      {signalsOpen && (
        <div className={styles.ttSignalsList}>
          {p.meetingTypes.map((mt, i) => (
            <span key={i} className={styles.ttSignalTag}>{mt}</span>
          ))}
        </div>
      )}
      <button className={styles.ttProfileBtn} onClick={() => { onPlayerClick(p.name); onClose(); }}>
        View Profile →
      </button>
    </div>
  );
}

export default function ScatterPlot({ prospects, year, onPlayerClick }) {
  const [tooltip, setTooltip] = useState(null);
  const [showUDFA, setShowUDFA] = useState(false);
  const wrapRef = useRef(null);

  const plotProspects = useMemo(() => {
    return prospects
      .filter(p => p.consensusMid != null && p.consensusMid <= MAX_RANK)
      .filter(p => showUDFA || p.projectedRound !== 8)
      .map(p => {
        const { interestScore, fitStatus, combinedScore } = computeCombinedScore(p);
        return { ...p, score: combinedScore, interestScore, fitStatus };
      })
      .sort((a, b) => a.score - b.score);
  }, [prospects, showUDFA]);

  const xTicks = [1, 25, 50, 75, 100, 125, 150, 175, 200];
  const yTicks = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  function handleDotEnter(p) {
    const cx = scaleX(p.consensusMid);
    const cy = scaleY(p.score);
    // Convert SVG coords to % of viewBox for CSS positioning
    const xPct = (cx / W) * 100;
    const yPct = (cy / H) * 100;
    setTooltip({ p, xPct, yPct });
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <span className={styles.subtitle}>
          Scouting attention vs. board rank for {year} class — {plotProspects.length} ranked prospects shown
        </span>
        <label className={styles.toggle}>
          <input type="checkbox" checked={showUDFA} onChange={e => setShowUDFA(e.target.checked)} />
          Show UDFA-projected
        </label>
      </div>

      <div className={styles.chartWrap} ref={wrapRef}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg}>
          {/* Grid lines */}
          {xTicks.map(x => (
            <line key={x}
              x1={scaleX(x)} y1={PAD.top}
              x2={scaleX(x)} y2={PAD.top + PLOT_H}
              stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          ))}
          {yTicks.map(y => (
            <line key={y}
              x1={PAD.left} y1={scaleY(y)}
              x2={PAD.left + PLOT_W} y2={scaleY(y)}
              stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          ))}

          {/* Panthers pick lines */}
          {PANTHERS_PICKS.filter(p => p <= MAX_RANK).map(pick => (
            <g key={pick}>
              <line
                x1={scaleX(pick)} y1={PAD.top}
                x2={scaleX(pick)} y2={PAD.top + PLOT_H}
                stroke="#b8860b" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
              <text
                x={scaleX(pick)} y={PAD.top + PLOT_H + 14}
                textAnchor="middle" fontSize="9" fill="#b8860b" fontWeight="700">
                #{pick}
              </text>
            </g>
          ))}

          {/* X axis */}
          <line x1={PAD.left} y1={PAD.top + PLOT_H} x2={PAD.left + PLOT_W} y2={PAD.top + PLOT_H}
            stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
          {xTicks.map(x => (
            <text key={x} x={scaleX(x)} y={PAD.top + PLOT_H + 26}
              textAnchor="middle" fontSize="10" fill="#9ca3af">{x}</text>
          ))}
          <text x={PAD.left + PLOT_W / 2} y={H - 4}
            textAnchor="middle" fontSize="11" fill="#6b7280">Consensus Board Rank</text>

          {/* Y axis */}
          <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + PLOT_H}
            stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
          {yTicks.map(y => (
            <text key={y} x={PAD.left - 8} y={scaleY(y) + 4}
              textAnchor="end" fontSize="10" fill="#9ca3af">{y.toFixed(2)}</text>
          ))}
          <text
            transform={`translate(12, ${PAD.top + PLOT_H / 2}) rotate(-90)`}
            textAnchor="middle" fontSize="11" fill="#6b7280">Signal + Fit Score</text>

          {/* Dots */}
          {plotProspects.map(p => {
            const cx = scaleX(p.consensusMid);
            const cy = scaleY(p.score);
            const r = 4 + p.touchCount * 1.5;
            const color = POSITION_COLORS[p.position] || '#9ca3af';
            const isHighlight = p.isTop30 || p.isMultiTouch;
            const isPrototype = p.fitStatus === 'prototype';
            return (
              <g key={p.id} style={{ cursor: 'pointer' }} onMouseEnter={() => handleDotEnter(p)}>
                {isPrototype && (
                  <circle cx={cx} cy={cy} r={r + 4}
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                )}
                <circle
                  cx={cx} cy={cy} r={r}
                  fill={color}
                  fillOpacity={isHighlight ? 0.85 : 0.45}
                  stroke={isHighlight ? color : 'none'}
                  strokeWidth={isHighlight ? 1.5 : 0}
                />
              </g>
            );
          })}
        </svg>

        {/* HTML tooltip overlay */}
        {tooltip && (
          <DotTooltip
            anchorPct={tooltip}
            onClose={() => setTooltip(null)}
            onPlayerClick={onPlayerClick}
          />
        )}
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendSection}>
          <span className={styles.legendLabel}>Positions:</span>
          {['QB','RB','WR','TE','OL','DI','EDGE','LB','CB','S'].map(pos => (
            <span key={pos} className={styles.legendDot}>
              <svg width="10" height="10"><circle cx="5" cy="5" r="5" fill={POSITION_COLORS[pos]} /></svg>
              {pos}
            </span>
          ))}
        </div>
        <div className={styles.legendSection}>
          <span className={styles.legendLabel}>Signal:</span>
          <span className={styles.legendDot}>
            <svg width="10" height="10"><circle cx="5" cy="5" r="5" fill="#9ca3af" fillOpacity="0.45" /></svg>
            Single meet
          </span>
          <span className={styles.legendDot}>
            <svg width="10" height="10"><circle cx="5" cy="5" r="5" fill="#1a1a1a" fillOpacity="0.85" stroke="#1a1a1a" strokeWidth="1.5" /></svg>
            Top 30 / multi-touch
          </span>
          <span className={styles.legendDot}>
            <svg width="16" height="10">
              <line x1="0" y1="5" x2="16" y2="5" stroke="#b8860b" strokeWidth="1.5" strokeDasharray="4 3" />
            </svg>
            Panthers pick
          </span>
        </div>
        <div className={styles.legendSection}>
          <span className={styles.legendLabel}>Fit:</span>
          <span className={styles.legendDot}>
            <svg width="20" height="10">
              <circle cx="5" cy="5" r="5" fill="#9ca3af" fillOpacity="0.45" />
              <circle cx="5" cy="5" r="9" fill="none" stroke="#16a34a" strokeWidth="1.5" opacity="0.7" />
            </svg>
            Prototype
          </span>
          <span className={styles.legendDot}>Dot size = signal count</span>
        </div>
      </div>
    </div>
  );
}
