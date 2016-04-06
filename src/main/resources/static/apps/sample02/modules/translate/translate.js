(function() {
  'use strict';

  
  angular.module('singApp.translate')
    .controller('TranslateController', TranslateController);

  TranslateController.$inject = ['$scope','$rootScope','$translate','$interval'];
  function TranslateController ($scope,$rootScope,$translate, $interval) {
 
    /**
     * $scope.locale
     */
    $scope.locale = $translate.use();

    /**
     * Current time
     */
    $scope.currentTime = Date.now();
    $interval(function () {
      $scope.currentTime = Date.now();
    }, 1000);


    /**
     * EVENTS
     */
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
    	//console.log("$translateChangeSuccess.....");
    	$scope.locale = data.language;      
    });
	  

  }

})();
