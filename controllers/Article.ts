import express from 'express';
import { ArticleModel } from '../models/Article';
interface Comment {
  _id?: string;
  body: string;
}
export interface Article {
  _id?: string;
  title: string;
  body: string;
  comment: Array<Comment>;
  owner: string;
}

export class ArticleCtrl {
  static async index(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const data = (await ArticleModel.find({}).lean()) as Article[];
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
      const data: Article = {
        title: req.body.title,
        body: req.body.body,
        comment: [],
        owner: req.body.owner,
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
