import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async validateUserById(userId: number) {
    // Implement your own logic to validate and retrieve a user by ID
    return this.userService.getUserById(userId);
  }
}