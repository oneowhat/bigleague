var mongojs = require('mongojs');
var	config = require('../../config/config');
var	db = mongojs(config.db, ["campaigns"]);
	
exports.byUser = function(req, res, next) {
	db.campaigns.find({ users: req.params.user }, function(err, campaigns) {
    if(err) return next(err);
		res.json(campaigns);
	})
};

exports.byName = function(req, res, next) {
	db.campaigns.findOne({ name: req.params.name }, function(err, campaign) {
    if(err) return next(err);
    res.json(campaign);
	})
};

exports.insert = function(req, res, next) {
  db.campaigns.insert(req.body, function(err, item) {
    if(err) return next(err);
    res.status(201).json({ success: true });
  });
};