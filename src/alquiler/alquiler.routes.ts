import pkg from 'express';
import { controlerAlquiler } from "./alquiler.controler.js";/*Aqui utilizo controler para no tener que exportar todas las funciones*/
const { Router } = pkg;
export const alquilerRouter = Router()

alquilerRouter.get('/', controlerAlquiler.findAll)
alquilerRouter.get('/:id', controlerAlquiler.findOne)
alquilerRouter.post('/', controlerAlquiler.add)
alquilerRouter.put('/:id',controlerAlquiler.update)
alquilerRouter.delete('/:id', controlerAlquiler.remove)