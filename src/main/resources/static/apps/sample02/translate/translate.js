(function() {
	'use strict';

	translateController.$inject = [ '$scope', '$rootScope', '$translate', '$interval' ];
	function translateController($scope, $rootScope, $translate, $interval) {

		/**
		 * $scope.locale
		 */
		$scope.locale = $translate.use();

		/**
		 * Current time
		 */
		$scope.currentTime = Date.now();
		$interval(function() {
			$scope.currentTime = Date.now();
		}, 1000);

		/**
		 * EVENTS
		 */
		$rootScope.$on('$translateChangeSuccess', function(event, data) {
			// console.log("$translateChangeSuccess.....");
			$scope.locale = data.language;
		});

	}

	angular.module('singApp.translate').controller('translateController', translateController);
	
})();
