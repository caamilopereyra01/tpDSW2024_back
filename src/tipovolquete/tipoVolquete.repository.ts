import { Repository } from '../shared/repository.js'
import { TipoVolquete } from './tipovolquete.entity.js'
import { pool } from '../shared/db/conn.mysql.js'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

export class TipoVolqueteRepository implements Repository<TipoVolquete> {

  /* ---------------------------------- FIND ALL ----------------------------------*/
  public async findAll(): Promise<TipoVolquete[] | undefined> {
    const [tipovolquete] =  await pool.query('select * from sysvol.TIPO_VOLQUETE')
    
   
    /*no aplica en este caso, pero en caso de tener un atributo multivaluado lo puedo mapear de la siguiente manera, a sabiendas
    que un Character puede tener varios items:
    */
  
    /* 
    for (const character of characters as Character[]) {
      const [items] = await pool.query('select itemName from characterItems where characterId = ?', [character.id])
      character.items = (items as { itemName: string }[]).map((item) => item.itemName)
    }
    */
    return tipovolquete as TipoVolquete[]
  }


  /* ---------------------------------- FIND ONE ----------------------------------*/
  public async findOne(tipvol: { id: string }): Promise<TipoVolquete | undefined> {
    const id = Number.parseInt(tipvol.id)
    const [tipovolquetes] =  await pool.query<RowDataPacket[]>('select * from sysvol.TIPO_VOLQUETE where id_tipo_volquete = ?',[id])
    if(tipovolquetes.length === 0){
      return undefined
    }
    const tipovolquete = tipovolquetes[0] as TipoVolquete
   
    /*no aplica en este caso, pero en caso de tener un atributo multivaluado lo puedo mapear de la siguiente manera, a sabiendas
    que un Character puede tener varios items:
    */
    /*const[item] = await pool.query('select itemName from characterItems where characterId=?',[character.id])
    character.items = (items as {itemName:String}[]).map((item)=> item.itemName)
    */
    return tipovolquete 
  }


    /* ---------------------------------- ADD ----------------------------------*/

  public async add(tipovolqueteInput: TipoVolquete): Promise<TipoVolquete | undefined> {
    const { id_tipo_volquete, ...tipovolqueteRow } = tipovolqueteInput
    const [result] = await pool.query<ResultSetHeader>('insert into TIPO_VOLQUETE set ?', [tipovolqueteRow])
    tipovolqueteInput.id_tipo_volquete = result.insertId
    
    /*no aplica en este caso, pero en caso de tener un atributo multivaluado lo puedo insertar en conjunto con el character
    de la siguiente manera, a sabiendas que un Character puede tener varios items:
    */
    /*for (const item of items) {
      await pool.query('insert into characterItems set ?', { characterId: characterInput.id, itemName: item })
    }*/

    return tipovolqueteInput
  }



    /* ---------------------------------- UPDATE ----------------------------------*/
  public async update(id: string, tipovolqueteInput: TipoVolquete): Promise<TipoVolquete | undefined>{
    throw new Error('not implemented')
     
  }


      /* ---------------------------------- DELETE ----------------------------------*/
  public async delete(item: { id: string }): Promise<TipoVolquete | undefined> {
    throw new Error('not implemented')
  }


}
