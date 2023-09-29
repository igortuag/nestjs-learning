import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { CurrentUser } from "auth/current-user.decarator";
import { JwtAuthGuard } from "auth/jwt-auth.guard";
import { TokenPayloadSchema } from "auth/jwt.strategy";
import { Request } from "express";
import { ZodValidationPipe } from "pipes/zod-validation-pipes";
import { PrismaService } from "prisma/prisma.service";
import { z } from "zod";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string()
});

type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>;

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) { }

  @Post()
  async handle(
    @CurrentUser() user: TokenPayloadSchema,
    @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBody,
  ) {
    const { title, content } = body;
    const userId = user.sub

    await this.prisma.question.create({
      data: {
        title,
        content,
        slug: title.toLowerCase().replace(/ /g, "-"),
        authorId: userId
      }
    })

    return "ok";
  }
}
