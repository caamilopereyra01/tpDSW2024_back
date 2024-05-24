import express, { NextFunction, Request, Response } from 'express'
import { TipoVolquete } from './tipovolquete/tipovolquete.entity.js';
import { it } from 'node:test'


const app = express()
app.use(express.json())






//----------------------------DEFINO LA CLASE O ENTIDAD TIPO VOLQUETE----------------------------

const tipovolquetes =[
    new TipoVolquete(
        '0-0-0-0-1',
        'Grande'     
    ),
] 





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

app.get('/api/tipovolquete/tipovolquetes',(req,res) =>{
    res.json({data:tipovolquetes})
})





//----------------------------  GET ONE ----------------------------


app.get('/api/tipovolquete/tipovolquetes/:id',(req,res) =>{
    const tipovolquete = tipovolquetes.find((tipovolquete) => tipovolquete.id_tipo_volquete ===  req.params.id)
    if(!tipovolquete){
        return res.status(404).send({ message:'Character not found'})
    }
    res.json({data:tipovolquete})
})




//----------------------------  POST ----------------------------

app.post('/api/tipovolquete/tipovolquetes',sanitizeTipoVolqueteInput,(req,res) =>{
    const input = req.body.sanitizedInput
    const tipovolquete = new TipoVolquete(
       input.id_tipo_volquete,
       input.descripcion_tipo_volquete
      )
      tipovolquetes.push(tipovolquete)
    return res.status(201).send({message:'Tipo Volquete creado correctamente', data:tipovolquete})
  })
  
  

//----------------------------  PUT ----------------------------


app.put('/api/tipovolquete/tipovolquetes/:id', sanitizeTipoVolqueteInput, (req, res) => {
  
    const tipovolqueteIdx = tipovolquetes.findIndex((tipovolquete) => tipovolquete.id_tipo_volquete === req.params.id)

    if(tipovolqueteIdx === -1){
     return res.status(404).send({ message:'Tipo Volquete not found'})          
    }
    
    tipovolquetes[tipovolqueteIdx] = { ...tipovolquetes[tipovolqueteIdx], ...req.body.sanitizedInput }
    
    return res.status(200).send({message:'Tipo Volquete update successfully', data: tipovolquetes
    [tipovolqueteIdx]})
})




//----------------------------  PATCH (justo en este caso es = PUT) ----------------------------

app.patch('/api/tipovolquete/tipovolquetes/:id', sanitizeTipoVolqueteInput, (req, res) => {
  
    const tipovolqueteIdx = tipovolquetes.findIndex((tipovolquete) => tipovolquete.id_tipo_volquete === req.params.id)

    if(tipovolqueteIdx === -1){
        return res.status(404).send({ message:'Tipo Volquete not found'})          
    }
    
    tipovolquetes[tipovolqueteIdx] = { ...tipovolquetes[tipovolqueteIdx], ...req.body.sanitizedInput }
    //Objet.assign(tipovolquetes[tipovolqueteIdx], req.bodi.sanitizedInput)
    return res.status(200).send({message:'Tipo Volquete update successfully', data: tipovolquetes
    [tipovolqueteIdx]})
})




//----------------------------  DELETE ----------------------------
app.delete('/api/tipovolquete/tipovolquetes/:id',(req,res)=>{
    const tipovolqueteIdx = tipovolquetes.findIndex((tipovolquete) => tipovolquete.id_tipo_volquete === req.params.id)

    if(tipovolqueteIdx===-1){
        res.status(400).send({message:'Tipo Volquete not found'})
    } else {
        tipovolquetes.splice(tipovolqueteIdx,1)
        res.status(200).send({message: 'Tipo Volquete deleted successfully'})
    }
    
})



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