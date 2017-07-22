var mongoose = require('mongoose');
var validator = require('validator');


var owner = [{

  // Basic info
  owner_id: {
    type: String,
    min: 1,
    max: 100,
  }

}];

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

  owner: owner

});

schema.set('toJSON', {
  virtuals: true
});

schema.set('toObject', {
  virtuals: true
});
module.exports = mongoose.model('Event', schema);
