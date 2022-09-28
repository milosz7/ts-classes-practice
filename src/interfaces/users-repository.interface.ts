import IUser from './user.interface';
import IBaseRepository from './base-repository.interface';

interface IUserRepository extends IBaseRepository<IUser> {
  getUsersByRole(role: string): IUser[];
}

export default IUserRepository;
