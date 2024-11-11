import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

function authenticateToken( req: Request, res: Response, next: NextFunction): Response | void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.ACCESS_TOKEN as string, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    res.locals = decoded as JwtPayload;
    next();
  });
}

export { authenticateToken };
