// MODULES
// ==============================================
var express = require('express');
var app = express();

// CONFIGURATIONS
// ==============================================
var port = process.env.PORT || 8080;

// setup static files location
app.use(express.static(__dirname + '/public'));

// ROUTES
// ==============================================
app.route('/api').get(function(req, res) {
  res.json({
    message: 'This is it!!'
  });
});

// START SERVER
// ==============================================
app.listen(port);
