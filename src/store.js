import config from '../config/config.js';

export var store = {
  api: config.api,
  user: {
    email: '',
    admin: false,
    token: null,
    authenticated: false
  },
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

