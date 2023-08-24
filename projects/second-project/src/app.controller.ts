import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {
  constructor(
    private prisma: PrismaService
  ) {

  }

  @Get('hello')
  async getHello() {
    const member = await this.prisma.teamMember.create({
      data: {
        id: '1',
        name: 'John Doe',
        function: 'CEO',
      }
    })

    return {
      member
    }
  }
}
