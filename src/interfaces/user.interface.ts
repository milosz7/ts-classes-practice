import Roles from '../enums/roles.enums';

interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  addresses?: string[];
  role?: Roles
}

export default IUser;
