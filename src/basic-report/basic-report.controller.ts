import { Controller, Get, Res } from '@nestjs/common';
import { BasicReportService } from './basic-report.service';
import { Response } from 'express';

@Controller('basic-report')
export class BasicReportController {
  constructor(private readonly basicReportService: BasicReportService) {}

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = this.basicReportService.getHello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
