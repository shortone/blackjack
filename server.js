// MODULES
// ==============================================
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// CONFIGURATIONS
// ==============================================
var port = process.env.PORT || 8080;

// setup static files location
app.use(express.static(__dirname + '/public'));

// ROUTES
// ==============================================
require('./app/routes')(app);
require('./app/sockets')(io);

// START SERVER
// ==============================================
http.listen(port);
