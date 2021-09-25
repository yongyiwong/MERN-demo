import * as mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import { IPost } from '../interface/post.interface';
import * as bcrypt from 'bcrypt';

const schema = new Schema<IPost>(
  {
    title: String,
    content: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const PostModel = model<IPost>('Post', schema);

export default PostModel;
