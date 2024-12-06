import pkg from 'express';
import { conU, RolesController } from './user.controller.js'; /*Aqui utilizo controler para no tener que exportar todas las funciones*/
import {ensureAdminRole} from '../services/checkRole.controller.js'
import {controlerAuthenticateToken} from '../services/authentication.controller.js'

const { Router } = pkg;
const rolesCtr = new RolesController();

export const userRouter = Router();

userRouter.get('/getallpossibleroles', rolesCtr.getAllPossibleRoles);
userRouter.get('/', conU.findAll);
userRouter.get('/:id', conU.findOne);
userRouter.post('/getEmailByUsername', conU.getEmailByUsername);
userRouter.post('/', conU.add);
userRouter.put('/:id', conU.update);
userRouter.delete('/:id', conU.remove);
userRouter.post('/login', conU.login);
userRouter.post('/recoverpassword',conU.recoverpassword);
userRouter.get('/rol/:nombre_usuario', conU.getRolByUsername);
userRouter.post('/singup',conU.signup);



//userRouter.put('/:id', controlerAuthenticateToken.authenticateToken, ensureAdminRole, conU.update);