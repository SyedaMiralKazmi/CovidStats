import React, { Component } from 'react';
import * as d3 from "d3";
import { event } from 'd3';
import './horizontalBarChart-styles.css';


class HorizontalBarChart extends Component {
    constructor(props) {
        super(props);
        this.createHorizontalBarChart = this.createHorizontalBarChart.bind(this);
    }
    componentDidMount() {
        this.createHorizontalBarChart();
    }

    componentDidUpdate() {
        this.createHorizontalBarChart();
    }
    createHorizontalBarChart() {
        var node = this.node;
        var width = (this.props.options && this.props.options.width) ? this.props.options.width : 790,
            height = (this.props.options && this.props.options.height) ? this.props.options.height : 300;

        var defaultOptions = {
            title: "defaultTitle",
            margin: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10

            },
            xAxis: {
                visibility: false,
                tick: true,
                domain: true,
                lines: false

            },
            yAxis: {
                visibility: true,
                tick: true,
                domain: true,
                lines: false,
                images: false

            },
            tooltip: true,
            colors: ["green"],
            keyMapping: {
                xAxisKey: "value",
                yAxisKey: "key",
                xAxisDisplayKey: "displayValue",
                yAxisDisplayKey: "key",
                fillColorKey: "fill",
            }
        };

        var data = JSON.parse(JSON.stringify(this.props.data.values));
        if (this.props.sort) {
            data.reverse();
        }
        var options = this.props.options;
        var keyMapping = {
            xAxisKey: (options && options.keyMapping && options.keyMapping.xAxisKey) ? options.keyMapping.xAxisKey : defaultOptions.keyMapping.xAxisKey,
            yAxisKey: (options && options.keyMapping && options.keyMapping.yAxisKey) ? options.keyMapping.yAxisKey : defaultOptions.keyMapping.yAxisKey,
            xAxisDisplayKey: (options && options.keyMapping && options.keyMapping.xAxisDisplayKey) ? options.keyMapping.xAxisDisplayKey : defaultOptions.keyMapping.xAxisDisplayKey,
            yAxisDisplayKey: (options && options.keyMapping && options.keyMapping.yAxisDisplayKey) ? options.keyMapping.yAxisDisplayKey : defaultOptions.keyMapping.yAxisDisplayKey,
            fillColorKey: (options && options.keyMapping && options.keyMapping.fillColorKey) ? options.keyMapping.fillColorKey : defaultOptions.keyMapping.fillColorKey

        };

        var title = (options && options.title) || defaultOptions.title;
        var margin = {
            top: (options && options.margin !== undefined && options.margin.top !== undefined) ? options.margin.top : defaultOptions.margin.top,
            right: (options && options.margin !== undefined && options.margin.right !== undefined) ? options.margin.right : defaultOptions.margin.right,
            bottom: (options && options.margin !== undefined && options.margin.bottom !== undefined) ? options.margin.bottom : defaultOptions.margin.bottom,
            left: (options && options.margin !== undefined && options.margin.left !== undefined) ? options.margin.left : defaultOptions.margin.left

        };
        var xAxisOptions = {
            tick: (options && options.xAxis !== undefined && options.xAxis.tick !== undefined) ? options.xAxis.tick : defaultOptions.xAxis.tick,
            domain: (options && options.xAxis !== undefined && options.xAxis.domain !== undefined) ? options.xAxis.domain : defaultOptions.xAxis.domain,
            lines: (options && options.xAxis !== undefined && options.xAxis.lines !== undefined) ? options.xAxis.lines : defaultOptions.xAxis.lines,
            visibility: (options && options.xAxis !== undefined && options.xAxis.visibility !== undefined) ? options.xAxis.visibility : defaultOptions.xAxis.visibility

        };
        var yAxisOptions = {
            tick: (options && options.yAxis !== undefined && options.yAxis.tick !== undefined) ? options.yAxis.tick : defaultOptions.yAxis.tick,
            domain: (options && options.yAxis !== undefined && options.yAxis.domain !== undefined) ? options.yAxis.domain : defaultOptions.yAxis.domain,
            lines: (options && options.yAxis !== undefined && options.yAxis.lines !== undefined) ? options.yAxis.lines : defaultOptions.yAxis.lines,
            visibility: (options && options.yAxis !== undefined && options.yAxis.visibility !== undefined) ? options.yAxis.visibility : defaultOptions.yAxis.visibility,
            images: (options && options.yAxis !== undefined && options.yAxis.images !== undefined) ? options.yAxis.images : defaultOptions.yAxis.images

        };

