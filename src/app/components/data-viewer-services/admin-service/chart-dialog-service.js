(function (angular, _) {
    'use strict';

    angular
        .module('egen.app.dataViewerServices')
        .service('adminChartDialogService', adminChartDialogService);


    function adminChartDialogService(ngDialog) {

        var vm = this;

        vm.addCoordinates = addCoordinates;
        vm.addChartInfo = addChartInfo;
        vm.getCoordinates = getCoordinates;
        vm.removeCoordinates = removeCoordinates;
        vm.clearChartParams = clearChartParams;
        vm.removeChart = removeChart;
        vm.getChartList = getChartList;
        vm.showChart = showChart;
        vm.isChartEnable = isChartEnable;
        vm.isEnable = true;
        vm.chartInfo = {};
        vm.chartParams= {};
        vm.chartType= {};
        vm.chartAxisObj = {};



        function addCoordinates(axis,value,id) {
            vm.chartAxisObj[axis] = value;
            ngDialog.close(id,vm.chartAxisObj);
        }

        function addChartInfo(xAxis,yAxis,chartType,height,width,chart) {
            vm.chartParams= {};vm.chartType= {};vm.chartAxisObj={};
            vm.chartParams["xAxis"] = xAxis;
            vm.chartParams["yAxis"] = yAxis;
            vm.chartParams["height"] = height;
            vm.chartParams["width"] = width;

            vm.chartType[chartType] = vm.chartParams;
            vm.chartInfo[chart] = vm.chartType;
            localStorage.setItem('chartData', JSON.stringify(vm.chartInfo));
            ngDialog.closeAll(vm.chartInfo);
        }

        function getCoordinates(){
            return vm.chartAxisObj;
        }

        function clearChartParams(){
            vm.chartAxisObj = {};
        }

        function removeCoordinates(axisKey) {
            delete vm.chartAxisObj[axisKey];
        }
        function removeChart(chartKey) {

            if(localStorage.chartData) {
                var localStorageData = localStorage.getItem("chartData");
                vm.chartInfo = JSON.parse(localStorageData);
                delete vm.chartInfo[chartKey];
                localStorage.setItem('chartData', JSON.stringify(vm.chartInfo));
            }
        }

        function getChartList() {
            if(localStorage.chartData) {
                var localStorageData = localStorage.getItem("chartData");
                vm.chartKeysObj = JSON.parse(localStorageData);
            }
           return vm.chartKeysObj;

        }

        function showChart(isEnable){
            vm.isEnable = isEnable;
        }

        function isChartEnable(){
            return vm.isEnable;
        }
    }

})(angular);