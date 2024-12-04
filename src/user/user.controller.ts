import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/db/orm.js';
import { UserRole, User } from './user.entity.js';
import { t } from '@mikro-orm/core';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';


dotenv.config();
const em = orm.em;

//----------------------------  GET ALL ----------------------------

async function findAll(req: Request, res: Response) {
  try {
    const users = await em.find(User, {}, { orderBy: { id: 'asc' } });
    res.status(200).json({ message: 'found all users', data: users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//----------------------------  GET ONE ----------------------------

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const users = await em.findOneOrFail(User, { id });
    res.status(200).json({ message: 'found users', data: users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmailByUsername(req: Request, res: Response) {
  const { nombreUsuario } = req.body;

  try {
    const user = await em.findOne(User, { nombre_usuario: nombreUsuario });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    return res.status(200).json({ email: user.email });

  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al obtener el correo', error });
  }
}



//----------------------------  CREATE ----------------------------
export async function add(req: Request, res: Response) {
  try {
    const { password, rol, ...userData } = req.body;  //extraigo la constraseña del cuerpo para manejarla por separado y hashearla
    //Capturo el resto de las propiedades de req.body (todas las propiedades excepto password) y las coloco en un nuevo objeto llamado userData.
    if (!password) {
      return res.status(400).json({ message: 'La contraseña es requerida' });
    }

    // Validar el rol
    if (rol && !Object.values(UserRole).includes(rol)) {
      return res.status(400).json({ message: 'Rol inválido' });
    }

    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = em.create(User, { ...userData, password: hashedPassword, rol });
    await em.flush();

    res.status(201).json({ message: 'User created', ...user, password: undefined }); //la respuesta va sin la password asì no la exponemos nunca
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//----------------------------  UPDATE ----------------------------

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const user = await em.findOneOrFail(User, id);

    const { password, ...updateData } = req.body;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    em.assign(user, updateData);
    await em.flush();
    res.status(200).json({ message: 'User updated' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//----------------------------  DELETE ----------------------------
/*Cambia el nombre de Delete a Remove pq sino no funciona se ve que es palabra reservada o algo asi*/

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const usuarioEliminar = em.getReference(User, id);
    await em.removeAndFlush(usuarioEliminar);
    res.status(200).send({ message: 'User deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req: Request, res: Response) {
  const { nombre_usuario, password } = req.body;

  try {
    //Verificamos que la contraseña no esté vacía
      if (!password || password.trim() === '') {
        return res.status(400).json({ message: 'La password no puede estar vacía' });
      }

      if (!nombre_usuario || nombre_usuario.trim()==='') {
        return res.status(400).json({ message: 'Nombre de usuario requerido' });
      }

    // Buscar usuario por nombre_usuario
      const user = await em.findOne(User, { nombre_usuario });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }


      // Verificamos la contraseña ingresada con el hash almacenado
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

    // Crear un token JWT a partir del userId, nombre_usuario, rol
      const response = { 
        id: user.id, 
        nombre_usuario: user.nombre_usuario, 
        rol:user.rol 
      };

      const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN!,{expiresIn: '1h'});
      res.status(200).json({ message: 'Login exitoso', 
        token: accessToken,
        usuario: {
          nombre_usuario: user.nombre_usuario,
          rol: user.rol
        }
       });

  } catch(error:any){
      res.status(500).json({ message: error.message });
  }
}

async function signup(req: Request, res: Response) {

}

var transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

async function recoverpassword(req: Request, res: Response) {
  const { email } = req.body;
  try {
    
    const user = await em.findOne(User, { email }); 
    
    //hay que poner await porque em.findOne es ASINCRONA (devuelve una PROMESA)
    // Sin await, la variable user almacenaría LA PROMESA EN SÍ y no el resultado.
    // Entonces después sin el await nos aparecía ERROR en user.id, por ejemplo.
    // Con el await le decís que ESPERE la resolución de la promesa antes de continuar.
    // Otra opción es manejar la promesa con .then() y .catch()
    
    if (!user) {
      //return res.status(404).json({ message: 'User not found' });
      return res
        .status(200)
        .json({ message: '(-) Password sent successfully to your email  !' });
        // mandamos esta respuesta para que no se sepa que no existe este usuario.
    }
    
    var mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password by Volquetes',
      html: '<p><b>Yout Login details for Volquetes </b><br><b>Email:</b>'+user.email+'<br><b>Password: </b>'+user.password+'<br><a href="http://localhost:4200"></a>Click here to login</p>'
    };
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error);
        
      }else{
        console.log('Email sent: '+info.response);
      }
    });
    return res.status(200).json({message:"Password sent successfully to your email."});
    
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
}

async function getRolByUsername(req: Request, res: Response) {
  const { nombre_usuario } = req.params;
  try {
    const user = await em.findOne(User, { nombre_usuario });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ rol: user.rol });
  } catch(error:any) {
    res.status(500).json({ message: error.message });
  }
}

// Middleware para verificar la contraseña
export const conU = {
  findAll,
  //findVolquetes,
  findOne,
  add,
  update,
  getEmailByUsername,
  remove,
  login,
  signup,
  recoverpassword,
  getRolByUsername
};
