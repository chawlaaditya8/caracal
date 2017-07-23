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
  Event.find({}, callback);
};

EventController.getMine = function(owner, callback) {
  Event.find({
    owner_id: owner
  }, callback);
};

EventController.createEvent = function(event, owner,  callback) {
            // Make a new event
            var u = new Event();
            u.title = event.title;
            u.description = event.description;
            u.owner_id = owner;
            console.log(u.owner_id)
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


module.exports = EventController;