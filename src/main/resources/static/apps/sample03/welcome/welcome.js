(function() {
	'use strict';

	WelcomeController.$inject = [ '$scope', '$rootScope', '$interval' ];
	function WelcomeController($scope, $rootScope, $interval) {

		$scope.hello = "hello";

		$scope.world = function() {
			window.alert("world");
		}

		$scope.currentTime = Date.now();
		$interval(function() {
			$scope.currentTime = Date.now();
		}, 1000);

	}

	angular.module('singApp.welcome').controller('WelcomeController', WelcomeController);

})();
