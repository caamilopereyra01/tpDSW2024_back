import { 
    Entity,
    ManyToMany,
    Property, 
    Cascade,
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Volquete } from '../volquete/volquete.entity.js'

@Entity()
export class Cliente  extends BaseEntity {

    @Property({nullable: false, unique: true})
    nombre!: string

    @Property({ nullable: false })
    apellido!: string

    @Property({ nullable: false })
    telefono!: string

    @Property({ nullable: false })
    direccion!: string

    @ManyToMany(() => Volquete, (volquete) => volquete.clientes , {
        cascade: [Cascade.ALL],
        owner: true,
      })
      volquetes!: Volquete[]
}
