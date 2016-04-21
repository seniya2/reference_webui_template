(function() {
    'use strict';

    angular.module('singApp', [
        'mwl.confirm',
        'angularSpinner',
        'pascalprecht.translate',// angular-translate
        'tmh.dynamicLocale',// angular-dynamic-locale
        
        'singApp.core',
        'singApp.welcome',
        'singApp.crud',
        'singApp.translate',
        'singApp.restangular'
    ]);
    
    var property = {
        	modules : [{
                name: 'WELCOME',
                url: 'app.welcome'
            },{
                name: 'CRUD',
                url: 'app.crud'
            },{
                name: 'TRANSLATE',
                url: 'app.translate'
            },{
                name: 'REST-ANGULAR',
                url: 'app.restangular'
            }],
        	messageFiles : [{
                prefix: 'core/resources/messages_',
                suffix: '.json'
            },{
                prefix: 'welcome/resources/messages_',
                suffix: '.json'
            },{
                prefix: 'crud/resources/messages_',
                suffix: '.json'
            },{
                prefix: 'translate/resources/messages_',
                suffix: '.json'
            }]
        }    
        
    angular.module('singApp').run(function runnalbeFn(confirmationPopoverDefaults) {
		confirmationPopoverDefaults.templateUrl = '../scripts2/angular-bootstrap-confirm-master/src/angular-bootstrap-confirm.html';
	});
    
    angular.module('singApp').constant('property', property);
    
})();
