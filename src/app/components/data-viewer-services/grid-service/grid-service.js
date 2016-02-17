(function (angular, _) {
    'use strict';

    angular
        .module('egen.app.dataViewerServices')
        .service('dataService', dataService);


    function dataService($http,$q) {

        var tableDataService = {};

        var filterdColumns = [];

        tableDataService.getData = function(){
            var deferred = $q.defer();

            $http.get('app/gridinfo.json').
            success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject({ message: "Bad Request" });
            });
            return deferred.promise;
        };


        return tableDataService;

    }

})(angular);