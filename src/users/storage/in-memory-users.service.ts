import { UsersStorage } from '../interfaces/users-storage.interface';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { Options } from '../interfaces/options.interface';

const LIMIT_DEFAULT = 10;

@Injectable()
class InMemoryUsersService implements UsersStorage {
  users: UserDto[] = [
    {
      id: 'f62b11c0-690c-494e-9a75-9030314fea89',
      login: 'Pasha1',
      password: 'password123',
      age: 23,
      isdeleted: false,
    },
    {
      id: 'a9b14031-956e-4a5d-98dc-de9d299d2fd9',
      login: 'Masha1',
      password: 'password123',
      age: 26,
      isdeleted: false,
    },
    {
      id: 'd59164d5-210a-49b9-a61f-9225a95e5531',
      login: 'Sasha1',
      password: 'password123',
      age: 35,
      isdeleted: false,
    },
    {
      id: 'eab26f50-873d-4d84-b63d-78db129d3ca8',
      login: 'Grisha1',
      password: 'password123',
      age: 47,
      isdeleted: false,
    },
  ];

  public findById(id: string): UserDto | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByLogin(login: string): UserDto | undefined {
    return this.users.find((user) => user.login === login);
  }

  create(createUserDto: CreateUserDto): UserDto {
    const createdUser = {
      id: uuidv4(),
      ...createUserDto,
      isdeleted: false,
    };
    this.users = this.users.concat([createdUser]);
    return createdUser;
  }

  update(updateUserDto: UpdateUserDto): UserDto | undefined {
    const userToUpdate = this.findById(updateUserDto.id);
    const users = this.users.filter((user) => user.id !== updateUserDto.id);
    if (userToUpdate) {
      const updatedUser = {
        ...userToUpdate,
        ...updateUserDto,
      };
      this.users = users.concat([updatedUser]);
      return updatedUser;
    }
  }

  delete(id: string): void {
    const user = this.findById(id);
    if (user) {
      user.isdeleted = true;
    }
  }

  getAutoSuggestUsers(options: Options): UserDto[] {
    const { loginSubstring, limit } = options;
    let sortedArray: UserDto[] = [];
    if (!loginSubstring) {
      sortedArray = this.users
        .slice()
        .filter((user) => user.isdeleted === false);
    } else {
      this.users.forEach((user) => {
        const regex = new RegExp(`${loginSubstring}`);
        if (user.isdeleted === false && regex.test(user.login)) {
          sortedArray.push(user);
        }
      });
    }

    const final = sortedArray
      .sort((a, b) => (a.login > b.login ? 1 : -1))
      .filter((user, index) => index < (limit ? limit : LIMIT_DEFAULT));
    return final;
  }
}

export { InMemoryUsersService };
