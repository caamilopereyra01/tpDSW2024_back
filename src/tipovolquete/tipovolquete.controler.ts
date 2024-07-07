import  { NextFunction, Request, Response } from "express"
import { TipoVolqueteRepository } from "./tipovolquete.repository.js"
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

function findAll(req: Request,res: Response) {
    res.json({data:repository.findAll()})
}


//----------------------------  GET ONE ----------------------------


function findOne(req: Request,res: Response) {
    const id = req.params.id
    const tipovolquete = repository.findOne({id})
    if(!tipovolquete){
        return res.status(404).send({ message:'Character not found'})
    }
    res.json({data:tipovolquete})
}


//----------------------------  POST (AGREGAR - CREATE) ----------------------------

function add(req: Request,res: Response) {
    const input = req.body.sanitizedInput

    const tipovolqueteInput = new TipoVolquete(
       input.id_tipo_volquete,
       input.descripcion_tipo_volquete
      )
    const tipovolquete=repository.add(tipovolqueteInput)
    return res.status(201).send({message:'Tipo Volquete creado correctamente', data:tipovolquete})
  }
  

//----------------------------  PUT y PATH  (UPDATE) ----------------------------


function update(req: Request,res: Response) {
    req.body.sanitizedInput.id_tipo_volquete = req.params.id
    const tipovolquete = repository.update(req.body.sanitizedInput)    
 
    if(!tipovolquete){
     return res.status(404).send({ message:'Tipo Volquete not found'})          
    }
    
    return res.status(200).send({message:'Tipo Volquete update successfully', data: tipovolquete})

}


//----------------------------  DELETE ----------------------------
/*Cambia el nombre de Delete a Remove pq sino no funciona se ve que es palabra reservada o algo asi*/
function remove(req: Request,res: Response) {
    
    const id = req.params.id
    const tipovolquete = repository.delete({id})

     if(!tipovolquete){
        res.status(400).send({message:'Tipo Volquete not found'})
    } else {
        res.status(200).send({message: 'Tipo Volquete deleted successfully'})
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




