import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  public client: PrismaClient = new PrismaClient();

  constructor() {
    this.client = new PrismaClient();
  }
}