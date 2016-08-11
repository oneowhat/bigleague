var mongojs = require('mongojs');
var	config = require('../../config/config');
var db = mongojs(config.db, ["models"]);

exports.all = function(req, res, next) {
	db.models.find(function(err, models){
    if(err) return next(err);
		res.json(models);
	})
};

exports.byName = function(req, res, next) {
	db.models.find({ name: req.params.name }, function(err, model){
    if(err) return next(err);
		res.json(model);
	})
};

exports.insert = function(model, res, next) {
  db.models.insert(model, function(err, item) {
    if(err) return next(err);
    res.status(201).json({ success: true });
  });
};