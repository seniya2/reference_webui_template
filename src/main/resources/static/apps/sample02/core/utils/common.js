(function() {
	'use strict';

	runnalbeFn.$inject = [ 'confirmationPopoverDefaults' ];
	function runnalbeFn(confirmationPopoverDefaults) {
		confirmationPopoverDefaults.templateUrl = '../scripts/angular-bootstrap-confirm-master/src/angular-bootstrap-confirm.html';
	}

	commonCntr.$inject = [ '$scope', '$translate', '$rootScope', 'usSpinnerService', '$timeout' ];
	function commonCntr($scope, $translate, $rootScope, usSpinnerService, $timeout) {

		console.log("commonCntr --> ");

		$scope.app.globalDisable = false;
		$scope.$on("app.globalDisable", function(event, msg) {
			$scope.app.globalDisable = msg;
		});

		$scope.$on("app.massagePopup", function(event, object) {
			console.log("--> massagePopup : " + object.msg);
			try {
				Messenger({
					extraClasses : 'messenger-fixed messenger-on-top',
					theme : 'air'
				}).post({
					message : object.msg,
					type : object.type,
					showCloseButton : false
				});
			} catch (e) {
				console.log("massagePopup error :" + e);
			}
		});

		$scope.$on("app.disableScreen", function(event, enable) {
			console.log("--> disableScreen : " + enable);
			try {
				if (enable) {
					$scope.app.globalDisable = enable;
					usSpinnerService.spin('app-spinner');
				} else {
					$timeout(function() {
						$scope.app.globalDisable = enable;
						usSpinnerService.stop('app-spinner');
					}, 500);
				}
			} catch (e) {
				console.log("disableScreen error :" + e);
			}
		});
	}
		
	angular.module('singApp').run(runnalbeFn);
	angular.module('singApp.core').controller('commonCntr', commonCntr);
})();
