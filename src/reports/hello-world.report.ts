import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
}

export const getHelloWorldReport = (options: ReportOptions) => {
  const { name } = options;
  const docDefinition: TDocumentDefinitions = {
    content: [`Hello World ${name}`],
  };

  return docDefinition;
};
