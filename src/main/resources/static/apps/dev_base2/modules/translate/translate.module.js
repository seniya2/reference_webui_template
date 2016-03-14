(function() {
  'use strict';

  var module = angular.module('singApp.translate', [
    'ui.router'    
  ]);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.translate', {
        url: '/translate',
        templateUrl: 'modules/translate/translate.html',
        controller: 'TranslateController'
      });
    
  }
  
  module.config(appConfig);
  
  
  
  
})();
