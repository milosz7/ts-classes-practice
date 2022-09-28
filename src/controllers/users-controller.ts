import UsersRepository from '../repositories/users-repository';
import IUser from '../interfaces/user.interface';
import BaseController from './base-controller';
import { IfExists } from '../interfaces/generic-helpers';

class UsersController extends BaseController<IUser> {
  constructor(private usersRepository: UsersRepository) {
    super(usersRepository);
  }

  getUsersByRole(role: string): IUser[] {
    return this.usersRepository.getUsersByRole(role);
  }
}

export default UsersController;
