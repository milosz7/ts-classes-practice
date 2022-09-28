import BaseController from './base-controller';
import {IProduct, SerializedProduct} from '../interfaces/product.interface';
import IProductRepository from '../repositories/products-repository';
import { IfExists } from '../interfaces/generic-helpers';

class ProductsController extends BaseController<IProduct, SerializedProduct> {
  constructor(private productsRepository: IProductRepository) {
    super(productsRepository);
  }

  validateBeforeSave(data: IProduct) {
    return this.productsRepository.validateBeforeSave(data);
  }

  validateBeforeUpdate(data: IProduct) {
    return this.productsRepository.validateBeforeUpdate(data);
  }

  getProductByName(name: string): IfExists<SerializedProduct> {
    return this.productsRepository.getProductByName(name);
  }
}

export default ProductsController;
