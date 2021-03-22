import React from 'react';

import ExampleComponent from '../ExampleComponent/ExampleComponent';

 

import LineChart from './LineChart';

import LineChartTestData from './LineChartTestData';

import LineChartTestOptions from './LineChartTestOptions';

import './linechart-styles.css';

 

const LineChartExample = () => (

    <ExampleComponent

        title={'Line Chart'}

        component={LineChart}

        data={LineChartTestData}

        options={LineChartTestOptions}

    />

);

 

export default LineChartExample;