import { PrismaService } from "src/database/prisma.service";
import { TeamMemberRepository } from "../team-member-repository";

export class PrismaTeamMemberRepository implements TeamMemberRepository {
  constructor(private prisma: PrismaService) { }

  async create(name: string, func: string): Promise<void> {
    console.log(`PrismaTeamMemberRepository.create(${name}, ${func})`)
  }
}