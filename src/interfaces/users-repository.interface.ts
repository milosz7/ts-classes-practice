import { SerializedUser, IUser } from './user.interface';
import IBaseRepository from './base-repository.interface';

interface IUserRepository extends IBaseRepository<IUser, SerializedUser> {
  getUsersByRole(role: string): SerializedUser[];
}

export default IUserRepository;
