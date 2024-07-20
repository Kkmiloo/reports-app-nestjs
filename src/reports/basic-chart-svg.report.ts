import { TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs';

import * as Utils from '../helpers/cahr-utils';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generateChartImage = () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: [2012, 2013, 2014, 2015, 2016], // Set X-axis labels
      datasets: [
        {
          label: 'Users', // Create the 'Users' dataset
          data: [120, 60, 50, 180, 120], // Add data to the chart
        },
      ],
    },
  };

  return Utils.chartJsToImage(chartConfig, { height: 50 });
};

const generateDonut = async () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: Utils.numbers({ count: 5, min: 0, max: 100 }),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
  };

  return Utils.chartJsToImage(config, {});
};

export const getBasicChartSvgReport =
  async (): Promise<TDocumentDefinitions> => {
    const [chart, donut] = await Promise.all([
      generateChartImage(),
      generateDonut(),
    ]);

    return {
      content: [
        {
          svg: svgContent,
        },
        {
          image: chart,
          width: 200,
        },
        {
          image: donut,
          width: 200,
        },
      ],
    };
  };
