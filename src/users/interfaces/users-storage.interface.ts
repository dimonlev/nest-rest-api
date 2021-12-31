import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { Options } from './options.interface';

interface UsersStorage {
  findById: (
    id: string,
  ) =>
    | UserDto
    | UserEntity
    | Promise<UserDto>
    | Promise<UserEntity>
    | undefined;
  findByLogin: (
    login: string,
  ) => UserDto | UserEntity | Promise<UserDto | UserEntity> | undefined;
  create: (
    user: CreateUserDto,
  ) => UserDto | UserEntity | Promise<UserDto | UserEntity> | undefined;
  update: (
    user: UpdateUserDto,
  ) => UserDto | UserEntity | Promise<UserDto | UserEntity> | undefined;
  delete: (id: string) => void | Promise<void>;
  getAutoSuggestUsers: (
    options: Options,
  ) => (UserDto | UserEntity | Promise<UserDto> | Promise<UserEntity>)[] | [];
}

export { UsersStorage };
