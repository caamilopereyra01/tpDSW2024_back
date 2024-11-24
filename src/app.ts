import 'reflect-metadata'
import express from 'express'
import { tipovolqueteRouter } from './tipoVolquete/tipovolquete.routes.js'
import { volqueteRouter } from './volquete/volquete.routes.js'
import { clienteRouter } from './cliente/cliente.routes.js'
import { alquilerRouter } from './alquiler/alquiler.routes.js'
import { userRouter } from './user/user.routes.js';
import {orm, syncSchema} from './shared/db/orm.js'
import { MikroORM, RequestContext } from '@mikro-orm/core'
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:4200', // URL de la app de Angular 
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  };
// Use CORS middleware with the specified options


const app = express()
app.use(express.json())

const PORT = 3000; 

// luego de los middlewares base
//em: entity management, permite manejar las entidades de forma uniforme y desde un unico punto
//unidad de trabajo donde todas las entidades se consultan en el momento necesario

app.use(cors(corsOptions)); // applies the CORS settings to all routes.
app.options('*', cors(corsOptions)); 

app.use((req, res, next) => {
    RequestContext.create(orm.em, next)
})



//antes de las rutas y  middlewares de negocio
app.use('/api/volquetes/tipovolquetes',tipovolqueteRouter)
app.use('/api/volquetes',volqueteRouter)
app.use('/api/clientes',clienteRouter)
app.use('/api/alquileres',alquilerRouter)
app.use('/api/users',userRouter)

// DEFAULT
app.use((_,res)=>{
    return res.status(400).send({message:'Resource not found'})
 })
 
 
 await syncSchema()
 //----------------------------  RUNNING SERVER ----------------------------
 
 app.listen(PORT, () => {
     console.log('..............................Volquetes Los Hermanos Corriendo Correctamente en puerto 3000....................')
     console.log('..............................Servidor: Volquetes Los Hermanos....................')
     console.log('..............................Autores: Pereyra Camilo; Virgolini Pablo....................')
 })