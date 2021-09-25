import errorMessages, { ErrorCodes } from '../../errorhandling/error.code';
import { NextFunction, Request, Response } from 'express';
import { UserDto } from './dto/user.dto';
import { IUser } from './interface/user.interface';
import UserService from './user.service';

export class UserController {
  private userService: UserService = new UserService();

  public async me(req: Request, res: Response, next: NextFunction) {
    const iUser = <IUser>req.user;
    res.json(UserDto.iUserFactory(iUser));
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const iUser = await this.userService.getById(userId);

    if (!iUser) {
      const errorCode = ErrorCodes.GetUserNotFound;
      res.status(errorMessages[errorCode]['status']).send({
        code: errorCode,
        error: errorMessages[errorCode]['message']['cn'],
      });
      return;
    }

    res.json(UserDto.iUserFactoryGeneral(iUser));
  }
}
