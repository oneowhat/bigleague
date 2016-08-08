var config = require('../../config/config'),
    passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy,,
    clients = require('./clients')
    users = require('./users')
    accessTokens = require('./tokens');
    
// client authentication
passport.use(new BasicStrategy(
  function(username, password, done) {
    var client = clients.byId(username);
    if(!client || client.secret != password) 
      return done(null, false);
    
    return done(null, client);
  }
));

// client password authentication
passport.use(new ClientPasswordStrategy(
  function(clientId, secret, done) {
    var client = clients.byId(clientId);
    if(!client || client.secret != secret) 
      return done(null, false);
    
    return done(null, client);
  }
));

// bearer token 
passport.use(new BearerStrategy(
  function(token, done){
    var accessToken = accessTokens.byToken(token, done);
    if(!accessToken)
      return done(null, false);
    
    var expireTime = Math.round((Date.now() - token.createdAt)/1000);
    if(expireTime > config.security.tokenLife){
      accessTokens.remove(accessToken);
      return done(null, false, { message: 'Token expired' });
    }
    
    var user = users.byId(accessToken.userId, function(err, user) {
      if(err) 
        return done(err);
      
      if(!user) 
        return done(null, false, { message: 'Unknown user' });
      
      done(null, user, { scope: '*' });
    });
  }
));