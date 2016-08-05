var mongojs = require('mongojs'),
	  config = require('../../config/config'),
	  db = mongojs(config.db, ["clients"]),
    crypto = require('crypto')
  
exports.byId = function(clientId, next) {
  db.clients.findOne({ clientId: clientId }, function(err, client) {
    return client;
  });
};