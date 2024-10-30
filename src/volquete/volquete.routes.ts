import pkg from 'express';
const { Router } = pkg;

import { controlerV } from './volquete.controler.js'; /*Aqui utilizo controler para no tener que exportar todas las funciones*/

export const volqueteRouter = Router();

volqueteRouter.get('/', controlerV.findAll)
volqueteRouter.get('/:id', controlerV.findOne)
volqueteRouter.post('/', controlerV.sanitizeTipoVolqueteInput, controlerV.add)
volqueteRouter.put('/:id', controlerV.sanitizeTipoVolqueteInput, controlerV.update)
volqueteRouter.patch('/:id', controlerV.sanitizeTipoVolqueteInput, controlerV.update)
volqueteRouter.delete('/:id', controlerV.remove)