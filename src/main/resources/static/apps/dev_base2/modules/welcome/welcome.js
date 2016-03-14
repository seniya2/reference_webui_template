(function() {
  'use strict';

  angular.module('singApp.welcome')
    .controller('WelcomeController', WelcomeController);

  WelcomeController.$inject = ['$scope', '$rootScope'];
  function WelcomeController ($scope, $rootScope) {

	 
	  $scope.hello = "hello";
	  
	  $scope.world = function() {
		  window.alert("world");
	  }
	  
  }

  
})();
