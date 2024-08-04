import { Router } from "express";
import { controlerV } from "./volquete.controler.js";/*Aqui utilizo controler para no tener que exportar todas las funciones*/

export const tipovolqueteRouter = Router()

tipovolqueteRouter.get('/', controlerV.findAll)
tipovolqueteRouter.get('/:nro_volquete', controlerV.findOne)
tipovolqueteRouter.post('/', controlerV.sanitizeTipoVolqueteInput, controlerV.add)
tipovolqueteRouter.put('/:nro_volquete', controlerV.sanitizeTipoVolqueteInput, controlerV.update)
tipovolqueteRouter.patch('/:nro_volquete', controlerV.sanitizeTipoVolqueteInput, controlerV.update)
tipovolqueteRouter.delete('/:nro_volquete', controlerV.remove)