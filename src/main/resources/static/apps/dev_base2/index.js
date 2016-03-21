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
		confirmationPopoverDefaults.templateUrl='../../scripts/angular-bootstrap-confirm-master/src/angular-bootstrap-confirm.html';
	});
    
    
    
    angular.module('singApp.core').constant('LOCALES', {
	    'locales': {
	        'ko_KR': '한국어',
	        'en_US': 'English'
	    },
	    'preferredLocale': 'ko_KR'
	});

  appConfig.$inject = ['$translateProvider', 'tmhDynamicLocaleProvider'];
  function appConfig($translateProvider, tmhDynamicLocaleProvider) {
	  
    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.useStaticFilesLoader({
    	files: [{
            prefix: 'resources/preference-',
            suffix: '.json'
        }, {
            prefix: 'modules/crud/resources/preference-',
            suffix: '.json'
        }]
    });
    
    $translateProvider.preferredLanguage('ko_KR');
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy(null);
    tmhDynamicLocaleProvider.localeLocationPattern('../../scripts/angular-i18n/angular-locale_{{locale}}.js');
    
  }
  angular.module('singApp.core').config(appConfig);
  
  
  angular.module('singApp.core').service('LocaleService', function ($translate, LOCALES, $rootScope, tmhDynamicLocale) {
	    'use strict';
	    var localesObj = LOCALES.locales;

	    // locales and locales display names
	    var _LOCALES = Object.keys(localesObj);
	    if (!_LOCALES || _LOCALES.length === 0) {
	      console.error('There are no _LOCALES provided');
	    }
	    var _LOCALES_DISPLAY_NAMES = [];
	    _LOCALES.forEach(function (locale) {
	      _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
	    });
	    
	    //var currentLocale = $translate.proposedLanguage();
	    var currentLocale = $translate.use();
	    
	    var checkLocaleIsValid = function (locale) {
	      return _LOCALES.indexOf(locale) !== -1;
	    };
	    
	    var setLocale = function (locale) {
	      if (!checkLocaleIsValid(locale)) {
	        console.error('Locale name "' + locale + '" is invalid');
	        return;
	      }
	      currentLocale = locale;	    
	      $translate.use(locale);
	    };
	    	    
	    $rootScope.$on('$translateChangeSuccess', function (event, data) {
	      document.documentElement.setAttribute('lang', data.language);
	      tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
	    });
	    
	    return {
	      getLocaleDisplayName: function () {
	        return localesObj[currentLocale];
	      },
	      setLocaleByDisplayName: function (localeDisplayName) {
	        setLocale(
	          _LOCALES[
	            _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
	            ]
	        );
	      },
	      getLocalesDisplayNames: function () {
	        return _LOCALES_DISPLAY_NAMES;
	      }
	    };
	});

	angular.module('singApp.core').directive('ngTranslateLanguageSelect', function (LocaleService) { 'use strict';
	
	return {
	    restrict: 'A',
	    replace: true,
	    template: ''+
	    '<div class="language-select" ng-if="visible">'+
	        '<label>'+
	            '{{"directives.language-select.Language" | translate}} '+
	            '<select ng-model="currentLocaleDisplayName"'+
	                'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
	                'ng-change="changeLanguage(currentLocaleDisplayName)">'+
	            '</select>'+
	        '</label>'+
	    '</div>'+
	    '',
	    controller: function ($scope) {
	        $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
	        $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
	        $scope.visible = $scope.localesDisplayNames && $scope.localesDisplayNames.length > 1;	
	        $scope.changeLanguage = function (locale) {
	            LocaleService.setLocaleByDisplayName(locale);
	        };
	    }
	};
	});
    
	
	angular.module('singApp.core').controller('App2', AppController2);	
	AppController2.$inject = ['config', '$scope', '$localStorage', '$state', '$translate', '$rootScope', 'usSpinnerService', '$timeout' ];
	function AppController2(config, $scope, $localStorage, $state, $translate, $rootScope, usSpinnerService, $timeout) {
		  
		console.log("AppController2 --> ");
		  
		$scope.app.globalDisable = false;   
		$scope.$on("app.globalDisable", function(event, msg){
			$scope.app.globalDisable = msg;
		});
		
		$scope.$on("app.massagePopup", function(event, object){
			console.log("--> massagePopup : " + object.msg);			
			try {				
				Messenger({
					extraClasses: 'messenger-fixed messenger-on-top',
	    		    theme: 'air'
				}).post({
					  message: object.msg,
					  type: object.type,
					  showCloseButton: false
				});				
			}catch (e) {
				console.log("massagePopup error :" + e);
			}
		});
		
		$scope.$on("app.disableScreen", function(event, enable){
			console.log("--> disableScreen : " + enable);			
			try {				
				if (enable) {
					$scope.app.globalDisable = enable;				
					usSpinnerService.spin('app-spinner');					
				} else {
					$timeout(function(){
						$scope.app.globalDisable = enable;						
						usSpinnerService.stop('app-spinner');
					}, 500);
				}				
			}catch (e) {
				console.log("disableScreen error :" + e);
			}
		});
		
		
	   
	   
	  }
	
})();
