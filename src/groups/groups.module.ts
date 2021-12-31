import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { UsersModule } from '../users/users.module';
import { InMemoryGroupsService } from './storage/in-memory-groups.storage';

@Module({
  imports: [UsersModule],
  controllers: [GroupsController],
  providers: [
    GroupsService,
    {
      provide: 'GroupsStorage',
      useClass: InMemoryGroupsService,
    },
  ],
})
export class GroupsModule {}
