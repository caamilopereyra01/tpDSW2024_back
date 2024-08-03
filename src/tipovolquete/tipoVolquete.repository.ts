import { Repository } from '../shared/repository.js'
import { TipoVolquete } from './tipovolquete.entity.js'
import { pool } from '../shared/db/conn.mysql.js'

export class TipoVolqueteRepository implements Repository<TipoVolquete> {
  public async findAll(): Promise<TipoVolquete[] | undefined> {
    const [tipovolquete] =  await pool.query('select * from sysvol.TIPO_VOLQUETE')
    
    //Obtengo todos los volquetes los diferentes tipos de volquetes que existen:
    /*for( const TipoVolquete of tiposvolquetes as TipoVolquete[]){
      const [volquetes] = await pool.query('select nro_volquete,marca from sysvol.VOLQUETE where id_tipo_volquete=?',[tipovolquete.id])
    }
    TipoVolquete.volquetes = (volquetes as {nro_volquete:int}[]).map((volquete) => volquete.nro_volquete)
    */
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
