var mongojs = require('mongojs'),
	config = require('../../config/config'),
	db = mongojs(config.db, ["guilds"])
	
exports.guilds = function(req, res, next) {
	db.guilds.find(function(err, guilds){
    if(err) return next(err);
		res.json(guilds);
	})
}

exports.insert = function(res, guild, next){
  db.guilds.insert(guild, function(err, item){
    console.log(item);
    if(err) return next(err);
    res.json("OK");
  });
}