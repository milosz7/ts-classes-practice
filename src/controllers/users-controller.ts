import UsersRepository from '../repositories/users-repository';
import { IUser, SerializedUser } from '../interfaces/user.interface';
import BaseController from './base-controller';

class UsersController extends BaseController<IUser, SerializedUser> {
  constructor(private usersRepository: UsersRepository) {
    super(usersRepository);
  }

  validateBeforeSave(data: IUser): void {
    return this.usersRepository.validateBeforeSave(data);
  }

  validateBeforeUpdate(data: IUser): void {
    return this.usersRepository.validateBeforeUpdate(data);
  }

  getUsersByRole(role: string): SerializedUser[] {
    return this.usersRepository.getUsersByRole(role);
  }
}

export default UsersController;
