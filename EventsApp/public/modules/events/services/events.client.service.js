'use strict';

//Menu service used for managing  menus
angular.module('events').service('Invitations', [

	function() {

		this.event = {};

		this.setEvent = function(event) {
			this.event = event;
			return false;
		};

		this.getEvent = function() {
			return this.event;
		}
	}
]);