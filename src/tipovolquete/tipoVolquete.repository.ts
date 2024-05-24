/*import { Repository } from '../shared/repository.js';
import { TipoVolquete } from './tipovolquete.entity.js';
const repository = new TipoVolqueteRepository();

const tiposVolquetes = [
  new TipoVolquete('1', 'Chico'),
  new TipoVolquete('2', 'Mediano'),
  new TipoVolquete('3', 'Grande'),
];

export class TipoVolqueteRepository implements Repository<TipoVolquete> {
  public findAll(): TipoVolquete[] | undefined {
    return tiposVolquetes;
  }

  public findOne(item: { id: string }): TipoVolquete | undefined {
    return tiposVolquetes.find((tipoVolquete) => tipoVolquete.id === item.id);
  }

  public add(item: TipoVolquete): TipoVolquete | undefined {
    tiposVolquetes.push(item);
    return item;
  }

  public delete(item: { id: string }): TipoVolquete | undefined {
    const tipoVolqueteIdx = tiposVolquetes.findIndex(
      (tipoVolquete) => tipoVolquete.id === item.id
    );
    if (tipoVolqueteIdx !== -1) {
      const deletedTiposVolquetes = tiposVolquetes[tipoVolqueteIdx];
      tiposVolquetes.splice(tipoVolqueteIdx, 1);
      return deletedTiposVolquetes;
    }
  }
}
*/