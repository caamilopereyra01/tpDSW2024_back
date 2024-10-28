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
 
  @Property({ nullable: true })
  marca?: string
  @Property({ nullable: true })
  fecha_fabricacion?: Date
  @Property({ nullable: true })
  fecha_compra?: Date

  @ManyToOne(() => TipoVolquete, { nullable: false })
  TipoVolquete!: Rel<TipoVolquete>

  @ManyToMany(() => Cliente, (cliente) => cliente.volquetes)
  clientes = new Collection<Cliente>(this)
}
