import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const options: FindOneOptions<User> = { where: { id } };
    const user = await this.userRepository.findOne(options);
    if (user) {
      delete user.password; // Remove the password from the returned user object
    }
    return user;
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