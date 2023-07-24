import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, updatedUser: User): Promise<User>;
    deleteUser(id: number): Promise<void>;
}
