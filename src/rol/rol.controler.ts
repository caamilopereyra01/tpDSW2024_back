import  {  Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Rol } from './rol.entity.js'
import { User } from '../user/user.entity.js'
import { t } from '@mikro-orm/core'


const em = orm.em


//----------------------------  GET ALL ----------------------------

async function findAll(req: Request, res: Response) {
  try {
    const roles = await em.find(Rol, {}, { orderBy: { id: 'desc' } })
    
    res     
      .status(200)
      .json({ message: 'found all roles', data: roles })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

//----------------------------  GET ONE ----------------------------

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const roles = await em.findOneOrFail(Rol, { id })
    res
      .status(200)
      .json({ message: 'found roles', data: roles })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

//----------------------------  CREATE ----------------------------
async function add(req: Request, res: Response) {
  try {
    const roles = em.create(Rol, req.body)
    await em.flush()
    res
      .status(201)
      .json({ message: 'Rol created', data: roles })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


//----------------------------  UPDATE ----------------------------


async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const rol = em.getReference(Rol, id)
    em.assign(rol, req.body)
    await em.flush()
    res.status(200).json({ message: 'Rol updated' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


//----------------------------  DELETE ----------------------------
/*Cambia el nombre de Delete a Remove pq sino no funciona se ve que es palabra reservada o algo asi*/
  
async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const rolEliminar = em.getReference(Rol, id)
    await em.removeAndFlush(rolEliminar)
    res.status(200).send({ message: 'rol deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}



export const contRol = {
    findAll,
    findOne,
    add,
    update,
    remove
}




