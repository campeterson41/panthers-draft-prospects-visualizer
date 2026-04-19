import { useState, useMemo } from 'react';
import { allProspects, POSITION_COLORS } from '../data/meetings';
import { draftIntel } from '../data/draftIntel';
import { computePhysicalFit, fmtHeight, FIT_COLORS, FIT_LABELS } from '../data/prospectUtils';
import styles from './PrototypesTab.module.css';

const POSITIONS = ['OL', 'EDGE', 'DI', 'LB', 'CB', 'S', 'WR', 'TE'];

// ── Main tab ─────────────────────────────────────────────────────

export default function PrototypesTab({ onPlayerClick }) {
  const [activePos, setActivePos] = useState(null);
  const prospects = allProspects[2026];

  const positionData = useMemo(() => {
    const out = {};
    for (const pos of POSITIONS) {
      const archetype = draftIntel.positionArchetypes[pos];
      if (!archetype) continue;
      out[pos] = prospects
        .filter(p => p.position === pos)
        .map(p => ({ ...p, ...computePhysicalFit(p) }));
    }
    return out;
  }, [prospects]);

  return (
    <div className={styles.wrap}>
      <div className={styles.subTabs}>
        <button
          className={`${styles.subTab} ${!activePos ? styles.subTabActive : ''}`}
          onClick={() => setActivePos(null)}>
          Overview
        </button>
        {POSITIONS.map(pos => (
          <button
            key={pos}
            className={`${styles.subTab} ${activePos === pos ? styles.subTabActive : ''}`}
            onClick={() => setActivePos(pos)}>
            {pos}
            <span className={styles.subTabCount}>{positionData[pos]?.length || 0}</span>
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {!activePos && (
          <OverviewView positionData={positionData} onPosClick={setActivePos} />
        )}
        {activePos && (
          <PositionView
            pos={activePos}
            prospects={positionData[activePos] || []}
            archetype={draftIntel.positionArchetypes[activePos]}
            onPlayerClick={onPlayerClick}
            onBack={() => setActivePos(null)}
          />
        )}
      </div>
    </div>
  );
}

// ── Overview: stacked bar chart ───────────────────────────────────

function OverviewView({ positionData, onPosClick }) {
  const rows = POSITIONS.map(pos => {
    const prospects = positionData[pos] || [];
    const counts = { prototype: 0, partial: 0, outlier: 0, nodata: 0 };
    prospects.forEach(p => counts[p.fitStatus]++);
    return { pos, total: prospects.length, counts };
  }).filter(r => r.total > 0);

  const maxTotal = Math.max(...rows.map(r => r.total));

  return (
    <div>
      <h2 className={styles.viewTitle}>Physical Prototype Fit — 2026 Visited Prospects</h2>
      <p className={styles.viewSubtitle}>
        Based on Dan Morgan's documented size thresholds per position. Prototype = meets all tracked measurements.
      </p>

      <div className={styles.fitLegend}>
        {Object.entries(FIT_COLORS).map(([key, color]) => (
          <span key={key} className={styles.fitLegendItem}>
            <span className={styles.fitLegendSwatch} style={{ background: color }} />
            {FIT_LABELS[key]}
          </span>
        ))}
      </div>

      <div className={styles.overviewChart}>
        {rows.map(({ pos, total, counts }) => {
          const barMaxW = 420;
          const posColor = POSITION_COLORS[pos] || '#9ca3af';
          return (
            <div key={pos} className={styles.overviewRow} onClick={() => onPosClick(pos)}>
              <span className={styles.overviewPos} style={{ background: posColor }}>{pos}</span>
              <div className={styles.overviewBarWrap}>
                <div className={styles.overviewBar} style={{ width: `${(total / maxTotal) * barMaxW}px` }}>
                  {(['prototype', 'partial', 'outlier', 'nodata']).map(status => {
                    const w = (counts[status] / total) * 100;
                    return w > 0 ? (
                      <div
                        key={status}
                        className={styles.overviewSegment}
                        style={{ width: `${w}%`, background: FIT_COLORS[status] }}
                        title={`${FIT_LABELS[status]}: ${counts[status]}`}
                      />
                    ) : null;
                  })}
                </div>
              </div>
              <div className={styles.overviewCounts}>
                {counts.prototype > 0 && (
                  <span className={styles.overviewCount} style={{ color: FIT_COLORS.prototype }}>
                    {counts.prototype} proto
                  </span>
                )}
                {counts.partial > 0 && (
                  <span className={styles.overviewCount} style={{ color: FIT_COLORS.partial }}>
                    {counts.partial} partial
                  </span>
                )}
                {counts.outlier > 0 && (
                  <span className={styles.overviewCount} style={{ color: FIT_COLORS.outlier }}>
                    {counts.outlier} out
                  </span>
                )}
                <span className={styles.overviewTotal}>{total} total</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Position drill-down ───────────────────────────────────────────

function PositionView({ pos, prospects, archetype, onPlayerClick, onBack }) {
  const [hoveredId, setHoveredId] = useState(null);
  const thresh = archetype.sizeThresholds;
  const posColor = POSITION_COLORS[pos] || '#9ca3af';

  const sorted = [...prospects].sort((a, b) => {
    const order = { prototype: 0, partial: 1, outlier: 2, nodata: 3 };
    return order[a.fitStatus] - order[b.fitStatus];
  });

  const withMeasures = prospects.filter(p => p.heightIn || p.weight);

  return (
    <div>
      {/* Header */}
      <div className={styles.posHeader}>
        <button className={styles.backBtn} onClick={onBack}>← Overview</button>
        <span className={styles.posTitle}>
          <span className={styles.posBadge} style={{ background: posColor }}>{pos}</span>
          Panthers Prototype
        </span>
        <span className={styles.idealSize}>{archetype.idealSize}</span>
      </div>

      <div className={styles.posLayout}>
        {/* Left: spec card */}
        <div className={styles.specCard}>
          <h3 className={styles.specTitle}>What They Want</h3>
          <div className={styles.thresholds}>
            {thresh.minHeightIn && (
              <div className={styles.threshRow}>
                <span className={styles.threshLabel}>Min Height</span>
                <span className={styles.threshValue}>{fmtHeight(thresh.minHeightIn)}</span>
              </div>
            )}
            {thresh.weightMin && (
              <div className={styles.threshRow}>
                <span className={styles.threshLabel}>Weight</span>
                <span className={styles.threshValue}>
                  {thresh.weightMax ? `${thresh.weightMin}–${thresh.weightMax} lbs` : `≥ ${thresh.weightMin} lbs`}
                </span>
              </div>
            )}
            {thresh.armLengthMin && (
              <div className={styles.threshRow}>
                <span className={styles.threshLabel}>Min Arm</span>
                <span className={styles.threshValue}>{thresh.armLengthMin}"</span>
              </div>
            )}
          </div>
          <h3 className={styles.specTitle} style={{ marginTop: 16 }}>Key Traits</h3>
          <div className={styles.traitList}>
            {archetype.keyTraits.map((t, i) => (
              <span key={i} className={styles.trait}>{t}</span>
            ))}
          </div>
          <div className={styles.fitSummary}>
            {(['prototype', 'partial', 'outlier', 'nodata']).map(status => {
              const n = prospects.filter(p => p.fitStatus === status).length;
              if (!n) return null;
              return (
                <div key={status} className={styles.fitSummaryRow}>
                  <span className={styles.fitDot} style={{ background: FIT_COLORS[status] }} />
                  <span className={styles.fitSummaryLabel}>{FIT_LABELS[status]}</span>
                  <span className={styles.fitSummaryCount}>{n}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: chart */}
        <div className={styles.chartArea}>
          {withMeasures.length >= 2 ? (
            <HeightWeightScatter
              prospects={prospects}
              thresh={thresh}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              onPlayerClick={onPlayerClick}
            />
          ) : (
            <div className={styles.noDataMsg}>Not enough measurement data to plot.</div>
          )}
          {thresh.armLengthMin && (
            <ArmLengthChart
              prospects={prospects}
              threshold={thresh.armLengthMin}
              onPlayerClick={onPlayerClick}
            />
          )}
        </div>
      </div>

      {/* Player grid */}
      <h3 className={styles.gridTitle}>All Visited — Sorted by Fit</h3>
      <div className={styles.playerGrid}>
        {sorted.map(p => (
          <PlayerFitCard
            key={p.id}
            prospect={p}
            onClick={() => onPlayerClick(p.name)}
            isHovered={hoveredId === p.id}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

// ── Height × Weight Scatter ────────────────────────────────────────

function HeightWeightScatter({ prospects, thresh, hoveredId, onHover, onPlayerClick }) {
  const W = 420, H = 280;
  const M = { top: 20, right: 20, bottom: 40, left: 48 };
  const PW = W - M.left - M.right;
  const PH = H - M.top - M.bottom;

  const withData = prospects.filter(p => p.heightIn && p.weight);
  if (withData.length < 2) return null;

  const heights = withData.map(p => p.heightIn);
  const weights = withData.map(p => p.weight);

  const hPad = 1, wPad = 10;
  const hMin = Math.min(...heights, thresh.minHeightIn ? thresh.minHeightIn - hPad : Infinity) - hPad;
  const hMax = Math.max(...heights) + hPad;
  const wMin = Math.min(...weights, thresh.weightMin ? thresh.weightMin - wPad : Infinity) - wPad;
  const wMax = Math.max(...weights, thresh.weightMax ? thresh.weightMax + wPad : -Infinity) + wPad;

  function sx(w) { return M.left + ((w - wMin) / (wMax - wMin)) * PW; }
  function sy(h) { return M.top + PH - ((h - hMin) / (hMax - hMin)) * PH; }

  // Weight ticks
  const wRange = wMax - wMin;
  const wStep = wRange > 80 ? 20 : 10;
  const wTicks = [];
  for (let w = Math.ceil(wMin / wStep) * wStep; w <= wMax; w += wStep) wTicks.push(w);

  // Height ticks (every 1 inch)
  const hTicks = [];
  for (let h = Math.ceil(hMin); h <= Math.floor(hMax); h++) hTicks.push(h);

  // Ideal zone (top-right corner where both thresholds are met)
  const zoneLeft = thresh.weightMin ? sx(thresh.weightMin) : M.left;
  const zoneRight = thresh.weightMax ? sx(thresh.weightMax) : M.left + PW;
  const zoneTop = thresh.minHeightIn ? sy(hMax + hPad) : M.top;
  const zoneBottom = thresh.minHeightIn ? sy(thresh.minHeightIn) : M.top + PH;

  const showZone = (thresh.weightMin || thresh.minHeightIn);

  return (
    <div className={styles.scatterWrap}>
      <div className={styles.scatterLabel}>Height vs. Weight — threshold zone highlighted</div>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.scatterSvg}>
        {/* Ideal zone */}
        {showZone && (
          <rect
            x={zoneLeft} y={zoneTop}
            width={zoneRight - zoneLeft}
            height={zoneBottom - zoneTop}
            fill="rgba(22,163,74,0.07)"
            stroke="rgba(22,163,74,0.35)"
            strokeWidth="1"
            strokeDasharray="5 3"
          />
        )}

        {/* Threshold lines */}
        {thresh.minHeightIn && (
          <line x1={M.left} y1={sy(thresh.minHeightIn)} x2={M.left + PW} y2={sy(thresh.minHeightIn)}
            stroke="rgba(22,163,74,0.55)" strokeWidth="1.5" strokeDasharray="5 3" />
        )}
        {thresh.weightMin && (
          <line x1={sx(thresh.weightMin)} y1={M.top} x2={sx(thresh.weightMin)} y2={M.top + PH}
            stroke="rgba(22,163,74,0.55)" strokeWidth="1.5" strokeDasharray="5 3" />
        )}
        {thresh.weightMax && (
          <line x1={sx(thresh.weightMax)} y1={M.top} x2={sx(thresh.weightMax)} y2={M.top + PH}
            stroke="rgba(234,179,8,0.65)" strokeWidth="1.5" strokeDasharray="5 3" />
        )}

        {/* Axes */}
        <line x1={M.left} y1={M.top} x2={M.left} y2={M.top + PH} stroke="#e5e7eb" />
        <line x1={M.left} y1={M.top + PH} x2={M.left + PW} y2={M.top + PH} stroke="#e5e7eb" />

        {/* Y ticks */}
        {hTicks.map(h => (
          <g key={h}>
            <line x1={M.left - 3} y1={sy(h)} x2={M.left} y2={sy(h)} stroke="#d1d5db" />
            <text x={M.left - 5} y={sy(h)} textAnchor="end" dominantBaseline="middle" fontSize="9" fill="#9ca3af">
              {fmtHeight(h)}
            </text>
          </g>
        ))}

        {/* X ticks */}
        {wTicks.map(w => (
          <g key={w}>
            <line x1={sx(w)} y1={M.top + PH} x2={sx(w)} y2={M.top + PH + 3} stroke="#d1d5db" />
            <text x={sx(w)} y={M.top + PH + 13} textAnchor="middle" fontSize="9" fill="#9ca3af">{w}</text>
          </g>
        ))}

        <text x={M.left + PW / 2} y={H - 3} textAnchor="middle" fontSize="10" fill="#6b7280">Weight (lbs)</text>

        {/* Threshold labels */}
        {thresh.minHeightIn && (
          <text x={M.left + 2} y={sy(thresh.minHeightIn) - 3} fontSize="8" fill="rgba(22,163,74,0.8)">
            min {fmtHeight(thresh.minHeightIn)}
          </text>
        )}
        {thresh.weightMin && (
          <text x={sx(thresh.weightMin) + 2} y={M.top + 10} fontSize="8" fill="rgba(22,163,74,0.8)">
            min
          </text>
        )}

        {/* Dots */}
        {withData.map((p) => {
          const cx = sx(p.weight);
          const cy = sy(p.heightIn);
          const color = FIT_COLORS[p.fitStatus];
          const isHovered = hoveredId === p.id;
          return (
            <g key={p.id} style={{ cursor: 'pointer' }}
              onMouseEnter={() => onHover(p.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onPlayerClick(p.name)}>
              {isHovered && <circle cx={cx} cy={cy} r="10" fill={color} fillOpacity="0.15" />}
              <circle cx={cx} cy={cy} r="5" fill={color} fillOpacity="0.8" stroke="white" strokeWidth="1.2" />
              {isHovered && (
                <text x={cx} y={cy - 9} textAnchor="middle" fontSize="9" fill="#1f2937" fontWeight="600">
                  {p.name.split(' ').slice(-1)[0]}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Scatter legend */}
      <div className={styles.scatterLegend}>
        {(['prototype', 'partial', 'outlier', 'nodata']).map(s => (
          <span key={s} className={styles.scatterLegendItem}>
            <span className={styles.scatterDot} style={{ background: FIT_COLORS[s] }} />
            {FIT_LABELS[s]}
          </span>
        ))}
        <span className={styles.scatterLegendItem}>
          <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke="rgba(22,163,74,0.55)" strokeWidth="1.5" strokeDasharray="5 3" /></svg>
          Threshold
        </span>
      </div>
    </div>
  );
}

// ── Arm Length Bar Chart ───────────────────────────────────────────

function ArmLengthChart({ prospects, threshold, onPlayerClick }) {
  const withArm = prospects
    .filter(p => p.armLength != null)
    .sort((a, b) => b.armLength - a.armLength);

  if (withArm.length === 0) return null;

  const maxArm = Math.max(...withArm.map(p => p.armLength), threshold + 1);
  const minArm = Math.min(...withArm.map(p => p.armLength), threshold - 1.5);
  const LABEL_W = 110, BAR_AREA = 220, VAL_W = 40;
  const W = LABEL_W + BAR_AREA + VAL_W;
  const ROW_H = 22, GAP = 3;
  const H = withArm.length * (ROW_H + GAP) + 30;

  function bx(v) { return LABEL_W + ((v - minArm) / (maxArm - minArm)) * BAR_AREA; }
  const threshX = bx(threshold);

  return (
    <div className={styles.armWrap}>
      <div className={styles.scatterLabel}>Arm Length — min {threshold}"</div>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.armSvg}>
        {/* Threshold line */}
        <line x1={threshX} y1={10} x2={threshX} y2={H - 8}
          stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
        <text x={threshX} y={7} textAnchor="middle" fontSize="8" fill="#dc2626">{threshold}"</text>

        {withArm.map((p, i) => {
          const y = 14 + i * (ROW_H + GAP);
          const barW = Math.max(bx(p.armLength) - LABEL_W, 2);
          const color = p.armLength >= threshold ? FIT_COLORS.prototype : FIT_COLORS.outlier;
          const lastName = p.name.split(' ').pop();
          return (
            <g key={p.id} style={{ cursor: 'pointer' }} onClick={() => onPlayerClick(p.name)}>
              <text x={LABEL_W - 5} y={y + ROW_H / 2} textAnchor="end"
                dominantBaseline="middle" fontSize="10" fill="#374151">{lastName}</text>
              <rect x={LABEL_W} y={y} width={barW} height={ROW_H}
                fill={color} fillOpacity="0.65" rx="2" />
              <text x={LABEL_W + barW + 4} y={y + ROW_H / 2}
                dominantBaseline="middle" fontSize="9" fill={color} fontWeight="600">
                {p.armLength.toFixed(2)}"
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Player fit card ───────────────────────────────────────────────

function PlayerFitCard({ prospect: p, onClick, isHovered, onHover }) {
  const fitColor = FIT_COLORS[p.fitStatus];
  const fitLabel = FIT_LABELS[p.fitStatus];
  const icon = p.fitStatus === 'prototype' ? '✓' : p.fitStatus === 'partial' ? '~' : p.fitStatus === 'outlier' ? '✗' : '—';

  return (
    <div
      className={`${styles.playerCard} ${isHovered ? styles.playerCardHovered : ''}`}
      onClick={onClick}
      onMouseEnter={() => onHover(p.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className={styles.cardTop}>
        <span className={styles.cardName}>{p.name}</span>
        <span className={styles.fitBadge} style={{ color: fitColor, borderColor: fitColor }}>
          {icon} {fitLabel}
        </span>
      </div>
      <div className={styles.cardMeasures}>
        {p.heightIn && <span>{fmtHeight(p.heightIn)}</span>}
        {p.weight && <span>{p.weight} lbs</span>}
        {p.armLength && <span>{p.armLength.toFixed(2)}" arm</span>}
        {!p.heightIn && !p.weight && !p.armLength && (
          <span className={styles.noMeasure}>No combine data</span>
        )}
      </div>
      {p.checks.length > 0 && (
        <div className={styles.cardChecks}>
          {p.checks.map((c, i) => (
            <span key={i} className={styles.cardCheck}
              style={{ color: c.met === true ? FIT_COLORS.prototype : c.met === false ? FIT_COLORS.outlier : '#9ca3af' }}>
              {c.met === true ? '✓' : c.met === false ? '✗' : '—'} {c.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
