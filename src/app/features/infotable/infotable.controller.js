(function (angular) {
    'use strict';

    angular
        .module('egen.app.infotable')
        .controller('InfoTableController', InfoTableController);

    InfoTableController.$inject = ['$http'];

    function InfoTableController($http) {

        var vm = this;

        vm.getInfo = function(){
            $http.get('app/gridinfo.json').
            success(function (data, status, headers, config) {
                vm.sampledata = data;

            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        };

        vm.getInfo();


    }

})(angular);