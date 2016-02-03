(function (angular) {
  'use strict';

  angular
    .module('app', [
      'ngAnimate',
      'ngMessages',
      'ngTouch',
      'ui.router',
      'ui.bootstrap',
      'angular-loading-bar',

      'egen.app'
    ])
    .config(moduleConfig)
    .run(moduleRun);

  function moduleConfig($locationProvider) {
    $locationProvider.html5Mode(true);
  }

  function moduleRun(CONFIG) {
    console.log(CONFIG);
  }

})(angular);
