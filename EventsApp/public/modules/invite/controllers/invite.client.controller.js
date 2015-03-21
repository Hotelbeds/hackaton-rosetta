'use strict';


angular.module('invite').controller('InviteController', ['$scope', 'Authentication', '$http', 'Invitations', '$location',
	function($scope, Authentication, $http, Invitations, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.nologo = 'img/c_interior.png';
		$scope.noDesc = 'Please select an event to enjoy it !';
		$scope.noName = 'No event';
		$scope.invited = [];
		$scope.num = Invitations.getNumFriends();
		$scope.hotels = Invitations.getHotels();

		$scope.setCurrentEvent = function(item) {
			Invitations.setEvent(item);
		}

		$scope.currentEvent = function() {
			console.log(Invitations.getEvent());
			return Invitations.getEvent();
		}

		if (!Invitations.getEvent() || !Invitations.getEvent().id) {
			console.log('Come back to events no event selected');
			$location.path('/events');
		}

		$scope.getHotels = function () {
			var req = {
					method: 'GET',
					url: 'http://10.162.127.16:8080/api/hotelsevent',
					headers: {
					   	'Content-Type': undefined
					},
					//params: { eventid: $scope.currentEvent().id, radius: '30', paxes: $scope.num },
					params: { eventid: 13151784341, radius: '200', paxes: $scope.num },
					
			}
        	$http(req).
				success(function(data, status, headers, config) {    					
					Invitations.setHotels(data);
					$scope.hotels = data;
					return false;
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

		$scope.invite = function (friend) {
			if (!$scope.invited[friend.id]) {
				jQuery('#'+friend.id).css('background-color','#ec971f');
				jQuery('#'+friend.id).css('color','#fff');
				//jQuery('#'+friend.id).css('border-color','#fff');
				$scope.invited[friend.id] = true;
				$scope.num++;
				Invitations.setNumFriends($scope.num);
			} else {
				jQuery('#'+friend.id).css('background-color','#fff');
				jQuery('#'+friend.id).css('color','#000');
				//jQuery('#'+friend.id).css('border-color','#555');
				$scope.invited[friend.id] = false;
				$scope.num--;
				Invitations.setNumFriends($scope.num);
			}
		}

		if (Authentication.user && Authentication.user.providerData && Authentication.user.providerData.accessToken) {
			$scope.event = $scope.currentEvent();
			var req = {
				method: 'GET',
				url: 'http://10.162.125.1:8080/api/friends',
						headers: {
						   	'Content-Type': undefined
						},
						params: { userId: Authentication.user.providerData.id, token: Authentication.user.providerData.accessToken},
				}
	        	$http(req).
					success(function(data, status, headers, config) {    					
						$scope.friends = data;
						for (var i = 0; i < $scope.friends.length; i++) {
							var keyvalue = $scope.friends[i].id;
							//keyvalue[$scope.friends[i].id] = false;
        					$scope.invited[keyvalue] = false;
    					}
						return false;
					}).
					error(function(data, status, headers, config) {
							console.log(data);
					});
		}
	}
]).controller('HotelsController', ['$scope', 'Authentication', '$http', 'Invitations', '$location', 
	function($scope, Authentication, $http, Invitations, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.nologo = 'img/c_interior.png';
		$scope.noDesc = 'Please select an event to enjoy it !';
		$scope.noName = 'No event';
		$scope.invited = [];
		$scope.num = Invitations.getNumFriends();
		$scope.hotels = Invitations.getHotels();
		$scope.booked = false;

		if (!Invitations.getEvent() || !Invitations.getEvent().id) {
			console.log('Come back to events no event selected');
			$location.path('/events');
		}

		$scope.setCurrentEvent = function(item) {
			Invitations.setEvent(item);
		}

		$scope.currentEvent = function() {
			console.log(Invitations.getEvent());
			return Invitations.getEvent();
		}

		$scope.prepareList = function () {
			var options = {
    			valueNames: [ 'name', 'city' ]
			};
			var hackerList = new List('hacker-list', options);
		}
		
		$scope.book = function(hotel) {
			var req = {
				method: 'GET',
				url: 'http://10.162.125.1:8080/api/invite',
				headers: {
				   	'Content-Type': undefined
				},
				//params: { eventid: $scope.currentEvent().id, radius: '30', paxes: $scope.num },
				params: { reservationKey: hotel.reservationKey, eventId: $scope.currentEvent().id, invites: '["10152783923492914", "10204982377092604"]', owner: "792732090815245" },
				
			}
			
	    	$http(req).
				success(function(data, status, headers, config) {    					
					console.log(data);
					$scope.booked = true;
					return false;
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
		}	
		

		if (Authentication.user && Authentication.user.providerData && Authentication.user.providerData.accessToken) {
			$scope.event = $scope.currentEvent();
			

			var req = {
				method: 'GET',
				url: 'http://10.162.125.1:8080/api/hotelsevent',
				headers: {
				   	'Content-Type': undefined
				},
				//params: { eventid: $scope.currentEvent().id, radius: '30', paxes: $scope.num },
				params: { eventid: 13151784341, radius: '200', paxes: $scope.num },
				
			}
			
	    	$http(req).
				success(function(data, status, headers, config) {    					
					Invitations.setHotels(data);
					$scope.hotels = data;
					return false;
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
		}
	}
]).controller('PendingController', ['$scope', 'Authentication', '$http', 'Invitations', '$location', 
	function($scope, Authentication, $http, Invitations, $location) {
			
			$scope.authentication = Authentication;
			
			$scope.closeBooking = function (eventid) {
				var req = {
				method: 'GET',
				url: 'http://10.162.125.1:8080/api/confirminvite',
				headers: {
				   	'Content-Type': undefined
				},
				//params: { eventid: $scope.currentEvent().id, radius: '30', paxes: $scope.num },
				params: { userId: Authentication.user.providerData.id, invitationId: eventid },
				//params: { userId: '10152783923492914', invitationId: eventid },
				}

				$http(req).
				success(function(data, status, headers, config) {
					$location.path('/pending');
					return false;
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
			}

			var req = {
				method: 'GET',
				url: 'http://10.162.125.1:8080/api/listinvites',
				headers: {
				   	'Content-Type': undefined
				},
				//params: { eventid: $scope.currentEvent().id, radius: '30', paxes: $scope.num },
				params: { userId: Authentication.user.providerData.id },
				//params: { userId: '10152783923492914' },
				
				
			}
			
	    	$http(req).
				success(function(data, status, headers, config) {    					
					$scope.listinvites = data;
					return false;
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
	}
]);