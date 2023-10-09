import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

test("Create question (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();

    prisma = module.get(PrismaService);

    await app.init();
  });

  test("[POST] /questions", async () => {
    const response = await request(app.getHttpServer())
      .post("/questions")
      .send({
        title: "How to create a question?",
        content:
          "I am trying to create a question here, but I do not know how to do it."
      });

    expect(response.status).toBe(201);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: "johndoe@example.com"
      }
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
