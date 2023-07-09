import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) { }

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