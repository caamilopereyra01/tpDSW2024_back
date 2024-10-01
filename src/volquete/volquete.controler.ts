import  { NextFunction, Request, Response } from "express"
import { Volquete } from "./volquete.entity.js"




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
    res.json({ messaje: ' No implementado '})
  }
  

//----------------------------  GET ONE ----------------------------

async function findOne(req: Request, res: Response) {
  res.json({ messaje: ' No implementado '})
  }


//----------------------------  CREATE ----------------------------
  async function add(req: Request, res: Response) {
    res.json({ messaje: ' No implementado '})
  }


//----------------------------  UPDATE ----------------------------



async function update(req: Request, res: Response) {
  res.json({ messaje: ' No implementado '})
  }


//----------------------------  DELETE ----------------------------
/*Cambia el nombre de Delete a Remove pq sino no funciona se ve que es palabra reservada o algo asi*/
  
    async function remove(req: Request, res: Response) {
      res.json({ messaje: ' No implementado '})
      }



export const controlerV = {
    sanitizeTipoVolqueteInput,
    findAll,
    findOne,
    add,
    update,
    remove
}




