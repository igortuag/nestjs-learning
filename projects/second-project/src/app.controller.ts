import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {
  constructor(
    private prisma: PrismaService
  ) {

  }

  @Get('hello')
  getHello(): object {
    return {
      message: 'Hello World!'
    }
  }
}
