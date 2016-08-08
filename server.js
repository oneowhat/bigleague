var express = require('express');
var	bodyParser = require('body-parser');
var	mongojs = require('mongojs');
var	config = require('./config/config');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var	db = mongojs(config.db);
var	app = express();
  
var cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  next();
}
	
var	guilds = require('./src/api/guilds');
var	users = require('./src/api/users');

app.use(bodyParser.urlencoded({
	"extended": false	
}));
app.use(expressJWT({ secret: config.secret })
  .unless({ path: ['/login', '/register'] })
);
app.use(bodyParser.json());
app.use(cors);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next){
	guilds.guilds(req, res, next);
});

app.post('/register', function(req, res, next) {
  users.register(req.body, res, next);
});

app.post('/login', function(req, res, next) {
  users.login(req.body, res, next);
});

app.listen(process.env.PORT || 3000);