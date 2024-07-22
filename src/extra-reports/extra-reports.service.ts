import { Injectable } from '@nestjs/common';

import { PrinterService } from '../printer/printer.service';
import fs from 'fs';
import { getHtmlContent } from '../helpers/html-to.pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from '../reports/sections/header.section';
import { getCommunityReport } from '../reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf-8');

    const content = getHtmlContent(html, { client: 'Camilo' });

    const docDef: TDocumentDefinitions = {
      pageMargins: [40, 120, 40, 60],
      header: headerSection({
        title: 'Reporte de prueba',
      }),
      content: content,
    };

    const doc = this.printerService.createPdf(docDef);

    return doc;
  }

  getCommunity() {
    const docDef = getCommunityReport();

    const doc = this.printerService.createPdf(docDef);

    return doc;
  }
}
