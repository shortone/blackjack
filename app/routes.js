var path = require('path');
var _ = require('underscore');

var Table = require('./models/table');

module.exports = function(app) {

  app.route('/api/tables').post(function(req, res) {
    var table = new Table();
    table.save(function(err, t) {
      if (err) {
        // TODO properly handle error
        res.send(err);
      }
      // TODO only return id
      res.json(_.pick(t, '_id', 'createdAt'));
    });
  });

  // default route
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
  });
};
