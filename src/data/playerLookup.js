import players from './players.json';
import beastProfiles from './beastProfiles.json';

// Index players by slug id
const playerById = {};
players.forEach(p => { playerById[p.id] = p; });

// Index beast profiles by playerId
const profileByPlayerId = {};
beastProfiles.forEach(bp => { profileByPlayerId[bp.playerId] = bp; });

// Slugify a name: "Denzel Boston" -> "denzel-boston"
function slugify(name) {
  return name.trim().toLowerCase()
    .replace(/['']/g, '')
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Try to find a player match for a meeting prospect name
export function findPlayer(name) {
  const slug = slugify(name);

  // Direct match
  if (playerById[slug]) return playerById[slug];

  // Try without suffixes (Jr., II, III, IV)
  const noSuffix = slug.replace(/-(jr|sr|ii|iii|iv|v)$/, '');
  if (playerById[noSuffix]) return playerById[noSuffix];

  // Try fuzzy: search all players for name match
  const nameLower = name.trim().toLowerCase();
  const match = players.find(p => p.name.toLowerCase() === nameLower);
  if (match) return match;

  return null;
}

// Get beast profile for a player
export function getProfile(playerId) {
  return profileByPlayerId[playerId] || null;
}

// Get both player + profile in one call
export function getPlayerData(name) {
  const player = findPlayer(name);
  if (!player) return null;
  const profile = getProfile(player.id);
  return { player, profile };
}
