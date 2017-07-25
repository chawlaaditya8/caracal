var mongoose = require('mongoose');
var validator = require('validator');

var schema = new mongoose.Schema({
  method: {
    type: String,
    min: 1,
    max: 100,
  },

  url: {
    type: String,
    min: 0,
    max: 300
  },

  token: {
    type: String,
    min: 0,
    max: 300
  },

  ip: {
    type: String,
    min: 0,
    max: 300
  },

  body: {
    type: String,
    min: 1,
    max: 2000,
  }

});

schema.set('toJSON', {
  virtuals: true
});

schema.set('toObject', {
  virtuals: true
});
module.exports = mongoose.model('Logs', schema);
