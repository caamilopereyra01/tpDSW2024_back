import dotenv from 'dotenv'; 
import jwt, {JwtPayload} from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

dotenv.config();

export function authenticateToken(req: Request, res: Response, next: NextFunction): Response | void{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token){
    return res.sendStatus(401);
  }

  jwt.verify(token,process.env.ACCESS_TOKEN as string, (err,decoded)=>{
    if(err){
      return res.sendStatus(403); // FORBIDDEN ACCESS
    }
    res.locals=decoded as JwtPayload;
    next();
  });

  
}