var	guilds = require('./guilds');
var	users = require('./users');

exports.init = function(app) {
  
  app.get('/api/guilds', function(req, res, next) {
  	guilds.guilds(req, res, next);
  });
  app.post('/api/guilds', function(req, res, next) {
    guilds.insert(req.body, res, next);
  });

  app.post('/register', function(req, res, next) {
    users.register(req.body, res, next);
  });

  app.post('/login', function(req, res, next) {
    users.login(req.body, res, next);
  });
  
};