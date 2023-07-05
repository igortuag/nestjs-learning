## Tutorial: Creating a Database Connection in NestJS

In this tutorial, we will learn how to establish a database connection in a NestJS application using TypeORM, a popular Object-Relational Mapping (ORM) library.

### Step 1: Install TypeORM and Required Dependencies

1. Open your terminal or command prompt.
2. Navigate to your NestJS project directory.
3. Run the following command to install TypeORM and the required dependencies:

```bash
npm install typeorm @nestjs/typeorm pg
```

This will install TypeORM, the official TypeORM adapter for PostgreSQL (`pg`), and the `@nestjs/typeorm` module that integrates TypeORM with NestJS.

### Step 2: Configure the Database Connection

1. Open the `app.module.ts` file.
2. Import the necessary modules:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
```

3. Define the database connection configuration:

```typescript
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database_name',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

Replace the `your_username`, `your_password`, and `your_database_name` placeholders with your actual database credentials.

The `autoLoadEntities` option enables automatic entity discovery based on the file system. The `synchronize` option automatically creates database tables and updates the schema on application launch. **Note:** Be cautious when using `synchronize` in a production environment.

### Step 3: Create a Sample Entity

1. Create a new file named `user.entity.ts` in a suitable directory (e.g., `src/user`).
2. Define a sample entity class:

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

### Step 4: Use the Entity in a Service or Controller

1. Open an existing or create a new service or controller file.
2. Import the necessary modules and the `User` entity:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';
```

3. Use the `User` entity in your service or controller:

```typescript
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
```

### Step 5: Test the Database Connection

1. Start your NestJS application if it's not already running.
2. Use the `getUsers` method (or a similar method) from your service or controller to fetch data from the database.

Congratulations! You have successfully set up a database connection using TypeORM in your NestJS application. You can now interact with the database through entities, repositories, and query builders provided by TypeORM.

### Next Steps

- Explore TypeORM's documentation to learn more about advanced database operations, entity relationships, and migrations: [https://typeorm.io](https://typeorm.io)
- Experiment with different database connections and configurations.
- Implement CRUD operations using TypeORM entities and repositories.
-