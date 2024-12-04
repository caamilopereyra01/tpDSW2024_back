import { Request, Response } from 'express';
import { conU } from './user.controller'; // Importo la función a testear
import bcrypt from 'bcrypt';
import { EntityManager } from '@mikro-orm/core';
import { User } from './user.entity'; // 
import { orm } from '../shared/db/orm.js';


const mockCreate = jest.fn();
const mockFlush = jest.fn();



  jest.mock('../shared/db/orm.js', () => ({
    orm: {
      em: {
        create: jest.fn(),
        flush: jest.fn(),
      },
    },
  }));

  jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword123'),
  }));

describe('User Controller - Add', () => {

    beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should accept a role not included in the UserRole enum', async () => {
        const req = {
          body: {
            nombre_usuario: 'testuser',
            email: 'test@example.com',
            password: 'securePassword123',
            rol: 'invalidRole', // Rol que no pertenece al enum UserRole
          },
        } as Partial<Request>;
    
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as unknown as Response;
    
        // Mock de bcrypt.hash para evitar hashing real
        // jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword123');
    
        // Ejecutar el método add
        await conU.add(req as Request, res);
    
        // Verificar que em.create fue llamado con el rol "invalidRole"
        expect(mockCreate).toHaveBeenCalledWith(User, {
          nombre_usuario: 'testuser',
          email: 'test@example.com',
          password: 'hashedPassword123',
          rol: 'invalidRole', // Rol no validado, lo acepta
        });
    
        // Verificar que la respuesta del servidor es 201
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
          expect.objectContaining({
            message: 'User created',
            nombre_usuario: 'testuser',
            email: 'test@example.com',
            rol: 'invalidRole',
          })
        );
      });
    


  it('should create a user with the correct data', async () => {
    const mockCreate = orm.em.create as jest.Mock;
    const mockFlush = orm.em.flush as jest.Mock;

    // Mock request and response
    const req = {
      body: {
        nombre_usuario: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        rol: 'user',
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Simula el retorno de em.create
    mockCreate.mockReturnValue({
      id: 1,
      nombre_usuario: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword123',
      rol: 'user',
    });

    await conU.add(req, res);

    // Verifica que em.create fue llamado correctamente
    expect(mockCreate).toHaveBeenCalledWith(User, {
      nombre_usuario: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword123', // El hash simulado
      rol: 'user',
    });

    // Verifica que em.flush fue llamado
    expect(mockFlush).toHaveBeenCalled();

    // Verifica que la respuesta sea la correcta
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User created',
      id: 1,
      nombre_usuario: 'testuser',
      email: 'test@example.com',
      password: undefined, // Contraseña no expuesta
      rol: 'user',
    });
  });
});