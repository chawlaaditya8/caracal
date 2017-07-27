var _ = require('underscore');
var Logs = require('../models/Logs');
var Settings = require('../models/Settings');
var Mailer = require('../services/email');
var Stats = require('../services/stats');

var validator = require('validator');
var moment = require('moment');

var LogsController = {};

/**
 * Get all Logs.
 * It's going to be a lot of data, so make sure you want to do this.
 * @param  {Function} callback args(err, Event)
 */
// EventController.getAll = function(callback) {
//   Event.find({}, callback);
// };

// EventController.getMine = function(owner, callback) {
//   Event.find({
//     owner_id: owner
//   }, callback);
// };

LogsController.createLog = function(log, callback) {
            // Make a new event
            var u = new Logs();
            u.ip = log.ip;
            u.method = log.method;
            u.token = log.token;
            u.url = log.url;
            // u.body = log.body;
            u.method = log.method;
            u.save(function(err) {
                if (err) {
                    return callback(err);
                } else {
                    // yay! success.
                    return callback(
                        null, {
                            log: u
                        }
                    );
                }

            });
};


module.exports = LogsController;