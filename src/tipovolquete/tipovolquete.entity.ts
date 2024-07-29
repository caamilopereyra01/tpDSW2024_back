import crypto from "node:crypto";

export class TipoVolquete {
  constructor(
    public descripcion_tipo_volquete: string,
    public id_tipo_volquete ?: number
  ) {}
}
