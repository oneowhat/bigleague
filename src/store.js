import config from '../config/config.js';

export var store = {
  api: config.api,
  user: {
    email: '',
    admin: false,
    token: null,
    authenticated: false
  },
  guilds: [],
  campaigns: [],
  players: [],
  matches: []
};

