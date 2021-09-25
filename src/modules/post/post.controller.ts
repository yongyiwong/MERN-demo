import errorMessages, { ErrorCodes } from '../../errorhandling/error.code';
import { NextFunction, Request, Response } from 'express';
import { IPost } from './interface/post.interface';
import PostService from './post.service';
import { IUser } from 'modules/user/interface/user.interface';
import { PostCreateRequestDto } from './dto/post.create.request.dto';
import { IPostGetOption } from './interface/post.get.option.interface';
import { PostGetsRequestDto } from './dto/post.gets.request.dto';
import Users from '../user/schema/user.schema';
import { PostUpdateRequestDto } from './dto/post.update.request.dto';

export class PostController {
  private postService: PostService = new PostService();

  async create(
    postCreateRequest: PostCreateRequestDto,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = <IUser>req.user;
    const response = await this.postService.create(postCreateRequest, user);

    if (response.code !== 0) {
      res.status(errorMessages[response.code]['status']).send({
        code: response.code,
        error: errorMessages[response.code]['message']['cn'],
      });
      return;
    }

    res.send(response.post);
  }

  async update(
    postUpdateRequest: PostUpdateRequestDto,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = <IUser>req.user;
    const postId = req.params.id;
    const response = await this.postService.update(
      postId,
      postUpdateRequest,
      user
    );

    if (response.code !== 0) {
      res.status(errorMessages[response.code]['status']).send({
        code: response.code,
        error: errorMessages[response.code]['message']['cn'],
      });
      return;
    }

    res.send(response.post);
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.id;
    const post = await this.postService.getById(postId);
    if (!post) {
      const errorCode = ErrorCodes.PostNotFound;
      res.status(errorMessages[errorCode]['status']).send({
        code: errorCode,
        error: errorMessages[errorCode]['message']['cn'],
      });
      return;
    }

    res.json(post);
  }

  public async gets(
    postGetsRequest: PostGetsRequestDto,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.send(
      await this.postService.gets({
        count: postGetsRequest.count,
        page: postGetsRequest.page,
      })
    );
  }

  public async getsByUserId(
    postGetsRequest: PostGetsRequestDto,
    userId: String,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let user: IUser;
    try {
      user = await Users.findById(userId);
      if (!user) {
        const errorCode = ErrorCodes.GetUserNotFound;
        res.status(errorMessages[errorCode]['status']).send({
          code: errorCode,
          error: errorMessages[errorCode]['message']['cn'],
        });
        return;
      }
    } catch (error) {
      const errorCode = ErrorCodes.GetPostsError;
      res.status(errorMessages[errorCode]['status']).send({
        code: errorCode,
        error: errorMessages[errorCode]['message']['cn'],
      });
      return;
    }

    this.getsByUser(postGetsRequest, user, req, res, next);
  }

  public async getsByUser(
    postGetsRequest: PostGetsRequestDto,
    user: IUser,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.send(
      await this.postService.getsByUser(user, {
        count: postGetsRequest.count,
        page: postGetsRequest.page,
      })
    );
  }
}
