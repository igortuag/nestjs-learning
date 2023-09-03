import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { TeamMemberRepository } from './repositories/team-member-repository';
import { PrismaTeamMemberRepository } from './repositories/prisma/prisma-team-member-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, {
    provide: TeamMemberRepository,
    useClass: PrismaTeamMemberRepository
  }],
})
export class AppModule { }
