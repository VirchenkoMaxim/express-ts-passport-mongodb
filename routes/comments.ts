import { Router } from 'express';
import passport from 'passport';
import { CommentCtrl } from '../controllers/Comment';

export const comments = Router();

comments.delete('/:id', passport.authenticate('jwt'), CommentCtrl.delete);
