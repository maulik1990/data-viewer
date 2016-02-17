(function (angular) {
  'use strict';

  angular
    .module('app', [
      'ngAnimate',
      'ngMessages',
      'ngDialog',
      'ngMap',
      'ngTouch',
      'ui.router',
      'ui.bootstrap',
      'ui.grid',
      'angular-loading-bar',
      'leaflet-directive',
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
