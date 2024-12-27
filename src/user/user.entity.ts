import { 
    Entity,
    Property,
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

@Entity()
export class User extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombre_usuario!: string;

  @Property({ unique: true })
  email: string | undefined;

  @Property({ nullable: false })
  password!: string;

  @Property({ nullable: true })
  //rol?: string;
  rol?: UserRole;
}