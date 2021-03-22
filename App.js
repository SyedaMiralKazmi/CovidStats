import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { Component } from 'react';
import "react-alice-carousel/lib/alice-carousel.css";
import { Card, Col, Container, Row } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './App.css';
import InteractionChart from './Components/InteractionChart/InteractionChart';
import InteractionChartData from './Components/InteractionChart/InteractionChartData';
import HorizontalBarChart from './Components/HorizontalBarChart/HorizontalBarChart';
import HorizontalBarChartTestData from './Components/HorizontalBarChart/HorizontalBarChartTestData';
import HorizontalBarChartTestOptions from './Components/HorizontalBarChart/HorizontalBarChartOptions';
import LineChart from './Components/LineChart/LineChart';
import LineChartTestData from './Components/LineChart/LineChartTestData';
import LineChartTestOptions from './Components/LineChart/LineChartTestOptions';
import LiquidFilledGauge from './Components/LiquidFilledGauge/LiquidFilledGauge';
import LiquidFilledGaugeTestOptions from './Components/LiquidFilledGauge/LiquidFilledGaugeTestOptions';
import LiquidFilledGaugeThree from './Components/LiquidFilledGauge/LiquidFilledGaugeThree';
import LiquidFilledGaugeTwo from './Components/LiquidFilledGauge/LiquidFilledGaugeTwo';
import LongMenu from './Components/Menu/LongMenu';
import ZoomableBubbleChart from './Components/ZoomableBubbleChart/ZoomableBubbleChart';
import ZoomableBubbleChartTestData from './Components/ZoomableBubbleChart/ZoomableBubbleChartTestData';
import ZoomableBubbleChartTestOptions from './Components/ZoomableBubbleChart/ZoomableBubbleChartTestOptions';
import logo from './CSLOGO.png';
import GaugeChart from './Components/GaugeChart/GaugeChart';



const cities = [
  { title: 'Viken', year: 1994 },
  { title: 'Halden', year: 1972 },
  { title: 'Fredrikstad', year: 1974 }
];
const chartStyle = {
  height: 200,
  width: 500
}

class App extends Component {
  constructor() {
    super();
    this.state = { selectedCity: "Viken" }
    this.handleComboBoxChange = this.handleComboBoxChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }
  handleComboBoxChange(newValue) {
    this.setState({
      selectedCity: newValue.title
    })
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    var ReactTitle = require('reactjs-title');
    var Title = ReactTitle.default;
    var flushTitle = ReactTitle.flushTitle;
    var settings = {
      dots: true,
      autoplay: false
    };
    var circleStyle = {
      padding: 10,
      margin: 20,
      display: "inline-block",
      backgroundColor: this.props.bgColor,
      borderRadius: "50%",
      width: 100,
      height: 100,
    };
    return (
      <Container fluid className="App">
        <Row className="titleRow">
          <Col lg={6} md={6} sm={6} xs={6} className="logoCol">
            <img src={logo} className="loogo" />
          </Col>

          <Col lg={6} md={6} sm={6} xs={6} className="menuCol">
            <LongMenu />
          </Col>
        </Row>
        <Row>
          <h3 className="norwaytitle">Norway</h3>
        </Row>
        <Row className="liquidGaugeRow">
          <Col lg={4} md={4} sm={4} xs={4} className="liquidGaugeChartCol">
            <Card class="shadow p-3 mb-5 bg-white rounded" className="liquidGaugeCard1">
              <h4 class="card-title text-center" className="card1title">23600</h4>
              <h6 class="card-subtitle mb-2 text-center" className="card1subtitle">Total</h6>
              
              {/* <LiquidFilledGauge
                title={'Liquid Filled Gauge'}
                data={.35}
                options={LiquidFilledGaugeTestOptions}
              /> */}
            </Card>
          </Col>
          <Col lg={4} md={4} sm={4} xs={4} className="liquidGaugeChartCol">
            <Card className="liquidGaugeCard2">
            <h4 class="card-title text-center" className="card2title">375</h4>
              <h6 class="card-subtitle mb-2 text-center" className="card2subtitle">New Today</h6>
              {/* <LiquidFilledGaugeTwo
                title={'Liquid Filled Gauge'}
                data={62}
                options={LiquidFilledGaugeTestOptions}
              /> */}
            </Card>
          </Col>
          <Col lg={4} md={4} sm={4} xs={4} className="liquidGaugeChartCol">
            <Card className="liquidGaugeCard3">
            <h4 class="card-title text-center" className="card3title">84</h4>
              <h6 class="card-subtitle mb-2 text-center" className="card3subtitle">Hospitalized</h6>
              {/* <LiquidFilledGaugeThree
                title={'Liquid Filled Gauge'}
                data={4}
                options={LiquidFilledGaugeTestOptions}
              /> */}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="comboBoxCol">
            <Autocomplete
              id="combo-box-demo"
              options={cities}
              style={{ width: "93%"}}
              onChange={(e, newValue) => this.handleComboBoxChange(newValue)}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Where do you want to check next?" variant="outlined" />}
            />
          </Col>
        </Row>
        
        <Row >
          <Col lg={12}>
            <Card className="chartcard1">
              <div class="card-title text-left" className="maincardtitle1">Registered Infections (7 Days)</div>
              <InteractionChart
                title={'InteractionChart'}
                data={InteractionChartData}
                keyValue={this.state.selectedCity}
              />
              <Row>
              <Col lg={4} md={4} sm={4} xs={4} >

              <div class="card-title text-center" className="titlecards">6 382</div>
              <div class="card-subtitle mb-2 text-muted text-center" className="subtitlecards">Total</div>
              </Col>
              <Col lg={4} md={4} sm={4} xs={4} >
              
              <div class="card-title text-center" className="titlecards">100</div>
              <div class="card-subtitle mb-2 text-muted text-center" className="subtitlecards">New Today</div>
              </Col>
              <Col lg={4} md={4} sm={4} xs={4} >

              <div class="card-title text-center" className="titlecards">131,3</div>
              <div class="card-subtitle mb-2 text-muted text-center" className="subtitlecards">Per 100k, Last 14 Days.</div>
              </Col>
              </Row>
            </Card>
          </Col>
        </Row>


        <Row >
          <Col lg={12}>
            <Card className="chartcard1">
              <div class="card-title text-left" className="maincardtitle1">Trends in Reg. Infections</div>
              <GaugeChart data={1} indicator={true} currentPercent={"34"} type={""}/>
            </Card>
          </Col>
        </Row>

        

        <Row >
          <Col lg={12}>
            <Card className="chartcard3">
            <div class="card-title text-left" className="maincardtitle1">Hospitalizations (7 Days)</div>
              <HorizontalBarChart
                title={'Horizontal Bar Chart'}
                data={HorizontalBarChartTestData}
                options={HorizontalBarChartTestOptions}
              />

              <Row>
              <Col lg={6} md={6} sm={6} xs={6} >

              <div class="card-title text-center" className="titlecards">51</div>
              <div class="card-subtitle mb-2 text-muted text-center" className="subtitlecards">Yesterday</div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} >
              
              <div class="card-title text-center" className="titlecards">46</div>
              <div class="card-subtitle mb-2 text-muted text-center" className="subtitlecards">Today</div>
              </Col>
              
              </Row>
            </Card>
          </Col>
        </Row>

      </Container >

    );
  }
}

export default App;















