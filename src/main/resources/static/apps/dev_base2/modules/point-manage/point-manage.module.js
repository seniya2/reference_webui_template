(function() {
	'use strict';

	var module = angular.module('singApp.point-manage', [ 
	                                                     'ui.router',
	                                                     'angularUtils.directives.dirPagination']);

	module.config(appConfig);

	appConfig.$inject = [ '$stateProvider' ];

	function appConfig($stateProvider) {
		$stateProvider
		.state('app.point-manage', {
			url : '/point-manage/?entityName',
			templateUrl : 'modules/point-manage/point-manage.html',
			controller : 'PMController'
		})
	}
})();
