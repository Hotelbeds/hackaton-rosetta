'use strict';

/*
 * List Eventbrite events service
 *
 * Created by dcastro on 20/3/15.
 */
var config = require('../../config.js');
var eventbriteAPI = require('node-eventbrite');
var Log = require('log');
var http = require('http');

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

    var availRequest =  buildAvailRequest(formatEventDate(event.start.local),formatEventDate(event.end.local), paxes, event.venue.latitude, event.venue.longitude, radius);
    var jsonRequest = JSON.stringify(availRequest);

    // prepare the header
    var postheaders = {
        'Content-Type' : 'application/json;charset=UTF-8',
        'Content-Length' : Buffer.byteLength(jsonRequest, 'utf8')
    };

    var options = {
        host: config.rosettaUrl,
        path: '/distribution-api/hotels/default/availability',
        method: 'POST',
        headers : postheaders
    };

    var reqPost = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (availResponse) {
            var availObject = JSON.parse(availResponse);
            console.log('availResponse: ' + availObject);
        });
    })

    reqPost.write(jsonRequest);
    reqPost.end();

    reqPost.on('error', function(e) {
        console.error(e);
        callback(e,null);
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
            "maxHotels":10
        },
        "query":"",
        "language":"ENG",
        "version":"default",
        "provider":"ACE",
        "geolocation":{
            "radius":latitude,
            "latitude":longitude,
            "longitude":radius,
            "unit":"km"
        },
        "destinations": [
            {
                "code":""
            }
        ]

    }


}

function formatEventDate(dateString) {
    var date = new Date(dateString);
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getDate().toString();

    return yyyy+"-"+mm+"-"+dd;
}