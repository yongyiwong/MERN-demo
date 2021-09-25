import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IUser } from '../interface/user.interface';
import * as bcrypt from 'bcrypt';

const schema = new Schema<IUser>(
  {
    name: String,
    email: String,
    password: String,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model<IUser>('User', schema);
