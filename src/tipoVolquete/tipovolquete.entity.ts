import {
  Entity,
  Cascade,
  Collection,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Volquete } from '../volquete/volquete.entity.js'

@Entity()
export class TipoVolquete  extends BaseEntity {

    @Property({nullable: false, unique: true})
    descripcion_tipo_volquete!: string

    @OneToMany(() => Volquete, (volquete) => volquete.tipoVolquete, {
        cascade: [Cascade.ALL],
    })
    volquetes = new Collection<Volquete>(this)
     
}
