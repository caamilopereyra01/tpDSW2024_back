import { Request, Response } from 'express';
import { conU } from './user.controller'; // Importo la función a testear
import bcrypt from 'bcrypt';
import { EntityManager } from '@mikro-orm/core';
import { User } from './user.entity'; // 

jest.mock('bcrypt');
jest.mock('../shared/db/orm.js', () => ({
    orm: {
      em: {
        create: jest.fn(),
        flush: jest.fn(),
      },
    },
  }));
  
describe('User Controller - add', () => {
  let em: jest.Mocked<EntityManager>; // Mock del EntityManager de MikroORM para no hacer operaciones reales en la BD
  let req: Partial<Request>; // Mock del Request de Express
  let res: Partial<Response>; // Mock del Response de Express
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;  //Simulaciones de los métodos de res.status y res.json.

  //Inicialización de mocks antes de cada prueba
  beforeEach(() => {
    // Mock de EntityManager
    em = {
      create: jest.fn(), //simulamos la opcion de crear un usuario
      flush: jest.fn(),  //simulamos la opcion de confirmar los cambios en la BD
    } as unknown as jest.Mocked<EntityManager>;

    // Mock de Request. Inicializamos un objeto con el cuerpo esperado de la solicitud para agregar un usuario
    req = {
      body: {
        nombre_usuario: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        rol: 'user',
      },
    };

    // Mock de Response
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({
      json: jsonMock,
    }));

    res = {
      status: statusMock,
    } as unknown as Partial<Response>;

    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  it('should create a new user and return 201 status code', async () => {
    // Mock de bcrypt.hash
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');

    // Mock de em.create y em.flush
    em.create.mockReturnValue({
      id: 1,
      nombre_usuario: 'testuser',
      email: 'test@example.com',
      rol: 'user',
    } as User);

    // Ejecutar la función
    await conU.add(req as Request, res as Response);

    // Asegurarse de que bcrypt.hash fue llamado
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);

    // Asegurarse de que se creó el usuario con los datos correctos
    expect(em.create).toHaveBeenCalledWith(User, {
      nombre_usuario: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword123',
      rol: 'user',
    });

    // Asegurarse de que se llamó a flush
    expect(em.flush).toHaveBeenCalled();

    // Verificar la respuesta correcta
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'User created',
      id: 1,
      nombre_usuario: 'testuser',
      email: 'test@example.com',
      rol: 'user',
      password: undefined,
    });
  });

  it('should return 400 if password is missing', async () => {
    req.body.password = undefined;

    await conU.add(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'La contraseña es requerida' });
  });

  it('should return 500 on error', async () => {
    em.flush.mockRejectedValue(new Error('Database error'));

    await conU.add(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
