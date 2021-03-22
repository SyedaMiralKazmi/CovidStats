import React from 'react';

import ExampleComponent from '../ExampleComponent/ExampleComponent';

 

import InteractionChart from './InteractionChart';

import InteractionChartData from './InteractionChartData';

 

const InteractionChartExample = () => (

    <ExampleComponent

        title={'InteractionChart'}

        component={InteractionChart}

        data={InteractionChartData}

    />

);

 

export default InteractionChartExample;