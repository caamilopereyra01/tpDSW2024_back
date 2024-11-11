import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

function checkRole(  req: Request,  res: Response,  next: NextFunction): Response | void {
  if (res.locals.role === process.env.USER) {
    return res.sendStatus(401); // Unauthorized
  } else {
    next();
  }
}

export { checkRole };
