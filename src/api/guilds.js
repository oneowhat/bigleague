var mongojs = require('mongojs'),
	config = require('../../config/config'),
	db = mongojs(config.db, ["campaigns"])
	
exports.guilds = function(req, res, next) {
	db.campaigns.find(function(err, guilds){
		res.send(guilds);
	})
}