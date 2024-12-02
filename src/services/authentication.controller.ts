import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';



dotenv.config();

function authenticateToken( req: Request, res: Response, next: NextFunction): Response | void {
  //Busca info en el header
    console.log('Endpoint /checkToken llamado');
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      console.log('No se envió Token');
      return res.status(401).json({ error: 'No token provided' });
    }

    //const token = authHeader && authHeader.split(' ')[1];
    const token = authHeader.split(' ')[1];

    if (!token) {
      console.log('Token no válido');

      return res.status(401).json({ message: 'Token is missing' });
    }

  jwt.verify(token, process.env.ACCESS_TOKEN as string, (err, decoded) => {
    /*  El método VERIFY no requiere los mismos datos que usé para generar el token (en nuestro caso usamos userid, nombre_usuario y rol)
    El propósito del verify es validar el token usando sólo la clave secreta que guardamos en process.env.access_token
    Al hacer el sign (que lo hacemos en user.controller.ts - en el login), se genera un token que incluye un payload y se asegura con una 
    clave secreta que guardamos en ACCESS_TOKEN
    Luego, el Verify verifica que el token no haya sido alterado. Si es valido vemos que decodifica el payload (payload = decoded) con la
    info que almacenamos al crear el token (id, nombre_usuario, rol, ...). O sea: el payload es la info guardada en el token, y al verificarla
    la decodificamos, la sacamos del token.
    */

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