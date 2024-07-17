import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

import { headerSection } from './sections/header.section';

const style: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 20, 0, 60],
    alignment: 'center',
  },
  signature: {
    fontSize: 16,
    bold: true,
    alignment: 'right',
    margin: [0, 50, 0, 0],
  },
  body: {
    margin: [0, 0, 0, 50],
    alignment: 'justify',
  },
};

export const getEmploymentLetter = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    pageMargins: [50, 60, 50, 60],
    header: headerSection({}),
    styles: style,
    content: [
      {
        text: 'Employment Letter \n',
        style: 'header',
      },
      {
        text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa],
por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra
empresa desde el [Fecha de Inicio del Empleado]. \n\n
Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del
Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus
labores. \n\n
La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas
semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y
procedimientos establecidos por la empresa. \n\n
Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'body',
      },
      {
        text: `Atentamente,
[Nombre del Empleador] 
[Cargo del Empleador]
[Nombre de la Empresa]
[Fecha de Emisión]`,
        style: 'signature',
      },
    ],

    footer: {
      text: `Este documento es una constancia de empleo y no representa un compromiso laboral.`,
      italics: true,
      alignment: 'center',
      margin: [20, 0],
    },
  };

  return docDefinition;
};
