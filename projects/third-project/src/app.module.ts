import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateAccountController } from 'controllers/create-account.controller';
import { envSchema } from 'prisma/env';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (envConfig) => envSchema.parse(envConfig),
    isGlobal: true,
  })],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule { }
