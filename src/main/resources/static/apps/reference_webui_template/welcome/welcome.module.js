(function() {
	'use strict';

	var module = angular.module('singApp.welcome', [ 'ui.router' ]);

	appConfig.$inject = [ '$stateProvider' ];
	function appConfig($stateProvider) {
		$stateProvider.state('app.welcome', {
			url : '/welcome',
			templateUrl : 'welcome/welcome.html',
			controller : 'welcomeController'
		})
	}

	module.config(appConfig);
})();
