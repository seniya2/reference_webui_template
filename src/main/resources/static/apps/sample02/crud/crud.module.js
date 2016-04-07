(function() {
	'use strict';

	var module = angular.module('singApp.crud', [ 'ui.router', 'angularUtils.directives.dirPagination' ]);

	appConfig.$inject = [ '$stateProvider' ];

	function appConfig($stateProvider) {
		$stateProvider.state('app.crud', {
			url : '/crud',
			templateUrl : 'crud/crud.html',
			controller : 'crudController'
		})
	}

	module.config(appConfig);

})();
