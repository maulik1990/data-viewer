(function (angular) {
  'use strict';

  angular
      .module('egen.app.admin.timeline')
      .controller('AdminTimeLineController', AdminTimeLineController);


  function AdminTimeLineController(ngDialog,$http,$q,dataService,$scope,adminTimelineDialogService) {
    var adminTimeLineVm = this;

    adminTimeLineVm.isTimeLineEnable = adminTimelineDialogService.isTimeLineEnable();
    adminTimeLineVm.timeLineData = adminTimelineDialogService.getTimeLineList();
    adminTimeLineVm.isKeyPresent = isKeyPresent;
    adminTimeLineVm.saveSettings = saveSettings;
    adminTimeLineVm.removeTimeLine = removeTimeLine;
    adminTimeLineVm.openDialogue = openDialogue;



    function openDialogue (content) {
      var timeLineScope = $scope.$new();
      timeLineScope.layout = 'timeline';
      timeLineScope.content = content;

        ngDialog.open({
          template: 'app/components/templates/timelineDialog/admin.timelinedialog.tmpl.html',
          className: 'ngdialog-theme-default dialog-width',
          scope: timeLineScope,
          controller: 'AdminTimeLineDialogController',
          controllerAs: 'adminTimelineDialogVm',
          resolve: { columns: function() {
            return null
          } }
        }).closePromise.then(function(data){
          if((data.value) && (typeof data.value === "object")){
            console.log(data.value);
            adminTimeLineVm.timeLineData = data.value;
          }
        });
    }

    function isKeyPresent(key){
      for(var timeLineKey in adminTimeLineVm.timeLineData ) {
        if(adminTimeLineVm.timeLineData.hasOwnProperty(timeLineKey) ) {
          if(key === timeLineKey) {
            switch (timeLineKey) {
              case 'timeLine1':
                adminTimeLineVm.timeLine1 = adminTimeLineVm.timeLineData[timeLineKey];
                adminTimeLineVm.timeLine1 = (Object.keys(adminTimeLineVm.timeLine1))[0];
                break;
              case 'timeLine2':
                adminTimeLineVm.timeLine2 = adminTimeLineVm.timeLineData[timeLineKey];
                adminTimeLineVm.timeLine2 = (Object.keys(adminTimeLineVm.timeLine2))[0];
                break;
              default:
            }
            return true;
          }
        }
      }
    }

    function removeTimeLine(timeLineKey){
      adminTimelineDialogService.removeTimeLine(timeLineKey);
      adminTimeLineVm.timeLineData = adminTimelineDialogService.getTimeLineList();
    }

    function saveSettings(isTimeLineEnable){
      adminTimeLineVm.isTimeLineEnable = isTimeLineEnable;
      adminTimelineDialogService.showTimeLine(adminTimeLineVm.isTimeLineEnable);
    };
  }

})(angular);

