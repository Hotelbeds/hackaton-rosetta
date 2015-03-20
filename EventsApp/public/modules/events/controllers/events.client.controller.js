'use strict';


angular.module('events').controller('EventsController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		jQuery(document).ready(function() {
			initialize();
		});
	}
]);