        var tickTextLength = (options && options.tickTextLength !== undefined) ? options.tickTextLength : 150,
            valueTextLength = (options && options.valueTextLength !== undefined) ? options.valueTextLength : 10,
            minDataLength = (options && options.minDataLength !== undefined) ? options.minDataLength : 10;

        var barHeight = (options && options.barHeight !== undefined) ? options.barHeight : 30,
            barGap = (options && options.barGap !== undefined) ? options.barGap : 5,
            minTextLengthBeforeEllipsis = (options && options.minTextLengthBeforeEllipsis !== undefined) ? options.minTextLengthBeforeEllipsis : 25;

        height = (d3.max([barGap * minDataLength, barGap * data.length, height]));

        var x = d3.scaleLinear()
            .range([0, width - tickTextLength - valueTextLength]);

        var y = d3.scaleBand()
            .range([(data && data.length > 0) ? height : 0, 0])
            .padding(0.1);

        x.domain([0, d3.max(data, function (d) {
            return (+d[keyMapping.xAxisKey] > 0) ? +d[keyMapping.xAxisKey] : 1;
        })]);

        y.domain(data.map(function (d) {
            return d[keyMapping.yAxisKey];
        }));

        var chartImage = this.props.data.imagesReferenceName;

        var svg = d3.select(node)
            .attr("class", "horizontalBarChart horizontalBarChart" + title)
            .attr("viewBox", "-95 -5 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom) + "");
        var parentGroup = svg.selectAll(".parentGroup").data([data]);
        parentGroup
            .enter()
            .append("g")
            .merge(parentGroup)
            .attr("class", "parentGroup")
            // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            .attr("transform", "translate(10," + margin.top + ")");

        parentGroup = svg.selectAll(".parentGroup");

        var noDataText = parentGroup.selectAll(".noDataText").data([0]);
        noDataText.exit()
            .transition()
            .duration(1000)
            .remove();

        noDataText.enter().append("text")
            .attr("class", "noDataText")
            .merge(noDataText)
            .attr("x", width / 2 - 34)
            .attr("y", height / 2)
            .transition()
            .duration(1000)
            .attr("fill", (data.length === 0) ? "#333" : "transparent")
            .attr("opacity", (data.length === 0) ? 1 : 0)
            .text("No Data");

        var body = d3.select("body");
        var tooltipOrdinalBarChart = body.selectAll(".custom-tooltip").data([0]);
        tooltipOrdinalBarChart.exit().remove();
        tooltipOrdinalBarChart.enter().append("div").attr("class", "custom-tooltip");

        tooltipOrdinalBarChart = body.selectAll(".custom-tooltip");

        if (xAxisOptions.visibility === true) {
            var xAxisGroup = parentGroup.selectAll(".xAxis").data([data]);
            xAxisGroup.exit().remove();
            var xAxis = xAxisGroup.enter().append("g");
            xAxisGroup.merge(xAxis)
                .style('font-size', '20px')
                .attr('transform', 'translate(' + (tickTextLength - 1) + ',' + height + ')')
                .attr('class', 'xAxis')
                .transition().duration(1000)
                .call(d3.axisBottom(x).tickSizeOuter(0));

            if (xAxisOptions.tick === false) {
                parentGroup.selectAll("g .xAxis").style("display", "none");
            }
            if (xAxisOptions.domain === false) {
                parentGroup.selectAll("g .xAxis .domain").style("display", "none");
            }
            if (xAxisOptions.lines === true) {
                parentGroup.selectAll("g .xAxis .tick").style("display", "block");
                parentGroup.selectAll("g .xAxis .tick line").attr("y2", -(height));
            }
        }

        if (yAxisOptions.visibility === true) {
            var yAxisGroup = parentGroup.selectAll(".yAxis").data([data]);
            yAxisGroup.exit().remove();
            var yAxis = yAxisGroup.enter().append("g");

            yAxisGroup.merge(yAxis)
                .attr('transform', 'translate(' + (tickTextLength - 1) + ',0)')
                .attr('class', 'yAxis')
                .transition().duration(1000)
                .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(function (d) { return (d.length > minTextLengthBeforeEllipsis) ? d.substring(0, minTextLengthBeforeEllipsis) + "..." : d; }));

            if (yAxisOptions.images === true) {
                yAxis.selectAll(".tick")
                    .append("barGroup:foreignObject")
                    .attr('class', 'yAxisImage')
                    .attr("x", -10 - ((barHeight) ? barHeight : 0))
                    .attr("y", -10)
                    .attr("width", (barHeight && barHeight <= 20) ? barHeight : 20)
                    .attr("height", (barHeight && barHeight <= 20) ? barHeight : 20)
                    .attr("class", function (d, i) {
                        return ("icon-wrapper " + chartImage[i])
                    })
                    .append("xhtml:body")
                    .html("<p></p>");

                d3.selectAll(".horizontalBarChart" + title + " g .yAxis .tick text").style("display", "none");
            }

            if (yAxisOptions.tick === false) {
                parentGroup.selectAll("g.yAxis").style("display", "none");
            }
            if (yAxisOptions.domain === false) {
                parentGroup.selectAll("g.yAxis .domain").style("display", "none");
            }
            if (yAxisOptions.lines === false) {
                parentGroup.selectAll("g.yAxis .tick line").style("display", "none");
            }

            parentGroup.selectAll(".yAxis text")
                .attr("class", function (d) {
                    return (d === options.selectedKey) ? "ticks selectedText" : "ticks"
                })
                .style('font-size', '20px')
                .style("cursor", "default")
                .on('mouseover', function (key) {
                    let filteredData = data.filter(d => (d[keyMapping.yAxisKey] && d[keyMapping.yAxisKey] === key))[0];
                    if (filteredData) {
                        onMouseOverAndMove(filteredData);
                    }
                })
                .on('mousemove', function (key) {
                    let filteredData = data.filter(d => (d[keyMapping.yAxisKey] && d[keyMapping.yAxisKey] === key))[0];
                    if (filteredData) {
                        onMouseOverAndMove(filteredData);
                    }
                })
                .on('mouseout', function (d) {
                    tooltipOrdinalBarChart.style("display", "none");
                });
        }

