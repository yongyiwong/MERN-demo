import { ErrorCodes } from '../../errorhandling/error.code';
import { IPost } from './interface/post.interface';
import { IUser } from '../../modules/user/interface/user.interface';
import { PostCreateRequestDto } from './dto/post.create.request.dto';
import { PostCreateResponse } from './dto/post.create.response';
import Posts from './schema/post.schema';
import { IPostGetOption } from './interface/post.get.option.interface';
import { PostUpdateResponse } from './dto/post.update.response';
import { PostUpdateRequestDto } from './dto/post.update.request.dto';
import { Document } from 'mongoose';

export default class PostService {
  public async create(
    request: PostCreateRequestDto,
    user: IUser
  ): Promise<PostCreateResponse> {
    const response = new PostCreateResponse();

    const createPost: IPost = {
      title: request.title,
      content: request.content,
      creator: user,
    };

    let post: IPost;
    try {
      const postCreated = new Posts(createPost);
      await postCreated.save();
      post = await Posts.findById(postCreated.id)
        .select({
          id: '$_id',
          _id: 0,
          title: 1,
          content: 1,
        })
        .exec();
    } catch (error) {
      response.code = ErrorCodes.CreatePostError;
      return response;
    }

    response.code = 0;
    response.post = post;
    return response;
  }

  public async update(
    postId: String,
    request: PostUpdateRequestDto,
    user: IUser
  ): Promise<PostUpdateResponse> {
    const response = new PostUpdateResponse();

    let post: IPost & Document<any, any, IPost>;
    try {
      post = await Posts.findById(postId).populate('creator');
      if (!post) {
        response.code = ErrorCodes.PostNotFound;
        return response;
      }

      if (post.creator.id !== user.id) {
        console.log(post.creator.id, user.id);

        response.code = ErrorCodes.UpdatePostNotYours;
        return response;
      }

      post.title = request.title;
      post.content = request.content;

      await post.save();

      post = await Posts.findById(postId).select({
        _id: 0,
        id: '$_id',
        title: 1,
        content: 1,
        created_at: 1,
        updated_at: 1,
        creator: 1,
      });
    } catch (error) {
      response.code = ErrorCodes.UpdatePostError;
      return response;
    }

    response.code = 0;
    response.post = post;
    return response;
  }

  public async gets(option: IPostGetOption): Promise<IPost[]> {
    return Posts.find({})
      .limit(option.count)
      .skip(option.count * option.page)
      .sort({ created_at: 1, id: 1 })
      .select({
        _id: 0,
        id: '$_id',
        title: 1,
        content: 1,
        created_at: 1,
        updated_at: 1,
        creator: 1,
      })
      .exec();
  }

  public async getsByUser(
    user: IUser,
    option: IPostGetOption
  ): Promise<IPost[]> {
    return Posts.find({ creator: user })
      .limit(option.count)
      .skip(option.count * option.page)
      .sort({ created_at: 1, id: 1 })
      .select({
        _id: 0,
        id: '$_id',
        title: 1,
        content: 1,
        created_at: 1,
        updated_at: 1,
        creator: 1,
      });
  }

  public async getById(postId: string): Promise<IPost> {
    try {
      const post = await Posts.findById(postId).select({
        _id: 0,
        id: '$_id',
        title: 1,
        content: 1,
        created_at: 1,
        updated_at: 1,
        creator: 1,
      });
      return post;
    } catch (error) {
      //console.log(error);
    }
    return null;
  }
}
