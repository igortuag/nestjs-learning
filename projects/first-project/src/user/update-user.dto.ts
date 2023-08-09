import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  transformToUserEntity() {
    const userEntity = new UserEntity();
    userEntity.username = this.username;
    return userEntity;
  }
}