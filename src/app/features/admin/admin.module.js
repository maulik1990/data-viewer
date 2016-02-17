(function (angular) {
  'use strict';

  angular
      .module('egen.app.admin', [
          'egen.app.admin.data',
          'egen.app.admin.table',
          'egen.app.admin.card'

      ])
      .config(moduleConfig);

  function moduleConfig($stateProvider) {

    $stateProvider
        .state('egen.admin.table', {
          url: "/table",
          templateUrl: 'app/features/admin/table/admin.table.tmpl.html',
          controller: 'AdminTableController',
          controllerAs: 'adminTableVm'
        })
        .state('egen.admin.card', {
            url: "/card",
            templateUrl: 'app/features/admin/card/admin.card.tmpl.html',
            controller: 'AdminCardController',
            controllerAs: 'adminCardVm'
        })
        .state('egen.admin.data', {
            url: "/data",
            templateUrl: 'app/features/admin/data/admin.data.tmpl.html',
            controller: 'AdminDataController',
            controllerAs: 'adminDataVm'
        });
  }

})(angular);
