(function (angular) {
    'use strict';

    angular
        .module('egen.app.chartview')
        .controller('ChartViewController', ChartViewController);


    function ChartViewController(dataService,adminChartDialogService) {
        var chartVm = this;
        chartVm.checkChartDetail = checkChartDetail;
        chartVm.chartData= dataService;

        chartVm.adminChartInfo =  adminChartDialogService.getChartList();

        chartVm.noOfCharts = Object.keys(chartVm.adminChartInfo);


        function checkChartDetail(chartNumber){
            chartVm.isChartPresent = false;
            if(chartVm.noOfCharts.indexOf(chartNumber) !== -1) {
                chartVm.chartSeqDetail = chartVm.adminChartInfo[chartNumber];
                chartVm.chartType = (Object.keys(chartVm.chartSeqDetail))[0];

                chartVm.isChartPresent = true;
                if(chartVm.isChartPresent) {
                    chartVm.graphParams = chartVm.chartSeqDetail[chartVm.chartType]
                }
            }
            return chartVm.isChartPresent
        }

    }

})(angular);

//chartVm.data= dataService.getChartData();
//
