var express = require('express');
var	bodyParser = require('body-parser');
var	mongojs = require('mongojs');
var	config = require('./config/config');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var routes = require('./src/api/routes');

var	db = mongojs(config.db);
var	app = express();
  
var cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,HEAD');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  next();
}

app.use(bodyParser.urlencoded({
	"extended": false	
}));
app.use(expressJWT({ secret: config.secret })
  .unless({ path: ['/login', '/register'] })
);
app.use(bodyParser.json());
app.use(cors);
app.use(express.static(__dirname + '/public'));

routes.init(app);

app.listen(process.env.PORT || 3000);