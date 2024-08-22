import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors';
import { tipovolqueteRouter } from './tipovolquete/tipovolquete.routes.js'
import { volqueteRouter } from './volquete/volquete.routes.js'

const app = express();

app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}));

app.use('/api/tipovolquetes',tipovolqueteRouter);
app.use('/api/volquetes',volqueteRouter);

// DEFAULT
app.use((_,res)=>{
    return res.status(400).send({message:'Resource not found'})
 });
 
 
 
 //----------------------------  RUNNING SERVER ----------------------------
 
 app.listen(3000, () => {
     console.log('..............................Volquetes Los Hermanos Corriendo Correctamente en puerto 3000....................')
     console.log('..............................Servidor: Volquetes Los Hermanos....................')
     console.log('..............................Autores: Pereyra Camilo; Virgolini Pablo....................')
 })