import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const user = this.create(createUserDto);
    return this.save(user);
  }

  async getUser(id: number) {
    return this.findOne(id);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.update(id, updateUserDto);
    return this.getUser(id);
  }

  async deleteUser(id: number) {
    const user = await this.getUser(id);
    return this.remove(user);
  }
}
