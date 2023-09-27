import { Injectable } from "@nestjs/common/decorators";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from "prisma/env";
import { z } from "zod";

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
})

export type TokenPayloadSchema = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: publicKey,
      algorithms: ['RS256']
    })
  }

  async validate(payload: TokenPayloadSchema) {
    return tokenPayloadSchema.parse(payload)
  }
}