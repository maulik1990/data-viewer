/**
 * Created by aparikh on 10/7/15.
 */
(function(angular) {
    'use strict';

    angular
        .module('egen.app.dataViewerDirectives')
        .directive('pieChart', pieChart);

    function pieChart($window) {
        return{
            restrict:'EA',
            scope: {
                data: '=',
                graph: '='
            },
            link: function(scope, elem, attrs){
                var graphParams = scope.graph;
                var data = scope.data;
                d3.select("#svg_4").remove();
                var width = graphParams.width,
                    height = graphParams.height,
                    radius = Math.min(width, height) / 2;

                var color = d3.scale.ordinal()
                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

                var arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                var labelArc = d3.svg.arc()
                    .outerRadius(radius - 40)
                    .innerRadius(radius - 40);

                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d) { return d[graphParams.yAxis]; });

                var svg = d3.select("#pieChart").append("svg")
                    .attr("id","svg_4")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                    var g = svg.selectAll(".arc")
                        .data(pie(data))
                        .enter().append("g")
                        .attr("class", "arc");

                    g.append("path")
                        .attr("d", arc)
                        .style("fill", function(d) { return color(d.data[graphParams.xAxis]); });

                    g.append("text")
                        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                        .attr("dy", ".35em")
                        .text(function(d) { return d.data[graphParams.yAxis]; });

            }
        };
    }
})(angular);
