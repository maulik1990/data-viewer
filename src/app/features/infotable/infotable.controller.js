(function (angular) {
    'use strict';

    angular
        .module('egen.app.infotable')
        .controller('InfoTableController', InfoTableController);

    function InfoTableController(dataService,adminTableDialogService,$filter) {

        var infoTableVm = this;
        infoTableVm.getPromise = null;
        infoTableVm.tableContent=null;
        infoTableVm.tableData = {};

        infoTableVm.getPromise = dataService.getData();
        infoTableVm.getPromise.then(function(data) {
            infoTableVm.tableContent = data;
            infoTableVm.tableData = { data: infoTableVm.tableContent };
        });

        if(adminTableDialogService.list().length > 0) {

            infoTableVm.tableColumnList = adminTableDialogService.list();
            infoTableVm.tableData = {
                enableFiltering: true,
                columnDefs: infoTableVm.tableColumnList
            };
        }

        //infoTableVm.refreshData = function() {
        //    infoTableVm.tableData.data = $filter('filter')(infoTableVm.tableContent, infoTableVm.searchText, undefined);
        //};

        infoTableVm.isTableViewEnable = adminTableDialogService.isTableEnable();
    }

})(angular);