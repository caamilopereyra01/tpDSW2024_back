import { Request, Response } from 'express';
import { orm } from '../shared/db/orm.js';
import { User } from './user.entity.js';
import { t } from '@mikro-orm/core';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const em = orm.em;

//----------------------------  GET ALL ----------------------------

async function findAll(req: Request, res: Response) {
  try {
    const users = await em.find(User, {});
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

    // Crear un token JWT
      const response = { id: user.id, nombre_usuario: user.nombre_usuario };
      const accessToken = jwt.sign(
        response,
        process.env.ACCESS_TOKEN || 'default_secret_key',
        {
          expiresIn: '1h',
        }
      );
      res.status(200).json({ message: 'Login exitoso', token: accessToken });
  } catch(error:any){
      res.status(500).json({ message: error.message });
  }
}

async function signup(req: Request, res: Response) {

}


export const conU = {
  findAll,
  //findVolquetes,
  findOne,
  add,
  update,
  remove,
  login,
  signup
};
