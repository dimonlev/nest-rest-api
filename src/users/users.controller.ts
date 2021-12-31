import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from './errors/user-not-found.error';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get()
  async findAll(
    @Query()
    query: {
      loginSubstring: string | undefined;
      limit: string | undefined;
    },
  ) {
    const sortedArray = await this.usersService.findAll(query);
    return sortedArray.length ? sortedArray : "still don't have users";
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (user) {
      return user;
    } else {
      throw new UserNotFoundException();
    }
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(updateUserDto);
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
function throwUserNotFoundException() {
  throw new Error('Function not implemented.');
}
