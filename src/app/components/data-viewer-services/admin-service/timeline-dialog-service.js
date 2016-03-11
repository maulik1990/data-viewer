(function (angular, _) {
    'use strict';

    angular
        .module('egen.app.dataViewerServices')
        .service('adminTimelineDialogService', adminTimelineDialogService);


    function adminTimelineDialogService(ngDialog) {

        var vm = this;

        vm.addTimeLineParams = addTimeLineParams;
        vm.addTimelineInfo = addTimelineInfo;
        //vm.getCoordinates = getCoordinates;
        vm.removeTimeLineParams = removeTimeLineParams;
        vm.clearTimeLineParams = clearTimeLineParams;
        vm.removeTimeLine = removeTimeLine;
        vm.getTimeLineList = getTimeLineList;
        vm.showTimeLine = showTimeLine;
        vm.isTimeLineEnable = isTimeLineEnable;
        vm.isEnable = true;
        vm.timeLineInfo = {};
        vm.timeLineParamObj = {};


        function addTimeLineParams(params,value,id) {
            vm.timeLineParamObj[params] = value;
            ngDialog.close(id,vm.timeLineParamObj);
        }

        function addTimelineInfo(timeLineInfo,timeLineSeq) {
            vm.timeLineInfo[timeLineSeq] = timeLineInfo;
            localStorage.setItem('timeLineData', JSON.stringify(vm.timeLineInfo));
            ngDialog.closeAll(vm.timeLineInfo);
        }

        function clearTimeLineParams(){
            vm.timeLineParamObj = {};
        }

        function removeTimeLineParams(timelineProperty) {
            delete vm.timeLineParamObj[timelineProperty];
        }
        function removeTimeLine(timeLinekey) {

            if(localStorage.timeLineData) {
                var localStorageData = localStorage.getItem("timeLineData");
                vm.timeLineInfo = JSON.parse(localStorageData);
                delete vm.timeLineInfo[timeLinekey];
                localStorage.setItem('timeLineData', JSON.stringify(vm.timeLineInfo));
            }
        }

        function getTimeLineList() {
            if(localStorage.timeLineData) {
                var localStorageData = localStorage.getItem("timeLineData");
                vm.timeLineObj = JSON.parse(localStorageData);
            }
           return vm.timeLineObj;

        }

        function showTimeLine(isEnable){
            vm.isEnable = isEnable;
        }

        function isTimeLineEnable(){
            return vm.isEnable;
        }
    }

})(angular);