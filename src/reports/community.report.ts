import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = (): TDocumentDefinitions => {
  const docDef: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      {
        //Logo - Dirección Número de orden
        columns: [
          {
            image: 'src/assets/tucan-code-logo.png',
            width: 50,
          },
          {
            alignment: 'center',
            text: 'Forest Admin Community SAP \n RUT: 42.123.1233\nCamino montaña 12 \nTeléfono:321221 ',
          },
          {
            width: 140,
            layout: 'borderBlue',
            table: {
              body: [
                [
                  {
                    table: {
                      body: [
                        ['Orden de trabajo: ', '123456'],
                        ['Fecha: ', '12/12/2023'],
                      ],
                    },
                    layout: 'noBorders',
                  },
                ],
              ],
            },
          },
        ],
      },

      // Horizontal line{}
      {
        margin: [0, 5],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 1,
            lineColor: '#000000',
          },
        ],
      },

      // Detalles de cliente

      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Cliente: ',
                bold: true,
                fillColor: '#5775e1',
                color: 'white',
                colSpan: 4,
              },
              {},
              {},
              {},
            ],
            [
              {
                text: 'Razon social: ',
                bold: true,
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: 'Empresa',

                fillColor: 'white',
              },
              {
                text: 'Dirección: ',
                bold: true,
                fillColor: '#343a40',
                color: 'white',
              },
              {
                text: 'Empresa 22',

                fillColor: 'white',
              },
            ],
          ],
        },
      },
    ],
  };

  return docDef;
};
