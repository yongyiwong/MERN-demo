import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import * as mongoose from 'mongoose';
//import * as passport from 'passport';

import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.route';
import { PostRoutes } from '../modules/post/post.route';
import { CommonRoutes } from '../routes/common_routes';

// middleware
require('../modules/auth/middleware/auth.passport.middleware');

// define app
class App {
  public app: express.Application;

  private common_routes: CommonRoutes = new CommonRoutes();
  private auth_routes: AuthRoutes = new AuthRoutes();
  private user_routes: UserRoutes = new UserRoutes();
  private post_routes: PostRoutes = new PostRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.setupMongoose();

    this.auth_routes.route(this.app);
    this.user_routes.route(this.app);
    this.post_routes.route(this.app);
    this.common_routes.route(this.app);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  // setup mongoose
  private async setupMongoose(): Promise<void> {
    try {
      await mongoose.connect(
        `mongodb://${process.env.MongoUserName}:${process.env.MongoPassword}` +
          `@${process.env.MongoHost}:${process.env.MongoPort}/${process.env.MongoDB}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new App().app;
