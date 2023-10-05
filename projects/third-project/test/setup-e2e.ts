import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

function generateUniqueDatabaseURL(schemaId: string) {}

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});