        let bar = parentGroup.selectAll(".horizontalBar").data(data);
        bar.exit()
            .transition().duration(1000)
            .attr("width", 0)
            .style("opacity", 0)
            .remove();

        bar.enter().append("rect")
            .attr("width", 0)
            .attr("x", tickTextLength)
            .attr("y", function (d) {
                return y(d[keyMapping.yAxisKey]) - ((barHeight && barHeight > 0) ? ((barHeight - y.bandwidth()) / 2) : 0);
            })
            .attr("height", function (d) { return (barHeight && barHeight > 0) ? barHeight : (y.bandwidth()) })
            .style("opacity", 0)
            .merge(bar)
            .attr("class", function (d) {
                return (options.selectedKey && d[keyMapping.yAxisKey] === options.selectedKey) ? "horizontalBar selected" : "horizontalBar"
            })
            .on('mouseover', function (d) {
                onMouseOverAndMove(d);
            })
            .on('mousemove', function (d) {
                onMouseOverAndMove(d);
            })
            .on('mouseout', onMouseOut)
            .on('click', function (d) {
                return (options && options.callbackFunction) ? (options.extraParameters) ? options.callbackFunction(d, ...options.extraParameters) : options.callbackFunction(d) : false;
            })
            .style("cursor", (options && options.callbackFunction) ? "pointer" : "default")
            .transition().duration(1000)
            .style("opacity", 1)
            .attr("fill", function (d) { return (d[keyMapping.fillColorKey]) ? d[keyMapping.fillColorKey] : "#d9d9d9"; })
            .attr("x", tickTextLength)
            .attr("y", function (d) {
                return y(d[keyMapping.yAxisKey]) - ((barHeight && barHeight > 0) ? ((barHeight - y.bandwidth()) / 2) : 0);
            })
            .attr("height", function (d) { return (barHeight && barHeight > 0) ? barHeight : (y.bandwidth()) })
            .attr("width", function (d) {
                return x(d[keyMapping.xAxisKey]);
            });

