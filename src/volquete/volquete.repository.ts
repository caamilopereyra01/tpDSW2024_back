import { Repository } from '../shared/repository.js'
import { Volquete } from './volquete.entity.js'
import { pool } from '../shared/db/conn.mysql.js'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { TipoVolquete } from '../tipovolquete/tipovolquete.entity.js';

export class VolqueteRepository implements Repository<Volquete> {

  /* ---------------------------------- FIND ALL ----------------------------------*/
  public async findAll(): Promise<Volquete[] | undefined> {
    const [rows] = await pool.query(
      `SELECT 
         v.nro_volquete,
         v.marca, 
         v.fecha_fabricacion, 
         v.fecha_compra, 
         v.id_tipo_volquete,
         tv.id_tipo_volquete AS id_tipo_volquete, 
         tv.descripcion_tipo_volquete AS descripcion_tipo_volquete
       FROM VOLQUETE v
       JOIN TIPO_VOLQUETE tv ON v.id_tipo_volquete = tv.id_tipo_volquete`
    );

    // Mapear los resultados para construir el objeto Volquete
    const volquetes = (rows as any[]).map(row => {
      const tipoVolquete: TipoVolquete = {
        id_tipo_volquete: row.id_tipo_volquete,
        descripcion_tipo_volquete: row.descripcion_tipo_volquete
      };

      const volquete: Volquete = {
        marca: row.marca,
        fecha_fabricacion: row.fecha_fabricacion,
        fecha_compra: row.fecha_compra,
        id_tipo_volquete: row.id_tipo_volquete,
        tipo_volquete: tipoVolquete,
        nro_volquete: row.nro_volquete 
      };

      return volquete;
    });

    return volquetes;
  }


  /* ---------------------------------- FIND ONE ----------------------------------*/
  public async findOne(vol: { id: string }): Promise<Volquete | undefined> {
    const id = Number.parseInt(vol.id)
    const [volquetes] =  await pool.query<RowDataPacket[]>('select * from VOLQUETE where nro_volquete = ?',[id])
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
    const [result] = await pool.query<ResultSetHeader>('insert into VOLQUETE set ?', [volqueteRow])
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
    await pool.query('update VOLQUETE set ? where nro_volquete = ?', [volqueteRow, volqueteId])
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
      await pool.query('delete from TIPO_VOLQUETE where id_tipo_volquete = ?', volqueteId)
      return volqueteToDelete
    } catch (error: any) {
      throw new Error('unable to delete volquete')
    }
  }

}
