import {
  Entity,
  Collection,
  Property,
  ManyToMany,
  ManyToOne,
  Rel,
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { TipoVolquete } from './tipovolquete.entity.js'
import { Cliente } from '../cliente/cliente.entity.js'

@Entity()
export class Volquete extends BaseEntity{
 
  @Property({ nullable: false })
  marca!: string
  @Property({ nullable: false })
  fecha_fabricacion!: Date
  @Property({ nullable: false })
  fecha_compra!: Date

  @ManyToOne(() => TipoVolquete, { nullable: false })
  TipoVolquete!: Rel<TipoVolquete>

  @ManyToMany(() => Cliente, (cliente) => cliente.volquetes)
  clientes = new Collection<Cliente>(this)
}
