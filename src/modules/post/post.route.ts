import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import errorMessages, { ErrorCodes } from '../../errorhandling/error.code';
import { Application, NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import { PostController } from './post.controller';
import { IUser } from '../user/interface/user.interface';
import { PostCreateRequestDto } from './dto/post.create.request.dto';
import { PostGetsRequestDto } from './dto/post.gets.request.dto';
import { PostUpdateRequestDto } from './dto/post.update.request.dto';

export class PostRoutes {
  private postController: PostController = new PostController();

  public route(app: Application) {
    app.get(
      '/api/v2/users/me/posts',
      passport.authenticate('jwt', { session: false }, function( error, payload, info ) {

      }),
      (req: Request, res: Response, next: NextFunction) => {
        const user = <IUser>req.user;
        const postGetsRequest = plainToClass(PostGetsRequestDto, req.query);

        validate(postGetsRequest, {}).then((errors) => {
          if (errors && errors.length > 0) {
            res
              .status(errorMessages[ErrorCodes.ValidationGetPostsMe]['status'])
              .json(errors);
            return;
          }

          this.postController.getsByUser(postGetsRequest, user, req, res, next);
        });
      }
    );

    app.get(
      '/api/v2/users/:id/posts',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) => {
        const postGetsRequest = plainToClass(PostGetsRequestDto, req.query);
        validate(postGetsRequest, {}).then((errors) => {
          if (errors && errors.length > 0) {
            res
              .status(
                errorMessages[ErrorCodes.ValidationGetUsersPosts]['status']
              )
              .json(errors);
            return;
          }

          const userId = req.params.id;
          this.postController.getsByUserId(
            postGetsRequest,
            userId,
            req,
            res,
            next
          );
        });
      }
    );

    app.post(
      '/api/v2/posts',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) => {
        const postCreateRequest = plainToClass(PostCreateRequestDto, req.body);
        validate(postCreateRequest, {}).then((errors) => {
          if (errors && errors.length > 0) {
            res
              .status(errorMessages[ErrorCodes.ValidationCreatePost]['status'])
              .json(errors);
            return;
          }

          this.postController.create(postCreateRequest, req, res, next);
        });
      }
    );

    app.get(
      '/api/v2/posts',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) => {
        const postGetsRequest = plainToClass(PostGetsRequestDto, req.query);
        validate(postGetsRequest, {}).then((errors) => {
          if (errors && errors.length > 0) {
            res
              .status(errorMessages[ErrorCodes.ValidationGetPosts]['status'])
              .json(errors);
            return;
          }

          this.postController.gets(postGetsRequest, req, res, next);
        });
      }
    );

    app.get(
      '/api/v2/posts/:id',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) => {
        this.postController.get(req, res, next);
      }
    );

    app.patch(
      '/api/v2/posts/:id',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) => {
        const postUpdateRequest = plainToClass(PostUpdateRequestDto, req.body);
        validate(postUpdateRequest, {}).then((errors) => {
          if (errors && errors.length > 0) {
            res
              .status(errorMessages[ErrorCodes.ValidationUpdatePost]['status'])
              .json(errors);
            return;
          }

          this.postController.update(postUpdateRequest, req, res, next);
        });
      }
    );
  }
}
