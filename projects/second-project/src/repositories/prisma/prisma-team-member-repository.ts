import { PrismaService } from "src/database/prisma.service";
import { TeamMemberRepository } from "../team-member-repository";
import { randomUUID } from "node:crypto";

export class PrismaTeamMemberRepository implements TeamMemberRepository {
  constructor(private prisma: PrismaService) { }

  async create(name: string, func: string): Promise<void> {
    await this.prisma.teamMember.create({
      data: {
        id: randomUUID(),
        name,
        function: func
      }
    })
  }
}