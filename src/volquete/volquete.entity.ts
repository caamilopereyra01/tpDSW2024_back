import crypto from "node:crypto";

export class Volquete {
  constructor(
    public marca: string,
    public fecha_fabricacion: Date,
    public fecha_compra: Date,
    public id_tipo_volquete: number,
    public nro_volquete ?: number
  ) {}
}
