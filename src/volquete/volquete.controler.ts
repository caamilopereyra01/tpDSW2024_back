import  { NextFunction, Request, Response } from "express"
import { VolqueteRepository } from "./volquete.repository.js"
import { Volquete } from "./volquete.entity.js"

const repository = new VolqueteRepository()


//---------------------------- DEFINO LA FUNCION SANITIZE ----------------------------

function sanitizeTipoVolqueteInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        marca: req.body.marca,
        fecha_fabricacion: req.body.fecha_fabricacion,
        fecha_compra: req.body.fecha_compra,
        id_tipo_volquete: req.body.id_tipo_volquete,
    }
    //mas chequeos

    Object.keys(req.body.sanitizedInput).forEach(key=>{
       if(req.body.sanitizedInput[key]===undefined) {
        delete req.body.sanitizedInput[key]
       }
    })
    next()
}



//----------------------------  GET ALL ----------------------------

async function findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
  }
  

//----------------------------  GET ONE ----------------------------

async function findOne(req: Request, res: Response) {
    const id = req.params.nro_volquete //req.params.id   ?? 
    const volquete = await repository.findOne({ id })
    if (!volquete) {
      return res.status(404).send({ message: 'volquete not found' })
    }
    res.json({ data: volquete })
  }


//----------------------------  CREATE ----------------------------
  async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
  
    const volqueteInput = new Volquete(
        input.marca,
        input.fecha_fabricacion,
        input.fecha_compra,
        input.id_tipo_volquete,
        input.nro_volquete
    )
  
    const volquete = await repository.add(volqueteInput)
    return res.status(201).send({ message: 'volquete created', data: volquete })
  }


//----------------------------  UPDATE ----------------------------



async function update(req: Request, res: Response) {
    const volquete = await repository.update(req.params.nro_volquete, req.body.sanitizedInput)
  
    if (!volquete) {
      return res.status(404).send({ message: 'volquete not found' })
    }
  
    return res.status(200).send({ message: 'volquete updated successfully', data: volquete })
  }


//----------------------------  DELETE ----------------------------
/*Cambia el nombre de Delete a Remove pq sino no funciona se ve que es palabra reservada o algo asi*/
  
    async function remove(req: Request, res: Response) {
        const id = req.params.nro_volquete
        const voqluete = await repository.delete({ id })
      
        if (!voqluete) {
          res.status(404).send({ message: 'volquete not found' })
        } else {
          res.status(200).send({ message: 'volquete deleted successfully' })
        }
      }



export const controlerV = {
    sanitizeTipoVolqueteInput,
    findAll,
    findOne,
    add,
    update,
    remove
}




