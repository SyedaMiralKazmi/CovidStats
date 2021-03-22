import React, { Component } from 'react';
import * as d3 from "d3";
import ZoomableBubbleChartTestData from './ZoomableBubbleChartTestData';
import './zoomablebubblechart-styles.css';
// import get_browser_info from './../Utils/GetBrowserName';

class ZoomableBubbleChart extends Component {
    constructor(props) {
        super(props);
        this.createZoomableBubbleChart = this.createZoomableBubbleChart.bind(this);
        this.state = { title: this.props.data.title };
    }
    componentDidMount() {
        var that = this;
        d3.selectAll(".toolTipPie" + that.state.title).remove();
        that.createZoomableBubbleChart();
    }
    componentDidUpdate(props) {
        var that = this;
        d3.selectAll(".toolTipPie" + that.state.title).remove();
        //d3.selectAll(".zoomBubble").remove();
        that.createZoomableBubbleChart();
    }
    createZoomableBubbleChart() {
        var node = this.node;
        // var browser = get_browser_info();
        var width = this.props.width || 600,
            height = this.props.height || 500;

        var defaultOptions = {
            title: "defaultTitle",
            colors: ["red", "blue", "green", "purple", "orange"],
            margin: {
                top: 20,
                right: 30,
                bottom: 20,
                left: 30

            },
            legends: {
                visibility: false,
            },
            tooltip: true,
        };

        // var root = this.props.data || ZoomableBubbleChartTestData;
        var keyValue = this.props.keyValue;
        var originalData = JSON.parse(JSON.stringify(this.props.data));
        const filteredData = originalData.filter(cityName => (cityName.name === keyValue)); 
        var root;
        if(filteredData.length !== 0){
            root = filteredData[0];
        }
        console.log(root);
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
        var legends = {
            visibility: options.legends !== undefined ? options.legends.visibility : defaultOptions.legends.visibility

        };
        var margin = 20;

        var svg = d3.select(node)
            .attr("class", "zoomBubble " + options.svgClass)
            .attr("id", options.svgId)
            .attr("viewBox", "-70 -75 750 800");
        svg.select(".zoomParentGroup").remove();

        var diameter = width,
            g = svg.append("g")
                .attr("Class","zoomParentGroup")
                .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        var color = d3.scaleLinear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);

        var pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        console.log(root);

        root = d3.hierarchy(root)
            .sum(function (d) { return d.membership; })
            .sort(function (a, b) { return b.value - a.value; });

        var focus = root,
            nodes = pack(root).descendants(),
            view;
        var tooltip = d3.select("body").append("div").attr("class", "toolTipBubble");
        var circle = g.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("class", function (d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
            .style("fill", function (d) { return d.children ? color(d.depth) : null; })
            .on("click", function (d) {
                if (focus !== d) { zoom(d); d3.event.stopPropagation() };
            })
            .on('mouseover', function (d, i) {
                if (options.tooltip) {
                    tooltip
                        .style('top', (d3.event.pageY - 50) + 'px')
                        .style('left', (d3.event.pageX - 50) + 'px')
                        .style("display", "block")
                        .html("Current: " + d.data.name);
                }
            })
            .on('mousemove', function (d, i) {
                if (options.tooltip) {
                    tooltip
                        .style('top', (d3.event.pageY - 50) + 'px')
                        .style('left', (d3.event.pageX - 50) + 'px')
                        .style("display", "block")
                        .html("Current: " + d.data.name);
                }
            })
            .on('mouseout', function (d, i) {
                tooltip.style("display", "none")
            });

        var text = g.selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
            .style("display", function (d) { return d.parent === root ? "inline" : "none"; })
            .text(function (d) { return d.data.name; });

        var nod = svg.selectAll("circle,text");

        svg

            .style("background", color(-1))
            .on("click", function () { zoom(root); });

        zoomTo([root.x, root.y, root.r * 2 + margin]);

        function zoom(d) {
            console.log(d);
            var focus0 = focus; focus = d;

            var transition = d3.transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .tween("zoom", function (d) {
                    var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                    return function (t) { zoomTo(i(t)); };
                });

            transition.selectAll("text")
                .filter(function (d) { 
                    console.log(d)
                    return d && d.parent === focus || this.style.display === "inline"; 
                })
                .style("fill-opacity", function (d) { return d.parent === focus ? 1 : 0; })
                .on("start", function (d) { if (d && d.parent === focus) this.style.display = "inline"; })
                .on("end", function (d) { if (d && d.parent !== focus) this.style.display = "none"; });
        }

        function zoomTo(v) {
            var k = diameter / v[2]; view = v;
            nod.attr("transform", function (d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
            circle.attr("r", function (d) { return d.r * k; });
        }
    }
    render() {
        return (
        <div className="zoomablebubblechartwrapper">
        <svg ref={node => (this.node = node)} />
        </div>
        );
    }
}

export default ZoomableBubbleChart;