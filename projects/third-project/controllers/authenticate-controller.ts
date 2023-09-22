import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ZodValidationPipe } from "pipes/zod-validation-pipes";
import { PrismaService } from "prisma/prisma.service";
import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBody = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBody) {
    const { email, password } = body



    const token = this.jwt.sign({ sub: 'user-id' });

    return token
  }
}