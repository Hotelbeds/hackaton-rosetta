'use strict';

/**
 * Run package tests.
 * (C) 2015 Diego Lafuente.
 */

// requires
var testing = require('testing');

/**
 * Run all module tests.
 */
exports.test = function(callback)
{
	var tests = {};
	var libs = ['db'];
    var bin = ['app'];
	libs.forEach(function(lib)
	{
		tests[lib] = require('./lib/' + lib + '.js').test;
	});
    bin.forEach(function(bin)
    {
        tests[bin] = require('./bin/' + bin + '.js').test;
    });
	testing.run(tests, 4200, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}