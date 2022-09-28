import { IfExists, IsExtendable } from './generic-helpers';

interface IBaseRepository<T, K = void> {
  getAll(): (IsExtendable<T, K>)[];
  getById(id: string): IfExists<IsExtendable<T, K>>;
  update(id: string, newData: T): IfExists<IsExtendable<T, K>>;
  delete(id: string): boolean;
  addNew(item: T): IsExtendable<T, K>;
  validateBeforeSave(data: T): void;
  validateBeforeUpdate(data: T): void;
}

export default IBaseRepository;
