import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { generateDonutChart } from './charts/donnut.chart';
import { headerSection } from './sections/header.section';
import { getLineChart } from './charts/line.chart';
import { getBarChart } from './charts/bars.chart';
import { footerSection } from './sections/footer.section';
import { getHorizontalBarChart } from './charts/horizontal.chart';
interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries?: TopCountry[];
}

export const getStatisticsReport = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const [donutChart, lineChart, barChart, horizontalChart] = await Promise.all([
    generateDonutChart({
      position: 'left',
      entries: options.topCountries.map((country) => ({
        value: country.customers,
        label: country.country,
      })),
    }),
    getLineChart(),
    getBarChart(),
    getHorizontalBarChart(),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title ?? 'Estadísticas de clientes',
      subtitle: options.subTitle ?? 'Top 10 clientes',
    }),
    footer: footerSection,
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: 'Mejores 10 paises',
                marginBottom: 10,
              },
              {
                image: donutChart,
                width: 300,
              },
            ],
          },
          {
            width: 'auto',
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['Country', 'Customers'],
                ...options.topCountries.map((country) => [
                  country.country,
                  country.customers,
                ]),
              ],
            },
          },
        ],
      },
      {
        marginTop: 20,
        image: lineChart,
        width: 500,
      },
      {
        marginTop: 20,
        columnGap: 10,
        columns: [
          {
            image: barChart,
            width: 250,
          },
          {
            image: horizontalChart,
            width: 250,
          },
        ],
      },
    ],
  };
  return docDefinition;
};
