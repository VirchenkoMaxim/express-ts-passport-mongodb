import express from 'express';
import { ArticleModel } from '../models/Article';
import { User } from './User';
interface Comment {
  _id?: string;
  body: string;
}
export interface Article {
  _id?: string;
  title: string;
  body: string;
  comment: Array<Comment>;
  owner?: string;
  createdAt: number;
}

export class ArticleCtrl {
  static async index(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      let data = await ArticleModel.find({});
      res.json({
        result: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getOne(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      let data = await ArticleModel.findById(req.params.id).populate('owner', [
        'username',
        'imgUrl',
      ]);
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
      const owner = req.user as User;
      const data: Article = {
        title: req.body.title,
        body: req.body.body,
        comment: [],
        owner: owner.id,
        createdAt: Date.now(),
      };
      const article = await ArticleModel.create(data);

      res.json({
        result: 'success',
        data: article,
      });
    } catch (error) {
      next(error);
    }
  }
  static async update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const article: Article = await ArticleModel.updateOne(
        { _id: req.params.id },
        {
          title: req.body.title,
          body: req.body.body,
        },
      );
      res.json({
        result: 'success',
        data: article,
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
      const article = await ArticleModel.deleteOne({ _id: req.params.id });
      res.json({
        result: 'success',
        data: article,
      });
    } catch (error) {
      next(error);
    }
  }
}
