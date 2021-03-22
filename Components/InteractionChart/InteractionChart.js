import React, { Component } from 'react';
import * as d3 from 'd3';
// import { select, selectAll } from "d3-selection";
import DATA from './InteractionChartData.js';
import { Row, Col } from 'react-bootstrap';
import './interactionChart-styles.css';

// var data = DATA.data;
// var colors = DATA.colors;
// var barColor = DATA.barColor; 
// console.log(data);


class BarChart extends Component {
    constructor(props) {
        super(props);
        var state = this.props.currentState;
        this.createBarCHart = this.createBarCHart.bind(this);
    }

    componentDidMount() {
        this.createBarCHart();
    }
    componentDidUpdate() {
        this.createBarCHart();
    }

    createBarCHart() {
        var self = this;
        var node = this.node;
        var hG = {}, hGDim = { t: 60, r: 0, b: 30, l: 0 };
        hGDim.w = 700 - hGDim.l - hGDim.r;
        hGDim.h = 300 - hGDim.t - hGDim.b;
        
        var keyValue = this.props.keyValue;
        var originalData = JSON.parse(JSON.stringify(DATA.data));
        const filteredData = originalData.filter(cityName => (cityName.city === keyValue));
        var data;
        if (filteredData.length !== 0) {
            data = filteredData[0].cityData;
        }
        data.forEach(function (d) { d.total = d.freq.low + d.freq.mid + d.freq.high; });

        function segColor(c) { return { low: "#807dba", mid: "#41ab5d", high: "#" }[c]; }

        if (this.props.currentState.currentBar === 'start') {
            var fD = data.map(function (d) { return [d.State, d.total]; });
            var color = "#0E2180";

        }
        else if (this.props.currentState.currentBar === 'low') {
            var fD = data.map(function (d) { return [d.State, d.freq.low]; });
            var color = "#807dba";
        }
        else if (this.props.currentState.currentBar === 'mid') {
            var fD = data.map(function (d) { return [d.State, d.freq.mid]; });
            var color = "#41ab5d";

        }
        else if (this.props.currentState.currentBar === 'high') {
            var fD = data.map(function (d) { return [d.State, d.freq.high]; });
            var color = "#e08214";

        }

        var svg = d3.select(node)
            .attr("class", "bargraph")
            .attr("viewBox", "-110 0 " + (hGDim.w + hGDim.l + hGDim.r) + " " + (hGDim.h + hGDim.t + hGDim.b + 100));

        var parentGroup = svg.selectAll(".parentGroup").data([0]);
        parentGroup.enter()
            .append("g")
            .attr("class", "parentGroup")
        parentGroup = svg.selectAll(".parentGroup");
        
        var x = d3.scaleBand()
            .domain(fD.map(function (d) { return d[0]; })).rangeRound([0, hGDim.w]);

        var xAxis = parentGroup.selectAll(".x-axis").data([fD]);
        xAxis.exit().remove();
        xAxis.enter().append("g").attr("class", "x-axis").merge(xAxis)
            .attr("transform", "translate(0," + (hGDim.h + 50) + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        var y = d3.scaleLinear().range([hGDim.h, 0])
            .domain([0, d3.max(fD, function (d) { return d[1]; })]);

        var bars = parentGroup.selectAll(".bar").data(fD);

        bars.exit().transition()
            .duration(0)
            .attr("height", 0).remove();

        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .merge(bars)
            .on("mouseover", function (d) {
                self.props.changeDonutState(d[0]);
            })
            .on("mouseout", function () {
                self.props.changeDonutState("start");
                self.props.changeBarState("start");
            })
            .attr("x", function (d) { return x(d[0]); })
            .attr("y", function (d) { return y(d[1]); })
            .attr("width", x.bandwidth() - 10)
            .attr("height", function (d) { return hGDim.h - y(d[1]); })
            .attr('fill', color)
            .attr("transform", "translate(5,50)");

        var text = parentGroup.selectAll(".text").data(fD);

        text.exit().remove();
        text.enter()
            .append("text")
            .attr("class", "text")
            .merge(text)
            .text(function (d) { return d3.format(",")(d[1]) })
            .attr("x", function (d) { return x(d[0]) + 20; })
            .attr("y", function (d) { return y(d[1]) - 5; })
            .attr("transform", "translate(0,50)")
            .attr("text-anchor", "middle");

    }

    render() {
        return (
            <div>
                <svg ref={node => (this.node = node)} />
            </div>
        );

    }
}


class Donut extends Component {
    constructor(props) {
        super(props);
        var state = this.props.currentState;
        this.createDonutCHart = this.createDonutCHart.bind(this);

    }

