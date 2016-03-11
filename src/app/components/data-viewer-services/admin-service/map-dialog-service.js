(function (angular, _) {
    'use strict';

    angular
        .module('egen.app.dataViewerServices')
        .service('adminMapDialogService', adminMapDialogService);


    function adminMapDialogService(ngDialog) {

        var vm = this;

        vm.add = add;
        vm.remove = remove;
        vm.list = list;
        vm.showMap = showMap;
        vm.isMapEnable = isMapEnable;
        vm.isEnable = true;
        vm.mapKeysObj = {};



        function add(columnField,columnName) {

            vm.key = columnField;
            vm.mapKeysObj[vm.key] = columnName;
            localStorage.setItem('mapData', JSON.stringify(vm.mapKeysObj));
            ngDialog.closeAll(vm.mapKeysObj);
        }

        function remove(mapKey) {
            if(localStorage.mapData) {
                var localStorageData = localStorage.getItem("mapData");
                vm.mapKeysObj = JSON.parse(localStorageData);
                delete vm.mapKeysObj[mapKey];
                console.log()
                localStorage.setItem('mapData', JSON.stringify(vm.mapKeysObj));
            }
        }

        function list() {
            if(localStorage.mapData) {
                var localStorageData = localStorage.getItem("mapData");
                vm.mapKeysObj = JSON.parse(localStorageData);
            }
            return vm.mapKeysObj;

        }

        function showMap(isEnable){
            vm.isEnable = isEnable;
        }

        function isMapEnable(){
            return vm.isEnable;
        }
    }

})(angular);