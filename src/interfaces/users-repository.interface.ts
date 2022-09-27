import { IfExists } from './generic-helpers';
import IUser from './user.interface';
import IBaseRepository from './base-repository.interface';

interface IUserRepository extends IBaseRepository<IUser> {
  getUserByLastName(lastName: string): IfExists<IUser>;
}

export default IUserRepository;
