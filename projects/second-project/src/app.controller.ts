import { Body, Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { randomUUID } from 'node:crypto'
import { CreateTeamMemberBody } from './dtos/create-team-member-body';

@Controller()
export class AppController {
  constructor(
    private prisma: PrismaService
  ) {

  }

  @Get('hello')
  async getHello(@Body() body: CreateTeamMemberBody) {
   const {name, function: func} = body

    const member = await this.prisma.teamMember.create({
      data: {
        id: randomUUID(),
        name,
        function: func,
      }
    })

    return {
      member
    }
  }
}
