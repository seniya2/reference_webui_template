(function() {
	'use strict';

	var module = angular.module('singApp.position', [ 'ui.router', 'angularUtils.directives.dirPagination' ]);

	appConfig.$inject = [ '$stateProvider' ];

	function appConfig($stateProvider) {
		$stateProvider.state('app.position', {
			url : '/position',
			templateUrl : 'position/position.html',
			controller : 'positionController'
		})
	}

	module.config(appConfig);

})();
