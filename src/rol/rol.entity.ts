import { 
    Entity,
    ManyToMany,
    Property, 
    Cascade,
    OneToMany,
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { User } from '../user/user.entity.js'

@Entity()
export class Rol  extends BaseEntity {

    @Property({nullable: false, unique: true})
    descripcion!: string

    @OneToMany(() => User, (user) => user.rol)
    users!: User[]; // Relación One-to-Many: un rol tiene muchos usuarios
}
