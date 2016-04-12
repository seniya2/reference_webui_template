(function() {
	'use strict';

	var module = angular.module('singApp.restangular', [ 'ui.router', 'restangular' ]);

	appConfig.$inject = [ '$stateProvider', 'RestangularProvider' ];
	function appConfig($stateProvider, RestangularProvider) {
		$stateProvider.state('app.restangular', {
			url : '/restangular',
			templateUrl : 'restangular/restangular.html',
			controller : 'restangularController'
		})
		
		RestangularProvider.setResponseExtractor(function(response, operation) {
			
			console.log("RestangularProvider operation : " + operation);
			
			if (operation == "getList") {
				return response._embedded.foos;
			}
			
	        return response;
	    });
		
	}

	module.config(appConfig);
})();
