import {IfExists} from './generic-helpers';

interface IBaseRepository<T> {
  getAll(): T[];
  getById(id: string): IfExists<T>;
  update(id: string, newData: T): IfExists<T>;
  delete(id: string): boolean;
  addNew(item: T): T;
}

export default IBaseRepository;
