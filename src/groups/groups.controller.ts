import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    const group = await this.groupsService.create(createGroupDto);
    return group;
  }

  @Get()
  async findAll() {
    const groups = await this.groupsService.findAll();
    return groups;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const groups = await this.groupsService.findOne(id);
    return groups;
  }

  @Patch(':id')
  async update(@Body() updateGroupDto: UpdateGroupDto) {
    const group = await this.groupsService.update(updateGroupDto);
    return group;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.groupsService.remove(id);
  }

  @Post(':id/addusers')
  async addUsersToGroup(@Param('id') id: string, @Body() usersIds: string[]) {
    const group = await this.groupsService.addUsersToGroup(id, usersIds);
    return group;
  }

  @Get(':id/getusers')
  async findUsersByGroup(@Param('id') id: string) {
    const users = await this.groupsService.findUsersByGroup(id);
    return users;
  }
}
