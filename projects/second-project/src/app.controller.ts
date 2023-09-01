import { Body, Controller, Post } from '@nestjs/common';
import { CreateTeamMemberBody } from './dtos/create-team-member-body';
import { TeamMemberRepository } from './repositories/team-member-repository';

@Controller()
export class AppController {
  constructor(
    private teamMemberRepository: TeamMemberRepository,
  ) {

  }

  @Post('hello')
  async getHello(@Body() body: CreateTeamMemberBody) {
    const { name, function: func } = body

    await this.teamMemberRepository.create(name, func)
  }
}
