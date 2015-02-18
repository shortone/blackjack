var mongoose = require('mongoose');

module.exports = mongoose.model('Table', {
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
