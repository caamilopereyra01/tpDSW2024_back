import crypto from "node:crypto";
import { TipoVolquete } from "../tipovolquete/tipovolquete.entity.js";

export class Volquete {
  constructor(
    public marca: string,
    public fecha_fabricacion: Date,
    public fecha_compra: Date,
    public id_tipo_volquete: number,
    public tipo_volquete: TipoVolquete,
    public nro_volquete ?: number
  ) {}
}
