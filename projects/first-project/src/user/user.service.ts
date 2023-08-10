import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';
import { UserNotFoundException } from './user-not-found.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

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