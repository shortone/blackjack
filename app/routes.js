var path = require('path');
var _ = require('underscore');

var Table = require('./models/table');

module.exports = function(app) {

  app.route('/api/tables').post(function(req, res) {
    var table = new Table();
    table.shoe = req.body.shoe;

    table.save(function(err, t) {
      if (err) {
        // TODO properly handle error
        res.send(err);
      }
      res.json(_.pick(t, '_id', 'createdAt'));
    });
  });

  app.route('/api/tables/:id').get(function(req, res) {
    Table.find({'_id': req.params.id}, function(err, t) {
      if (err) {
        res.send(err);
      }
      res.json(_.pick(t, '_id', 'createdAt'));
    });
  });

  // default route
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
  });
};
