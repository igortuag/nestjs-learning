import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import "dotenv/config";

const prisma = new PrismaClient();

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schemaId);

  return url.toString();
}

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(randomUUID());

  process.env.DATABASE_URL = databaseUrl;

  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});
