(function (angular, _) {
    'use strict';

    angular
        .module('egen.app.dataViewerServices')
        .service('adminTableDialogService', adminTableDialogService);


    function adminTableDialogService(ngDialog) {

        var vm = this;

        vm.add = add;
        vm.remove = remove;
        vm.list = list;
        vm.showTable = showTable;
        vm.isEnable = true
        vm.tableColumnsCol = [];


        function add(columnField,columnName) {
            vm.tableKeysObj = {field: columnField, name: columnName};
            vm.tableColumnsCol.push(vm.tableKeysObj);
            localStorage.setItem('tableData', JSON.stringify(vm.tableColumnsCol));
            ngDialog.close();
        }

        function remove(columnIndex) {
            if(localStorage.tableData) {
                var localStorageData = localStorage.getItem("tableData");
                vm.tableColumnsCol = JSON.parse(localStorageData);
                console.log(columnIndex);
                vm.tableColumnsCol.splice(columnIndex,1);
                    localStorage.setItem('tableData', JSON.stringify(vm.tableColumnsCol));
            }
        }

        function list() {
            if(localStorage.tableData) {
                var localStorageData = localStorage.getItem("tableData");
                vm.tableColumnsCol = JSON.parse(localStorageData);
            }
            return vm.tableColumnsCol;
        }

        function showTable(isEnable){
            if(isEnable){vm.isEnable = isEnable}
            return vm.isEnable;
        }
    }

})(angular);