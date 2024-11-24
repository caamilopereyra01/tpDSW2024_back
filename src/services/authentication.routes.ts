import pkg from 'express';
import { controlerAuthenticateToken } from './authentication.controller.js';
import { Request, Response, NextFunction, RequestHandler } from 'express';

const { Router } = pkg;
export const authenticationRouter = Router();

const checkTokenHandler: RequestHandler = (req: Request, res: Response) => {
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

