import { IPost } from '../interface/post.interface';

export class PostUpdateResponse {
  code: number;
  error?: string;
  post: IPost;
}
