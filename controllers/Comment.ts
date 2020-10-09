import express from 'express';
import { ArticleModel } from '../models/Article';

export class CommentCtrl {
  static async add(req: express.Request, res: express.Response) {
    try {
      const comment = await ArticleModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            comments: {
              body: req.body.body,
            },
          },
        },
        { new: true },
      );
      res.json({
        result: 'success',
        data: comment,
      });
    } catch (error) {
      res.json({
        result: 'failed',
        error,
      });
    }
  }
  static async delete(req: express.Request, res: express.Response) {
    try {
      const comment = await ArticleModel.updateOne(
        { _id: req.params.id },
        {
          $pull: {
            comments: {
              _id: req.body.id,
            },
          },
        },
        { new: true },
      );
      res.json({
        result: 'success',
        comment,
      });
    } catch (error) {
      res.json({
        result: 'failed',
        error,
      });
    }
  }
}
