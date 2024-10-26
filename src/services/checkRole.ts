import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export function checkRole(req: Request, res: Response, next: NextFunction): Response | void {
  if (res.locals.role === process.env.USER) {
    return res.sendStatus(401); // Si el rol coincide, responde con 401 y detiene el flujo
  } else {
    next(); // Si el rol no coincide, pasa el control a la siguiente función middleware o a la ruta
  }
}
