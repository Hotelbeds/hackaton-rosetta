'use strict';

/*
 * Login service
 *
 * Copyright (C) 2014 Diego Lafuente.
 */
var config = require('../../config.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Log = require('log');

// globals
var log = new Log(config.logLevel);

/**
 * Sends the login request and returns the result in the callback
 * @param parameters[required] A dictionary with the parameters of the request. Login request requires no parameters.
 * @param callback[required] A callback following the template (error, result) to return the results.
 */
exports.sendRequest = function (parameters, callback) {
	passport.use(new FacebookStrategy({
		clientID: config.facebookAppId,
		clientSecret: config.facebookAppSecret,
		callbackURL: 'http://localhost:8080/facebook/callback'
	}, function(accessToken, refreshToken, profile, done) {
		log.debug(accessToken, refreshToken, profile);
		done();
		callback(null, true);
		})
	);
};