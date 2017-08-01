var _ = require('underscore');
var Event = require('../models/Event');
var Settings = require('../models/Settings');
var Mailer = require('../services/email');
var Stats = require('../services/stats');

var validator = require('validator');
var moment = require('moment');

var EventController = {};

/**
 * Get all Events.
 * It's going to be a lot of data, so make sure you want to do this.
 * @param  {Function} callback args(err, Event)
 */
EventController.getAll = function(callback) {
  Event.find({
    status: "active"
  }, callback);
};

EventController.getMine = function(owner, callback) {
  Event
  .where('owner_id').gte(owner)
  .where('status').in(['active', 'inactive'])
  .exec(callback);
};

EventController.createEvent = function(title, description, owner,  callback) {
            // Make a new event
            var u = new Event();
            u.title = title;
            u.description = description;
            u.owner_id = owner;
            u.status = "inactive";
            u.save(function(err) {
                if (err) {
                    return callback(err);
                } else {
                    // yay! success.
                    return callback(
                        null, {
                            event: u
                        }
                    );
                }

            });
};

EventController.getById = function (id, callback){
  Event.findById(id, callback);
};

EventController.deleteEvent = function (id, callback){
  Event.findOneAndUpdate({
      _id: id,
    },{
      $set: {
        status: "deleted"
      }
    },
    callback);

};

EventController.activateEvent = function (id, callback){
  Event.findOneAndUpdate({
      _id: id,
    },{
      $set: {
        status: "active"
      }
    },
    callback);

};

module.exports = EventController;