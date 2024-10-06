import 'reflect-metadata'
import express from 'express'
import { tipovolqueteRouter } from './volquete/tipovolquete.routes.js'
import { volqueteRouter } from './volquete/volquete.routes.js'
import {orm, syncSchema} from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'

const app = express()
app.use(express.json())


// luego de los middlewares base
//em: entity management, permite manejar las entidades de forma uniforme y desde un unico punto
//unidad de trabajo donde todas las entidades se consultan en el momento necesario
app.use((req, res, next) => {
    RequestContext.create(orm.em, next)
})
//antes de las rutas y  middlewares de negocio
app.use('/api/volquetes/tipovolquetes',tipovolqueteRouter)
app.use('/api/volquetes',volqueteRouter)

// DEFAULT
app.use((_,res)=>{
    return res.status(400).send({message:'Resource not found'})
 })
 
 
 await syncSchema()
 //----------------------------  RUNNING SERVER ----------------------------
 
 app.listen(3000, () => {
     console.log('..............................Volquetes Los Hermanos Corriendo Correctamente en puerto 3000....................')
     console.log('..............................Servidor: Volquetes Los Hermanos....................')
     console.log('..............................Autores: Pereyra Camilo; Virgolini Pablo....................')
 })