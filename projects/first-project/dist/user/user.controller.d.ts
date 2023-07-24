import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, updatedUser: User): Promise<User>;
    deleteUser(id: number): Promise<void>;
}
