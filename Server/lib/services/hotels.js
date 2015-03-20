'use strict';

/*
 * List Eventbrite events service
 *
 * Created by dcastro on 20/3/15.
 */
var config = require('../../config.js');
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
 * Sends a request to Eventbrite for a given event id, and returns hotels in the nearby
 * @param parameters[required] A dictionary with the parameters of the request. event id, radius, paxes.
 * @param callback[required] A callback following the template (error, result) to return the results.
 */
exports.sendRequest = function (parameters, callback) {
    if (typeof parameters.eventid === 'undefined' )
        return callback('eventid is mandatory', null);
    if (typeof parameters.paxes === 'undefined' )
        return callback('paxes is mandatory', null);
    if (typeof parameters.radius === 'undefined' )
        return callback('radius is mandatory', null);

    api.event_details({ 'event_id':parameters.eventid}, function (error, event) {
        if (error) {
            console.log(error.message);
            return callback(error, data);
        } else {

            console.log(event); // Print the the eventbrite event
            return listhotels(parameters.radius,parameters.paxes,callback, event);
        }
    });
};

/**
 * Connect to the database.
 */
function listhotels(radius, paxes, callback, event) {

    var fromDate = formatEventDate(event.start.local);
    var toDate = formatEventDate(event.end.local);

    var availRequest =  buildAvailRequest(fromDate,toDate, paxes, event.venue.latitude, event.venue.longitude, radius);
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

                hotels.push({
                    name:hbhotel.name,
                    destination:hbhotel.destination,
                    from: fromDate,
                    to: toDate,
                    latitude:hbhotel.latitude,
                    longitude:hbhotel.longitude,
                    room:hbhotel.rooms[0].name,
                    price:hbhotel.rooms[0].prices[0].net,
                    currency:hbhotel.rooms[0].prices[0].currency,
                    board:hbhotel.rooms[0].prices[0].boardCode,
                    reservationKey:hbhotel.rooms[0].prices[0].rateKey
                });

            }
            console.log(hotels) // Print the shortened url.
            return callback(null,hotels);

        } else {
            console.error(error);
            callback(error,null);
        }
    });

}

function buildAvailRequest(from, to, paxes, latitude, longitude, radius) {

    var rooms  = Math.ceil(paxes / 2);

    return {
        "stay":{
            "checkIn":from,
            "checkOut":to,
            "shiftDays":"0"
        },
        "dailyPrice":"Y",
        "occupancies":[
            {
                "rooms":rooms,
                "adults":paxes,
                "children":"0"
            }
        ],
        "limit":{
            "maxHotels":5,
            "maxRooms":1
        },
        "query":"",
        "language":"ENG",
        "version":"default",
        "provider":"ACE",
        "geolocation":{
            "radius":radius * 1000.0,
            "latitude":latitude,
            "longitude":longitude,
            "unit":"m"
        }
    };


}

function formatEventDate(dateString) {
    var date = new Date(dateString);
    var yyyy = date.getFullYear().toString();
    var mm = ("0" + (date.getMonth() + 1)).slice(-2)
    var dd  = ("0" + (date.getDate())).slice(-2);

    return yyyy+"-"+mm+"-"+dd;
}