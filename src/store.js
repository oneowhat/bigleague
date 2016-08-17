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
        { name: 'Midas' }
      ],
      players: [
        { name: 'Calculus' },
        { name: 'Mercury' },
        { name: 'Calculus' },
        { name: 'Calculus' },
        { name: 'Calculus' },
        { name: 'Calculus' },
        { name: 'Calculus' },
      ],
      mascots: [
        { name: 'Flask' }
      ]
    },
    {
      name: "Brewer's", 
      active: true, 
      captains: [
        { name: 'Esters' },
        { name: 'Tapper' }
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
      mascots: [
        { name: 'Scum' },
        { name: 'Quaff' }
      ]
    },
    { 
      name: "Butcher's", 
      active: true,
      captains: [
        { name: 'Fillet' },
        { name: 'Ox' }
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
      mascots: [
        { name: 'Princess' },
        { name: 'Truffles' }
      ]
    },
    { 
      name: "Engineer's", 
      active: true,
      captains: [],
      players: [],
      mascots: [] 
    },
    { 
      name: "Farmer's", 
      active: false,
      captains: [],
      players: [
        { name: 'Tater' }
      ],
      mascots: []
    },
    { 
      name: "Fisherman's",
      active: true,
      captains: [],
      players: [],
      mascots: []
    },
    { 
      name: "Hunter's", 
      active: true,
      captains: [],
      players: [],
      mascots: [] 
    },
    { 
      name: "Mason's", 
      active: true,
      captains: [
        { name: 'Honour' }
      ],
      players: [
        { name: 'Chisel' }
      ],
      mascots: [
        { name: 'Marbles' }
      ]
    },
    { 
      name: "Mortician's", 
      active: true,
      captains: [
        { name: 'Obulus' }
      ],
      players: [],
      mascots: [] 
    },
    { 
      name: "The Union", 
      active: true,
      captains: [
        { name: 'Blackheart' },
        { name: 'Veteran Rage' }
      ],
      players: [
        { name: 'Avarisse' },
        { name: 'Greede' },
        { name: 'Decimate' },
        { name: 'Rage' },
        { name: 'Gutter' },
        { name: 'Hemlock' },
        
      ],
      mascots: [] 
    }
  ],
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

