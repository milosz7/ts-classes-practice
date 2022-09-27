import IProductRepository from '../interfaces/product-repository.interface';
import IProduct from '../interfaces/product.interface';
import shortid from 'shortid';
import { IfExists } from '../interfaces/generic-helpers';

class ProductsRepository implements IProductRepository {
  private products: IProduct[] = [];

  private getCurrentTime(): Date {
    return new Date();
  }

  getAll() {
    return this.products;
  }

  getProductByName(name: string) {
    return this.products.find((product) => product.name === name);
  }

  getById(id: string): IfExists<IProduct> {
    return this.products.find((product) => product.id === id);
  }

  addNew(item: IProduct): IProduct {
    const currentTime = this.getCurrentTime();
    item.id = shortid();
    item.created = currentTime;
    item.modified = currentTime;
    this.products.push(item);
    return item;
  }

  update(id: string, newData: IProduct) {
    const currentTime = this.getCurrentTime();
    this.products = this.products.map((product) =>
      product.id === id
        ? { ...newData, modified: currentTime, id: product.id, created: product.created }
        : product
    );

    return this.getById(id);
  }

  delete(id: string): boolean {
    const toRemoveIdx = this.products.findIndex(product => product.id === id);
    if (toRemoveIdx !== -1) {
      this.products.splice(toRemoveIdx, 1);
      return true;
    }
    return false;
  }
}

export default ProductsRepository;
