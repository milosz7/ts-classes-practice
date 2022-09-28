import BaseRepository from '../interfaces/base-repository.interface';
import { IfExists, IsExtendable } from '../interfaces/generic-helpers';

abstract class BaseController<T, K = void> {
  constructor(private repository: BaseRepository<T, K>) {}

  getAll(): (IsExtendable<T, K>)[] {
    return this.repository.getAll();
  }

  addNew(item: T): IsExtendable<T, K> {
    return this.repository.addNew(item);
  }

  update(id: string, item: T): IfExists<IsExtendable<T, K>> {
    return this.repository.update(id, item);
  }

  delete(id: string): boolean {
    return this.repository.delete(id);
  }

  getById(id: string): IfExists<IsExtendable<T, K>> {
    return this.repository.getById(id);
  }
}

export default BaseController;
