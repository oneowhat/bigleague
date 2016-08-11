var mongojs = require('mongojs');
var	config = require('../../config/config');
var	db = mongojs(config.db, ["players"]);
	
exports.all = function(req, res, next) {
	db.players.find(function(err, players){
    if(err) return next(err);
		res.json(players);
	})
};

exports.byName = function(req, res, next) {
	db.players.findOne({ name: req.params.name }, function(err, player){
    if(err) return next(err);
    res.json(player);
	})
};

exports.insert = function(player, res, next) {
  db.player.insert(players, function(err, item) {
    if(err) return next(err);
    res.status(201).json({ success: true });
  });
};