import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupDto } from '../dto/group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { GroupsStorage } from '../interfaces/groups-storage.interface';
import { GroupsUsers } from '../interfaces/groups-users.interface';

@Injectable()
class InMemoryGroupsService implements GroupsStorage {
  private groups: GroupDto[] = [
    {
      id: 'be0df5b3-7bf0-42be-be41-26e6a6c49cd3',
      name: 'admin',
      permissions: ['READ', 'WRITE', 'DELETE'],
    },
    {
      id: '7f9573a0-037e-43b7-93d1-722187d5ffa0',
      name: 'student',
      permissions: ['READ', 'DELETE', 'UPLOAD_FILES'],
    },
    {
      id: 'b1307fdc-ffe1-4955-93ac-828faa5e42b7',
      name: 'mentor',
      permissions: ['SHARE', 'UPLOAD_FILES'],
    },
  ];

  private groups_users: GroupsUsers[] = [
    {
      groupId: 'be0df5b3-7bf0-42be-be41-26e6a6c49cd3',
      userIds: [
        'f62b11c0-690c-494e-9a75-9030314fea89',
        'a9b14031-956e-4a5d-98dc-de9d299d2fd9',
      ],
    },
  ];

  findById(id: string): GroupDto | undefined {
    return this.groups.find((user) => user.id === id);
  }

  create(createGroupDto: CreateGroupDto): GroupDto {
    const createdUser = {
      id: uuidv4(),
      ...createGroupDto,
    };
    this.groups = this.groups.concat([createdUser]);
    return createdUser;
  }

  update(updateGroupDto: UpdateGroupDto): GroupDto | undefined {
    const groupToUpdate = this.findById(updateGroupDto.id);
    const groups = this.groups.filter(
      (group) => group.id !== updateGroupDto.id,
    );
    if (groupToUpdate) {
      const updatedGroup = {
        ...groupToUpdate,
        ...updateGroupDto,
      };
      this.groups = groups.concat([updatedGroup]);
      return updatedGroup;
    }
  }

  delete(id: string): void {
    this.groups = this.groups.filter((group) => !(group.id === id));
  }

  findByName(name: string): GroupDto | undefined {
    const group = this.groups.filter((group) => group.name === name)[0];
    return group;
  }

  getAllGroups(): GroupDto[] | undefined {
    return this.groups;
  }

  addUsersToGroup(groupId: string, userIds: string[]): void | Promise<void> {
    this.groups_users.find((group) => group.groupId === groupId).userIds =
      userIds;
  }

  getUsersInGroup(groupId: string): string[] | [] {
    const userIds = this.groups_users.find(
      (group) => group.groupId === groupId,
    ).userIds;

    return userIds;
  }
}

export { InMemoryGroupsService };
