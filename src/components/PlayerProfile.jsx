import { useMemo } from 'react';
import { POSITION_COLORS } from '../data/meetings';
import { getPlayerData } from '../data/playerLookup';
import { draftIntel } from '../data/draftIntel';
import RadarChart from './RadarChart';
import styles from './PlayerProfile.module.css';

function tierColor(rank, total) {
  const pct = ((total - rank + 1) / total) * 100;
  if (pct >= 50) {
    const t = (pct - 50) / 50;
    return `rgb(${Math.round(60 - t * 30)}, ${Math.round(120 + t * 30)}, ${Math.round(60 - t * 10)})`;
  } else {
    const t = pct / 50;
    return `rgb(${Math.round(180 - t * 120)}, ${Math.round(60 + t * 60)}, ${Math.round(50 + t * 10)})`;
  }
}

export default function PlayerProfile({ prospectName, isOpen, onClose }) {
  const data = useMemo(() => prospectName ? getPlayerData(prospectName) : null, [prospectName]);

  if (!isOpen || !prospectName) return null;

  const { player, profile } = data || {};

  if (!player) {
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <span className={styles.playerName}>{prospectName}</span>
              <button className={styles.closeBtn} onClick={onClose}>&times;</button>
            </div>
            <p className={styles.noProfile}>No draft profile available for this prospect.</p>
          </div>
        </div>
      </div>
    );
  }

  const posColor = POSITION_COLORS[player.position] || '#6b7280';
  const percentiles = profile?.ranks ? buildPercentiles(profile.ranks) : null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            {profile?.posRank && (
              <span className={styles.posRank} style={{ background: posColor }}>{profile.posRank}</span>
            )}
            <button className={styles.closeBtn} onClick={onClose}>&times;</button>
          </div>
          <h2 className={styles.playerName}>{player.name}</h2>
          <div className={styles.headerMeta}>
            <span className={styles.posBadge} style={{ background: posColor }}>{player.position}</span>
            <span className={styles.school}>{player.school}</span>
            {profile?.grade && <span className={styles.grade}>{profile.grade}</span>}
          </div>
          <div className={styles.headerStats}>
            {profile?.height && <span className={styles.stat}>{profile.height}</span>}
            {profile?.weight && <span className={styles.stat}>{profile.weight} lbs</span>}
            {profile?.forty && <span className={styles.stat}>{profile.forty}s 40</span>}
            {profile?.age && <span className={styles.stat}>Age {parseFloat(profile.age).toFixed(1)}</span>}
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Draft Range */}
          {player.mockRange && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Draft Range</h3>
              <div className={styles.rangeContainer}>
                <div className={styles.rangeTrack}>
                  <div className={styles.rangeFill} />
                  <div className={styles.rangeMarker}
                    style={{ left: `${((player.mockRange.consensus - player.mockRange.floor) / (player.mockRange.ceiling - player.mockRange.floor)) * 100}%` }}>
                    <span className={styles.rangeMarkerLabel}>#{player.mockRange.consensus}</span>
                  </div>
                </div>
                <div className={styles.rangeLabels}>
                  <span>Floor: #{player.mockRange.floor}</span>
                  <span>Ceiling: #{player.mockRange.ceiling}</span>
                </div>
              </div>
            </div>
          )}

          {/* Callouts */}
          {profile?.callouts?.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Elite Traits</h3>
              <div className={styles.callouts}>
                {profile.callouts.map((c, i) => (
                  <div key={i} className={styles.callout}>{c}</div>
                ))}
              </div>
            </div>
          )}

          {/* Season Stats */}
          {profile?.seasonStats && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                Production
                {profile.seasonStats.gp && (
                  <span className={styles.prodGames}>
                    {profile.seasonStats.gp} GP{profile.seasonStats.gs ? ` / ${profile.seasonStats.gs} GS` : ''}
                  </span>
                )}
              </h3>
              {profile.seasonStats.headline && (
                <p className={styles.prodHeadline}>{profile.seasonStats.headline}</p>
              )}
            </div>
          )}

          {/* Athletic Profile */}
          {(percentiles || profile?.measurables) && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Athletic Profile</h3>
              <div className={styles.measGrid}>
                {percentiles && <RadarChart percentiles={percentiles} />}
                {profile?.ranks && (
                  <div className={styles.pctBars}>
                    {Object.entries(profile.ranks).filter(([k]) => k !== 'age').map(([key, val]) => {
                      const pct = Math.round(((val.total - val.rank + 1) / val.total) * 100);
                      const color = tierColor(val.rank, val.total);
                      const RANK_LABELS = { height: 'Height', size: 'Weight', speed: '40-Yard', explosion: 'Vert Jump', power: 'Broad Jump', agility: '3-Cone', quickness: 'Shuttle' };
                      return (
                        <div key={key} className={styles.pctRow}>
                          <span className={styles.pctLabel}>{RANK_LABELS[key] || key}</span>
                          <div className={styles.pctTrack}>
                            <div className={styles.pctFill} style={{ width: `${pct}%`, background: color }} />
                          </div>
                          <span className={styles.pctValue} style={{ color }}>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Strengths & Weaknesses */}
          {(profile?.strengths?.length > 0 || profile?.weaknesses?.length > 0) && (
            <div className={styles.section}>
              <div className={styles.prosConsGrid}>
                {profile?.strengths?.length > 0 && (
                  <div>
                    <h3 className={styles.prosTitle}>Strengths</h3>
                    <ul className={styles.prosList}>
                      {profile.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {profile?.weaknesses?.length > 0 && (
                  <div>
                    <h3 className={styles.consTitle}>Weaknesses</h3>
                    <ul className={styles.consList}>
                      {profile.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Panthers Fit */}
          <PanthersFit position={player.position} profile={profile} />

          {/* Scouting Summary */}
          {profile?.summary && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Scouting Report</h3>
              <p className={styles.summaryText}>{profile.summary}</p>
            </div>
          )}

          {/* Fallback notes */}
          {!profile && player.notes && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Notes</h3>
              <p className={styles.summaryText}>{player.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Panthers Fit ────────────────────────────────────────────────

function parseHeightRaw(heightRaw) {
  // NFL combine format: 6046 = 6 feet, 04 inches, 6/8 = 76.75"
  if (!heightRaw) return null;
  const s = String(heightRaw).padStart(4, '0');
  const feet = parseInt(s[0]);
  const inches = parseInt(s.slice(1, 3));
  const eighths = parseInt(s[3]);
  return feet * 12 + inches + eighths / 8;
}

function parseHeightString(h) {
  if (!h) return null;
  const m = h.match(/(\d+)'(\d+)/);
  if (m) return parseInt(m[1]) * 12 + parseInt(m[2]);
  return null;
}

function parseArmLength(s) {
  if (!s) return null;
  // e.g. "33 1/8" or "33.125"
  const m = s.match(/(\d+)\s+(\d+)\/(\d+)/);
  if (m) return parseInt(m[1]) + parseInt(m[2]) / parseInt(m[3]);
  return parseFloat(s) || null;
}

function FitCheck({ label, met, value, idealLabel }) {
  const icon = met === null ? '—' : met ? '✓' : '✗';
  const cls = met === null ? styles.fitNeutral : met ? styles.fitPass : styles.fitFail;
  return (
    <div className={styles.fitRow}>
      <span className={`${styles.fitIcon} ${cls}`}>{icon}</span>
      <span className={styles.fitLabel}>{label}</span>
      <span className={styles.fitValue}>{value || '—'}</span>
      <span className={styles.fitIdeal}>{idealLabel}</span>
    </div>
  );
}

const POS_MAP = { OT: 'OL', OG: 'OL', C: 'OL', DT: 'DI', DE: 'EDGE', ILB: 'LB', OLB: 'LB', SS: 'S', FS: 'S', NCB: 'CB' };

function PanthersFit({ position, profile }) {
  const normPos = POS_MAP[position] || position;
  const archetype = draftIntel.positionArchetypes[normPos];
  if (!archetype?.sizeThresholds) return null;

  const { sizeThresholds, keyTraits, idealSize } = archetype;
  const posLabel = normPos;
  const measurables = profile?.measurables;

  const heightIn = (measurables?.heightRaw && parseHeightRaw(measurables.heightRaw))
    || parseHeightString(profile?.height);
  const weight = measurables?.weight || (profile?.weight ? parseInt(profile.weight) : null);
  const armLength = measurables?.armLength ? parseArmLength(measurables.armLength) : null;

  function fmtHeight(inches) {
    if (!inches) return null;
    return `${Math.floor(inches / 12)}'${Math.round((inches % 12) * 8) / 8}"`;
  }

  const checks = [];

  if (sizeThresholds.minHeightIn != null && heightIn != null) {
    checks.push({
      label: 'Height',
      met: heightIn >= sizeThresholds.minHeightIn,
      value: fmtHeight(heightIn),
      idealLabel: `≥ ${fmtHeight(sizeThresholds.minHeightIn)}`,
    });
  }

  if (sizeThresholds.weightMin != null && weight != null) {
    const wMet = weight >= sizeThresholds.weightMin &&
      (sizeThresholds.weightMax == null || weight <= sizeThresholds.weightMax);
    const wIdeal = sizeThresholds.weightMax
      ? `${sizeThresholds.weightMin}–${sizeThresholds.weightMax} lbs`
      : `≥ ${sizeThresholds.weightMin} lbs`;
    checks.push({ label: 'Weight', met: wMet, value: `${weight} lbs`, idealLabel: wIdeal });
  }

  if (sizeThresholds.armLengthMin != null) {
    const armMet = armLength != null ? armLength >= sizeThresholds.armLengthMin : null;
    checks.push({
      label: 'Arm Length',
      met: armMet,
      value: armLength ? `${armLength.toFixed(2)}"` : null,
      idealLabel: `≥ ${sizeThresholds.armLengthMin}"`,
    });
  }

  if (checks.length === 0 && !keyTraits?.length) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>
        Panthers Fit
        <span className={styles.fitIdealSummary}>{idealSize}</span>
      </h3>
      {checks.length > 0 && (
        <div className={styles.fitChecks}>
          {checks.map((c, i) => <FitCheck key={i} {...c} />)}
        </div>
      )}
      {keyTraits?.length > 0 && (
        <div className={styles.fitTraits}>
          <span className={styles.fitTraitsLabel}>What they value at {normPos}:</span>
          <div className={styles.fitTraitList}>
            {keyTraits.map((t, i) => (
              <span key={i} className={styles.fitTrait}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function buildPercentiles(ranks) {
  const result = {};
  const keyMap = { height: 'height', size: 'size', speed: 'speed', explosion: 'explosion', power: 'power', agility: 'agility', quickness: 'quickness' };
  for (const [key, label] of Object.entries(keyMap)) {
    if (ranks[key]) {
      result[key] = Math.round(((ranks[key].total - ranks[key].rank + 1) / ranks[key].total) * 100);
    }
  }
  return Object.keys(result).length >= 3 ? result : null;
}
