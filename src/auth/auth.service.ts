import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  create(userLoginDto: UserLoginDto) {
    return 'This action adds a new auth';
  }
}