    // componentDidMount() {
    //     this.createDonutCHart();
    // }
    // componentDidUpdate() {
    //     this.createDonutCHart();
    // }

    createDonutCHart() {
        var self = this;
        var hG = {}, hGDim = { t: 60, r: 0, b: 30, l: 0 };
        hGDim.w = 300 - hGDim.l - hGDim.r;
        hGDim.h = 450 - hGDim.t - hGDim.b;
        var pC = {}, pieDim = { w: 250, h: 250 };
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

        var keyValue = this.props.keyValue;
        var originalData = JSON.parse(JSON.stringify(DATA.data));
        const filteredData = originalData.filter(cityName => (cityName.city === keyValue));
        var data;
        if (filteredData.length !== 0) {
            data = filteredData[0].cityData;
        }
        console.log(data);
        data.forEach(function (d) { d.total = d.freq.low + d.freq.mid + d.freq.high; });

        function segColor(c) { return { low: "#807dba", mid: "#41ab5d", high: "#e08214" }[c]; }
        if (this.props.currentState.currentDonut === 'start') {
            var pD = ['low', 'mid', 'high'].map(function (d) {
                return { type: d, freq: d3.sum(data.map(function (t) { return t.freq[d]; })) };
            });

        }

        else {
            function filter_dates(event) {
                return event.State === self.props.currentState.currentDonut;
            }

            var filtered = data.filter(filter_dates);
            var pD = ['low', 'mid', 'high'].map(function (d) {
                return { type: d, freq: filtered[0].freq[d] };
            });
        }

        var svg = d3.select(this.node)
            .attr("class", "pie")
            .attr("viewBox", "80 -150 " + (hGDim.w + hGDim.l + hGDim.r) + " " + (hGDim.h + hGDim.t + hGDim.b));
        // .attr("width", pieDim.w)
        // .attr("height", pieDim.h);

        var pieGroup = svg.selectAll(".pieGroup").data([0]);
        pieGroup.enter()
            .append("g")
            .attr("class", "pieGroup")
            .attr("transform", "translate(" + hGDim.w / 3.5 + ",20)")
        pieGroup = svg.selectAll(".pieGroup");

        var arc = d3.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        var pie = d3.pie().sort(null).value(function (d) { return d.freq; });

        var pieData = pieGroup.selectAll(".piepath").data(pie(pD));

        pieData.exit().remove();

        pieData.enter().append("path")
            .attr("class", "piepath")
            .merge(pieData)
            .on("mouseover", function (d) {
                self.props.changeBarState(d.data.type);
            })
            .on("mouseout", function () {
                self.props.changeBarState("start");
                self.props.changeDonutState("start");
            })
            .attr("d", arc)
            .transition().duration(500)
            .attrTween("d", arcTween)
            .attr("transform", "translate(" + pieDim.w / 2 + "," + pieDim.h / 2 + ")")
            .style("fill", function (d) { return segColor(d.data.type); });

        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function (t) { return arc(i(t)); };
        }

    }

    render() {
        return (
            <div>
                <svg ref={node => (this.node = node)} />
            </div>
        );

    }
}


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { currentBar: "start", currentDonut: "start" };
        this.changeBarState = this.changeBarState.bind(this);
        this.changeDonutState = this.changeDonutState.bind(this);

    }

    changeBarState(x) {
        this.setState({
            currentBar: x

        })
    }
    changeDonutState(x) {
        this.setState({
            currentDonut: x

        })
    }

    render() {
        var self = this;
        return (
            <Row>
                <Col lg={10} md={10} sm={10} xs={10} className="interactionColBar">
                    <BarChart className="BarChart" currentState={self.state} 
                    changeDonutState={self.changeDonutState} changeBarState={self.changeBarState}
                    keyValue={self.props.keyValue}></BarChart>
                </Col>
                {/* <Col lg={6} md={6} sm={3} xs={3} className="interactionColDonut">
                    <Donut className="DonutCHart" currentState={self.state} 
                    changeDonutState={self.changeDonutState} changeBarState={self.changeBarState}
                    keyValue={self.props.keyValue}></Donut>
                </Col> */}
            </Row>);

    }

}


export default Dashboard;