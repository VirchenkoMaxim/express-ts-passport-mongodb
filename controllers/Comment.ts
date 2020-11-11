import express from 'express';
import { CommentModel } from '../models/Comments';
import { User } from './User';

export class CommentCtrl {
  static async index(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = await CommentModel.find({
        articleId: req.params.id,
      }).populate('author', ['username', 'imgUrl']);

      res.json({
        result: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const user = req.user as User;
      const comment = {
        body: req.body.body,
        createdAt: Date.now(),
        articleId: req.params.id,
        author: user.id,
      };
      const data = await CommentModel.create(comment);
      res.json({
        result: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const comment = await CommentModel.findByIdAndDelete(req.params.id);
      res.json({
        result: 'success',
        comment,
      });
    } catch (error) {
      next(error);
    }
  }
}
