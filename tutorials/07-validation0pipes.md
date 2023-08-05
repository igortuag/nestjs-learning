**Tutorial 7: Data Validation with Pipes and DTO Transformation**

In this tutorial, we will focus on data validation and data transformation in NestJS using Pipes and Data Transfer Objects (DTOs). Pipes help us validate and transform incoming data before it reaches our application's business logic, while DTOs provide a standardized way to define and handle data in our APIs.

### Step 1: Create a DTO for User Update

In the `user` folder, create a new file named `update-user.dto.ts`:

```typescript
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;
}
```

This DTO will be used to validate and transform data when updating a user's username.

### Step 2: Implement the UpdateUserDto in the UserController

In the `user.controller.ts`, use the `UpdateUserDto` for the `updateUser` method:

```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
```

### Step 3: Implement the Validation Pipe

In the `main.ts` file, add a validation pipe to the application:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe()); // Add the validation pipe
  await app.listen(3000);
}
bootstrap();
```

### Step 4: Test the Data Validation and Transformation

Start your NestJS application and use tools like Postman or curl to send requests for creating and updating users. Try different scenarios, including invalid data or missing fields, to see how the validation pipe handles the data. You should receive appropriate error responses for invalid data.

### Step 5: Implement DTO Transformation

You can also use the DTO to transform the incoming data before it reaches the business logic in the service. For example, you can add a method to the `UpdateUserDto` to perform any necessary transformations:

```typescript
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  transformToUserEntity() {
    const userEntity = new UserEntity();
    userEntity.username = this.username;
    return userEntity;
  }
}
```

Then, in the `user.service.ts`, update the `updateUser` method to use the DTO's transformation method:

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';
import { UserNotFoundException } from './user-not-found.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  async getUser(id: number) {
    const user = await this.userRepository.getUser(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.getUser(id);
    const userEntity = updateUserDto.transformToUserEntity();
    return this.userRepository.updateUser(user.id, userEntity);
  }

  async deleteUser(id: number) {
    const user = await this.getUser(id);
    return this.userRepository.deleteUser(user.id);
  }
}
```

This allows you to encapsulate the transformation logic within the DTO itself.

That's it! You have now implemented data validation and data transformation in your NestJS application using Pipes and Data Transfer Objects. By using DTOs and Pipes, you can ensure the incoming data is valid and properly formatted, leading to a more robust and reliable API.

_"With data validation and transformation, my NestJS application maintains data integrity and delivers a seamless user experience."_ 🚀