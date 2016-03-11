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
        vm.isCardEnable = isCardEnable;
        vm.isEnable = true;
        //vm.cardColumnsColl = [];
        vm.cardKeysObj = {};



        function add(columnField,columnName) {

            vm.key = columnField;
            vm.cardKeysObj[vm.key] = columnName;
            localStorage.setItem('cardData', JSON.stringify(vm.cardKeysObj));
            ngDialog.closeAll(vm.cardKeysObj);
        }

        function remove(cardKey) {
            if(localStorage.cardData) {
                var localStorageData = localStorage.getItem("cardData");
                vm.cardKeysObj = JSON.parse(localStorageData);
                delete vm.cardKeysObj[cardKey];
                console.log()
                localStorage.setItem('cardData', JSON.stringify(vm.cardKeysObj));
            }
        }

        function list() {
            if(localStorage.cardData) {
                var localStorageData = localStorage.getItem("cardData");
                vm.cardKeysObj = JSON.parse(localStorageData);
            }
           return vm.cardKeysObj;

        }

        function showCard(isEnable){
            vm.isEnable = isEnable;
        }

        function isCardEnable(){
            return vm.isEnable;
        }
    }

})(angular);