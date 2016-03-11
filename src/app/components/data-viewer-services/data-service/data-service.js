(function (angular, _) {
    'use strict';

    angular
        .module('egen.app.dataViewerServices')
        .service('dataService', dataService);


    function dataService($http,$q,$log) {

        var self = this;
        self.getData = getData;
        self.getMapData = getMapData;
        self.getChartData = getChartData;
        self.getTimeLineData = getTimeLineData;

        /*
            Retrive aata from localJSOn file
            Retruns promise
         */
        function getData(){
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

        /*
            Retrive map data which consist Latitude and Longitude
         */

        function getMapData(){
            var deferred = $q.defer();

            $http.get('app/mapData.json').
            success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject({ message: "Bad Request" });
            });
            return deferred.promise;
        }

        function getChartData(){
            var deferred = $q.defer();

            $http.get('app/chart.json').
            success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject({ message: "Bad Request" });
            });
            return deferred.promise;
        }

        function getTimeLineData(){
            var deferred = $q.defer();

            $http.get('app/timeline.json').
            success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject({ message: "Bad Request" });
            });
            return deferred.promise;
        }



    }

})(angular);