import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import { getHelloWorldReport } from '../reports';

@Injectable()
export class BasicReportService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  getHello() {
    const docDefinition = getHelloWorldReport({ name: 'Camilo' });
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
