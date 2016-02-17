(function (angular) {
    'use strict';
    angular
        .module('egen.app.infocard')
        .controller('InfoCardController', InfoCardController);


    function InfoCardController(dataService) {
        var infoCardVm = this;

        var tablePromiseData = dataService.getData();

        tablePromiseData.then(function(data) {
            infoCardVm.sampleData = data;
        });
    }
})(angular);