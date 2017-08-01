var mongoose = require('mongoose');
var validator = require('validator');

var schema = new mongoose.Schema({
  title: {
    type: String,
    min: 1,
    max: 100,
  },

  description: {
    type: String,
    min: 0,
    max: 300
  },

  owner_id: {
    type: String,
    min: 1,
    max: 200,
  },

  status: {
    type: String,
    min: 1,
    max: 100,
  }

});

schema.set('toJSON', {
  virtuals: true
});

schema.set('toObject', {
  virtuals: true
});
module.exports = mongoose.model('Event', schema);
