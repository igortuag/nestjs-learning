**Tutorial 5: Adding Validation to API**

In this tutorial, we will enhance our NestJS application by adding validation to the API endpoints. We'll use the built-in validation pipes provided by NestJS to validate incoming data, ensuring its correctness before processing.

### Step 1: Recap

Before proceeding, make sure you have completed the previous tutorials and are familiar with creating modules, controllers, services, and integrating data persistence with TypeORM.

### Step 2: Implementing Validation Pipes

1. Open the `main.ts` file (`src/main.ts`). Import and use the `ValidationPipe` provided by NestJS to enable automatic data validation for all incoming requests:

```typescript
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply validation pipe globally
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
```

### Step 3: Adding Validation to DTOs

1. Open the DTO files (`src/tasks/dto/create-task.dto.ts` and `src/tasks/dto/update-task.dto.ts`). Add decorators from the `class-validator` package to specify validation rules for each property.

### Step 4: Run and Test Your Application

1. In your terminal, run the following command to start your NestJS application:

```bash
npm run start:dev
```

2. Use your API testing tools to send requests with invalid data to the endpoints and observe how the validation pipes automatically reject invalid requests.

### Step 5: Further Exploration

- Explore more advanced validation techniques, such as custom validation decorators and async validation.
- Integrate error handling mechanisms to provide meaningful error responses to clients.
- Consider implementing exception filters to handle validation-related errors and return consistent responses.

_"With validation pipes, my NestJS API ensures data integrity and rejects invalid requests."_ 🚀