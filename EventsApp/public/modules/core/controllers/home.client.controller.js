'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.currentPath = $location.path();
		console.log($location.path());

		if (Authentication && Authentication.user) {
			console.log('REdirect to events ');
			//$location.path('/events');
		}

		angular.element(document).ready(function () {
			jQuery('#headerMenu').removeClass('blue');
		});
	}
]);