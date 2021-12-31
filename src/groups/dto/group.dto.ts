import { Permission } from '../interfaces/permission.interface';

export class GroupDto {
  id: string;
  name: string;
  permissions: Array<Permission>;
}
