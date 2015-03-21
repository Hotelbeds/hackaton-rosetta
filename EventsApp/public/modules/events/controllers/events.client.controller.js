'use strict';

var mapObject, markers = [], item;

function hideAllMarkers () {
	for (var key in markers)
		markers[key].forEach(function (marker) {
			marker.setMap(null);
		});
};

function toggleMarkers (category) {
	hideAllMarkers();
	closeInfoBox();

	if ('undefined' === typeof markers[category])
		return false;
	markers[category].forEach(function (marker) {
		marker.setMap(mapObject);
		marker.setAnimation(google.maps.Animation.DROP);

	});
};

function closeInfoBox() { $('div.infoBox').remove(); };

function getInfoBox(item) {
		var scope = angular.element(document.getElementById('evmain')).scope();
		var start = item.start.split('T'), end = item.end.split('T');

			return new InfoBox({
				content:
				'<div class="marker_info none" id="marker_info">' +
				'<div class="info" id="info">'+
				'<img src="' + item.logo + '" class="logotype" alt=""/>' +
				'<span onclick="closeInfoBox();" style="padding:0px 12px;text-align:right;line-height:23px;"><i class="fa fa-times"></i></span>' +
				'<h2 style="padding:0">'+ item.name.substr(0,44) +'<span></span></h2>' +
				'<span>'+ start[0] + ' ' + start[1].substr(0,start[1].length-3) + ' to ' + end[0] + ' ' + end[1].substr(0,end[1].length-3) +'</span>' +
				'<span>'+ item.price + ' ' + item.currency +'</span>' +
				//'<span>'+ item.description +'</span>' +
				'<a id="'+item.id+'" href="/#!/invite" class="green_btn" style="background-color:#FF5700; color:#fff" role="button" ng-click="'+scope.setCurrentEvent(item)+'">Invite</a>' +
				'<span class="arrow"></span>' +
				'</div>' +
				'</div>',
				disableAutoPan: true,
				maxWidth: 0,
				pixelOffset: new google.maps.Size(40, -210),
				closeBoxMargin: '50px 200px',
				closeBoxURL: '',
				isHidden: false,
				pane: 'floatPane',
				enableEventPropagation: true
			});
};

function initMap(markersData, currentPosition) {
		var mapOptions = {
				zoom: 12,
				center: currentPosition,
				mapTypeId: google.maps.MapTypeId.ROADMAP,

				mapTypeControl: false,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.LEFT_CENTER
				},
				panControl: false,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				zoomControl: false,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				scaleControl: false,
				scaleControlOptions: {
					position: google.maps.ControlPosition.TOP_LEFT
				},
				streetViewControl: false,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP
				},
				styles: [{"featureType":"poi","stylers":[{"visibility":"off"}]},{"stylers":[{"saturation":-70},{"lightness":37},{"gamma":1.15}]},{"elementType":"labels","stylers":[{"gamma":0.26},{"visibility":"off"}]},{"featureType":"road","stylers":[{"lightness":0},{"saturation":0},{"hue":"#ffffff"},{"gamma":0}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"lightness":50},{"saturation":0},{"hue":"#ffffff"}]},{"featureType":"administrative.province","stylers":[{"visibility":"on"},{"lightness":-50}]},{"featureType":"administrative.province","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"lightness":20}]}]
			};

		var marker;
			mapObject = new google.maps.Map(document.getElementById('map'), mapOptions);

			for (var i=0; i<markersData.length; i++) {
				 let item = markersData[i];
					var currentLatLng = new google.maps.LatLng(item.latitude, item.longitude);

					marker = new google.maps.Marker({
						position: currentLatLng,
						map: mapObject
					});

					if ('undefined' === typeof markers[i]) {
						markers[i] = [];
					}
					
					markers[i].push(marker);
					google.maps.event.addListener(marker, 'click', (function () {
      					closeInfoBox();
      					getInfoBox(item).open(mapObject, this);
      					mapObject.setCenter(currentLatLng);
					}));
			}
		}

angular.module('events').controller('EventsController', ['$scope', 'Authentication', '$http', 'Invitations','$location',
	function($scope, Authentication, $http, Invitations, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.menuLocation = function(id) {
			$location.hash(id)
		}

		$scope.setCurrentEvent = function(item) {
			Invitations.setEvent(item);
		}

		$scope.currentEvent = function() {
			console.log(Invitations.getEvent());
			return Invitations.getEvent();
		}

		angular.element(document).ready(function() {
			//initialize();

		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function(position){
		        	var req = {
						method: 'GET',
					 	url: 'http://10.162.127.16:8080/api/listevents',
					 	headers: {
					   	'Content-Type': undefined
					 	},
					 	params: { latitude: position.coords.latitude, longitude: position.coords.longitude, radius: '10' },
					}
		        	$http(req).
  						success(function(data, status, headers, config) {    					
    						initMap(data, new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  					}).
  						error(function(data, status, headers, config) {
    						console.log(data);
  					});
		        });
		    } else { 
		        alert('Plese enable your geolocation feature and enjoy with your events now!!');
		    }
		});
	}
]);