(function() {
    'use strict';

    angular.module('singApp', [   
        'pascalprecht.translate',// angular-translate
        'tmh.dynamicLocale',// angular-dynamic-locale
        
        'singApp.core',        
        'singApp.welcome'
    ]);
    
})();
