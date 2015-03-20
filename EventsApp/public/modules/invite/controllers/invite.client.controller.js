'use strict';

angular.module('invite').controller('InviteController', ['$scope', 'Authentication', '$http', 'Invitations',
	function($scope, Authentication, $http, Invitations) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.setCurrentEvent = function(item) {
			Invitations.setEvent(item);
		}

		$scope.currentEvent = function() {
			console.log('ddd');
			console.log(Invitations.getEvent());
			return Invitations.getEvent();
		}

		angular.element(document).ready(function() {
			//initialize();
		});
	}
]);