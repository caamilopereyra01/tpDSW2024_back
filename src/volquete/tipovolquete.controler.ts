import  {  Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { TipoVolquete } from './tipovolquete.entity.js'
import { Volquete } from './volquete.entity.js'
import { t } from '@mikro-orm/core'


const em = orm.em


//----------------------------  GET ALL ----------------------------

async function findAll(req: Request, res: Response) {
  try {
    const tipoVolquetes = await em.find(TipoVolquete, {}, { orderBy: { id: 'asc' } })
    res
      .status(200)
      .json({ message: 'found all tipo volquetes', data: tipoVolquetes })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

//----------------------------  GET ONE ----------------------------

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id_tipo_volquete)
    const tipoVolquetes = await em.findOneOrFail(TipoVolquete, { id })
    res
      .status(200)
      .json({ message: 'found tipo volquetes', data: tipoVolquetes })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}




//----------------------------  GET VOLQUETES ----------------------------

async function findVolquetes(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id_tipo_volquete)
        // Usamos `populate` para incluir la información del TipoVolquete en la consulta
    const volquetes = await em.find(Volquete, { TipoVolquete: id }, { populate: ['TipoVolquete'] });
    res
      .status(200)
      .json({ message: 'Volquetes encontrados: ', data: volquetes })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


//----------------------------  CREATE ----------------------------
async function add(req: Request, res: Response) {
  try {
    const tipoVolquetes = em.create(TipoVolquete, req.body)
    await em.flush()
    res
      .status(201)
      .json({ message: 'Tipo Volquete created', data: tipoVolquetes })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


//----------------------------  UPDATE ----------------------------


async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id_tipo_volquete)
    const tipoVolquete = em.getReference(TipoVolquete, id)
    em.assign(tipoVolquete, req.body)
    await em.flush()
    res.status(200).json({ message: 'Tipo Volquete updated' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


//----------------------------  DELETE ----------------------------
/*Cambia el nombre de Delete a Remove pq sino no funciona se ve que es palabra reservada o algo asi*/
  
async function remove(req: Request, res: Response) {
  /*try {
    const id = Number.parseInt(req.params.id_tipo_volquete)
    const tipoVolquetes = em.getReference(TipoVolquete, id)
    //Buscamos volquete asociado:
    const volquetesAsociados = await em.find(Volquete, {TipoVolquete: id});

    await em.removeAndFlush(tipoVolquetes)
    res.status(200).send({ message: 'tipo Volquete deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
*/

try {
  const id = Number.parseInt(req.params.id_tipo_volquete);

  // Buscar si hay volquetes asociados al TipoVolquete
  const volquetesAsociados = await em.count(Volquete, { TipoVolquete: id });

  // Si existen volquetes asociados, enviamos un mensaje indicando que no se puede eliminar
  if (volquetesAsociados > 0) {
    return res.status(400).json({ message: 'No se puede eliminar el TipoVolquete porque tiene Volquetes asociados.' });
  }

  // Si no hay volquetes asociados, procedemos a eliminar el TipoVolquete
  const tipoVolquete = await em.getReference(TipoVolquete, id);
  await em.removeAndFlush(tipoVolquete);

  res.status(200).send({ message: 'TipoVolquete eliminado exitosamente' });
} catch (error: any) {
  res.status(500).json({ message: error.message });
}
}



export const contTP = {
    findAll,
    findVolquetes,
    findOne,
    add,
    update,
    remove
}




