'use strict';

/*
 * List Eventbrite categories service
 *
 * Created by dcastro on 20/3/15.
 */
var config = require('../../config.js');
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


    var request = require('request');

    // Ñapa: the Eventbrite node module is failing retrieving categories; we have to call natively...
    var options = {
        uri: 'https://www.eventbriteapi.com/v3/categories/?token='+config.evenbriteAuth,
        method: 'GET',
        json: true
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var categories = new Array();

            for (var i in body.categories) {
                var ebcategory = body.categories[i];

                categories.push({
                    id:ebcategory.id,
                    name:ebcategory.name,
                    shortname:ebcategory.short_name_localized
                });

            }
            console.log(categories) // Print the shortened url.
            return callback(null,categories);

        } else {
            console.error(error);
            callback(error,null);
        }
    });
};