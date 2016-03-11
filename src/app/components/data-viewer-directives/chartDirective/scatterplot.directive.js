/**
 * Created by aparikh on 10/7/15.
 */
(function(angular) {
    'use strict';

    angular
        .module('egen.app.dataViewerDirectives')
        .directive('scatterPlot', scatterPlot);

    function scatterPlot($window) {
        return{
            restrict:'EA',
            scope: {
                data: '=',
                graph: '='
            },
            link: function(scope, elem, attrs){
                var data = scope.data;
                var graphParams = scope.graph;
                d3.select("#svg_1").remove();
                    var margin = {top: 50, right: 15, bottom: 60, left: 60}
                        , width = graphParams.width - margin.left - margin.right
                        , height = graphParams.height - margin.top - margin.bottom;

                    var x = d3.scale.linear()
                        .domain([0, d3.max(data, function(d) { return d[graphParams.xAxis]; })])
                        .range([ 0, width ]);

                    var y = d3.scale.linear()
                        .domain([0, d3.max(data, function(d) { return d[graphParams.yAxis]; })])
                        .range([ height, 0 ]);

                    var chart = d3.select('#scatterPlot')
                        .append('svg:svg')
                        .attr("id","svg_1")
                        .attr('width', width + margin.right + margin.left)
                        .attr('height', height + margin.top + margin.bottom)
                        .attr('class', 'chart')

                    var main = chart.append('g')
                        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                        .attr('width', width)
                        .attr('height', height)
                        .attr('class', 'main')

                    // draw the x axis
                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient('bottom');

                    main.append('g')
                        .attr('transform', 'translate(0,' + height + ')')
                        .attr('class', 'main axis date')
                        .call(xAxis);

                    // draw the y axis
                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient('left');

                    main.append('g')
                        .attr('transform', 'translate(0,0)')
                        .attr('class', 'main axis date')
                        .call(yAxis);

                    var g = main.append("svg:g");

                    g.selectAll("scatter-dots")
                        .data(data)
                        .enter().append("svg:circle")
                        .attr("cx", function (d,i) { return x(d[graphParams.xAxis]); } )
                        .attr("cy", function (d) { return y(d[graphParams.yAxis]); } )
                        .attr("r", 8);
            }
        };
    }
})(angular);
