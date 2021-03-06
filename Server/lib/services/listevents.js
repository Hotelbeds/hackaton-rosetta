'use strict';

/*
 * List Eventbrite events service
 *
 * Created by dcastro on 20/3/15.
 */
var config = require('../../config.js');
var utils = require('../utils/utils');
var eventbriteAPI = require('node-eventbrite');
var Log = require('log');

// globals
var log = new Log(config.logLevel);

try {
    var api = eventbriteAPI({
        token: config.evenbriteAuth,
        version : 'v3'
    });
} catch (error) {
    log(error.message); // the options are missing, this function throws an error.
}

/**
 * Sends a request to Eventbrite for list events on given coordinates
 * @param parameters[required] A dictionary with the parameters of the request. latitude, longitude & distance.
 * @param callback[required] A callback following the template (error, result) to return the results.
 */
exports.sendRequest = function (parameters, callback) {
    if (typeof parameters.latitude === 'undefined' )
        return callback('latitude is mandatory', null);

    if (typeof parameters.longitude === 'undefined' )
        return callback('longitude is mandatory', null);

    if (typeof parameters.radius === 'undefined' )
        return callback('radius is mandatory', null);

    var eventSearch = {
        'location.latitude': parameters.latitude,
        'location.longitude':parameters.longitude,
        'location.within':parameters.radius+'km'
    }

    if (typeof parameters.categoryId != 'undefined' )
        eventSearch.categories=parameters.categoryId;

    api.search(eventSearch, function (error, data) {
        if (error) {
            console.log(error.message);
            return callback(error, data);
        } else {

            var events = new Array();
            for (var i in data.events) {
                var ebevent = data.events[i];

                events.push(utils.buildEvent(ebevent));

            }
            console.log(events); // Print the events
            return callback(null,events);
        }
    });
};