import express, { NextFunction, Request, Response } from 'express'
import { TipoVolquete } from './tipovolquete/tipovolquete.entity.js';
import { it } from 'node:test'
import { TipoVolqueteRepository } from './tipovolquete/tipovolquete.repository.js';
import { tipovolqueteRouter } from './tipovolquete/tipovolquete.routes.js';

const app = express()
app.use(express.json())

const repository = new TipoVolqueteRepository()



app.use('/api/tipovolquete/tipovolquetes',tipovolqueteRouter)




/*

ANTERIOR USANDO SOLO REPOSITORY

//----------------------------  GET ALL ----------------------------

app.get('/api/tipovolquete/tipovolquetes',(req,res) =>{
    res.json({data:repository.findAll()})
})


//----------------------------  GET ONE ----------------------------


app.get('/api/tipovolquete/tipovolquetes/:id',(req,res) =>{
    const id = req.params.id
    const tipovolquete = repository.findOne({id})
    if(!tipovolquete){
        return res.status(404).send({ message:'Character not found'})
    }
    res.json({data:tipovolquete})
})




//----------------------------  POST ----------------------------

app.post('/api/tipovolquete/tipovolquetes',sanitizeTipoVolqueteInput,(req,res) =>{
    const input = req.body.sanitizedInput
    const tipovolqueteInput = new TipoVolquete(
       input.id_tipo_volquete,
       input.descripcion_tipo_volquete
      )
    const tipovolquete=repository.add(tipovolqueteInput)
    return res.status(201).send({message:'Tipo Volquete creado correctamente', data:tipovolquete})
  })
  
  

//----------------------------  PUT ----------------------------


app.put('/api/tipovolquete/tipovolquetes/:id', sanitizeTipoVolqueteInput, (req, res) => {
    
    req.body.sanitizedInput.id_tipo_volquete = req.params.id
    const tipovolquete = repository.update(req.body.sanitizedInput)    
 
    if(!tipovolquete){
     return res.status(404).send({ message:'Tipo Volquete not found'})          
    }
    
    return res.status(200).send({message:'Tipo Volquete update successfully', data: tipovolquete})

})




//----------------------------  PATCH (justo en este caso es = PUT) ----------------------------

app.patch('/api/tipovolquete/tipovolquetes/:id', sanitizeTipoVolqueteInput, (req, res) => {
 
    req.body.sanitizedInput.id_tipo_volquete = req.params.id
    const tipovolquete = repository.update(req.body.sanitizedInput)    
 
    if(!tipovolquete){
     return res.status(404).send({ message:'Tipo Volquete not found'})          
    }
    
    return res.status(200).send({message:'Tipo Volquete update successfully', data: tipovolquete})
})




//----------------------------  DELETE ----------------------------
app.delete('/api/tipovolquete/tipovolquetes/:id',(req,res)=>{
    
    const id = req.params.id
    const tipovolquete = repository.delete({id})

     if(!tipovolquete){
        res.status(400).send({message:'Tipo Volquete not found'})
    } else {
        res.status(200).send({message: 'Tipo Volquete deleted successfully'})
    }
    
})*/


// DEFAULT
app.use((_,res)=>{
    return res.status(400).send({message:'Resource not found'})
 })
 
 
 
 //----------------------------  RUNNING SERVER ----------------------------
 
 app.listen(3000, () => {
     console.log('..............................Volquetes Los Hermanos Corriendo Correctamente....................')
     console.log('..............................Servidor: Volquetes Los Hermanos....................')
     console.log('..............................Autores: Pereyra Camilo; Virgolini Pablo....................')
 })