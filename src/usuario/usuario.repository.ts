import { Repository } from '../shared/repository.js'
import { Usuario } from './usuario.entity.js'
import { pool } from '../shared/db/conn.mysql.js'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

export class UsuarioRepository implements Repository<Usuario> {
  /* ---------------------------------- FIND ALL ----------------------------------*/
  public async findAll(): Promise<Usuario[] | undefined> {
    const [usuario] = await pool.query('select * from USUARIO');

    /*no aplica en este caso, pero en caso de tener un atributo multivaluado lo puedo mapear de la siguiente manera, a sabiendas
    que un Character puede tener varios items:
    */
    /* 
    for (const character of characters as Character[]) {
      const [items] = await pool.query('select itemName from characterItems where characterId = ?', [character.id])
      character.items = (items as { itemName: string }[]).map((item) => item.itemName)
    }
    */
    return usuario as Usuario[];
  }

  /* ---------------------------------- FIND ONE ----------------------------------*/
  public async findOne(user: { id: string }): Promise<Usuario | undefined> {
    const id = Number.parseInt(user.id);
    const [usuarios] = await pool.query<RowDataPacket[]>(
      'select * from USUARIO where id_usuario = ?',
      [id]
    );
    if (usuarios.length === 0) {
      return undefined;
    }
    const usuario = usuarios[0] as Usuario;

    /*no aplica en este caso, pero en caso de tener un atributo multivaluado lo puedo mapear de la siguiente manera, a sabiendas
    que un Character puede tener varios items:
    */
    /*const[item] = await pool.query('select itemName from characterItems where characterId=?',[character.id])
    character.items = (items as {itemName:String}[]).map((item)=> item.itemName)
    */
    return usuario;
  }

  /* ---------------------------------- ADD ----------------------------------*/

  public async add(usuarioInput: Usuario): Promise<Usuario | undefined> {
    const { id_usuario, ...usuarioRow } = usuarioInput;
    const [result] = await pool.query<ResultSetHeader>(
      'insert into USUARIO set ?',
      [usuarioRow]
    );
    usuarioInput.id_usuario = result.insertId;

    /*no aplica en este caso, pero en caso de tener un atributo multivaluado lo puedo insertar en conjunto con el character
    de la siguiente manera, a sabiendas que un Character puede tener varios items:
    */
    /*for (const item of items) {
      await pool.query('insert into characterItems set ?', { characterId: characterInput.id, itemName: item })
    }*/

    return usuarioInput;
  }

  /* ---------------------------------- UPDATE ----------------------------------*/
  public async update(
    id: string,
    usuarioInput: Usuario
  ): Promise<Usuario | undefined> {
    const userId = Number.parseInt(id);
    const { ...usuarioRow } = usuarioInput;
    await pool.query('update USUARIO set ? where id_usuario = ?', [
      usuarioRow,
      userId,
    ]);
    /*
    await pool.query('delete from characterItems where characterId = ?', [characterId])

    if (items?.length > 0) {
      for (const itemName of items) {
        await pool.query('insert into characterItems set ?', { characterId, itemName })
      }
    }
    */
    return await this.findOne({ id });
  }
  /* ---------------------------------- DELETE ----------------------------------*/

  public async delete(user: {
    id: string;
  }): Promise<Usuario | undefined> {
    try {
      const usuarioToDelete = await this.findOne(user);
      const userId = Number.parseInt(user.id);
      await pool.query(
        'delete from USUARIO where id_usuario = ?',
        userId
      );
      return usuarioToDelete;
    } catch (error: any) {
      throw new Error('unable to delete usuario');
    }
  }
}
