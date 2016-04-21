(function() {
	'use strict';

	commonCntr.$inject = [ '$scope', '$translate', '$rootScope', 'usSpinnerService', '$timeout', 'property' ];
	function commonCntr($scope, $translate, $rootScope, usSpinnerService, $timeout, property) {

		//console.log("commonCntr --> ");
		$scope.app.globalDisable = false;
		$scope.modules = property.modules;

		$scope.$on("app.massagePopup", function(event, object) {
			
			if (object.messageValue == null) {
				
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
				
			} else {
				
				Messenger({
					extraClasses : 'messenger-fixed messenger-on-top',
					theme : 'air'
				}).post({
					message : object.messageValue,
					type : object.messageType,
					showCloseButton : false
				});
				
			}
			
			
		});
		
		$scope.$on("app.blockingPopup", function(event, enable) {
			//console.log("--> disableScreen : " + enable);
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

	
	angular.module('singApp.core').controller('commonCntr', commonCntr);
	
})();
