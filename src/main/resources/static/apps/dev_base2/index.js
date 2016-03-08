(function() {
    'use strict';

    angular.module('singApp', [
        'singApp.core',
        'singApp.welcome',
        'singApp.crud',
        
        'mwl.confirm',
        'angularSpinner'
        
        /*
        'singApp.form.elements',
        'singApp.inbox',
        'singApp.maps.google',
        'singApp.maps.vector',
        'singApp.ui.components',
        'singApp.ui.notifications',
        'singApp.ui.icons',
        'singApp.ui.buttons',
        'singApp.ui.tabs-accordion',
        'singApp.ui.list-groups',        
        'singApp.extra.calendar',
        'singApp.extra.invoice',
        'singApp.login',
        'singApp.error',
        'singApp.extra.gallery',
        'singApp.extra.search',
        'singApp.extra.timeline',        
        'singApp.grid',
        'singApp.profile',
        'singApp.widgets',
        'singApp.charts',
        'singApp.form.validation',
        'singApp.form.wizard',        
        'singApp.tables.basic',
       'singApp.tables.dynamic'
        */
        
    ]);
    
    angular.module('singApp').run(function(confirmationPopoverDefaults) {
		confirmationPopoverDefaults.templateUrl='../scripts/angular-bootstrap-confirm-master/src/angular-bootstrap-confirm.html';
		//console.log(confirmationPopoverDefaults); // View all the defaults you can change
	});
})();
