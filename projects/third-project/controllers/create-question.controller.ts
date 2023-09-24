import { Controller, Post } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Controller('/questions')
export class CreateQuestionController {
  constructor(
    private prisma: PrismaService) { }

  @Post()
  async handle() {
    return "ok"
  }
}