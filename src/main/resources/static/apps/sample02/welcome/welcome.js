(function() {
	'use strict';

	welcomeController.$inject = [ '$scope', '$rootScope','$translate'];
	function welcomeController($scope, $rootScope, $translate) {

		console.log("welcomeController -->");
		//console.log(scriptMsg.getMsg());
		//console.log(scriptMsg.getMsg().$$state);
		
		$scope.hello = "hello";

		$scope.world = function() {
			window.alert("world");
		}

	}

	angular.module('singApp.welcome').controller('welcomeController', welcomeController);

})();
