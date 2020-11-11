import express from 'express';
import { CommentModel } from '../models/Comments';
import { imgPath } from '../utils/helpFunctions';
import { ReqUser } from './User';
export interface PopulateComment {
  body: string;
  author: ReqUser;
  id: string;
  createdAt: Date;
  articleId?: string;
}
export interface Comment {
  body: string;
  author: string;
  articleId?: string;
  id?: string;
  createdAt: number;
}
export class CommentCtrl {
  static async index(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const doc = await CommentModel.find({
        articleId: req.params.id,
      }).populate('author', ['username', 'imgUrl']);
      const data: PopulateComment[] = doc.map((element) => {
        const obj: PopulateComment = element.toObject();
        obj.author.imgUrl = imgPath(obj.author.imgUrl);
        return obj;
      });
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
      const user = req.user as ReqUser;
      const comment: Comment = {
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
