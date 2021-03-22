import React, { Component } from 'react';

import * as d3 from "d3";

// import './gaugechart-styles.css'

 

class GaugeChart extends Component {

    constructor(props) {

        super(props);

        this.createGaugeChart = this.createGaugeChart.bind(this);

        this.state = { title: this.props.data.title };

    }

    componentDidMount() {

        this.createGaugeChart();

    }

 

    createGaugeChart() {

        var node = this.node;

        var width = this.props.width || 690,

            height = this.props.height || 250;

        var defaultOptions = {

            title: "defaultTitle",

            gaugeColors: {

                percentCenterTextColor: "#0E2180",

                targetTriangleColor: "rgb(100,100,100)",

                targetValueColor: "rgb(25,184,97)",

                arcBackgroundColor: "rgb(146,208,80)",

                arcForegroundColors: ['rgb(255,0,0)', 'rgb(255,124,128)'],

                arcLineColor: "rgb(255,124,128)"

            },

            margin: {

                top: 20,

                right: 30,

                bottom: 20,

                left: 30

            },

            tooltip: true,

        };

 

        var data = this.props.data;

        var indicator = this.props.indicator;

        var currentPercentData = this.props.currentPercent;

 

        var options = this.props.options || defaultOptions;

        var tooltip = options.tooltip;

        var title = options.title;

        var currentPercent = currentPercentData / 100;

        var targetPercent;

        var loopCount;

        var colors = [ "#2D469B", "#1E348E", "#0E2180","#8A053C","#580326"];

 

        if (data === 1) { //For cards

            targetPercent = 20 / 100;

            loopCount = 5

        }

        else {

            targetPercent = data / 100;

            loopCount = 1;

        }

 

        var gaugeColors = options.gaugeColors || defaultOptions.gaugeColors;

        var percentCenterTextColor = gaugeColors.percentCenterTextColor;

        var targetTriangleColor = gaugeColors.targetTriangleColor;

        var targetValueColor = gaugeColors.targetValueColor;

        var arcBackgroundColor = gaugeColors.arcBackgroundColor;

        var arcForegroundColors = gaugeColors.arcForegroundColors;

        var arcLineColor = gaugeColors.arcLineColor;

        var margin = {

            top: options.margin !== undefined ? options.margin.top : defaultOptions.margin.top,

            right: options.margin !== undefined ? options.margin.right : defaultOptions.margin.right,

            bottom: options.margin !== undefined ? options.margin.bottom : defaultOptions.margin.bottom,

            left: options.margin !== undefined ? options.margin.left : defaultOptions.margin.left

        };

 

        var totalAngle = Math.PI;

        var startAngle = -(Math.PI / 2);

        var endAngle = startAngle + totalAngle;

        var outerRadius = width / 4;

        var innerRadius = outerRadius * 0.95;

        var foregroundInnerRadius = outerRadius * 0.85;

 

        var triangleTranslateMax = width * 0.172;

        var lineOffset = width * 0.5223;

        var lineHeight = width * 0.0111;

        var lineWidth = width * 0.1667;

 

        var tooltip = d3.select("body").append("div").attr("class", "toolTipGauge toolTipGauge" + title);

        var arc = d3.arc()

            .innerRadius(innerRadius)

            .outerRadius(outerRadius)

            .startAngle(startAngle);

 

        var forgroundArc = d3.arc()

            .innerRadius(foregroundInnerRadius)

            .outerRadius(outerRadius)

            .startAngle(startAngle);

 

        var svg = d3.select(node).append("svg")

            .attr("class", "GaugeChart" + title + " " + options.svgClass)

            .attr("id", options.svgId)

 

        if (this.props.type === "singleGaugeChart") {

            svg.attr("viewBox", "-380 -160 " + (width + margin.left + margin.right - 100) + " " + (height + margin.top + margin.bottom - 90) + "")

        }

        else {

            svg.attr("viewBox", "-380 -160 " + (width + margin.left + margin.right - 300) + " " + (height + margin.top + margin.bottom - 90) + "")

        }

 

        // big svg -280 -160 460 200

        // small svg -280 -160 260 290

        var g;

        if (this.props.type === "singleGaugeChart") {

            g = svg.append('g')

                .attr("transform", "translate(-50,10)");

        }

        else {

            g = svg.append('g')

                .attr("transform", "translate(-150,10)");

        }

        // big -50,10

        // small -150,10

 

        if (indicator === true) {

            var triangle = g.append('path').attr('class', 'pointer');

            triangle.attr("d", d3.symbol().type(d3.symbolTriangle).size(500))

                .attr("transform", function (d) {

                    return ("translate("

                        + (triangleTranslateMax * Math.sin(startAngle + (currentPercent * totalAngle)))

                        + ","

                        + -(triangleTranslateMax * Math.cos(startAngle + (currentPercent * totalAngle)))

                        + ") rotate(" + (-90 + (currentPercent * 180)) + ")");

                })

                .style("fill", targetTriangleColor)

                .on('mouseover', function (d, i) {

                    if (options.tooltip) {

                        tooltip

                            .style('top', (d3.event.pageY - 50) + 'px')

                            .style('left', (d3.event.pageX - 50) + 'px')

                            .style("display", "block")

                            .html("Current: " + (currentPercent * 100));

                    }

                })

                .on('mousemove', function (d, i) {

                    if (options.tooltip) {

                        tooltip

                            .style('top', (d3.event.pageY - 50) + 'px')

                            .style('left', (d3.event.pageX - 50) + 'px')

                            .style("display", "block")

                            .html("Current: " + (currentPercent * 100));

                    }

                })

                .on('mouseout', function (d, i) {

                    tooltip.style("display", "none")

                });

        }

 

        var background = g.append("path")

            .datum({ endAngle: endAngle })

            .style("fill", "#d9d9d9")

            .attr("d", arc)

            .on('mouseover', function (d, i) {

                if (options.tooltip) {

                    tooltip

                        .style('top', (d3.event.pageY - 50) + 'px')

                        .style('left', (d3.event.pageX - 50) + 'px')

                        .style("display", "block")

                        .html("Total: 100");

                }

            })

            .on('mousemove', function (d, i) {

                if (options.tooltip) {

                    tooltip

                        .style('top', (d3.event.pageY - 50) + 'px')

                        .style('left', (d3.event.pageX - 50) + 'px')

                        .style("display", "block")

                        .html("Total: 100");

                }

            })

            .on('mouseout', function (d, i) {

                tooltip.style("display", "none")

            });

 

        var foreground;

        for (var i = 0; i < loopCount; i++) {

            let fillColor = colors[i];

            foreground = g.append("path").attr("class", "arcForeground")

                .datum({ endAngle: startAngle + (targetPercent * totalAngle) })

                .attr("fill", fillColor)

                .attr("d", forgroundArc)

            startAngle = startAngle + (targetPercent * totalAngle);

            forgroundArc = d3.arc()

                .innerRadius(foregroundInnerRadius)

                .outerRadius(outerRadius)

                .startAngle(startAngle);

        }

        if (data !== 1) {

            foreground.attr("fill", "#92d050");

            currentPercentData = targetPercent * 100;

        }

        else {

            targetPercent = currentPercent;

        }

 

        var percentText = g.append('text').attr('class', 'percentText')

            .attr('fill', percentCenterTextColor)

            .style('font-weight', 'bold')

            .style('font-size', '3em')

            .style('font-family', 'sans-serif')

            .attr('text-anchor', 'middle')

            .text(currentPercentData + '%');

 

    }

 

    render() {

        return (<div ref={node => (this.node = node)} />);

    }

}

export default GaugeChart;