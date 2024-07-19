import { Module } from '@nestjs/common';
import { BasicReportModule } from './basic-report/basic-report.module';
import { PrinterModule } from './printer/printer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';

@Module({
  imports: [BasicReportModule, PrinterModule, StoreReportsModule],
})
export class AppModule {}
