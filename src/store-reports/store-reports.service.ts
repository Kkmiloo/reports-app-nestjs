import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { orderByIdReport } from '../reports';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('DB connected');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }
  async getOrderReport(orderId: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order)
      throw new NotFoundException(`order with id ${orderId} not found`);

    const docDefinition = orderByIdReport({
      data: order as any,
    });

    const doc = await this.printerService.createPdf(docDefinition);

    return doc;
  }
}
