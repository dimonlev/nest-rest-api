import { CreateUserDto } from './create-user.dto';

export class UserDto {
  id: string;
  login: string;
  password: string;
  age: number;
  isdeleted: boolean;
}
