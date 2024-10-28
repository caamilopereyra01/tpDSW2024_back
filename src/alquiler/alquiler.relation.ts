import { 
    Entity,
    ManyToOne,
    Property, 
    Cascade,
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Cliente } from '../cliente/cliente.entity.js';
import { Volquete } from '../volquete/volquete.entity.js';

@Entity()
export class Alquiler  extends BaseEntity {

  @ManyToOne(() => Volquete, { nullable: false })
  volquete!: Volquete;

  @ManyToOne(() => Cliente, { nullable: false })
  cliente!: Cliente;

  @Property({ nullable: false })
  fechaDesde!: Date;

  @Property({ nullable: true })
  fechaHasta?: Date;

  @Property({ nullable: true })
  fechaHrEntrega?: Date;

  @Property({ nullable: true })
  fechaHrRetiro?: Date;

  @Property({ nullable: true })
  estadoAlquiler?: string;
}
