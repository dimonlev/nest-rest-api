import { Permission } from '../interfaces/permission.interface';

export class CreateGroupDto {
  name: string;
  permissions: Array<Permission>;
}
