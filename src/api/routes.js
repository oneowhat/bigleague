var	guilds = require('./guilds');
var	models = require('./models');
var	users = require('./users');
var	campaigns = require('./campaigns');
var	players = require('./players');

exports.init = function(app) {
  
  // guilds
  app.get('/api/guilds', function(req, res, next) {
  	guilds.all(req, res, next);
  });
  app.get('/api/guilds/:guild', function(req, res, next) {
  	guilds.byName(req, res, next);
  });
  app.post('/api/guilds', function(req, res, next) {
    guilds.insert(req.body, res, next);
  });
  
  // models
  app.get('/api/models', function(req, res, next) {
    models.all(req, res, next);
  });
  app.get('/api/models/:name', function(req, res, next) {
    models.byName(req, res, next);
  });
  app.post('/api/models', function(req, res, next) {
    models.insert(req.body, res, next);
  });
  
  // campaigns
  app.get('/api/campaigns', function(req, res, next) {
    campaigns.all(req, res, next);
  });
  app.get('/api/campaigns/:name', function(req, res, next) {
    campaigns.byName(req, res, next);
  });
  app.post('/api/campaigns', function(req, res, next) {
    campaigns.insert(req.body, res, next);
  });
  
  // players
  app.get('/api/players', function(req, res, next) {
    players.all(req, res, next);
  });
  app.get('/api/players/:name', function(req, res, next) {
    players.byName(req, res, next);
  });
  app.post('/api/players', function(req, res, next) {
    players.insert(req.body, res, next);
  });
  
  // users
  app.post('/register', function(req, res, next) {
    users.register(req.body, res, next);
  });

  app.post('/login', function(req, res, next) {
    users.login(req.body, res, next);
  });
  
};