import { Strategy } from 'passport-local';
import { ReqUser, ResUser } from './controllers/User';
import { UserModel } from './models/User';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

export const initializePassport = (passport: any) => {
  const authenticateUser = async (
    email: string,
    password: string,
    done: any,
  ) => {
    try {
      const user: ResUser = (
        await UserModel.findOne({ email: email }).select('+password')
      )?.toObject();
      if (!user || password !== user.password) {
        return done(Error('Incorrect username or password'), false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  };

  passport.use(
    new Strategy(
      { usernameField: 'email', passwordField: 'password' },
      authenticateUser,
    ),
  );
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env.SECRET_KEY || 'key',
        jwtFromRequest: ExtractJwt.fromHeader('token'),
      },
      async (payload, done) => {
        try {
          const data: ReqUser = (
            await UserModel.findById(payload.data.id)
          )?.toObject();
          return done(null, data);
        } catch (error) {
          return done(error, false, { message: 'Not authorized' });
        }
      },
    ),
  );
  passport.serializeUser((user: ReqUser, done: any) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id: string, done: any) => {
    UserModel.findOne({ _id: id }, (err, user: any) => done(null, user));
  });
};
