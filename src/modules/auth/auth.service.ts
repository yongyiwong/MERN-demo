import { ErrorCodes } from '../../errorhandling/error.code';
import { sign } from 'jsonwebtoken';
import UserService from '../../modules/user/user.service';
import { AuthRegisterRequestDto } from './dto/auth.register.request.dto';
import { IUser } from '../user/interface/user.interface';
import { AuthRegisterResponse } from './dto/auth.register.response';
import { AuthLoginRequestDto } from './dto/auth.login.request.dto';
import { AuthLoginResponse } from './dto/auth.login.response';
import { UserLoginDto } from 'modules/user/dto/user.login.dto';
import { IPayLoad } from './interface/auth.payload';

export default class AuthService {
  private userService: UserService = new UserService();

  public async register(
    request: AuthRegisterRequestDto
  ): Promise<AuthRegisterResponse> {
    const response = new AuthRegisterResponse();

    const userAlready = await this.userService.findByEmail(request.email);
    if (userAlready) {
      response.code = ErrorCodes.RegisterUserAlreadyExist;
      return response;
    }

    const createUser: IUser = {
      name: request.name,
      email: request.email,
      password: request.password,
    };

    let user: IUser;
    try {
      user = await this.userService.create(createUser);
    } catch (error) {
      console.log(error);
      response.code = ErrorCodes.RegisterUserCreateError;
      return response;
    }

    const payload: IPayLoad = { email: user.email, name: user.name };
    const token = sign(payload, process.env.SECRET_KEY, {
      expiresIn: '12h',
    });

    response.code = 0;
    response.token = token;
    return response;
  }

  public async login(request: AuthLoginRequestDto): Promise<AuthLoginResponse> {
    const response = new AuthLoginResponse();

    const userLogin: UserLoginDto = {
      email: request.email,
      password: request.password,
    };

    const user = await this.userService.findByLogin(userLogin);
    if (!user) {
      response.code = ErrorCodes.LoginInvalidCredentials;
      return response;
    }

    const payload: IPayLoad = { email: user.email, name: user.name };
    const token = sign(payload, process.env.SECRET_KEY, {
      expiresIn: '12h',
    });

    response.code = 0;
    response.token = token;
    return response;
  }
}
