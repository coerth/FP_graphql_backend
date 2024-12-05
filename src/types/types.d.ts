import { IUser } from '../mongoose/models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}