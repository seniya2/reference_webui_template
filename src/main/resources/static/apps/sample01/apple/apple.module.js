(function() {
	'use strict';

	var module = angular.module('singApp.apple', [ 'ui.router', 'angularUtils.directives.dirPagination' ]);

	appConfig.$inject = [ '$stateProvider' ];

	function appConfig($stateProvider) {
		$stateProvider.state('app.apple', {
			url : '/apple',
			templateUrl : 'apple/apple.html',
			controller : 'appleController'
		})
	}

	module.config(appConfig);

})();
