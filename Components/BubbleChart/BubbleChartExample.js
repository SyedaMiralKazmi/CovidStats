import React from 'react';

import ExampleComponent from '../ExampleComponent/ExampleComponent';

 

import BubbleChart from './BubbleChart';

import BubbleChartTestData from './BubbleChart-data';

import BubbleChartTestOptions from './BubbleChartTestOptions';

const BubbleChartExample = () => (

    <ExampleComponent

        title={'Bubble Chart'}

        component={BubbleChart}

        data={BubbleChartTestData}

        options={BubbleChartTestOptions}

    />

);

 

export default BubbleChartExample;