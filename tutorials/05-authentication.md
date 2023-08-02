**Tutorial 5: Adding Authentication and Authorization**

In this tutorial, we will enhance our NestJS application by adding authentication and authorization to secure our API endpoints. We'll use JWT (JSON Web Tokens) for authentication and create custom decorators for authorization.

### Step 1: Install Required Packages

First, let's install the necessary packages for authentication and authorization:

```bash
npm install @nestjs/jwt passport passport-jwt
```

### Step 2: Configure JWT Module

In the `app.module.ts`, import and configure the `JwtModule`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Import the JwtModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { HelloService } from './hello/hello.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      // Your TypeORM configuration
    }),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [AppController, HelloController, UserController],
  providers: [AppService, HelloService, UserService],
})
export class AppModule {}
```

Replace `'your-secret-key'` with your desired secret key. It's recommended to store this key securely and not hardcode it in the codebase.

### Step 3: Create an Auth Service

In a new file `auth.service.ts`, create the AuthService:

```typescript
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: User): Promise<string> {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.signAsync(payload);
  }
}
```

The `generateJwtToken` method generates a JWT token based on the user's information. We'll use this token for authentication.

### Step 4: Create a Local Strategy

In a new file `local.strategy.ts`, create a local strategy for passport authentication:

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      usernameField: 'email', // Specify the field used for the username (in our case, it's the email)
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
```

### Step 5: Update User Entity

In the `user.entity.ts`, add a method to compare the password hash:

```typescript
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
```

The `hashPassword` method will automatically hash the password before inserting a new user into the database.

### Step 6: Create an Auth Controller

In a new file `auth.controller.ts`, create the AuthController:

```typescript
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateJwtToken(req.user);
  }
}
```

The `login` method in the AuthController uses the `LocalAuthGuard` to authenticate the user using the local strategy we created earlier and generates a JWT token using the `AuthService`.

### Step 7: Create a Local Auth Guard

In a new file `local-auth.guard.ts`, create the LocalAuthGuard:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```

### Step 8: Protect Routes with AuthGuard

Update the `user.controller.ts` to protect the routes with the `AuthGuard`:

```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import JwtAuthGuard

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protect the route with JwtAuthGuard
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // Protect the route with JwtAuthGuard
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protect the route with JwtAuthGuard
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
```

### Step 9: Create a JWT Auth Guard

In a new file `jwt-auth.guard.ts`, create the JwtAuthGuard:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### Step 10: Update App Controller

In the `app.controller.ts`, add a protected route that requires authentication:

```typescript
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import JwtAuthGuard

@Controller()
export class