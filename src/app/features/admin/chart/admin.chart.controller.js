(function (angular) {
  'use strict';

  angular
      .module('egen.app.admin.chart')
      .controller('AdminChartController', AdminChartController);


  function AdminChartController(ngDialog,$http,$q,adminChartDialogService,dataService,jsonIteratorService,$scope) {

    var adminChartVm = this;
    adminChartVm.isChartEnable = adminChartDialogService.isChartEnable();
    adminChartVm.chartData = adminChartDialogService.getChartList();
    adminChartVm.isKeyPresent = isKeyPresent;
    adminChartVm.removeChart = removeChart;
    adminChartVm.openDialogue = openDialogue;

    adminChartVm.isChartKeyAvailable = false;



    function openDialogue (content) {
      var chartScope = $scope.$new();
      chartScope.layout = 'chart';
      chartScope.content = content;

        chartScope.chartDataPromise = dataService.getData();

        chartScope.chartDataPromise.then(function(data){
        chartScope.sampleData = data;

        adminChartVm.jsonKeys = Object.keys(chartScope.sampleData[0]);
        // adminChartVm.jsonKeys = jsonIteratorService.JsonIterator(chartScope.sampleData[0],'');

        ngDialog.open({
          template: 'app/components/templates/chartDialog/admin.chartdialog.tmpl.html',
          className: 'ngdialog-theme-default dialog-width',
          scope: chartScope,
          controller: "AdminChartDialogController",
          controllerAs: 'adminChartDialogVm',
          resolve: { columns: function() {
            return adminChartVm.jsonKeys;
          } },
        }).closePromise.then(function(data){
            if((data.value) && (typeof data.value === "object")){
                adminChartVm.chartData = data.value;
            }

        });
      });
    }

      function isKeyPresent(key){
          for(var chartKey in adminChartVm.chartData ) {
              if( adminChartVm.chartData.hasOwnProperty(chartKey) ) {
                  if(key === chartKey) {
                      switch (chartKey) {
                          case 'chart1':
                              adminChartVm.chart1 = adminChartVm.chartData[chartKey];
                              adminChartVm.chart1 = (Object.keys(adminChartVm.chart1))[0];
                              break;
                          case 'chart2':
                              adminChartVm.chart2 = adminChartVm.chartData[chartKey];
                              adminChartVm.chart2 = (Object.keys(adminChartVm.chart2))[0];
                              break;
                          case 'chart3':
                              adminChartVm.chart3 = adminChartVm.chartData[chartKey];
                              adminChartVm.chart3 = (Object.keys(adminChartVm.chart3))[0];
                              break;
                          case 'chart4':
                              adminChartVm.chart4 = adminChartVm.chartData[chartKey];
                              adminChartVm.chart4 = (Object.keys(adminChartVm.chart4))[0];
                              break;
                          default:
                      }
                      return true;

                  }
              }
          }
      }

    function removeChart(chartKey){
      adminChartDialogService.removeChart(chartKey);
      adminChartVm.chartData = adminChartDialogService.getChartList();
    }

    adminChartVm.saveSettings = function(isChartEnable){
      adminChartVm.isChartEnable = isChartEnable;
      adminChartDialogService.showChart(adminChartVm.isChartEnable);
    };
  }

})(angular);

