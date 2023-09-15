import { ConflictException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { hash } from "bcryptjs";
import { ZodValidationPipe } from "pipes/zod-validation-pipes";
import { PrismaService } from "prisma/prisma.service";
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

type CreateAccountBody = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBody) {
    const { name, email, password } = body;

    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email,
      }
    });

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
  }
}