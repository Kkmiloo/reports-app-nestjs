import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from '../helpers';
import { footerSection } from './sections/footer.section';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  height: 30,
  width: 100,

  margin: [0, 0, 0, 10],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 0, 30, 20],
  },
};

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subtitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
  const { data } = value;

  const { customers, order_date, order_details, order_id } = data;
  const { address, city, contact_name, country, customer_name, postal_code } =
    customers;

  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );

  return {
    styles,
    header: logo,
    footer: footerSection,
    content: [
      {
        text: 'Tucan Code',
        style: 'header',
      },
      //Numero y recibo
      {
        columns: [
          {
            text: `${address}\n ${city} \n ${country} \n ${postal_code}`,
          },
          {
            text: [
              { text: `Numero de orden: ${order_id}`, bold: true },
              ` \n Fecha de recibo ${DateFormatter.getDDMMMMYYY(order_date)} \n Pagar antes de ${DateFormatter.getDDMMMMYYY(new Date())} `,
            ],
            alignment: 'right',
          },
        ],
      },
      //QR
      {
        qr: 'camiloreyes.xyz',
        fit: 75,
        alignment: 'right',
      },
      //Dirección del cliente
      {
        text: [
          { text: `Cobrar a: ${customer_name} \n`, bold: true },
          ` Razón social: ${contact_name}
            Hohaios
                `,
        ],
      },

      //Tabla Del detalle de la orden
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'ID', bold: true },
              { text: 'Producto', bold: true },
              { text: 'Cantidad', bold: true },
              { text: 'Precio', bold: true },
              { text: 'Total', bold: true },
            ],
            ...order_details.map((detail) => [
              detail.product_id,
              detail.products.product_name,
              detail.quantity,
              CurrencyFormatter.format(+detail.products.price),
              CurrencyFormatter.format(
                detail.quantity * +detail.products.price,
              ),
            ]),
          ],
        },
      },
      //Total
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.format(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  'total',
                  {
                    text: CurrencyFormatter.format(subTotal * 1.15),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
