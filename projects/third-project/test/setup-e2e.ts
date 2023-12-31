import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { randomUUID } from "crypto";
import "dotenv/config";

const prisma = new PrismaClient();
const schemaRandomId = randomUUID();

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schemaId);

  return url.toString();
}

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(schemaRandomId);

  process.env.DATABASE_URL = databaseUrl;

  execSync("npm prisma migrate deploy");
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS ${schemaRandomId} CASCADE;`
  );
  await prisma.$disconnect();
});
