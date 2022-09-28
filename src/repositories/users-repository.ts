import IUserRepository from '../interfaces/users-repository.interface';
import IUser from '../interfaces/user.interface';
import { IfExists } from '../interfaces/generic-helpers';
import shortid from 'shortid';
import Roles from '../enums/roles.enums';

class UsersRepository implements IUserRepository {
  private users: IUser[] = [];

  addNew(data: IUser): IUser {
    const newUser = {
      ...data,
      id: shortid(),
      role: Roles.CLIENT,
      dob: new Date(data.dob),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, newData: IUser): IfExists<IUser> {
    const dob: Date = new Date(newData.dob);
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...newData, dob: dob, } : user
    );
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

  getUsersByRole(lastName: string): IUser[] {
    return this.users.filter((user) => user.lastName.toLowerCase() === lastName.toLowerCase());
  }

  getById(id: string): IfExists<IUser> {
    return this.users.find((user) => user.id === id);
  }
}

export default UsersRepository;
