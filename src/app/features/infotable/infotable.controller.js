(function (angular) {
    'use strict';

    angular
        .module('egen.app.infotable')
        .controller('InfoTableController', InfoTableController);

    function InfoTableController(dataService,adminTableDialogService) {

        var infoTableVm = this;
        var tablePromiseData = null;
        infoTableVm.tableData = {};


        if(adminTableDialogService.list().length > 0) {
            infoTableVm.tableData.columnDefs = adminTableDialogService.list();
        }

        tablePromiseData = dataService.getData();
        tablePromiseData.then(function(data) {
            infoTableVm.tableData = { data: data };
        });

        //
        //console.log(AdminTableDialogService.showTable())
        //infoTableVm.isTableViewEnable = AdminTableDialogService.showTable;

    }

})(angular);