var express = require('express'),
	bodyParser = require('body-parser'),
	mongojs = require('mongojs'),
	config = require('./config/config'),
	db = mongojs(config.db),
	app = express();
  
var cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
	
var	guilds = require('./src/api/guilds');

app.use(bodyParser.urlencoded({
	"extended": false	
}));
app.use(bodyParser.json());
app.use(cors);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next){
	guilds.guilds(req, res, next);
});

app.post('/insert', function(req, res, next){
  guilds.insert(res, { "name": "Masons" }, next);
});

app.post

app.listen(process.env.PORT || 3000);