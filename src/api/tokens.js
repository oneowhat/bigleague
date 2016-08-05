var mongojs = require('mongojs'),
	  config = require('../../config/config'),
	  db = mongojs(config.db, ["accessToken"]),
    crypto = require('crypto')
  
exports.byToken = function(token, next) {
  db.accessTokens.findOne({ token: token }, function(err, accessToken) {
    if(err) return next(err);
    return accessToken;
  });
};

exports.remove = function(accessToken, next){
  db.accessTokens.remove({ token: accessToken.token }, function(err) {
    if(err) return next(err);
  });
};