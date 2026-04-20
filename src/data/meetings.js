const POSITION_COLORS = {
  QB: '#e74c3c',
  RB: '#2ecc71',
  WR: '#3498db',
  TE: '#e67e22',
  OL: '#9b59b6',
  DI: '#1abc9c',
  EDGE: '#e91e63',
  LB: '#f39c12',
  CB: '#00bcd4',
  S: '#ff9800',
  K: '#78909c',
  P: '#78909c',
};

const MEETING_TYPES_ORDERED = [
  'Top 30', 'Combine', 'Pro Day', 'Senior Bowl',
  'Shrine Bowl', 'American Bowl', 'Hula Bowl',
  'Virtual', 'Local Visit', 'Local Day', 'Unofficial',
];

const ROUND_ORDER = ['1st Round', '2nd Round', '3rd Round', '4th Round', '5th Round', '6th Round', '7th Round', 'UDFA', 'Unknown'];

const YEARS = [2026, 2025];

// ─── 2026 Raw Data ──────────────────────────────────────────────

const RAW_2026 = [
  { name: "Fintan Brose", position: "OL", metAt: "Hula Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Camden Brown", position: "WR", metAt: "Hula Bowl", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Gavin Gibson", position: "S", metAt: "Hula Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Kaleb Proctor", position: "EDGE", metAt: "Shrine Bowl", projected: null, consensusLow: 111, consensusHigh: 220 },
  { name: "Elijah Culp", position: "CB", metAt: "Shrine Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Rashad Battle", position: "CB", metAt: "American Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Tristan Leigh", position: "OL", metAt: "Shrine Bowl, Pro Day", projected: "6th Round", consensusLow: 188, consensusHigh: 188 },
  { name: "Nick Dawkins", position: "OL", metAt: "American Bowl", projected: null, consensusLow: 264, consensusHigh: 389 },
  { name: "West Weeks", position: "LB", metAt: "Shrine Bowl", projected: "3rd Round", consensusLow: 427, consensusHigh: 427 },
  { name: "Marcus Allen", position: "CB", metAt: "Shrine Bowl", projected: null, consensusLow: 312, consensusHigh: 357 },
  { name: "Austin Leausa", position: "OL", metAt: "American Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Al'zillion Hamilton", position: "CB", metAt: "American Bowl", projected: null, consensusLow: 294, consensusHigh: 294 },
  { name: "Landon Robinson", position: "DI", metAt: "Shrine Bowl", projected: null, consensusLow: 122, consensusHigh: 254 },
  { name: "Ayden Garnes", position: "CB", metAt: "American Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Jalen Huskey", position: "S", metAt: "Shrine Bowl", projected: null, consensusLow: 204, consensusHigh: 267 },
  { name: "Andre Fuller", position: "CB", metAt: "Shrine Bowl", projected: null, consensusLow: 193, consensusHigh: 311 },
  { name: "Brandon Cleveland", position: "DI", metAt: "Shrine Bowl", projected: null, consensusLow: 202, consensusHigh: 279 },
  { name: "Mason Reiger", position: "EDGE", metAt: "Shrine Bowl, Combine", projected: "5th Round", consensusLow: 140, consensusHigh: 313 },
  { name: "Jermod McCoy", position: "CB", metAt: "Top 30", projected: "1st Round", consensusLow: 6, consensusHigh: 20 },
  { name: "Kage Casey", position: "OL", metAt: "Senior Bowl", projected: "4th Round", consensusLow: 70, consensusHigh: 139 },
  { name: "Emmanuel Henderson", position: "WR", metAt: "Shrine Bowl", projected: null, consensusLow: 274, consensusHigh: 371 },
  { name: "Brian Parker II", position: "OL", metAt: "Shrine Bowl", projected: "2nd Round", consensusLow: 98, consensusHigh: 187 },
  { name: "Austin Barber", position: "OL", metAt: "Senior Bowl, Virtual", projected: "3rd Round", consensusLow: 74, consensusHigh: 149 },
  { name: "Derrick Moore", position: "EDGE", metAt: "Senior Bowl", projected: "3rd Round", consensusLow: 60, consensusHigh: 98 },
  { name: "Romello Height", position: "EDGE", metAt: "Senior Bowl", projected: "2nd Round", consensusLow: 77, consensusHigh: 107 },
  { name: "Kyle Louis", position: "LB", metAt: "Senior Bowl", projected: "5th Round", consensusLow: 55, consensusHigh: 188 },
  { name: "Ted Hurst", position: "WR", metAt: "Senior Bowl", projected: "5th Round", consensusLow: 66, consensusHigh: 155 },
  { name: "Jude Bowry", position: "OL", metAt: "Senior Bowl", projected: "4th Round", consensusLow: 92, consensusHigh: 134 },
  { name: "Adam Randall", position: "RB", metAt: "Senior Bowl", projected: null, consensusLow: 135, consensusHigh: 288 },
  { name: "Delby Lemieux", position: "OL", metAt: "Senior Bowl", projected: null, consensusLow: 218, consensusHigh: 218 },
  { name: "Gabe Jacas", position: "EDGE", metAt: "Senior Bowl", projected: "3rd Round", consensusLow: 37, consensusHigh: 66 },
  { name: "Lewis Bond", position: "WR", metAt: "Senior Bowl", projected: null, consensusLow: 158, consensusHigh: 305 },
  { name: "Caleb Banks", position: "DI", metAt: "Senior Bowl", projected: "2nd Round", consensusLow: 22, consensusHigh: 55 },
  { name: "Jacob Rodriguez", position: "LB", metAt: "Senior Bowl, Combine, Pro Day", projected: "2nd Round", consensusLow: 40, consensusHigh: 83 },
  { name: "Darrell Jackson Jr.", position: "DI", metAt: "Shrine Bowl", projected: "3rd Round", consensusLow: 67, consensusHigh: 108 },
  { name: "Caleb Lomu", position: "OL", metAt: "Top 30", projected: "1st Round", consensusLow: 10, consensusHigh: 56 },
  { name: "Chris Brazzell II", position: "WR", metAt: "Top 30", projected: "1st Round", consensusLow: 26, consensusHigh: 96 },
  { name: "Emmett Johnson", position: "RB", metAt: "Virtual", projected: "3rd Round", consensusLow: 69, consensusHigh: 161 },
  { name: "Kobe Baynes", position: "OL", metAt: "American Bowl", projected: "6th Round", consensusLow: 194, consensusHigh: 194 },
  { name: "Blake Miller", position: "OL", metAt: "Pro Day", projected: "1st Round", consensusLow: 14, consensusHigh: 52 },
  { name: "Kaleb Elarms-Orr", position: "LB", metAt: "Combine", projected: "2nd Round", consensusLow: 115, consensusHigh: 245 },
  { name: "Keldric Faulk", position: "EDGE", metAt: "Combine", projected: "1st Round", consensusLow: 15, consensusHigh: 34 },
  { name: "Sawyer Robertson", position: "QB", metAt: "Combine, Virtual", projected: "3rd Round", consensusLow: 173, consensusHigh: 308 },
  { name: "Genesis Smith", position: "S", metAt: "Combine", projected: "3rd Round", consensusLow: 56, consensusHigh: 105 },
  { name: "Daylen Everette", position: "CB", metAt: "Combine", projected: "2nd Round", consensusLow: 83, consensusHigh: 147 },
  { name: "Sonny Styles", position: "LB", metAt: "Combine", projected: "1st Round", consensusLow: 2, consensusHigh: 9 },
  { name: "Anthony Hill Jr.", position: "LB", metAt: "Unofficial, Pro Day", projected: null, consensusLow: 32, consensusHigh: 86 },
  { name: "Reuben Unije", position: "OL", metAt: "Hula Bowl", projected: null, consensusLow: 206, consensusHigh: 206 },
  { name: "Kajiya Hollawayne", position: "WR", metAt: "Pro Day", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Carver Willis", position: "OL", metAt: "Virtual", projected: "UDFA", consensusLow: 75, consensusHigh: 206 },
  { name: "Wesley Bissainthe", position: "LB", metAt: "Virtual", projected: "UDFA", consensusLow: 230, consensusHigh: 404 },
  { name: "Spencer Fano", position: "OL", metAt: "Pro Day", projected: "1st Round", consensusLow: 5, consensusHigh: 19 },
  { name: "Denzel Boston", position: "WR", metAt: "Top 30", projected: "1st Round", consensusLow: 21, consensusHigh: 37 },
  { name: "Jake Eichorn", position: "OL", metAt: "Pro Day", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Collin Wright", position: "CB", metAt: "Virtual", projected: null, consensusLow: 232, consensusHigh: 295 },
  { name: "KC Concepcion", position: "WR", metAt: "Local Visit", projected: null, consensusLow: 12, consensusHigh: 36 },
  { name: "Quindarius Dunnigan", position: "EDGE", metAt: "Unofficial", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Malik Benson", position: "WR", metAt: "Pro Day", projected: "5th Round", consensusLow: 165, consensusHigh: 318 },
  { name: "Max Iheanachor", position: "OL", metAt: "Top 30", projected: "2nd Round", consensusLow: 19, consensusHigh: 77 },
  { name: "Khalil Jacobs", position: "LB", metAt: "Virtual", projected: null, consensusLow: 326, consensusHigh: 326 },
  { name: "Malik Muhammad", position: "CB", metAt: "Virtual, Unofficial", projected: "3rd Round", consensusLow: 44, consensusHigh: 110 },
  { name: "Nathan Voorhis", position: "EDGE", metAt: "Pro Day, Hula Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Walker Parks", position: "OL", metAt: "Pro Day", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Dion Wilson Jr.", position: "EDGE", metAt: "Pro Day", projected: null, consensusLow: 67, consensusHigh: 108 },
  { name: "Eli Raridon", position: "TE", metAt: "Senior Bowl", projected: "4th Round", consensusLow: 86, consensusHigh: 161 },
  { name: "John Michael Gyllenborg", position: "TE", metAt: "Senior Bowl", projected: "7th Round", consensusLow: 193, consensusHigh: 231 },
  { name: "J Michael Sturdivant", position: "WR", metAt: "Shrine Bowl", projected: "UDFA", consensusLow: 192, consensusHigh: 319 },
  { name: "Jordan Hudson", position: "WR", metAt: "Senior Bowl", projected: "UDFA", consensusLow: 203, consensusHigh: 286 },
  { name: "Keylan Rutledge", position: "OL", metAt: "Senior Bowl", projected: "4th Round", consensusLow: 45, consensusHigh: 101 },
  { name: "Rayshuan Benny", position: "DI", metAt: "Senior Bowl", projected: "5th Round", consensusLow: 80, consensusHigh: 195 },
  { name: "Caleb Douglas", position: "WR", metAt: "Unofficial", projected: "UDFA", consensusLow: 156, consensusHigh: 275 },
  { name: "Jayden Loving", position: "DI", metAt: "Unofficial", projected: null, consensusLow: 181, consensusHigh: 181 },
  { name: "Lee Hunter", position: "DI", metAt: "Pro Day", projected: "2nd Round", consensusLow: 28, consensusHigh: 67 },
  { name: "Omar Cooper Jr.", position: "WR", metAt: "Top 30", projected: "2nd Round", consensusLow: 18, consensusHigh: 39 },
  { name: "Chase Bisontis", position: "OL", metAt: "Top 30", projected: "2nd Round", consensusLow: 33, consensusHigh: 59 },
  { name: "Kadyn Proctor", position: "OL", metAt: "Pro Day", projected: "1st Round", consensusLow: 4, consensusHigh: 36 },
  { name: "Parker Brailsford", position: "OL", metAt: "Pro Day", projected: "4th Round", consensusLow: 77, consensusHigh: 225 },
  { name: "Chris Freeman", position: "K", metAt: "Pro Day", projected: null, consensusLow: null, consensusHigh: null },
  { name: "AJ Haulcy", position: "S", metAt: "Top 30", projected: "2nd Round", consensusLow: 51, consensusHigh: 70 },
  { name: "Ike Larsen", position: "S", metAt: "Pro Day", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Deion Burks", position: "WR", metAt: "Top 30", projected: "3rd Round", consensusLow: 60, consensusHigh: 172 },
  { name: "Oscar Delp", position: "TE", metAt: "Unofficial, Top 30", projected: "4th Round", consensusLow: 86, consensusHigh: 214 },
  { name: "Keyshawn James-Newby", position: "EDGE", metAt: "Unofficial", projected: null, consensusLow: 286, consensusHigh: 403 },
  { name: "Domonique Orange", position: "DI", metAt: "Top 30", projected: "2nd Round", consensusLow: 47, consensusHigh: 87 },
  { name: "Treydan Stukes", position: "CB", metAt: "Top 30", projected: "3rd Round", consensusLow: 52, consensusHigh: 88 },
  { name: "Chris McClellan", position: "DI", metAt: "Top 30", projected: "5th Round", consensusLow: 72, consensusHigh: 185 },
  { name: "Keyron Crawford", position: "EDGE", metAt: "Top 30", projected: "4th Round", consensusLow: 54, consensusHigh: 162 },
  { name: "Nick Barrett", position: "DI", metAt: "Local Visit", projected: "UDFA", consensusLow: 94, consensusHigh: 231 },
  { name: "Dae'Quan Wright", position: "TE", metAt: "Top 30", projected: "6th Round", consensusLow: 135, consensusHigh: 208 },
  { name: "Jack Strand", position: "QB", metAt: "Top 30", projected: null, consensusLow: 236, consensusHigh: 236 },
  { name: "Diego Pavia", position: "QB", metAt: "Top 30", projected: null, consensusLow: 241, consensusHigh: 326 },
  { name: "Behren Morton", position: "QB", metAt: "Top 30", projected: "UDFA", consensusLow: 193, consensusHigh: 368 },
  { name: "Karon Prunty", position: "CB", metAt: "Local Visit", projected: "UDFA", consensusLow: 343, consensusHigh: 343 },
  { name: "Thaddeus Dixon", position: "CB", metAt: "Pro Day", projected: "7th Round", consensusLow: 167, consensusHigh: 227 },
  { name: "CJ Daniels", position: "WR", metAt: "Virtual", projected: "5th Round", consensusLow: 118, consensusHigh: 260 },
  { name: "Wesley Williams", position: "EDGE", metAt: "Virtual", projected: "6th Round", consensusLow: 146, consensusHigh: 259 },
  { name: "Tyreak Sapp", position: "EDGE", metAt: "Unofficial", projected: "4th Round", consensusLow: 124, consensusHigh: 241 },
  { name: "Travis Burke", position: "OL", metAt: "Virtual, Top 30", projected: "UDFA", consensusLow: 79, consensusHigh: 293 },
  { name: "Tyler Onyedim", position: "DI", metAt: "Top 30", projected: "UDFA", consensusLow: 74, consensusHigh: 243 },
  { name: "Kaelon Black", position: "RB", metAt: "Top 30", projected: null, consensusLow: 187, consensusHigh: 213 },
  { name: "Jalon Kilgore", position: "S", metAt: "Senior Bowl, Top 30, Local Visit", projected: "4th Round", consensusLow: 57, consensusHigh: 238 },
  { name: "Ahmari Harvey", position: "CB", metAt: "Shrine Bowl", projected: "UDFA", consensusLow: 268, consensusHigh: 362 },
  { name: "Brent Austin", position: "CB", metAt: "Shrine Bowl", projected: null, consensusLow: 122, consensusHigh: 180 },
  { name: "DJ Harvey", position: "CB", metAt: "American Bowl", projected: "UDFA", consensusLow: 240, consensusHigh: 383 },
  { name: "Michael Heldman", position: "EDGE", metAt: "Hula Bowl", projected: null, consensusLow: 254, consensusHigh: 263 },
  { name: "De'Zhaun Stribling", position: "WR", metAt: "Virtual", projected: "3rd Round", consensusLow: 67, consensusHigh: 248 },
  { name: "Decorian Clark", position: "WR", metAt: "Pro Day", projected: "UDFA", consensusLow: 79, consensusHigh: 169 },
  { name: "Zion Young", position: "EDGE", metAt: "Pro Day", projected: "2nd Round", consensusLow: 24, consensusHigh: 76 },
  { name: "Kevin Jobity Jr.", position: "DI", metAt: "Pro Day", projected: null, consensusLow: 106, consensusHigh: 209 },
  { name: "Anthony Beacom", position: "P", metAt: "Pro Day", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Kayden McDonald", position: "DI", metAt: "Combine", projected: "1st Round", consensusLow: 21, consensusHigh: 33 },
  { name: "Jimmy Rolder", position: "LB", metAt: "Combine", projected: "7th Round", consensusLow: 126, consensusHigh: 251 },
  { name: "Jake Golday", position: "LB", metAt: "Combine", projected: "2nd Round", consensusLow: 36, consensusHigh: 71 },
  { name: "Jalon Daniels", position: "QB", metAt: "Unofficial", projected: "UDFA", consensusLow: 239, consensusHigh: 382 },
  { name: "Reggie Virgil", position: "WR", metAt: "Unofficial", projected: "5th Round", consensusLow: 118, consensusHigh: 241 },
  { name: "Tre'Shawn Watson", position: "WR", metAt: "Unofficial", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Dallas Bentley", position: "TE", metAt: "Unofficial", projected: "6th Round", consensusLow: 121, consensusHigh: 234 },
  { name: "Bryce Boettcher", position: "LB", metAt: "Unofficial", projected: "6th Round", consensusLow: 110, consensusHigh: 180 },
  { name: "Louis Frye", position: "S", metAt: "Unofficial", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Justin Joly", position: "TE", metAt: "Senior Bowl, Top 30", projected: "3rd Round", consensusLow: 92, consensusHigh: 175 },
  { name: "Haynes King", position: "QB", metAt: "Top 30", projected: "UDFA", consensusLow: 245, consensusHigh: 378 },
  { name: "Maximus Pulley", position: "S", metAt: "Unofficial", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Max Klare", position: "TE", metAt: "Unofficial", projected: "3rd Round", consensusLow: 43, consensusHigh: 100 },
  { name: "Jordyn Tyson", position: "WR", metAt: "Pro Day", projected: "1st Round", consensusLow: 9, consensusHigh: 23 },
];

// ─── 2025 Raw Data ──────────────────────────────────────────────

const RAW_2025 = [
  { name: "Trey Amos", position: "CB", metAt: "Combine", projected: "2nd Round", consensusLow: 30, consensusHigh: 40 },
  { name: "Darien Porter", position: "CB", metAt: "Combine", projected: "2nd Round", consensusLow: 54, consensusHigh: 60 },
  { name: "Jacob Parrish", position: "CB", metAt: "Senior Bowl", projected: "3rd Round", consensusLow: 93, consensusHigh: 93 },
  { name: "Dorian Strong", position: "CB", metAt: "Senior Bowl", projected: "4th Round", consensusLow: 86, consensusHigh: 106 },
  { name: "Quincy Riley", position: "CB", metAt: "Top 30", projected: "4th Round", consensusLow: 89, consensusHigh: 117 },
  { name: "Car'lin Vigers", position: "CB", metAt: "Hula Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Jalen Kimber", position: "CB", metAt: "Shrine Bowl", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Brandon Johnson", position: "CB", metAt: "Local Day", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Mason Graham", position: "DI", metAt: "Combine", projected: "1st Round", consensusLow: 4, consensusHigh: 5 },
  { name: "Walter Nolen", position: "DI", metAt: "Senior Bowl, Top 30", projected: "1st Round", consensusLow: 18, consensusHigh: 31 },
  { name: "TJ Sanders", position: "DI", metAt: "Pro Day", projected: "2nd Round", consensusLow: 45, consensusHigh: 63 },
  { name: "Deone Walker", position: "DI", metAt: "Top 30", projected: "3rd Round", consensusLow: 33, consensusHigh: 91 },
  { name: "CJ West", position: "DI", metAt: "Shrine Bowl", projected: "4th Round", consensusLow: 101, consensusHigh: 105 },
  { name: "Aeneas Peebles", position: "DI", metAt: "Senior Bowl", projected: "4th Round", consensusLow: 103, consensusHigh: 139 },
  { name: "Elijah Roberts", position: "DI", metAt: "Shrine Bowl", projected: "5th Round", consensusLow: 127, consensusHigh: 144 },
  { name: "Cam Jackson", position: "DI", metAt: "Combine, Top 30", projected: "5th Round", consensusLow: 130, consensusHigh: 177 },
  { name: "Tonka Hemingway", position: "DI", metAt: "Shrine Bowl, Pro Day", projected: "7th Round", consensusLow: 132, consensusHigh: 233 },
  { name: "Tyrion Ingram-Dawkins", position: "DI", metAt: "Top 30", projected: "7th Round", consensusLow: 179, consensusHigh: 215 },
  { name: "Alex Huntley", position: "DI", metAt: "Pro Day", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Danny Striggow", position: "DI", metAt: "Hula Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Joe Evans", position: "DI", metAt: "Shrine Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Kevin Pointer", position: "DI", metAt: "Local Day", projected: null, consensusLow: null, consensusHigh: null },
  { name: "DeAndre Jules", position: "DI", metAt: "Pro Day", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Warren Brinson", position: "DI", metAt: "Top 30", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Jalon Walker", position: "EDGE", metAt: "Combine, Local Visit", projected: "1st Round", consensusLow: 8, consensusHigh: 11 },
  { name: "Shemar Stewart", position: "EDGE", metAt: "Top 30", projected: "1st Round", consensusLow: 12, consensusHigh: 27 },
  { name: "Donovan Ezeiruaku", position: "EDGE", metAt: "Senior Bowl, Top 30", projected: "2nd Round", consensusLow: 28, consensusHigh: 32 },
  { name: "Princely Umanmielen", position: "EDGE", metAt: "Senior Bowl, Unofficial, Top 30", projected: "2nd Round", consensusLow: 37, consensusHigh: 55 },
  { name: "Bradyn Swinson", position: "EDGE", metAt: "Top 30", projected: "2nd Round", consensusLow: 67, consensusHigh: 69 },
  { name: "Josaiah Stewart", position: "EDGE", metAt: "Senior Bowl", projected: "2nd Round", consensusLow: 58, consensusHigh: 73 },
  { name: "Femi Oladejo", position: "EDGE", metAt: "Top 30", projected: "3rd Round", consensusLow: 80, consensusHigh: 82 },
  { name: "Kyle Kennard", position: "EDGE", metAt: "Pro Day, Local Day", projected: "3rd Round", consensusLow: 53, consensusHigh: 88 },
  { name: "Ashton Gillotte", position: "EDGE", metAt: "Top 30", projected: "3rd Round", consensusLow: 61, consensusHigh: 102 },
  { name: "Jordan Burch", position: "EDGE", metAt: "Local Day", projected: "3rd Round", consensusLow: 71, consensusHigh: 71 },
  { name: "Fadil Diggs", position: "EDGE", metAt: "Pro Day", projected: "6th Round", consensusLow: 150, consensusHigh: 183 },
  { name: "Que Robinson", position: "EDGE", metAt: "Top 30", projected: "6th Round", consensusLow: 161, consensusHigh: 180 },
  { name: "BJ Green II", position: "EDGE", metAt: "Hula Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Barryn Sorrell", position: "EDGE", metAt: "Senior Bowl", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Andres Borregales", position: "K", metAt: "Unofficial", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Carson Schwesinger", position: "LB", metAt: "Top 30, Pro Day", projected: "2nd Round", consensusLow: 49, consensusHigh: 56 },
  { name: "Demetrius Knight", position: "LB", metAt: "Pro Day", projected: "3rd Round", consensusLow: 70, consensusHigh: 76 },
  { name: "Chris Paul", position: "LB", metAt: "Shrine Bowl", projected: "3rd Round", consensusLow: 82, consensusHigh: 103 },
  { name: "Jay Higgins", position: "LB", metAt: "Combine", projected: "5th Round", consensusLow: 112, consensusHigh: 195 },
  { name: "Debo Williams", position: "LB", metAt: "Pro Day", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Shemar James", position: "LB", metAt: "Top 30", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Bam Martin-Scott", position: "LB", metAt: "Pro Day", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Collin Oliver", position: "LB", metAt: "Combine", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Nick Jackson", position: "LB", metAt: "Hula Bowl", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Josh Conerly", position: "OL", metAt: "Combine", projected: "2nd Round", consensusLow: 27, consensusHigh: 36 },
  { name: "Aireontae Ersery", position: "OL", metAt: "Top 30", projected: "2nd Round", consensusLow: 18, consensusHigh: 45 },
  { name: "Marcus Mbow", position: "OL", metAt: "Combine", projected: "2nd Round", consensusLow: 47, consensusHigh: 62 },
  { name: "Ozzy Trapilo", position: "OL", metAt: "Pro Day", projected: "3rd Round", consensusLow: 90, consensusHigh: 90 },
  { name: "Willie Lampkin", position: "OL", metAt: "Senior Bowl", projected: "6th Round", consensusLow: 151, consensusHigh: 201 },
  { name: "Arvin Hosseini", position: "OL", metAt: "Pro Day", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Drew Kendall", position: "OL", metAt: "Pro Day", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Brady Cook", position: "QB", metAt: "Shrine Bowl", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Donovan Smith", position: "QB", metAt: "Unofficial", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Garrett Rooker", position: "QB", metAt: "Pro Day", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "TreVeyon Henderson", position: "RB", metAt: "Top 30", projected: "2nd Round", consensusLow: 42, consensusHigh: 43 },
  { name: "Cam Skattebo", position: "RB", metAt: "Combine", projected: "3rd Round", consensusLow: 67, consensusHigh: 72 },
  { name: "Bhayshul Tuten", position: "RB", metAt: "Senior Bowl", projected: "4th Round", consensusLow: 93, consensusHigh: 121 },
  { name: "Ollie Gordon II", position: "RB", metAt: "Top 30", projected: "4th Round", consensusLow: 93, consensusHigh: 129 },
  { name: "RJ Harvey", position: "RB", metAt: "Top 30", projected: "4th Round", consensusLow: 116, consensusHigh: 122 },
  { name: "Jarquez Hunter", position: "RB", metAt: "Top 30", projected: "6th Round", consensusLow: 162, consensusHigh: 187 },
  { name: "Jacory Croskey-Merritt", position: "RB", metAt: "Shrine Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Micah Bernard", position: "RB", metAt: "Hula Bowl", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Quinton Cooley", position: "RB", metAt: "Hula Bowl", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Malaki Starks", position: "S", metAt: "Combine", projected: "1st Round", consensusLow: 10, consensusHigh: 21 },
  { name: "Nick Emmanwori", position: "S", metAt: "Pro Day, Local Visit", projected: "1st Round", consensusLow: 23, consensusHigh: 24 },
  { name: "Billy Bowman Jr.", position: "S", metAt: "Senior Bowl", projected: "4th Round", consensusLow: 80, consensusHigh: 120 },
  { name: "Jonas Sanker", position: "S", metAt: "Top 30", projected: "4th Round", consensusLow: 106, consensusHigh: 126 },
  { name: "Tyron Herring", position: "S", metAt: "Shrine Bowl", projected: null, consensusLow: null, consensusHigh: null },
  { name: "Terrance Ferguson", position: "TE", metAt: "Top 30", projected: "3rd Round", consensusLow: 92, consensusHigh: 92 },
  { name: "Jake Briningstool", position: "TE", metAt: "Senior Bowl", projected: "5th Round", consensusLow: 114, consensusHigh: 160 },
  { name: "Luke Lachey", position: "TE", metAt: "Shrine Bowl", projected: "6th Round", consensusLow: 98, consensusHigh: 212 },
  { name: "Rivaldo Fairweather", position: "TE", metAt: "Shrine Bowl", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Tet McMillan", position: "WR", metAt: "Top 30", projected: "1st Round", consensusLow: 5, consensusHigh: 12 },
  { name: "Matthew Golden", position: "WR", metAt: "Combine", projected: "1st Round", consensusLow: 19, consensusHigh: 20 },
  { name: "Jack Bech", position: "WR", metAt: "Senior Bowl", projected: "2nd Round", consensusLow: 61, consensusHigh: 65 },
  { name: "Jaylin Noel", position: "WR", metAt: "Top 30", projected: "2nd Round", consensusLow: 66, consensusHigh: 70 },
  { name: "Jaylin Lane", position: "WR", metAt: "Local Visit", projected: "5th Round", consensusLow: 134, consensusHigh: 180 },
  { name: "Roc Taylor", position: "WR", metAt: "Hula Bowl", projected: "7th Round", consensusLow: 225, consensusHigh: 351 },
  { name: "Ali Jennings", position: "WR", metAt: "Hula Bowl", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "LaJohntay Wester", position: "WR", metAt: "Unofficial", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Sam Brown Jr.", position: "WR", metAt: "Combine", projected: "UDFA", consensusLow: null, consensusHigh: null },
  { name: "Dalevon Campbell", position: "WR", metAt: "Local Day", projected: "UDFA", consensusLow: null, consensusHigh: null },
];

// ─── Processing ─────────────────────────────────────────────────

function parseMeetings(metAtStr) {
  return metAtStr.split(',').map(s => s.trim());
}

function parseProjectedRound(projected) {
  if (!projected) return null;
  if (projected === 'UDFA') return 8;
  const match = projected.match(/(\d)/);
  return match ? parseInt(match[1]) : null;
}

function processRaw(rawData, year) {
  return rawData.map((raw, i) => {
    const meetingTypes = parseMeetings(raw.metAt);
    const touchCount = meetingTypes.length;
    const isTop30 = meetingTypes.includes('Top 30');
    const isMultiTouch = touchCount >= 2;
    const consensusMid = (raw.consensusLow && raw.consensusHigh)
      ? Math.round((raw.consensusLow + raw.consensusHigh) / 2)
      : raw.consensusLow || raw.consensusHigh || null;
    const projectedRound = parseProjectedRound(raw.projected);

    return {
      id: `${year}-${i}`,
      year,
      name: raw.name.trim(),
      position: raw.position,
      meetingTypes,
      metAt: raw.metAt,
      projected: raw.projected,
      projectedRound,
      consensusLow: raw.consensusLow,
      consensusHigh: raw.consensusHigh,
      consensusMid,
      touchCount,
      isTop30,
      isMultiTouch,
    };
  });
}

const allProspects = {
  2026: processRaw(RAW_2026, 2026),
  2025: processRaw(RAW_2025, 2025),
};

const INTEREST_WEIGHTS = {
  'Top 30': 1.0,
  'Combine': 0.7,
  'Pro Day': 0.6,
  'Senior Bowl': 0.5,
  'Shrine Bowl': 0.4,
  'American Bowl': 0.3,
  'Hula Bowl': 0.3,
  'Virtual': 0.25,
  'Local Visit': 1.0,
  'Local Day': 0.25,
  'Unofficial': 0.25,
};

function computeInterestScore(prospect) {
  const raw = prospect.meetingTypes.reduce((sum, mt) => sum + (INTEREST_WEIGHTS[mt] || 0.1), 0);
  return Math.min(Math.round(raw * 100) / 100, 2.0);
}

function getByPosition(prospects) {
  const groups = {};
  prospects.forEach(p => {
    if (!groups[p.position]) groups[p.position] = [];
    groups[p.position].push(p);
  });
  return groups;
}

function getPositions(prospects) {
  const bp = getByPosition(prospects);
  return Object.keys(bp).sort((a, b) => bp[b].length - bp[a].length);
}

export {
  allProspects,
  getByPosition,
  getPositions,
  computeInterestScore,
  POSITION_COLORS,
  MEETING_TYPES_ORDERED,
  ROUND_ORDER,
  YEARS,
};
