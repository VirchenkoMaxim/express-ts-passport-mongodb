import express from 'express';
import { ArticleModel } from '../models/Article';
import { imgPath } from '../utils/helpFunctions';
import { ReqUser } from './User';
export interface Comment {
  _id?: string;
  body: string;
}

export interface ReqArticle {
  _id?: string;
  title: string;
  body: string;
  owner: string;
  createdAt: number;
}
export interface ResArticle {
  title: string;
  body: string;
  id: string;
  owner: ReqUser;
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
      let data: ResArticle = (
        await ArticleModel.findById(req.params.id).populate('owner', [
          'username',
          'imgUrl',
        ])
      )?.toObject();
      data.owner.imgUrl = imgPath(data.owner.imgUrl);
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
      const owner: ReqUser = req.user as ReqUser;
      const data: ReqArticle = {
        title: req.body.title,
        body: req.body.body,
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
      const article: ReqArticle = await ArticleModel.updateOne(
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
