(function() {
	'use strict';

	welcomeController.$inject = [ '$scope', '$rootScope' ];
	function welcomeController($scope, $rootScope) {

		$scope.hello = "hello";

		$scope.world = function() {
			window.alert("world");
		}

	}

	angular.module('singApp.welcome').controller('welcomeController', welcomeController);

})();
