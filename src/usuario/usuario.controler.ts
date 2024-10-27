import  { NextFunction, Request, Response } from "express"
import { UsuarioRepository } from "./usuario.repository.js"
import { Usuario } from "./usuario.entity.js"
import jwt from 'jsonwebtoken';

const repository = new UsuarioRepository();


//---------------------------- DEFINO LA FUNCION SANITIZE ----------------------------

function sanitizeUsuarioInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
      nombre_usuario: req.body.nombre_usuario,
    };
    //mas chequeos

    Object.keys(req.body.sanitizedInput).forEach(key=>{
       if(req.body.sanitizedInput[key]===undefined) {
        delete req.body.sanitizedInput[key]
       }
    })
    next()
}



//----------------------------  GET ALL ----------------------------

async function findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
  }
  

//----------------------------  GET ONE ----------------------------

async function findOne(req: Request, res: Response) {
    const id = req.params.id_usuario //req.params.id   ?? 
    const usuario = await repository.findOne({ id })
    if (!usuario) {
      return res.status(404).send({ message: 'usuario not found' });
    }
    res.json({ data: usuario });
  }


//----------------------------  CREATE ----------------------------
async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const userInput = new Usuario(
      input.id_usuario,
      input.nombre_usuario,
      input.contraseña,
      input.rol
  )

  const usuario = await repository.add(userInput);
  return res.status(201).send({ message: 'usuario created', data: usuario })
}


//----------------------------  UPDATE ----------------------------



async function update(req: Request, res: Response) {
    const usuario = await repository.update(req.params.id_usuario, req.body.sanitizedInput)
  
    if (!usuario) {
      return res.status(404).send({ message: 'usuario not found' })
    }
  
    return res
      .status(200)
      .send({ message: 'usuario updated successfully', data: usuario });
  }


//----------------------------  DELETE ----------------------------
/*Cambia el nombre de Delete a Remove pq sino no funciona se ve que es palabra reservada o algo asi*/
  
async function remove(req: Request, res: Response) {
    const id = req.params.id_usuario
    const usuario = await repository.delete({ id })
  
    if (!usuario) {
      res.status(404).send({ message: 'usuario not found' });
    } else {
      res.status(200).send({ message: 'usuario deleted successfully' });
    }
  }

async function login(req:Request, res:Response){
  try{
      const user: Usuario = req.body;
      if (user.id_usuario !== undefined) {
        const dbUser = await repository.findOne({id: user.id_usuario.toString()});
        if (!dbUser || dbUser.contraseña != user.contraseña) {
          res.status(401).json({ message: 'Incorrect username or password' });
          return;
        }
        const token = jwt.sign({
            nombreUsuario:dbUser.nombre_usuario, role: dbUser.rol},process.env.ACCESS_TOKEN_SECRET || "secret", { expiresIn: '8h' });
        res.status(200).json({ token });
      }
      else{
        res.status(401).json({ message: 'Incorrect username or password' });
        return;
      }
    }
    catch(error){
      console.error(error);
      return res.status(500).json({message:"Internal server error"});
    }
  }

  const checkToken = (req: Request, res: Response) => {
    return res.status(200).json({ message: 'true' });
  };
  

export const contUser = {
  sanitizeUsuarioInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  login,
  checkToken,
};




