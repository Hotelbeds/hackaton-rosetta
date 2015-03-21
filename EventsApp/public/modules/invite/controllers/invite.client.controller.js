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

		$scope.getHotels = function () {
			var req = {
					method: 'GET',
					url: 'http://10.162.127.16:8080/api/hotelsavail',
					headers: {
					   	'Content-Type': undefined
					},
					params: { eventid: $scope.currentEvent.id, radius: '10', paxes: '4' },
			}
        	$http(req).
				success(function(data, status, headers, config) {    					
					$scope.hotels = data;
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
		}

		$scope.prepareList = function () {
			var options = {
    			valueNames: [ 'name', 'city' ]
			};
			var hackerList = new List('hacker-list', options);
		}

		if (Authentication.user && Authentication.user.providerData && Authentication.user.providerData.accessToken) {
				var req = {
						method: 'GET',
						url: 'http://10.162.127.16:8080/api/friends',
						headers: {
						   	'Content-Type': undefined
						},
						params: { userId: Authentication.user.providerData.id, token: Authentication.user.providerData.accessToken},
				}
	        	$http(req).
					success(function(data, status, headers, config) {    					
						$scope.friends = data;
						$scope.event = $scope.currentEvent();
						return false;
					}).
					error(function(data, status, headers, config) {
						console.log(data);
					});
		}
	}
]);