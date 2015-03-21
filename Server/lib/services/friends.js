'use strict';

/*
 * Login service
 *
 * Copyright (C) 2014 Diego Lafuente.
 */
var config = require('../../config.js');
var async = require('async');
var request = require('request');
var Log = require('log');

// globals
var log = new Log(config.logLevel);

/**
 * Sends the list of friends for a certain user id and token
 * @param parameters[required] A dictionary with the parameters of the request. 
 *    - userId: the user id
 *    - token: the access token
 * @param callback[required] A callback following the template (error, result) to return the results.
 *    The result will be an array of objects:
 *      - name
 *      - picture
 */
exports.sendRequest = function (parameters, callback) {
	if (!parameters) {
		return callback('no parameters sent');
	}
	if (!parameters.userId) {
		return callback('no userId sent');
	}
	if (!parameters.token) {
		return callback('no token sent');
	}
	// main stream
	var mainStream = [];
	// facebook graph url
	var facebookGraphUrl = 'https://graph.facebook.com/';
	// get the friends list
	mainStream.push(function (callback) {
		log.debug('get friends list');
		var friendsUrl = facebookGraphUrl + parameters.userId + '/friends?access_token=' + parameters.token;
		request.get(friendsUrl, function(error, response, body) {
			if (error) {
				return callback(error);
			}
			var facebookResponse;
			try
	        {
	            facebookResponse = JSON.parse(body);
	        }
	        catch(exception)
	        {
	            return callback('Could not parse friends response from facebook ' + exception);
	        }
	        if (facebookResponse.error) {
	        	return callback(JSON.stringify(facebookResponse.error));
	        }
	        log.debug('returning friends list', facebookResponse.data);
			return callback(null, facebookResponse.data);
		});
	});
	// get the pictures for each of the friends and return response
	mainStream.push(function (friends, callback) {
		log.debug('getting pictures');
		// create the parallel stream
		var parallelStream = [];
		friends.forEach(function (friend) {
			parallelStream.push(function (callback) {
				log.debug('getting picture for friend ' + friend.id);
				var friendsUrl = facebookGraphUrl + friend.id + '/picture?redirect=false';
				request.get(friendsUrl, function(error, response, body) {
					if (error) {
						return callback(error);
					}
					var facebookResponse;
					try
			        {
			            facebookResponse = JSON.parse(body);
			        }
			        catch(exception)
			        {
			            return callback('Could not parse friends response from facebook ' + exception);
			        }
					return callback(null, { id: friend.id,
                                            name: friend.name,
											picture:facebookResponse.data.url});
				});
			});
		});
		// run parallel stream
		async.parallel(parallelStream, function (error, results) {
			if (error) {
				return callback(error);
			}
			log.debug('parallel', results);
			return callback(null, results);
		});
	});
	// run main stream
	async.waterfall(mainStream, callback);
};