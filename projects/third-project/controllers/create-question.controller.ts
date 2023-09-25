import { Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "auth/jwt-auth.guard";
import { PrismaService } from "prisma/prisma.service";

@Controller('/questions')
  @UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(
    private prisma: PrismaService) { }

  @Post()
  async handle() {
    return "ok"
  }
}