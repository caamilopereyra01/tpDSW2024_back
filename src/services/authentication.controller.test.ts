import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { controlerAuthenticateToken } from './authentication.controller';

jest.mock('jsonwebtoken');

describe('authenticateToken Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
    };
    next = jest.fn();
  });

  it('should return 401 if no authorization header is provided', () => {
    controlerAuthenticateToken.authenticateToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is missing', () => {
    req.headers!['authorization'] = 'Bearer valid-token';
    controlerAuthenticateToken.authenticateToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token is missing' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid or expired', () => {
    req.headers!['authorization'] = 'Bearer invalid-token';
    (jwt.verify as jest.Mock).mockImplementation((_, __, callback) => {
      callback(new Error('Invalid token'), null);
    });

    controlerAuthenticateToken.authenticateToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 if token payload is missing a valid user ID', () => {
    req.headers!['authorization'] = 'Bearer valid-token';
    (jwt.verify as jest.Mock).mockImplementation((_, __, callback) => {
      callback(null, { id: null });
    });

    controlerAuthenticateToken.authenticateToken(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token payload is missing a valid user ID' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() and set res.locals.user if token is valid', () => {
    req.headers!['authorization'] = 'Bearer valid-token';
    const decodedPayload = { id: 1, nombre_usuario: 'testuser', rol: 'admin' };
    (jwt.verify as jest.Mock).mockImplementation((_, __, callback) => {
      callback(null, decodedPayload);
    });

    controlerAuthenticateToken.authenticateToken(req as Request, res as Response, next);

    expect(res.locals!.user).toEqual(decodedPayload);
    expect(next).toHaveBeenCalled();
  });
});
