import { Router } from "express";
import { contTP } from "./tipovolquete.controler.js";/*Aqui utilizo controler para no tener que exportar todas las funciones*/

export const tipovolqueteRouter = Router()

tipovolqueteRouter.get('/', contTP.findAll)
tipovolqueteRouter.get('/:id_tipo_volquete', contTP.findOne)
tipovolqueteRouter.get('/:id_tipo_volquete/volquetes', contTP.findVolquetes)
tipovolqueteRouter.post('/', contTP.add)
tipovolqueteRouter.put('/:id_tipo_volquete',contTP.update)
tipovolqueteRouter.delete('/:id_tipo_volquete', contTP.remove)