import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersService } from './storage/in-memory-users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UsersStorage',
      useClass: InMemoryUsersService,
    },
  ],
  exports: [
    UsersService,
    {
      provide: 'UsersStorage',
      useClass: InMemoryUsersService,
    },
  ],
})
export class UsersModule {}
