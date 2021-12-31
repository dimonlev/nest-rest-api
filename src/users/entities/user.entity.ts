import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  login: string;

  @Column('text')
  password: string;

  @Column('int4')
  age: number;

  @Column('boolean', { default: false })
  isdeleted: boolean;

  // @ManyToMany(() => GroupEntity, (group) => group.users)
  // group: GroupEntity;
}
