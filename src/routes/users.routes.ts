import express from 'express';
import UsersRepository from '../repositories/users-repository';
import UsersController from '../controllers/users-controller';
import { internalServerError } from '../constants';
import { IUser } from '../interfaces/user.interface';
import CustomError from '../helpers/custom-error';

const repository = new UsersRepository();
const controller = new UsersController(repository);

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

router.post('/', (req, res, next) => {
  try {
    controller.validateBeforeSave(req.body);
    const user: IUser = req.body;
    return res.json(controller.addNew(user));
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const id: string = req.params.id;
    const data = controller.getById(id);
    if (!data) throw new CustomError(404, `User data with: ${id} does not exist.`);
    return res.json(data);
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

router.get('/role/:role', (req, res, next) => {
  try {
    const role = req.params.role;
    const data = controller.getUsersByRole(role);
    if (!data.length) throw new CustomError(404, `Users data with role: ${role} was not found.`);
    return res.json(data);
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    const response = controller.delete(id);
    if (!response) throw new CustomError(404, 'Could not find data to delete.');
    return res.status(200).json({ message: 'Success!' });
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    controller.validateBeforeUpdate(req.body);
    const user: IUser = req.body;
    const data = controller.update(id, user);
    if (!data) throw new CustomError(404, 'Could not find data to edit.');
    return res.json(data);
  } catch (err) {
    if (err instanceof CustomError) {
      return next({ status: err.status, message: err.message });
    }
    return next(internalServerError);
  }
});

export default router;
