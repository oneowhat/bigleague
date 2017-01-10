import config from '../config/config.js';

// TODO: add campaign plot availability

export var store = {
  api: config.api,
  currentMessage: '',
  user: {
    id: '',
    name: '',
    email: '',
    admin: false,
    token: null,
    authenticated: false
  },
  guilds: [],
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
