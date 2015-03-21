'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.currentPath = $location.path();
		console.log($location.path());

		if (Authentication && Authentication.user) {
			$location.path('/events');
		}
	}
]);