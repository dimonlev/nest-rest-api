import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsStorage } from './interfaces/groups-storage.interface';

@Injectable()
export class GroupsService {
  constructor(
    @Inject('GroupsStorage') private groupsService: GroupsStorage,
    private usersService: UsersService,
  ) {}
  create(createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  findAll() {
    return this.groupsService.getAllGroups();
  }

  findOne(id: string) {
    return this.groupsService.findById(id);
  }

  update(updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(updateGroupDto);
  }

  remove(id: string) {
    return this.groupsService.delete(id);
  }

  addUsersToGroup(groupId: string, userIds: string[]) {
    this.groupsService.addUsersToGroup(groupId, userIds);
  }

  async findUsersByGroup(id: string): Promise<any> {
    const userIds = await this.groupsService.getUsersInGroup(id);
    const users = userIds.map((userId: string) =>
      this.usersService.findOne(userId),
    );
    return users;
  }
}
