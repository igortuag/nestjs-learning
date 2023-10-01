import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "auth/jwt-auth.guard";
import { PrismaService } from "prisma/prisma.service";

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Query("page") page: string) {
    const questions = await this.prisma.question.findMany({
      orderBy: { createdAt: "desc" }
    });

    return { questions };
  }
}
