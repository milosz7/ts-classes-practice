import express from 'express';
import ProductsController from '../controllers/products-controller';
import ProductsRepository from '../repositories/products-repository';
import IProduct from '../interfaces/product.interface';
import { internalServerError } from '../constants';
import CustomError from '../helpers/custom-error';

const repository = new ProductsRepository();
const controller = new ProductsController(repository);

const router = express.Router();

router.get('/', (_, res, next) => {
  try {
    const data = controller.getAll();
    if (!data.length) throw new CustomError(404, 'Not found.');
    return res.json(data);
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

router.get('/:id', (req, res, next) => {
  const id: string = req.params.id;
  try {
    const data = controller.getById(id);
    if (!data) throw new CustomError(404, `Data with id: ${id} was not found.`);
    return res.json(data);
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

router.get('/name/:name', (req, res, next) => {
  const name: string = req.params.name;
  try {
    const data = controller.getProductByName(name);
    if (!data) throw new CustomError(404, `Product with name: ${name} was not found.`);
    return res.json(data);
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

router.put('/:id', (req, res, next) => {
  const id: string = req.params.id;
  const item: IProduct = req.body;
  try {
    return res.json(controller.update(id, item));
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

router.delete('/:id', (req, res, next) => {
  const id: string = req.params.id;
  try {
    return res.json(controller.delete(id));
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

router.post('/', (req, res, next) => {
  try {
    return res.json(controller.addNew(req.body as IProduct));
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

export default router;
