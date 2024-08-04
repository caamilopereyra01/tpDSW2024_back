import { Router } from "express";
import { controlerV } from "./volquete.controler.js";/*Aqui utilizo controler para no tener que exportar todas las funciones*/

export const volqueteRouter = Router()

volqueteRouter.get('/', controlerV.findAll)
volqueteRouter.get('/:nro_volquete', controlerV.findOne)
volqueteRouter.post('/', controlerV.sanitizeTipoVolqueteInput, controlerV.add)
volqueteRouter.put('/:nro_volquete', controlerV.sanitizeTipoVolqueteInput, controlerV.update)
volqueteRouter.patch('/:nro_volquete', controlerV.sanitizeTipoVolqueteInput, controlerV.update)
volqueteRouter.delete('/:nro_volquete', controlerV.remove)