import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/prisma.service';

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService
  ) { }

  @Get('/hello')
  async getHello(): Promise<string> {
    return await this.prisma.client.findMany();
  }
}
