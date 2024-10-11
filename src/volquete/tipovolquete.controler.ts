import  {  Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { TipoVolquete } from './tipovolquete.entity.js'
import { Volquete } from './volquete.entity.js'
import { t } from '@mikro-orm/core'


const em = orm.em


//----------------------------  GET ALL ----------------------------

async function findAll(req: Request, res: Response) {
  try {
    const tipoVolquetes = await em.find(TipoVolquete, {})
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
  try {
    const id = Number.parseInt(req.params.id_tipo_volquete)
    const tipoVolquetes = em.getReference(TipoVolquete, id)
    await em.removeAndFlush(tipoVolquetes)
    res.status(200).send({ message: 'tipo Volquete deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
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




