import React, { Component } from 'react';

import * as d3 from 'd3';

// import { select, selectAll } from "d3-selection";

import data from './BubbleChart-data';

import './BubbleChart-styles.css';






class BubbleChart extends Component {

    constructor(props) {

        super(props);

        this.createBubbleChart = this.createBubbleChart.bind(this);

    }

    componentDidMount() {

        this.createBubbleChart();

    }

    componentDidUpdate() {

        this.createBubbleChart();

    }

 

    createBubbleChart() {




        var diameter = 960,

            format = d3.format(",d"),

            color = d3.scaleOrdinal(d3.schemeCategory10);

 

        var bubble = d3.pack()

            .size([diameter, diameter])

            .padding(1.5);

 

        var svg = d3.select("#BubbleChart")

            .attr("class", "BubbleChart")

            .attr("width", "100%").attr("height", "98%")

            .attr("viewBox","0 0 1000 1000");

 

        var root = d3.hierarchy(classes(data))

            .sum(function (d) { return d.value; })

            .sort(function (a, b) { return b.value - a.value; });

 

        bubble(root);

        var node = svg.selectAll(".node")

            .data(root.children)

            .enter().append("g")

            .attr("class", "node")

            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

 

        node.append("title")

            .text(function (d) { return d.data.className + ": " + format(d.value); });

 

        node.append("circle")

            .attr("r", function (d) { return d.r; })

            .style("fill", function (d) {

                return color(d.data.packageName);

            });

 

        node.append("text")

            .attr("dy", ".3em")

            .style("text-anchor", "middle")

            .text(function (d) { return d.data.className.substring(0, d.r / 3); });

 

        function classes(root) {

            var classes = [];

 

            function recurse(name, node) {

                if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });

                else classes.push({ packageName: name, className: node.name, value: node.size });

            }

 

            recurse(null, root);

            return { children: classes };

        }

 

    }

 

    render() {

        return (

            <div className="BubbleChart-container">

                <svg className="BubbleChart" id="BubbleChart" ref={node => (this.node = node)} />

            </div>

        );

 

    } F

}

 

export default BubbleChart;