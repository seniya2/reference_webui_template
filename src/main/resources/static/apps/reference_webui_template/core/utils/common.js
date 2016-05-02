(function() {
	'use strict';

	commonCntr.$inject = [ '$scope', '$translate', '$rootScope', 'usSpinnerService', '$timeout'];
	function commonCntr($scope, $translate, $rootScope, usSpinnerService, $timeout) {

		console.log("commonCntr --> ");
		$scope.app.globalDisable = false;

		$scope.$on("app.massagePopup", function(event, object) {
			console.log("--> app.massagePopup");			
			$translate([object.messageKey]).then(function (translations) {
				var messageValue = translations[''+object.messageKey];
				Messenger({
					extraClasses : 'messenger-fixed messenger-on-top',
					theme : 'air'
				}).post({
					message : messageValue,
					type : object.messageType,
					showCloseButton : false
				});
			});
			
		});
		
		$scope.$on("app.blockingPopup", function(event, enable) {
			console.log("--> app.blockingPopup : " + enable);
			if (enable) {
				$scope.app.globalDisable = enable;
				usSpinnerService.spin('app-spinner');
			} else {
				$timeout(function() {
					$scope.app.globalDisable = enable;
					usSpinnerService.stop('app-spinner');
				}, 500);
			}
		});

	}
	
	
	sidebarMenuCntr.$inject = [ '$scope', 'property' ];
	function sidebarMenuCntr($scope, property) {

		console.log("sidebarMenuCntr --> ");
		$scope.modules = property.modules;
	}

	
	angular.module('singApp.core').controller('commonCntr', commonCntr);
	angular.module('singApp.core').controller('sidebarMenuCntr', sidebarMenuCntr);
	
})();
