import React from 'react';

import ExampleComponent from '../ExampleComponent/ExampleComponent';

 

import ZoomableBubbleChart from './ZoomableBubbleChart';

import ZoomableBubbleChartTestData from './ZoomableBubbleChartTestData';

import ZoomableBubbleChartTestOptions from './ZoomableBubbleChartTestOptions';

import './zoomablebubblechart-styles.css';

 

const ZoomableBubbleChartExample = () => (

    <ExampleComponent

        title={'Zoomable Bubble Chart'}

        component={ZoomableBubbleChart}

        data={ZoomableBubbleChartTestData}

        options={ZoomableBubbleChartTestOptions}

    />

);

 

export default ZoomableBubbleChartExample;