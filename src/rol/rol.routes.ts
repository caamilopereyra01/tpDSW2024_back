import pkg from 'express';
const { Router } = pkg;
import { contRol } from './rol.controler.js'; /*Aqui utilizo controler para no tener que exportar todas las funciones*/

export const rolRouter = Router();

rolRouter.get('/', contRol.findAll);
rolRouter.get('/:id', contRol.findOne);
rolRouter.post('/', contRol.add);
rolRouter.put('/:id', contRol.update);
rolRouter.delete('/:id', contRol.remove);
