## Tutorial: Implementing Authentication with NestJS and Passport

In this tutorial, we will explore how to implement authentication in a NestJS application using the popular authentication middleware Passport and a JWT (JSON Web Tokens) strategy.

### Step 1: Install Dependencies

1. Open a terminal and navigate to your project directory.
2. Run the following command to install the necessary dependencies:

```bash
npm install @nestjs/passport passport passport-jwt
```

### Step 2: Configure Passport and JWT Strategy

1. Create a new file named `jwt.strategy.ts` in a new folder called `auth`.
2. In the `jwt.strategy.ts` file, add the following code:

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your-secret-key', // Replace with your own secret key
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

3. Create a new file named `auth.service.ts` in the `auth` folder.
4. In the `auth.service.ts` file, add the following code:

```typescript
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUserById(userId: number) {
    // Implement your own logic to validate and retrieve a user by ID
    return this.userService.getUserById(userId);
  }
}
```

### Step 3: Update the User Module

1. Open the `user.module.ts` file in the `src/user` directory.
2. Import the `PassportModule` and the `JwtStrategy`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, AuthService],
})
export class UserModule {}
```

3. Update the `getUserById()` method in the `UserService` to include the user's ID in the returned user object:

```typescript
async getUserById(id: number): Promise<User> {
  const options: FindOneOptions<User> = { where: { id } };
  const user = await this.userRepository.findOne(options);
  if (user) {
    delete user.password; // Remove the password from the returned user object
  }
  return user;
}
```

### Step 4: Create an Authentication Controller

1. Create a new folder named `auth` in the `src` directory.
2. Inside the `auth` folder, create a new file named `auth.controller.ts`.
3. In the `auth.controller.ts` file, add the following code:

```typescript
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
```

4. Create a new file named `local-auth.guard.ts` in the `auth` folder.
5. In the `local-auth.guard.ts` file, add the following code:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```

6. Create a new file named `jwt-auth.guard.ts` in the `auth` folder.
7. In the `jwt-auth.guard.ts` file, add the following code:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### Step 5: Update the App Module

1. Open the `app.module.ts` file in the root directory of your project.
2. Import the `AuthModule`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Your database configuration
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

### Step 6: Test the Authentication

1. Start your NestJS application if it's not already running.
2. Use an API testing tool like Postman or cURL to test the authentication endpoints:

- **POST** `http://localhost:3000/auth/login` - Authenticate a user and retrieve a JWT token. Pass the credentials (e.g., username and password) in the request body.
- **POST** `http://localhost:3000/auth/profile` - Retrieve the authenticated user's profile by providing the JWT token in the request header as a bearer token.

Congratulations! You have successfully implemented authentication in your NestJS application using Passport and JWT.