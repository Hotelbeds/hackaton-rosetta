'use strict';

// Setting up route
angular.module('events').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found

		console.log($urlRouterProvider);

		// Home state routing
		$stateProvider.
		state('events', {
			url: '/events',
			templateUrl: 'modules/events/views/events.client.view.html'
		});
	}
]);