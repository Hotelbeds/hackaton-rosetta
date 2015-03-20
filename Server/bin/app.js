#!/usr/bin/env node
'use strict';

/**
 * Services required by the premioscode project
 * (C) 2015 Diego Lafuente.
 */

// requires
var config = require('../config.js');
var fs = require('fs');
var path = require('path');
var express = require('express');
var testing = require('testing');
var Log = require('log');

// globals
var log = new Log(config.logLevel);
var server;
var services;

exports.startServer = function(port, callback) {
	if (typeof port === 'function') {
		// no port
		callback = port;
		port = config.expressPort;
	}
	var app = express();
	// GET requests
	app.get('/api/:service', serve);
	// load services
	services = readServices();
	// serve
    log.debug('Server started listening on port %d', port);
	server = app.listen(port, callback);


};

exports.stopServer = function(callback) {
	if (!server) {
		log.info('No server to close');
		return callback(null);
	}
	server.close(function() {
		log.info('Server closed');
		callback(null);
	});
};

function serve (request, response) {
	var serviceName = request.params.service;
	if (!(serviceName in services)) {
		return response.status(403).send({error: 'service ' + service + ' not found.'});
	}
	var service = services[serviceName];
	service.sendRequest(request.query, function (error, result) {
		if (error) {
			return response.status(500).send({error: 'service ' + service + ' returned error: ' + error});
		}
		return response.send(result);
	});
}

function facebookCallback (request, response) {
	log.debug(request);
	response.send('OK');
}

/**
 * Services reader
 */
function readServices() {
	var pathToServices = path.resolve(__dirname, '../lib/services');
	var files = fs.readdirSync(pathToServices);
	//remove '.DS_Store'
	files = files.filter(function(element) {
		if (element[0] === '.')
			return false;
		return true;
	});
	//produce the list of services
	var services = {};
	files.forEach(function(file) {
		var serviceName = file.split('.')[0];
		var service = require(path.resolve(pathToServices, serviceName));
		if (service && typeof service.sendRequest === 'function') {
			services[serviceName] = service;
			log.debug('Read service: ' + serviceName);
		}
		else
			log.error('Couldnt read service: ' + serviceName);
	});
	return services;
}

/***********************************
 ************ UNIT TESTS ***********
 ***********************************/
function testReadServices (callback) {
	var services = fs.readdirSync(path.resolve(__dirname, '../lib/services'));
	services = services.filter(function(element) {
		if (element[0] === '.')
			return false;
		return true;
	});
	var servicesRead = readServices();
	testing.assertEquals(Object.keys(servicesRead).length, services.length, 'incorrect number of services retrieved by readServices', callback);
	for (var service in servicesRead) {
		testing.assert(services.indexOf(service + '.js') > -1, 'service ' + service + ' was not read at all', callback);
		testing.assert(servicesRead[service] !== undefined, 'service ' + service + ' was not properly read', callback);
	}
	testing.success(callback);
}

exports.test = function(callback) {
    testing.run({
        testReadServices: testReadServices
    }, callback);
};

/**
 * Start server.
 * In this case tests are not run when invoking the file; use test.js for that.
 */
if (__filename == process.argv[1]) {
	exports.startServer(function() {
		log.info('Started server on port %s', config.expressPort);
	});
}