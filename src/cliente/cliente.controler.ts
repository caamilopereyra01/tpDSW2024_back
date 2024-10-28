import  {  Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Cliente } from './cliente.entity.js'
import { Volquete } from '../volquete/volquete.entity.js'
import { t } from '@mikro-orm/core'


const em = orm.em


//----------------------------  GET ALL ----------------------------

async function findAll(req: Request, res: Response) {
  try {
    const clientes = await em.find(Cliente, {})
    res
      .status(200)
      .json({ message: 'found all clientes', data: clientes })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

//----------------------------  GET ONE ----------------------------

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const clientes = await em.findOneOrFail(Cliente, { id })
    res
      .status(200)
      .json({ message: 'found clientes', data: clientes })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}




//----------------------------  GET VOLQUETES ----------------------------
/*
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
  */

//----------------------------  CREATE ----------------------------
async function add(req: Request, res: Response) {
  try {
    const clientes = em.create(Cliente, req.body)
    await em.flush()
    res
      .status(201)
      .json({ message: 'Cliente created', data: clientes })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


//----------------------------  UPDATE ----------------------------


async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const cliente = em.getReference(Cliente, id)
    em.assign(cliente, req.body)
    await em.flush()
    res.status(200).json({ message: 'Cliente updated' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


//----------------------------  DELETE ----------------------------
/*Cambia el nombre de Delete a Remove pq sino no funciona se ve que es palabra reservada o algo asi*/
  
async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const cliEliminar = em.getReference(Cliente, id)
    await em.removeAndFlush(cliEliminar)
    res.status(200).send({ message: 'cliente deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}



export const contTP = {
    findAll,
    //findVolquetes,
    findOne,
    add,
    update,
    remove
}




