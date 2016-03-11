(function (angular) {
  'use strict';

  angular
      .module('egen.app.dialog')
      .controller('AdminTableDialogController', AdminTableDialogController);

  function AdminTableDialogController(columns,ngDialog,adminTimelineDialogService,adminChartDialogService,adminTableDialogService,adminCardDialogService,adminMapDialogService,$scope){
    var adminDialogVm = this;
    adminDialogVm.addData = addData;

    adminDialogVm.columns = columns;
    adminDialogVm.content = $scope.content;
    adminDialogVm.dataDialog = $scope.ngDialogId;
    adminDialogVm.param = $scope.param;
    adminDialogVm.layout = $scope.layout;

    adminDialogVm.populateLabel = function(tableKey) {
      adminDialogVm.orignalKey = tableKey;
      adminDialogVm.label = tableKey;
      adminDialogVm.activeTab = tableKey;

    };

    function addData(){
      switch (adminDialogVm.layout) {
        case 'table':
          adminDialogVm.addTableColumn = adminTableDialogService.add;
          adminDialogVm.addTableColumn(adminDialogVm.orignalKey,adminDialogVm.label);
          break;
        case 'card':
          adminDialogVm.addCardColumn = adminCardDialogService.add;
          adminDialogVm.addCardColumn(adminDialogVm.content,adminDialogVm.label);
          break;
        case 'map':
          adminDialogVm.addMapColumn = adminMapDialogService.add;
          adminDialogVm.addMapColumn(adminDialogVm.content,adminDialogVm.label);
          break;
        case 'chart':
          adminDialogVm.addCoordinates = adminChartDialogService.addCoordinates;
          adminDialogVm.addCoordinates(adminDialogVm.param,adminDialogVm.label,adminDialogVm.dataDialog);
          break;
        case 'timeline':
          adminDialogVm.addTimeLineParams = adminTimelineDialogService.addTimeLineParams;
          adminDialogVm.addTimeLineParams(adminDialogVm.param,adminDialogVm.label,adminDialogVm.dataDialog);
          break;
      }
    }
  }

})(angular);
