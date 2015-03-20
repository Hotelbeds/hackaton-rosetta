var config = require('../../config.js');
var async = require('async');
var request = require('request');
var db = require('../db.js');
var Log = require('log');

// globals
var log = new Log(config.logLevel);

/**
 * Service to create a new invitation
 * @param parameters[required] A dictionary with the parameters of the request. 
 *    - owner: the user id of the owner of the event
 *    - event: the event id
 *    - hotel: the id of the hotel
 *    - invited: an array of userIds of invited people
 * @param callback[required] A callback following the template (error, result) to return the results.
 *    The result will be empty. Check the error to see if the service succeeded.
 */
exports.sendRequest = function (parameters, callback) {
	if (!parameters) {
		return callback('no parameters sent');
	}
	if (!parameters.owner) {
		return callback('no owner sent');
	}
	if (!parameters.event) {
		return callback('no event sent');
	}
	if (!parameters.hotel) {
		return callback('no hotel sent');
	}
	if (!parameters.invited) {
		return callback('no invited sent');
	}
	try
    {
        parameters.invited = JSON.parse(parameters.invited);
    }
    catch(exception)
    {
        return callback('invalid format of invited. Should be [id1,id2] ' + exception);
    }
    parameters.pending = parameters.invited;
	// main stream
	var mainStream = [];
	// open database
	mainStream.push(function (callback) {
		db.addCallback(function(error, result) {
			if (error) {
	            return callback(error);
	        }
			invitationsCollection = result.collection(config.invitationsCollection);
			return callback(null, invitationsCollection);
		});
	});
	// update record
	mainStream.push(function (invitationsCollection, callback) {

		invitationsCollection.update({owner:parameters.owner, event:parameters.event, hotel:parameters.hotel}, {'$set':parameters}, {upsert:true}, callback);
	});
	// run mainstream
	async.waterfall(mainStream, function (error) {
		return callback (error, null);
	});
}