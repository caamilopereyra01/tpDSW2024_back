import {
  Entity,
  Property,
  ManyToMany,
  Cascade,
  ManyToOne,
  Rel,
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { TipoVolquete } from './tipovolquete.entity.js'

@Entity()
export class Volquete extends BaseEntity{
 
  @Property({ nullable: false })
  marca!: string
  @Property({ nullable: false })
  fecha_fabricacion!: Date
  @Property({ nullable: false })
  fecha_compra!: Date

  @ManyToOne(() => TipoVolquete, { nullable: false })
  volqueteTipoVolquete!: Rel<TipoVolquete>

}
