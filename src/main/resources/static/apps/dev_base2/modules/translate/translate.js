(function() {
  'use strict';

  
  angular.module('singApp.translate')
    .controller('TranslateController', TranslateController);

  TranslateController.$inject = ['$scope','$rootScope','$translate','$interval'];
  function TranslateController ($scope,$rootScope,$translate, $interval) {
 

	  $translate('setting_network_ui').then(function (translation) {
		  $scope.translatedText = translation;
		  console.log($scope.translatedText);
		});
	  
	$scope.setting_network_ui =  $translate('setting_network_ui');
	console.log("$scope.setting_network_ui : " + $translate('setting_network_ui').$$state.status);
	console.log($scope.setting_network_ui);
	
	
	console.log($translate('setting_network_ui').$$state.status);
	
	
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
    	console.log("$translateChangeSuccess.....");
      $scope.locale = data.language;      
      
      $translate('TITLE').then(function (headline) {
		  console.log("$translate('TITLE').....");
		    $scope.headline = headline;
		  });
      
    });
	  
    
    
    
    //$translateProvider.preferredLanguage('en_US');
    //window.alert($translate.proposedLanguage());
  }
  
  

  
  

  
})();
