import pkg from 'express';
const { Router } = pkg;
import { conU } from './user.controler.js'; /*Aqui utilizo controler para no tener que exportar todas las funciones*/

export const userRouter = Router();

userRouter.get('/', conU.findAll);
userRouter.get('/:id', conU.findOne);
userRouter.post('/', conU.add);
userRouter.put('/:id', conU.update);
userRouter.delete('/:id', conU.remove);
