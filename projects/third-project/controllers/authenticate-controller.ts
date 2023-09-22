import { Controller, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

@Controller('/sessions')
export class AuthController {
  constructor(private jwt: JwtService) { }

  @Post()
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' });

    return token
  }
}