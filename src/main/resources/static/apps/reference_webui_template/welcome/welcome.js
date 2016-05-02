(function() {
	'use strict';

	welcomeController.$inject = [ '$scope', '$rootScope','$translate'];
	function welcomeController($scope, $rootScope, $translate) {

		console.log("welcomeController -->");

		$scope.world = function() {
			window.alert("world");
		}
		
		$scope.sendMssenger = function() {
			$rootScope.$broadcast("app.massagePopup", {"messageKey" : "WELCOME.MSG_CALL", "messageType" : "success"});
		}
		
		$scope.sendMssenger2 = function(msg) {
			$rootScope.$broadcast("app.massagePopup", {"messageKey" : msg, "messageType" : "success"});
		}
		
		$scope.blockingPopup = function (enable) {
			$rootScope.$broadcast("app.blockingPopup", enable);
		}

	}

	angular.module('singApp.welcome').controller('welcomeController', welcomeController);

})();
