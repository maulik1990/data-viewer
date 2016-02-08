(function (angular) {
    'use strict';

    angular
        .module('egen.app', [
            'ui-notification',

            'egen.app.phoneFilter',
            'egen.app.header',
            'egen.app.footer',
            'egen.app.infotable',
            'egen.app.infocard'

        ])
        .config(moduleConfig)
        .run(moduleRun);

    function moduleConfig($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.when('/', '/app');

        $urlRouterProvider.otherwise(function ($injector) {
            $injector.get('$state').go("egen.404");
        });

        $stateProvider
            .state('egen', {
                url: "/app",
                templateUrl: "app/egen.app.tmpl.html"
            })
            .state('egen.table', {
                url: "/table",
                templateUrl: 'app/features/infotable/infotable.tmpl.html',
                controller: 'InfoTableController',
                controllerAs: 'infoVm'
            })
            .state('egen.cards', {
                url: "/cards",
                templateUrl: 'app/features/infocard/infocard.tmpl.html',
                controller: 'InfoCardController',
                controllerAs: 'cardVm'
            })
            .state('egen.404', {
                templateUrl: 'app/egen.404.tmpl.html'
            });
    }

    function moduleRun() {
    }

})(angular);