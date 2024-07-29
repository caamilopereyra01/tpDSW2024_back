import express, { NextFunction, Request, Response } from 'express'
import { tipovolqueteRouter } from './tipovolquete/tipovolquete.routes.js'

const app = express()
app.use(express.json())

app.use('/api/tipovolquetes',tipovolqueteRouter)

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