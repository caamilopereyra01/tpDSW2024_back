import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors';

import { tipovolqueteRouter } from './tipovolquete/tipovolquete.routes.js'
import { volqueteRouter } from './volquete/volquete.routes.js'
import { userRouter } from './usuario/usuario.routes.js';

const corsOptions = {
    origin: 'http://localhost:4200', // URL de la app de Angular 
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true,
  };
// Use CORS middleware with the specified options
const app = express();

app.use(cors(corsOptions)); // applies the CORS settings to all routes.
app.use(express.json());  //allows Express to parse JSON request bodies.

app.use('/api/tipovolquetes',tipovolqueteRouter);
app.use('/api/volquetes',volqueteRouter);
app.use('/api/usuarios', userRouter);

app.options('*', cors(corsOptions)); // Manejo de solicitudes OPTIONS


// DEFAULT
app.use((_, res) => {
  return res.status(400).send({ message: 'Resource not found' });
});
  
 //----------------------------  RUNNING SERVER ----------------------------
 const port = 3000;
 app.listen(port, () => {
     console.log('..............................Volquetes Los Hermanos Corriendo Correctamente en puerto 3000....................')
     console.log('..............................Servidor: Volquetes Los Hermanos....................')
     console.log('..............................Autores: Pereyra Camilo; Virgolini Pablo....................')
 })