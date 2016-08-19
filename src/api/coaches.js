var mongojs = require('mongojs');
var	config = require('../../config/config');
var	db = mongojs(config.db, ["coaches"]);
	
exports.forCampaign = function(req, res, next) {
	db.coaches.find({ campaign: req.campaign }, function(err, coaches){
    if(err) return next(err);
		res.json(coaches);
	})
};

exports.byName = function(req, res, next) {
	db.coaches.findOne({ name: req.params.name }, function(err, coach){
    if(err) return next(err);
    res.json(coach);
	})
};

exports.insert = function(req, res, next) {
  db.coaches.insert(req.body, function(err, item) {
    if(err) return next(err);
    res.status(201).json({ success: true });
  });
};