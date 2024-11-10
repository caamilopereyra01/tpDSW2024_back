import { 
    Entity,
    Property,
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'


@Entity()
export class User extends BaseEntity {
  @Property({ nullable: false, unique: true })
  nombre_usuario!: string;

  @Property({ nullable: false, unique: true })
  email?: string;

  @Property({ nullable: false })
  password!: string;

  @Property({ nullable: true })
  rol?: string;
}