import { Strategy } from 'passport-local';
import { User } from './controllers/User';
import { UserModel } from './models/User';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

// export const isAuth = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   console.log(req.isAuthenticated());
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     next(Error('No access'));
//   }
// };

// export const notAuth = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   if (!req.isAuthenticated()) {
//     return next();
//   } else {
//     next(Error('You are authorised'));
//   }
// };

export const initializePassport = (passport: any) => {
  const authenticateUser = async (
    email: string,
    password: string,
    done: any,
  ) => {
    try {
      const user: User = (
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
          const data: User = (
            await UserModel.findById(payload.data.id)
          )?.toObject();
          return done(null, data);
        } catch (error) {
          return done(error, false, { message: 'Not authorized' });
        }
      },
    ),
  );
  passport.serializeUser((user: User, done: any) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id: string, done: any) => {
    UserModel.findOne({ _id: id }, (err, user: any) => done(null, user));
  });
};
