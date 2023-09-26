import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "auth/jwt-auth.guard";
import { Request } from "express";
import { PrismaService } from "prisma/prisma.service";

@Controller('/questions')
  @UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(
    private prisma: PrismaService) { }

  @Post()
  async handle(@Req() request: Request) {
    return "ok"
  }
}