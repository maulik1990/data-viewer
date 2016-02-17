(function (angular, _) {
    'use strict';

    angular
        .module('egen.app.dataViewerServices')
        .service('adminCardDialogService', adminCardDialogService);


    function adminCardDialogService(ngDialog) {

        var vm = this;

        vm.add = add;
        vm.remove = remove;
        vm.list = list;
        vm.showCard = showCard;
        vm.isEnable = true
        vm.cardColumnsColl = [];


        function add(columnField,columnName) {
            vm.cardKeysObj = {field: columnField, name: columnName};
            vm.cardColumnsColl.push(vm.cardKeysObj);
            localStorage.setItem('cardData', JSON.stringify(vm.cardColumnsColl));
            ngDialog.close();
        }

        function remove(columnIndex) {
            if(localStorage.cardData) {
                var localStorageData = localStorage.getItem("cardData");
                vm.cardColumnsColl = JSON.parse(localStorageData);
                vm.cardColumnsColl.splice(columnIndex,1);
                localStorage.setItem('cardData', JSON.stringify(vm.cardColumnsColl));
            }
        }

        function list() {
            if(localStorage.cardData) {
                var localStorageData = localStorage.getItem("cardData");
                vm.cardColumnsColl = JSON.parse(localStorageData);
            }
            return vm.cardColumnsColl;
        }

        function showCard(isEnable){
            if(isEnable){vm.isEnable = isEnable}
            return vm.isEnable;
        }
    }

})(angular);