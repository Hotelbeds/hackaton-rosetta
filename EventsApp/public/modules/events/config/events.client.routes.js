'use strict';

// Setting up route
angular.module('events').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('events', {
			url: '/events',
			templateUrl: 'modules/events/views/events.client.view.html'
		}).
		state('invite', {
			url: '/invite',
			templateUrl: 'modules/invite/views/invite.client.view.html'
		});
	}
]);