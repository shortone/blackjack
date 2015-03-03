var mongoose = require('mongoose');

module.exports = mongoose.model('Table', {
  players: [],
  shoe: [],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
