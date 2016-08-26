var mongojs = require('mongojs');
var	config = require('../../config/config');
var	db = mongojs(config.db, ["campaigns", "coaches"]);

const DUMMY = -1;

exports.create = function(req, res, next) {
  db.campaigns.find({ _id: mongojs.ObjectId(req.body.campaign) }, function(err, campaign) {
    if(err) return next(err);
    db.coaches.find({ campaign_id: req.body.campaign }, function(err, coaches) {
      if(err) return next(err);
      if(campaign && coaches) {
        var rounds = generateSchedule(campaign, coaches);
        db.campaigns.findAndModify({
          query: { _id: mongojs.ObjectId(req.body.campaign) },
          update: {
            $set: { rounds: rounds }
          }
        }, function(err, doc, lastErr) {
          if(err) return next(err);
          res.status(201).send(rounds);
        });
      }
    });
  });
}

function generateSchedule(campaign, coaches) {
  var rounds = [];
  var n = coaches.length;
  var pairs = [];

  coaches.forEach(function(coach) {
    pairs.push(coach._id);
  });

  if (n % 2 === 1) {
    pairs.push(DUMMY); // so we can match algorithm for even numbers
    n += 1;
  }
  for (var j = 0; j < n - 1; j += 1) {
    rounds[j] = []; // create inner match array for round j
    for (var i = 0; i < n / 2; i += 1) {
      if (pairs[i] !== DUMMY && pairs[n - 1 - i] !== DUMMY) {
        rounds[j].push([pairs[i], pairs[n - 1 - i]]); // insert pair as a match
      }
    }
    pairs.splice(1, 0, pairs.pop()); // permutate for next round
  }

  return rounds;
}
