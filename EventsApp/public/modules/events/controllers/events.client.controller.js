'use strict';


angular.module('events').controller('EventsController', ['$scope', 'Authentication', '$http',
	function($scope, Authentication, $http) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		jQuery(document).ready(function() {
			initialize();

		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function(position){
		        	var req = {
						method: 'POST',
					 	url: 'http://localhost:8080/api/listevents',
					 	headers: {
					   	'Content-Type': undefined
					 	},
					 	data: { latitude: position.coords.latitude, longitude: position.coords.longitude },
					}
		        	$http(req).
  						success(function(data, status, headers, config) {
    						console.log(data);
  					}).
  						error(function(data, status, headers, config) {
    						console.log(data);
  					});
		        });
		    } else { 
		        console.error("Geolocation is not supported by this browser.");
		    }

		});
	}
]);