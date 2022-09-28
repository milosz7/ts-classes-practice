import Roles from '../enums/roles.enums';

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  addresses: string[];
  role?: Roles
}

export interface SerializedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  addresses: string[];
  role: Roles
}
