import IUserRepository from '../interfaces/users-repository.interface';
import { IUser, SerializedUser } from '../interfaces/user.interface';
import { IfExists } from '../interfaces/generic-helpers';
import shortid from 'shortid';
import Roles from '../enums/roles.enums';
import validateEmail from '../helpers/validateEmail';
import throwInvalidDataError from '../helpers/throwInvalidDataError';
import validateDate from '../helpers/validateDate';

class UsersRepository implements IUserRepository {
  private users: SerializedUser[] = [];

  addNew(data: IUser): SerializedUser {
    const newUser = {
      ...data,
      id: shortid(),
      role: Roles.CLIENT,
      dob: new Date(data.dob),
      addresses: [...data.addresses]
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, newData: IUser): IfExists<SerializedUser> {
    const dob: Date = new Date(newData.dob);
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...newData, dob: dob } : user
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

  getAll(): SerializedUser[] {
    return this.users;
  }

  getUsersByRole(role: string): SerializedUser[] {
    return this.users.filter((user) => user.role?.toLowerCase() === role.toLowerCase());
  }

  getById(id: string): IfExists<SerializedUser> {
    return this.users.find((user) => user.id === id);
  }

  validateBeforeSave(data: IUser): void {
    const { firstName, lastName, email, dob } = data;
    if (!firstName || !lastName || !email || !dob) throwInvalidDataError();
    if (!validateEmail(email)) throwInvalidDataError();
    if (!validateDate(dob)) throwInvalidDataError();
  }

  validateBeforeUpdate(data: IUser): void {
    this.validateBeforeSave(data);
  }
}

export default UsersRepository;
