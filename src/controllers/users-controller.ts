import UsersRepository from '../repositories/users-repository';
import IUser from '../interfaces/user.interface';
import BaseController from './base-controller';
import { IfExists } from '../interfaces/generic-helpers';

class UsersController extends BaseController<IUser> {
  constructor(private usersRepository: UsersRepository) {
    super(usersRepository);
  }

  getByLastName(name: string): IfExists<IUser> {
    return this.usersRepository.getUserByLastName(name);
  }
}

export default UsersController;
