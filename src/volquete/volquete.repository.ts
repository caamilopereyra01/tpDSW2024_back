import { Repository } from '../shared/repository.js'
import { Volquete } from './volquete.entity.js'
import { pool } from '../shared/db/conn.mysql.js'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

export class VolqueteRepository implements Repository<Volquete> {

  /* ---------------------------------- FIND ALL ----------------------------------*/
  public async findAll(): Promise<Volquete[] | undefined> {
    const [volquete] =  await pool.query('select * from sysvol.VOLQUETE')
    
   
    /*no aplica en este caso, pero en caso de tener un atributo multivaluado lo puedo mapear de la siguiente manera, a sabiendas
    que un Character puede tener varios items:
    */
  
    /* 
    for (const character of characters as Character[]) {
      const [items] = await pool.query('select itemName from characterItems where characterId = ?', [character.id])
      character.items = (items as { itemName: string }[]).map((item) => item.itemName)
    }
    */
    return volquete as Volquete[]
  }


  /* ---------------------------------- FIND ONE ----------------------------------*/
  public async findOne(vol: { id: string }): Promise<Volquete | undefined> {
    const id = Number.parseInt(vol.id)
    const [volquetes] =  await pool.query<RowDataPacket[]>('select * from sysvol.VOLQUETE where nro_volquete = ?',[id])
    if(volquetes.length === 0){
      return undefined
    }
    const volquete = volquetes[0] as Volquete
   
    /*no aplica en este caso, pero en caso de tener un atributo multivaluado lo puedo mapear de la siguiente manera, a sabiendas
    que un Character puede tener varios items:
    */
    /*const[item] = await pool.query('select itemName from characterItems where characterId=?',[character.id])
    character.items = (items as {itemName:String}[]).map((item)=> item.itemName)
    */
    return volquete 
  }


    /* ---------------------------------- ADD ----------------------------------*/

  public async add(volqueteInput: Volquete): Promise<Volquete | undefined> {
    const { nro_volquete, ...volqueteRow } = volqueteInput
    const [result] = await pool.query<ResultSetHeader>('insert into sysvol.VOLQUETE set ?', [volqueteRow])
    volqueteInput.nro_volquete = result.insertId
    
    /*no aplica en este caso, pero en caso de tener un atributo multivaluado lo puedo insertar en conjunto con el character
    de la siguiente manera, a sabiendas que un Character puede tener varios items:
    */
    /*for (const item of items) {
      await pool.query('insert into characterItems set ?', { characterId: characterInput.id, itemName: item })
    }*/

    return volqueteInput
  }



    /* ---------------------------------- UPDATE ----------------------------------*/
  public async update(id: string, volqueteInput: Volquete): Promise<Volquete | undefined> {
     
    const volqueteId = Number.parseInt(id)
    const {  ...volqueteRow } = volqueteInput
    await pool.query('update sysvol.VOLQUETE set ? where nro_volquete = ?', [volqueteRow, volqueteId])
/*
    await pool.query('delete from characterItems where characterId = ?', [characterId])

    if (items?.length > 0) {
      for (const itemName of items) {
        await pool.query('insert into characterItems set ?', { characterId, itemName })
      }
    }
    */
    return await this.findOne({ id })
  }
      /* ---------------------------------- DELETE ----------------------------------*/

  public async delete(vol: { id: string }): Promise<Volquete | undefined> {
    try {
      const volqueteToDelete = await this.findOne(vol)
      const volqueteId = Number.parseInt(vol.id)
      await pool.query('delete from sysvol.TIPO_VOLQUETE where id_tipo_volquete = ?', volqueteId)
      return volqueteToDelete
    } catch (error: any) {
      throw new Error('unable to delete volquete')
    }
  }

}
