import React from 'react';
import { Chart } from 'react-google-charts';

const ProductDasboard = () => {
  const data = [
    ['Year', 'Sales'],
    ['2014', 1000],
    ['2015', 1170],
    ['2016', 660],
    ['2017', 1030],
  ];

  const options = {
    title: 'Company Sales Over the Years',
    curveType: 'function',
    legend: { position: 'bottom' },
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default ProductDasboard;
