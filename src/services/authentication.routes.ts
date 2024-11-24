import pkg from 'express';
import { controlerAuthenticateToken } from './authentication.controller.js';
import { Request, Response, NextFunction, RequestHandler } from 'express';

const { Router } = pkg;
export const authenticationRouter = Router();

const checkTokenHandler: RequestHandler = (req: Request, res: Response) => {
  // Recuperar el usuario de res.locals
  const user =res.locals.user;
  if(!user){
    return res.status(401).json({message:'User not found'});
  }
  return res.status(200).json({
    valid: true,
    user,
  });
};

authenticationRouter.get(
  '/checkToken',
  controlerAuthenticateToken.authenticateToken,
  (req: Request, res: Response) => {
    // Send response after token is verified
    checkTokenHandler;
  }
);

