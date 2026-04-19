import { computeInterestScore } from './meetings';
import { getPlayerData } from './playerLookup';
import { draftIntel } from './draftIntel';

// ── Measurement helpers ──────────────────────────────────────────

export function parseHeightRaw(raw) {
  if (!raw) return null;
  const s = String(raw).padStart(4, '0');
  return parseInt(s[0]) * 12 + parseInt(s.slice(1, 3)) + parseInt(s[3]) / 8;
}
export function parseHeightString(h) {
  if (!h) return null;
  const m = h.match(/(\d+)'(\d+)/);
  return m ? parseInt(m[1]) * 12 + parseInt(m[2]) : null;
}
export function parseArmLength(s) {
  if (!s) return null;
  const m = s.match(/(\d+)\s+(\d+)\/(\d+)/);
  if (m) return parseInt(m[1]) + parseInt(m[2]) / parseInt(m[3]);
  return parseFloat(s) || null;
}
export function fmtHeight(inches) {
  if (!inches) return null;
  return `${Math.floor(inches / 12)}'${Math.round(inches % 12)}"`;
}

// ── Physical fit computation ─────────────────────────────────────
// prospect.position is already in archetype-key form (OL, DI, EDGE, etc.)

export function computePhysicalFit(prospect) {
  const archetype = draftIntel.positionArchetypes[prospect.position];
  if (!archetype?.sizeThresholds) {
    return { fitStatus: 'nodata', heightIn: null, weight: null, armLength: null, checks: [], passedChecks: 0, totalChecks: 0 };
  }

  const data = getPlayerData(prospect.name);
  const profile = data?.profile;
  const meas = profile?.measurables;
  const thresh = archetype.sizeThresholds;

  const heightIn = (meas?.heightRaw && parseHeightRaw(meas.heightRaw)) || parseHeightString(profile?.height);
  const weight = meas?.weight || (profile?.weight ? parseInt(profile.weight) : null);
  const armLength = meas?.armLength ? parseArmLength(meas.armLength) : null;

  const checks = [];
  if (thresh.minHeightIn != null && heightIn != null) {
    checks.push({ label: 'Height', met: heightIn >= thresh.minHeightIn, value: fmtHeight(heightIn) });
  }
  if (thresh.weightMin != null && weight != null) {
    const met = weight >= thresh.weightMin && (thresh.weightMax == null || weight <= thresh.weightMax);
    const ideal = thresh.weightMax ? `${thresh.weightMin}–${thresh.weightMax}` : `≥${thresh.weightMin}`;
    checks.push({ label: 'Weight', met, value: `${weight} lbs`, ideal: `${ideal} lbs` });
  }
  if (thresh.armLengthMin != null) {
    const met = armLength != null ? armLength >= thresh.armLengthMin : null;
    checks.push({ label: 'Arm', met, value: armLength ? `${armLength.toFixed(2)}"` : null, ideal: `≥${thresh.armLengthMin}"` });
  }

  const totalChecks = checks.length;
  const passedChecks = checks.filter(c => c.met === true).length;
  const hasData = heightIn != null || weight != null || armLength != null;

  let fitStatus;
  if (!hasData || totalChecks === 0) fitStatus = 'nodata';
  else if (passedChecks === totalChecks) fitStatus = 'prototype';
  else if (passedChecks === 0) fitStatus = 'outlier';
  else fitStatus = 'partial';

  return { fitStatus, heightIn, weight, armLength, checks, passedChecks, totalChecks };
}

// ── Combined score: scouting interest × physical fit multiplier ──
// Prototype fit boosts the signal; outlier body type slightly discounts it.
const FIT_MULTIPLIERS = { prototype: 1.25, partial: 1.1, outlier: 0.9, nodata: 1.0 };

export function computeCombinedScore(prospect) {
  const interestScore = computeInterestScore(prospect);
  const fit = computePhysicalFit(prospect);
  const combinedScore = Math.min(
    Math.round(interestScore * FIT_MULTIPLIERS[fit.fitStatus] * 100) / 100,
    2.0
  );
  return { interestScore, fitStatus: fit.fitStatus, combinedScore };
}

export const FIT_COLORS = {
  prototype: '#16a34a',
  partial:   '#d97706',
  outlier:   '#dc2626',
  nodata:    '#9ca3af',
};

export const FIT_LABELS = {
  prototype: 'Prototype',
  partial:   'Partial Fit',
  outlier:   'Outlier',
  nodata:    'No Data',
};
