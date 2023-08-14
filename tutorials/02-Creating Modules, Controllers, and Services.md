**Tutorial 2: Creating Modules, Controllers, and Services**

In this tutorial, we will continue building on the foundation laid in the first tutorial. We will learn how to create multiple modules, add controllers and services to them, and establish connections between different components within the modules.

### Step 1: Recap

Before proceeding, make sure you have completed the first tutorial and have a basic understanding of modules, controllers, and services in NestJS.

### Step 2: Creating a Second Module

1. Create a new module using the Nest CLI:

```bash
nest generate module dogs
```

2. This will create a new module named `dogs`. Inside the `dogs` module folder (`src/dogs/`), you'll find a `dogs.module.ts` file. Open this file and explore its structure.

### Step 3: Adding Controller and Service to the Dogs Module

1. Generate a controller for the `dogs` module:

```bash
nest generate controller dogs
```

2. Inside the `dogs` module folder (`src/dogs/`), open the `dogs.controller.ts` file. Define a basic route similar to what we did in the previous tutorial.

3. Generate a service for the `dogs` module:

```bash
nest generate service dogs
```

4. Inside the `dogs` module folder (`src/dogs/`), open the `dogs.service.ts` file. Define a basic service method similar to what we did in the previous tutorial.

### Step 4: Connecting Dogs Controller and Service

In the `dogs.controller.ts` file (`src/dogs/dogs.controller.ts`), import the `DogsService` and connect the controller to the service:

```typescript
import { Controller, Get } from '@nestjs/common';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  findAll(): string {
    return this.dogsService.findAll();
  }
}
```

### Step 5: Using Multiple Modules

1. Open the `app.module.ts` file (`src/app.module.ts`). Import the `CatsModule` and `DogsModule` and include them in the `imports` array:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [CatsModule, DogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Step 6: Run and Test Your Application

1. In your terminal, run the following command to start your NestJS application:

```bash
npm run start:dev
```

2. Open your web browser or a tool like Postman and navigate to `http://localhost:3000/cats` and `http://localhost:3000/dogs`. You should see responses from both the `cats` and `dogs` controllers.

### Step 7: Further Exploration

Experiment with creating more modules, controllers, and services. Connect them and observe how NestJS handles the relationships between different components. This modular approach will help you keep your codebase organized and maintainable as your application grows.

_"With NestJS, building complex applications becomes a structured and scalable endeavor."_ 🚀