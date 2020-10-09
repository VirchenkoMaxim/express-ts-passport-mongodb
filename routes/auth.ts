import { Router } from 'express';
import passport from 'passport';

import { LoginCtrl } from '../controllers/Auth';
import { isAuth, notAuth } from './articles';

export const auth = Router();

auth.post('/login', passport.authenticate('local'), LoginCtrl.login);
auth.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  LoginCtrl.show,
);
auth.delete('/logout', isAuth, LoginCtrl.logout);
