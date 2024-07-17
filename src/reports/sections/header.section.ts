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
export const headerSection = (options: HeaderOptions): Content => {
  const { showDate = true, showLogo = true, subtitle, title } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate
    ? {
        text: DateFormatter.getDDMMMMYYY(new Date()),
        alignment: 'right',
        margin: [20, 20],
      }
    : null;

  const headerTitle: Content = title
    ? {
        text: title,
        style: {
          bold: true,
        },
      }
    : null;

  return {
    columns: [headerLogo, headerDate],
  };
};
