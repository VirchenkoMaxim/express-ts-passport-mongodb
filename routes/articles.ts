import { Router } from 'express';
import { ArticleCtrl } from '../controllers/Article';
import express from 'express';

export const isAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    next(Error('No access'));
  }
};

export const notAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    next(Error('You are authorised'));
  }
};

export const articles = Router();

articles.get('/', isAuth, ArticleCtrl.index);
articles.post('/', isAuth, ArticleCtrl.create);
articles.put('/:id', ArticleCtrl.update);
articles.delete('/:id', ArticleCtrl.delete);
