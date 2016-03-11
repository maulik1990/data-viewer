(function (angular) {
  'use strict';

  angular
      .module('egen.app.dialog')
      .controller('AdminTimeLineDialogController', AdminTimeLineDialogController);

  function AdminTimeLineDialogController(columns,ngDialog,adminTimelineDialogService,dataService,$scope){
    var adminTimelineDialogVm = this;
    adminTimelineDialogVm.addTimelineInfo = addTimelineInfo;
    adminTimelineDialogVm.removeTimeLineParams = removeTimeLineParams;
    adminTimelineDialogVm.isParamPresent = isParamPresent;
    adminTimelineDialogVm.timeLineInfo = {};

      /**
       * Clear Timelines Params
       */
      adminTimelineDialogService.clearTimeLineParams();


    function addTimelineInfo(){
      adminTimelineDialogVm.addTimelineInfo = adminTimelineDialogService.addTimelineInfo;
      adminTimelineDialogVm.timeLineParams= {};
      adminTimelineDialogVm.timeLineType= {};
      adminTimelineDialogVm.timeLineParamsObj={};

      if(adminTimelineDialogVm.timelineType === 'datatype') {
        adminTimelineDialogVm.timeLineParams["xAxis"] = adminTimelineDialogVm.xAxis;
        adminTimelineDialogVm.timeLineParams["yAxis"] = adminTimelineDialogVm.yAxis;
        adminTimelineDialogVm.timeLineType[adminTimelineDialogVm.timelineType] = adminTimelineDialogVm.timeLineParams;
        adminTimelineDialogVm.addTimelineInfo(adminTimelineDialogVm.timeLineType,$scope.content);

      }
      if(adminTimelineDialogVm.timelineType === 'blocktype') {
        adminTimelineDialogVm.timeLineParams["startTime"] = adminTimelineDialogVm.startTime;
        adminTimelineDialogVm.timeLineParams["endTime"] = adminTimelineDialogVm.endTime;
        adminTimelineDialogVm.timeLineParams["label"] = adminTimelineDialogVm.label;
        adminTimelineDialogVm.timeLineType[adminTimelineDialogVm.timelineType] = adminTimelineDialogVm.timeLineParams;
        adminTimelineDialogVm.addTimelineInfo(adminTimelineDialogVm.timeLineType,$scope.content);
      }
    }

    adminTimelineDialogVm.openDialogue = function (param) {
      var adminTimelineDialogChildVm = $scope.$new();
      adminTimelineDialogChildVm.layout = 'timeline';
      adminTimelineDialogChildVm.param = param;

      adminTimelineDialogChildVm.timeLineDataPromise = dataService.getTimeLineData();

      adminTimelineDialogChildVm.timeLineDataPromise.then(function(data){
        adminTimelineDialogChildVm.sampleData = data;

        adminTimelineDialogChildVm.jsonKeys = Object.keys(adminTimelineDialogChildVm.sampleData[0]);

        adminTimelineDialogChildVm.dataDialog = ngDialog.open({
          template: 'app/components/templates/modalDialog/admin.modal.tmpl.html',
          className: 'ngdialog-theme-default modalDialog-width',
          scope:adminTimelineDialogChildVm,
          controller: "AdminTableDialogController",
          controllerAs: 'adminDialogVm',
          resolve: { columns: function() {
            return adminTimelineDialogChildVm.jsonKeys;
          } }
        }).closePromise.then(function(data){
          if((data.value) && (typeof data.value === "object")){
            adminTimelineDialogVm.timeLineData = data.value;
          }
        });
      });
    };

    function isParamPresent(timeLineParam){
      adminTimelineDialogVm.timeLineParam = null;
      for(var info in adminTimelineDialogVm.timeLineData ) {
        if( adminTimelineDialogVm.timeLineData.hasOwnProperty(info) ) {
          if(timeLineParam === info) {
            switch (info) {
              case 'xAxis':
                adminTimelineDialogVm.xAxis = adminTimelineDialogVm.timeLineData[info];
                break;
              case 'yAxis':
                adminTimelineDialogVm.yAxis = adminTimelineDialogVm.timeLineData[info];
                break;
              case 'startTime':
                adminTimelineDialogVm.startTime = adminTimelineDialogVm.timeLineData[info];
                break;
              case 'endTime':
                adminTimelineDialogVm.endTime = adminTimelineDialogVm.timeLineData[info];
                break;
              case 'label':
                adminTimelineDialogVm.label = adminTimelineDialogVm.timeLineData[info];
                break;
              default:
            }
            return true;

          }
        }
      }
    }

    function removeTimeLineParams(param){
      adminTimelineDialogService.removeTimeLineParams(param);
      adminTimelineDialogVm[param]="";
    }
  }

})(angular);
