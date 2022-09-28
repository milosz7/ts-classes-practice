import IProductRepository from '../interfaces/product-repository.interface';
import { IProduct, SerializedProduct } from '../interfaces/product.interface';
import shortid from 'shortid';
import { IfExists } from '../interfaces/generic-helpers';
import throwInvalidDataError from '../helpers/throwInvalidDataError';

class ProductsRepository implements IProductRepository {
  private products: SerializedProduct[] = [];

  private getCurrentTime(): Date {
    return new Date();
  }

  getAll(): SerializedProduct[] {
    return this.products;
  }

  getProductByName(name: string) {
    return this.products.find((product) => product.name === name);
  }

  getById(id: string): IfExists<SerializedProduct> {
    return this.products.find((product) => product.id === id);
  }

  addNew(item: IProduct): SerializedProduct {
    const currentTime = this.getCurrentTime();
    const serializedItem: SerializedProduct = {
      id: shortid(),
      name: item.name,
      price: +item.price,
      count: +item.count,
      tags: [...item.tags],
      created: currentTime,
      modified: currentTime,
    };
    this.products.push(serializedItem);
    return serializedItem;
  }

  update(id: string, newData: IProduct): IfExists<SerializedProduct> {
    const currentTime = this.getCurrentTime();
    const serializedNewData = {
      ...newData,
      price: +newData.price,
      count: +newData.count,
    };
    this.products = this.products.map((product) =>
      product.id === id ? { ...product, ...serializedNewData, modified: currentTime } : product
    );

    return this.getById(id);
  }

  delete(id: string): boolean {
    const toRemoveIdx = this.products.findIndex((product) => product.id === id);
    if (toRemoveIdx !== -1) {
      this.products.splice(toRemoveIdx, 1);
      return true;
    }
    return false;
  }

  validateBeforeSave(data: IProduct): void {
    const { name, price, count, tags } = data;
    if (!name || !parseInt(price) || !parseInt(count)) {
      throwInvalidDataError();
    }
    tags.forEach((tag) => {
      if (typeof tag !== 'string') {
        throwInvalidDataError();
      }
    });
  }

  validateBeforeUpdate(data: IProduct): void {
    this.validateBeforeSave(data);
  }
}

export default ProductsRepository;
