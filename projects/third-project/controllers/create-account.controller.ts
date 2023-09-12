import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) { }

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body;

    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email,
      }
    });

    if (userAlreadyExists) {
      return {
        error: 'User already exists',
      };
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      }
    });
  }
}