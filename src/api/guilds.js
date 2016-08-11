var mongojs = require('mongojs');
var	config = require('../../config/config');
var	db = mongojs(config.db, ["guilds", "models"]);
	
exports.guilds = function(req, res, next) {
	db.guilds.find(function(err, guilds){
    if(err) return next(err);
		res.json(guilds);
	})
};

exports.guild = function(req, res, next) {
	db.guilds.findOne({ name: req.params.guild }, function(err, guild){
    if(err) return next(err);
    if(guild) {
      db.models.find({ guild: req.params.guild }, function(err, models) {
        if(err) return next(err);
        res.json({
          guild: guild,
          models: models
        });
      });
    }
	})
};

exports.insert = function(guild, res, next) {
  db.guilds.insert(guild, function(err, item) {
    if(err) return next(err);
    res.status(201).json({ success: true });
  });
};