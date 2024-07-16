import { Module } from '@nestjs/common';
import { BasicReportModule } from './basic-report/basic-report.module';

@Module({
  imports: [BasicReportModule],
})
export class AppModule {}
