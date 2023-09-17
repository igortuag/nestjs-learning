import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateAccountController } from 'controllers/create-account.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule { }
