import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import {User} from '../user/user.entity.js';

dotenv.config();

function checkRole(  req: Request,  res: Response,  next: NextFunction): Response | void {
  if (res.locals.role === process.env.USER) {
    return res.sendStatus(401); // Unauthorized
  } else {
    next();
  }
}


function ensureAdminRole(req: Request, res: Response, next: NextFunction) {
  // Verifica si el usuario está autenticado y tiene un rol
  const user = (req as any).user; // Necesito q `req.user` se establezca en algún middleware anterior, como autenticación

/*  if (!req.user || !(req.user instanceof User)) {
    return res.status(401).json({ message: 'Usuario no autenticado o formato incorrecto' });
  }
*/

  if (!user) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  if (user.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
  }

  next(); // Si el rol es 'admin', continúa al siguiente middleware o controlador
}

export { checkRole, ensureAdminRole };
