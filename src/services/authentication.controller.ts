import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

function authenticateToken( req: Request, res: Response, next: NextFunction): Response | void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' }); // Forbidden
      
    }

    const payload = decoded as JwtPayload;
    if (!payload.id || typeof payload.id !== 'number') {
      return res
        .status(400)
        .json({ error: 'Token payload is missing a valid user ID' }); // Bad Request
    }
     //Uso esta opcion de abajo porque el Next() me permite reusarla en otros Routes que necesiten authentication
    res.locals.user = payload;
    next();
  });
}


export const controlerAuthenticateToken = {
    authenticateToken,
}