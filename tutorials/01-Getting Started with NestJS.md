**Tutorial 1: Getting Started with NestJS**

In this tutorial, we will introduce you to NestJS, a powerful framework for building efficient, scalable, and maintainable server-side applications using TypeScript. We'll guide you through setting up a new NestJS project, creating a basic module, controller, and service, and running your application.

### Step 1: Install Node.js and npm

Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from the official Node.js website: [https://nodejs.org](https://nodejs.org)

### Step 2: Install Nest CLI

The Nest CLI is a powerful command-line tool that helps you create and manage NestJS projects. Install it globally using the following command:

```bash
npm install -g @nestjs/cli
```

### Step 3: Create a New NestJS Project

1. Open your terminal and navigate to the directory where you want to create your project.

2. Run the following command to create a new NestJS project:

```bash
nest new my-nest-project
```

Replace `my-nest-project` with your preferred project name.

3. Follow the prompts to select a package manager (npm or yarn) and choose any additional settings you prefer.

### Step 4: Explore the Project Structure

After the project is created, navigate into the project directory:

```bash
cd my-nest-project
```

Here's a brief overview of the important files and folders in the project:

- `src/`: This is where your application code will reside.
- `src/main.ts`: The entry point of your application.
- `src/app.module.ts`: The root module of your application.
- `src/app.controller.ts`: The default controller created with the project.
- `src/app.service.ts`: The default service created with the project.

### Step 5: Create a Basic Module, Controller, and Service

1. Create a new module using the Nest CLI:

```bash
nest generate module cats
```

This will create a new module named `cats`.

2. Create a controller for the `cats` module:

```bash
nest generate controller cats
```

This will generate a controller named `cats` inside the `cats` module.

3. Inside the `cats` module folder (`src/cats/`), you'll find a controller file (`cats.controller.ts`). Open this file and define a basic route:

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

4. Create a service for the `cats` module:

```bash
nest generate service cats
```

This will generate a service named `cats` inside the `cats` module.

5. Inside the `cats` module folder (`src/cats/`), you'll find a service file (`cats.service.ts`). Open this file and define a basic service method:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  findAll(): string {
    return 'This action returns all cats from the service';
  }
}
```

### Step 6: Connecting Controller and Service

Open the `cats.controller.ts` file again (`src/cats/cats.controller.ts`). Import the `CatsService` and connect the controller to the service:

```typescript
import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): string {
    return this.catsService.findAll();
  }
}
```

### Step 7: Run Your NestJS Application

In your terminal, run the following command to start your NestJS application:

```bash
npm run start:dev
```

This command will start your application in development mode, watching for changes and automatically restarting the server.

### Step 8: Test Your Application

Open your web browser or a tool like Postman and navigate to `http://localhost:3000/cats`. You should see the response: "This action returns all cats from the service."

Congratulations! You've successfully set up your first NestJS project, created a basic module, controller, and service, and run your application.

_"With NestJS, building server-side applications has never been more enjoyable!"_ 🚀