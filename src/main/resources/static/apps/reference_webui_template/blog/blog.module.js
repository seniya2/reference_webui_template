(function() {
	'use strict';

	var module = angular.module('singApp.blog', [ 'ui.router', 'angularUtils.directives.dirPagination' ]);

	appConfig.$inject = [ '$stateProvider' ];

	function appConfig($stateProvider) {
		$stateProvider.state('app.blog', {
			url : '/blog',
			templateUrl : 'blog/blog.html',
			controller : 'blogController'
		})
	}

	module.config(appConfig);

})();
