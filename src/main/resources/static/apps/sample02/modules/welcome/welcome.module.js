(function() {
  'use strict';

  var module = angular.module('singApp.welcome', [
    'ui.router'
  ]);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.welcome', {
        url: '/welcome',
        templateUrl: 'modules/welcome/welcome.html',
        controller: 'WelcomeController'
      })
  }
})();