import { IPost } from '../interface/post.interface';

export class PostCreateResponse {
  code: number;
  error?: string;
  post: IPost;
}
