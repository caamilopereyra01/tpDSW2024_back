import  { NextFunction, Request, Response } from "express"
import { TipoVolqueteRepository } from "./tipoVolquete.repository.js"
import { TipoVolquete } from "./tipovolquete.entity.js"

const repository = new TipoVolqueteRepository()


//---------------------------- DEFINO LA FUNCION SANITIZE ----------------------------

function sanitizeTipoVolqueteInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
       descripcion_tipo_volquete: req.body.descripcion_tipo_volquete,
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
    const id = req.params.id_tipo_volquete //req.params.id   ?? 
    const tipovolquete = await repository.findOne({ id })
    if (!tipovolquete) {
      return res.status(404).send({ message: 'tipovolquete not found' })
    }
    res.json({ data: tipovolquete })
  }


//----------------------------  CREATE ----------------------------
  async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
  
    const tipovolqueteInput = new TipoVolquete(
        input.descripcion_tipo_volquete,
        input.id_tipo_volquete

    )
  
    const tipovolquete = await repository.add(tipovolqueteInput)
    return res.status(201).send({ message: 'tipovolquete created', data: tipovolquete })
  }


//----------------------------  UPDATE ----------------------------



async function update(req: Request, res: Response) {
    const tipovolquete = await repository.update(req.params.id_tipo_volquete, req.body.sanitizedInput)
  
    if (!tipovolquete) {
      return res.status(404).send({ message: 'tipovolquete not found' })
    }
  
    return res.status(200).send({ message: 'tipovolquete updated successfully', data: tipovolquete })
  }


//----------------------------  DELETE ----------------------------
/*Cambia el nombre de Delete a Remove pq sino no funciona se ve que es palabra reservada o algo asi*/
  
    async function remove(req: Request, res: Response) {
        const id = req.params.id_tipo_volquete
        const tipovolquete = await repository.delete({ id })
      
        if (!tipovolquete) {
          res.status(404).send({ message: 'tipovolquete not found' })
        } else {
          res.status(200).send({ message: 'tipovolquete deleted successfully' })
        }
      }



export const contTP = {
    sanitizeTipoVolqueteInput,
    findAll,
    findOne,
    add,
    update,
    remove
}




