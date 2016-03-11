(function (angular) {
  'use strict';

  angular
      .module('egen.app.dialog')
      .controller('AdminChartDialogController', AdminChartDialogController);

  function AdminChartDialogController(columns,ngDialog,adminChartDialogService,dataService,$scope){
    var adminChartDialogVm = this;
    adminChartDialogVm.addChartInfo = addChartInfo;
    adminChartDialogVm.removeColumn = removeColumn;
    adminChartDialogVm.isAxisPresent = isAxisPresent;

    /**
     * Clear Chart Params
     */
    adminChartDialogService.clearChartParams();


    function addChartInfo(){
      adminChartDialogVm.addChartinfo = adminChartDialogService.addChartInfo;
      adminChartDialogVm.addChartinfo(adminChartDialogVm.xAxis,adminChartDialogVm.yAxis,
          adminChartDialogVm.chartType,adminChartDialogVm.height,adminChartDialogVm.width,$scope.content);
    }

    function removeColumn(axis){
      adminChartDialogService.removeCoordinates(axis);
      adminChartDialogVm[axis]="";
    }

    adminChartDialogVm.openDialogue = function (axis) {
      var adminChartDialogChildVm = $scope.$new();
      adminChartDialogChildVm.layout = 'chart';
      adminChartDialogChildVm.param = axis;

      adminChartDialogChildVm.chartDataPromise = dataService.getChartData();

      adminChartDialogChildVm.chartDataPromise.then(function(data){
        adminChartDialogChildVm.sampleData = data;

        adminChartDialogChildVm.jsonKeys = Object.keys(adminChartDialogChildVm.sampleData[0]);

        adminChartDialogChildVm.dataDialog = ngDialog.open({
          template: 'app/components/templates/modalDialog/admin.modal.tmpl.html',
          className: 'ngdialog-theme-default modalDialog-width',
          scope:adminChartDialogChildVm,
          controller: "AdminTableDialogController",
          controllerAs: 'adminDialogVm',
          resolve: { columns: function() {
            return adminChartDialogChildVm.jsonKeys;
          } }
        }).closePromise.then(function(data){
          if((data.value) && (typeof data.value === "object")){
            adminChartDialogVm.axisData = data.value;
          }

        });
      });
    };

    function isAxisPresent(axis){
      adminChartDialogVm.axis = null;
      for(var axisInfo in adminChartDialogVm.axisData ) {
        if( adminChartDialogVm.axisData.hasOwnProperty(axisInfo) ) {
          if(axis === axisInfo) {
            switch (axisInfo) {
              case 'xAxis':
                adminChartDialogVm.xAxis = adminChartDialogVm.axisData[axisInfo];
                break;
              case 'yAxis':
                adminChartDialogVm.yAxis = adminChartDialogVm.axisData[axisInfo];
                break;
              default:
            }
            return true;

          }
        }
      }
    }
  }

})(angular);
