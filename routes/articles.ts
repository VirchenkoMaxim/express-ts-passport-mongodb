import { Router } from 'express';
import passport from 'passport';
import { ArticleCtrl } from '../controllers/Article';
import { CommentCtrl } from '../controllers/Comment';
export const articles = Router();

articles.get('/', passport.authenticate('jwt'), ArticleCtrl.index);
articles.get('/:id', passport.authenticate('jwt'), ArticleCtrl.getOne);
articles.post('/', passport.authenticate('jwt'), ArticleCtrl.create);
articles.put('/:id', ArticleCtrl.update);
articles.delete('/:id', ArticleCtrl.delete);

articles.get('/:id/comments', passport.authenticate('jwt'), CommentCtrl.index);
articles.post(
  '/:id/comments',
  passport.authenticate('jwt'),
  CommentCtrl.create,
);
articles.delete(
  '/:id/comments/:commentId',
  passport.authenticate('jwt'),
  CommentCtrl.delete,
);
