var mongojs = require('mongojs'),
	  config = require('../../config/config'),
	  db = mongojs(config.db, ["users"]),
    crypto = require('crypto')
  
exports.register = function(newUser, res, next) {
  var user = {
    email: newUser.email,
    salt: crypto.randomBytes(32).toString('hex'),
    createdAt: Date.now,
    confirmed: false
  };
  user.hashedPassword = encryptPassword(newUser.password, user.salt);
  db.users.insert(user, function(err, item) {
    if(err) return next(err);
    res.send({success: true});
  });
};
/*
exports.login = function(attempt, next){
  db.users.findOne({email: attempt.email}, function(err, user){
    if(err) return next(err);
    if(user && checkPassword(user, attempt.password)){
      //res.send({success: true});
    }
  });
};
*/

exports.byId = function(userId, done) {
  db.users.findOne({ _id: mongojs.ObjectId(userId) }, function(err, user) {
    if(err) return done(err);
    if(user) {
      done(null, user);
    } 
  });
};

function encryptPassword(password, salt) {
  return crypto
    .createHmac('sha256', salt)
    .update(password)
    .digest('hex');
}

function checkPassword(user, password) {
  return encryptPassword(password, user.salt) === user.hashedPassword;
}