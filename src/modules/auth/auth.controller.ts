import AuthService from './auth.service';
import { AuthRegisterRequestDto } from './dto/auth.register.request.dto';
import { AuthLoginRequestDto } from './dto/auth.login.request.dto';
import { NextFunction, Request, Response } from 'express';
import errorMessages from '../../errorhandling/error.code';

export class AuthController {
  private authService: AuthService = new AuthService();

  public async register(
    authRegisterRequest: AuthRegisterRequestDto,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const response = await this.authService.register(authRegisterRequest);

    if (response.code !== 0) {
      res.status(errorMessages[response.code]['status']).send({
        code: response.code,
        error: errorMessages[response.code]['message']['cn'],
      });
      return;
    }

    res.send(response);
  }

  public async login(
    authLoginRequest: AuthLoginRequestDto,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const response = await this.authService.login(authLoginRequest);
    if (response.code !== 0) {
      res.status(errorMessages[response.code]['status']).send({
        code: response.code,
        error: errorMessages[response.code]['message']['cn'],
      });
      return;
    }

    res.send(response);
  }
}
