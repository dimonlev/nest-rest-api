import { UserDto } from 'src/users/dto/user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupDto } from '../dto/group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

interface GroupsStorage {
  findById: (id: string) => GroupDto | Promise<GroupDto | undefined>;
  findByName: (name: string) => GroupDto | Promise<GroupDto | undefined>;
  getAllGroups: () => GroupDto[] | Promise<GroupDto[] | undefined>;
  create: (group: CreateGroupDto) => GroupDto | Promise<GroupDto | undefined>;
  update: (group: UpdateGroupDto) => GroupDto | Promise<GroupDto | undefined>;
  delete: (id: string) => void | Promise<void>;
  addUsersToGroup: (groupId: string, userIds: string[]) => void | Promise<void>;
  getUsersInGroup: (groupId: string) => string[] | [];
}
export { GroupsStorage };
