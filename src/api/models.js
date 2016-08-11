var mongojs = require('mongojs');
var	config = require('../../config/config');
var db = mongojs(config.db, ["models"]);

exports.models = function(req, res, next) {
	db.guilds.find(function(err, models){
    if(err) return next(err);
		res.json(models);
	})
}

exports.insert = function(model, res, next) {
  db.model.insert(model, function(err, item) {
    if(err) return next(err);
    res.status(201).json({ success: true });
  });
};