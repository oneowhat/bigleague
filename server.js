var express = require('express'),
	bodyParser = require('body-parser'),
	mongojs = require('mongojs'),
	config = require('./config/config'),
	db = mongojs(config.db),
	cors = require('cors'),
	app = express();
	
var	guilds = require('./src/api/guilds');

var corsOpts = {
	origin: "http://localhost:8080"
};

app.use(bodyParser.urlencoded({
	"extended": false	
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', cors(corsOpts), function(req, res, next){
	guilds.guilds(req, res, next);
});

app.listen(process.env.PORT || 3000);