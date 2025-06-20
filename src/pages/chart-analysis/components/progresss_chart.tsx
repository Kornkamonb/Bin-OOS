import React from 'react';
import Plot from 'react-plotly.js';
import { dataChart } from './data';

const ProgressChart: React.FC = () => {
  const chartData = dataChart();
  
  const finishedTrace = {
    x: chartData.data.map(item => `${item.month} - ${item.req_to_job}`),
    y: chartData.data.map(item => parseInt(item.finished)),
    name: 'Finished',
    type: 'bar' as const,
    marker: { color: 'green' }
  };
  
  const ongoingTrace = {
    x: chartData.data.map(item => `${item.month} - ${item.req_to_job}`),
    y: chartData.data.map(item => parseInt(item.ongoing)),
    name: 'Ongoing',
    type: 'bar' as const,
    marker: { color: 'orange' }
  };

  return (
    <Plot
      data={[finishedTrace, ongoingTrace]}
      layout={{
        title: 'Task Progress: Finished vs Ongoing',
        xaxis: { 
          title: 'Month - Job Type',
          tickangle: -45
        },
        yaxis: { title: 'Number of Tasks' },
        barmode: 'stack',
        height: 600,
        margin: { b: 150 }
      }}
      config={{ responsive: true }}
    />
  );
};

export default ProgressChart;
