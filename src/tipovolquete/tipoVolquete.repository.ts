import { Repository } from '../shared/repository.js'
import { TipoVolquete } from './tipovolquete.entity.js'
import { pool } from '../shared/db/conn.mysql.js'

export class TipoVolqueteRepository implements Repository<TipoVolquete> {
  public async findAll(): Promise<TipoVolquete[] | undefined> {
    const [tipovolquete] =  await pool.query('select * from sysvol.TIPO_VOLQUETE')
    return tipovolquete as TipoVolquete[]
  }

  public async findOne(item: { id: string }): Promise<TipoVolquete | undefined> {
    throw new Error('not implemented')
  }

  public async add(item: TipoVolquete): Promise<TipoVolquete | undefined> {
    throw new Error('not implemented')
  }

  public async update(id: string, tipovolqueteInput: TipoVolquete): Promise<TipoVolquete | undefined>{
    throw new Error('not implemented')
     
  }

  public async delete(item: { id: string }): Promise<TipoVolquete | undefined> {
    throw new Error('not implemented')
  }


}
