(function (angular) {
  'use strict';

  angular
    .module('egen.app.header')
    .controller('HeaderController', HeaderController);

  function HeaderController(adminTimelineDialogService,adminTableDialogService,adminCardDialogService,adminMapDialogService,adminChartDialogService) {
    var headerVm = this;

    headerVm.isTableViewEnable = adminTableDialogService.isTableEnable;
    headerVm.isCardViewEnable = adminCardDialogService.isCardEnable;
    headerVm.isMapViewEnable = adminMapDialogService.isMapEnable;
    headerVm.isChartViewEnable = adminChartDialogService.isChartEnable;
    headerVm.isTimeLineEnable = adminTimelineDialogService.isTimeLineEnable;

  }

})(angular);
