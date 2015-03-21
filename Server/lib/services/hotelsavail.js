/**
 * Created by dcastro on 20/3/15.
 */


/*
 * List hotels for a certain event service
 *
 * Created by dcastro on 20/3/15.
 */
var config = require('../../config.js');
var utils = require('../utils/utils');
var eventbriteAPI = require('node-eventbrite');
var Log = require('log');
var request = require('request');

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
 * Sends a request to Rosetta for a given latitude, longitude, radius, dates and paxes returns hotels in the nearby
 * @param parameters[required] A dictionary with the parameters of the request. event id, radius, paxes.
 * @param callback[required] A callback following the template (error, result) to return the results.
 */
exports.sendRequest = function (parameters, callback) {
    if (typeof parameters.latitude === 'undefined' )
        return callback('latitude is mandatory', null);
    if (typeof parameters.longitude === 'undefined' )
        return callback('longitude is mandatory', null);
    if (typeof parameters.paxes === 'undefined' )
        return callback('paxes is mandatory', null);
    if (typeof parameters.radius === 'undefined' )
        return callback('radius is mandatory', null);
    if (typeof parameters.from === 'undefined' )
        return callback('from date is mandatory', null);
    if (typeof parameters.to === 'undefined' )
        return callback('to date is mandatory', null);


    return listhotels(parameters.paxes,parameters.latitude,parameters.longitude, parameters.radius, parameters.from, parameters.to,callback);
};

/**
 * Connect to the database.
 */
function listhotels(paxes, latitude, longitude,radius, fromDate, toDate, callback) {

    var availRequest =  utils.buildAvailRequest(fromDate,toDate, paxes, latitude, longitude, radius);
    var jsonRequest = JSON.stringify(availRequest);


    log.debug(jsonRequest);

    // prepare the header
    var postheaders = {
        'Content-Type' : 'application/json;charset=UTF-8',
        'Content-Length' : Buffer.byteLength(jsonRequest, 'utf8')
    };

    //TODO: Ñapa, I don't know how to setup a base URL in request pakage
    var options = {
        uri: config.rosettaUrl + '/distribution-api/hotels/default/availability',
        method: 'POST',
        json: availRequest
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var hotels = new Array();

            for (var i in body.hotels.hotels) {
                var hbhotel = body.hotels.hotels[i];

                hotels.push(utils.buildHotel(hbhotel,fromDate,toDate));

            }
            console.log(hotels) // Print the shortened url.
            return callback(null,hotels);

        } else {
            console.error(error);
            callback(error,null);
        }
    });

}

