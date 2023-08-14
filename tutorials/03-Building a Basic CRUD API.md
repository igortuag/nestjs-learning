**Tutorial 3: Building a Basic CRUD API**

In this tutorial, we will extend our NestJS application to create a basic CRUD (Create, Read, Update, Delete) API for managing resources. We'll focus on implementing the core functionality for creating, retrieving, updating, and deleting data using NestJS controllers and services.

### Step 1: Recap

Before proceeding, make sure you have completed the previous tutorials and have a solid understanding of creating modules, controllers, and services in NestJS.

### Step 2: Create a New Module and Controller

1. Create a new module using the Nest CLI:

```bash
nest generate module tasks
```

2. Inside the `tasks` module folder (`src/tasks/`), generate a controller:

```bash
nest generate controller tasks
```

### Step 3: Implementing CRUD Operations

1. In the `tasks.controller.ts` file (`src/tasks/tasks.controller.ts`), define routes for CRUD operations using decorators:

```typescript
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
```

### Step 4: Implementing Services

1. Create DTOs (Data Transfer Objects) for creating and updating tasks:

```bash
nest generate class tasks/dto/create-task.dto
nest generate class tasks/dto/update-task.dto
```

2. Inside the `tasks.service.ts` file (`src/tasks/tasks.service.ts`), implement the core CRUD functionality using methods like `create`, `findAll`, `findOne`, `update`, and `remove`.

### Step 5: Connecting Modules

1. Open the `tasks.module.ts` file (`src/tasks/tasks.module.ts`). Import the `TasksController` and `TasksService` and connect them to the module:

```typescript
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
```

2. Include the `TasksModule` in the `app.module.ts` file.

### Step 6: Run and Test Your Application

1. In your terminal, run the following command to start your NestJS application:

```bash
npm run start:dev
```

2. Use tools like Postman or API testing platforms to perform CRUD operations on the `tasks` endpoint (`http://localhost:3000/tasks`).

### Step 7: Further Exploration

- Enhance your CRUD API by implementing pagination, filtering, and sorting mechanisms.
- Integrate authentication and authorization to secure your API.
- Explore more advanced features of NestJS, such as GraphQL integration, WebSocket support, and microservices.

_"With a solid CRUD API in place, my NestJS application becomes a powerful backend for various client applications."_ 🚀