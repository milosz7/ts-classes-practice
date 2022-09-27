import IUserRepository from '../interfaces/users-repository.interface';
import IUser from '../interfaces/user.interface';
import { IfExists } from '../interfaces/generic-helpers';
import shortid from 'shortid';

class UsersRepository implements IUserRepository {
  private users: IUser[] = [];

  addNew(data: IUser): IUser {
    const newUser = {
      ...data,
      id: shortid(),
    };
    return newUser;
  }

  update(id: string, newData: IUser): IfExists<IUser> {
    this.users.map((user) => (user.id === id ? { ...newData, id: user.id } : user));
    return this.getById(id);
  }

  delete(id: string): boolean {
    const toRemoveIdx = this.users.findIndex((user) => user.id === id);
    if (toRemoveIdx !== -1) {
      this.users.splice(toRemoveIdx, 1);
      return true;
    }
    return false;
  }

  getAll(): IUser[] {
    return this.users;
  }

  getUserByLastName(lastName: string): IfExists<IUser> {
    return this.users.find((user) => user.lastName === lastName);
  }

  getById(id: string): IfExists<IUser> {
    return this.users.find((user) => user.id === id);
  }
}

export default UsersRepository;
