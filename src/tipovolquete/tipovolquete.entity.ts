import crypto from "node:crypto";

export class TipoVolquete {
  constructor(
    public id_tipo_volquete = crypto.randomUUID(),
    public descripcion_tipo_volquete: string
    
  ) {}
}
