import crypto from "node:crypto";

export class Usuario {
  constructor(
    public nombre_usuario: string,
    public contraseña: string,
    public rol: string,
    public id_usuario?: number
  ) {}
}
