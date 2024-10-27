import { Router } from "express";
import { contTP } from "./cliente.controler.js";/*Aqui utilizo controler para no tener que exportar todas las funciones*/

export const clienteRouter = Router()

clienteRouter.get('/', contTP.findAll)
clienteRouter.get('/:id', contTP.findOne)
//clienteRouter.get('/:id/volquetes', contTP.findVolquetes)
clienteRouter.post('/', contTP.add)
clienteRouter.put('/:id',contTP.update)
clienteRouter.delete('/:id', contTP.remove)