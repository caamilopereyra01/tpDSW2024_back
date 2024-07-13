import { Router } from "express";
import { contTP } from "./tipovolquete.controler.js";/*Aqui utilizo controler para no tener que exportar todas las funciones*/

export const tipovolqueteRouter = Router()

tipovolqueteRouter.get('/', contTP.findAll)
tipovolqueteRouter.get('/:id', contTP.findOne)
tipovolqueteRouter.post('/', contTP.sanitizeTipoVolqueteInput, contTP.add)
tipovolqueteRouter.put('/:id', contTP.sanitizeTipoVolqueteInput, contTP.update)
tipovolqueteRouter.patch('/:id', contTP.sanitizeTipoVolqueteInput, contTP.update)
tipovolqueteRouter.delete('/:id', contTP.remove)