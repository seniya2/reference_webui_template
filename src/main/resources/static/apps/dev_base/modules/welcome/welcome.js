(function() {
  'use strict';

  angular.module('singApp.welcome')
    .controller('WelcomeController', WelcomeController);

  WelcomeController.$inject = ['$scope'];
  function WelcomeController ($scope) {

	  
	  $scope.hello = "hello";
	  
	  $scope.world = function() {
		  
		  window.alert("world");
		  
	  }
	  
  }

  
})();
