import { Router } from "express";
import { contUser } from "./usuario.controler.js";/*Aqui utilizo controler para no tener que exportar todas las funciones*/

export const tipovolqueteRouter = Router()

tipovolqueteRouter.get('/', contUser.findAll);
tipovolqueteRouter.get('/:id_usuario', contUser.findOne);
tipovolqueteRouter.post('/', contUser.sanitizeInput, contUser.add);
tipovolqueteRouter.put('/:id_usuario', contUser.sanitizeInput, contUser.update);
tipovolqueteRouter.patch(
  '/:id_usuario',
  contUser.sanitizeInput,
  contUser.update
);
tipovolqueteRouter.delete('/:id_usuario', contUser.remove);