'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	url = require('url'),
	FacebookStrategy = require('passport-facebook').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller'),
	http = require('http');

module.exports = function() {
	// Use facebook strategy
	passport.use(new FacebookStrategy({
			clientID: config.facebook.clientID,
			clientSecret: config.facebook.clientSecret,
			callbackURL: config.facebook.callbackURL,
			passReqToCallback: true
		},
		function(req, accessToken, refreshToken, profile, done) {
			// Set the provider data and include tokens
			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			/*var req = {
				method: 'GET',
				url: 'http://facebook.com/'+profile.id+'/picture',
				headers: {
					'Content-Type': undefined
				},
				params: { redirect: false },
			}

			http(req).
	  			success(function(data, status, headers, config) {    					
	    			console.log(data.url);
				}).
	  			error(function(data, status, headers, config) {
	    			console.log(data);
	  			});	
			*/
			// Create the user OAuth profile
			var providerUserProfile = {
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				displayName: profile.displayName,
				email: profile.emails[0].value,
				username: profile.username,
				provider: 'facebook',
				providerIdentifierField: 'id',
				providerData: providerData
			};

			// Save the user OAuth profile
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};