(function() {
	'use strict';
	
	var locales = {
			'locales' : {
				'ko_KR' : '한국어',
				'en_US' : 'English'
			},
			'preferredLocale' : 'ko_KR'
	}

	appConfig.$inject = [ '$translateProvider', 'tmhDynamicLocaleProvider' ];
	function appConfig($translateProvider, tmhDynamicLocaleProvider) {

		$translateProvider.useMissingTranslationHandlerLog();
		$translateProvider.useStaticFilesLoader({
			files: [{
	            prefix: 'core/resources/messages_',
	            suffix: '.json'
	        }, {
	            prefix: 'crud/resources/messages_',
	            suffix: '.json'
	        }]
		});

		$translateProvider.preferredLanguage('en_US');
		$translateProvider.useLocalStorage();
		$translateProvider.useSanitizeValueStrategy(null);
		tmhDynamicLocaleProvider.localeLocationPattern('../../scripts/angular-i18n/angular-locale_{{locale}}.js');

	}
	
	LocaleService.$inject = [ '$translate', 'LOCALES', '$rootScope', 'tmhDynamicLocale' ];
	function LocaleService($translate, LOCALES, $rootScope, tmhDynamicLocale) {
		'use strict';
		var localesObj = LOCALES.locales;

		// locales and locales display names
		var _LOCALES = Object.keys(localesObj);
		if (!_LOCALES || _LOCALES.length === 0) {
			console.error('There are no _LOCALES provided');
		}
		var _LOCALES_DISPLAY_NAMES = [];
		_LOCALES.forEach(function(locale) {
			_LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
		});

		//var currentLocale = $translate.proposedLanguage();
		var currentLocale = $translate.use();

		var checkLocaleIsValid = function(locale) {
			return _LOCALES.indexOf(locale) !== -1;
		};

		var setLocale = function(locale) {
			if (!checkLocaleIsValid(locale)) {
				console.error('Locale name "' + locale + '" is invalid');
				return;
			}
			currentLocale = locale;
			$translate.use(locale);
		};

		$rootScope.$on('$translateChangeSuccess', function(event, data) {
			document.documentElement.setAttribute('lang', data.language);
			tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
		});

		return {
			getLocaleDisplayName : function() {
				return localesObj[currentLocale];
			},
			setLocaleByDisplayName : function(localeDisplayName) {
				setLocale(_LOCALES[_LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
				]);
			},
			getLocalesDisplayNames : function() {
				return _LOCALES_DISPLAY_NAMES;
			}
		};
	}
	
	ngTranslateLanguageSelect.$inject = ['LocaleService'];
	function ngTranslateLanguageSelect(LocaleService) {
		'use strict';

		return {
			restrict : 'A',
			replace : true,
			template : '' + '<div class="language-select" ng-if="visible">' + '<label>'
					+ '{{"directives.language-select.Language" | translate}} '
					+ '<select ng-model="currentLocaleDisplayName"'
					+ 'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'
					+ 'ng-change="changeLanguage(currentLocaleDisplayName)">' + '</select>' + '</label>'
					+ '</div>' + '',
			controller : function($scope) {
				$scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
				$scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
				$scope.visible = $scope.localesDisplayNames && $scope.localesDisplayNames.length > 1;
				$scope.changeLanguage = function(locale) {
					LocaleService.setLocaleByDisplayName(locale);
				};
			}
		};
	}
	
	angular.module('singApp.core').config(appConfig);
	angular.module('singApp.core').constant('LOCALES', locales);
	angular.module('singApp.core').service('LocaleService',LocaleService);
	angular.module('singApp.core').directive('ngTranslateLanguageSelect', ngTranslateLanguageSelect);
	
})();
