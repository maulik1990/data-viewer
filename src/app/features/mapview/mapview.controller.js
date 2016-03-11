(function (angular) {
    'use strict';

    angular
        .module('egen.app.mapview')
        .controller('MapViewController', MapViewController);


    function MapViewController(dataService,adminMapDialogService,$rootScope,$scope) {
        var mapVm = this;
        mapVm.demo='demo';
        mapVm.markers = [];
        //mapVm.demoFunction = demoFunction;
        $rootScope.mapKeyLookup = mapKeyLookup;
        $rootScope.mapKeyLookupValue = mapKeyLookupValue;


        $rootScope.mapData = dataService;
        $rootScope.mapKeys = adminMapDialogService.list();

        angular.forEach($rootScope.mapData, function(mapInfo, i) {
                mapVm.markers.push({
                    lat: mapInfo.location.latitude,
                    lng: mapInfo.location.longitude,
                    message: "<dv-map-popup lookupvalue='mapKeyLookupValue(data,key)' keys='mapKeys' data='mapData[" + i + "]' lookup='mapKeyLookup(key)'></dv-map-popup>"
                });
            });

        mapVm.centerLoc = {
            lat:41.881832,
            lng:-87.623177,
            zoom: 4
        }

        function mapKeyLookup(key) {
            for (var mapKey in $rootScope.mapKeys) {
                if ($rootScope.mapKeys.hasOwnProperty(mapKey)) {
                    if (mapKey === key) {
                        mapVm.isMapKeyAvailable = true;
                        return mapVm.isMapKeyAvailable;
                    }
                }
            }
        }

        function mapKeyLookupValue(data,key) {
            console.log('inside',data);
            mapVm.splitJsonKeys = key.split('.');

            for(var i=0;i < mapVm.splitJsonKeys.length; i++){
                data = data[mapVm.splitJsonKeys[i]];
            }
        return data;
        }

        //$scope.$on('leafletDirectiveMarker.click', function (e, args) {
        //    console.log(args);
        //    mapVm.markers[args.modelName].message= "<dv-map-popup lookupvalue='mapKeyLookupValue(data,key)' keys='mapKeys' data='mapData[" + args.modelName + "]' lookup='mapKeyLookup(key)'></dv-map-popup>";
        //
        //});

    }

})(angular);