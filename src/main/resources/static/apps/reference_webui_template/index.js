(function() {
    'use strict';

    angular.module('singApp', [
        'mwl.confirm',
        'angularSpinner',
        'pascalprecht.translate',// angular-translate
        'tmh.dynamicLocale',// angular-dynamic-locale
        
        'singApp.core',
        'singApp.welcome',
        'singApp.apple'
    ]);
    
       
    var property = {
    	modules : [{
            name: 'WELCOME',
            url: 'app.welcome'
        },{
            name: 'APPLE',
            url: 'app.apple'
        }],
    	messageFiles : [{
            prefix: 'core/resources/messages_',
            suffix: '.json'
        },{
            prefix: 'welcome/resources/messages_',
            suffix: '.json'
        },{
            prefix: 'apple/resources/messages_',
            suffix: '.json'
        }]
    }    
    
    angular.module('singApp').run(function runnalbeFn(confirmationPopoverDefaults) {
		confirmationPopoverDefaults.templateUrl = '../../scripts2/angular-bootstrap-confirm-master/src/angular-bootstrap-confirm.html';
	});
    
    angular.module('singApp').constant('property', property);
    
})();
