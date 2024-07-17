import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import {
  getEmploymentLetter,
  getEmploymentLetterById,
  getHelloWorldReport,
} from '../reports';

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

  getEmploymentLetter() {
    const docDefinition = getEmploymentLetter();
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('User Not Found');
    }
    const docDefinition = getEmploymentLetterById({
      employeeHours: employee.hours_per_day,
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Some Company',
      employerName: 'Camilo',
      employerPosition: 'Developer',
    });
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
