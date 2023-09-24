import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'auth/auth.modules';
import { AuthController } from 'controllers/authenticate.controller';
import { CreateAccountController } from 'controllers/create-account.controller';
import { envSchema } from 'prisma/env';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (envConfig) => envSchema.parse(envConfig),
    isGlobal: true,
  }),
    AuthModule
  ],
  controllers: [CreateAccountController, AuthController],
  providers: [PrismaService],
})
export class AppModule { }
