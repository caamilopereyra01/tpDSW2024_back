import crypto from "node:crypto";

export class Usuario {
  constructor(
    public nombre_usuario: string,
    public hash: string,
    public rol: string,
    public id_usuario?: number
  ) {}
}
