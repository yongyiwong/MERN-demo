import { ErrorCodes } from 'errorhandling/error.code';
import { UserLoginDto } from './dto/user.login.dto';
import { IUser } from './interface/user.interface';
import Users from './schema/user.schema';
import * as bcrypt from 'bcrypt';

export default class UserService {
  // create
  public async create(createUser: IUser): Promise<IUser> {
    const user = new Users(createUser);
    return await user.save();
  }

  public async findByEmail(email: string): Promise<IUser> {
    return Users.findOne({ email });
  }

  public async findByLogin(userLogin: UserLoginDto): Promise<IUser> {
    const user = await Users.findOne({
      email: userLogin.email,
    });
    if (!user) {
      return null;
    }

    if (!(await bcrypt.compare(userLogin.password, user.password))) {
      return null;
    }

    return user;
  }

  public async getById(userId: string): Promise<IUser> {
    try {
      const user = await Users.findById(userId);
      return user;
    } catch (error) {
      //console.log(error);
    }
    return null;
  }
}
