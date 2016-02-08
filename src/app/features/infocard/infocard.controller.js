(function (angular) {
    'use strict';
    angular
        .module('egen.app.infocard')
        .controller('InfoCardController', InfoCardController);

    InfoCardController.$inject = ['$http'];

    function InfoCardController($http) {

        var vm = this;

            $http.get('app/gridinfo.json').
            success(function (data, status, headers, config) {
                vm.sampledata = data;

            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    }

})(angular);