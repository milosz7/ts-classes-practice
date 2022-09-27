import BaseRepository from '../interfaces/base-repository.interface';
import { IfExists } from '../interfaces/generic-helpers';

abstract class BaseController<T> {
  constructor(private repository: BaseRepository<T>) {}

  getAll(): T[] {
    return this.repository.getAll();
  }

  addNew(item: T): T {
    return this.repository.addNew(item);
  }

  update(id: string, item: T): IfExists<T> {
    return this.repository.update(id, item);
  }

  delete(id: string): boolean {
    return this.repository.delete(id);
  }

  getById(id: string): IfExists<T> {
    return this.repository.getById(id);
  }
}

export default BaseController;
