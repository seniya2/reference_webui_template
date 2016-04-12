(function() {
	'use strict';

	scriptMsg.$inject = ['$translate', '$log', '$q' ];
	function scriptMsg($translate, $log, $q) {

		var msg = {};
		
		return {
			getMsg : function() {
				//var deferred = $q.defer();

				$translate([
				            ,'CRUD_create_success'
				            ,'CRUD_create_fail'
				            ,'CRUD_update_success'
				            ,'CRUD_update_fail'
				            ,'CRUD_delete_success'
				            ,'CRUD_delete_fail']).then(function (translations) {
				            	
				            	//deferred.resolve(translations.CRUD_create_success);
				            	
				            	/*				            	
				            	deferred.resolve({
				            		create_success : translations.CRUD_create_success,
					            	create_fail : translations.CRUD_create_fail,
									update_success : translations.CRUD_update_success,
									update_fail : translations.CRUD_update_fail,
									delete_success : translations.CRUD_delete_success,
									delete_fail : translations.CRUD_delete_fail
				            	});
				            	*/
				            	
				            	return translations.CRUD_create_success;
				})
				
				//return deferred.promise;

			}
			
		}
		
	}

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
	angular.module('singApp.core').factory('scriptMsg', scriptMsg);
	
})();
