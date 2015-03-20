'use strict';

/*
 * Login service
 *
 * Copyright (C) 2014 Diego Lafuente.
 */
var config = require('../../config.js');
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
	
};