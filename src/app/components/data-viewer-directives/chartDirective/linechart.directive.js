/**
 * Created by aparikh on 10/7/15.
 */
(function(angular) {
    'use strict';

    angular
        .module('egen.app.dataViewerDirectives')
        .directive('linearChart', linearChart);

    function linearChart($window) {
        return{
            restrict:'EA',
            scope: {
                data: '=',
                graph: '='
            },
            link: function(scope, elem, attrs){
                var graphParams = scope.graph;
                var data = scope.data;
                d3.select("#svg_2").remove();
                var contaonerSize = scope.graph;
                var margin = {top: 50, right: 20, bottom: 60, left: 50},
                    width = graphParams.width - margin.left - margin.right,
                    height = graphParams.height - margin.top - margin.bottom;

                  // Parse the date / time
//                var parseDate = d3.time.format("%d-%b-%y").parse;

                var x = d3.scale.linear().range([0, width]);
                var y = d3.scale.linear().range([height, 0]);

                var xAxis = d3.svg.axis().scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis().scale(y)
                    .orient("left");

                var valueline = d3.svg.line()
                    .x(function(d) { return x(d[graphParams.xAxis]); })
                    .y(function(d) { return y(d[graphParams.yAxis]); });

                var svg = d3.select("#lineChart")
                    .append("svg")
                    .attr("id","svg_2")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");


                    // Scale the range of the data
                    x.domain(d3.extent(data, function(d) { return d[graphParams.xAxis]; }));
                    y.domain([0, d3.max(data, function(d) { return d[graphParams.yAxis]; })]);

                    // Add the valueline path.
                    svg.append("path")
                        .attr("class", "line")
                        .attr("d", valueline(data));

                    // Add the X Axis
                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    // Add the Y Axis
                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text(graphParams.yAxis);
            }

        };
    }
})(angular);
