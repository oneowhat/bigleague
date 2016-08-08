var oauth2orize = require('oauth2orize'),
    passport = require('passport'),
    crypto = require('crypto'),
    config = require('../../config/config');
    
var server = oauth2orize.createServer();