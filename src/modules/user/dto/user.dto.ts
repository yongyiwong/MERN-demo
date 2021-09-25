import { IUser } from '../interface/user.interface';

export class UserDto {
  id: String;
  name: String;
  email?: String;
  created_at: String;
  updated_at: String;

  public static iUserFactory(iUser: IUser) {
    const user = new UserDto();

    user.id = iUser.id;
    user.name = iUser.name;
    user.email = iUser.email;
    user.created_at = iUser.created_at;
    user.updated_at = iUser.updated_at;

    return user;
  }

  public static iUserFactoryGeneral(iUser: IUser) {
    const user = new UserDto();

    user.id = iUser.id;
    user.name = iUser.name;
    user.created_at = iUser.created_at;
    user.updated_at = iUser.updated_at;

    return user;
  }
}
