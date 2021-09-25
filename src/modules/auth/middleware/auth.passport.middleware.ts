import * as passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { IPayLoad } from '../interface/auth.payload';
import Users from '../../user/schema/user.schema';

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async function (jwtPayload: IPayLoad, done) {
      const user = await Users.findOne({ email: jwtPayload.email });
      if (!user) {
        return done('Invalid Credentials');
      }

      return done(null, user);
    }
  )
);
