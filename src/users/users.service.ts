import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Options } from './interfaces/options.interface';
import { UsersStorage } from './interfaces/users-storage.interface';

@Injectable()
export class UsersService {
  constructor(@Inject('UsersStorage') private readonly storage: UsersStorage) {}
  create(createUserDto: CreateUserDto) {
    return this.storage.create(createUserDto);
  }

  findAll(options: Options) {
    return this.storage.getAutoSuggestUsers(options);
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  update(updateUserDto: UpdateUserDto) {
    return this.storage.update(updateUserDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}
