'use strict';

// Setting up route
angular.module('invite').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found

		console.log($urlRouterProvider);

		// Home state routing
		$stateProvider.
		state('invite', {
			url: '/invite',
			templateUrl: 'modules/invite/views/invite.client.view.html'
		}).
		state('hotels', {
			url: '/hotels',
			templateUrl: 'modules/invite/views/hotels.client.view.html'
		});
	}
]);