import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import './core/db';
import cors from 'cors';
import { router } from './routes';
import passport from 'passport';
import './passport-config';
import { initializePassport } from './passport-config';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport(passport);

app.use(cors());

app.use(passport.initialize());

app.use('/uploads/', express.static('uploads'));
app.use('/api/', router);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    // handleError(err, res);
    if (err) {
      res.json({
        status: 'failed',
        err: err.message,
      });
    }
  },
);

app.listen(PORT, (): void => {
  console.log(`Started on ${PORT}`);
});
