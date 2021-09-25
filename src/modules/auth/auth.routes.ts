import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import errorMessages, { ErrorCodes } from '../../errorhandling/error.code';
import { Application, NextFunction, Request, Response } from 'express';
import { AuthController } from './auth.controller';
import { AuthRegisterRequestDto } from './dto/auth.register.request.dto';
import { AuthLoginRequestDto } from './dto/auth.login.request.dto';

export class AuthRoutes {
  private authController: AuthController = new AuthController();

  public route(app: Application) {
    app.post(
      '/api/v2/auth/register',
      (req: Request, res: Response, next: NextFunction) => {
        const authRegisterRequest = plainToClass(
          AuthRegisterRequestDto,
          req.body
        );
        validate(authRegisterRequest, {}).then((errors) => {
          if (errors && errors.length > 0) {
            res
              .status(
                errorMessages[ErrorCodes.ValidationAuthRegister]['status']
              )
              .json(errors);
            return;
          }

          this.authController.register(authRegisterRequest, req, res, next);
        });
      }
    );

    app.post(
      '/api/v2/auth/login',
      (req: Request, res: Response, next: NextFunction) => {
        const authLoginRequest = plainToClass(AuthLoginRequestDto, req.body);
        validate(authLoginRequest, {}).then((errors) => {
          if (errors && errors.length > 0) {
            res
              .status(errorMessages[ErrorCodes.ValidationAuthLogin]['status'])
              .json(errors);
            return;
          }

          this.authController.login(authLoginRequest, req, res, next);
        });
      }
    );
  }
}