        let text = parentGroup.selectAll(".horizontalBarText").data(data);
        text.exit()
            .transition()
            .duration(1000)
            .style("opacity", 0)
            .attr("x", tickTextLength)
            .remove();
        text.enter().append("text")
            .style("opacity", 0)
            .attr("x", tickTextLength)
            .attr("y", function (d) {
                return y(d[keyMapping.yAxisKey]) - ((barHeight && barHeight > 0) ? (((barHeight / 2) - y.bandwidth()) / 2) - (barHeight / 2) + (barHeight / 6) : -y.bandwidth() / 2 - 1.5);
            })
            .style("cursor", "default")
            .merge(text)
            .attr("class", function (d) {
                return (d[keyMapping.yAxisKey] === options.selectedKey) ? "horizontalBarText selectedText" : "horizontalBarText"
            })
            .on('mouseover', function (d) {
                onMouseOverAndMove(d);
            })
            .on('mousemove', function (d) {
                onMouseOverAndMove(d);
            })
            .on('mouseout', onMouseOut)
            .transition().duration(1000)
            .style("opacity", 1)
            .attr("font-size", "22px")
            .attr("x", function (d) { return (tickTextLength + x(d[keyMapping.xAxisKey]) + 5); })
            .attr("y", function (d) {
                return y(d[keyMapping.yAxisKey]) - ((barHeight && barHeight > 0) ? (((barHeight / 2) - y.bandwidth()) / 2) - (barHeight / 2) + (barHeight / 6) : -y.bandwidth() / 2 - 1.5);
            })
            .text(function (d) { return d[keyMapping.xAxisDisplayKey] });

        function onMouseOverAndMove(d) {
            tooltipOrdinalBarChart

                .style('top', (event.pageY + 90) + 'px')
                .style('left', (event.pageX - 100) + 'px')
                .style("display", "block")
                .attr("class", "custom-tooltip horizontalTooltip")
                .html(
                    `<div class='row'>
                                        <div class='col col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                            <p class='tooltipHeader mB0'>
                                            ${d[keyMapping.yAxisDisplayKey]}
                                            </p>
                                                <p class='tooltipValue mB0'>
                                            ${d[keyMapping.xAxisDisplayKey]}
                                            </p>
                                        </div>
                                    </div>`
                );

            let screenWidth = window.innerWidth,
                pointerXPosition = event.pageX,
                tooltipWidth = document.querySelector(".horizontalTooltip").clientWidth,
                tooltipHeight = document.querySelector(".horizontalTooltip").clientHeight;
            if ((pointerXPosition + tooltipWidth + 45) >= screenWidth) {
                tooltipOrdinalBarChart.style('left', (event.pageX - tooltipWidth - 20) + 'px');
            }
            tooltipOrdinalBarChart.style('top', (event.pageY - (tooltipHeight / 2)) + 'px');
        }
        function onMouseOut(d) {
            tooltipOrdinalBarChart.style("display", "none");
        }
    }

    render() {
        return (
            <div className="horizontalBarChartWrapper scrollbar">
                <svg ref={node => (this.node = node)} />
            </div>
        );
    }
}

export default HorizontalBarChart;
