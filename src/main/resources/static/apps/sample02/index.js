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
        'singApp.translate'
    ]);
    
})();
