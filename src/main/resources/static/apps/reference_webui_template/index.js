(function() {
    'use strict';

    angular.module('singApp', [
        'mwl.confirm',
        'angularSpinner',
        'pascalprecht.translate',// angular-translate
        'tmh.dynamicLocale',// angular-dynamic-locale
        
        'singApp.core',
        'singApp.welcome',
        'singApp.apple',
        'singApp.blog',
        'singApp.position',
        'singApp.employee'
    ]);
    
       
    var property = {
    	modules : [{
            name: 'WELCOME',
            url: 'app.welcome'
        },{
            name: 'APPLE',
            url: 'app.apple'
        },{
            name: 'BLOG',
            url: 'app.blog'
        },{
            name: 'POSITION',
            url: 'app.position'
        },{
            name: 'EMPLOYEE',
            url: 'app.employee'
        },],
    	messageFiles : [{
            prefix: 'core/resources/messages_',
            suffix: '.json'
        },{
            prefix: 'welcome/resources/messages_',
            suffix: '.json'
        },{
            prefix: 'apple/resources/messages_',
            suffix: '.json'
        },{
            prefix: 'blog/resources/messages_',
            suffix: '.json'
        },{
            prefix: 'position/resources/messages_',
            suffix: '.json'
        },{
            prefix: 'employee/resources/messages_',
            suffix: '.json'
        }]
    }    
    
    
    indexController.$inject = [ '$scope', '$rootScope'];
	function indexController($scope, $rootScope) {
		console.log("indexController -->");
		$rootScope.property = property;
		$rootScope.$broadcast("app.massageProperty", true);
	}
    
    angular.module('singApp').run(function runnalbeFn(confirmationPopoverDefaults) {
		confirmationPopoverDefaults.templateUrl = '../../scripts2/angular-bootstrap-confirm-master/src/angular-bootstrap-confirm.html';
	});
    
    angular.module('singApp').constant('property', property);
    angular.module('singApp').controller('indexController', indexController);
    
})();
