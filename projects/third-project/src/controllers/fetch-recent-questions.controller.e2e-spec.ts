import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";

test("Fetch recent questions (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();

    prisma = module.get(PrismaService);
    jwt = module.get(JwtService);

    await app.init();
  });

  test("[GET] /questions", async () => {
    const user = await prisma.user.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 8)
    });

    const accessToken = jwt.sign({ sub: user.id });

    await prisma.question.createMany({
      data: [
        {
          title: "How to create a question?",
          content:
            "I am trying to create a question here, but I do not know how to do it.",
          authorId: user.id
        },
        {
          title: "How to create a question?",
          content:
            "I am trying to create a question here, but I do not know how to do it.",
          authorId: user.id
        },
        {
          title: "How to create a question?",
          content:
            "I am trying to create a question here, but I do not know how to do it.",
          authorId: user.id
        },
        {
          title: "How to create a question?",
          content:
            "I am trying to create a question here, but I do not know how to do it.",
          authorId: user.id
        },
        {
          title: "How to create a question?",
          content:
            "I am trying to create a question here, but I do not know how to do it.",
          authorId: user.id
        }
      ]
    });

    const response = await request(app.getHttpServer())
      .post("/questions")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "How to create a question?",
        content:
          "I am trying to create a question here, but I do not know how to do it."
      });

    expect(response.status).toBe(201);

    const questionOnDatabase = await prisma.user.findFirst({
      where: {
        title: "How to create a question?"
      }
    });

    expect(questionOnDatabase).toBeTruthy();
  });
});
