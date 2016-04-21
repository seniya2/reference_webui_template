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
		
		$scope.sendMsg = function() {
			$rootScope.$broadcast("app.massagePopup", {"messageKey" : "CRUD_create_success", "messageType" : "success"});
		}
		
		$scope.sendMsg2 = function(msg) {
			$rootScope.$broadcast("app.massagePopup", {"messageValue" : msg, "messageType" : "success"});
		}
		
		$scope.blockingPopup = function (enable) {
			$rootScope.$broadcast("app.blockingPopup", enable);
		}

	}

	angular.module('singApp.welcome').controller('welcomeController', welcomeController);

})();
