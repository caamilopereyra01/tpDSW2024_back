import  { NextFunction, Request, Response } from "express"
import { Volquete } from "./volquete.entity.js"
import { orm } from "../shared/db/orm.js"

const em = orm.em

//---------------------------- DEFINO LA FUNCION SANITIZE ----------------------------

function sanitizeTipoVolqueteInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        marca: req.body.marca,
        fecha_fabricacion: req.body.fecha_fabricacion,
        fecha_compra: req.body.fecha_compra,
        TipoVolquete: req.body.TipoVolquete,
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
     try{
      const volquetes = await em.find(
        Volquete,
        {},
        { populate: ['TipoVolquete'], orderBy: { id: 'asc' } }
        
      )
      res.status(200).json({message:'found all Volquetes', data:volquetes})
     } catch(error:any){
      res.status(500).json({ message: error.message})
     }
  }
  

//----------------------------  GET ONE ----------------------------

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const volquete = await em.findOneOrFail(
      Volquete,
      { id },
      { populate: ['TipoVolquete'] }
    )
    res.status(200).json({ message: 'found volquete', data: volquete })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
  }


//----------------------------  CREATE ----------------------------


  async function add(req: Request, res: Response) {
    try {
      console.log("Datos sanitizados:", req.body.sanitizedInput); //  verificar los datos

      const volquete = em.create(Volquete, req.body.sanitizedInput)
      await em.flush()
      res.status(201).json({messaje: 'Volquete created', data: volquete})

    } catch (error: any) {
      console.error("Error al crear el volquete:", error.stack); // Mostrar el stack trace completo
      res.status(500).json({ mensaje: error.message });
    }
  }


//----------------------------  UPDATE ----------------------------



async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const volqueteToUpdate = await em.findOneOrFail(Volquete, { id })
    em.assign(volqueteToUpdate, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'Volquete updated', data: volqueteToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
  }


//----------------------------  DELETE ----------------------------
/*Cambia el nombre de Delete a Remove pq sino no funciona se ve que es palabra reservada o algo asi*/
  
    async function remove(req: Request, res: Response) {
      try {
        const id = Number.parseInt(req.params.id)
        const volquete = em.getReference(Volquete, id)
        await em.removeAndFlush(volquete)
        res.status(200).send({ message: 'Volquete deleted' })
      } catch (error: any) {
        res.status(500).json({ message: error.message })
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




