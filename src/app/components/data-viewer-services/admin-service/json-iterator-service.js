/**
 * Created by maulikshah on 2/25/16.
 */

(function (angular, _) {
    'use strict';

    angular
        .module('egen.app.dataViewerServices')
        .service('jsonIteratorService', jsonIteratorService);


    function jsonIteratorService() {

        var vm = this;
        vm.keysArray = [];
        vm.JsonIterator = JsonIterator;
        vm.getJsonKeys = getJsonKeys;

        function JsonIterator(obj, stack) {
            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (obj[property] instanceof Array) {
                        JsonIterator(obj[property][0], stack + '.' + property);
                    }
                    else if(typeof obj[property] == "object"){
                        JsonIterator(obj[property], stack + '.' + property);
                    }
                    else {
                        vm.jsonKey= stack + '.' + property
                        vm.keysArray.push(vm.jsonKey.substring(1));
                    }
                }
            }
        }

        function getJsonKeys(){
            return vm.keysArray;
        }
    }

})(angular);
