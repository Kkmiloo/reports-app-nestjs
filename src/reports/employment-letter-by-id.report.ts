import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

import { headerSection } from './sections/header.section';
import { DateFormatter } from '../helpers';

interface ReportValues {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}

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

export const getEmploymentLetterById = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employeeHours,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeWorkSchedule,
    employerCompany,
    employerName,
    employerPosition,
  } = values;

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
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMMYYY(employeeStartDate)}. \n\n
Durante su empleo, el Sr./Sra. ${employeeName}  ha desempeñado el cargo de ${employeePosition}  demostrando responsabilidad, compromiso y habilidades profesionales en suslabores. \n\n
La jornada laboral del Sr./ Sra. ${employeeName}  es de ${employeeHours} horas
semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y
procedimientos establecidos por la empresa. \n\n
Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'body',
      },
      {
        text: `Atentamente,
 ${employerName}
 ${employerPosition}
 ${employerCompany}
${DateFormatter.getDDMMMMYYY(new Date())}`,
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
