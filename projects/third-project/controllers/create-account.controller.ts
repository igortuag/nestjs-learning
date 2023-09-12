import { Controller, Post } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) { }

  @Post()
  async handle() {
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const password = '123456';

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      }
    });
  }
}