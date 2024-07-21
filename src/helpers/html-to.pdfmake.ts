import htmlToPdfMake from 'html-to-pdfmake';

import { JSDOM } from 'jsdom';

interface ContentReplacer {
  [key: string]: string;
}

export const getHtmlContent = (
  html: string,
  replacers: ContentReplacer = {},
) => {
  // TODO:  implementar la función que convierte el HTML a PDFMake

  Object.entries(replacers).forEach(([key, value]) => {
    const key1 = `{{ ${key} }}`;
    const key2 = `{{${key}}}`;

    html = html.replaceAll(key1, value).replaceAll(key2, value);
  });

  const { window } = new JSDOM();
  return htmlToPdfMake(html, { window });
};
