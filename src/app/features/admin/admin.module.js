(function (angular) {
  'use strict';

  angular
      .module('egen.app.admin', [
          'egen.app.admin.data',
          'egen.app.admin.table',
          'egen.app.admin.card',
          'egen.app.admin.chart',
          'egen.app.admin.timeline',
          'egen.app.admin.map'

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
        .state('egen.admin.chart', {
            url: "/chart",
            templateUrl: 'app/features/admin/chart/admin.chart.tmpl.html',
            controller: 'AdminChartController',
            controllerAs: 'adminChartVm'
        })
        .state('egen.admin.timeline', {
            url: "/timeline",
            templateUrl: 'app/features/admin/timeline/admin.timeline.tmpl.html',
            controller: 'AdminTimeLineController',
            controllerAs: 'adminTimeLineVm'
        })
        .state('egen.admin.map', {
            url: "/map",
            templateUrl: 'app/features/admin/map/admin.map.tmpl.html',
            controller: 'AdminMapController',
            controllerAs: 'adminMapVm',
            resolve: {
                dataService: function (dataService) {
                    return dataService.getMapData();
                }
            }
        })
        .state('egen.admin.data', {
            url: "/data",
            templateUrl: 'app/features/admin/data/admin.data.tmpl.html',
            controller: 'AdminDataController',
            controllerAs: 'adminDataVm'
        });

  }

})(angular);
