// MODULES
// ==============================================
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

// CONFIGURATIONS
// ==============================================
var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/blackjack');

// get all data/stuff of the body parameters
// parse application/json
app.use(bodyParser.json());
// setup static files location
app.use(express.static(__dirname + '/public'));

// ROUTES
// ==============================================
require('./app/routes')(app);
require('./app/sockets')(io);

// START SERVER
// ==============================================
http.listen(port);
