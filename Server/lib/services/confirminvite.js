/**
 * Created by dcastro on 20/3/15.
 */

var config = require('../../config.js');
var async = require('async');
var utils = require('../utils/utils');
var request = require('request');
var db = require('../db.js');
var mongo = require('mongodb')
var Log = require('log');

// globals
var log = new Log(config.logLevel);

/**
 * Service to create confirm an invitation
 * @param parameters[required] A dictionary with the parameters of the request.
 *    - userId: the user id that wants to retrieve the invitations
 * @param callback[required] A callback following the template (error, result) to return the results.
 *    The result will contain a list of the invitations of the user id
 */
exports.sendRequest = function (parameters, callback) {
    if (!parameters.userId) {
        return callback('no userId sent');
    }
    if (!parameters.invitationId) {
        return callback('no invitationId sent');
    }
    parameters.pending = parameters.invites;
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
    // check if the invitation id exists
    mainStream.push(function (invitationsCollection, callback) {
        invitationsCollection.findOne({_id: db.massageToObjectId(parameters.invitationId)}, function(err, doc) {
            if (doc == null)
                return callback("Invitation Id not found!");
            else
                return callback(null, {invitation: doc, collection:invitationsCollection} );
        });
    });

    // check if the invitation has as pending the requested userId, and update it
    mainStream.push(function (holder, callback) {
        if (holder.invitation.invites.indexOf(parameters.userId) != -1) {
            // Ok, the user is in the pending list, remove it from there
            holder.collection.update({ _id: db.massageToObjectId(parameters.invitationId) }, { $pull: { "pending": parameters.userId } },
                function(err,doc) {
                    if (!err)
                        return callback(null, holder.collection);
                    else
                        callback(err,null);
                }
            )
        } else {
            return callback("User Id not found in the pending invitations!");
        }
    });

    // finally, return the updated invitation
    mainStream.push(function (invitationsCollection, callback) {
        invitationsCollection.findOne({_id: db.massageToObjectId(parameters.invitationId)}, function(err, doc) {
            if (doc == null)
                return callback("Invitation Id not found!");
            else
                return callback(null,
                    utils.buildInvitation(parameters.invitationId,
                        doc.owner,
                        doc.eventId,
                        doc.hotel,
                        doc.invites,
                        doc.pendingInvites
                ));
        });
    });



    // run mainstream
    async.waterfall(mainStream, callback);
}