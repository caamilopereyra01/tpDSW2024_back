import { Request, Response } from 'express';
import { orm } from '../shared/db/orm.js';
import { User } from './user.entity.js';
import { t } from '@mikro-orm/core';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


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
async function add(req: Request, res: Response) {
  try {
    const users = em.create(User, req.body);
    await em.flush();
    res.status(201).json({ message: 'User created', data: users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//----------------------------  UPDATE ----------------------------

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const user = em.getReference(User, id);
    em.assign(user, req.body);
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
        return res
          .status(400)
          .json({ message: 'La password no puede estar vacía' });
      }

    // Buscar usuario por nombre_usuario
      const user = await em.findOne(User, { nombre_usuario });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.password != password) {
        return res.status(401).json({ message: 'password incorrecta' });
      }

    // Crear un token JWT a partir del userId, nombre_usuario, rol
      const response = { id: user.id, nombre_usuario: user.nombre_usuario, rol:user.rol };
      const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN!,{expiresIn: '1h'});
      res.status(200).json({ message: 'Login exitoso', token: accessToken });

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
  recoverpassword
};
