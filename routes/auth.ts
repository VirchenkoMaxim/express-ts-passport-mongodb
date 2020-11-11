import { Router } from 'express';
import passport from 'passport';
import { LoginCtrl } from '../controllers/Auth';

export const auth = Router();

auth.post('/login', passport.authenticate('local'), LoginCtrl.login);
auth.get('/me', passport.authenticate('jwt'), LoginCtrl.show);
