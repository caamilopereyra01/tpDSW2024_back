import { 
    Entity,
    OneToMany,
    Property, 
    Cascade,
    Collection,
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Volquete } from './volquete.entity.js'

@Entity()
export class TipoVolquete  extends BaseEntity {

    @Property({nullable: false, unique: true})
    descripcion_tipo_volquete!: string

    @OneToMany(() => Volquete, (volquete) => volquete.volqueteTipoVolquete, {
        cascade: [Cascade.ALL],
    })
    volquetes = new Collection<Volquete>(this)
     
}
