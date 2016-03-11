(function (angular) {
  'use strict';

  angular
      .module('egen.app.admin.table')
      .controller('AdminTableController', AdminTableController);

  function AdminTableController(ngDialog,$http,$q,adminTableDialogService,dataService,$scope) {
    var adminTableVm = this;
    adminTableVm.isTableEnable = adminTableDialogService.isTableEnable();


  adminTableVm.openDialogue = function () {
    var tableScope = $scope.$new();
    tableScope.layout = 'table';

    var tableDataPromise = dataService.getData();

    tableDataPromise.then(function(data){
      adminTableVm.sampleData = data;

      adminTableVm.jsonKeys = Object.keys(adminTableVm.sampleData[0]);

      ngDialog.open({
        template: 'app/components/templates/modalDialog/admin.modal.tmpl.html',
        className: 'ngdialog-theme-default dialog-width',
        scope:tableScope,
        controller: "AdminTableDialogController",
        controllerAs: 'adminDialogVm',
        resolve: { columns: function() {
          return adminTableVm.jsonKeys;
        } }
      });
    });
    };

    adminTableVm.list = adminTableDialogService.list();

    adminTableVm.removeColumn = function (colIndex) {
      adminTableDialogService.remove(colIndex);
      adminTableVm.list = adminTableDialogService.list();
    };

    adminTableVm.saveSettings = function(isTableEnable){
      adminTableVm.isTableEnable = isTableEnable;
      adminTableDialogService.showTable(adminTableVm.isTableEnable);
    };

  }

})(angular);
