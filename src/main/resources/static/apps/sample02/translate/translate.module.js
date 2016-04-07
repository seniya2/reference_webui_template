(function() {
	'use strict';

	var module = angular.module('singApp.translate', [ 'ui.router' ]);

	appConfig.$inject = [ '$stateProvider' ];

	function appConfig($stateProvider) {
		$stateProvider.state('app.translate', {
			url : '/translate',
			templateUrl : 'translate/translate.html',
			controller : 'translateController'
		});

	}

	module.config(appConfig);

})();
