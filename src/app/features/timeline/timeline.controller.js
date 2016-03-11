(function (angular) {
    'use strict';

    angular
        .module('egen.app.timeline')
        .controller('TimeLineController', TimeLineController);


    function TimeLineController(dataService,adminTimelineDialogService) {
        var timelineVm = this;
        timelineVm.timeLineData = dataService;
        timelineVm.checkTimeLineDetail = checkTimeLineDetail;
        timelineVm.timeLineAdminInfo =  adminTimelineDialogService.getTimeLineList();
        timelineVm.parseDate = d3.time.format("%Y-%b-%d %H:%M:%S").parse;

        timelineVm.noOfTimeLinepresent = Object.keys(timelineVm.timeLineAdminInfo);
        console.log(timelineVm.noOfTimeLinepresent);



        function checkTimeLineDetail(timeLineSeq){
            timelineVm.istimeLinePresent = false;
            if(timelineVm.noOfTimeLinepresent.indexOf(timeLineSeq) !== -1) {
                timelineVm.timeLineSeqDetail = timelineVm.timeLineAdminInfo[timeLineSeq];
                timelineVm.timeLineType = (Object.keys(timelineVm.timeLineSeqDetail))[0];

                timelineVm.istimeLinePresent = true;
                if(timelineVm.istimeLinePresent) {
                    timelineVm.adminTimelineParams = timelineVm.timeLineSeqDetail[timelineVm.timeLineType]
                }
            }
            return timelineVm.istimeLinePresent
        }


    }

})(angular);