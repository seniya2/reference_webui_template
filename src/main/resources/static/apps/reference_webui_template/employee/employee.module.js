(function() {
	'use strict';

	var module = angular.module('singApp.employee', [ 'ui.router', 'angularUtils.directives.dirPagination' ]);

	appConfig.$inject = [ '$stateProvider' ];

	function appConfig($stateProvider) {
		$stateProvider.state('app.employee', {
			url : '/employee',
			templateUrl : 'employee/employee.html',
			controller : 'employeeController'
		})
	}

	module.config(appConfig);

})();
