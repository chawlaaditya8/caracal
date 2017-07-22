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

EventController.createEvent = function(name, description, owner,  callback) {
            // Make a new event
            var u = new Event();
            u.name = name;
            u.description = description;
            u.owner = owner;
            u.save(function(err) {
                if (err) {
                    return callback(err);
                } else {
                    // yay! success.
                    // var token = u.generateAuthToken();

                    // Send over a verification email
                    // var verificationToken = u.generateEmailVerificationToken();
                    // Mailer.sendVerificationEmail(email, verificationToken);

                    return callback(
                        null, {
                            // token: token,
                            event: u
                        }
                    );
                }

            });
};


module.exports = EventController;