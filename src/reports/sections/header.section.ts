import { DateFormatter } from '../../helpers';

import { Content, ContentImage } from 'pdfmake/interfaces';

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: ContentImage = {
  image: `src/assets/tucan-code-logo.png`,
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMMMYYY(new Date()),
  alignment: 'right',
  margin: [20, 30],
  width: 150,
};

export const headerSection = (options: HeaderOptions): Content => {
  const { showDate = true, showLogo = true, subtitle, title } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate ? currentDate : null;

  const headerSubtitle: Content = subtitle
    ? {
        stack: [
          {
            text: subtitle,
            style: {
              alignment: 'center',
              fontSize: 18,
            },
          },
        ],
      }
    : null;

  const headerTitle: Content = title
    ? {
        marginTop: 20,
        stack: [
          {
            text: title,
            style: {
              bold: true,
              alignment: 'center',
              fontSize: 22,
            },
          },
          headerSubtitle,
        ],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
