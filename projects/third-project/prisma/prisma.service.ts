import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super(
      {
        log: ['info', 'warn'],
      }
    );
  }

  onModuleInit() {
    throw new Error('Method not implemented.');
  }

  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }
}