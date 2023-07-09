## Tutorial: Implementing CRUD Operations with TypeORM

In this tutorial, we will explore how to implement CRUD (Create, Read, Update, Delete) operations using TypeORM in a NestJS application.

### Step 1: Create a new Entity

1. Open the file `user.entity.ts` in the `src/user` directory.
2. Add properties and decorators to define the columns of the `User` entity. For example:

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
```

### Step 2: Create a Repository

1. Create a new file named `user.repository.ts` in the `src/user` directory.
2. Import the necessary modules:

```typescript
import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
```

### Step 3: Use the Repository in a Service

1. Open the file `user.service.ts` in the `src/user` directory.
2. Import the necessary modules and the `UserRepository`:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
```

3. Use the `UserRepository` in your service:

```typescript
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const options: FindOneOptions<User> = { where: { id } };
    return this.userRepository.findOne(options);
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async updateUser(id: number, updatedUser: User): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      // Handle user not found error
    }
    const updated = { ...user, ...updatedUser };
    return this.userRepository.save(updated);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
```

### Step 4: Use the Service in a Controller

1. Open the file `user.controller.ts` in the `src/user` directory.
2. Import the necessary modules and the `UserService`:

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
```

3. Use the `UserService` in your controller:

```typescript
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updatedUser: User): Promise<User> {
    return this.userService.updateUser(id, updatedUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
```

### Step 5: Register the Service and Controller

1. Open the file `user.module.ts` in the `src/user` directory.
2. Import the necessary modules and the `UserController` and `UserService`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

### Step 6: Test the CRUD Operations

1. Start your NestJS application if it's not already running.
2. Use an API testing tool like Postman or cURL to test the CRUD operations:

- **GET** `http://localhost:3000/users` - Retrieve all users.
- **GET** `http://localhost:3000/users/{id}` - Retrieve a user by ID.
- **POST** `http://localhost:3000/users` - Create a new user. Pass the user data in the request body.
- **PUT** `http://localhost:3000/users/{id}` - Update a user by ID. Pass the updated user data in the request body.
- **DELETE** `http://localhost:3000/users/{id}` - Delete a user by ID.

Congratulations! You have successfully implemented CRUD operations using TypeORM in your NestJS application. You can now perform basic database operations on the `User` entity.

### Next Steps

- Explore more advanced features of TypeORM, such as entity relationships and complex queries.
- Implement validation and error handling for your API endpoints.
- Add authentication and authorization to protect your endpoints.
- Experiment with additional entities and relationships.

Feel free to customize and expand upon this tutorial to suit the needs of your application. Happy coding with NestJS and TypeORM!