var config = require('../../config.js');
var async = require('async');
var utils = require('../utils/utils');
var request = require('request');
var db = require('../db.js');
var Log = require('log');

// globals
var log = new Log(config.logLevel);

/**
 * Service to create a new invitation
 * @param parameters[required] A dictionary with the parameters of the request.
 *    - userId: the user id that wants to retrieve the invitations
 * @param callback[required] A callback following the template (error, result) to return the results.
 *    The result will contain a list of the invitations of the user id
 */
exports.sendRequest = function (parameters, callback) {
    if (!parameters.userId) {
        return callback('no userId sent');
    }
    parameters.pending = parameters.invites;
    // main stream
    var mainStream = [];
    var results = {
        owned : new Array(),
        invited : new Array()
    };
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
    //look for owned events
    mainStream.push(function (invitationsCollection, callback) {
        invitationsCollection.find({owner: parameters.userId}).toArray(function(err, invites) {

            for (var i in invites) {
                var invite = invites[i];
                results.owned.push(utils.buildInvitation(invite._id.toString(), parameters.userId, invite.eventId, invite.hotelId, invite.invites, invite.pending));
            }

            return callback(null, invitationsCollection);

        });

    });
    //look for participating events
    mainStream.push(function (invitationsCollection, callback) {
        invitationsCollection.find({invites: parameters.userId}).toArray(function(err, invites) {

            for (var i in invites) {
                var invite = invites[i];
                results.invited.push(utils.buildInvitation(invite._id.toString(), invite.owner, invite.eventId, invite.hotelId, invite.invites, invite.pending));
            }

            return callback(null, results);

        });

    });



    // run mainstream
    async.waterfall(mainStream, callback);
}



