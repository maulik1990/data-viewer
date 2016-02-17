(function (angular) {
  'use strict';

  angular
      .module('egen.app.dialog')
      .controller('AdminTableDialogController', AdminTableDialogController);

  function AdminTableDialogController(columns,ngDialog,adminTableDialogService,adminCardDialogService,$scope){
    var adminDialogVm = this;

    adminDialogVm.columns = columns;

    adminDialogVm.populateLabel = function(tableKey) {
      adminDialogVm.orignalKey = tableKey;
      adminDialogVm.label = tableKey;
    };

    switch ($scope.layout) {
      case 'table':
        adminDialogVm.addColumn = adminTableDialogService.add;
        break;
      case 'card':
        adminDialogVm.addColumn = adminCardDialogService.add;
        break;
      default:
    }
  }

})(angular);
