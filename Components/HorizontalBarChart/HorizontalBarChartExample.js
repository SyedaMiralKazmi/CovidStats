import React from 'react';

import ExampleComponent from '../ExampleComponent/ExampleComponent';

import HorizontalBarChart from '../HorizontalBarChart/HorizontalBarChart';

import HorizontalBarChartTestData from './HorizontalBarChartTestData';

import HorizontalBarChartTestOptions from '../HorizontalBarChart/HorizontalBarChartOptions';

//import './HorizontalBarChart-style.scss';

 

const HorizontalBarChartExample = () => (

    <ExampleComponent

        title={'Horizontal Bar Chart'}

        component={HorizontalBarChart}

        data={HorizontalBarChartTestData}

        options={HorizontalBarChartTestOptions}

    />

);

 

export default HorizontalBarChartExample;