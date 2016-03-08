(function() {
	'use strict';

	var module = angular.module('singApp.crud', [ 'ui.router', 'angularUtils.directives.dirPagination' ]);

	module.config(appConfig);

	appConfig.$inject = [ '$stateProvider' ];

	function appConfig($stateProvider) {
		$stateProvider.state('app.crud', {
			url : '/crud',
			templateUrl : 'dev_base2/modules/crud/crud.html',
			controller : 'crudController'
		})
	}
})();
