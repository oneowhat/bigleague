var mongojs = require('mongojs');
var	config = require('../../config/config');
var	db = mongojs(config.db, ["campaigns"]);
	
exports.byUser = function(req, res, next) {
	db.campaigns.find({ 
    $or: [
      { coaches: { name: req.params.coach } },
      { longshanks: req.params.coach }
    ]
  }, function(err, campaigns) {
    if(err) return next(err);
		res.json(campaigns);
	})
};

exports.byTitle = function(req, res, next) {
	db.campaigns.findOne({ title: req.params.title }, function(err, campaign) {
    if(err) return next(err);
    res.json({ campaign: campaign });
	})
};

exports.insert = function(req, res, next) {
  db.campaigns.insert(req.body, function(err, item) {
    if(err) return next(err);
    res.status(201).json({ success: true });
  });
};

exports.update = function(req, res, next) {
  var campaign = req.body;
  db.campaigns.findAndModify({
    query: { _id: mongojs.ObjectId(campaign._id) },
    update: {
      $set: { 
        title: campaign.title, 
        acceptJoinRequests: campaign.acceptJoinRequests,
        location: campaign.location,
        joinCode: campaign.joinCode 
      }
    }
  }, function(err, doc, lastError) {
    if(err) return next(err);
    res.status(200).send({ success: true });
  });
}