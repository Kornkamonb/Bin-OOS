import React from 'react';
import Plot from 'react-plotly.js';
import { dataChart } from './data';

const MonthlySummaryChart: React.FC = () => {
  const chartData = dataChart();
  
  // Aggregate data by month
  const monthlyData = chartData.data.reduce((acc, item) => {
    if (!acc[item.month]) {
      acc[item.month] = { total: 0, finished: 0, ongoing: 0 };
    }
    acc[item.month].total += parseInt(item.total);
    acc[item.month].finished += parseInt(item.finished);
    acc[item.month].ongoing += parseInt(item.ongoing);
    return acc;
  }, {} as Record<string, { total: number; finished: number; ongoing: number }>);
  
  const months = Object.keys(monthlyData).sort();
  
  const totalTrace = {
    x: months,
    y: months.map(month => monthlyData[month].total),
    name: 'Total Tasks',
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    line: { color: 'blue' }
  };
  
  const finishedTrace = {
    x: months,
    y: months.map(month => monthlyData[month].finished),
    name: 'Finished Tasks',
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    line: { color: 'green' }
  };
  
  const ongoingTrace = {
    x: months,
    y: months.map(month => monthlyData[month].ongoing),
    name: 'Ongoing Tasks',
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    line: { color: 'orange' }
  };

  return (
    <Plot
      data={[totalTrace, finishedTrace, ongoingTrace]}
      layout={{
        title: 'Monthly Task Summary Trends',
        xaxis: { title: 'Month' },
        yaxis: { title: 'Number of Tasks' },
        height: 500
      }}
      config={{ responsive: true }}
    />
  );
};

export default MonthlySummaryChart;
