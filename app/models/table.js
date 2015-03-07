var mongoose = require('mongoose');

module.exports = mongoose.model('Table', {
  players: [],
  shoe: [],
  dealer: {},
  createdAt: {
    type: Date,
    default: Date.now
  }
});
