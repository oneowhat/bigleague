var	guilds = require('./guilds');
var	models = require('./models');
var	users = require('./users');
var	campaigns = require('./campaigns');
var	coaches = require('./coaches');

exports.init = function(app) {
  
  // guilds
  app.get('/api/guilds', guilds.find);
  app.get('/api/guilds/:guild', guilds.byName);
  app.post('/api/guilds', guilds.insert);
  
  // models
  app.get('/api/models', models.find);
  app.get('/api/models/:name', models.byName);
  app.post('/api/models', models.insert);
  
  // campaigns
  app.get('/api/campaigns/:coach', campaigns.byUser);
  app.get('/api/campaigns/:name', campaigns.byName);
  app.post('/api/campaigns', campaigns.insert);
  
  // players
  app.get('/api/coaches', coaches.find);
  app.get('/api/coaches/:name', coaches.byName);
  app.post('/api/coaches', coaches.insert);
  
  // users
  app.post('/register', users.register);
  app.post('/login', users.login);
  
};