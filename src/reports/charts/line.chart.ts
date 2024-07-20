import * as Utils from 'src/helpers/cahr-utils';

export const getLineChart = async (): Promise<string> => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Inventario',
        data: Utils.numbers({ count: 6, min: -100, max: 100 }),
        borderColor: Utils.CHART_COLORS[1],
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS[1], 0.5),
        pointStyle: 'circle',
        pointRadius: 3,
        pointHoverRadius: 15,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: (ctx) =>
            'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
        },
      },
    },
  };

  const chart = Utils.chartJsToImage(config, {
    width: 500,
    height: 200,
  });

  return chart;
};
