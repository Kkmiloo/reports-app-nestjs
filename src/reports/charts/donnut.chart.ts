import * as Utils from 'src/helpers/cahr-utils';

interface DonutEntry {
  label: string;
  value: number;
}

interface DonutOption {
  position?: 'left' | 'right' | 'top' | 'bottom';
  entries: DonutEntry[];
}

export const generateDonutChart = (options: DonutOption): Promise<string> => {
  const { position = 'top' } = options;
  const data = {
    labels: options.entries.map((e) => e.label),
    datasets: [
      {
        data: options.entries.map((e) => e.value),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position,
      },
      responsive: true,
      plugins: {
        datalabels: {
          color: 'white',
          // text: 'Chart.js Doughnut Chart',
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};
