(function (angular) {
    'use strict';

    angular
        .module('egen.app', [
            'ui-notification',
            'egen.app.dataViewerServices',
            'egen.app.dataViewerDirectives',
            'egen.app.dialog',
            'egen.app.admin',
            'egen.app.phoneFilter',
            'egen.app.header',
            'egen.app.footer',
            'egen.app.infotable',
            'egen.app.chartview',
            'egen.app.timeline',
            'egen.app.infocard',
            'egen.app.mapview'

        ])
        .config(moduleConfig)
        .run(moduleRun);

    function moduleConfig($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.when('/', '/app/table');

        $urlRouterProvider.otherwise(function ($injector) {
            $injector.get('$state').go("egen.404");
        });

        $stateProvider
            .state('egen', {
                url: '/app',
                views: {
                    '@': {
                        templateUrl: 'app/egen.app.tmpl.html'
                    },
                'header@egen': {
                    templateUrl: 'app/features/header/header.tmpl.html',
                    controller: 'HeaderController',
                    controllerAs: 'headerVm'

                    }
                }
            })
            .state('egen.table', {
                url: "/table",
                templateUrl: 'app/features/infotable/infotable.tmpl.html',
                controller: 'InfoTableController',
                controllerAs: 'infoVm'
            })
            .state('egen.admin', {
                url: "/admin",
                templateUrl: 'app/features/admin/admin.tmpl.html',
                controller: 'AdminViewController',
                controllerAs: 'adminVm',
            })
            .state('egen.cards', {
                url: "/cards",
                templateUrl: 'app/features/infocard/infocard.tmpl.html',
                controller: 'InfoCardController',
                controllerAs: 'cardVm'
            })
            .state('egen.timeline', {
                url: "/timeline",
                templateUrl: 'app/features/timeline/timeline.tmpl.html',
                controller: 'TimeLineController',
                controllerAs: 'timelineVm',
                resolve: {
                    dataService: function (dataService) {
                        return dataService.getTimeLineData();
                    }
                }
            })
            .state('egen.charts', {
                url: "/charts",
                templateUrl: 'app/features/chartview/charts.tmpl.html',
                controller: 'ChartViewController',
                controllerAs: 'chartVm',
                resolve: {
                    dataService: function (dataService) {
                        return dataService.getChartData();
                    }
                }
            })
            .state('egen.map', {
                url: "/map",
                templateUrl: 'app/features/mapview/mapview.tmpl.html',
                controller: 'MapViewController',
                controllerAs: 'mapVm',
                resolve: {
                    dataService: function (dataService) {
                        return dataService.getMapData();
                    }
                }
            })
            .state('egen.404', {
                templateUrl: 'app/egen.404.tmpl.html'
            });
    }

    function moduleRun() {
    }

})(angular);