import express from 'express';
import ProductsController from '../controllers/products-controller';
import ProductsRepository from '../repositories/products-repository';
import { IProduct } from '../interfaces/product.interface';
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
  controller.validateBeforeUpdate(req.body);
  const item: IProduct = req.body;
  try {
    const data = controller.update(id, item);
    if (!data) throw new CustomError(404, 'Could not find any data to edit.');
    return res.json(data);
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
    const response = controller.delete(id);
    if (!response) throw new CustomError(404, 'Could not find any data to delete.');
    return res.status(200).json({ message: 'Success!' });
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

router.post('/', (req, res, next) => {
  try {
    controller.validateBeforeSave(req.body);
    return res.json(controller.addNew(req.body as IProduct));
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

export default router;
