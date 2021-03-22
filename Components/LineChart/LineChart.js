import React, { Component } from 'react';
import * as d3 from "d3";
import LineChartTestData from './LineChartTestData';
import './linechart-styles.css';

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.createLineChart = this.createLineChart.bind(this);
        this.state = { title: this.props.data.title };
    }
    componentDidMount() {
        var that = this;
        d3.selectAll(".toolTipLine" + that.state.title).remove();
        that.createLineChart();
    }
    componentDidUpdate() {
        var that = this;
        d3.selectAll(".toolTipLine" + that.state.title).remove();
        that.createLineChart();
    }
    createLineChart() {
        var node = this.node;
        var width = this.props.width || 700,
            height = this.props.height || 300;
        var defaultOptions = {
            title: "defaultTitle",
            colors: ["red", "blue", "green", "purple", "orange"],
            margin: {
                top: 20,
                right: 30,
                bottom: 20,
                left: 30
            },
            xAxis: {
                visibility: true,
                tick: true,
                domain: true,
                lines: false
            },
            yAxis: {
                visibility: false,
                tick: false,
                domain: false,
                lines: true
            },
            tooltip: true,
        };
        // var data = this.props.data || LineChartTestData;
        var options = this.props.options || defaultOptions;
        var title = options.title;
        var tooltip = options.tooltip;
        var colors = options.colors || defaultOptions.colors;
        var margin = {
            top: options.margin !== undefined ? options.margin.top : defaultOptions.margin.top,
            right: options.margin !== undefined ? options.margin.right : defaultOptions.margin.right,
            bottom: options.margin !== undefined ? options.margin.bottom : defaultOptions.margin.bottom,
            left: options.margin !== undefined ? options.margin.left : defaultOptions.margin.left
        };
        var xAxisOptions = {
            tick: options.xAxis !== undefined ? options.xAxis.tick : defaultOptions.xAxis.tick,
            domain: options.xAxis !== undefined ? options.xAxis.domain : defaultOptions.xAxis.domain,
            lines: options.xAxis !== undefined ? options.xAxis.lines : defaultOptions.xAxis.lines,
            visibility: options.xAxis !== undefined ? options.xAxis.visibility : defaultOptions.xAxis.visibility
        };
        var yAxisOptions = {
            tick: options.yAxis !== undefined ? options.yAxis.tick : defaultOptions.yAxis.tick,
            domain: options.yAxis !== undefined ? options.yAxis.domain : defaultOptions.yAxis.domain,
            lines: options.yAxis !== undefined ? options.yAxis.lines : defaultOptions.yAxis.lines,
            visibility: options.yAxis !== undefined ? options.yAxis.visibility : defaultOptions.yAxis.visibility
        };

        var keyValue = this.props.keyValue;
        var originalData = JSON.parse(JSON.stringify(this.props.data));
        const filteredData = originalData.filter(cityName => (cityName.city === keyValue)); 
        var data;
        if(filteredData.length !== 0){
            data = filteredData[0].cityData;
        }
        var parseTime = d3.timeParse("%d-%b-%y");
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
        data.forEach(function (d) {
            d.key = parseTime(d.key);
            d.value = +d.value;
        });
        x.domain(d3.extent(data, function (d) {
            return d.key;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);
        // var xAxis = d3.axisBottom()
        //     .scale(x)
        //     .ticks(5);
        // var yAxis = d3.axisLeft()
        //     .scale(y)
        //     .ticks(5);
        var valueline = d3.line()
            .x(function (d) {
                return x(d.key);
            })
            .y(function (d) {
                return y(d.value);
            });
        var svg = d3.select(node)
            .attr("class", "lineChartWrapper lineChart" + title + " " + options.svgClass)
            .attr("id", options.svgId);
        ////.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom) + "")
        svg.attr("viewBox", "-43 -45 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom + 100) + "")
        var parentGroup = svg.selectAll(".parentGroup").data([0]);
        parentGroup.enter()
            .append("g")
            .attr("class", "parentGroup")
            .attr("transform", "translate(10,0)");
        parentGroup = svg.selectAll(".parentGroup");
        var tooltipLineChart = d3.select('body').selectAll(".tooltipLineChart").data([0]);
        tooltipLineChart.exit().remove();
        tooltipLineChart.enter()
            .append('div')
            .attr('class', 'tooltipLineChart');
        tooltipLineChart = d3.select('body').selectAll(".tooltipLineChart");
        if (xAxisOptions.visibility === true) {
            // svg.append("g")
            //     .attr("class", "xAxis")
            //     .attr("transform", "translate(0," + height + ")")
            //     .call(xAxis);
            var xAxis = parentGroup.selectAll(".xAxis").data([0]);
            xAxis.exit().remove();
            xAxis.enter()
                .append("g")
                .attr("class", "xAxis")
                .attr("transform", "translate(0," + height + ")")
                // .attr("font-size", "15px")
                .merge(xAxis)
                .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");
            if (xAxisOptions.tick === false) {
                d3.selectAll(".lineChart" + title + " g .xAxis").style("display", "none");
            }
            if (xAxisOptions.domain === false) {
                d3.selectAll(".lineChart" + title + " g .xAxis .domain").style("display", "none");
            }
            if (xAxisOptions.lines === true) {
                d3.selectAll(".lineChart" + title + " g .xAxis .tick").style("display", "block");
                d3.selectAll(".lineChart" + title + " g .xAxis .tick line").attr("y2", -(height)).style("stroke", "black");
            }
        }
        if (yAxisOptions.visibility === true) {
            // svg.append("g")
            //     .attr("class", "yAxis")
            //     .call(yAxis);
            var yAxis = parentGroup.selectAll(".yAxis").data([0]);
            yAxis.exit().remove();
            yAxis.enter()
                .append("g")
                .attr("class", "yAxis")
                .merge(yAxis)
                .call(d3.axisLeft(y));
            if (yAxisOptions.tick === false) {
                d3.selectAll(".lineChart" + title + " g .yAxis ").style("display", "none");
            }
            if (yAxisOptions.domain === false) {
                d3.selectAll(".lineChart" + title + " g .yAxis .domain").style("display", "none");
            }
            if (yAxisOptions.lines === true) {
                d3.selectAll(".lineChart" + title + " g .yAxis .tick").style("display", "block");
                d3.selectAll(".lineChart" + title + " g .yAxis .tick line").attr("x2", (width));
            }
        }
        var linePath = parentGroup.selectAll(".linePath").data([0]);
        linePath.exit().remove();
        linePath.enter().append("path")
            .attr("class", "linePath")
            .merge(linePath)
            .call(transition)
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("id", function (d, i) { return "path" + i; })
            .attr("d", valueline(data));
        function transition(path) {
            path
                .transition()
                .duration(1700)
                .attrTween("stroke-dasharray", tweenDash);
        }
        function tweenDash() {
            var l = this.getTotalLength(),
                i = d3.interpolateString("0," + l, l + "," + l);
            return function (t) { return i(t); };
        }
        var dot = parentGroup.selectAll(".dot")
            .data(data)
        dot.exit().remove();
        dot.enter().append("circle")
            .attr("class", "dot")
            .merge(dot)
            .attr("cx", function (d, i) { return x(d.key) })
            .attr("cy", function (d, i) { return y(d.value) })
            .attr("fill", colors[0])
            .attr("r", 5)
            .on('mousemove', function (d) {
                if (tooltip === true) {
                    tooltipLineChart.style('top', (d3.event.pageY - 70) + 'px')
                        .style('left', (d3.event.pageX - 150) + 'px')
                        .style("display", "block")
                        // .style("position", "absolute")
                        .html("Key: " + (d.key) + "<br>Value: " + (d.value));
                }
            })
            .on('mouseout', function (d) { tooltipLineChart.style("display", "none") });
    }
    render() {
        return (<svg ref={node => (this.node = node)} />);
    }
}

export default LineChart;
