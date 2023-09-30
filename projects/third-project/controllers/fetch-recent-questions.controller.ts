import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { CurrentUser } from "auth/current-user.decarator";
import { JwtAuthGuard } from "auth/jwt-auth.guard";
import { TokenPayloadSchema } from "auth/jwt.strategy";
import { Request } from "express";
import { ZodValidationPipe } from "pipes/zod-validation-pipes";
import { PrismaService } from "prisma/prisma.service";
import { z } from "zod";

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) { }

  @Get()
  async handle() {
    return "ok";
  }
}
