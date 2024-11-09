import { 
    Entity,
    Property,
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'


@Entity()
export class User  extends BaseEntity {

    @Property({nullable: false, unique: true})
    nombre_usuario!: string

    @Property({ nullable: false })
    contraseña!: string

    @Property({ nullable: true })
    rol?: string

}