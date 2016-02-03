(function (angular) {
    'use strict';

    angular
        .module('egen.app', [
            'ui-notification',

            'egen.app.phoneFilter',
            'egen.app.header',
            'egen.app.footer'

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
                url: '/app',
                views: {
                    '@': {
                        templateUrl: 'app/egen.app.tmpl.html'
                    },
                    'header@egen': {
                        templateUrl: 'app/features/header/header.tmpl.html',
                        controller: 'HeaderController',
                        controllerAs: 'headerVm'
                    },
                    'footer@egen': {
                        templateUrl: 'app/features/footer/footer.tmpl.html',
                        controller: 'FooterController',
                        controllerAs: 'footerVm'
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
