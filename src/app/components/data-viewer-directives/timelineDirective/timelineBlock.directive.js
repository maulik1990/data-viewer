/**
 * Created by aparikh on 10/7/15.
 */
(function(angular) {
    'use strict';

    angular
        .module('egen.app.dataViewerDirectives')
        .directive('dvTimeLineBlock', dvTimeLineBlock);

    function dvTimeLineBlock($window) {
        return{
            restrict:'EA',
            scope: {
                data: '=',
                params: '='
            },
            link: function(scope, elem, attrs){
                var timeLineData = scope.data;
                var params = scope.params;
                console.log(params);

                var parseDate = d3.time.format("%Y-%b-%d %H:%M:%S").parse;
                var db  = d3.nest()
                    .key(function(d) {
                        return d[params.label];
                    }).entries(timeLineData);
                var b = [];

                db.forEach(function(d) {
                    var ob = {};
                    ob.label = d.key;
                    ob.times = [];
                    b.push(ob);
                    d.values.forEach(function(v) {
                        var times = [];
                        var timings = {};
                        timings.starting_time = parseDate(v[params.startTime]).getTime();
                        timings.ending_time = parseDate(v[params.endTime]).getTime();
                        times.push(timings);
                        ob.times.push(times)
                    });
                    ob.times = [].concat.apply([], ob.times);
                });

                var chart = d3.timeline()
                    .showTimeAxisTick()
                    .width(1000)
                    .rotateTicks(45)
                    .tickFormat({
                        format: d3.time.format("%d-%m"),
                        tickInterval: 20,
                        tickSize: 10
                    })
                    .labelFormat(function(label){ return label;})
                    .stack();

                var svg = d3.select("#timeline1").append("svg").attr("width", 1000)
                    .datum(b).call(chart);
                d3.select("#timeline1").select("svg").select("g").attr("transform", "translate(70,0)")
            }
        };
    }
})(angular);
