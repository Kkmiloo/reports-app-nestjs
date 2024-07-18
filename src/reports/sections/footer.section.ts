import { Content, DynamicContent } from 'pdfmake/interfaces';

export const footerSection: DynamicContent = (
  currentPage,
  pageCount,
): Content => {
  return {
    text: `Page ${currentPage} of ${pageCount}`,
    alignment: 'right',
    bold: true,
    fontSize: 10,
    marginRight: 40,
    marginTop: 10,
  };
};
