import BaseController from './base-controller';
import IProduct from '../interfaces/product.interface';
import IProductRepository from '../repositories/products-repository';
import { IfExists } from '../interfaces/generic-helpers';

class ProductsController extends BaseController<IProduct> {
  constructor(private productsRepository: IProductRepository) {
    super(productsRepository);
  }

  getProductByName(name: string): IfExists<IProduct> {
    return this.productsRepository.getProductByName(name);
  }
}

export default ProductsController;
