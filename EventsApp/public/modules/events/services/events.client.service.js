'use strict';

//Menu service used for managing  menus
angular.module('events').service('Invitations', [

	function() {

		this.event = {};
		this.num = 0;
		this.hotels = {};

		this.setEvent = function(event) {
			this.event = event;
			return false;
		};

		this.getEvent = function() {
			return this.event;
		}

		this.setNumFriends = function(num) {
			this.num = num;
			return false;
		}

		this.getNumFriends = function() {
			return this.num;
		}

		this.setHotels = function(hotels) {
			this.hotels = hotels;
			return false;
		};

		this.getHotels = function() {
			return this.hotels;
		}
	}
]);