var mongoose = require('mongoose');
var validator = require('validator');


var schema = new mongoose.Schema({
  name: {
    type: String,
    min: 1,
    max: 100,
  },

  description: {
    type: String,
    min: 0,
    max: 300
  },

});

module.exports = mongoose.model('Event', schema);
