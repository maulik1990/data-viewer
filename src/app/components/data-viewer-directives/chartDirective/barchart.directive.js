/**
 * Created by aparikh on 10/7/15.
 */
(function(angular) {
    'use strict';

    angular
        .module('egen.app.dataViewerDirectives')
        .directive('barChart', barChart);

    function barChart($window) {
        return{
            restrict:'EA',
            scope: {
                data: '=',
                graph: '='
            },
            link: function(scope, elem, attrs){
                var data = scope.data;
                var graphParams = scope.graph;
                d3.select("#svg_3").remove();
                var margin = {top: 50, right: 20, bottom: 60, left: 40},
                    width = graphParams.width - margin.left - margin.right,
                    height = graphParams.height - margin.top - margin.bottom;

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1);

                var y = d3.scale.linear()
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

                var svg = d3.select("#barChart")
                    .append("svg")
                    .attr("id","svg_3")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                    x.domain(data.map(function(d) { return d[graphParams.xAxis]; }));
                    y.domain([0, d3.max(data, function(d) { return d[graphParams.yAxis]; })]);

                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .text("Frequency");

                    svg.selectAll(".bar")
                        .data(data)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d) { return x(d[graphParams.xAxis]); })
                        .attr("width", x.rangeBand())
                        .attr("y", function(d) { return y(d[graphParams.yAxis]); })
                        .attr("height", function(d) { return height - y(d[graphParams.yAxis]); });
            }
        };
    }
})(angular);
