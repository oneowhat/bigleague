import config from '../config/config.js';

export var store = {
  api: config.api,
  user: {
    id: '',
    name: '',
    email: '',
    admin: false,
    token: null,
    authenticated: false
  },
  guilds: [
    {
      name: "Alchemist's",
      active: true,
      captains: [
        { name: 'Midas' },
        { name: 'Smoke' },
      ],
      mascots: [
        { name: 'Flask' },
        { name: 'Naja' },
      ],
      players: [
        { name: 'Calculus' },
        { name: 'Compound' },
        { name: 'Katalyst' },
        { name: 'Mercury' },
        { name: 'Venin' },
        { name: 'Veteran Katalyst' },
        { name: 'Vitriol' }
      ],
      plots: [
        { name: 'Hidden Knowledge' },
        { name: 'Lead to Gold' },
        { name: 'Mixology' },
        { name: 'Recipe for Success' },
        { name: 'Smoke and Mirrors' },
        { name: 'Blindingly Obvious' },
        { name: 'Checking for Blood' }
      ]
    },
    {
      name: "Brewer's",
      active: true,
      captains: [
        { name: 'Esters' },
        { name: 'Tapper' }
      ],
      mascots: [
        { name: 'Scum' },
        { name: 'Quaff' }
      ],
      players: [
        { name: 'Friday' },
        { name: 'Hooper' },
        { name: 'Mash' },
        { name: 'Spigot' },
        { name: 'Stave' },
        { name: 'Stoker' },
        { name: 'Veteran Spigot' }
      ],
      plots: [
        { name: 'Off-Kilter' },
        { name: 'Down and Out' },
        { name: 'Bad Pint' },
        { name: 'Over the Line' },
        { name: 'All Fall Down' },
        { name: 'Feeling the Heat' },
        { name: 'Remembering the Old Grumpy Cat' }
      ]
    },
    {
      name: "Butcher's",
      active: true,
      captains: [
        { name: 'Fillet' },
        { name: 'Ox' }
      ],
      mascots: [
        { name: 'Princess' },
        { name: 'Truffles' }
      ],
      players: [
        { name: 'Boar' },
        { name: 'Boiler' },
        { name: 'Brisket' },
        { name: 'Meathook' },
        { name: 'Shank' },
        { name: 'Tenderizer' },
        { name: 'Veteran Brisket' }
      ],
      plots: [
        { name: 'Hangry?' },
        { name: 'Slick with Blood' },
        { name: 'Leaving the Boot In...' },
        { name: 'Tough Meat' },
        { name: 'Bone Crushing Tackle' },
        { name: 'In Erskirii, the Hook Suffer You' },
        { name: 'Ye Olde Pain Train' }
      ]
    },
    {
      name: "Engineer's",
      active: true,
      captains: [
        { name: 'Ballista' },
        { name: 'Pin Vice' }
      ],
      mascots: [
        { name: 'Mainspring' },
        { name: 'Mother' }
      ],
      players: [
        { name: 'Colossus' },
        { name: 'Compound' },
        { name: 'Hoist' },
        { name: 'Ratchet' },
        { name: 'Salvo' },
        { name: 'Velocity' },
        { name: 'Veteran Velocity' }
      ],
      plots: [
        { name: 'Spring-Loaded' },
        { name: 'Creation/Destruction' },
        { name: 'Synchronicity' },
        { name: 'Bolt Action' },
        { name: 'All ABout the Base' },
        { name: 'Tickets to the Gun Show' },
        { name: 'Mokojin' }
      ]
    },
    {
      name: "Farmer's",
      active: false,
      captains: [],
      mascots: [],
      players: [
        { name: 'Tater' }
      ]
    },
    {
      name: "Fisherman's",
      active: true,
      captains: [
        { name: 'Corsair' },
        { name: 'Shark' }
      ],
      mascots: [
        { name: 'Salt' },
        { name: 'Tentacles' }
      ],
      players: [
        { name: 'Angel' },
        { name: 'Greyscales' },
        { name: 'Jac' },
        { name: 'Kraken' },
        { name: 'Sakana' },
        { name: 'Siren' },
        { name: 'Veteran Siren' }
      ],
      plots: [
        { name: 'Sea Breeze' },
        { name: 'Catch of the Day' },
        { name: 'Baiting Up' },
        { name: 'Chumming the Water' },
        { name: 'Showboating' },
        { name: 'Popular' },
        { name: 'Slippery Fish' }
      ]
    },
    {
      name: "Hunter's",
      active: true,
      captains: [
        { name: 'Theron' }
      ],
      mascots: [
        { name: 'Fahad' }
      ],
      players: [
        { name: 'Chaska' },
        { name: 'Egret' },
        { name: 'Hearne' },
        { name: 'Jaecar' },
        { name: 'Seenah' },
        { name: 'Zarola' }
      ],
      plots: [
        { name: 'Favour of the Sun Father' },
        { name: 'Hit the Mark' },
        { name: 'Swift as Shadows' },
        { name: 'Bear Foot Training' },
        { name: 'Rascally Rabbit' },
        { name: 'Traps, Traps Everywhere' },
        { name: 'And His Name Is...' }
      ]
    },
    {
      name: "Mason's",
      active: true,
      captains: [
        { name: 'Hammer' },
        { name: 'Honour' }
      ],
      mascots: [
        { name: 'Marbles' },
        { name: 'Wrecker' }
      ],
      players: [
        { name: 'Brick' },
        { name: 'Chisel' },
        { name: 'Flint' },
        { name: 'Harmony' },
        { name: 'Mallet' },
        { name: 'Tower' },
        { name: 'Veteran Harmony' },
      ],
      plots: [
        { name: 'Bonded' },
        { name: 'Building Play' },
        { name: 'Laying the Foundation' },
        { name: 'Hunker Down' },
        { name: 'Rock of Ages' },
        { name: 'Distant Friends' },
        { name: 'Sister Act' }
      ]
    },
    {
      name: "Mortician's",
      active: true,
      captains: [
        { name: 'Obulus' },
        { name: 'Scalpel' }
      ],
      mascots: [
        { name: 'Dirge' },
        { name: 'Vileswarm' }
      ],
      players: [
        { name: 'Bonesaw' },
        { name: 'Casket' },
        { name: 'Cosset' },
        { name: 'Ghast' },
        { name: 'Graves' },
        { name: 'Silence' },
        { name: 'Veteran Graves' },
      ],
      plots: [
        { name: 'Shroud' },
        { name: 'Angry Dead' },
        { name: 'Paying Respects' },
        { name: 'Unsettled Debts' },
        { name: 'Deathly Pallor' },
        { name: 'Bella Tricks' },
        { name: 'Room for Two' }
      ]
    },
    {
      name: "The Union",
      active: true,
      captains: [
        { name: 'Blackheart' },
        { name: 'Veteran Rage' }
      ],
      mascots: [
        { name: 'Coin' },
        { name: 'Strongbox' }
      ],
      players: [
        { name: 'Avarisse', selective: ["Alchemist's", "Brewer's", "Butcher's", "Engineer's", "Farmer's", "Fisherman's", "Hunter's", "Mason's", "Mortician's"] },
        { name: 'Decimate', selective: ["Alchemist's", "Butcher's", "Engineer's", "Mason's"] },
        { name: 'Fangtooth', selective: ["Brewer's", "Fisherman's", "Mortician's"] },
        { name: 'Greede', selective: ["Alchemist's", "Brewer's", "Butcher's", "Engineer's", "Farmer's", "Fisherman's", "Hunter's", "Mason's", "Mortician's"] },
        { name: 'Gutter', selective: ["Brewer's", "Butcher's", "Engineer's", "Fisherman's"] },
        { name: 'Harry "The Hat"', selective: ["Alchemist's", "Brewer's", "Butcher's", "Engineer's"] },
        { name: 'Hemlocke', selective: ["Alchemist's", "Brewer's", "Fisherman's", "Hunter's"] },
        { name: 'Minx', selective: ["Butcher's", "Hunter's", "Mason's", "Mortician's"] },
        { name: 'Mist', selective: ["Alchemist's", "Mason's", "Mortician's"] },
        { name: 'Rage', selective: ["Brewer's", "Butcher's", "Engineer's", "Mortician's"] },
        { name: 'Snakeskin', selective: ["Alchemist's", "Fisherman's", "Mason's"] }
      ],
      plots: [
        { name: 'Show Me the Money!' },
        { name: 'One for the Money' },
        { name: 'In the Small Print' },
        { name: 'Payday' },
        { name: 'Going Rogue' },
        { name: 'Decimated' },
        { name: 'Route One' }
      ]
    }
  ],
  campaignPlots: {
    common: [
      { name: 'The Beautiful Game' },
      { name: 'Winning Ugly' },
      { name: 'Defensive Drills' },
      { name: 'Double Down' },
      { name: 'One With the Left, One With the Right' },
      { name: 'Two Footed Tackle' },
      { name: 'Starting From the Back' },
      { name: 'One for the Crowd' },
      { name: 'Statement of Intent' },
      { name: 'It\'s Unbelievable Geoff!' }
    ],
    rare: [
      { name: 'Homework Done' },
      { name: 'Blind Eye' },
      { name: 'Poisoned Chalice' },
      { name: 'Jumping the Whistle' },
      { name: 'He Did What!?' },
      { name: 'From the Half Way Line' }
    ]
  },
  defaultError: 'Something went wrong :(',
  genders: [
    'Female',
    'Male',
    'Neutral'
  ],
  positions: [
    'Attacking Midfielder',
    'Captain',
    'Goalkeeper',
    'Mascot',
    'Striker',
    'Winger'
  ]
};

export var bl = {

  first: function (arr, predicate) {
    var i, l = arr.length;
    for (i = 0; i < l; i++) {
        if (predicate(arr[i])) {
            return arr[i];
        }
    }
  },

  any: function (arr, predicate) {
    return sol.first(arr, predicate) !== undefined;
  },

  clone: function (obj) {
    var str = JSON.stringify(obj),
      copy = JSON.parse(str);

    return copy;
  }

};
