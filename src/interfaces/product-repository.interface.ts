import BaseRepository from './base-repository.interface';
import IProduct from './product.interface';
import {IfExists} from './generic-helpers';

interface IProductRepository extends BaseRepository<IProduct> {
  getProductByName(name: string): IfExists<IProduct>;
}

export default IProductRepository;
