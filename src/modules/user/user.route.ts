import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import errorMessages, { ErrorCodes } from '../../errorhandling/error.code';
import { Application, NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import * as passport from 'passport';

export class UserRoutes {
  private userController: UserController = new UserController();

  public route(app: Application) {
    app.get(
      '/api/v2/users/me',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) => {
        this.userController.me(req, res, next);
      }
    );

    app.get(
      '/api/v2/users/:id',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) => {
        this.userController.get(req, res, next);
      }
    );
  }
}
