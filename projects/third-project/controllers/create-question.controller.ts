import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { CurrentUser } from "auth/current-user.decarator";
import { JwtAuthGuard } from "auth/jwt-auth.guard";
import { TokenPayloadSchema } from "auth/jwt.strategy";
import { Request } from "express";
import { PrismaService } from "prisma/prisma.service";

@Controller('/questions')
  @UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(
    private prisma: PrismaService) { }

  @Post()
  async handle(@CurrentUser() user: TokenPayloadSchema) {
    console.log(user)

    return "ok"
  }
}