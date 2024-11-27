import  { NextFunction, Request, Response } from "express"
import { Alquiler } from "./alquiler.entity.js"
import { orm } from "../shared/db/orm.js"
import { Volquete } from "../volquete/volquete.entity.js"
import { Cliente } from "../cliente/cliente.entity.js"

const em = orm.em


//----------------------------  GET ALL ----------------------------

async function findAll(req: Request, res: Response) {
     try{
      const alquileres = await em.find(
        Alquiler,
        {},
        { populate: ['volquete','cliente']},
      )
      res.status(200).json({message:'found all Alquileres', data:alquileres})
     } catch(error:any){
      res.status(500).json({ message: error.message})
     }
  }
  

//----------------------------  GET ONE ----------------------------

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const alquiler = await em.findOneOrFail(
      Alquiler,
      { id },
      { populate: ['volquete','cliente'] }
    )
    res.status(200).json({ message: 'found alquiler', data: alquiler })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
  }


//----------------------------  CREATE ----------------------------

/*
async function add(req: Request, res: Response) {
  try {
    const alquiler = em.create(Alquiler, req.body)
    await em.flush()
    res
      .status(201)
      .json({ message: 'Alquiler created', data: alquiler })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
*/

async function add(req: Request, res: Response) {
  try {
    const volquete = await em.findOne(Volquete, { id: Number.parseInt(req.params.volquete) });
    const cliente = await em.findOne(Cliente, { id:  Number.parseInt(req.params.cliente)});
    if (!volquete || !cliente) {
      return res.status(400).json({ message: 'Volquete o Cliente no encontrado' });
    }
    const alquiler = em.create(Alquiler, req.body);
    await em.flush();
    res.status(201).json({ message: 'Alquiler created', data: alquiler });
  } catch (error: any) {
    console.error("Error al crear el alquiler:", error.stack); // Mostrar el stack trace completo
    res.status(500).json({ message: error.message });
  }
}






//----------------------------  UPDATE ----------------------------



async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const alquilerToUpdate = await em.findOneOrFail(Alquiler, { id })
    em.assign(alquilerToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'Alquiler updated', data: alquilerToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
  }


//----------------------------  DELETE ----------------------------
/*Cambia el nombre de Delete a Remove pq sino no funciona se ve que es palabra reservada o algo asi*/
  
    async function remove(req: Request, res: Response) {
      try {
        const id = Number.parseInt(req.params.id)
        const alquiler = em.getReference(Alquiler, id)
        await em.removeAndFlush(alquiler)
        res.status(200).send({ message: 'Alquiler deleted' })
      } catch (error: any) {
        res.status(500).json({ message: error.message })
      }
      }



export const controlerAlquiler = {
    findAll,
    findOne,
    add,
    update,
    remove
}




