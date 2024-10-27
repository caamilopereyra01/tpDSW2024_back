import { Router } from "express";
import { contUser } from "./usuario.controler.js";/*Aqui utilizo controler para no tener que exportar todas las funciones*/
import { authenticateToken } from "../services/authentication.js";

export const userRouter = Router();

userRouter.post('/login', contUser.login);

userRouter.get('/', contUser.findAll);
userRouter.get('/:id_usuario', contUser.findOne);
userRouter.post('/', contUser.sanitizeUsuarioInput, contUser.add);
userRouter.put('/:id_usuario', contUser.sanitizeUsuarioInput, contUser.update);
userRouter.patch(
  '/:id_usuario',
  contUser.sanitizeUsuarioInput,
  contUser.update
  );
userRouter.delete('/:id_usuario', contUser.remove);

userRouter.get('/checkToken', authenticateToken, contUser.checkToken);