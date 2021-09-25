import { IUser } from 'modules/user/interface/user.interface';

export interface IPost {
  id?: String;
  title: String;
  content: String;
  creator: IUser;
  created_at?: String;
  updated_at?: String;
}
